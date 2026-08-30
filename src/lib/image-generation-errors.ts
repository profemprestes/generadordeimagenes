export const IMAGE_MESSAGES = {
  promptRequired: 'El prompt es requerido.',
  promptTooLong: 'El prompt es demasiado largo (máx. 4000 caracteres).',
  apiKey: 'Falta configurar la API key de Gemini (GEMINI_API_KEY).',
  noImage: 'Nano Banana no generó imagen para este prompt. Probá ajustar el texto.',
  quota: 'Límite de uso alcanzado. Esperá un momento y reintentá.',
  genericPrefix: 'Hubo un error al generar la imagen: ',
} as const;

/**
 * Traduce cualquier error del SDK / flow a un mensaje en español apto para
 * mostrar en la UI. Nunca lanza.
 */
export function toUserFacingError(e: unknown): string {
  const raw = e instanceof Error ? e.message : e === undefined || e === null ? '' : String(e);
  if (raw.includes(IMAGE_MESSAGES.noImage)) return IMAGE_MESSAGES.noImage;
  if (/\b429\b|RESOURCE_EXHAUSTED|quota/i.test(raw)) return IMAGE_MESSAGES.quota;
  if (/API[_ ]key|GEMINI_API_KEY|\b401\b|\b403\b|PERMISSION_DENIED/i.test(raw)) return IMAGE_MESSAGES.apiKey;
  return `${IMAGE_MESSAGES.genericPrefix}${raw || 'Error desconocido.'}`;
}
