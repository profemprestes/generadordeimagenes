import { z } from 'genkit';
import { ai } from '../genkit';
import { sanitizePromptSegment } from '../../lib/prompt-compiler';

export const GenerateWebSectionPromptInputSchema = z.object({
  pageTitle: z.string().describe("Título de la página (ej: Contacto, Home, Servicios Express)"),
  pageUrl: z.string().optional().describe("URL de la página (ej: /contacto)"),
  sectionName: z.string().describe("Nombre de la sección visual (ej: ContactHero, Hero Animado)"),
  sectionType: z.string().describe("Tipo de sección (hero, cards, bento, pricing, features, form, social-proof, cta, general)"),
  sectionDescription: z.string().describe("Descripción de la sección obtenida de la documentación o contexto"),
  componentName: z.string().optional().describe("Nombre del componente React asociado (ej: ContactHero.tsx)"),
  slotId: z.string().optional().describe("ID del slot o sub-parte visual elegida (ej: hud-dispatch-moto, hero-full-composition)"),
  slotName: z.string().optional().describe("Nombre de la sub-parte visual elegida"),
  slotType: z.string().optional().describe("Tipo de slot (image-replacement, hero-full, background-atmosphere, card-asset, custom)"),
  targetCodeSnippet: z.string().optional().describe("Fragmento de código TSX original de la documentación técnica que se busca reemplazar o ilustrar"),
  visualStyle: z.string().default("Mockup UI 3D Isométrico Asimétrico").describe("Estilo visual deseado"),
  colorMode: z.string().default("Tríada Oficial Envíos DosRuedas (#0C59F2 + #FFF12E + #FFFFFF)").describe("Modo de color institucional"),
  aspectRatio: z.string().default("16:9").describe("Aspect ratio para la generación"),
  brandEmphasis: z.boolean().default(true).describe("Incluir elementos oficiales y colores de Envíos DosRuedas"),
  customInstructions: z.string().optional().describe("Detalles o requerimientos personalizados adicionales"),
  generateVariants: z.boolean().default(true).describe("Si se deben generar variantes alternativas"),
});

export const GenerateWebSectionPromptOutputSchema = z.object({
  promptEs: z.string().describe("Prompt en lenguaje natural en español para generar la imagen/mockup visual"),
  promptEn: z.string().describe("Prompt de producción en inglés siguiendo Prompt Architecture v2.0 para Nano Banana Pro / Midjourney"),
  designRationale: z.string().describe("Explicación de decisiones de diseño, iluminación, encuadre y composición visual bajo el sistema oficial"),
  improvedCodeSnippet: z.string().describe("Fragmento de código TSX / React optimizado listo para producción mostrando cómo integrar la imagen generada usando Next.js Image y Tailwind"),
  codeIntegrationAdvice: z.string().describe("Guía paso a paso breve de integración en el archivo del componente"),
  variants: z.array(z.string()).describe("Variantes alternativas del prompt con diferentes encuadres o atmósferas"),
  suggestedSettings: z.object({
    aspectRatio: z.string(),
    recommendedModel: z.string(),
    lighting: z.string().default("Iluminación de estudio con acento en llanta y contornos"),
    styleKeywords: z.array(z.string()),
    suggestedFileName: z.string().default("hero-visual-asset.webp"),
  }),
});

export type GenerateWebSectionPromptInput = z.infer<typeof GenerateWebSectionPromptInputSchema>;
export type GenerateWebSectionPromptOutput = z.infer<typeof GenerateWebSectionPromptOutputSchema>;

