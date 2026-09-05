'use server';
/**
 * @fileOverview Flow que renderiza un prompt a imagen real con Nano Banana Series
 * (gemini-3-pro-image-preview / gemini-3.1-flash-image-preview) y devuelve la imagen como data URI.
 *
 * - generateImage - Genera una imagen a partir de un prompt, aspect ratio y modelo.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import { DEFAULT_IMAGE_MODEL, NANO_BANANA_2, NANO_BANANA_PRO } from '@/ai/models';
import { ALL_ASPECT_RATIOS, type AspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES } from '@/lib/image-generation-errors';
import type { NanoBananaModel } from '@/types/prompt';

const GenerateImageInputSchema = z.object({
  prompt: z.string().min(1).max(4000).describe('Prompt en inglés para el modelo de imagen.'),
  aspectRatio: z.enum(ALL_ASPECT_RATIOS as [string, ...string[]]).describe('Relación de aspecto de la imagen.'),
  model: z.enum([NANO_BANANA_PRO, NANO_BANANA_2]).optional().describe('Modelo Nano Banana a utilizar.'),
  useSearchGrounding: z.boolean().optional().describe('Habilitar Google Search Grounding en Nano Banana 2.'),
});

export type GenerateImageInput = {
  prompt: string;
  aspectRatio: AspectRatio;
  model?: NanoBananaModel;
  useSearchGrounding?: boolean;
};

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('Imagen generada como data URI (data:image/png;base64,...).'),
  mimeType: z.string().describe('MIME type de la imagen generada.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const selectedModel = input.model || DEFAULT_IMAGE_MODEL;

    const response = await ai.generate({
      model: googleAI.model(selectedModel, {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: input.aspectRatio },
      }),
      prompt: input.prompt,
    });

    const media = response.media;
    if (!media?.url) {
      throw new Error(IMAGE_MESSAGES.noImage);
    }

    return {
      imageDataUri: media.url,
      mimeType: media.contentType ?? 'image/png',
    };
  }
);

