import {
  ALL_ASPECT_RATIOS,
  STANDARD_ASPECT_RATIOS,
  EXTREME_ASPECT_RATIOS,
  type AspectRatio,
  type StandardAspectRatio,
  type ExtremeAspectRatio,
} from '@/types/prompt';

export {
  ALL_ASPECT_RATIOS,
  STANDARD_ASPECT_RATIOS,
  EXTREME_ASPECT_RATIOS,
  type AspectRatio,
  type StandardAspectRatio,
  type ExtremeAspectRatio,
};

export const ASPECT_RATIOS = ALL_ASPECT_RATIOS;
export const DEFAULT_ASPECT_RATIO: AspectRatio = '1:1';

function isAspectRatio(value: string): value is AspectRatio {
  return (ALL_ASPECT_RATIOS as readonly string[]).includes(value);
}

/**
 * Normaliza un label como '16:9 (Panorámica)' o '4:1 (Ultra-Panorámica)' a un
 * AspectRatio soportado. Cualquier valor inválido o ausente cae a '1:1'.
 */
export function parseAspectRatio(raw?: string | null): AspectRatio {
  if (!raw) return DEFAULT_ASPECT_RATIO;
  const match = raw.match(/\d+:\d+/);
  if (!match) return DEFAULT_ASPECT_RATIO;
  return isAspectRatio(match[0]) ? (match[0] as AspectRatio) : DEFAULT_ASPECT_RATIO;
}