const promptTemplate = ai.definePrompt({
  name: 'generateWebSectionPromptTemplate',
  input: { schema: z.any() },
  output: { schema: GenerateWebSectionPromptOutputSchema },
  prompt: `
You are the Executive Visual Art Director & Lead Web Frontend Architect for Envíos DosRuedas (Mar del Plata, Argentina).
Your mission is to take a web page section and specific visual slot from the technical documentation (docs/contenido) and generate:
1. An exceptional, production-grade visual prompt in natural language (EN and ES) to render the exact 3D visual or high-impact asset using diffusion models (Nano Banana Pro / Imagen 3 / Midjourney / FLUX).
2. An **improved TSX React code variant** that integrates this image into the component (e.g. replacing placeholder procedural backgrounds like <HeroProceduralBackground variant="contact" /> in ContactHero.tsx with an optimized Next.js <Image /> component following Vercel React Best Practices).

### COMPONENT CONTEXT
- **Page:** {{pageTitle}} ({{pageUrl}})
- **Component:** {{componentName}} (Section: {{sectionName}}, Type: {{sectionType}})
- **Selected Visual Slot / Sub-part:** {{slotName}} (ID: {{slotId}}, Type: {{slotType}})
- **Documentation Context:** {{sectionDescription}}
{{#if targetCodeSnippet}}
- **Original Code Snippet in docs/contenido:**
\`\`\`tsx
{{targetCodeSnippet}}
\`\`\`
{{/if}}
- **Desired Visual Style:** {{visualStyle}}
- **Color Theme / Mode:** {{colorMode}}
- **Target Aspect Ratio:** {{aspectRatio}}
- **Brand Emphasis Enabled:** {{brandEmphasis}}
{{#if customInstructions}}
- **Custom User Request:** {{customInstructions}}
{{/if}}

### STRICT OFFICIAL DESIGN SYSTEM RULES (ENVÍOS DOSRUEDAS)
1. **Strict 3-Color Triad (NO other blues, purples, or greens):**
   - **Primary Brand Blue:** #0C59F2 (Institutional Electric Blue) — The ONLY blue allowed.
   - **High-Visibility Neon Yellow:** #FFF12E — Action accent for CTAs, badges, delivery boxes, and rim glow.
   - **Pure Optical White:** #FFFFFF — High-contrast text, clean borders (border-white/20), and surface cards.
   - **Forbidden:** Never use navy, cyan, teal, or muddy blacks.

2. **Visual Content & Staging for Hero / Visual Slots:**
   - For components like **ContactHero.tsx** with a "Dispatch HUD Card" or "Moto Image" (e.g. Friuli 1972 Hub, GPS Activo MDQ):
     * Craft an image depicting high-velocity electric delivery scooters, bright yellow (#FFF12E) rear cubic cargo boxes, professional riders in #0C59F2 electric blue jackets with reflective yellow piping, clean asphalt, and sleek holographic GPS telemetry overlays representing Mar del Plata dispatch routes.
   - For Hero Full Compositions:
     * High-end 3D isometric asymmetric bento layout with floating glassmorphic cards, crisp typography (Anton, Bebas Neue), and electric lighting.
   - For Background Atmosphere:
     * Deep electric blue canvas with diffused spherical neon yellow (#FFF12E) and midnight glow orbs.

3. **VERCEL REACT BEST PRACTICES FOR \`improvedCodeSnippet\`:**
   - Replace placeholder procedural background elements (such as <HeroProceduralBackground variant="contact" />) or placeholder boxes with Next.js \`next/image\`.
   - Use \`<Image ... />\` with \`fill\`, \`priority\` (for above-the-fold hero LCP), responsive \`sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"\`, and descriptive \`alt\` text.
   - Provide a gradient veil overlay (\`bg-gradient-to-t from-[#021440]/90 via-[#04236B]/60 to-transparent\`) so all text badges (e.g. GPS ACTIVO, Hub Friuli 1972) on top maintain WCAG AAA contrast.
   - Include hover scale/opacity transitions (\`group-hover:scale-105 transition-transform duration-700\`).
   - Deliver clean, copy-pasteable TSX code that can be inserted directly into the user's component.

### OUTPUT REQUIREMENTS
1. **\`promptEn\` (Production English Prompt, 80-130 words):**
   - Dense narrative paragraph following Prompt Architecture v2.0 (Subject & UI Slot, Environment & Staging, Physical Materials, Integrated Branding & Telemetry, Studio Optics & Lighting).
2. **\`promptEs\` (Spanish Art Direction):**
   - Evocative description in natural Spanish detailing the visual composition, triad colors, and Mar del Plata context.
3. **\`improvedCodeSnippet\` (TSX React Code):**
   - Complete, formatted JSX/TSX replacement code block for the component.
4. **\`codeIntegrationAdvice\` (Integration Guide):**
   - 2-3 numbered steps explaining how to place the image in \`public/images/...\` and integrate it into the file (e.g. \`src/components/contacto/ContactHero.tsx\`).
5. **\`variants\` (Alternative Prompts):**
   - 2-3 distinctive prompt variants (e.g. Variant 1: Scooter & GPS Telemetry close-up, Variant 2: Dispatch Center Hub Friuli 1972 wide angle, Variant 3: Coastal MDQ sunset courier run).
6. **\`suggestedSettings\`:**
   - Aspect ratio, recommended model ("gemini-3-pro-image-preview"), lighting notes, style keywords, and a clean suggested file name (e.g. "contact-hero-hud-dispatch.webp").

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

    const defaultFileName = input.componentName
      ? `${input.componentName.toLowerCase().replace('.tsx', '')}-${(input.slotId || 'hero').toLowerCase()}.webp`
      : 'hero-visual-asset.webp';

    return {
      promptEs: output.promptEs,
      promptEn: cleanEn,
      designRationale: output.designRationale,
      improvedCodeSnippet: output.improvedCodeSnippet || `// TSX integration\n<Image src="/images/${defaultFileName}" alt="${input.sectionName}" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />`,
      codeIntegrationAdvice: output.codeIntegrationAdvice || `1. Guardá la imagen generada en /public/images/${defaultFileName}.\n2. En ${input.componentName || 'tu componente'}, importá Image de 'next/image'.\n3. Reemplazá el bloque de fondo por el snippet proporcionado.`,
      variants: cleanVariants,
      suggestedSettings: output.suggestedSettings || {
        aspectRatio: input.aspectRatio || "16:9",
        recommendedModel: "gemini-3-pro-image-preview",
        lighting: "Studio softbox with electric blue and neon yellow rim illumination",
        styleKeywords: [input.visualStyle, "Envíos DosRuedas Triad", "Electric Blue #0C59F2", "Asymmetric Bento"],
        suggestedFileName: defaultFileName,
      },
    };
  }
);

export async function generateWebSectionPrompt(input: GenerateWebSectionPromptInput): Promise<GenerateWebSectionPromptOutput> {
  return generateWebSectionPromptFlow(input);
}
