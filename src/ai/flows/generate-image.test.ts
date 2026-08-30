import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IMAGE_MESSAGES } from '@/lib/image-generation-errors';

vi.mock('@/ai/genkit', () => ({
  ai: {
    generate: vi.fn(),
    defineFlow: (_config: unknown, fn: (input: unknown) => unknown) => fn,
  },
}));

vi.mock('@genkit-ai/google-genai', () => ({
  googleAI: {
    model: vi.fn((name: string, config: unknown) => ({ name, config })),
  },
}));

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { generateImage } from '@/ai/flows/generate-image';

const generateMock = vi.mocked(ai.generate);
const modelMock = vi.mocked(googleAI.model);

describe('generateImage flow', () => {
  beforeEach(() => {
    generateMock.mockReset();
    modelMock.mockClear();
  });

  it('devuelve el data URI y el mimeType cuando el modelo responde con media', async () => {
    generateMock.mockResolvedValue({
      media: { url: 'data:image/png;base64,AAAA', contentType: 'image/png' },
    } as never);

    const result = await generateImage({ prompt: 'a courier on a motorbike', aspectRatio: '16:9' });

    expect(result).toEqual({ imageDataUri: 'data:image/png;base64,AAAA', mimeType: 'image/png' });
  });

  it('usa image/png como mimeType por defecto si el modelo no lo informa', async () => {
    generateMock.mockResolvedValue({ media: { url: 'data:image/png;base64,BBBB' } } as never);

    const result = await generateImage({ prompt: 'a package', aspectRatio: '1:1' });

    expect(result.mimeType).toBe('image/png');
  });

  it('configura el modelo con responseModalities IMAGE y el aspect ratio pedido', async () => {
    generateMock.mockResolvedValue({ media: { url: 'data:image/png;base64,CCCC' } } as never);

    await generateImage({ prompt: 'a package', aspectRatio: '9:16' });

    expect(modelMock).toHaveBeenCalledWith('gemini-2.5-flash-image', {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: '9:16' },
    });
    expect(generateMock).toHaveBeenCalledWith(
      expect.objectContaining({ prompt: 'a package' }),
    );
  });

  it('lanza el mensaje de "no generó imagen" si la respuesta no trae media', async () => {
    generateMock.mockResolvedValue({ media: null } as never);

    await expect(generateImage({ prompt: 'a package', aspectRatio: '1:1' })).rejects.toThrow(IMAGE_MESSAGES.noImage);
  });
});
