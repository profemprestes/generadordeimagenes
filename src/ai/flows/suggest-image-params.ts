'use server';
/**
 * @fileOverview Flow to suggest form parameters for image generation based on an existing image's profile or service context.
 * Optimized with Nano Banana best practices (Oct 2025).
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
    background: z.string().describe("A concise suggestion for an improved or more professional version of the image background. Use natural language, specific details (lighting, environment, landmarks)."),
    details: z.string().describe("A concise suggestion for an improved or more professional version of the main content details. Use natural language: subject, action, pose, clothing, props. If delivery driver, always include helmet."),
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
    You are an expert Creative Director for Envíos DosRuedas (Mar del Plata logistics brand). Analyze the provided information and suggest parameters for a new, professional, visually appealing image. Your suggestions should be creative improvements, not direct copies. Be concise but descriptive using NATURAL LANGUAGE SENTENCES.

    BRAND CONTEXT: Envíos DosRuedas, Mar del Plata. Colors: Deep Cobalt #0636A5, Lemon Yellow #FFEC01, Brand Ink #00277C. Uniforms: navy polos with yellow trim/caps. Fleet: light-blue scooters with square boxes. Landmarks: Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub.

    {{#if serviceContext}}
      **Mode: Service Context Analysis**
      Service Context: "{{serviceContext}}"

      Based on this context, suggest IMPROVED parameters:
      1. **sectionType**: 'Hero' for impact, 'Card' for details, 'Banner' for wide, 'General' if unsure, 'Ilustración' for artistic.
      2. **serviceName**: Extract from context (e.g., 'Envíos Express', 'Plan Emprendedores').
      3. **aspectRatio**: '16:9 (Panorámica)' versatile default; '1:1 (Cuadrada)' for social; '9:16 (Vertical)' for stories.
      4. **style**: Match service tone: 'Fotografía Realista' (professional), 'Ilustración Digital' (friendly), 'Arte 3D' (premium/product), 'Estilo Cinematográfico' (epic), 'Estilo Minimalista' (clean).
      5. **background**: Natural language scene description with specific lighting/environment. Examples:
         - Envíos Express: "Dynamic urban coastal scene along the Mar del Plata Rambla at golden hour, warm sunlight creating long shadows and bokeh light trails from passing traffic."
         - Plan Emprendedores: "Bright modern home office with ocean view, neatly stacked branded packages on a minimalist desk, soft morning light through large windows."
      6. **details**: Natural language subject description with action/pose/clothing. Examples:
         - Envíos Express: "Confident courier in navy Deep Cobalt polo with Lemon Yellow trim and yellow cap, wearing safety helmet, riding light-blue electric scooter with square delivery box, mid-turn on coastal road."
         - Plan Emprendedores: "Smiling entrepreneur sealing a branded kraft box with tape, stacks of ready-to-ship packages beside laptop, natural window light illuminating face."

    {{else}}
      **Mode: Inspiration Image Analysis**
      Description: "{{description}}"
      Tags: [{{#each tags}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}]

      Suggest IMPROVED parameters:
      1. **sectionType**: From tags ('banner'→'Banner', 'web'→'Hero', 'card'→'Card', 'presentación'→'Banner'), else 'General'.
      2. **serviceName**: Infer from tags ('envios'/'delivery'→relevant service), else 'General'.
      3. **aspectRatio**: From description ('banner'/'web'→'16:9', 'square'→'1:1', 'story'/'vertical'→'9:16'), else '16:9 (Panorámica)'.
      4. **style**: From tags ('fotografía'→'Fotografía Realista', 'digital'/'ilustración'→'Ilustración Digital', '3d'→'Arte 3D'), else 'Fotografía Realista'.
      5. **background**: IMPROVE the background with natural language. Add specific lighting, landmarks, atmosphere. Example: if "fondo abstracto azul", suggest "fondo abstracto dinámico con degradado azul cobalto y amarillo limón, brillos sutiles evocando velocidad".
      6. **details**: IMPROVE the subject with natural language. Add specific action, clothing, props, brand integration. If delivery driver, ALWAYS include helmet. Example: if "repartidor en moto", suggest "repartidor amigable con casco en motocicleta eléctrica moderna color azul claro con caja cuadrada, circulando por la Rambla de Mar del Plata al atardecer, estela de luz dinámica".
    {{/if}}

    Output JSON format only.
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
