import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export interface VisualSlotDoc {
  id: string;
  name: string;
  type: 'image-replacement' | 'hero-full' | 'background-atmosphere' | 'card-asset' | 'custom';
  description: string;
  targetCodeSnippet?: string;
  suggestedAspectRatio: string;
  suggestedPromptFocus: string;
  slotBadge?: string;
}

export interface HeroMigrationDoc {
  id: string;
  section: string;
  route: string;
  tsxComponent: string;
  badge: string;
  titleDisplay: string;
  subtitleLead: string;
  concept: string;
  generatedAsset: string;
  prompt3D: string;
  prompt3DOptimized: string;
  negativePrompt: string;
  aspectRatio: string;
  cameraAndRender: string;
  palette: string[];
  keyPillsOrKpis: string[];
}

export interface WebSectionDoc {
  id: string;
  name: string;
  type: 'hero' | 'cards' | 'bento' | 'pricing' | 'form' | 'social-proof' | 'cta' | 'features' | 'slider' | 'faq' | 'general';
  componentPath?: string;
  componentName?: string;
  description: string;
  proceduralVariant?: string;
  rawSnippet?: string;
  visualSlots: VisualSlotDoc[];
  heroMigration?: HeroMigrationDoc;
}

export interface WebPageDoc {
  id: string;
  fileName: string;
  title: string;
  url: string;
  pagePath: string;
  description: string;
  category: 'home' | 'servicios' | 'cotizadores' | 'nosotros' | 'contacto' | 'legal' | 'ui-kit';
  sections: WebSectionDoc[];
}

function detectSectionType(name: string, componentPath: string): WebSectionDoc['type'] {
  const lower = (name + ' ' + componentPath).toLowerCase();
  if (lower.includes('hero')) return 'hero';
  if (lower.includes('bento')) return 'bento';
  if (lower.includes('pricing') || lower.includes('precio') || lower.includes('tarifa')) return 'pricing';
  if (lower.includes('feature') || lower.includes('beneficio') || lower.includes('vision')) return 'features';
  if (lower.includes('slider') || lower.includes('carrusel') || lower.includes('carousel')) return 'slider';
  if (lower.includes('social') || lower.includes('proof') || lower.includes('review') || lower.includes('testimonio')) return 'social-proof';
  if (lower.includes('cta') || lower.includes('action')) return 'cta';
  if (lower.includes('form') || lower.includes('contact') || lower.includes('input') || lower.includes('autocomplete')) return 'form';
  if (lower.includes('faq') || lower.includes('pregunta')) return 'faq';
  if (lower.includes('card') || lower.includes('grid') || lower.includes('overview') || lower.includes('cases')) return 'cards';
  return 'general';
}

function detectCategory(fileName: string): WebPageDoc['category'] {
  if (fileName === 'home.md') return 'home';
  if (fileName.startsWith('servicios-')) return 'servicios';
  if (fileName.startsWith('cotizar-')) return 'cotizadores';
  if (fileName.startsWith('nosotros-')) return 'nosotros';
  if (fileName.includes('contacto')) return 'contacto';
  if (fileName.includes('politica') || fileName.includes('terminos') || fileName.includes('legal')) return 'legal';
  return 'ui-kit';
}

