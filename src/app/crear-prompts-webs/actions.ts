'use server';

import { z } from 'zod';
import {
  generateWebSectionPrompt,
  type GenerateWebSectionPromptOutput,
} from '@/ai/flows/generate-web-section-prompt';
import { findWebSectionContext } from '@/lib/docs-contenido';

const optimizeWebSectionPromptSchema = z.object({
  pageId: z.string().min(1),
  sectionId: z.string().min(1),
  slotId: z.string().optional(),
  slotName: z.string().optional(),
  visualStyle: z.string().min(1),
  colorMode: z.string().min(1),
  aspectRatio: z.string().min(1),
  brandEmphasis: z.boolean(),
  customInstructions: z.string().optional(),
  generateVariants: z.boolean(),
});

export type OptimizeWebSectionPromptInput = z.infer<typeof optimizeWebSectionPromptSchema>;

/**
 * Recibe solo ids + dirección de arte; la página, sección y snippet de código
 * se resuelven en el servidor desde docs/contenido.
 */
export async function optimizeWebSectionPromptAction(
  input: OptimizeWebSectionPromptInput
): Promise<{ success: boolean; data?: GenerateWebSectionPromptOutput; error?: string }> {
  const validated = optimizeWebSectionPromptSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, error: 'Por favor seleccioná una página, una sección y completá la dirección de arte.' };
  }

  try {
    const { pageId, sectionId, slotId, slotName, ...artDirection } = validated.data;
    const context = await findWebSectionContext(pageId, sectionId, slotId);
    if (!context) {
      return { success: false, error: 'No se encontró la página o sección seleccionada en docs/contenido.' };
    }

    const { page, section, slot, codeSnippet } = context;
    const result = await generateWebSectionPrompt({
      ...artDirection,
      pageTitle: page.title,
      pageUrl: page.url,
      sectionName: section.name,
      sectionType: section.type,
      sectionDescription: section.description,
      componentName: section.componentName,
      slotId: slot?.id,
      slotName: slotName || slot?.name || section.name,
      slotType: slot?.type,
      targetCodeSnippet: codeSnippet,
    });
    return { success: true, data: result };
  } catch (err: unknown) {
    console.error('Error in optimizeWebSectionPromptAction:', err);
    const errorMessage = err instanceof Error ? err.message : '';
    return {
      success: false,
      error: errorMessage || 'Ocurrió un error al generar el prompt de la sección web.',
    };
  }
}
