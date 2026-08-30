import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR } from "./brand-anchors";

export const GenerateImagePromptInputSchema = z.object({
  topic: z.string(),
  aspectRatio: z.enum(["16:9", "4:3", "1:1", "3:2"]).default("16:9"),
  sceneType: z.enum(["editorial_photo", "product_3d", "social_media_action"]).default("editorial_photo")
});

export const GenerateImagePromptOutputSchema = z.object({
  prompt_en: z.string(),
  alt_es: z.string(),
  target_aspect_ratio: z.string(),
  recommended_resolution: z.string()
});

export const generateImagePromptFlow = defineFlow(
  {
    name: "generateImagePrompt",
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema
  },
  async ({ topic, aspectRatio, sceneType }) => {
    const anchor = sceneType === "product_3d" ? BRAND_3D_ANCHOR : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: `You are the lead visual art director for Envíos DosRuedas (Mar del Plata logistics company).
Generate precise, high-conversion prompts for diffusion models (Imagen 3 / SDXL / Flux).
- Include local Mar del Plata landmarks when relevant (Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub).
- Uniforms: navy blue Deep Cobalt (#0636A5) with Lemon Yellow (#FFEC01) details and yellow cap.
- Fleet: light-blue scooters with square delivery boxes.
- No text overlays or artificial logos.`,
      prompt: `Create a visual prompt for the following topic: "${topic}".
Aspect ratio: ${aspectRatio}.
Scene type: ${sceneType}.
Anchor to prepend: ${anchor}`,
      output: {
        schema: GenerateImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