function cleanMarkdownText(str: string): string {
  return str.replace(/\*\*/g, '').replace(/`/g, '').trim();
}

interface RawHeroMigrationItem {
  id: string;
  section: string;
  route: string;
  tsx_component: string;
  badge: string;
  title_display: string;
  subtitle_lead: string;
  trust_badges?: string[];
  kpi_chips?: Array<{ label: string; value: string }>;
  feature_pills?: string[];
  search_categories?: string[];
  right_column_visual: {
    concept: string;
    generated_asset: string;
    prompt_3d: string;
    prompt_3d_optimized?: string;
    negative_prompt: string;
    aspect_ratio: string;
    camera_and_render: string;
    palette: string[];
  };
}

export const getHeroMigrationCatalog = cache(async (): Promise<Map<string, HeroMigrationDoc>> => {
  const map = new Map<string, HeroMigrationDoc>();
  try {
    const jsonPath = path.join(process.cwd(), 'docs', 'contenido', 'heros_migracion_adaptado.json');
    const content = await fs.readFile(jsonPath, 'utf-8');
    const data: { heros: RawHeroMigrationItem[] } = JSON.parse(content);

    for (const hero of data.heros || []) {
      const compName = path.basename(hero.tsx_component, path.extname(hero.tsx_component));
      const pills: string[] = [
        ...(hero.trust_badges || []),
        ...(hero.feature_pills || []),
        ...(hero.kpi_chips?.map((k) => `${k.label}: ${k.value}`) || []),
        ...(hero.search_categories || []),
      ];
      const doc: HeroMigrationDoc = {
        id: hero.id,
        section: hero.section,
        route: hero.route,
        tsxComponent: hero.tsx_component,
        badge: hero.badge,
        titleDisplay: hero.title_display,
        subtitleLead: hero.subtitle_lead,
        concept: hero.right_column_visual.concept,
        generatedAsset: hero.right_column_visual.generated_asset,
        prompt3D: hero.right_column_visual.prompt_3d,
        prompt3DOptimized: hero.right_column_visual.prompt_3d_optimized || hero.right_column_visual.prompt_3d,
        negativePrompt: hero.right_column_visual.negative_prompt,
        aspectRatio: hero.right_column_visual.aspect_ratio || '1:1',
        cameraAndRender: hero.right_column_visual.camera_and_render,
        palette: hero.right_column_visual.palette || [],
        keyPillsOrKpis: pills,
      };
      map.set(compName.toLowerCase(), doc);
      map.set(hero.id.toLowerCase(), doc);
      map.set(hero.route.toLowerCase(), doc);
    }
  } catch (err) {
    console.error('Error reading heros_migracion_adaptado.json:', err);
  }
  return map;
});

/**
 * Builds smart visual slots for a component based on its code content, role,
 * and official hero migration specifications (heros-migracion.html & heros_migracion_adaptado.json).
 */
function extractVisualSlots(
  componentFileName: string,
  sectionType: WebSectionDoc['type'],
  componentCode: string,
  pageTitle: string,
  heroDoc?: HeroMigrationDoc
): { slots: VisualSlotDoc[]; proceduralVariant?: string; rawSnippet?: string } {
  const slots: VisualSlotDoc[] = [];
  let proceduralVariant: string | undefined;

  // 1. Check for HeroProceduralBackground
  const proceduralMatch = componentCode.match(/<HeroProceduralBackground\s+variant=["']([a-zA-Z0-9_-]+)["']/);
  if (proceduralMatch) {
    proceduralVariant = proceduralMatch[1];
  }

  // 2. HERO SPECIALIZED ADAPTATION (11 Heros Catalog)
  if (heroDoc) {
    // Slot A: Official 3D Asset documented for the Hero's Right Column
    slots.push({
      id: 'hero-right-visual',
      name: `Asset 3D Columna Derecha: ${heroDoc.concept} (${heroDoc.generatedAsset})`,
      type: 'card-asset',
      slotBadge: 'Asset Hero Oficial',
      description: `Asset 3D visual oficial para la columna derecha de ${heroDoc.section} (${heroDoc.generatedAsset}). Concepto: ${heroDoc.concept}.`,
      suggestedAspectRatio: heroDoc.aspectRatio || '1:1',
      suggestedPromptFocus: heroDoc.prompt3DOptimized || heroDoc.prompt3D,
    });

    // Slot B: Full 3D Hero Mockup Composition
    slots.push({
      id: 'hero-full-composition',
      name: `Composición Completa ${heroDoc.section} (Mockup 3D Hero)`,
      type: 'hero-full',
      slotBadge: 'Mockup 3D Hero',
      description: `Render editorial 3D de la cabecera completa: titular monumental "${heroDoc.titleDisplay}", badge "${heroDoc.badge}", CTAs y elementos interactivos en display flotante.`,
      suggestedAspectRatio: '16:9',
      suggestedPromptFocus: `High-end 3D isometric asymmetric bento UI mockup of ${heroDoc.section} header for Envíos DosRuedas. Featuring bold headline "${heroDoc.titleDisplay}", glowing high-visibility yellow (#FFF12E) badge ("${heroDoc.badge}"), floating cards in electric blue (#0C59F2) and optical white (#FFFFFF), subtle frosted bevels, and dual studio rim lighting. 16:9 cinematic aspect ratio.`,
    });

    // Slot C: Specific Hero Props & HUD Telemetry Cards
    if (componentFileName === 'ContactHero' || heroDoc.id === 'hero-contact') {
      const hudSnippet = `<div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-gradient-to-br from-[#052C87] via-[#04236B] to-[#021440] p-6 flex flex-col justify-between">
  <HeroProceduralBackground variant="contact" />
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
</div>`;
      slots.push({
        id: 'hud-dispatch-moto',
        name: 'Tarjeta HUD de Despacho & Moto (Reemplazo HeroProceduralBackground)',
        type: 'image-replacement',
        slotBadge: 'Reemplazo en Código',
        description: 'Tarjeta HUD de 220px en la columna izquierda. Reemplaza el fondo procedimental plano por un asset visual cinematográfico de moto eléctrica, rider y telemetría GPS activa en Mar del Plata.',
        targetCodeSnippet: hudSnippet,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: 'Modern high-end urban delivery electric scooter stationed on clean wet asphalt outside the Friuli 1972 logistics dispatch hub in Mar del Plata, captured from a dynamic low three-quarter angle. Matte electric blue (#0C59F2) aerodynamic bodywork with glowing neon yellow (#FFF12E) rear cubic cargo box branded with bold optical white (#FFFFFF) typography reading "ENVÍOS DOSRUEDAS". Floating semi-transparent holographic GPS telemetry HUD with route coordinates in General Pueyrredón. Dual studio lighting with intense #0C59F2 key and #FFF12E neon rim glow, 50mm f/2.8 lens, cinematic volumetric depth, 16:9 aspect ratio.',
      });
    } else if (componentFileName === 'HeroAnimado' || heroDoc.id === 'hero-animado') {
      slots.push({
        id: 'hud-telemetry-gps',
        name: 'Módulo HUD de Ruteo Activo MDQ (Friuli 1972)',
        type: 'image-replacement',
        slotBadge: 'HUD Telemetría',
        description: 'HUD holográfico con mapa GPS de Mar del Plata, rutas activas desde Friuli 1972 y micro-badges de Same-Day y Flota Propia.',
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: '3D isometric stylized map of Mar del Plata with clean glassmorphism aesthetic. Electric delivery scooter in electric blue (#0C59F2) accelerating along coastal boulevard leaving vibrant neon yellow (#FFF12E) kinetic light trail. Glowing yellow GPS markers in Chauvín, Centro and Güemes, translucent HUD card reading "Ruteo Activo · Friuli 1972", 16:9 ratio.',
      });
    } else if (componentFileName === 'AboutHero' || heroDoc.id === 'hero-about') {
      slots.push({
        id: 'trust-reviews-badge',
        name: 'Insignia de Confianza 3D + Widget Google Reviews 5.0 ★',
        type: 'card-asset',
        slotBadge: 'Social Proof 3D',
        description: 'Emblema heráldico 3D en oro amarillo #FFF12E grabado "+7 AÑOS EN MDQ" y "100% FLOTA PROPIA" junto a smartphone con widget de reseñas 5.0 ★.',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: '3D luxury trust badge and social proof visual. Embossed metallic heraldic emblem in mirror-polished yellow #FFF12E and deep electric blue #0C59F2 enamel engraved with "+7 AÑOS EN MDQ" and "100% FLOTA PROPIA". Floating smartphone with verified 5.0 ★ Google Reviews card, deep navy backdrop.',
      });
    } else if (componentFileName === 'NetworksHero' || heroDoc.id === 'hero-networks') {
      slots.push({
        id: 'social-3d-bubbles',
        name: 'Smartphone 3D + Burbujas Social Media + Contador +5.200',
        type: 'card-asset',
        slotBadge: 'Social Media 3D',
        description: 'Feed social en smartphone 3D flotante con burbujas tridimensionales de cámara, notificaciones y pill badge "+5.200 SEGUIDORES".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: 'Dynamic 3D social media and community visual. Sleek smartphone suspended at 3/4 angle with energetic feed in electric blue #0C59F2, floating dimensional social badges, and glowing yellow #FFF12E pill badge "+5.200 SEGUIDORES", Octane render.',
      });
    } else if (componentFileName === 'FaqHero' || heroDoc.id === 'hero-faq') {
      slots.push({
        id: 'support-magnifier-megaphone',
        name: 'Lupa 3D de Cristal Óptico + Megáfono "Respuesta < 5 min"',
        type: 'card-asset',
        slotBadge: 'Soporte 3D',
        description: 'Lupa de precisión en cristal óptico enfocando sobre tarjetas FAQ traslúcidas con megáfono amarillo #FFF12E y badge "RESPUESTA < 5 MIN".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: 'High-tech 3D customer support illustration. Precision-engineered magnifying glass crafted from optical crystal with electric blue #0C59F2 rim over frosted-glass FAQ cards, floating yellow #FFF12E megaphone emitting sound waves with "RESPUESTA < 5 MIN" badge.',
      });
    } else if (componentFileName === 'CotizadorExpressHero' || heroDoc.id === 'hero-cotizar-express') {
      slots.push({
        id: 'route-telemetry-console',
        name: 'Consola Táctil 3D + Velocímetro "< 3 Horas"',
        type: 'card-asset',
        slotBadge: 'Consola HUD',
        description: 'Consola digital con simulador de rutas GPS en Mar del Plata, velocímetro holográfico en amarillo #FFF12E y badge de tarifa en vivo.',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: '3D interactive delivery telemetry console and route calculator dashboard. Sleek dark tablet console in 3/4 perspective displaying GPS route across Mar del Plata, floating holographic speedometer in neon yellow #FFF12E indicating "< 3 HORAS", digital price tag card in crisp typography.',
      });
    } else if (componentFileName === 'CotizadorLowCostHero' || heroDoc.id === 'hero-cotizar-lowcost') {
      slots.push({
        id: 'parcel-pyramid-scale',
        name: 'Pirámide de Cajas Kraft 3D + Balanza Digital + Sello 40% Ahorro',
        type: 'card-asset',
        slotBadge: 'Bodegón E-Commerce',
        description: 'Pila geométrica de cajas kraft con cinta adhesiva #0C59F2, balanza de paquetería digital y medalla "HASTA 40% DE AHORRO".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: '3D e-commerce parcel shipping composition. Neat geometric pyramid stack of kraft cardboard delivery boxes sealed with electric blue #0C59F2 branded tape, precision digital parcel scale with illuminated LED, floating shiny yellow #FFF12E discount badge "HASTA 40% DE AHORRO · SAME-DAY".',
      });
    } else if (componentFileName === 'ExpressHero' || heroDoc.id === 'hero-servicios-express') {
      slots.push({
        id: 'courier-radar-ring',
        name: 'Rider en Moto Eléctrica MDQ + Radar HUD "3 HS RANGO"',
        type: 'card-asset',
        slotBadge: 'Acción Cinemática',
        description: 'Toma dinámica de courier en moto eléctrica por Cabo Corrientes con anillo radar holográfico y badge "3 HS RANGO GARANTIZADO".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: 'Cinematic dynamic action shot of professional courier riding modern electric motorcycle along the coastal boulevard of Mar del Plata (Cabo Corrientes). Matte electric blue #0C59F2 helmet and jacket with yellow #FFF12E reflective stripes, floating circular HUD radar ring with route telemetry and neon yellow badge "3 HS RANGO GARANTIZADO".',
      });
    } else if (componentFileName === 'LowCostHero' || heroDoc.id === 'hero-servicios-lowcost') {
      slots.push({
        id: 'conveyor-dispatch-clock',
        name: 'Cinta Transportadora + Reloj Digital 13:00 hs + Sello Mismo Día',
        type: 'card-asset',
        slotBadge: 'Fulfillment Industrial',
        description: 'Cinta transportadora industrial con paquetes de paquetería e-commerce, reloj LED "13:00 HS" y sello dorado "ENTREGA MISMO DÍA".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: '3D automated logistics batching concept. Modern industrial conveyor belt in brushed dark steel transporting e-commerce packages with electric blue #0C59F2 shipping labels, oversized 3D digital LED clock displaying cutoff deadline "13:00 HS" in glowing yellow #FFF12E numerals, embossed golden ribbon "ENTREGA MISMO DÍA".',
      });
    } else if (componentFileName === 'FlexHero' || heroDoc.id === 'hero-servicios-flex') {
      slots.push({
        id: 'laser-qr-scanner-medal',
        name: 'Escaneo Láser QR en Paquete + Medallón MercadoLíder Gold',
        type: 'card-asset',
        slotBadge: 'Operación Flex 3D',
        description: 'Primer plano de scanner inalámbrico proyectando láser amarillo #FFF12E sobre etiqueta QR y medalla "MERCADOLÍDER GOLD · 100% CUMPLIMIENTO".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: 'Close-up 3D operational scene of MercadoLibre Flex delivery logistics. Stylized courier hands holding ergonomic wireless scanner projecting sharp yellow #FFF12E laser line onto shipping label QR code on package, gleaming 3D medallion in yellow gold with embossed "MERCADOLÍDER GOLD · 100% CUMPLIMIENTO", royal blue #0C59F2 rim light.',
      });
    } else if (componentFileName === 'EmprendedoresHero' || heroDoc.id === 'hero-servicios-emprendedores') {
      slots.push({
        id: 'warehouse-cutaway-picking',
        name: 'Hub Friuli 1972 Cutaway 3D + Picking QR + DropOFF -20%',
        type: 'card-asset',
        slotBadge: 'Hub Logístico 3D',
        description: 'Corte transversal 3D del almacén central de Friuli 1972 con estanterías en azul #0C59F2, tablet de picking QR y sello "DROPOFF -20% OFF".',
        suggestedAspectRatio: '1:1',
        suggestedPromptFocus: '3D isometric cutaway view of e-commerce fulfillment warehouse hub (Friuli 1972 Central Hub Mar del Plata). Heavy-duty industrial metal racking in electric blue #0C59F2 filled with inventory bins and labeled boxes, electric pallet jack, hovering translucent glass tablet displaying live QR picking interface, glowing yellow #FFF12E badge "DROPOFF -20% OFF".',
      });
    }

    // Slot D: Procedural background replacement if present
    if (proceduralVariant && !slots.some((s) => s.id === 'hud-dispatch-moto')) {
      slots.push({
        id: `procedural-replacement-${proceduralVariant}`,
        name: `Reemplazo en Código: <HeroProceduralBackground variant="${proceduralVariant}">`,
        type: 'image-replacement',
        slotBadge: 'Reemplazo en Código',
        description: `Sustituye el fondo procedural plano "${proceduralVariant}" por el asset visual de producción adaptado a este Hero.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: heroDoc.prompt3DOptimized || heroDoc.prompt3D,
      });
    }

    // Slot E: High-voltage Atmospheric canvas
    slots.push({
      id: 'background-atmosphere',
      name: `Lienzo Atmosférico / High-Voltage Glow Orbs (${heroDoc.section})`,
      type: 'background-atmosphere',
      slotBadge: 'Fondo de Sección',
      description: `Fondo ambiental de alta energía con orbes esféricos difusos de neón amarillo #FFF12E y azul institucional #0C59F2.`,
      suggestedAspectRatio: '21:9',
      suggestedPromptFocus: `Abstract high-voltage atmospheric studio backdrop with deep electric blue (#0C59F2) volumetric fog and diffused neon yellow (#FFF12E) spherical light orbs. Dark gradient transitions toward deep navy (#021440), clean negative space for UI overlays, 21:9 ratio.`,
    });
  } else {
    // 3. Fallback for non-hero components
    if (proceduralVariant) {
      const procIdx = componentCode.indexOf('<HeroProceduralBackground');
      let targetSnippet = '';
      if (procIdx !== -1) {
        const start = Math.max(0, componentCode.lastIndexOf('<div', procIdx));
        const end = Math.min(componentCode.length, componentCode.indexOf('</div>', procIdx) + 6);
        targetSnippet = componentCode.slice(start, end).trim();
      }

      slots.push({
        id: `procedural-replacement-${proceduralVariant}`,
        name: `Asset Visual para Reemplazo de <HeroProceduralBackground variant="${proceduralVariant}">`,
        type: 'image-replacement',
        slotBadge: 'Reemplazo en Código',
        description: `Sustituye el fondo procedimental plano "${proceduralVariant}" por un render 3D o fotografía de producción integrada en el código TSX.`,
        targetCodeSnippet: targetSnippet || `<HeroProceduralBackground variant="${proceduralVariant}" />`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Cinematic 3D render of rapid urban logistics in Mar del Plata tailored for the ${proceduralVariant} module. High-performance electric scooter with signature neon yellow (#FFF12E) cargo trunk and electric blue (#0C59F2) fairings, navigating modern coastal streets. Balanced studio lighting with #FFF12E edge rim highlights and deep contrast negative space for text legibility, 35mm lens, 16:9 ratio.`,
      });
    }

    if (sectionType === 'hero') {
      slots.push({
        id: 'hero-full-composition',
        name: `Composición Completa ${componentFileName} (Mockup 3D)`,
        type: 'hero-full',
        slotBadge: 'Mockup 3D Hero',
        description: `Render 3D completo de la sección ${componentFileName} en perspectiva isométrica o sobre dispositivo de alta gama.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Premium 3D isometric asymmetric bento mockup of ${pageTitle} header interface. Floating frosted glass panels in #0C59F2 electric blue and #FFFFFF optical white, accented by vivid #FFF12E neon indicators and typography. Clean studio softbox key light with specular edge highlights, pristine depth of field, 16:9 cinematic aspect ratio.`,
      });
    } else if (sectionType === 'bento' || sectionType === 'cards') {
      slots.push({
        id: 'bento-grid-full',
        name: `Grilla Bento Completa ${componentFileName}`,
        type: 'card-asset',
        slotBadge: 'Grilla Bento',
        description: `Render 3D de las tarjetas bento asimétricas con profundidad y vidrio esmerilado.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Architectural 3D asymmetric bento grid display for ${componentFileName}. Individual cards featuring frosted glass finishes, bold #0C59F2 surface fills, glowing #FFF12E telemetry badges, and high-contrast #FFFFFF sans-serif typography. Overhead studio softbox lighting with crisp contact shadows, 16:9 composition.`,
      });
    } else {
      slots.push({
        id: 'section-mockup',
        name: `Mockup UI 3D de ${componentFileName}`,
        type: 'hero-full',
        slotBadge: 'Mockup UI',
        description: `Composición visual representativa de la sección ${componentFileName}.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Refined 3D visual composition of ${componentFileName} under the official Envíos DosRuedas color triad. High-voltage #0C59F2 electric blue foundational plane with #FFF12E neon accent rims and crisp #FFFFFF optical white text, clean studio optics, 16:9 aspect ratio.`,
      });
    }

    slots.push({
      id: 'background-atmosphere',
      name: 'Lienzo Atmosférico / Fondo de Iluminación',
      type: 'background-atmosphere',
      slotBadge: 'Fondo de Sección',
      description: 'Lienzo de fondo con resplandores neón institucionales.',
      suggestedAspectRatio: '21:9',
      suggestedPromptFocus: 'Abstract high-voltage atmospheric studio backdrop with deep electric blue (#0C59F2) volumetric fog and diffused neon yellow (#FFF12E) spherical light orbs. Clean negative space for overlaid React UI components, 21:9 ultrawide format.',
    });
  }

  // Always include a custom slot option
  slots.push({
    id: 'custom-slot',
    name: 'Slot Personalizado / Sub-parte Manual',
    type: 'custom',
    slotBadge: 'Manual',
    description: 'Indicá una parte visual o elemento específico del componente que querés conceptualizar.',
    suggestedAspectRatio: '16:9',
    suggestedPromptFocus: '',
  });

  const rawSnippet = componentCode.length > 2000 ? componentCode.slice(0, 2000) + '\n// ... truncated' : componentCode;

  return { slots, proceduralVariant, rawSnippet };
}

export async function parseDocFile(fileName: string, content: string): Promise<WebPageDoc | null> {
  try {
    // Title
    const titleMatch = content.match(/^#\s*(?:📄\s*Nodo:\s*)?([^\r\n]+)/m);
    const title = titleMatch ? cleanMarkdownText(titleMatch[1]) : fileName.replace('.md', '');

    // URL
    const urlMatch = content.match(/>\s*\*\*URL:\*\*\s*`?([^`\r\n\s]+)`?/);
    const url = urlMatch ? urlMatch[1] : `/${fileName.replace('.md', '')}`;

    // Page Path
    const pagePathMatch = content.match(/>\s*\*\*Path Relativa Página:\*\*\s*`?([^`\r\n\s]+)`?/);
    const pagePath = pagePathMatch ? pagePathMatch[1] : '';

    // Description from metadata
    let description = '';
    const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      const blockquoteMatch = content.match(/^>\s+([^>\r\n]+)/m);
      if (blockquoteMatch && !blockquoteMatch[1].includes('URL:')) {
        description = blockquoteMatch[1].trim();
      }
    }
    if (!description) {
      description = `Página ${title} de Envíos DosRuedas.`;
    }

    // Parse Components Table
    const sections: WebSectionDoc[] = [];
    const tableRegex = /\|\s*(Componente|\*\*Página Raíz\*\*|[a-zA-Z0-9_-]+)\s*\|\s*`?([^`|\r\n]+)`?\s*\|\s*([^|\r\n]+)\s*\|/g;
    let match;
    const seenPaths = new Set<string>();

    while ((match = tableRegex.exec(content)) !== null) {
      const rawPath = match[2].trim();
      if (!rawPath.endsWith('.tsx') && !rawPath.endsWith('.ts')) continue;
      if (rawPath === 'Path Relativa' || seenPaths.has(rawPath)) continue;
      seenPaths.add(rawPath);

      const componentFileName = path.basename(rawPath, path.extname(rawPath));
      const sectionType = detectSectionType(componentFileName, rawPath);
      const sectionId = componentFileName.toLowerCase();

      // Look for code block of this component in the file
      let componentDesc = '';
      let componentCode = '';

      const sectionHeaderRegex = new RegExp(`##\\s*\\d*\\.?\\s*.*${componentFileName}[^\\n]*\\n+([\\s\\S]*?)(?=##|$)`, 'i');
      const headerMatch = content.match(sectionHeaderRegex);
      if (headerMatch) {
        const fullBlock = headerMatch[1];
        // Extract JSDoc or header description
        const jsdocMatch = fullBlock.match(/\/\*\*([\s\S]*?)\*\//);
        if (jsdocMatch) {
          componentDesc = jsdocMatch[1].replace(/\*/g, '').trim().split('\n')[0].trim();
        }

        // Extract TSX code fence
        const codeFenceMatch = fullBlock.match(/```tsx([\s\S]*?)```/);
        if (codeFenceMatch) {
          componentCode = codeFenceMatch[1].trim();
        }
      }

      if (!componentDesc) {
        componentDesc = `Componente visual ${componentFileName} para la sección ${sectionType} de ${title}.`;
      }

      const heroDoc = heroMap?.get(componentFileName.toLowerCase()) || heroMap?.get(sectionId);

      const { slots, proceduralVariant, rawSnippet } = extractVisualSlots(
        componentFileName,
        sectionType,
        componentCode,
        title,
        heroDoc
      );

      sections.push({
        id: sectionId,
        name: componentFileName.replace(/([A-Z])/g, ' $1').trim(),
        type: sectionType,
        componentPath: rawPath,
        componentName: componentFileName,
        description: componentDesc,
        proceduralVariant,
        rawSnippet,
        visualSlots: slots,
        heroMigration: heroDoc,
      });
    }

    // If no sections found in table, extract by ## Headers
    if (sections.length === 0) {
      const headerRegex = /^##\s+\d*\.?\s*`?([a-zA-Z0-9_-]+(?:\.tsx)?)`?/gm;
      let hMatch;
      while ((hMatch = headerRegex.exec(content)) !== null) {
        const compName = hMatch[1].replace('.tsx', '').trim();
        if (compName && compName !== 'Componentes del Nodo') {
          const sectionType = detectSectionType(compName, compName);
          const heroDoc = heroMap?.get(compName.toLowerCase());
          const { slots, proceduralVariant } = extractVisualSlots(compName, sectionType, '', title, heroDoc);
          sections.push({
            id: compName.toLowerCase(),
            name: compName.replace(/([A-Z])/g, ' $1').trim(),
            type: sectionType,
            componentName: compName,
            description: `Sección visual ${compName} de ${title}.`,
            proceduralVariant,
            visualSlots: slots,
            heroMigration: heroDoc,
          });
        }
      }
    }

    const pageDoc: WebPageDoc = {
      id: fileName.replace('.md', ''),
      fileName,
      title,
      url,
      pagePath,
      description,
      category: detectCategory(fileName),
      sections,
    };

    return pageDoc;
  } catch (err) {
    console.error(`Error parsing doc file ${fileName}:`, err);
    return null;
  }
}

