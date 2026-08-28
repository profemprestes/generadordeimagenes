// src/app/admin/crea-imagenes/optimas/actions.ts
'use server';

import { z } from 'zod';
import { generateOptimalImagePrompt } from '@/ai/flows/generate-optimal-image-prompt';
import { suggestOptimalImageDetails } from '@/ai/flows/suggest-optimal-image-details';
import { getServiceContext } from '@/lib/context/get-service-context';


// --- Action to get service context ---
export async function getOptimalServiceContextAction(serviceName: string): Promise<{ success: boolean; context?: any; error?: string; }> {
    try {
        const context = getServiceContext(serviceName);
        if (!context) {
             return { success: false, error: `No se pudo cargar el contexto para ${serviceName}. El archivo podría no existir o tener un formato incorrecto.` };
        }
        return { success: true, context };
    } catch (e) {
        console.error(`Error loading service context for ${serviceName}:`, e);
        const errorMessage = e instanceof Error ? e.message : "Error desconocido."
        return { success: false, error: `Error al cargar contexto: ${errorMessage}` };
    }
}

// --- Action to suggest details ---
export async function suggestOptimalImageDetailsAction(serviceContext: any): Promise<{ success: boolean; data?: { backgroundSuggestions: string[]; contentSuggestions: string[] }; error?: string; }> {
    try {
        const result = await suggestOptimalImageDetails({ serviceContext });
        return { success: true, data: result };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
        console.error("Error suggesting optimal image details:", e);
        return { success: false, error: `Hubo un error al obtener sugerencias de la IA: ${errorMessage}` };
    }
}

// --- Action to generate the final prompt ---
const generateOptimalImagePromptSchema = z.object({
  serviceName: z.string(), serviceContext: z.string(), sectionType: z.string(), visualStyle: z.string(),
  backgroundDetails: z.string(), contentDetails: z.string(), includeText: z.boolean(), includeBrand: z.boolean(),
  fontToInclude: z.string().optional(),
  additionalDetails: z.string().optional(),
});
type GenerateOptimalImagePromptInput = z.infer<typeof generateOptimalImagePromptSchema>;

export interface GenerateOptimalImagePromptState {
  prompt?: string; error?: string;
}

export async function generateOptimalImagePromptAction(prevState: GenerateOptimalImagePromptState, formData: FormData): Promise<GenerateOptimalImagePromptState> {
    const rawData = {
        serviceName: formData.get('serviceName'), serviceContext: formData.get('serviceContext'), sectionType: formData.get('sectionType'),
        visualStyle: formData.get('visualStyle'), backgroundDetails: formData.get('backgroundDetails'),
        contentDetails: formData.get('contentDetails'), includeText: formData.get('includeText') === 'true',
        includeBrand: formData.get('includeBrand') === 'true',
        fontToInclude: formData.get('fontToInclude') || '',
        additionalDetails: formData.get('additionalDetails') || '',
    };

  const validatedFields = generateOptimalImagePromptSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: 'Por favor, completa todos los campos requeridos.' };
  }

  try {
    const input: GenerateOptimalImagePromptInput = validatedFields.data;
    const result = await generateOptimalImagePrompt(input);
    return { prompt: result.prompt };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
    console.error("Error generating optimal image prompt:", e);
    return { error: `Hubo un error al generar el prompt: ${errorMessage}` };
  }
}
