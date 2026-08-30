'use server';

import { z } from 'zod';
import { generateImage } from '@/ai/flows/generate-image';
import { parseAspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES, toUserFacingError } from '@/lib/image-generation-errors';

export type GenerateImageResult =
  | { imageDataUri: string; mimeType: string }
  | { error: string };

const generateImageInputSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, IMAGE_MESSAGES.promptRequired)
    .max(4000, IMAGE_MESSAGES.promptTooLong),
  aspectRatio: z.string().optional(),
});

/**
 * Única puerta de entrada desde el cliente para generar una imagen.
 * Nunca lanza: todo error se devuelve como `{ error }` en español.
 */
export async function generateImageAction(input: {
  prompt: string;
  aspectRatio?: string;
}): Promise<GenerateImageResult> {
  const validated = generateImageInputSchema.safeParse(input);
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? IMAGE_MESSAGES.promptRequired };
  }

  try {
    const result = await generateImage({
      prompt: validated.data.prompt,
      aspectRatio: parseAspectRatio(validated.data.aspectRatio),
    });
    return { imageDataUri: result.imageDataUri, mimeType: result.mimeType };
  } catch (e: unknown) {
    console.error('Error generating image:', e);
    return { error: toUserFacingError(e) };
  }
}
