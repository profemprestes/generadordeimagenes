import { z } from 'genkit';
import { ai } from '../genkit';
import { sanitizePromptSegment } from '../../lib/prompt-compiler';

export const HeroMigrationContextSchema = z.object({
  heroId: z.string().optional(),
  concept: z.string().optional(),
  generatedAsset: z.string().optional(),
  prompt3D: z.string().optional(),
  negativePrompt: z.string().optional(),
  cameraAndRender: z.string().optional(),
  badge: z.string().optional(),
  titleDisplay: z.string().optional(),
  subtitleLead: z.string().optional(),
  keyPillsOrKpis: z.array(z.string()).optional(),
});

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
  heroMigrationContext: HeroMigrationContextSchema.optional().describe("Contexto específico de migración de Hero desde docs/contenido/heros_migracion_adaptado.json"),
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
<system_role>
You are the Executive Visual Art Director & Lead Web Frontend Architect for Envíos DosRuedas (Mar del Plata, Argentina).
You specialize in state-of-the-art Generative AI Prompt Engineering (Prompt Architecture v2.0 for Nano Banana Pro, Gemini 3 Pro Image, Imagen 3, Midjourney v6, and FLUX.1) coupled with high-performance Next.js 15 and Tailwind CSS component engineering.
</system_role>

<task_objective>
Your mission is to take a web page section and specific visual slot from technical documentation (docs/contenido) and generate:
1. An exceptional, production-grade visual prompt in natural English (promptEn, 85-130 words) strictly structured via the 5-Layer Prompt Architecture v2.0.
2. A matching Spanish art direction brief (promptEs) capturing the mood, regional Mar del Plata context, and brand authority.
3. An improved, production-ready TSX React code snippet (improvedCodeSnippet) that replaces placeholder elements (such as procedural backgrounds or empty divs) with an optimized Next.js <Image /> component following Vercel React Best Practices.
4. Step-by-step integration advice, 2-3 distinctive cinematic prompt variants, and recommended generation settings.
</task_objective>

