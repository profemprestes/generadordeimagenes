'use server';
/**
 * @fileOverview Flow to suggest multiple creative details for a service-specific image.
 * Optimized with Nano Banana best practices (Oct 2025).
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
    backgroundSuggestions: z.array(z.string()).describe("A list of 3-5 creative background suggestions. Each must be a natural language sentence describing environment, lighting, landmarks, atmosphere. Target 20-40 words each."),
    contentSuggestions: z.array(z.string()).describe("A list of 3-5 creative content suggestions. Each must be a natural language sentence describing subject, action, pose, clothing, props. If delivery driver, always include helmet. Target 25-50 words each."),
});
type SuggestOptimalImageDetailsOutput = z.infer<typeof SuggestOptimalImageDetailsOutputSchema>;

export async function suggestOptimalImageDetails(input: z.infer<typeof SuggestOptimalImageDetailsInputSchema>): Promise<SuggestOptimalImageDetailsOutput> {
  return suggestOptimalImageDetailsFlow({
    ...input,
    companyProfile: companyProfile
  });
}

const promptTemplate = ai.definePrompt({
  name: 'suggestOptimalImageDetailsTemplate',
  input: { schema: z.any() },
  output: { schema: SuggestOptimalImageDetailsOutputSchema },
  prompt: `
    You are an expert Creative Director for Envíos DosRuedas (Mar del Plata logistics brand).
    Analyze the service context and propose 3-5 distinct, creative, visually compelling ideas for a promotional image.
    Use NATURAL LANGUAGE SENTENCES, not keyword lists. Be specific: describe environment, lighting, subject, action, clothing, props.
    Target 20-50 words per suggestion. Brand colors: Deep Cobalt #0636A5, Lemon Yellow #FFEC01, Brand Ink #00277C.
    Landmarks: Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub. Uniforms: navy polos, yellow trim/caps. Fleet: light-blue scooters, square boxes.

    **Service Context to Analyze:**
    '''
    {{serviceContext}}
    '''

    **Your Task:**
    Generate two JSON arrays: 'backgroundSuggestions' and 'contentSuggestions'. Each: 3-5 unique descriptive strings.

    1. **backgroundSuggestions** - Natural language sentences describing:
       - Environment/location (specific Mar del Plata landmarks when relevant)
       - Lighting (golden hour, blue hour, studio, natural, dramatic)
       - Atmosphere/mood (energetic, professional, calm, dynamic)
       - Color palette integration (brand colors in environment)
       Examples:
       - "Dynamic urban coastal scene along the Mar del Plata Rambla at golden hour, warm sunlight creating long shadows and bokeh light trails from passing traffic, iconic Casino Central silhouette in distance."
       - "Bright modern home office with panoramic ocean view, neatly stacked branded kraft packages on minimalist desk, soft morning light through floor-to-ceiling windows, subtle brand color accents in decor."
       - "High-speed abstract motion blur in Deep Cobalt and Lemon Yellow streaks, evoking velocity and efficiency, clean Soft Blue Tint negative space for text overlay."

    2. **contentSuggestions** - Natural language sentences describing:
       - Subject (who: courier, entrepreneur, client, hands)
       - Action/pose (what they're doing: riding, sealing box, receiving, organizing)
       - Clothing/props (uniform details, helmet, packages, devices)
       - Brand integration (colors on uniform, vehicle, packages)
       - CRITICAL: If delivery driver ('repartidor'), ALWAYS include helmet ('con casco') for professional look
       Examples:
       - "Confident courier in navy Deep Cobalt polo with Lemon Yellow trim and yellow cap, wearing white safety helmet, riding light-blue electric scooter with square delivery box mid-turn on coastal road, dynamic motion blur on wheels."
       - "Smiling entrepreneur sealing a branded kraft box with tape, stacks of ready-to-ship packages beside laptop, natural window light illuminating face, wearing casual professional attire."
       - "Close-up of weathered hands fastening Lemon Yellow strap on a Deep Cobalt delivery box, parcels stacked in background, soft side lighting emphasizing texture and brand colors."

    Provide JSON output only. Be creative, professional, and specific.
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
