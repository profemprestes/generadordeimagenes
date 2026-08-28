'use server';
/**
 * @fileOverview Flow to summarize a service page based on its relative path.
 *
 * - summarizeServicePage - A function that summarizes a service page.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getServiceContextFromPath } from '@/lib/context/get-service-context';

const SummarizeServicePageInputSchema = z.object({
  relativePath: z.string().describe("The relative path to the service page file, e.g., 'src/app/servicios/delivery-gastronomico/page.tsx'."),
});
type SummarizeServicePageInput = z.infer<typeof SummarizeServicePageInputSchema>;

const SummarizeServicePageOutputSchema = z.object({
  summary: z.string().describe("A detailed summary of the service, formatted to be used as context for other prompts."),
});
type SummarizeServicePageOutput = z.infer<typeof SummarizeServicePageOutputSchema>;

export async function summarizeServicePage(input: SummarizeServicePageInput): Promise<SummarizeServicePageOutput> {
  return summarizeServicePageFlow(input);
}

const promptTemplate = ai.definePrompt({
  name: 'summarizeServicePageTemplate',
  input: { schema: z.object({ serviceName: z.string(), serviceContext: z.any() }) },
  output: { schema: SummarizeServicePageOutputSchema },
  prompt: `
    You are an expert content assistant. Your task is to generate a clean, well-structured summary of a service based on the provided JSON context object.
    The output should be formatted as a single block of text, perfect for copying and pasting into a textarea to be used as context for another AI prompt.
    For each key in the JSON object, create a heading and then present its value.

    Example:
    If the JSON is:
    { "service": "My Service", "description": "A great service." }

    The output should be:
    Service: My Service
    Description: A great service.

    Now, process the following context:

    JSON Context:
    '''
    {{serviceContext}}
    '''

    Generate the detailed and comprehensive summary based on the JSON object provided.
  `,
});

const summarizeServicePageFlow = ai.defineFlow(
  {
    name: 'summarizeServicePageFlow',
    inputSchema: SummarizeServicePageInputSchema,
    outputSchema: SummarizeServicePageOutputSchema,
  },
  async (input) => {
    const serviceContext = getServiceContextFromPath(input.relativePath);

    if (!serviceContext) {
      throw new Error(`Could not find a context file mapping for the path: ${input.relativePath}`);
    }

    const pathSegments = input.relativePath.split('/');
    const serviceName = pathSegments[pathSegments.length - 2]?.replace(/-/g, ' ') || "Servicio Desconocido";

    const { output } = await promptTemplate({
      serviceName: serviceName,
      serviceContext: JSON.stringify(serviceContext, null, 2),
    });

    return output!;
  }
);
