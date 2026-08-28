'use server';
/**
 * @fileOverview Flow to suggest multiple creative details for a service-specific image.
 *
 * - suggestOptimalImageDetails: A function that analyzes a service's context and suggests visual details.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import companyProfile from '@/lib/empresa.json';

const SuggestOptimalImageDetailsInputSchema = z.object({
  serviceContext: z.any().describe("The detailed JSON context of the service."),
});

const SuggestOptimalImageDetailsOutputSchema = z.object({
    backgroundSuggestions: z.array(z.string()).describe("A list of 3-5 creative and contextually relevant suggestions for the image background."),
    contentSuggestions: z.array(z.string()).describe("A list of 3-5 creative and detailed suggestions for the main subject and action of the image."),
});
type SuggestOptimalImageDetailsOutput = z.infer<typeof SuggestOptimalImageDetailsOutputSchema>;

export async function suggestOptimalImageDetails(input: z.infer<typeof SuggestOptimalImageDetailsInputSchema>): Promise<SuggestOptimalImageDetailsOutput> {
  return suggestOptimalImageDetailsFlow({
    ...input,
    companyProfile: companyProfile.company_profile
  });
}

const promptTemplate = ai.definePrompt({
  name: 'suggestOptimalImageDetailsTemplate',
  input: { schema: z.any() },
  output: { schema: SuggestOptimalImageDetailsOutputSchema },
  prompt: `
    You are an expert Creative Director for a logistics company in Mar del Plata, Argentina.
    Your task is to analyze a service's context and propose a list of 3 to 5 distinct, creative, and visually compelling ideas for a promotional image. Provide separate lists for the background and the main content.
    Your suggestions must be concise, inspiring, and align with a professional, modern brand.

    **Brand Identity:**
    - City: {{companyProfile.location_contact.primary_city}}. Your suggestions should evoke a coastal city vibe (e.g., "rambla", "costanera", "mar de fondo").
    - Colors: The brand uses a primary blue ({{companyProfile.branding.colors.theme_primary.hex}}) and a secondary yellow/orange (#FBBF24).

    **Service Context to Analyze:**
    '''
    {{serviceContext}}
    '''

    **Your Task:**
    Based *only* on the service context provided, generate two JSON arrays: 'backgroundSuggestions' and 'contentSuggestions'. Each array should contain 3 to 5 unique, descriptive strings.

    1.  **backgroundSuggestions**: Propose a list of varied backgrounds.
        - **For Envíos Express:** Suggest dynamic scenes like "Fondo urbano con estelas de luz en la costanera de Mar del Plata al atardecer", "Mapa estilizado de la ciudad con una ruta brillante destacada", "Vista abstracta de alta velocidad con desenfoque de movimiento en tonos azules y amarillos".
        - **For Plan Emprendedores:** Suggest professional/creative scenes like "Oficina de un emprendedor con vista al mar, paquetes listos para enviar", "Fondo con gráficos de crecimiento y logística sobre un mapa de la ciudad", "Taller de diseño con productos artesanales y packaging de la marca".

    2.  **contentSuggestions**: Describe a list of key scenes or subjects.
        - **For Envíos Express:** Suggest dynamic actions like "Repartidor en moto eléctrica moderna en una curva cerrada, dejando una estela de luz", "Primer plano de un paquete con la etiqueta 'URGENTE' siendo entregado en mano", "Dron de delivery futurista sobrevolando la playa con un paquete".
        - **For Plan Emprendedores:** Suggest scenes of success like "Emprendedor/a sonriendo mientras sella una caja con su logo, lista para enviar", "Manos de un artesano terminando un producto con una pila de paquetes de Envios DosRuedas al fondo", "Collage de varios productos de emprendedores locales con el logo de la empresa".
        - **Crucially, if a person is a delivery driver ('repartidor'), always suggest they wear a helmet ('con casco') to obscure their face and ensure a professional, uniform look.**

    Provide your output in the required JSON format. Be creative and professional.
  `,
});

const suggestOptimalImageDetailsFlow = ai.defineFlow(
  {
    name: 'suggestOptimalImageDetailsFlow',
    inputSchema: z.any(),
    outputSchema: SuggestOptimalImageDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await promptTemplate(input);
    return output!;
  }
);
