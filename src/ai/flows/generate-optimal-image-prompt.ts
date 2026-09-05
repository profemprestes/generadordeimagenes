'use server';
/**
 * @fileOverview Flow to generate a detailed image prompt for a specific service using pre-suggested details.
 * Optimized with Prompt Architecture v2.0 for Nano Banana Pro (gemini-3-pro-image-preview).
 *
 * - generateOptimalImagePrompt: A function that creates a prompt for an image generation model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';
import { sanitizePromptSegment } from '@/lib/prompt-compiler';

const GenerateOptimalImagePromptInputSchema = z.object({
  serviceName: z.string().describe("The name of the service."),
  serviceContext: z.string().describe("The full JSON context of the service."),
  sectionType: z.string().describe("The intended use of the image, e.g., 'Banner Web (16:9)'."),
  visualStyle: z.string().describe("The desired visual style, e.g., 'Fotografía Urbana y Cinematográfica'."),
  backgroundDetails: z.string().describe("The selected background detail, either from AI suggestions or custom input."),
  contentDetails: z.string().describe("The selected content detail, either from AI suggestions or custom input."),
  includeText: z.boolean().describe("Whether to include the service name as text in the image."),
  includeBrand: z.boolean().describe("Whether to include the company name and phone number in the image."),
  fontToInclude: z.string().optional().describe("The specific font to use for the text."),
  additionalDetails: z.string().optional().describe("Any additional user-provided details for the image."),
});

const GenerateOptimalImagePromptOutputSchema = z.object({
  prompt: z.string().describe("The final, detailed prompt for the image generation model."),
});
type GenerateOptimalImagePromptOutput = z.infer<typeof GenerateOptimalImagePromptOutputSchema>;

export async function generateOptimalImagePrompt(input: z.infer<typeof GenerateOptimalImagePromptInputSchema>): Promise<GenerateOptimalImagePromptOutput> {
  const aspectRatio = input.sectionType.match(/\(([^)]+)\)/)?.[1] || '16:9';

  const flowInput = {
    ...input,
    aspectRatio,
    company: companyProfile,
  };

  return generateOptimalImagePromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateOptimalImagePromptTemplate',
  input: { schema: z.any() },
  output: { schema: GenerateOptimalImagePromptOutputSchema },
  prompt: `
    You are the lead Visual Art Director for Envíos DosRuedas, creating production-ready prompts according to Prompt Architecture v2.0 for Nano Banana Pro (gemini-3-pro-image-preview).

    STRICT ARCHITECTURAL RULES:
    1. Write a SINGLE DENSE, COHESIVE NARRATIVE PARAGRAPH in natural English.
    2. Target 80-120 words.
    3. Follow the 5-Layer Order:
       - Layer 1: Subject & Action (identidad del servicio, acción principal, repartidor con casco si aplica).
       - Layer 2: Environment & Staging (Mar del Plata o ciclorama de estudio limpio).
       - Layer 3: Materials & Surface Physics (texturas PBR: cartón kraft, polímero mate, titanio, cromo pulido).
       - Layer 4: Integrated Typography (texto literal entre comillas dobles, estilo tipográfico, relieve/grabado).
       - Layer 5: Optics, Lighting & Format (lente, apertura, esquema de iluminación, aspect ratio, resolución 4K).
    4. ABSOLUTELY FORBIDDEN:
       - Never output "Nano Banana", "photorealistic", "8k", "hyperrealistic", or "trending on artstation".
       - Never output comma-separated keyword lists.

    **Brand Identity Context:**
    - Company: {{company.empresa.nombre_oficial}}, a logistics company from {{company.contacto_y_ubicacion.base_operativa.ciudad}}, Argentina. Base hub: {{company.contacto_y_ubicacion.base_operativa.direccion}}, {{company.contacto_y_ubicacion.base_operativa.barrio}}.
    - Vibe: Professional, trustworthy, modern, and high-velocity.
    - Regional Setting: Mar del Plata coast, Rambla, Casino Central, Friuli 1972 hub.
    - Color Palette: Deep Cobalt (#0636A5), Lemon Yellow (#FFEC01), Brand Ink (#00277C), Soft Blue Tint (#E6EEFE).
    - Uniforms: Navy Deep Cobalt polos with Lemon Yellow trim, yellow cap, and white safety helmet on riders.
    - Fleet: Light-blue electric scooters with square delivery boxes.

    **Creative Direction:**
    - Service: "{{serviceName}}"
    - Section/Use Case: "{{sectionType}}" (Aspect Ratio: "{{aspectRatio}}")
    - Visual Style: "{{visualStyle}}"
    - Background Concept: "{{backgroundDetails}}"
    - Main Subject/Action: "{{contentDetails}}"
    {{#if additionalDetails}}
    - Additional Details: "{{additionalDetails}}"
    {{/if}}

    **Integrated Typography Rules:**
    {{#if includeText}}
    - Render the literal string "{{serviceName}}" integrated seamlessly in bold modern sans-serif in Lemon Yellow (#FFEC01) on the vehicle body or delivery box.
    {{/if}}
    {{#if includeBrand}}
    - Also render "{{company.empresa.nombre_oficial}}" with clean geometric typography.
    {{/if}}

    Generate the final, single-paragraph English prompt now:
  `,
});

const generateOptimalImagePromptFlow = ai.defineFlow(
  {
    name: 'generateOptimalImagePromptFlow',
    inputSchema: z.any(),
    outputSchema: GenerateOptimalImagePromptOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    const cleanPrompt = sanitizePromptSegment(output?.prompt || '');
    return { prompt: cleanPrompt };
  }
);

