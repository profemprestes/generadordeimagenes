import fs from 'fs/promises';
import path from 'path';

export interface WebSectionDoc {
  id: string;
  name: string;
  type: 'hero' | 'cards' | 'bento' | 'pricing' | 'form' | 'social-proof' | 'cta' | 'features' | 'slider' | 'faq' | 'general';
  componentPath?: string;
  componentName?: string;
  description: string;
  rawSnippet?: string;
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

      // Look for comments or context for this component in the file
      let componentDesc = '';
      const sectionHeaderRegex = new RegExp(`##\\s*\\d*\\.?\\s*.*${componentFileName}[^\\n]*\\n+([\\s\\S]*?)(?=##|$)`, 'i');
      const headerMatch = content.match(sectionHeaderRegex);
      if (headerMatch) {
        const snippet = headerMatch[1].slice(0, 500);
        // Check if there's JSDoc or comments
        const jsdocMatch = snippet.match(/\/\*\*([\s\S]*?)\*\//);
        if (jsdocMatch) {
          componentDesc = jsdocMatch[1].replace(/\*/g, '').trim().split('\n')[0].trim();
        }
      }

      if (!componentDesc) {
        componentDesc = `Componente visual ${componentFileName} para la sección ${sectionType} de ${title}.`;
      }

      sections.push({
        id: sectionId,
        name: componentFileName.replace(/([A-Z])/g, ' $1').trim(),
        type: sectionType,
        componentPath: rawPath,
        componentName: componentFileName,
        description: componentDesc,
      });
    }

    // If no sections found in table (like in layout or some pages), extract by ## Headers
    if (sections.length === 0) {
      const headerRegex = /^##\s+\d*\.?\s*`?([a-zA-Z0-9_-]+(?:\.tsx)?)`?/gm;
      let hMatch;
      while ((hMatch = headerRegex.exec(content)) !== null) {
        const compName = hMatch[1].replace('.tsx', '').trim();
        if (compName && compName !== 'Componentes del Nodo') {
          sections.push({
            id: compName.toLowerCase(),
            name: compName.replace(/([A-Z])/g, ' $1').trim(),
            type: detectSectionType(compName, compName),
            componentName: compName,
            description: `Sección visual ${compName} de ${title}.`,
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

export async function getAllWebPagesDocs(): Promise<WebPageDoc[]> {
  const docsDir = path.join(process.cwd(), 'docs', 'contenido');
  try {
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'INDEX.md');

    const pagesDocs: WebPageDoc[] = [];

    // Desired display order
    const priorityOrder = [
      'home.md',
      'servicios-express.md',
      'servicios-lowcost.md',
      'servicios-flex.md',
      'servicios-emprendedores.md',
      'cotizar-express.md',
      'cotizar-lowcost.md',
      'contacto.md',
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

    for (const file of mdFiles) {
      const filePath = path.join(docsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = await parseDocFile(file, content);
      if (parsed) {
        pagesDocs.push(parsed);
      }
    }

    return pagesDocs;
  } catch (error) {
    console.error('Error reading docs/contenido directory:', error);
    return [];
  }
}
