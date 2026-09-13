import { z } from 'genkit';
import { ai } from '../genkit';
import { sanitizePromptSegment } from '../../lib/prompt-compiler';

export const GenerateWebSectionPromptInputSchema = z.object({
  pageTitle: z.string().describe("Título de la página (ej: Home, Servicios Express, Contacto)"),
  pageUrl: z.string().optional().describe("URL de la página (ej: /servicios/envios-express)"),
  sectionName: z.string().describe("Nombre de la sección visual (ej: Hero Animado, Bento Grid de Servicios)"),
  sectionType: z.string().describe("Tipo de sección (hero, cards, bento, pricing, features, form, social-proof, cta, general)"),
  sectionDescription: z.string().describe("Descripción de la sección obtenida de la documentación o contexto"),
  componentName: z.string().optional().describe("Nombre del componente React asociado"),
  visualStyle: z.string().default("Mockup UI 3D Isométrico").describe("Estilo visual deseado"),
  colorMode: z.string().default("Acentos Envíos DosRuedas").describe("Modo de color (Tríada Estricta #0C59F2, #FFF12E, #FFFFFF)"),
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
    lighting: z.string().default("Iluminación de estudio con acento en llanta y contornos"),
    styleKeywords: z.array(z.string()),
  }).optional(),
});

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

### STRICT OFFICIAL DESIGN SYSTEM RULES (ENVÍOS DOSRUEDAS)
1. **Strict 3-Color Triad (NO other blues or arbitrary hues):**
   - **Primary Brand Blue:** #0C59F2 (Institutional Electric Blue) — The ONLY blue allowed in the entire system. Absolutely FORBIDDEN: navy blue, midnight blue, slate blue, cyan, or purple gradients.
   - **High-Visibility Neon Yellow:** #FFF12E — The ONLY action accent. Used for pill CTAs, urgency badges (Express 30-90 min, Flex), reflective gear, and yellow-glow rims.
   - **Pure Optical White:** #FFFFFF — Base surface for cards, modals, crisp contrast text on blue canvas, and clean divider borders (border-white/20).
   - **Forbidden:** No absolute black (#000000). Contrast on white surfaces is strictly resolved with #0C59F2.

2. **Typography System to Describe in Prompts:**
   - **Headlines / Display:** Anton (all caps, ultra-tight tracking -0.04em, leading 0.98, compact impact).
   - **Subheadings / Badges / Buttons:** Bebas Neue (all caps, expanded tracking 0.1em, crisp and technical).
   - **Body:** Outfit (modern, clean geometric sans).
   - **Technical Data & Numbers:** Geist Mono (fares in ARS $X.XXX, delivery ranges in 30-90 min, real Mar del Plata logistics data).

3. **Layout & Architectural Composition:**
   - **Asymmetric Bento Grid (12 columns, 7/5 or 8/4 splits).** Prohibit monotonous rows of 3 identical cards.
   - **Surfaces:** Either Pure White (#FFFFFF) cards with #0C59F2 typography and subtle border (#0C59F2/10), or Glassmorphic floating cards (frosted translucent bg-white/10, backdrop blur, border-white/20, pure white typography).
   - **Primary CTAs:** Pill-shaped (rounded-full) in vibrant #FFF12E with bold #0C59F2 uppercase lettering and soft yellow glow (shadow-glow-yellow).

4. **Fleet, Couriers & Staging Atmosphere:**
   - **Fleet:** High-velocity electric delivery scooters featuring clean bodywork with bright yellow (#FFF12E) rear cubic delivery boxes.
   - **Couriers:** Professional riders wearing #0C59F2 Electric Blue uniforms with reflective #FFF12E trim and certified safety helmets.
   - **Setting:** Authentic Mar del Plata urban coastal logistics context (Rambla, Casino Central, Friuli 1972 hub, clean asphalt) or high-tech minimalist studio cyclorama with sharp #0C59F2 and #FFF12E rim lighting.

5. **ANTI-PATTERNS STRICTLY FORBIDDEN IN PROMPTS:**
   - NEVER include emojis.
   - NEVER use multiple tones of blue. Only #0C59F2.
   - NEVER use generic buzzwords: "photorealistic", "8k", "hyperrealistic", "trending on artstation", "Nano Banana".
   - NEVER output comma-separated keyword spam. Use coherent, dense narrative prose.

### PROMPT GENERATION STRUCTURE
1. **Natural Language Spanish Prompt (\`promptEs\`):**
   - A vivid, evocative, and technically precise paragraph in natural Spanish describing the web component's visual mockup.
   - Detail the asymmetric bento hierarchy, the electric blue (#0C59F2), white (#FFFFFF), and neon yellow (#FFF12E) triad, the floating cards, tactile materials, typography, and clean urban logistics ambiance of Mar del Plata.

2. **Production English Prompt (\`promptEn\`):**
   - Follow Prompt Architecture v2.0 (80-130 words in a single dense narrative paragraph):
     * Layer 1: Subject & UI Layout (asymmetric 3D bento card, hero section, or interactive UI module).
     * Layer 2: Environment & Staging (studio cyclorama or coastal Mar del Plata urban backdrop).
     * Layer 3: Physical Materials (frosted glassmorphism, glossy #0C59F2 enamel, matte polymer, yellow #FFF12E reflective accents).
     * Layer 4: Integrated Brand Details & Typography (literal clean typography "{{sectionName}}" or "Envíos DosRuedas" in Anton or Bebas Neue).
     * Layer 5: Lighting, Optics & Camera (crisp studio softbox, neon yellow rim glow, 50mm prime lens, f/2.2, sharp focus, 4K rendering).

3. **Design Rationale (\`designRationale\`):**
   - 2-3 concise sentences in Spanish explaining how this visual prompt strictly complies with the Envíos DosRuedas Design System (the 3-color triad #0C59F2 / #FFF12E / #FFFFFF, asymmetric bento layout, and typography).

4. **Variants (\`variants\`):**
   {{#if generateVariants}}
   - Provide 2 distinct alternative English prompts:
     * Variant 1: Elevated isometric perspective focusing on the 3D depth of the asymmetric bento cards.
     * Variant 2: Clean studio cyclorama with high-contrast electric blue (#0C59F2) lighting and intense neon yellow rim illumination.
   {{else}}
   - Provide an empty array.
   {{/if}}

5. **Suggested Settings:**
   - Aspect ratio (e.g. {{aspectRatio}}), recommended model ("gemini-3-pro-image-preview"), key lighting notes, and 4-6 style tags.

Output JSON strictly matching the schema.
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
        lighting: "Studio softbox with electric blue and neon yellow rim illumination",
        styleKeywords: [input.visualStyle, "Envíos DosRuedas Triad", "Electric Blue #0C59F2", "Asymmetric Bento"],
      },
    };
  }
);

export async function generateWebSectionPrompt(input: GenerateWebSectionPromptInput): Promise<GenerateWebSectionPromptOutput> {
  return generateWebSectionPromptFlow(input);
}
