'use server';
/**
 * @fileOverview Flow to generate a detailed prompt for replicating specific components.
 *
 * - generateComponentPrompt: A function that creates a prompt for replicating components.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ComponentReplicationInputSchema = z.object({
  pagePath: z.string().describe("The original page path where the components reside."),
  filesContent: z.array(z.object({
    path: z.string(),
    content: z.string(),
    name: z.string(),
  })).describe("The source code of the selected components and their sub-components."),
});

type ComponentReplicationInput = z.infer<typeof ComponentReplicationInputSchema>;

const ComponentReplicationOutputSchema = z.object({
  componentPrompt: z.string().describe("The detailed prompt for the AI developer to replicate the components."),
});
type ComponentReplicationOutput = z.infer<typeof ComponentReplicationOutputSchema>;

// Helper function to get component name from path
const getComponentName = (path: string | undefined): string => {
    if (!path) return '';
    return path.split('/').pop()?.replace('.tsx', '') || '';
};

export async function generateComponentPrompt(input: ComponentReplicationInput): Promise<ComponentReplicationOutput> {
  const flowInput = { 
    ...input,
    pageName: getComponentName(input.pagePath),
  };

  return generateComponentPromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateComponentPromptTemplate',
  input: { schema: z.any() },
  output: { schema: ComponentReplicationOutputSchema },
  prompt: `
    **Task: Generate a Component Replication Prompt**
      
    Generate a detailed prompt for an AI developer to create the React components listed below.
    These components are part of the page \`{{pageName}}\`.

    **Final Prompt to Output (as componentPrompt):**
    "Asistente, ahora necesito que crees los siguientes componentes React para el proyecto Next.js:
    {{#each filesContent}}
    - \`{{this.name}}\`
    {{/each}}

    **Instrucciones:**
    1.  **Analiza el Código:** A continuación te proporciono el código fuente de todos los componentes necesarios. Analízalo para entender su propósito, estructura, props y cómo se interrelacionan.
    2.  **Reimplementa los Componentes:** Crea el código para cada componente en su propio archivo.
        *   **Stack:** Utiliza React con TypeScript, Next.js y componentes de ShadCN UI.
        *   **Estilos:** Usa clases de Tailwind CSS. Asegúrate de que el diseño sea profesional, moderno y completamente responsivo (mobile-first).
        *   **Props:** Define las props necesarias con tipos de TypeScript basados en el original.
        *   **Estado:** Si algún componente usa estado, impleméntalo con hooks de React.
        *   **Imágenes:** Si se utilizan imágenes con rutas, asegúrate de usar exactamente las mismas rutas.
        *   **Organización:** Coloca cada archivo en un directorio lógico y apropiado dentro de la estructura del nuevo proyecto.
    
    **Código Fuente de Referencia:**
    {{#each filesContent}}
    // --- Código para: {{this.name}} ---
    \`\`\`tsx
    {{{this.content}}}
    \`\`\`
    {{/each}}

    **Acción Inmediata:**
    Proporciona el código completo para cada uno de los nuevos archivos de componente."
  `,
});

const generateComponentPromptFlow = ai.defineFlow(
  {
    name: 'generateComponentPromptFlow',
    inputSchema: z.any(),
    outputSchema: ComponentReplicationOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output || { componentPrompt: "Error: No se pudo generar el prompt." };
  }
);