/**
 * Lee y parsea todos los docs de `docs/contenido`. Envuelto en `cache` de React
 * para deduplicar llamadas dentro del mismo render/request (page + action).
 */
export const getAllWebPagesDocs = cache(async (): Promise<WebPageDoc[]> => {
  const docsDir = path.join(process.cwd(), 'docs', 'contenido');
  try {
    const heroMap = await getHeroMigrationCatalog();
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'INDEX.md');

    const priorityOrder = [
      'contacto.md', // Put contacto first for rapid access
      'home.md',
      'servicios-express.md',
      'servicios-lowcost.md',
      'servicios-flex.md',
      'servicios-emprendedores.md',
      'cotizar-express.md',
      'cotizar-lowcost.md',
      'nosotros-sobre.md',
      'nosotros-faq.md',
      'nosotros-redes.md',
      'ui-components.md',
      'layout-global.md',
      'politica-de-privacidad.md',
      'terminos-y-condiciones.md',
    ];

    mdFiles.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    // Lectura en paralelo; Promise.all conserva el orden de mdFiles.
    const parsedDocs = await Promise.all(
      mdFiles.map(async (file) => {
        const content = await fs.readFile(path.join(docsDir, file), 'utf-8');
        return parseDocFile(file, content, heroMap);
      })
    );

    return parsedDocs.filter((doc): doc is WebPageDoc => doc !== null);
  } catch (error) {
    console.error('Error reading docs/contenido directory:', error);
    return [];
  }
});

