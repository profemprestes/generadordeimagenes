'use server';
/**
 * @fileOverview Flow to generate a detailed image prompt for a specific service.
 *
 * - generateServiceImagePrompt: A function that creates a prompt for an image generation model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';

const GenerateServiceImagePromptInputSchema = z.object({
  serviceName: z.string().describe("The name of the service for which the image is being created."),
  serviceContext: z.string().describe("The full JSON context of the service."),
  sectionType: z.string().describe("The intended use of the image, e.g., 'Banner Web (16:9)', 'Post Red Social (1:1)'."),
  visualStyle: z.string().describe("The desired visual style, e.g., 'Fotografía Urbana y Cinematográfica'."),
  backgroundDetails: z.string().describe("AI-suggested details for the background."),
  contentDetails: z.string().describe("AI-suggested details for the main content."),
  includeText: z.boolean().describe("Whether to include the service name as text in the image."),
  includeBrand: z.boolean().describe("Whether to include the company name and phone number in the image."),
});
type GenerateServiceImagePromptInput = z.infer<typeof GenerateServiceImagePromptInputSchema>;

const GenerateServiceImagePromptOutputSchema = z.object({
  prompt: z.string().describe("The final, detailed prompt for the image generation model."),
});
type GenerateServiceImagePromptOutput = z.infer<typeof GenerateServiceImagePromptOutputSchema>;

export async function generateServiceImagePrompt(input: GenerateServiceImagePromptInput): Promise<GenerateServiceImagePromptOutput> {
  const aspectRatio = input.sectionType.match(/\(([^)]+)\)/)?.[1] || '16:9';

  const flowInput = {
    ...input,
    aspectRatio,
    company: companyProfile.company_profile,
  };

  return generateServiceImagePromptFlow(flowInput);
}

const promptTemplate = ai.definePrompt({
  name: 'generateServiceImagePromptTemplate',
  input: { schema: z.any() },
  output: { schema: GenerateServiceImagePromptOutputSchema },
  prompt: `
    You are a world-class expert in "prompt engineering" for Google's most advanced image generation models (like Imagen or Gemini).
    Your task is to create a highly detailed, effective, and professional prompt in English. The goal is to generate a superior quality image that is perfectly aligned with a brand's identity.

    **Brand Identity Context:**
    - Company: {{company.identity.name}}, a logistics company from {{company.location_contact.primary_city}}, Argentina.
    - Vibe: Professional, trustworthy, modern, and friendly.
    - Location: The image must subtly evoke a coastal city like {{company.location_contact.primary_city}} (e.g., include coastal roads, sea in the background, specific architectural styles).
    - Color Palette: The scene must prominently and naturally feature the brand's colors: a primary blue (like {{company.branding.colors.theme_primary.hex}}) and a secondary vibrant yellow/orange (like #FBBF24).

    **Text & Branding Rules (Apply these strictly):**
    1.  {{#if includeText}}
        **Service Name Text:** Include the text "{{serviceName}}" in the image. Use a bold, modern, tech-style font (similar to Orbitron). Apply a color scheme of white and yellow/orange to the words for high contrast and visual appeal (e.g., if text is "Envios Express", "Envios" could be white and "Express" yellow). The text must be perfectly integrated, legible, and stylish.
        {{/if}}
    2.  {{#if includeBrand}}
        **Brand Name Text:** Also include the brand name "{{company.identity.name}}" and the phone number "{{company.location_contact.phone}}" in a smaller, clean, sans-serif font, tastefully placed in a corner.
        {{/if}}
    3.  {{#unless includeText}}{{#unless includeBrand}}
        **No Text Rule:** Do NOT include any text, letters, logos, or writing of any kind in the image.
        {{/unless}}{{/unless}}

    **Creative Direction for the Image:**
    Based on the user's request, you will generate a prompt that combines the following elements into a single, cohesive, and masterful instruction for the AI.

    - **Service:** "{{serviceName}}". The entire concept must revolve around this service.
    - **Visual Style:** "{{visualStyle}}". Use expert keywords to achieve this style.
        - For 'Fotografía Urbana y Cinematográfica': use terms like "cinematic shot, urban environment, dynamic composition, photorealistic, DSLR, 8k, professional photography, soft natural lighting, long exposure for light trails at night".
        - For 'Ilustración Vectorial Infográfica': use terms like "clean vector illustration, infographic style, isometric perspective, corporate branding, data visualization elements, simplified characters".
        - For 'Render 3D Promocional': use terms like "3D render, promotional style, hyper-detailed, Unreal Engine 5, octane render, clean product shot, dynamic lighting".
        - For 'Fotografía Humanizada (con Enfoque Minimalista)': use terms like "warm and authentic photography, shallow depth of field, minimalist composition, focus on human interaction, natural light, candid moment".
    - **Aspect Ratio:** The composition must be optimized for "{{aspectRatio}}".
    - **Background:** Use this as the core idea for the background: "{{backgroundDetails}}".
    - **Main Content/Subject:** Use this as the core idea for the main subjects and action: "{{contentDetails}}".

    **Final Prompt Optimization (Always Apply):**
    - The final prompt MUST be in **English**.
    - Structure: Start with the shot type (e.g., "Cinematic action shot,"), describe the main subject, then the background, and finally, add style and quality keywords.
    - Be specific: Instead of "a man", use "a friendly male courier in his 20s wearing a branded helmet".
    - Use powerful adjectives: "dynamic", "serene", "professional", "vibrant".
    - Add quality enhancers: "hyper-detailed", "cinematic lighting", "sharp focus", "8k resolution".
    - Seamlessly integrate the brand colors (blue and yellow/orange) into elements like vehicles, uniforms, packages, or subtle environmental details.

    Now, generate the final, single-paragraph English prompt below.
  `,
});

const generateServiceImagePromptFlow = ai.defineFlow(
  {
    name: 'generateServiceImagePromptFlow',
    inputSchema: z.any(),
    outputSchema: GenerateServiceImagePromptOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
