import { z } from "genkit";
import { ai } from "../genkit";
import { getServiceContext } from "../../lib/context/get-service-context";
import { BRAND_STYLE } from "../../lib/brand-style";
import { sanitizePromptSegment } from "../../lib/prompt-compiler";

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
  prompt: z.string().describe("Production-ready diffusion prompt following Prompt Architecture v2.0 for Nano Banana Pro"),
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
    const serviceName = input.serviceName || input.serviceId || "Envíos Express";
    const styleMode = input.visualStyle || input.styleMode || "Fotografía Urbana y Cinematográfica";
    
    let styleCategory = "Cinematic photography";
    let shotType = "cinematic wide shot";
    let lens = "35mm anamorphic prime";
    let lighting = "golden hour coastal sunlight with sharp rim lighting";
    let mood = "high-velocity, trustworthy, and modern";
    let composition = "rule of thirds with strong foreground presence";
    let depthOfField = "shallow depth of field, f/2.0";
    let pbrMaterials = "kraft cardboard parcels, glossy light-blue scooter bodywork, textured navy poly-cotton polo, asphalt";

    if (styleMode.includes("3d") || styleMode.includes("render3d") || styleMode.includes("Arte 3D")) {
      styleCategory = "Glossy 3D product render";
      shotType = "product hero shot";
      lens = "100mm macro";
      lighting = "soft upper-left studio illumination with subtle contact shadows";
      mood = "clean, premium, and dynamic";
      composition = "centered with symmetrical framing";
      depthOfField = "deep focus, f/11";
      pbrMaterials = "smooth matte polymer, glossy light-blue lacquer, satin Lemon Yellow accents, kraft cardboard";
    } else if (styleMode.includes("vector") || styleMode.includes("Vectorial") || styleMode.includes("Ilustración")) {
      styleCategory = "Digital vector illustration";
      shotType = "graphic illustration";
      lens = "vector precision";
      lighting = "clean flat lighting with soft ambient gradients";
      mood = "friendly, approachable, and energetic";
      composition = "dynamic diagonal composition with leading lines";
      depthOfField = "sharp edge clarity";
      pbrMaterials = "matte vector textures with high-contrast boundaries";
    } else if (styleMode.includes("minimal") || styleMode.includes("Minimalista")) {
      styleCategory = "Minimalist photography";
      shotType = "clean product hero shot";
      lens = "85mm prime";
      lighting = "soft diffused studio lighting";
      mood = "calm, sophisticated, and trustworthy";
      composition = "centered with ample negative space";
      depthOfField = "deep focus, f/16";
      pbrMaterials = "pure white studio surface, clean kraft cardboard, tactile debossed lettering";
    }

    const brandContext = `Envíos DosRuedas (Mar del Plata logistics). Brand colors: Deep Cobalt #0636A5 (primary), Lemon Yellow #FFEC01 (accent), Brand Ink #00277C, Soft Blue Tint #E6EEFE. Uniforms: navy Deep Cobalt polos with Lemon Yellow trim, yellow cap, and safety helmet on couriers. Fleet: light-blue urban scooters with square top delivery boxes. Landmarks: Chauvín hub (Friuli 1972), Rambla, Casino Central, Mar del Plata coastal avenues.`;

    const textRequirements = (input.includeText || input.includeBrand)
      ? `Integrated Typography: The literal string "${input.includeText ? serviceName : BRAND_STYLE.name}" is rendered with modern bold sans-serif lettering in Lemon Yellow (#FFEC01), integrated seamlessly on the vehicle or delivery box.`
      : "No artificial text overlays or watermarks.";

    const systemPrompt = `You are the Lead Multimodal Art Director for Envíos DosRuedas, writing prompts according to Prompt Architecture v2.0 for Nano Banana Pro (gemini-3-pro-image-preview).

STRICT ARCHITECTURAL RULES:
1. Write a SINGLE DENSE, COHESIVE NARRATIVE PARAGRAPH in natural English for the 'prompt' field.
2. Target 80-120 words.
3. Follow the 5-Layer Order:
   - Layer 1: Subject & Action (identidad del servicio logístico, acción, conductor con casco si aplica).
   - Layer 2: Environment & Staging (Mar del Plata o estudio controlado).
   - Layer 3: Materials & Surface Physics (PBR: kraft cardboard, glossy lacquer, satin cobalt, polished metal).
   - Layer 4: Integrated Typography (literal text in double quotes with style and placement).
   - Layer 5: Optics, Lighting & Format (lens, aperture, lighting setup, aspect ratio, 2K/4K).
4. ABSOLUTELY FORBIDDEN:
   - Never output "Nano Banana", "photorealistic", "8k", "hyperrealistic", or "trending on artstation".
   - Never output comma-separated keyword lists.
5. Provide:
   - 'prompt': Full English narrative prompt.
   - 'alt_es': Spanish accessibility description.
   - 'filename_kebab': Kebab-case .webp filename.`;

    const userPrompt = `Service: ${serviceName}
Section/Placement: ${input.sectionType || "Service Hero Asset"}
Style: ${styleMode} (${styleCategory})

TECHNICAL DETAILS:
- Shot: ${shotType}
- Optics: ${lens}, ${depthOfField}
- Lighting: ${lighting}
- Mood/Atmosphere: ${mood}
- Composition: ${composition}
- Surface Materials: ${pbrMaterials}

BRAND CONTEXT:
${brandContext}

BACKGROUND CONCEPT: ${input.backgroundDetails || "Mar del Plata urban logistics corridor"}
MAIN SUBJECT/ACTION: ${input.contentDetails || "Courier delivering parcel with speed and care"}
TYPOGRAPHY: ${textRequirements}

Generate the v2.0 JSON output now:`;

    const response = await ai.generate({
      system: systemPrompt,
      prompt: userPrompt,
      output: {
        schema: GenerateServiceImagePromptOutputSchema
      }
    });

    const output = response.output!;
    return {
      prompt: sanitizePromptSegment(output.prompt),
      alt_es: output.alt_es,
      filename_kebab: output.filename_kebab.endsWith('.webp') ? output.filename_kebab : `${output.filename_kebab}.webp`,
    };
  }
);

