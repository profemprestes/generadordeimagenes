// src/app/admin/crea-imagenes/servicios/actions.ts
'use server';

import { z } from 'zod';
import { generateServiceImagePrompt } from '@/ai/flows/generate-service-image-prompt';
import { suggestServiceImageDetails } from '@/ai/flows/suggest-service-image-details';
import { getServiceContext } from '@/lib/context/get-service-context';


// Define the output type for suggestServiceImageDetailsAction within this file
type SuggestServiceImageDetailsOutput = {
    backgroundDetails: string;
    contentDetails: string;
};
type GenerateServiceImagePromptInput = z.infer<typeof generateServiceImagePromptSchema>;


// --- Action para obtener contexto de un servicio ---
export async function getServiceContextAction(serviceName: string): Promise<{ success: boolean; context?: any; error?: string; }> {
    try {
        const context = getServiceContext(serviceName);
        if (!context) {
             return { success: false, error: `No se pudo cargar el contexto para ${serviceName}.` };
        }
        return { success: true, context };
    } catch (e: unknown) {
        console.error(`Error loading service context for ${serviceName}:`, e);
        return { success: false, error: `No se pudo cargar el contexto para ${serviceName}.` };
    }
}

// --- Action para sugerir detalles ---
export async function suggestServiceImageDetailsAction(serviceContext: any): Promise<{ success: boolean; data?: SuggestServiceImageDetailsOutput; error?: string; }> {
    try {
        const result = await suggestServiceImageDetails({ serviceContext });
        return { success: true, data: result };
    } catch (e: unknown) {
        console.error("Error suggesting image details:", e);
        const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
        return { success: false, error: `Hubo un error al obtener sugerencias de la IA: ${errorMessage}` };
    }
}


// --- Action para generar el prompt final ---
const generateServiceImagePromptSchema = z.object({
  serviceName: z.string(),
  serviceContext: z.string(),
  sectionType: z.string(),
  visualStyle: z.string(),
  backgroundDetails: z.string(),
  contentDetails: z.string(),
  includeText: z.boolean(),
  includeBrand: z.boolean(),
});

export interface GenerateServiceImagePromptState {
  prompt?: string;
  error?: string;
}

export async function generateServiceImagePromptAction(
  prevState: GenerateServiceImagePromptState,
  formData: FormData
): Promise<GenerateServiceImagePromptState> {
    const rawData = {
        serviceName: formData.get('serviceName'),
        serviceContext: formData.get('serviceContext'),
        sectionType: formData.get('sectionType'),
        visualStyle: formData.get('visualStyle'),
        backgroundDetails: formData.get('backgroundDetails'),
        contentDetails: formData.get('contentDetails'),
        includeText: formData.get('includeText') === 'true',
        includeBrand: formData.get('includeBrand') === 'true',
    };

  const validatedFields = generateServiceImagePromptSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return {
      error: 'Por favor, completa todos los campos requeridos.',
    };
  }

  try {
    const input: GenerateServiceImagePromptInput = validatedFields.data;
    const result = await generateServiceImagePrompt(input);
    return { prompt: result.prompt };
  } catch (e: unknown) {
    console.error("Error generating service image prompt:", e);
    const errorMessage = e instanceof Error ? e.message : 'Error desconocido.';
    return {
      error: `Hubo un error al generar el prompt: ${errorMessage}`,
    };
  }
}