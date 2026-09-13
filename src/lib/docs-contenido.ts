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

/**
 * Builds smart visual slots for a component based on its code content and role.
 */
function extractVisualSlots(
  componentFileName: string,
  sectionType: WebSectionDoc['type'],
  componentCode: string,
  pageTitle: string
): { slots: VisualSlotDoc[]; proceduralVariant?: string; rawSnippet?: string } {
  const slots: VisualSlotDoc[] = [];
  let proceduralVariant: string | undefined;

  // 1. Check for HeroProceduralBackground
  const proceduralMatch = componentCode.match(/<HeroProceduralBackground\s+variant=["']([a-zA-Z0-9_-]+)["']/);
  if (proceduralMatch) {
    proceduralVariant = proceduralMatch[1];
  }

  // 2. Specialized extraction for ContactHero.tsx
  if (componentFileName === 'ContactHero') {
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
      slotBadge: 'Reemplazo de Fondo en Código',
      description: 'Tarjeta HUD de 220px en la columna izquierda. Reemplaza el fondo procedimental plano por un asset visual cinematográfico de moto eléctrica, rider y telemetría GPS activa en Mar del Plata.',
      targetCodeSnippet: hudSnippet,
      suggestedAspectRatio: '16:9',
      suggestedPromptFocus: 'Central de despacho urbano en Friuli 1972 Mar del Plata, scooter eléctrico de reparto de alta gama con caja cúbica amarilla neón #FFF12E, rider con uniforme azul #0C59F2, mapa holográfico GPS con rutas activas en General Pueyrredón, iluminación de estudio de alta tensión con llanta brillante.',
    });

    slots.push({
      id: 'hero-full-composition',
      name: 'Composición Completa ContactHero (Hero Mockup 3D)',
      type: 'hero-full',
      slotBadge: 'Mockup 3D Completo',
      description: 'Render editorial 3D de la sección entera de contacto: titular monumental "¿Hablamos ahora?", tarjetas de canales de WhatsApp/Llamada en azul medianoche y formulario de cotización B2B.',
      suggestedAspectRatio: '16:9',
      suggestedPromptFocus: 'Mockup UI 3D bento asimétrico de la pantalla de contacto de Envíos DosRuedas en display flotante con la tríada #0C59F2, #FFF12E y #FFFFFF, con micro-interacciones visuales.',
    });

    slots.push({
      id: 'contact-channels-bento',
      name: 'Tarjetas de Canales de Contacto Directo (Cards Bento)',
      type: 'card-asset',
      slotBadge: 'Módulo Bento',
      description: 'Módulo lateral de 3 tarjetas de acceso rápido (WhatsApp Comercial, Llamada de Coordinación, Cotización B2B).',
      suggestedAspectRatio: '4:3',
      suggestedPromptFocus: 'Trío de tarjetas bento 3D en azul eléctrico #0C59F2 con bordes traslúcidos, iconos luminosos en amarillo #FFF12E y flechas de interacción dinámicas.',
    });

    slots.push({
      id: 'background-atmosphere',
      name: 'Lienzo Atmosférico / High-Voltage Glow Orbs',
      type: 'background-atmosphere',
      slotBadge: 'Fondo de Sección',
      description: 'Fondo ambiental de alta energía con orbes esféricos difusos de neón amarillo #FFF12E/25 y azul medianoche para generar profundidad.',
      suggestedAspectRatio: '21:9',
      suggestedPromptFocus: 'Textura abstracta de iluminación de estudio fotográfico con orbes difusos de resplandor neón amarillo #FFF12E sobre azul institucional #0C59F2 y reflejos sutiles.',
    });
  } else {
    // Generic smart slots for other components
    if (proceduralVariant) {
      // Find the snippet around HeroProceduralBackground
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
        suggestedPromptFocus: `Render 3D de logística urbana en Mar del Plata para la variante ${proceduralVariant}, con moto eléctrica, cajas de entrega amarillas #FFF12E e iluminación institucional #0C59F2.`,
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
        suggestedPromptFocus: `Mockup UI 3D bento asimétrico de la cabecera de ${pageTitle}, con tarjetas flotantes en azul institucional #0C59F2 y acentos en amarillo #FFF12E.`,
      });
    } else if (sectionType === 'bento' || sectionType === 'cards') {
      slots.push({
        id: 'bento-grid-full',
        name: `Grilla Bento Completa ${componentFileName}`,
        type: 'card-asset',
        slotBadge: 'Grilla Bento',
        description: `Render 3D de las tarjetas bento asimétricas con profundidad y vidrio esmerilado.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Grilla bento 3D isómetrica con tarjetas en azul #0C59F2 y blanco óptico #FFFFFF con micro-detalles de telemetría y entrega.`,
      });
    } else {
      slots.push({
        id: 'section-mockup',
        name: `Mockup UI 3D de ${componentFileName}`,
        type: 'hero-full',
        slotBadge: 'Mockup UI',
        description: `Composición visual representativa de la sección ${componentFileName}.`,
        suggestedAspectRatio: '16:9',
        suggestedPromptFocus: `Composición visual de ${componentFileName} bajo la tríada oficial #0C59F2, #FFF12E y #FFFFFF.`,
      });
    }

    slots.push({
      id: 'background-atmosphere',
      name: 'Lienzo Atmosférico / Fondo de Iluminación',
      type: 'background-atmosphere',
      slotBadge: 'Fondo de Sección',
      description: 'Lienzo de fondo con resplandores neón institucionales.',
      suggestedAspectRatio: '21:9',
      suggestedPromptFocus: 'Fondo abstracto en azul eléctrico institucional #0C59F2 con reflejos de iluminación de estudio y acentos amarillos #FFF12E.',
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

      const { slots, proceduralVariant, rawSnippet } = extractVisualSlots(
        componentFileName,
        sectionType,
        componentCode,
        title
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
          const { slots, proceduralVariant } = extractVisualSlots(compName, sectionType, '', title);
          sections.push({
            id: compName.toLowerCase(),
            name: compName.replace(/([A-Z])/g, ' $1').trim(),
            type: sectionType,
            componentName: compName,
            description: `Sección visual ${compName} de ${title}.`,
            proceduralVariant,
            visualSlots: slots,
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
        return parseDocFile(file, content);
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
  return { page, section, slot, codeSnippet: resolveCodeSnippet(section, slot) };
}
