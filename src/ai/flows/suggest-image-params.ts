'use server';
/**
 * @fileOverview Flow to suggest form parameters for image generation based on an existing image's profile or service context.
 *
 * - suggestImageParams - A function that suggests parameters.
 * - SuggestImageParamsInput - The input type for the function.
 * - SuggestImageParamsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestImageParamsInputSchema = z.object({
  description: z.string().optional().describe("The detailed description of the inspiration image."),
  tags: z.array(z.string()).optional().describe("A list of tags associated with the inspiration image."),
  serviceContext: z.string().optional().describe("Detailed context about a service to inspire suggestions."),
});
export type SuggestImageParamsInput = z.infer<typeof SuggestImageParamsInputSchema>;

const SuggestImageParamsOutputSchema = z.object({
    sectionType: z.string().describe("A suggested section type like 'Hero', 'Card', 'Banner', 'General', 'Ilustración'."),
    serviceName: z.string().describe("A suggested service name like 'General', 'Envios Express', etc."),
    aspectRatio: z.string().describe("A suggested aspect ratio like '16:9 (Panorámica)', '1:1 (Cuadrada)', '9:16 (Vertical)'."),
    style: z.string().describe("A suggested visual style like 'Fotografía Realista', 'Ilustración Digital', 'Arte 3D'."),
    background: z.string().describe("A concise suggestion for an improved or more professional version of the image background."),
    details: z.string().describe("A concise suggestion for an improved or more professional version of the main content details."),
});
type SuggestImageParamsOutput = z.infer<typeof SuggestImageParamsOutputSchema>;

export async function suggestImageParams(input: SuggestImageParamsInput): Promise<SuggestImageParamsOutput> {
  return suggestImageParamsFlow(input);
}

const promptTemplate = ai.definePrompt({
  name: 'suggestImageParamsTemplate',
  input: { schema: SuggestImageParamsInputSchema },
  output: { schema: SuggestImageParamsOutputSchema },
  prompt: `
    You are an expert creative assistant. Your task is to analyze the provided information (either from an inspiration image or a service context) and suggest a set of parameters to create a new, professional, and visually appealing image. Your suggestions should be creative and aim for an improved version, not a direct copy. Be concise and direct.

    {{#if serviceContext}}
      **Mode: Service Context Analysis**
      Analyze the following service context to generate creative suggestions for an image that visually represents this service.
      - Service Context: "{{serviceContext}}"
      
      Based on this context:
      1.  **sectionType**: Suggest a suitable section, e.g., 'Hero' for impact, 'Card' for details. Default to 'General' if unsure.
      2.  **serviceName**: Extract the service name from the context.
      3.  **aspectRatio**: Suggest '16:9 (Panorámica)' as a versatile default.
      4.  **style**: Suggest 'Fotografía Realista' or 'Ilustración Digital' based on what would best represent the service's tone (e.g., professional vs. friendly).
      5.  **background**: Propose a background that visually captures the essence of the service. For 'Envíos Express', suggest "fondo urbano dinámico con efecto bokeh y estelas de luz". For 'Plan Emprendedores', suggest "oficina moderna y luminosa con elementos de paquetería y gráficos de crecimiento".
      6.  **details**: Describe a key scene or subject that embodies the service. For 'Envíos Express', suggest "repartidor en moto eléctrica moderna, entregando un paquete a un cliente sonriente". For 'Plan Emprendedores', suggest "emprendedor/a organizando paquetes para envío en un escritorio de trabajo creativo". Crucially, if a person is a delivery driver ('repartidor'), always suggest they wear a helmet ('con casco') to obscure their face.
    {{else}}
      **Mode: Inspiration Image Analysis**
      Analyze the following information from the inspiration image:
      - Description: "{{description}}"
      - Tags: [{{#each tags}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]

      Based on this information:
      1.  **sectionType**: Based on tags like 'banner', 'web', 'presentación', suggest 'Banner', 'Hero', or 'Card'. If it's a general image, suggest 'General'.
      2.  **serviceName**: Infer the most relevant service. If tags mention 'envios', 'delivery', suggest a related service. If it's generic, suggest 'General'.
      3.  **aspectRatio**: Infer from the description. If it mentions 'banner' or 'web', suggest '16:9 (Panorámica)'. If it seems square, suggest '1:1 (Cuadrada)'. Otherwise, default to '16:9 (Panorámica)'.
      4.  **style**: Infer from tags like 'fotografía', 'digital', '3d'. Suggest 'Fotografía Realista', 'Ilustración Digital', or 'Arte 3D'. Default to 'Fotografía Realista' if unsure.
      5.  **background**: Instead of just summarizing, suggest an **improvement**. For example, if the description says "fondo abstracto con degradado azul", suggest "fondo abstracto dinámico con degradado azul y brillos sutiles".
      6.  **details**: Instead of just summarizing, suggest an **improvement or variation** of the main subject. For example, if it's "un repartidor en moto", suggest "repartidor amigable con casco en motocicleta eléctrica moderna, en una calle costera de la ciudad". If a person is a delivery driver ('repartidor'), always suggest they wear a helmet ('con casco').
    {{/if}}

    Provide your output in the required JSON format.
  `,
});

const suggestImageParamsFlow = ai.defineFlow(
  {
    name: 'suggestImageParamsFlow',
    inputSchema: SuggestImageParamsInputSchema,
    outputSchema: SuggestImageParamsOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
