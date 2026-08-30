import { z } from "genkit";
import { ai } from "../genkit";
import { getServiceContext } from "../../lib/context/get-service-context";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR, BRAND_ISO_ANCHOR } from "./brand-anchors";
import { BRAND_STYLE } from "../../lib/brand-style";

export const GenerateServiceImagePromptInputSchema = z.object({
  serviceName: z.string().optional(),
  serviceContext: z.string().optional(),
  sectionType: z.string().optional(),
  visualStyle: z.string().optional(),
  backgroundDetails: z.string().optional(),
  contentDetails: z.string().optional(),
  includeText: z.boolean().optional(),
  includeBrand: z.boolean().optional(),
  serviceId: z.enum([
    "envios-express",
    "envios-lowcost",
    "envios-flex",
    "plan-emprendedores",
    "fulfillment-3pl"
  ]).optional(),
  styleMode: z.string().optional(),
  targetLocationOrUse: z.string().optional()
});

export const GenerateServiceImagePromptOutputSchema = z.object({
  prompt: z.string().describe("Structured visual prompt in English containing Subject, Action, Context MDQ, Composition, Lighting, and Camera style"),
  alt_es: z.string().describe("Accessible Spanish alt text description"),
  filename_kebab: z.string().describe("Kebab-case webp filename ending in .webp")
});

export type GenerateServiceImagePromptInput = z.infer<typeof GenerateServiceImagePromptInputSchema>;
export type GenerateServiceImagePromptOutput = z.infer<typeof GenerateServiceImagePromptOutputSchema>;

export async function generateServiceImagePrompt(input: GenerateServiceImagePromptInput): Promise<GenerateServiceImagePromptOutput> {
  return generateServiceImagePromptFlow(input);
}

export const generateServiceImagePromptFlow = ai.defineFlow(
  {
    name: "generateServiceImagePromptFlow",
    inputSchema: GenerateServiceImagePromptInputSchema,
    outputSchema: GenerateServiceImagePromptOutputSchema
  },
  async (input) => {
    const serviceName = input.serviceName || input.serviceId || "envios-express";
    let serviceContextObj: any = null;
    try {
      if (input.serviceContext) {
        serviceContextObj = typeof input.serviceContext === 'string' ? JSON.parse(input.serviceContext) : input.serviceContext;
      } else if (input.serviceId) {
        serviceContextObj = getServiceContext(input.serviceId);
      }
    } catch {
      serviceContextObj = null;
    }

    const styleMode = input.visualStyle || input.styleMode || "photo";
    const anchor =
      styleMode.includes("3d") || styleMode.includes("render3d")
        ? BRAND_3D_ANCHOR
        : styleMode.includes("isometric")
        ? BRAND_ISO_ANCHOR
        : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: `You are the lead Art Director & Prompt Engineer for Envíos DosRuedas (Mar del Plata, Argentina).
Brand Aesthetic Pillars:
- High-Velocity Cobalt (${BRAND_STYLE.colors.primary.hex})
- Safety-Yellow Impact (${BRAND_STYLE.colors.accent.hex})
- Brand Ink (${BRAND_STYLE.colors.ink.hex})
- Kinetic Industrialism & Digital Dispatch Modernism
- Data-Driven Efficiency & Local MDQ Reliability (Chauvín, Güemes, Rambla, Friuli 1972 hub)

Prompt Construction Rules:
1. Prepend the specific brand anchor: "${anchor}".
2. Construct a prompt strictly structured into 6 parts in English: (Subject, Action, Mar del Plata Context, Composition/Framing, Lighting, Camera/Render specs).
3. Do NOT include any text overlays or artificial text printed on the image unless explicitly requested.
4. Output JSON with fields: 'prompt' (the full English prompt starting with the anchor), 'alt_es' (a descriptive alt text in Spanish), and 'filename_kebab' (a kebab-case filename ending with .webp).`,
      prompt: `Service: ${serviceName}
Context Details: ${JSON.stringify(serviceContextObj || {})}
Section Type: ${input.sectionType || input.targetLocationOrUse || "Service Hero Asset"}
Style Mode / Visual Style: ${styleMode}
Background Details: ${input.backgroundDetails || "N/A"}
Content Details: ${input.contentDetails || "N/A"}
Base Hub: ${BRAND_STYLE.hub}
Anchor to use: ${anchor}`,
      output: {
        schema: GenerateServiceImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
