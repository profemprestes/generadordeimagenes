import { z } from "genkit";
import { ai } from "../genkit";
import { SERVICE_CONTEXT_MAP, ServiceContextKey } from "../../lib/context/service-context-map";
import { BRAND_STYLE } from "../../lib/brand-style";

export const SuggestServiceImageDetailsInputSchema = z.object({
  serviceKey: z.enum([
    "envios-express",
    "envios-lowcost",
    "envios-flex",
    "plan-emprendedores",
    "fulfillment-3pl"
  ]).optional(),
  serviceContext: z.any().optional(),
});

export const SuggestServiceImageDetailsOutputSchema = z.object({
  backgroundDetails: z.string().describe("Natural language sentence describing background: environment, lighting, landmarks, atmosphere, brand color integration. Target 20-40 words."),
  contentDetails: z.string().describe("Natural language sentence describing subject, action, pose, clothing, props, brand integration. If delivery driver, include helmet. Target 25-50 words."),
});

export type SuggestServiceImageDetailsInput = z.infer<typeof SuggestServiceImageDetailsInputSchema>;
export type SuggestServiceImageDetailsOutput = z.infer<typeof SuggestServiceImageDetailsOutputSchema>;

export async function suggestServiceImageDetails(input: SuggestServiceImageDetailsInput): Promise<SuggestServiceImageDetailsOutput> {
  return suggestServiceImageDetailsFlow(input);
}

export const suggestServiceImageDetailsFlow = ai.defineFlow(
  {
    name: "suggestServiceImageDetailsFlow",
    inputSchema: SuggestServiceImageDetailsInputSchema,
    outputSchema: SuggestServiceImageDetailsOutputSchema
  },
  async (input) => {
    let service: any = input.serviceContext;
    if (!service && input.serviceKey) {
      service = SERVICE_CONTEXT_MAP[input.serviceKey as ServiceContextKey];
    }

    const serviceName = input.serviceKey || "envios-express";
    
    const response = await ai.generate({
      system: `You are a Creative Director for Envíos DosRuedas (Mar del Plata). Suggest concise background and content details for an image prompt following Nano Banana best practices (Oct 2025).

CRITICAL RULES:
- Use NATURAL LANGUAGE SENTENCES, not keyword lists
- Background: 20-40 words describing environment, lighting, landmarks, atmosphere, brand colors
- Content: 25-50 words describing subject, action, pose, clothing, props, brand integration
- If delivery driver ('repartidor'), ALWAYS include helmet ('con casco')
- Brand: Deep Cobalt #0636A5, Lemon Yellow #FFEC01, Brand Ink #00277C
- Landmarks: Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub
- Uniforms: navy polos with yellow trim/caps
- Fleet: light-blue scooters with square boxes`,
      prompt: `Service: ${serviceName}
Service Details: ${JSON.stringify(service || {})}

Generate two natural language sentences:
1. backgroundDetails: Environment + lighting + landmarks + atmosphere + brand colors
2. contentDetails: Subject + action + clothing/props + brand integration (+ helmet if courier)

EXAMPLES:
- Envíos Express background: "Dynamic urban coastal scene along the Mar del Plata Rambla at golden hour, warm sunlight creating long shadows and bokeh light trails from passing traffic, iconic Casino Central silhouette in distance."
- Envíos Express content: "Confident courier in navy Deep Cobalt polo with Lemon Yellow trim and yellow cap, wearing white safety helmet, riding light-blue electric scooter with square delivery box mid-turn on coastal road, dynamic motion blur on wheels."
- Plan Emprendedores background: "Bright modern home office with panoramic ocean view, neatly stacked branded kraft packages on minimalist desk, soft morning light through floor-to-ceiling windows, subtle brand color accents in decor."
- Plan Emprendedores content: "Smiling entrepreneur sealing a branded kraft box with tape, stacks of ready-to-ship packages beside laptop, natural window light illuminating face, wearing casual professional attire."`,
      output: {
        schema: SuggestServiceImageDetailsOutputSchema
      }
    });

    return response.output!;
  }
);
