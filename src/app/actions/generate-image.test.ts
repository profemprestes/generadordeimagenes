import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IMAGE_MESSAGES } from '@/lib/image-generation-errors';

vi.mock('@/ai/flows/generate-image', () => ({
  generateImage: vi.fn(),
}));

import { generateImage } from '@/ai/flows/generate-image';
import { generateImageAction } from '@/app/actions/generate-image';

const generateImageMock = vi.mocked(generateImage);

describe('generateImageAction', () => {
  beforeEach(() => {
    generateImageMock.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rechaza un prompt vacío sin llamar al flow', async () => {
    const result = await generateImageAction({ prompt: '   ', aspectRatio: '16:9' });

    expect(result).toEqual({ error: IMAGE_MESSAGES.promptRequired });
    expect(generateImageMock).not.toHaveBeenCalled();
  });

  it('rechaza un prompt de más de 4000 caracteres sin llamar al flow', async () => {
    const result = await generateImageAction({ prompt: 'x'.repeat(4001), aspectRatio: '1:1' });

    expect(result).toEqual({ error: IMAGE_MESSAGES.promptTooLong });
    expect(generateImageMock).not.toHaveBeenCalled();
  });

  it('normaliza el aspect ratio y devuelve la imagen del flow', async () => {
    generateImageMock.mockResolvedValue({ imageDataUri: 'data:image/png;base64,AAAA', mimeType: 'image/png' });

    const result = await generateImageAction({ prompt: '  a courier  ', aspectRatio: '16:9 (Panorámica)' });

    expect(generateImageMock).toHaveBeenCalledWith({ prompt: 'a courier', aspectRatio: '16:9' });
    expect(result).toEqual({ imageDataUri: 'data:image/png;base64,AAAA', mimeType: 'image/png' });
  });

  it('usa 1:1 si no se pasa aspect ratio', async () => {
    generateImageMock.mockResolvedValue({ imageDataUri: 'data:image/png;base64,BBBB', mimeType: 'image/png' });

    await generateImageAction({ prompt: 'a package' });

    expect(generateImageMock).toHaveBeenCalledWith({ prompt: 'a package', aspectRatio: '1:1' });
  });

  it('traduce un error de cuota del flow a mensaje de usuario', async () => {
    generateImageMock.mockRejectedValue(new Error('429 RESOURCE_EXHAUSTED'));

    const result = await generateImageAction({ prompt: 'a package', aspectRatio: '1:1' });

    expect(result).toEqual({ error: IMAGE_MESSAGES.quota });
  });

  it('traduce un error genérico del flow sin lanzar', async () => {
    generateImageMock.mockRejectedValue(new Error('fetch failed'));

    const result = await generateImageAction({ prompt: 'a package', aspectRatio: '1:1' });

    expect(result).toEqual({ error: `${IMAGE_MESSAGES.genericPrefix}fetch failed` });
  });
});
