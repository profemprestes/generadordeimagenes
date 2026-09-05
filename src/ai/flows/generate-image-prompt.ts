import { z } from "genkit";
import { ai } from "../genkit";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR, BRAND_ISO_ANCHOR } from "./brand-anchors";
import { BRAND_STYLE } from "../../lib/brand-style";

export const GenerateImagePromptInputSchema = z.object({
  sectionType: z.string().optional(),
  serviceName: z.string().optional(),
  topic: z.string().optional(),
  aspectRatio: z.string().default("16:9"),
  style: z.string().optional(),
  sceneType: z.string().optional(),
  background: z.string().optional(),
  additionalDetails: z.string().optional(),
  textToInclude: z.string().optional(),
});

export const GenerateImagePromptOutputSchema = z.object({
  prompt: z.string(),
});

export type GenerateImagePromptInput = z.infer<typeof GenerateImagePromptInputSchema>;
export type GenerateImagePromptOutput = z.infer<typeof GenerateImagePromptOutputSchema>;

export async function generateImagePrompt(input: GenerateImagePromptInput): Promise<GenerateImagePromptOutput> {
  return generateImagePromptFlow(input);
}

export const generateImagePromptFlow = ai.defineFlow(
  {
    name: "generateImagePromptFlow",
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema
  },
  async (input) => {
    const topic = input.topic || input.serviceName || input.sectionType || "Envíos DosRuedas";
    const aspectRatio = input.aspectRatio || "16:9";
    const style = input.style || input.sceneType || "editorial_photo";
    
    let anchor: typeof BRAND_PHOTO_ANCHOR | typeof BRAND_3D_ANCHOR | typeof BRAND_ISO_ANCHOR = BRAND_PHOTO_ANCHOR;
    let styleCategory = "photography";
    let shotType = "medium shot";
    let lens = "50mm";
    let lighting = "natural daylight";
    let mood = "professional and trustworthy";
    let composition = "rule of thirds";
    let depthOfField = "shallow depth of field, f/2.8";

    if (style.includes("3d") || style.includes("3D")) {
      anchor = BRAND_3D_ANCHOR;
      styleCategory = "3d render";
      shotType = "product hero shot";
      lens = "100mm macro";
      lighting = "soft upper-left studio illumination with subtle contact shadows";
      mood = "clean, modern, and premium";
      composition = "centered with symmetrical framing";
      depthOfField = "deep focus, f/11";
    } else if (style.includes("Ilustración") || style.includes("ilustración") || style.includes("Digital")) {
      styleCategory = "digital illustration";
      anchor = BRAND_ISO_ANCHOR;
      shotType = "illustration";
      lens = "vector art";
      lighting = "clean flat lighting with subtle gradients";
      mood = "friendly, approachable, and energetic";
      composition = "dynamic diagonal composition with leading lines";
      depthOfField = "N/A";
    } else if (style.includes("Cinematográfico") || style.includes("cinematográfico")) {
      styleCategory = "cinematic photography";
      shotType = "cinematic wide shot";
      lens = "35mm anamorphic";
      lighting = "dramatic golden hour with rim lighting";
      mood = "cinematic, epic, and immersive";
      composition = "rule of thirds with foreground interest";
      depthOfField = "shallow depth of field, f/2.0";
    } else if (style.includes("Minimalista") || style.includes("minimalista")) {
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
      Hero: "Hero banner - impactful, wide establishing shot with strong focal point, designed for above-the-fold web placement",
      Card: "Card/thumbnail - compact, clear subject at smaller size, works well in grid layouts",
      Banner: "Banner - horizontal panoramic format, wide environmental context",
      General: "General purpose - versatile composition suitable for multiple uses",
      Ilustración: "Illustration - stylized artistic interpretation with brand aesthetic"
    }[input.sectionType ?? "General"] || "General purpose";

    const backgroundDesc = input.background ? `Background: ${input.background}. ` : "";
    const additionalDesc = input.additionalDetails ? `Additional scene details: ${input.additionalDetails}. ` : "";
    const textDesc = input.textToInclude ? `Text to render in image: "${input.textToInclude}" (keep under 25 characters, specify position). ` : "";

    const systemPrompt = `You are the lead visual art director for Envíos DosRuedas, creating prompts for state-of-the-art diffusion models (Imagen 3, Flux, SDXL).

CRITICAL RULES:
- Write prompts as NATURAL LANGUAGE SENTENCES, not keyword lists
- Target 80-120 words for optimal control (per Nano Banana best practices)
- Describe scenes completely: subject, action, environment, lighting, mood, camera specs, composition, aspect ratio
- Maintain STYLE CONSISTENCY - no conflicting instructions (e.g., never "photorealistic watercolor")
- For text rendering: max 25 chars total, 2-3 phrases max, specify font style and position explicitly
- Include specific technical details: lens, aperture, lighting type, composition rule
- Brand anchor MUST be naturally integrated, not just prepended`;

    const userPrompt = `Create a detailed, production-ready diffusion prompt following Nano Banana best practices (Oct 2025).

TOPIC: "${topic}"
SECTION TYPE: ${input.sectionType || "General"} (${sectionGuidance})
ASPECT RATIO: ${aspectRatio}
STYLE: ${style} → maps to ${styleCategory}

TECHNICAL SPECS TO INCLUDE:
- Shot type: ${shotType}
- Lens: ${lens}
- Lighting: ${lighting}
- Mood/Atmosphere: ${mood}
- Composition: ${composition}
- Depth of field: ${depthOfField}

BRAND CONTEXT: ${brandContext}

${backgroundDesc}${additionalDesc}${textDesc}

STRUCTURE YOUR PROMPT AS COMPLETE SENTENCES:
"[Style category] [shot type] of [subject] [action/pose] in [environment]. [Lighting description] creates [mood]. Captured with [lens] at [aperture/depth of field], [composition details]. [Brand-specific details naturally woven in]. [Aspect ratio] format."

EXAMPLE OUTPUT FORMAT:
"Photorealistic medium shot of a Envíos DosRuedas courier in navy Deep Cobalt polo (#0636A5) with Lemon Yellow trim (#FFEC01) and yellow cap, riding a light-blue electric scooter with square delivery box along the Mar del Plata Rambla at golden hour. Warm coastal sunlight creates dramatic rim lighting on the courier's silhouette, evoking energetic reliability. Captured with 50mm f/2.8, shallow depth of field blurs the iconic Casino Central backdrop while keeping the courier and parcels in sharp focus. Rule of thirds composition places the rider entering from left third. 16:9 cinematic format."

Generate the prompt now:`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: userPrompt,
      output: {
        schema: GenerateImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
