'use server';
/**
 * @fileOverview Flow to generate a detailed image prompt for a specific service using pre-suggested details.
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
    company: companyProfile.company_profile,
  };

  return generateOptimalImagePromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateOptimalImagePromptTemplate',
  input: { schema: z.any() },
  output: { schema: GenerateOptimalImagePromptOutputSchema },
  prompt: `
    You are a world-class expert in "prompt engineering" for Google's most advanced image generation models.
    Your task is to create a highly detailed, effective, and professional prompt in English based on the specific creative direction provided.

    **Brand Identity Context:**
    - Company: {{company.identity.name}}, a logistics company from {{company.location_contact.primary_city}}, Argentina.
    - Vibe: Professional, trustworthy, modern, and friendly.
    - Location: The image must subtly evoke a coastal city like {{company.location_contact.primary_city}} (e.g., include "coastal roads", "sea in the background", specific architectural styles).
    - Color Palette: The scene must prominently and naturally feature the brand's colors: a primary blue (like {{company.branding.colors.theme_primary.hex}}) and a secondary vibrant yellow/orange (like #FBBF24).

    **Text & Branding Rules (Apply strictly):**
    {{#unless includeText}}
      {{#unless includeBrand}}
        **No Text Rule:** Do NOT include any text, letters, logos, or writing of any kind.
      {{/unless}}
    {{/unless}}

    {{#if includeText}}
        **Service Name Text:** Include the text "{{serviceName}}" in the image. Use a bold, modern, tech-style font {{#if fontToInclude}}(similar to '{{fontToInclude}}'){{else}}(similar to 'Orbitron'){{/if}}. Apply a color scheme of white and yellow/orange for high contrast. The text must be perfectly integrated, legible, and stylish.
    {{/if}}

    {{#if includeBrand}}
        **Brand Info Text:** Also include the brand name "{{company.identity.name}}" and phone "{{company.location_contact.phone}}" in a smaller, clean, sans-serif font, tastefully placed in a corner.
    {{/if}}

    **Creative Direction for the Image:**
    - **Service:** "{{serviceName}}". The entire concept must revolve around this.
    - **Visual Style:** "{{visualStyle}}". Use expert keywords for this style (e.g., for 'Fotografía Urbana y Cinematográfica', use "cinematic shot, urban environment, dynamic composition, photorealistic, DSLR, 8k"; for 'Ilustración Vectorial', use "clean vector illustration, infographic style, corporate branding").
    - **Aspect Ratio:** The composition must be optimized for "{{aspectRatio}}".
    - **Background:** Use this as the core idea for the background: "{{backgroundDetails}}".
    - **Main Content/Subject:** Use this as the core idea for the main subjects and action: "{{contentDetails}}".
    {{#if additionalDetails}}
    - **Additional Details:** Incorporate these user-specific requests: "{{additionalDetails}}".
    {{/if}}

    **Final Prompt Optimization (Always Apply):**
    - The final prompt MUST be in **English**.
    - Structure: Start with shot type, describe main subject, then background, and finally, add style/quality keywords.
    - Be specific: "a friendly male courier in his 20s wearing a branded helmet".
    - Use powerful adjectives: "dynamic", "serene", "professional", "vibrant".
    - Add quality enhancers: "hyper-detailed", "cinematic lighting", "sharp focus", "8k resolution".
    - Seamlessly integrate the brand colors (blue and yellow/orange) into elements like vehicles, uniforms, or packages.

    Generate the final, single-paragraph English prompt below.
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
