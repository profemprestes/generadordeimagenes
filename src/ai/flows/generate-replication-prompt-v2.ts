// src/ai/flows/generate-replication-prompt-v2.ts
/**
 * @fileOverview Flujo v2 para generar prompts de replicación (meta-prompting).
 *
 * - generateReplicationFlow - Genera un prompt para replicar estructura o componentes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Usamos z de 'genkit'

// 1. Esquema de Entrada (Input Schema)
const ReplicationInputSchema = z.object({
  pagePath: z.string().describe("La ruta a la página que se está replicando."),
  
  // Para Modo 1 (Estructura de Página)
  app_components: z.array(z.string()).optional().describe("Componentes de la aplicación (personalizados) usados por la página."),
  ui_components: z.array(z.string()).optional().describe("Componentes de UI (reutilizables como ShadCN) usados por la página."),
  actions: z.array(z.string()).optional().describe("Server Actions importadas por la página o sus componentes."),

  // Para Modo 2 (Replicación de Componentes)
  filesContent: z.array(z.object({
    path: z.string(),
    content: z.string(),
    name: z.string(),
  })).optional().describe("El código fuente de los componentes seleccionados y sus subcomponentes."),
});
export type ReplicationInput = z.infer<typeof ReplicationInputSchema>;

// 2. Esquema de Salida (Output Schema)
const ReplicationOutputSchema = z.object({
  structurePrompt: z.string().optional().describe("El prompt generado para la ESTRUCTURA de la página."),
  componentPrompt: z.string().optional().describe("El prompt generado para el CÓDIGO de los componentes."),
});

// Helper
const getPageName = (path: string | undefined): string => {
  if (!path) return '';
  const segments = path.split('/');
  if (segments[segments.length - 1] === 'page.tsx') {
    const parent = segments[segments.length - 2];
    // Devuelve el nombre en minúsculas directamente
    return (parent === 'app' ? 'home' : parent).toLowerCase();
  }
  return (path.split('/').pop()?.replace('.tsx', '') || 'desconocida').toLowerCase();
};

const getComponentName = (path: string | undefined): string => {
    if (!path) return '';
    return path.split('/').pop()?.replace(/\.tsx?$|\.ts?$/, '') || '';
};


// 3. Plantilla de Prompt (Actualizada)
const promptTemplate = ai.definePrompt({
  name: 'generateReplicationV2Template',
  input: { schema: z.any() },
  output: { schema: ReplicationOutputSchema },
  prompt: `
    You are an expert AI assistant specialized in generating prompts for a senior AI developer. Your instructions must be clear, professional, and encourage best practices.

    {{#if filesContent}}
      
      **Task: Generate a Component Replication and Refactoring Prompt**

      Generate a detailed prompt for an AI developer to analyze, refactor, and reimplement the React components listed below. These components are part of the page \`{{pageNameForDisplay}}\`.

      **Final Prompt to Output (as componentPrompt):**
      "Asistente, necesito que analices y refactorices los siguientes componentes React. Tu objetivo es mejorar su diseño, estructura y responsividad, no solo copiarlos.

      **Componentes a Refactorizar:**
      {{#each filesContent}}
      - \`{{this.name}}\` (proveniente de \`{{this.path}}\`)
      {{/each}}

      **Instrucciones de Refactorización:**
      1.  **Análisis Profundo:** A continuación te proporciono el código fuente. Analízalo para entender su propósito, props, estado y lógica de negocio.
      2.  **Reimplementación Mejorada:** Crea una nueva versión de cada componente en su propio archivo, aplicando las siguientes mejoras:
          *   **Stack Tecnológico:** Usa React con TypeScript, Next.js (App Router), y componentes de **ShadCN UI** siempre que sea posible para reemplazar elementos HTML básicos (botones, cards, etc.).
          *   **Diseño Profesional y Responsivo:** Aplica un diseño **mobile-first**. Utiliza Flexbox o Grid para un layout robusto y clases de Tailwind CSS para el estilizado. Asegúrate de que el resultado sea estéticamente agradable y funcional en todas las resoluciones.
          *   **Props y Estado:** Define props claras con TypeScript. Si el componente maneja estado, utiliza hooks de React (\`useState\`, \`useEffect\`) de manera eficiente.
          *   **Calidad del Código:** El código final debe ser limpio, legible, bien organizado y reutilizable.
          *   **Organización de Archivos:** Basa la nueva ubicación en la ruta original del componente. Por ejemplo, si un componente estaba en \`src/components/home/\`, la nueva versión refactorizada debería ir en un directorio similar y apropiado para el proyecto de destino.
      
      **Código Fuente de Referencia:**
      {{#each filesContent}}
      // --- Código para: {{this.name}} ({{this.path}}) ---
      \`\`\`tsx
      {{{this.content}}}
      \`\`\`
      {{/each}}

      **Acción Inmediata:**
      Proporciona el código TypeScript completo para cada uno de los archivos de componente refactorizados."

    {{else}}

      **Task: Generate a High-Level Page Structure Prompt**

      Generate a professional, high-level prompt for an AI developer to create the foundational structure of the page \`{{pageNameForDisplay}}\` (\`{{pagePath}}\`). The prompt should guide, not restrict, allowing the developer AI to make smart implementation choices.

      **Final Prompt to Output (as structurePrompt):**
      "**Asistente, necesito que crees la estructura inicial de la página \`{{pageNameForDisplay}}\` (\`{{pagePath}}\`).**

      **1. Stack Tecnológico General:**
      -   **Framework:** Next.js 15 (con App Router).
      -   **Lenguaje:** TypeScript.
      -   **UI:** React, priorizando **Server Components**.
      -   **Estilos:** Tailwind CSS y componentes de **ShadCN UI**.

      **2. Composición Conceptual de la Página:**
      La página \`{{pageNameForDisplay}}\` se compone conceptualmente de las siguientes secciones. Tu tarea es crear los componentes de aplicación necesarios y orquestarlos en el archivo principal de la página.
      
      {{#if app_components.length}}
      **Componentes de Aplicación (A crear):**
        {{#each app_components}}
        - Un componente \`{{this.componentName}}\` para [Describe aquí el propósito del componente, ej: la cabecera principal, un listado de items].
        {{/each}}
      {{/if}}

      {{#if ui_components.length}}
      **Componentes de UI (A importar desde ShadCN):**
        {{#each ui_components}}
        - El componente \`<{{this.componentName}} />\` para [Describe aquí su uso, ej: botones, cards, etc.]. Estos ya existen en el proyecto.
        {{/each}}
      {{/if}}
      
      **3. Acción Inmediata:**
      1.  Crea el archivo principal \`{{pagePath}}\` como un **Server Component**.
      2.  Dentro de este archivo, importa los componentes de aplicación que vas a crear y los componentes de UI de ShadCN que necesites.
      3.  **BUENA PRÁCTICA:** Fomenta la carga progresiva utilizando **importación dinámica y \`<Suspense>\`** para los componentes de cliente más pesados, con un \`<Skeleton>\` de ShadCN como fallback.
      4.  Organiza los componentes en un orden lógico y visualmente coherente dentro del JSX de la página.
      5.  Para la ubicación de los archivos de los nuevos componentes de aplicación, crea una estructura de directorios lógica y mantenible (ej. \`src/components/{{pageName}}/...\`)."
    {{/if}}
  `,
});

// 4. El Flujo Exportable
export const generateReplicationFlowV2 = ai.defineFlow(
  {
    name: 'generateReplicationFlowV2',
    inputSchema: ReplicationInputSchema,
    outputSchema: ReplicationOutputSchema,
  },
  async (input) => {
    
    const pageNameRaw = getPageName(input.pagePath);

    const flowInput = { 
      ...input,
      pageName: pageNameRaw, // already lowercase for path example
      pageNameForDisplay: pageNameRaw.charAt(0).toUpperCase() + pageNameRaw.slice(1), // Capitalized for display
      app_components: input.app_components?.map(p => ({ path: p, componentName: getComponentName(p) })) || [],
      ui_components: input.ui_components?.map(p => ({ path: p, componentName: getComponentName(p) })) || [],
      actions: input.actions || [],
    };

    const { output } = await promptTemplate(flowInput);
    return output || {};
  }
);