/** Sección tal como viaja al cliente: sin `rawSnippet`, que solo usa el servidor. */
export type ClientWebSectionDoc = Omit<WebSectionDoc, 'rawSnippet'>;
export type ClientWebPageDoc = Omit<WebPageDoc, 'sections'> & { sections: ClientWebSectionDoc[] };

/** Quita del payload los datos que el cliente nunca muestra. */
export function toClientPagesDocs(docs: WebPageDoc[]): ClientWebPageDoc[] {
  return docs.map((page) => ({
    ...page,
    sections: page.sections.map(({ rawSnippet: _rawSnippet, ...section }) => section),
  }));
}

/** Snippet de código para el prompt: el del slot si existe; si no, el crudo de la sección. */
export function resolveCodeSnippet(
  section: Pick<WebSectionDoc, 'rawSnippet'>,
  slot?: Pick<VisualSlotDoc, 'targetCodeSnippet'> | null
): string | undefined {
  return slot?.targetCodeSnippet || section.rawSnippet;
}

/** Resuelve en el servidor la página, sección y slot elegidos por id. */
export async function findWebSectionContext(pageId: string, sectionId: string, slotId?: string) {
  const docs = await getAllWebPagesDocs();
  const page = docs.find((p) => p.id === pageId);
  const section = page?.sections.find((s) => s.id === sectionId);
  if (!page || !section) return null;

  const slot = slotId ? section.visualSlots.find((s) => s.id === slotId) ?? null : null;
  return {
    page,
    section,
    slot,
    codeSnippet: resolveCodeSnippet(section, slot),
    heroMigration: section.heroMigration,
  };
}
