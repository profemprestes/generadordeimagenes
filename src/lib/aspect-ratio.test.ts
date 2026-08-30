import { describe, expect, it } from 'vitest';
import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO, parseAspectRatio } from '@/lib/aspect-ratio';

describe('parseAspectRatio', () => {
  it('extrae el ratio de un label con sufijo', () => {
    expect(parseAspectRatio('16:9 (Panorámica)')).toBe('16:9');
    expect(parseAspectRatio('4:3 (Clásica)')).toBe('4:3');
    expect(parseAspectRatio('Historia (9:16)')).toBe('9:16');
  });

  it('acepta un ratio ya normalizado', () => {
    expect(parseAspectRatio('1:1')).toBe('1:1');
    expect(parseAspectRatio('3:4')).toBe('3:4');
  });

  it('cae a 1:1 con valores inválidos, vacíos o ausentes', () => {
    expect(parseAspectRatio('basura')).toBe('1:1');
    expect(parseAspectRatio('21:9')).toBe('1:1');
    expect(parseAspectRatio('')).toBe('1:1');
    expect(parseAspectRatio(undefined)).toBe('1:1');
    expect(parseAspectRatio(null)).toBe('1:1');
  });

  it('expone la lista y el default', () => {
    expect(ASPECT_RATIOS).toEqual(['16:9', '1:1', '9:16', '4:3', '3:4']);
    expect(DEFAULT_ASPECT_RATIO).toBe('1:1');
  });
});
