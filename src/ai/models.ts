import type { NanoBananaModel } from '@/types/prompt';

/** Modelos de generación de imágenes soportados (Nano Banana Series). */
export const NANO_BANANA_PRO: NanoBananaModel = 'gemini-3-pro-image-preview';
export const NANO_BANANA_2: NanoBananaModel = 'gemini-3.1-flash-image-preview';

/** Modelo por defecto para generación de imágenes */
export const DEFAULT_IMAGE_MODEL: NanoBananaModel = NANO_BANANA_PRO;
export const IMAGE_MODEL = DEFAULT_IMAGE_MODEL;

