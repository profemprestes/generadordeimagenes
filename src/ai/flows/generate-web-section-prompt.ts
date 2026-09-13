import { z } from 'genkit';
import { ai } from '../genkit';
import { BRAND_STYLE } from '../../lib/brand-style';
import companyProfile from '../../lib/empresa.json';
import { sanitizePromptSegment } from '../../lib/prompt-compiler';

export const GenerateWebSectionPromptInputSchema = z.object({
  pageTitle: z.string().describe("Título de la página (ej: Home, Servicios Express, Contacto)"),
  pageUrl: z.string().optional().describe("URL de la página (ej: /servicios/envios-express)"),
  sectionName: z.string().describe("Nombre de la sección visual (ej: Hero Animado, Bento Grid de Servicios)"),
  sectionType: z.string().describe("Tipo de sección (hero, cards, bento, pricing, features, form, social-proof, cta, general)"),
  sectionDescription: z.string().describe("Descripción de la sección obtenida de la documentación o contexto"),
  componentName: z.string().optional().describe("Nombre del componente React asociado"),
  visualStyle: z.string().default("Mockup UI 3D Isométrico").describe("Estilo visual deseado"),
  colorMode: z.string().default("Acentos Envíos DosRuedas").describe("Modo de color (Claro, Oscuro, Acentos de Marca)"),
  aspectRatio: z.string().default("16:9").describe("Aspect ratio para la generación"),
  brandEmphasis: z.boolean().default(true).describe("Incluir elementos oficiales y colores de Envíos DosRuedas"),
  customInstructions: z.string().optional().describe("Detalles o requerimientos personalizados adicionales"),
  generateVariants: z.boolean().default(true).describe("Si se deben generar variantes alternativas"),
});

export const GenerateWebSectionPromptOutputSchema = z.object({
  promptEs: z.string().describe("Prompt en lenguaje natural en español para generar la imagen/mockup visual"),
  promptEn: z.string().describe("Prompt de producción en inglés siguiendo Prompt Architecture v2.0 para Nano Banana Pro / Midjourney"),
  designRationale: z.string().describe("Explicación de decisiones de diseño, iluminación, encuadre y composición visual"),
  variants: z.array(z.string()).describe("Variantes alternativas del prompt con diferentes encuadres o atmósferas"),
  suggestedSettings: z.object({
    aspectRatio: z.string(),
    recommendedModel: z.string(),
    lighting: stringOrFallback(z.string()),
    styleKeywords: z.array(z.string()),
  }).optional(),
});

function stringOrFallback(schema: z.ZodString) {
  return schema.default("Iluminación de estudio con acento en llanta y contornos");
}

export type GenerateWebSectionPromptInput = z.infer<typeof GenerateWebSectionPromptInputSchema>;
export type GenerateWebSectionPromptOutput = z.infer<typeof GenerateWebSectionPromptOutputSchema>;

