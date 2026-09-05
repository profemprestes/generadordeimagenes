import type { PromptBlueprint, IntegratedTypographyConfig } from '@/types/prompt';

/**
 * List of legacy/banned keyword tags that should never appear in v2.0 prompts.
 */
const FORBIDDEN_TAGS_REGEX = /\b(Nano Banana|photorealistic|8k|trending on artstation|hyperrealistic|masterpiece|unreal engine|octane render)\b/gi;

/**
 * Sanitizes input strings removing legacy keyword spam and excess commas/spaces.
 */
export function sanitizePromptSegment(segment: string): string {
  if (!segment) return '';
  return segment
    .replace(FORBIDDEN_TAGS_REGEX, '')
    .replace(/\s+,/g, ',')
    .replace(/,{2,}/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Compiles typography layer into a cohesive natural language sentence.
 */
function compileTypographySegment(typography?: IntegratedTypographyConfig): string {
  if (!typography || !typography.text.trim()) return '';

  const cleanText = typography.text.trim().replace(/"/g, "'");
  const styleLabel = {
    'modern-sans': 'clean modern sans-serif typography',
    'geometric-mono': 'crisp geometric monospace typography',
    'editorial-serif': 'elegant editorial serif lettering',
    'bold-condensed': 'impactful bold condensed typography',
    'minimalist-script': 'subtle minimalist script lettering',
  }[typography.style];

  const treatmentLabel = {
    'embossed': 'tactile 3D embossed relief',
    'debossed': 'clean debossed precision imprint',
    'matte-silkscreen': 'matte silkscreen print',
    'backlit-neon': 'vibrant backlit illumination with subtle diffusion',
    'engraved-metallic': 'laser-engraved metallic finish',
    'clean-overprinted': 'sharp high-contrast overprinted finish',
  }[typography.treatment];

  return `The literal typography "${cleanText}" is seamlessly integrated with ${styleLabel} featuring a ${treatmentLabel}, positioned ${typography.spatialPlacement}.`;
}

/**
 * Compiles a PromptBlueprint into a single dense, production-ready narrative paragraph.
 */
export function compilePromptBlueprint(blueprint: PromptBlueprint): string {
  const parts: string[] = [];

  // 1. Subject & Action
  const subject = sanitizePromptSegment(blueprint.subjectAndAction);
  if (subject) {
    parts.push(subject.endsWith('.') ? subject : `${subject}.`);
  }

  // 2. Environment & Staging
  const staging = sanitizePromptSegment(blueprint.environmentAndStaging);
  if (staging) {
    parts.push(staging.endsWith('.') ? staging : `${staging}.`);
  }

  // 3. Materials & Surface Physics (PBR)
  const materials = sanitizePromptSegment(blueprint.surfaceMaterialsPBR);
  if (materials) {
    parts.push(materials.endsWith('.') ? materials : `${materials}.`);
  }

  // 4. Integrated Typography (Optional)
  if (blueprint.typography?.text) {
    const typoSentence = compileTypographySegment(blueprint.typography);
    if (typoSentence) {
      parts.push(typoSentence);
    }
  }

  // 5. Optics, Lighting & Format Specs
  const cameraAndLighting = sanitizePromptSegment(blueprint.cameraAndLighting);
  const ratioSpec = `${blueprint.aspectRatio} aspect ratio`;
  const resolutionSpec = `${blueprint.resolution} rendering`;
  const groundingSpec = blueprint.useSearchGrounding ? 'verifiable geographic location and accurate regional architectural landmarks' : '';

  const technicalSpecs = [
    cameraAndLighting.replace(/\.$/, ''),
    groundingSpec,
    ratioSpec,
    resolutionSpec,
  ]
    .filter(Boolean)
    .join(', ');

  if (technicalSpecs) {
    parts.push(`Captured with ${technicalSpecs}.`);
  }

  return parts.join(' ').trim();
}
