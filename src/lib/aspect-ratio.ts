export const ASPECT_RATIOS = ['16:9', '1:1', '9:16', '4:3', '3:4'] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];
export const DEFAULT_ASPECT_RATIO: AspectRatio = '1:1';

function isAspectRatio(value: string): value is AspectRatio {
  return (ASPECT_RATIOS as readonly string[]).includes(value);
}

/**
 * Normaliza un label como '16:9 (Panorámica)' o 'Historia (9:16)' a un
 * AspectRatio soportado. Cualquier valor inválido o ausente cae a '1:1'.
 */
export function parseAspectRatio(raw?: string | null): AspectRatio {
  if (!raw) return DEFAULT_ASPECT_RATIO;
  const match = raw.match(/\d+:\d+/);
  if (!match) return DEFAULT_ASPECT_RATIO;
  return isAspectRatio(match[0]) ? match[0] : DEFAULT_ASPECT_RATIO;
}