const promptTemplate = ai.definePrompt({
  name: 'generateWebSectionPromptTemplate',
  input: { schema: z.any() },
  output: { schema: GenerateWebSectionPromptOutputSchema },
  prompt: `
You are the Executive Visual Art Director & Lead Web UI/UX Concept Designer for Envíos DosRuedas (Mar del Plata, Argentina).
Your objective is to take a web page section specification from the technical documentation and craft an exceptional, high-converting visual prompt in natural language to generate 3D/mockup visual assets for that exact web section using diffusion and image generation models (such as Nano Banana Pro / Gemini 3 Image, Midjourney, FLUX).

### CONTEXT OF THE WEB COMPONENT
- **Page:** {{pageTitle}} ({{pageUrl}})
- **Section/Component:** {{sectionName}} (Tipo: {{sectionType}}, Componente: {{componentName}})
- **Documentation Context:** {{sectionDescription}}
- **Desired Visual Style:** {{visualStyle}}
- **Color Theme / Mode:** {{colorMode}}
- **Target Aspect Ratio:** {{aspectRatio}}
- **Brand Emphasis Enabled:** {{brandEmphasis}}
{{#if customInstructions}}
- **Custom User Request:** {{customInstructions}}
{{/if}}

### BRAND PALETTE & IDENTITY (ENVÍOS DOSRUEDAS 2026)
- **Primary Brand Color:** Deep Cobalt (#0636A5 / #052C87)
- **High-Visibility Accent:** Safety Lemon Yellow (#FFEC01 / #FFF12E)
- **Secondary Accent:** Electric Blue (#0950F6)
- **Surface:** Pure White (#FFFFFF) or Soft Blue Tint (#E6EEFE)
- **Fleet & Actors:** Light-blue delivery electric scooters with cubic yellow rear storage boxes, couriers wearing Deep Cobalt uniforms with yellow trims and safety helmets.
- **Location Atmosphere:** Coastal Mar del Plata streets, modern urban logistics hub, clean studio cyclorama.

### PROMPT GENERATION RULES
1. **Natural Language Spanish Prompt (\`promptEs\`):**
   - Provide a vivid, evocative, and detailed paragraph in natural Spanish describing the complete visual composition of the web component/mockup.
   - Describe what is shown in the foreground, middle ground, lighting, UI floating cards or devices, 3D elements, typography accents, and background atmosphere.

2. **Production English Prompt (\`promptEn\`):**
   - Follow Prompt Architecture v2.0 for Nano Banana Pro / Midjourney:
     * Write a SINGLE DENSE, COHESIVE NARRATIVE PARAGRAPH (80-130 words).
     * Follow the 5-Layer structure:
       Layer 1: Subject & UI Component Composition (e.g. Floating glassmorphic card, modern isometric web bento grid, hero scene with scooter).
       Layer 2: Environment & Staging (clean architectural studio backdrop, subtle Mar del Plata coastal horizon reflection or neutral gradient canvas).
       Layer 3: Materials & Physical Surfaces (frosted glass, tactile kraft paper parcels, polished aluminum frames, glossy cobalt enamel, matte polymer).
       Layer 4: Integrated Brand Details & Typography (literal quotes "{{sectionName}}" or "Envíos DosRuedas" in clean geometric typography if applicable).
       Layer 5: Optics, Lighting & Camera (e.g. soft daylight diffused studio lighting with vivid yellow rim glow, 50mm lens, shallow depth of field, sharp focus, 4K rendering).
     * NEVER use forbidden buzzwords: "photorealistic", "8k", "hyperrealistic", "trending on artstation", "Nano Banana".
     * NEVER output comma-separated keyword lists. Only natural narrative prose.

3. **Design Rationale (\`designRationale\`):**
   - Explain in 2-3 concise Spanish sentences why this composition, lighting, and style were chosen to represent this specific web section effectively.

4. **Variants (\`variants\`):**
   {{#if generateVariants}}
   - Provide 2 distinct alternative English prompts exploring:
     * Variant 1: A dynamic isometric perspective / elevated 3D angle.
     * Variant 2: A dramatic studio lighting / dark mode glassmorphism setup.
   {{else}}
   - Provide an empty array or 1 subtle alternative.
   {{/if}}

5. **Suggested Settings:**
   - Include recommended aspect ratio, recommended model ("Nano Banana Pro (gemini-3-pro-image-preview)"), key lighting notes, and 4-6 style tags.

Generate the output JSON strictly according to the output schema.
`,
});

export const generateWebSectionPromptFlow = ai.defineFlow(
  {
    name: 'generateWebSectionPromptFlow',
    inputSchema: GenerateWebSectionPromptInputSchema,
    outputSchema: GenerateWebSectionPromptOutputSchema,
  },
  async (input) => {
    const flowInput = {
      ...input,
      company: companyProfile,
      brand: BRAND_STYLE,
    };

    const { output } = await promptTemplate(flowInput);

    if (!output) {
      throw new Error("No se pudo generar la optimización del prompt.");
    }

    const cleanEn = sanitizePromptSegment(output.promptEn);
    const cleanVariants = (output.variants || []).map(v => sanitizePromptSegment(v));

    return {
      promptEs: output.promptEs,
      promptEn: cleanEn,
      designRationale: output.designRationale,
      variants: cleanVariants,
      suggestedSettings: output.suggestedSettings || {
        aspectRatio: input.aspectRatio || "16:9",
        recommendedModel: "gemini-3-pro-image-preview",
        lighting: "Studio softbox with yellow rim illumination",
        styleKeywords: [input.visualStyle, "UI Mockup", "Envíos DosRuedas", "Clean Design"],
      },
    };
  }
);

export async function generateWebSectionPrompt(input: GenerateWebSectionPromptInput): Promise<GenerateWebSectionPromptOutput> {
  return generateWebSectionPromptFlow(input);
}
