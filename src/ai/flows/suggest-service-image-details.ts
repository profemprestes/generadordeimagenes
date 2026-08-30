import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { SERVICE_CONTEXT_MAP } from "../../lib/context/service-context-map";

export const SuggestServiceImageDetailsInputSchema = z.object({
  serviceKey: z.string()
});

export const SuggestServiceImageDetailsOutputSchema = z.object({
  recommendedScenes: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      recommendedRatio: z.enum(["16:9", "4:3", "1:1"]),
      suggestedStyle: z.enum(["photo", "render3d", "isometric"])
    })
  )
});

export const suggestServiceImageDetailsFlow = defineFlow(
  {
    name: "suggestServiceImageDetails",
    inputSchema: SuggestServiceImageDetailsInputSchema,
    outputSchema: SuggestServiceImageDetailsOutputSchema
  },
  async ({ serviceKey }) => {
    const service = SERVICE_CONTEXT_MAP[serviceKey as keyof typeof SERVICE_CONTEXT_MAP];

    const response = await ai.generate({
      system: `You are a creative planner for Envíos DosRuedas digital assets in Mar del Plata. Suggest 3 high-impact scene ideas for marketing and Google Business profile posts.`,
      prompt: `Service: ${service?.nombre || serviceKey}
Details: ${JSON.stringify(service || {})}`,
      output: {
        schema: SuggestServiceImageDetailsOutputSchema
      }
    });

    return response.output!;
  }
);