<component_context>
- **Target Page:** {{pageTitle}} (URL: {{pageUrl}})
- **Component File:** {{componentName}} (Section: {{sectionName}}, Type: {{sectionType}})
- **Visual Slot / Sub-part:** {{slotName}} (Slot ID: {{slotId}}, Type: {{slotType}})
- **Technical Documentation Context:** {{sectionDescription}}
{{#if targetCodeSnippet}}
- **Original Code Snippet in docs/contenido:**
\`\`\`tsx
{{targetCodeSnippet}}
\`\`\`
{{/if}}
- **Selected Visual Style:** {{visualStyle}}
- **Color Theme:** {{colorMode}}
- **Target Aspect Ratio:** {{aspectRatio}}
- **Enforce Brand Identity:** {{brandEmphasis}}
{{#if customInstructions}}
- **User Custom Directives:** {{customInstructions}}
{{/if}}
</component_context>

<design_system_triad>
Strict 3-Color Institutional Triad (Envíos DosRuedas):
1. **Primary Brand Blue (#0C59F2):** The sole electric cobalt blue of the company. Never use dull navy, cyan, teal, or violet.
2. **High-Visibility Neon Yellow (#FFF12E):** Action accent for delivery cargo boxes, rim glows, badges, telemetry tracks, and reflective safety piping.
3. **Pure Optical White (#FFFFFF):** High-contrast typography, frosted glass borders (border-white/20), and specular highlights.
Atmosphere note: Deep midnight blue (#021440 / #04236B) may only serve as dark ambient background gradient to ensure optical legibility.
</design_system_triad>

<prompt_architecture_v2>
The English prompt (promptEn) MUST be a single dense, cohesive narrative paragraph (85-130 words) synthesizing the 5 layers in exact sequential order:
- **Layer 1 (Subject & Framing):** Explicit focal subject and camera angle (e.g. 3D isometric asymmetric bento perspective, eye-level street dynamic 35mm shot, or macro telemetry detail).
- **Layer 2 (Environment & Regional Staging):** Mar del Plata urban logistics context (Friuli 1972 hub, coastal asphalt, General Pueyrredón dispatch route) or clean architectural studio cyclorama.
- **Layer 3 (Materials & Physical Shaders):** Physically Based Rendering (PBR) surfaces: frosted glass (bg-white/10), matte blue polymer bodywork, reflective yellow safety vinyl, brushed titanium accents, and asphalt texture.
- **Layer 4 (Integrated Branding & Typography):** Seamless typography with exact literal quotes (e.g. "ENVÍOS DOSRUEDAS", "GPS ACTIVO", "MDQ"), utilizing the strict triad (#0C59F2, #FFF12E, #FFFFFF).
- **Layer 5 (Optics, Lighting & Format):** Dual-color studio illumination with #0C59F2 key wash and #FFF12E neon rim accent on vehicle contours, 50mm f/2.8 prime lens, subtle volumetric depth, clean negative space for UI overlay, rendered in crisp {{aspectRatio}} composition.
</prompt_architecture_v2>

<hard_constraints>
- NEVER use low-effort filler keywords: "photorealistic", "hyperrealistic", "8k", "ultra realistic", "octane render", "unreal engine", "trending on artstation".
- NEVER output comma-separated keyword lists. Always use flowing, professional art-directed prose.
- For UI card slots and HUD replacements, preserve clean negative space or gradient contrast in the bottom and top zones so React HTML overlay badges remain WCAG AAA compliant.
</hard_constraints>

<vercel_react_rules>
For \`improvedCodeSnippet\`:
- Deliver complete, valid TSX code replacing procedural backgrounds or placeholder boxes with Next.js \`next/image\`.
- Use \`<Image ... />\` with \`fill\`, \`priority\` (for hero and above-the-fold slots), responsive \`sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"\`, and \`quality={90}\`.
- Include a dark gradient scrim overlay (\`bg-gradient-to-t from-[#021440]/90 via-[#04236B]/50 to-transparent\`) positioned between the image and overlaid text/badges to guarantee accessibility and high contrast.
- Add fluid micro-interactions (\`group-hover:scale-105 transition-transform duration-700 ease-out\`).
- Ensure the parent container has \`relative overflow-hidden\` and defined aspect ratio or dimensions.
</vercel_react_rules>

<few_shot_exemplar>
Input: ContactHero.tsx -> Slot: hud-dispatch-moto (Tarjeta HUD de Despacho & Moto, Ratio 16:9)
Expected promptEn:
"Modern high-end urban delivery electric scooter stationed on clean wet asphalt outside the Friuli 1972 logistics dispatch hub in Mar del Plata, captured from a dynamic low three-quarter angle. The scooter features sleek matte electric blue (#0C59F2) aerodynamic bodywork with a glowing neon yellow (#FFF12E) rear cubic cargo box branded with bold optical white (#FFFFFF) typography reading 'ENVÍOS DOSRUEDAS'. A futuristic semi-transparent holographic GPS telemetry HUD with route coordinates subtly floats beside the handlebars. Studio-grade dual illumination casts an intense #0C59F2 key light with vibrant #FFF12E edge rim lighting along the alloy wheel rims and helmet visor. Shot on a 50mm prime lens at f/2.8, cinematic volumetric haze, wide 16:9 aspect ratio."

Expected improvedCodeSnippet:
\`\`\`tsx
<div className="group relative w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-white/20 p-6 flex flex-col justify-between">
  {/* Production Image Asset (replaces HeroProceduralBackground) */}
  <Image
    src="/images/contact-hero-hud-dispatch.webp"
    alt="Central de Despacho y Flota Eléctrica Envíos DosRuedas Mar del Plata"
    fill
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px)"
    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
    quality={90}
  />
  {/* High-Contrast Gradient Veil for WCAG AAA Compliance */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#021440]/95 via-[#04236B]/65 to-[#021440]/40 pointer-events-none" />

  {/* HUD Badges & Telemetry Content */}
  <div className="relative z-10 flex justify-between items-start">
    <div>
      <span className="font-subheading text-xs uppercase tracking-widest text-[#FFF12E] font-bold block">
        CENTRAL DE DESPACHO MDQ
      </span>
      <span className="font-display text-2xl uppercase tracking-tight text-white mt-1 block">
        COBERTURA GENERAL PUEYRREDÓN
      </span>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-[#FFF12E]/20 border border-[#FFF12E] text-[#FFF12E] font-mono text-xs font-bold tabular-nums">
      GPS ACTIVO
    </span>
  </div>

  <div className="relative z-10 flex justify-between items-end text-white border-t border-white/10 pt-3">
    <div>
      <span className="font-subheading uppercase text-xs tracking-wider block text-white/80">
        Hub Operativo Friuli 1972
      </span>
      <span className="font-mono text-xs text-[#FFF12E] font-medium tabular-nums">
        Salidas cada 30 min · Soporte en directo
      </span>
    </div>
    <span className="w-3 h-3 rounded-full bg-[#FFF12E] animate-pulse shadow-[0_0_8px_#FFF12E]" />
  </div>
</div>
\`\`\`
</few_shot_exemplar>

{{#if heroMigrationContext}}
<hero_migration_adaptation>
CATALOG SPECIFICATION (from docs/contenido/heros-migracion.html & heros_migracion_adaptado.json):
This component represents one of the 11 official Hero sections of Envíos DosRuedas:
- **Hero Identifier:** {{heroMigrationContext.heroId}}
- **Documented Visual Concept:** {{heroMigrationContext.concept}}
- **Target Asset File:** {{heroMigrationContext.generatedAsset}}
- **Official Headline:** "{{heroMigrationContext.titleDisplay}}" (Badge: "{{heroMigrationContext.badge}}")
- **Lead Subtitle:** "{{heroMigrationContext.subtitleLead}}"
{{#if heroMigrationContext.keyPillsOrKpis}}
- **Documented Trust Badges / KPIs:** {{#each heroMigrationContext.keyPillsOrKpis}}"{{this}}" {{/each}}
{{/if}}
- **Reference 3D Art Direction from Catalog:**
"""{{heroMigrationContext.prompt3D}}"""
- **Reference Camera & Optics:** {{heroMigrationContext.cameraAndRender}}
{{#if heroMigrationContext.negativePrompt}}
- **Catalog Negative Exclusions:** {{heroMigrationContext.negativePrompt}}
{{/if}}

HERO ADAPTATION RULES:
1. When generating \`promptEn\`, synthesize the documented 3D concept into Prompt Architecture v2.0 (5 sequential layers: Subject, Mar del Plata staging, PBR materials, typography & branding, optics & lighting). Harmonize any legacy shades into the strict official triad (#0C59F2 Electric Blue, #FFF12E Neon Yellow, #FFFFFF Optical White, on dark #021440 navy backdrop).
2. For \`suggestedSettings\`, set \`suggestedFileName\` to "{{heroMigrationContext.generatedAsset}}" (or with .webp extension) and use the recommended aspect ratio from the catalog.
3. For \`improvedCodeSnippet\`, provide the exact TSX code for this Hero component, importing \`Image\` from 'next/image' and inserting the asset with Next.js 15 best practices (\`fill\`, \`priority\`, responsive \`sizes\`, dark gradient veil scrim for contrast, and hover micro-interaction).
4. For \`variants\`, generate 3 alternative artistic variations directly derived from this specific hero's theme (e.g. macro prop detail, wide-angle environmental street scene in MDQ, or dynamic high-velocity telemetry perspective).
</hero_migration_adaptation>
{{/if}}

Generate the final JSON object now strictly matching the output schema.
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

    const defaultFileName = input.heroMigrationContext?.generatedAsset
      ? input.heroMigrationContext.generatedAsset.replace('.png', '.webp')
      : input.componentName
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
