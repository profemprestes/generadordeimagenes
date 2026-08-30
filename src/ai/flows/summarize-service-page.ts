import { z } from "genkit";
import { ai } from "../genkit";
import { getServiceContextFromPath } from "@/lib/context/get-service-context";

export const SummarizeServicePageInputSchema = z.object({
  relativePath: z.string().describe("The relative path to the service page file, e.g., 'src/app/servicios/envios-express/page.tsx'."),
});

export const SummarizeServicePageOutputSchema = z.object({
  summary: z.string().describe("A summary of the key features, value propositions, and context of the service page."),
});

export type SummarizeServicePageInput = z.infer<typeof SummarizeServicePageInputSchema>;
export type SummarizeServicePageOutput = z.infer<typeof SummarizeServicePageOutputSchema>;

export async function summarizeServicePage(input: SummarizeServicePageInput): Promise<SummarizeServicePageOutput> {
  return summarizeServicePageFlow(input);
}

export const summarizeServicePageFlow = ai.defineFlow(
  {
    name: "summarizeServicePageFlow",
    inputSchema: SummarizeServicePageInputSchema,
    outputSchema: SummarizeServicePageOutputSchema
  },
  async (input) => {
    const contextObj = getServiceContextFromPath(input.relativePath);
    const contextText = contextObj ? JSON.stringify(contextObj, null, 2) : input.relativePath;

    const response = await ai.generate({
      system: "You summarize service page contexts for image prompt generation.",
      prompt: `Summarize service context details:\n${contextText}`,
      output: {
        schema: SummarizeServicePageOutputSchema
      }
    });

    return response.output!;
  }
);
