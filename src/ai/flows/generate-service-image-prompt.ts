import { z } from "genkit";
import { ai } from "../genkit";
import { getServiceContext } from "../../lib/context/get-service-context";
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
  prompt: z.string().describe("Production-ready diffusion prompt following Nano Banana best practices: natural language sentences, 80-120 words, complete scene description with subject, action, environment, lighting, mood, camera specs, composition, aspect ratio"),
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
    
    // Map styleMode to technical specs
    let styleCategory = "photography";
    let shotType = "medium shot";
    let lens = "50mm";
    let lighting = "natural daylight";
    let mood = "professional and trustworthy";
    let composition = "rule of thirds";
    let depthOfField = "shallow depth of field, f/2.8";

    if (styleMode.includes("3d") || styleMode.includes("render3d")) {
      styleCategory = "3d render";
      shotType = "product hero shot";
      lens = "100mm macro";
      lighting = "soft upper-left studio illumination with subtle contact shadows";
      mood = "clean, modern, and premium";
      composition = "centered with symmetrical framing";
      depthOfField = "deep focus, f/11";
    } else if (styleMode.includes("isometric")) {
      styleCategory = "isometric 3D illustration";
      shotType = "isometric illustration";
      lens = "30-degree isometric";
      lighting = "clean clay-like shading";
      mood = "clean, architectural, precise";
      composition = "30-degree isometric grid, clean white background";
      depthOfField = "N/A";
    } else if (styleMode.includes("cinematic") || styleMode.includes("Cinematográfica")) {
      styleCategory = "cinematic photography";
      shotType = "cinematic wide shot";
      lens = "35mm anamorphic";
      lighting = "dramatic golden hour with rim lighting";
      mood = "cinematic, epic, and immersive";
      composition = "rule of thirds with foreground interest";
      depthOfField = "shallow depth of field, f/2.0";
    } else if (styleMode.includes("vector") || styleMode.includes("Vectorial")) {
      styleCategory = "digital vector illustration";
      shotType = "illustration";
      lens = "vector art";
      lighting = "clean flat lighting with subtle gradients";
      mood = "friendly, approachable, and energetic";
      composition = "dynamic diagonal composition with leading lines";
      depthOfField = "N/A";
    } else if (styleMode.includes("minimal") || styleMode.includes("Minimalista")) {
      styleCategory = "minimalist photography";
      shotType = "clean product shot";
      lens = "85mm";
      lighting = "soft diffused studio lighting";
      mood = "clean, calm, and sophisticated";
      composition = "centered with ample negative space";
      depthOfField = "deep focus, f/16";
    }

    const brandContext = `Envíos DosRuedas (Mar del Plata logistics brand). Brand colors: Deep Cobalt #0636A5 (primary), Lemon Yellow #FFEC01 (accent), Brand Ink #00277C, Soft Blue Tint #E6EEFE. Uniforms: navy Deep Cobalt polos with Lemon Yellow trim and yellow caps. Fleet: light-blue scooters with square delivery boxes. Location: Mar del Plata landmarks (Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub).`;

    const sectionGuidance = {
      "Hero": "Hero banner - impactful, wide establishing shot with strong focal point",
      "Card": "Card/thumbnail - compact, clear subject at smaller size",
      "Banner": "Banner - horizontal panoramic format, wide environmental context",
      "General": "General purpose - versatile composition",
      "Ilustración": "Illustration - stylized artistic interpretation with brand aesthetic"
    }[input.sectionType ?? "General"] || "General purpose";

    const textGuidance = (input.includeText || input.includeBrand) ? 
      `Text to render: ${input.includeText ? `"${serviceName}"` : ''} ${input.includeBrand ? `"${BRAND_STYLE.name}" and phone` : ''}. Max 25 chars total. Specify font style (bold/sans-serif) and position (top/bottom/center).` : 
      "No text overlays or artificial logos.";

    const response = await ai.generate({
      system: `You are the lead Art Director for Envíos DosRuedas, creating production-ready prompts for diffusion models (Imagen 3, Flux, SDXL) following Nano Banana best practices (Oct 2025).

CRITICAL RULES:
- Write prompts as NATURAL LANGUAGE SENTENCES, not keyword lists
- Target 80-120 words for optimal control
- Describe scenes completely: subject, action, environment, lighting, mood, camera specs, composition, aspect ratio
- Maintain STYLE CONSISTENCY - no conflicting instructions (never "photorealistic watercolor")
- For text rendering: max 25 chars total, 2-3 phrases max, specify font style and position explicitly
- Include specific technical details: lens, aperture, lighting type, composition rule
- Brand details MUST be naturally woven into the scene, not just prepended
- Output JSON with: 'prompt' (full English prompt), 'alt_es' (Spanish alt text), 'filename_kebab' (kebab-case .webp filename)`,
      prompt: `Service: ${serviceName}
Section Type: ${input.sectionType || input.targetLocationOrUse || "Service Hero Asset"} (${sectionGuidance})
Style Mode: ${styleMode} → maps to ${styleCategory}
Aspect Ratio: (inferred from sectionType or default 16:9)

TECHNICAL SPECS TO INCLUDE:
- Shot type: ${shotType}
- Lens: ${lens}
- Lighting: ${lighting}
- Mood/Atmosphere: ${mood}
- Composition: ${composition}
- Depth of field: ${depthOfField}

BRAND CONTEXT: ${brandContext}

BACKGROUND CONCEPT: ${input.backgroundDetails || "N/A"}
MAIN SUBJECT/ACTION: ${input.contentDetails || "N/A"}
TEXT REQUIREMENTS: ${textGuidance}

PROMPT STRUCTURE (follow exactly):
"[Style Category] [Shot Type] of [Subject] [Action/Pose] in [Environment]. [Lighting Description] creates [Mood]. Captured with [Lens] at [Aperture/Depth of Field], [Composition Details]. [Brand-specific details naturally woven in]. [Aspect Ratio] format."

EXAMPLE OUTPUT:
"Cinematic wide shot of an Envíos DosRuedas courier in navy Deep Cobalt polo (#0636A5) with Lemon Yellow trim (#FFEC01) and yellow cap, riding a light-blue electric scooter with square delivery box along the Mar del Plata Rambla at golden hour. Warm coastal sunlight creates dramatic rim lighting on the courier's silhouette, evoking energetic reliability. Captured with 35mm anamorphic f/2.0, shallow depth of field blurs the iconic Casino Central backdrop while keeping the courier and parcels in sharp focus. Rule of thirds composition places the rider entering from left third. 16:9 cinematic format."`,
      output: {
        schema: GenerateServiceImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
