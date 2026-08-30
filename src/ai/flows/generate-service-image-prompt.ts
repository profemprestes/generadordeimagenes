import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { getServiceContext } from "../../lib/context/get-service-context";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR, BRAND_ISO_ANCHOR } from "./brand-anchors";
import { BRAND_STYLE } from "../../lib/brand-style";

export const GenerateServiceImagePromptInputSchema = z.object({
  serviceId: z.enum([
    "envios-express",
    "envios-lowcost",
    "envios-flex",
    "plan-emprendedores",
    "fulfillment-3pl"
  ]),
  styleMode: z.enum(["photo", "render3d", "isometric"]).default("photo"),
  targetLocationOrUse: z.string().optional()
});

export const GenerateServiceImagePromptOutputSchema = z.object({
  prompt: z.string(),
  alt_es: z.string(),
  filename_kebab: z.string(),
  aspect_ratio: z.enum(["16:9", "4:3", "1:1"]),
  aesthetic_tags: z.array(z.string())
});

export const generateServiceImagePromptFlow = defineFlow(
  {
    name: "generateServiceImagePrompt",
    inputSchema: GenerateServiceImagePromptInputSchema,
    outputSchema: GenerateServiceImagePromptOutputSchema
  },
  async ({ serviceId, styleMode, targetLocationOrUse }) => {
    const service = getServiceContext(serviceId);

    const anchor =
      styleMode === "render3d"
        ? BRAND_3D_ANCHOR
        : styleMode === "isometric"
        ? BRAND_ISO_ANCHOR
        : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: `You are the lead Art Director & Prompt Engineer for Envíos DosRuedas (Mar del Plata, Argentina).
Brand Aesthetic Pillars (Pomelli Brand Book & Google Business Profile 2026):
- High-Velocity Cobalt (#0636A5)
- Safety-Yellow Impact (#FFEC01)
- Kinetic Industrialism & Digital Dispatch Modernism
- Data-Driven Efficiency & Local Reliability

Prompt Construction Rules:
1. Always prepend the specific brand anchor.
2. Structure the prompt into 6 components: Subject, Action, Mar del Plata Context, Angle/Framing, Lighting, Camera/Render specs.
3. Keep surfaces clean: DO NOT generate overlaid typography or fake rendered logos on photos (logos are placed in post-production).
4. Provide a descriptive alt text in Argentinian Spanish and a clean kebab-case .webp filename.`,
      prompt: `Service: ${service.nombre} (${service.nombre_gbp})
SLA / Operational Focus: ${service.sla}
Base Hub: ${BRAND_STYLE.hub}
Target Placement: ${targetLocationOrUse || "Service Hero Asset"}
Style Mode: ${styleMode}
Anchor to use: ${anchor}`,
      output: {
        schema: GenerateServiceImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
