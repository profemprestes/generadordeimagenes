import { z } from "genkit";
import { ai } from "../genkit";
import { BRAND_STYLE } from "../../lib/brand-style";
import { sanitizePromptSegment } from "../../lib/prompt-compiler";

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
    const style = input.style || input.sceneType || "Fotografía Urbana y Cinematográfica";
    
    let styleCategory = "Cinematic photography";
    let shotType = "cinematic medium shot";
    let lens = "35mm anamorphic";
    let lighting = "golden hour with subtle rim lighting";
    let mood = "dynamic, dependable, and high-velocity";
    let composition = "rule of thirds with clean leading lines";
    let depthOfField = "shallow depth of field, f/2.0";
    let pbrMaterials = "weathered asphalt, glossy light-blue scooter bodywork, textured navy poly-cotton polo, tactile kraft cardboard parcels";

    if (style.includes("3d") || style.includes("3D") || style.includes("Arte 3D")) {
      styleCategory = "Glossy 3D product render";
      shotType = "product hero shot";
      lens = "100mm macro";
      lighting = "soft upper-left studio illumination with subtle contact shadows";
      mood = "clean, modern, and premium";
      composition = "centered with symmetrical framing";
      depthOfField = "deep focus, f/11";
      pbrMaterials = "smooth matte polymer, glossy light-blue lacquer, satin finish yellow accents, clean kraft cardboard";
    } else if (style.includes("Ilustración") || style.includes("ilustración") || style.includes("Digital")) {
      styleCategory = "Digital vector illustration";
      shotType = "graphic illustration";
      lens = "clean vector aesthetics";
      lighting = "flat studio lighting with subtle ambient gradients";
      mood = "friendly, approachable, and energetic";
      composition = "dynamic diagonal composition";
      depthOfField = "sharp edge clarity throughout";
      pbrMaterials = "flat matte finishes with crisp geometric vectors";
    } else if (style.includes("Minimalista") || style.includes("minimalista")) {
      styleCategory = "Minimalist photography";
      shotType = "clean studio hero shot";
      lens = "85mm prime";
      lighting = "soft diffused studio lighting";
      mood = "calm, sophisticated, and trustworthy";
      composition = "centered with generous negative space";
      depthOfField = "deep focus, f/16";
      pbrMaterials = "pure white cyclorama, micro-finished cardboard texture, clean matte delivery container";
    }

    const brandContext = `Brand: Envíos DosRuedas (Mar del Plata logistics). Brand colors: Deep Cobalt #0636A5 (primary), Lemon Yellow #FFEC01 (accent), Brand Ink #00277C, Soft Blue Tint #E6EEFE. Fleet: light-blue urban scooters with square top delivery boxes. Uniforms: Deep Cobalt navy polo with Lemon Yellow trim, yellow cap, and white safety helmet. Regional landmarks: Mar del Plata coast, Rambla, Friuli 1972 hub.`;

    const backgroundDesc = input.background ? `Environment & Staging: ${input.background}. ` : "";
    const additionalDesc = input.additionalDetails ? `Surface & Action details: ${input.additionalDetails}. ` : "";
    const typographyDesc = input.textToInclude
      ? `Integrated Typography: The literal text "${input.textToInclude}" must be seamlessly integrated with modern bold sans-serif styling in Lemon Yellow #FFEC01 on the vehicle or delivery box.`
      : "No artificial text overlays or watermarks.";

    const systemPrompt = `You are the Lead Multimodal Art Director for Envíos DosRuedas, writing prompts according to Prompt Architecture v2.0 for Nano Banana Pro (gemini-3-pro-image-preview).

STRICT ARCHITECTURAL RULES:
1. Write a SINGLE DENSE, COHESIVE NARRATIVE PARAGRAPH in natural English.
2. Target 80-120 words.
3. Follow the 5-Layer Order:
   - Layer 1: Subject & Action (identidad, pose, vehículo, casco obligatorio en repartidores).
   - Layer 2: Environment & Staging (Mar del Plata landmarks or controlled background).
   - Layer 3: Materials & Surface Physics (PBR textures: kraft cardboard, satin cobalt, polished chrome, matte polymer).
   - Layer 4: Integrated Typography (if text requested, specify literal string in double quotes with style and placement).
   - Layer 5: Optics, Lighting & Format (lens, aperture, lighting setup, aspect ratio, 2K/4K rendering).
4. ABSOLUTELY FORBIDDEN:
   - Never output the words "Nano Banana", "photorealistic", "8k", "hyperrealistic", or "trending on artstation".
   - Never output comma-separated keyword tag soup.
   - Never output negative prompt blocks.`;

    const userPrompt = `Synthesize a production-ready v2.0 image generation prompt.

TOPIC/SUBJECT: "${topic}"
SECTION TYPE: ${input.sectionType || "General"}
ASPECT RATIO: ${aspectRatio}
STYLE: ${style} (${styleCategory})

TECHNICAL DETAILS:
- Shot: ${shotType}
- Optics: ${lens}, ${depthOfField}
- Lighting: ${lighting}
- Atmosphere/Mood: ${mood}
- Composition: ${composition}
- PBR Surface Materials: ${pbrMaterials}

BRAND DATA:
${brandContext}

SCENE INPUTS:
${backgroundDesc}
${additionalDesc}
${typographyDesc}

Generate the final, single paragraph English prompt now:`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: userPrompt,
      output: {
        schema: GenerateImagePromptOutputSchema
      }
    });

    const cleanOutput = sanitizePromptSegment(response.output?.prompt || "");
    return { prompt: cleanOutput };
  }
);

