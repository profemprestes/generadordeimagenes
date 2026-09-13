'use server';

import {
  generateWebSectionPrompt,
  type GenerateWebSectionPromptInput,
  type GenerateWebSectionPromptOutput,
} from '@/ai/flows/generate-web-section-prompt';
import { getAllWebPagesDocs, type WebPageDoc } from '@/lib/docs-contenido';

export async function fetchWebPagesDocs(): Promise<WebPageDoc[]> {
  try {
    return await getAllWebPagesDocs();
  } catch (error) {
    console.error('Error fetching web pages docs:', error);
    return [];
  }
}

export async function optimizeWebSectionPromptAction(
  input: GenerateWebSectionPromptInput
): Promise<{ success: boolean; data?: GenerateWebSectionPromptOutput; error?: string }> {
  try {
    const result = await generateWebSectionPrompt(input);
    return { success: true, data: result };
  } catch (err: any) {
    console.error('Error in optimizeWebSectionPromptAction:', err);
    return {
      success: false,
      error: err?.message || 'Ocurrió un error al generar el prompt de la sección web.',
    };
  }
}
