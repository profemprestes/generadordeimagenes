'use server';
/**
 * @fileOverview Flow que renderiza un prompt a imagen real con Nano Banana
 * (gemini-2.5-flash-image) y devuelve la imagen como data URI.
 *
 * - generateImage - Genera una imagen a partir de un prompt y un aspect ratio.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import { IMAGE_MODEL } from '@/ai/models';
import { ASPECT_RATIOS, type AspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES } from '@/lib/image-generation-errors';

const GenerateImageInputSchema = z.object({
  prompt: z.string().min(1).max(4000).describe('Prompt en inglés para el modelo de imagen.'),
  aspectRatio: z.enum(ASPECT_RATIOS).describe('Relación de aspecto de la imagen.'),
});
export type GenerateImageInput = { prompt: string; aspectRatio: AspectRatio };

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
    const response = await ai.generate({
      model: googleAI.model(IMAGE_MODEL, {
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
