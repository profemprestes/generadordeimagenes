import { describe, expect, it } from 'vitest';
import { IMAGE_MESSAGES, toUserFacingError } from '@/lib/image-generation-errors';

describe('toUserFacingError', () => {
  it('deja pasar tal cual el mensaje de "no generó imagen"', () => {
    expect(toUserFacingError(new Error(IMAGE_MESSAGES.noImage))).toBe(IMAGE_MESSAGES.noImage);
  });

  it('detecta cuota / rate limit', () => {
    expect(toUserFacingError(new Error('429 Too Many Requests'))).toBe(IMAGE_MESSAGES.quota);
    expect(toUserFacingError(new Error('RESOURCE_EXHAUSTED: quota exceeded'))).toBe(IMAGE_MESSAGES.quota);
  });

  it('detecta API key ausente o inválida', () => {
    expect(toUserFacingError(new Error('API key not valid. Please pass a valid API key.'))).toBe(IMAGE_MESSAGES.apiKey);
    expect(toUserFacingError(new Error('Please pass in the API key or set the GEMINI_API_KEY environment variable'))).toBe(IMAGE_MESSAGES.apiKey);
    expect(toUserFacingError(new Error('403 PERMISSION_DENIED'))).toBe(IMAGE_MESSAGES.apiKey);
  });

  it('envuelve cualquier otro error con el prefijo genérico', () => {
    expect(toUserFacingError(new Error('fetch failed'))).toBe(`${IMAGE_MESSAGES.genericPrefix}fetch failed`);
  });

  it('maneja valores que no son Error', () => {
    expect(toUserFacingError('algo raro')).toBe(`${IMAGE_MESSAGES.genericPrefix}algo raro`);
    expect(toUserFacingError(undefined)).toBe(`${IMAGE_MESSAGES.genericPrefix}Error desconocido.`);
  });
});
