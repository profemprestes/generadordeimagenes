'use server';
/**
 * @fileOverview Flow to suggest creative details for a service-specific image.
 *
 * - suggestServiceImageDetails: A function that analyzes a service's context and suggests visual details.
 * - SuggestServiceImageDetailsInput: The input type for the function.
 * - SuggestServiceImageDetailsOutput: The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';

const SuggestServiceImageDetailsInputSchema = z.object({
  serviceContext: z.any().describe("The detailed JSON context of the service."),
});
export type SuggestServiceImageDetailsInput = z.infer<typeof SuggestServiceImageDetailsInputSchema>;

const SuggestServiceImageDetailsOutputSchema = z.object({
    backgroundDetails: z.string().describe("A creative and contextually relevant suggestion for the image background."),
    contentDetails: z.string().describe("A creative and detailed suggestion for the main subject and action of the image."),
});
type SuggestServiceImageDetailsOutput = z.infer<typeof SuggestServiceImageDetailsOutputSchema>;

export async function suggestServiceImageDetails(input: SuggestServiceImageDetailsInput): Promise<SuggestServiceImageDetailsOutput> {
  return suggestServiceImageDetailsFlow({
    ...input,
    companyProfile: companyProfile.company_profile
  });
}

const promptTemplate = ai.definePrompt({
  name: 'suggestServiceImageDetailsTemplate',
  input: { schema: z.any() },
  output: { schema: SuggestServiceImageDetailsOutputSchema },
  prompt: `
    You are an expert Creative Director for a logistics and delivery company called "{{companyProfile.identity.name}}" located in "{{companyProfile.location_contact.primary_city}}, Argentina".
    Your task is to analyze the context of a specific service and propose creative, visually compelling ideas for two key aspects of a promotional image: the background and the main content.
    Your suggestions must be concise, inspiring, and align with the company's professional, modern, and friendly brand identity.

    **Company Brand Identity:**
    - City: {{companyProfile.location_contact.primary_city}}. Your suggestions should evoke a coastal city vibe (e.g., mention "rambla", "costanera", "mar de fondo").
    - Colors: The brand uses a primary blue ({{companyProfile.branding.colors.theme_primary.hex}}) and a secondary yellow/orange (#FBBF24).

    **Service Context to Analyze:**
    '''
    {{serviceContext}}
    '''

    **Your Task:**
    Based *only* on the service context provided above, generate two distinct suggestions:

    1.  **backgroundDetails**: Propose a background that visually captures the essence of the service.
        - **For Envíos Express:** Suggest something dynamic like "fondo urbano dinámico con efecto bokeh y estelas de luz que evocan velocidad en la costanera de Mar del Plata."
        - **For Plan Emprendedores:** Suggest something professional like "oficina moderna y luminosa con vista al mar, elementos de paquetería y gráficos de crecimiento."
        - **For Delivery Gastronómico:** Suggest a scene like "entrada de un restaurante moderno y concurrido con el logo del restaurante visible."
        - **For Moto Fija:** Suggest a professional setting like "frente de un edificio de oficinas corporativas o un local comercial concurrido."

    2.  **contentDetails**: Describe a key scene or subject that embodies the service. Be specific and actionable.
        - **For Envíos Express:** Suggest a dynamic action shot, e.g., "repartidor con casco en una scooter eléctrica moderna, entregando un paquete a un cliente sonriente en la puerta de una casa con arquitectura de la costa."
        - **For Plan Emprendedores:** Suggest a scene of success, e.g., "emprendedor/a organizando varios paquetes con packaging de marca en un escritorio de trabajo creativo, con una ventana que muestra el mar de fondo."
        - **For Delivery Gastronómico:** Suggest a scene focused on the product, e.g., "primer plano de una bolsa de delivery de un restaurante de alta gama siendo entregada, con el vapor saliendo sutilmente."
        - **Crucially, if a person is a delivery driver ('repartidor'), always suggest they wear a helmet ('con casco') to obscure their face and ensure a professional, uniform look.**

    Provide your output in the required JSON format. Be creative and professional.
  `,
});


const suggestServiceImageDetailsFlow = ai.defineFlow(
  {
    name: 'suggestServiceImageDetailsFlow',
    inputSchema: z.any(),
    outputSchema: SuggestServiceImageDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
