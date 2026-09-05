'use server';
/**
 * @fileOverview Flow to generate a detailed image prompt for a specific service using pre-suggested details.
 * Optimized with Nano Banana best practices (Oct 2025).
 *
 * - generateOptimalImagePrompt: A function that creates a prompt for an image generation model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';

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
    You are the lead Visual Art Director for Envíos DosRuedas, creating production-ready prompts for state-of-the-art diffusion models (Imagen 3, Flux, SDXL) following Nano Banana best practices (Oct 2025).

    CRITICAL RULES:
    - Write prompts as NATURAL LANGUAGE SENTENCES, not keyword lists
    - Target 80-120 words for optimal control
    - Describe scenes completely: subject, action, environment, lighting, mood, camera specs, composition, aspect ratio
    - Maintain STYLE CONSISTENCY - no conflicting instructions (e.g., never "photorealistic watercolor")
    - For text rendering: max 25 chars total, 2-3 phrases max, specify font style and position explicitly
    - Include specific technical details: lens, aperture, lighting type, composition rule
    - Brand details MUST be naturally woven into the scene, not just listed

    **Brand Identity Context:**
    - Company: {{company.empresa.nombre_oficial}}, a logistics company from {{company.contacto_y_ubicacion.base_operativa.ciudad}}, Argentina. Base hub: {{company.contacto_y_ubicacion.base_operativa.direccion}}, {{company.contacto_y_ubicacion.base_operativa.barrio}}.
    - Vibe: Professional, trustworthy, modern, and friendly.
    - Location: Subtly evoke Mar del Plata landmarks (Chauvín, Güemes, Rambla, coastal roads, Friuli 1972 hub).
    - Color Palette: Deep Cobalt (#0636A5), Lemon Yellow (#FFEC01), Brand Ink (#00277C), Soft Blue Tint (#E6EEFE).
    - Uniforms: Navy Deep Cobalt polos with Lemon Yellow trim and yellow caps.
    - Fleet: Light-blue scooters with square delivery boxes.

    **Visual Style Mapping:**
    {{#if visualStyle}}
    {{#eq visualStyle "Fotografía Urbana y Cinematográfica"}}
    Style Category: Cinematic photography
    Shot Type: Cinematic wide shot
    Lens: 35mm anamorphic
    Lighting: Dramatic golden hour with rim lighting
    Mood: Cinematic, epic, immersive
    Composition: Rule of thirds with foreground interest
    Depth of Field: Shallow, f/2.0
    {{/eq}}
    {{#eq visualStyle "Fotografía Realista"}}
    Style Category: Photorealistic photography
    Shot Type: Medium shot
    Lens: 50mm
    Lighting: Natural daylight, soft coastal sun
    Mood: Professional, trustworthy, energetic
    Composition: Rule of thirds
    Depth of Field: Shallow, f/2.8
    {{/eq}}
    {{#eq visualStyle "Ilustración Vectorial"}}
    Style Category: Digital vector illustration
    Shot Type: Illustration
    Lens: Vector art
    Lighting: Clean flat lighting with subtle gradients
    Mood: Friendly, approachable, energetic
    Composition: Dynamic diagonal with leading lines
    Depth of Field: N/A
    {{/eq}}
    {{#eq visualStyle "Arte 3D"}}
    Style Category: 3D product render
    Shot Type: Product hero shot
    Lens: 100mm macro
    Lighting: Soft upper-left studio illumination, subtle contact shadows
    Mood: Clean, modern, premium
    Composition: Centered with symmetrical framing
    Depth of Field: Deep focus, f/11
    {{/eq}}
    {{#eq visualStyle "Estilo Minimalista"}}
    Style Category: Minimalist photography
    Shot Type: Clean product shot
    Lens: 85mm
    Lighting: Soft diffused studio lighting
    Mood: Clean, calm, sophisticated
    Composition: Centered with ample negative space
    Depth of Field: Deep focus, f/16
    {{/eq}}
    {{/if}}

    **Text & Branding Rules:**
    {{#unless includeText}}
      {{#unless includeBrand}}
        **No Text Rule:** Do NOT include any text, letters, logos, or writing of any kind.
      {{/unless}}
    {{/unless}}

    {{#if includeText}}
        **Service Name Text:** Include the text "{{serviceName}}" in the image. Use a bold, modern, tech-style font {{#if fontToInclude}}(similar to '{{fontToInclude}}'){{else}}(similar to 'Orbitron'){{/if}}. Apply a color scheme of white and Lemon Yellow (#FFEC01) for high contrast. Position: centered at bottom or top. The text must be perfectly integrated, legible, and stylish. Total characters under 25.
    {{/if}}

    {{#if includeBrand}}
        **Brand Info Text:** Also include the brand name "{{company.empresa.nombre_oficial}}" and phone "{{company.contacto_y_ubicacion.canales.telefono_whatsapp}}" in a smaller, clean, sans-serif font, tastefully placed in a corner.
    {{/if}}

    **Creative Direction for the Image:**
    - **Service:** "{{serviceName}}". The entire concept must revolve around this.
    - **Section/Use Case:** "{{sectionType}}"
    - **Aspect Ratio:** "{{aspectRatio}}" - compose accordingly
    - **Background Concept:** "{{backgroundDetails}}"
    - **Main Subject/Action:** "{{contentDetails}}"
    {{#if additionalDetails}}
    - **Additional Details:** "{{additionalDetails}}"
    {{/if}}

    **PROMPT STRUCTURE (follow exactly):**
    "[Style Category] [Shot Type] of [Subject] [Action/Pose] in [Environment]. [Lighting Description] creates [Mood]. Captured with [Lens] at [Aperture/Depth of Field], [Composition Details]. [Brand-specific details naturally woven in]. [Aspect Ratio] format."

    **EXAMPLE OUTPUT:**
    "Cinematic wide shot of an Envíos DosRuedas courier in navy Deep Cobalt polo (#0636A5) with Lemon Yellow trim (#FFEC01) and yellow cap, riding a light-blue electric scooter with square delivery box along the Mar del Plata Rambla at golden hour. Warm coastal sunlight creates dramatic rim lighting on the courier's silhouette, evoking energetic reliability. Captured with 35mm anamorphic f/2.0, shallow depth of field blurs the iconic Casino Central backdrop while keeping the courier and parcels in sharp focus. Rule of thirds composition places the rider entering from left third. 16:9 cinematic format."

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
    return output!;
  }
);
