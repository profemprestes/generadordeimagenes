import { z } from "genkit";
import { ai } from "../genkit";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR } from "./brand-anchors";
import { BRAND_STYLE } from "../../lib/brand-style";

export const GenerateImagePromptInputSchema = z.object({
  sectionType: z.string().optional(),
  serviceName: z.string().optional(),
  topic: z.string().optional(),
  aspectRatio: z.string().default("16:9"),
  style: z.string().optional(),
  sceneType: z.string().optional(),
  background: z.string().optional(),
  additionalDetails: z.string().optional(),
  textToInclude: z.string().optional(),
});

export const GenerateImagePromptOutputSchema = z.object({
  prompt: z.string(),
});

export type GenerateImagePromptInput = z.infer<typeof GenerateImagePromptInputSchema>;
export type GenerateImagePromptOutput = z.infer<typeof GenerateImagePromptOutputSchema>;

export async function generateImagePrompt(input: GenerateImagePromptInput): Promise<GenerateImagePromptOutput> {
  return generateImagePromptFlow(input);
}

export const generateImagePromptFlow = ai.defineFlow(
  {
    name: "generateImagePromptFlow",
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema
  },
  async (input) => {
    const topic = input.topic || input.serviceName || input.sectionType || "Envíos DosRuedas";
    const aspectRatio = input.aspectRatio || "16:9";
    const style = input.style || input.sceneType || "editorial_photo";
    const anchor = style.includes("3d") || style.includes("3D") ? BRAND_3D_ANCHOR : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: `You are the lead visual art director for Envíos DosRuedas (Mar del Plata logistics company).
Generate precise, high-conversion prompts for diffusion models (Imagen 3 / SDXL / Flux).
- Palette: Primary Deep Cobalt (${BRAND_STYLE.colors.primary.hex}), Safety-Yellow (${BRAND_STYLE.colors.accent.hex}), and Brand Ink (${BRAND_STYLE.colors.ink.hex}).
- Local Mar del Plata landmarks when relevant (Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub).
- Uniforms: navy blue Deep Cobalt (#0636A5) with Lemon Yellow (#FFEC01) details and yellow cap.
- Fleet: light-blue scooters with square delivery boxes.
- No text overlays or artificial logos.`,
      prompt: `Create a visual prompt for the following topic: "${topic}".
Section: ${input.sectionType || "General"}.
Aspect ratio: ${aspectRatio}.
Style: ${style}.
Background details: ${input.background || "none"}.
Additional details: ${input.additionalDetails || "none"}.
Anchor to prepend: ${anchor}`,
      output: {
        schema: GenerateImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
