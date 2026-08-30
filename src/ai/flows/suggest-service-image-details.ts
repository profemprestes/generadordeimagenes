import { z } from "genkit";
import { ai } from "../genkit";
import { SERVICE_CONTEXT_MAP, ServiceContextKey } from "../../lib/context/service-context-map";

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
  backgroundDetails: z.string(),
  contentDetails: z.string(),
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

    const response = await ai.generate({
      system: `You are a creative planner for Envíos DosRuedas digital assets in Mar del Plata. Suggest concise background details and main content details for an image.`,
      prompt: `Service details: ${JSON.stringify(service || {})}`,
      output: {
        schema: SuggestServiceImageDetailsOutputSchema
      }
    });

    return response.output!;
  }
);
