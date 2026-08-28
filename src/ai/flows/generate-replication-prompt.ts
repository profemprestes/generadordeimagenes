
'use server';
/**
 * @fileOverview Flow para generar prompts que ayuden a replicar páginas y componentes.
 *
 * - generateReplicationPrompt - A function that generates a prompt for replicating a page or component.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import type { PageStructure, ComponentNode } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";

const ReplicationPromptInputSchema = z.object({
  pagePath: z.string().describe("The path to the page being replicated."),
  componentPaths: z.array(z.string()).optional().describe("The specific components to generate a prompt for."),
  mainComponentContent: z.string().optional().describe("The source code of the main component."),
  filesContent: z.array(z.object({
    path: z.string(),
    content: z.string(),
    name: z.string(),
  })).optional().describe("The source code of the selected components and their sub-components."),
  componentsData: z.array(z.object({
      path: z.string(),
      name: z.string(),
  })).optional().describe("Simplified data for page structure components."),
});

type ReplicationPromptInput = z.infer<typeof ReplicationPromptInputSchema>;


const ReplicationPromptOutputSchema = z.object({
  structurePrompt: z.string().optional(),
  componentPrompt: z.string().optional(),
});
type ReplicationPromptOutput = Partial<z.infer<typeof ReplicationPromptOutputSchema>>;

// Helper function to get component name from path
const getComponentName = (path: string | undefined): string => {
    if (!path) return '';
    return path.split('/').pop()?.replace('.tsx', '') || '';
};

export async function generateReplicationPrompt(input: ReplicationPromptInput): Promise<ReplicationPromptOutput> {
  
  const flowInput = { 
    ...input,
    pageName: getComponentName(input.pagePath),
  };

  return generateReplicationPromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateReplicationPromptTemplate',
  input: { schema: z.any() },
  output: { schema: ReplicationPromptOutputSchema },
  prompt: `
    You are an expert AI assistant specialized in generating prompts for code generation.

    {{#if componentPaths.length}}
      **Task: Generate a Component Replication Prompt**
      
      Generate a detailed prompt for an AI developer to create the React components listed below.
      The main component being refactored is \`{{filesContent.[0].name}}\`, part of the page \`{{pageName}}\`.

      **Instructions for the AI Developer:**
      1.  **Analyze the Code:** You will be provided with the source code of the main component and all its necessary sub-components. Analyze them to understand their purpose, props, and how they work together.
      2.  **Reimplement Components:** Create the code for each new component in its own file.
          *   **Stack:** Use React with TypeScript, Next.js, and ShadCN UI components.
          *   **Styling:** Use Tailwind CSS classes. Ensure the design is professional, modern, and fully responsive (mobile-first).
          *   **Props:** Define necessary props with TypeScript types based on the original.
          *   **State:** If a component uses state, implement it with React hooks (\`useState\`, \`useEffect\`, etc.).
          *   **Images:** If a component uses images with hardcoded paths (e.g., \`src="/hero/imagen.webp"\`), ensure you use the exact same paths in the new component.
          *   **File Organization:** Place each component file in a logical directory, such as \`src/components/home/\` or a similar appropriate path.
      3.  **Component Dependencies:** The main component depends on the sub-components listed. You must import and use them as shown in the reference code.

      **Reference Source Code:**
      {{#each filesContent}}
      // --- Código para: {{this.name}} ---
      \`\`\`tsx
      {{{this.content}}}
      \`\`\`
      {{/each}}

      **Final Prompt to Output (as componentPrompt):**
      "Asistente, ahora necesito que crees los siguientes componentes React para el proyecto Next.js:
      {{#each filesContent}}
      - \`{{this.name}}\`
      {{/each}}

      **Instrucciones:**
      1.  **Analiza el Código:** A continuación te proporciono el código fuente de todos los componentes necesarios. Analízalo para entender su propósito, estructura y cómo se interrelacionan.
      2.  **Reimplementa los Componentes:** Crea el código para cada componente en su propio archivo.
          *   **Stack:** Utiliza React con TypeScript, Next.js y componentes de ShadCN UI.
          *   **Estilos:** Usa clases de Tailwind CSS. Asegúrate de que el diseño sea profesional, moderno y completamente responsivo (mobile-first).
          *   **Props:** Define las props necesarias con tipos de TypeScript.
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

    {{else}}
      **Task: Generate a Page Structure Prompt**

      Generate a detailed prompt for an AI developer to create the basic structure for the page \`{{pageName}}\`.

      **Page Structure Details:**
      - **Page Path:** \`{{pagePath}}\`
      - **Main Components (in order):**
      {{#each componentsData}}
          - \`{{this.name}}\`
      {{/each}}
      
      **Final Prompt to Output (as structurePrompt):**
      "**Asistente, necesito que inicies la creación de un nuevo proyecto para replicar la página \`{{pageName}}\`.**

      **1. Stack Tecnológico (Frontend):**
      El proyecto se construirá con el siguiente stack estándar:
      - **Framework:** Next.js con App Router.
      - **Lenguaje:** TypeScript.
      - **UI:** React con Server Components por defecto.
      - **Estilos:** Tailwind CSS.
      - **Componentes UI:** ShadCN.

      **2. Estructura de la Página Principal (\`{{pagePath}}\`):**
      La página principal será un Server Component que importará y orquestará de forma asíncrona los siguientes componentes principales. Utiliza \`<Suspense>\` de React con un componente \`<Skeleton>\` de ShadCN como fallback para cada uno.

      El orden de los componentes, usando sus nombres de importación, será:
      {{#each componentsData}}
      - \`{{this.name}}\`
      {{/each}}

      **Acción Inmediata:**
      Por favor, crea el archivo \`{{pagePath}}\` con esta estructura básica. Asegúrate de que los componentes se importen desde rutas lógicas (ej: \`@/components/home/...\`) y aplica las mejores prácticas de organización de archivos del proyecto de destino."
    {{/if}}
  `,
});

const generateReplicationPromptFlow = ai.defineFlow(
  {
    name: 'generateReplicationPromptFlow',
    inputSchema: z.any(),
    outputSchema: z.object({
        structurePrompt: z.string().optional(),
        componentPrompt: z.string().optional(),
    }),
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output || {};
  }
);
