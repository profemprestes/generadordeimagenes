export type NanoBananaModel = 
  | 'gemini-3-pro-image-preview' // Nano Banana Pro: High-reasoning, typography, 1K/2K/4K
  | 'gemini-3.1-flash-image-preview'; // Nano Banana 2: Search Grounding, extreme aspect ratios

export type StandardAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9';
export type ExtremeAspectRatio = '1:4' | '4:1' | '1:8' | '8:1';

export type AspectRatio = StandardAspectRatio | ExtremeAspectRatio;

export const STANDARD_ASPECT_RATIOS: readonly StandardAspectRatio[] = [
  '1:1',
  '16:9',
  '9:16',
  '4:3',
  '3:4',
  '21:9',
] as const;

export const EXTREME_ASPECT_RATIOS: readonly ExtremeAspectRatio[] = [
  '1:4',
  '4:1',
  '1:8',
  '8:1',
] as const;

export const ALL_ASPECT_RATIOS: readonly AspectRatio[] = [
  ...STANDARD_ASPECT_RATIOS,
  ...EXTREME_ASPECT_RATIOS,
] as const;

export type OutputResolution = '0.5K' | '1K' | '2K' | '4K';

export type TypographyStyle = 
  | 'modern-sans' 
  | 'geometric-mono' 
  | 'editorial-serif' 
  | 'bold-condensed' 
  | 'minimalist-script';

export type TypographyTreatment = 
  | 'embossed' 
  | 'debossed' 
  | 'matte-silkscreen' 
  | 'backlit-neon' 
  | 'engraved-metallic'
  | 'clean-overprinted';

export interface IntegratedTypographyConfig {
  text: string; // e.g. "ENVÍOS DOSRUEDAS"
  style: TypographyStyle;
  treatment: TypographyTreatment;
  spatialPlacement: string; // e.g. "top-third center", "centered over front box"
}

export interface PromptBlueprint {
  subjectAndAction: string;
  environmentAndStaging: string;
  surfaceMaterialsPBR: string;
  typography?: IntegratedTypographyConfig;
  cameraAndLighting: string;
  model: NanoBananaModel;
  aspectRatio: AspectRatio;
  resolution: OutputResolution;
  useSearchGrounding?: boolean; // Available on Nano Banana 2
}
