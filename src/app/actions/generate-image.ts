'use server';

import { z } from 'zod';
import { generateImage } from '@/ai/flows/generate-image';
import { parseAspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES, toUserFacingError } from '@/lib/image-generation-errors';
import { NANO_BANANA_2, NANO_BANANA_PRO } from '@/ai/models';
import type { NanoBananaModel } from '@/types/prompt';

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
  model: z.enum([NANO_BANANA_PRO, NANO_BANANA_2]).optional(),
  useSearchGrounding: z.boolean().optional(),
});

/**
 * Única puerta de entrada desde el cliente para generar una imagen.
 * Nunca lanza: todo error se devuelve como `{ error }` en español.
 */
export async function generateImageAction(input: {
  prompt: string;
  aspectRatio?: string;
  model?: NanoBananaModel;
  useSearchGrounding?: boolean;
}): Promise<GenerateImageResult> {
  const validated = generateImageInputSchema.safeParse(input);
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? IMAGE_MESSAGES.promptRequired };
  }

  try {
    const result = await generateImage({
      prompt: validated.data.prompt,
      aspectRatio: parseAspectRatio(validated.data.aspectRatio),
      model: validated.data.model,
      useSearchGrounding: validated.data.useSearchGrounding,
    });
    return { imageDataUri: result.imageDataUri, mimeType: result.mimeType };
  } catch (e: unknown) {
    console.error('Error generating image:', e);
    return { error: toUserFacingError(e) };
  }
}

