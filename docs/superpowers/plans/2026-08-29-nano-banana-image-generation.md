# Generación de imágenes con Nano Banana — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que la app renderice imágenes reales con Nano Banana (`gemini-2.5-flash-image`) a partir de los prompts que ya genera, con preview y descarga PNG, desde los 3 generadores de imagen y desde una página dedicada `/generar-imagen`.

**Architecture:** Un flow Genkit `generateImage` llama al modelo con `responseModalities: ['IMAGE']` y devuelve el data URI. Una Server Action `generateImageAction` valida con Zod, llama al flow y traduce cualquier error a `{ error }` en español (nunca lanza). Un componente cliente `<ImageRenderer>` consume la action y se incrusta en Generales/Servicios/Óptimas y en la página nueva. Sin persistencia.

**Tech Stack:** Next.js 16 (App Router, React 19, React Compiler), Genkit 1.41 + `@genkit-ai/google-genai` 1.41, Zod (v4 en actions, `z` de `genkit` en flows), shadcn/ui existente, Tailwind v4, Vitest 4 (nuevo), pnpm 11.

**Spec:** `docs/superpowers/specs/2026-08-29-nano-banana-image-generation-design.md`

## Global Constraints

- Package manager: **solo `pnpm`** (nunca `npm`/`yarn`).
- Modelo de imagen: **`gemini-2.5-flash-image`**, definido una única vez en `src/ai/models.ts`.
- Aspect ratios soportados: `'16:9' | '1:1' | '9:16' | '4:3' | '3:4'`; fallback `'1:1'`.
- Límite de prompt: 1–4000 caracteres (trim).
- Copy en **español rioplatense (voseo)**: "Probá", "Esperá", "Pegá", "Generá".
- La Server Action **nunca lanza**: siempre devuelve `{ imageDataUri, mimeType } | { error }`.
- Sin persistencia (ni disco, ni DB, ni `localStorage`).
- Archivos con `'use server'` solo exportan funciones `async` y tipos (nunca constantes ni funciones síncronas) — por eso mensajes y `toUserFacingError` viven en `src/lib/`.
- `<ImageRenderer>` **no** se agrega a Hero.
- Definition of Done: `pnpm build` + `pnpm lint` + `pnpm typecheck` + `pnpm test` en verde + verificación manual de una imagen real en `/generales` y en `/generar-imagen`.
- Commits: mensajes en español, cada commit termina con la línea `Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB`.

---

## Mapa de archivos

| Archivo | Responsabilidad |
|---|---|
| `vitest.config.ts` (nuevo) | Config de Vitest: entorno node, alias `@/` → `src/`, `include: src/**/*.test.ts`. |
| `package.json` (mod) | devDependency `vitest`, script `test`. |
| `src/lib/aspect-ratio.ts` (nuevo) | `ASPECT_RATIOS`, tipo `AspectRatio`, `parseAspectRatio()`. Puro. |
| `src/lib/image-generation-errors.ts` (nuevo) | `IMAGE_MESSAGES` (copy en español) y `toUserFacingError()`. Puro. |
| `src/ai/models.ts` (nuevo) | `IMAGE_MODEL = 'gemini-2.5-flash-image'`. |
| `src/ai/flows/generate-image.ts` (nuevo) | Flow Genkit `generateImage`. Lanza si no hay media. |
| `src/ai/dev.ts` (mod) | Registra el flow nuevo para Genkit Dev UI. |
| `src/app/actions/generate-image.ts` (nuevo) | Server Action `generateImageAction`. Valida, llama flow, nunca lanza. |
| `src/components/admin/crea-imagenes/ImageRenderer.tsx` (nuevo) | Cliente: botón generar / preview / descargar / regenerar / error. |
| `src/components/admin/crea-imagenes/ImagePromptGenerator.tsx` (mod) | Incrusta `<ImageRenderer>` (Generales). |
| `src/components/admin/crea-imagenes/ServiceImagePromptGenerator.tsx` (mod) | Incrusta `<ImageRenderer>` (Servicios). |
| `src/components/admin/crea-imagenes/OptimalImagePromptGenerator.tsx` (mod) | Incrusta `<ImageRenderer>` (Óptimas). |
| `src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx` (nuevo) | Cliente: textarea + select de aspect ratio + `<ImageRenderer>`. |
| `src/app/generar-imagen/page.tsx` (nuevo) | Página `/generar-imagen`, lee `?prompt=`. |
| `src/lib/navigation.ts` (mod) | Alta de la herramienta en `toolsNavItems`. |

Contexto útil sobre el repo para quien no lo conoce:
- Los flows existentes (`src/ai/flows/*.ts`) empiezan con `'use server'`, importan `ai` de `@/ai/genkit` y `z` de `genkit`, y exportan **solo una función async** que envuelve un `ai.defineFlow`.
- Las actions existentes (`src/app/*/actions.ts`) empiezan con `'use server'`, validan con `zod` (v4) y devuelven objetos `{ ...; error?: string }`, nunca lanzan.
- Los generadores son componentes cliente con `react-hook-form`; la variable del form se llama `form` y el resultado de la action vive en `state.prompt`.
- Toasts: `const { toast } = useToast()` desde `@/hooks/use-toast`; el `<Toaster />` ya está montado en `src/app/layout.tsx`.
- `.env` ya tiene `GEMINI_API_KEY`.

---

### Task 1: Vitest + `parseAspectRatio`

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts + devDependencies)
- Create: `src/lib/aspect-ratio.ts`
- Test: `src/lib/aspect-ratio.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  ```ts
  export const ASPECT_RATIOS: readonly ['16:9', '1:1', '9:16', '4:3', '3:4'];
  export type AspectRatio = '16:9' | '1:1' | '9:16' | '4:3' | '3:4';
  export const DEFAULT_ASPECT_RATIO: AspectRatio; // '1:1'
  export function parseAspectRatio(raw?: string | null): AspectRatio;
  ```

- [ ] **Step 1: Instalar Vitest y agregar el script**

Run: `pnpm add -D vitest`
Luego en `package.json`, dentro de `"scripts"`, agregar después de `"typecheck"`:

```json
    "test": "vitest run",
```

- [ ] **Step 2: Crear `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

- [ ] **Step 3: Escribir el test que falla**

`src/lib/aspect-ratio.test.ts`:

```ts
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
```

- [ ] **Step 4: Correr el test y verificar que falla**

Run: `pnpm test`
Expected: FAIL — `Failed to resolve import "@/lib/aspect-ratio"` (o similar: el módulo no existe).

- [ ] **Step 5: Implementar `src/lib/aspect-ratio.ts`**

```ts
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
```

- [ ] **Step 6: Correr el test y verificar que pasa**

Run: `pnpm test`
Expected: PASS — 4 tests en `src/lib/aspect-ratio.test.ts`.

- [ ] **Step 7: Typecheck y commit**

Run: `pnpm typecheck`
Expected: sin errores.

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/lib/aspect-ratio.ts src/lib/aspect-ratio.test.ts
git commit -m "feat: agregar Vitest y helper parseAspectRatio

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 2: Mensajes y `toUserFacingError`

**Files:**
- Create: `src/lib/image-generation-errors.ts`
- Test: `src/lib/image-generation-errors.test.ts`

**Interfaces:**
- Consumes: nada.
- Produces:
  ```ts
  export const IMAGE_MESSAGES: {
    promptRequired: string;
    promptTooLong: string;
    apiKey: string;
    noImage: string;
    quota: string;
    genericPrefix: string;
  };
  export function toUserFacingError(e: unknown): string;
  ```

- [ ] **Step 1: Escribir el test que falla**

`src/lib/image-generation-errors.test.ts`:

```ts
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
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `pnpm test`
Expected: FAIL — no se resuelve `@/lib/image-generation-errors`.

- [ ] **Step 3: Implementar `src/lib/image-generation-errors.ts`**

```ts
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
  if (raw === IMAGE_MESSAGES.noImage) return raw;
  if (/\b429\b|RESOURCE_EXHAUSTED|quota/i.test(raw)) return IMAGE_MESSAGES.quota;
  if (/API[_ ]key|GEMINI_API_KEY|\b401\b|\b403\b|PERMISSION_DENIED/i.test(raw)) return IMAGE_MESSAGES.apiKey;
  return `${IMAGE_MESSAGES.genericPrefix}${raw || 'Error desconocido.'}`;
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `pnpm test`
Expected: PASS — todos los tests de `aspect-ratio` e `image-generation-errors`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/image-generation-errors.ts src/lib/image-generation-errors.test.ts
git commit -m "feat: mensajes y clasificador de errores de generación de imagen

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 3: Flow Genkit `generateImage`

**Files:**
- Create: `src/ai/models.ts`
- Create: `src/ai/flows/generate-image.ts`
- Modify: `src/ai/dev.ts` (agregar un import al final)
- Test: `src/ai/flows/generate-image.test.ts`

**Interfaces:**
- Consumes: `ASPECT_RATIOS`, `AspectRatio` de `@/lib/aspect-ratio`; `IMAGE_MESSAGES.noImage` de `@/lib/image-generation-errors`.
- Produces:
  ```ts
  // src/ai/models.ts
  export const IMAGE_MODEL = 'gemini-2.5-flash-image' as const;

  // src/ai/flows/generate-image.ts ('use server')
  export type GenerateImageInput = { prompt: string; aspectRatio: AspectRatio };
  export type GenerateImageOutput = { imageDataUri: string; mimeType: string };
  export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput>;
  ```

Notas para el implementador:
- `ai.generate(...)` devuelve un objeto con getter `media: { url: string; contentType?: string } | null`. Con `responseModalities: ['IMAGE']` el modelo devuelve la imagen como data URI en `media.url`.
- `googleAI.model(name, config)` para modelos de imagen **exige** el segundo argumento `config`; ahí van `responseModalities` e `imageConfig.aspectRatio` (el plugin acepta `'1:1' | '3:4' | '4:3' | '9:16' | '16:9'` entre otros).
- El test mockea `@/ai/genkit` (para no inicializar Genkit ni leer la API key) y `@genkit-ai/google-genai`.

- [ ] **Step 1: Crear `src/ai/models.ts`**

```ts
/** Único lugar donde se nombra el modelo de generación de imágenes. */
export const IMAGE_MODEL = 'gemini-2.5-flash-image' as const;
```

- [ ] **Step 2: Escribir el test que falla**

`src/ai/flows/generate-image.test.ts`:

```ts
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
```

- [ ] **Step 3: Correr el test y verificar que falla**

Run: `pnpm test src/ai/flows/generate-image.test.ts`
Expected: FAIL — no se resuelve `@/ai/flows/generate-image`.

- [ ] **Step 4: Implementar `src/ai/flows/generate-image.ts`**

```ts
'use server';
/**
 * @fileOverview Flow que renderiza un prompt a imagen real con Nano Banana
 * (gemini-2.5-flash-image) y devuelve la imagen como data URI.
 *
 * - generateImage - Genera una imagen a partir de un prompt y un aspect ratio.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import { IMAGE_MODEL } from '@/ai/models';
import { ASPECT_RATIOS, type AspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES } from '@/lib/image-generation-errors';

const GenerateImageInputSchema = z.object({
  prompt: z.string().min(1).max(4000).describe('Prompt en inglés para el modelo de imagen.'),
  aspectRatio: z.enum(ASPECT_RATIOS).describe('Relación de aspecto de la imagen.'),
});
export type GenerateImageInput = { prompt: string; aspectRatio: AspectRatio };

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('Imagen generada como data URI (data:image/png;base64,...).'),
  mimeType: z.string().describe('MIME type de la imagen generada.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: googleAI.model(IMAGE_MODEL, {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: input.aspectRatio },
      }),
      prompt: input.prompt,
    });

    const media = response.media;
    if (!media?.url) {
      throw new Error(IMAGE_MESSAGES.noImage);
    }

    return {
      imageDataUri: media.url,
      mimeType: media.contentType ?? 'image/png',
    };
  }
);
```

- [ ] **Step 5: Registrar el flow en `src/ai/dev.ts`**

Agregar al final del archivo:

```ts
import '@/ai/flows/generate-image.ts';
```

- [ ] **Step 6: Correr el test y verificar que pasa**

Run: `pnpm test src/ai/flows/generate-image.test.ts`
Expected: PASS — 4 tests.

- [ ] **Step 7: Typecheck y commit**

Run: `pnpm typecheck`
Expected: sin errores. Si TypeScript rechaza `z.enum(ASPECT_RATIOS)` por el tipo readonly, reemplazar por `z.enum(['16:9', '1:1', '9:16', '4:3', '3:4'])` y agregar el comentario `// mantener sincronizado con ASPECT_RATIOS`.

```bash
git add src/ai/models.ts src/ai/flows/generate-image.ts src/ai/flows/generate-image.test.ts src/ai/dev.ts
git commit -m "feat: flow Genkit generateImage con Nano Banana

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 4: Server Action `generateImageAction`

**Files:**
- Create: `src/app/actions/generate-image.ts`
- Test: `src/app/actions/generate-image.test.ts`

**Interfaces:**
- Consumes: `generateImage` (Task 3), `parseAspectRatio` (Task 1), `IMAGE_MESSAGES` + `toUserFacingError` (Task 2).
- Produces:
  ```ts
  // 'use server'
  export type GenerateImageResult =
    | { imageDataUri: string; mimeType: string }
    | { error: string };
  export async function generateImageAction(input: { prompt: string; aspectRatio?: string }): Promise<GenerateImageResult>;
  ```

- [ ] **Step 1: Escribir el test que falla**

`src/app/actions/generate-image.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `pnpm test src/app/actions/generate-image.test.ts`
Expected: FAIL — no se resuelve `@/app/actions/generate-image`.

- [ ] **Step 3: Implementar `src/app/actions/generate-image.ts`**

```ts
// src/app/actions/generate-image.ts
'use server';

import { z } from 'zod';
import { generateImage } from '@/ai/flows/generate-image';
import { parseAspectRatio } from '@/lib/aspect-ratio';
import { IMAGE_MESSAGES, toUserFacingError } from '@/lib/image-generation-errors';

export type GenerateImageResult =
  | { imageDataUri: string; mimeType: string }
  | { error: string };

const generateImageInputSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, IMAGE_MESSAGES.promptRequired)
    .max(4000, IMAGE_MESSAGES.promptTooLong),
  aspectRatio: z.string().optional(),
});

/**
 * Única puerta de entrada desde el cliente para generar una imagen.
 * Nunca lanza: todo error se devuelve como `{ error }` en español.
 */
export async function generateImageAction(input: {
  prompt: string;
  aspectRatio?: string;
}): Promise<GenerateImageResult> {
  const validated = generateImageInputSchema.safeParse(input);
  if (!validated.success) {
    return { error: validated.error.issues[0]?.message ?? IMAGE_MESSAGES.promptRequired };
  }

  try {
    const result = await generateImage({
      prompt: validated.data.prompt,
      aspectRatio: parseAspectRatio(validated.data.aspectRatio),
    });
    return { imageDataUri: result.imageDataUri, mimeType: result.mimeType };
  } catch (e: unknown) {
    console.error('Error generating image:', e);
    return { error: toUserFacingError(e) };
  }
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `pnpm test`
Expected: PASS — todos los tests (aspect-ratio, image-generation-errors, generate-image flow, generate-image action).

- [ ] **Step 5: Typecheck, lint y commit**

Run: `pnpm typecheck` y `pnpm lint`
Expected: sin errores.

```bash
git add src/app/actions/generate-image.ts src/app/actions/generate-image.test.ts
git commit -m "feat: server action generateImageAction

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 5: Componente `<ImageRenderer>` + integración en los 3 generadores

**Files:**
- Create: `src/components/admin/crea-imagenes/ImageRenderer.tsx`
- Modify: `src/components/admin/crea-imagenes/ImagePromptGenerator.tsx` (bloque `{state.prompt && (...)}` cerca de la línea 436–467, antes de `</CardFooter>`)
- Modify: `src/components/admin/crea-imagenes/ServiceImagePromptGenerator.tsx` (bloque análogo cerca de la línea 285–316)
- Modify: `src/components/admin/crea-imagenes/OptimalImagePromptGenerator.tsx` (bloque análogo cerca de la línea 282–313)

**Interfaces:**
- Consumes: `generateImageAction` (Task 4), `parseAspectRatio`, `AspectRatio` (Task 1).
- Produces:
  ```tsx
  export function ImageRenderer(props: {
    prompt: string;
    aspectRatio?: string;        // label crudo del form; se normaliza adentro
    suggestedFileName?: string;  // se slugifica para el nombre del PNG
  }): JSX.Element;
  ```

No hay test unitario para este componente (no hay entorno DOM configurado y la lógica no trivial ya está testeada en Tasks 1–4). Se verifica con `pnpm lint` + `pnpm typecheck` + la verificación manual de Task 7.

Notas para el implementador:
- Se usa `next/image` con `fill` + `unoptimized` (los data URIs no pasan por el optimizador y así no dispara la regla `@next/next/no-img-element`).
- El padre pasa `key={state.prompt}`; al cambiar el prompt el componente se remonta y descarta la imagen anterior. Por eso **no** hay `useEffect` de reset.
- El nombre de archivo se fija en el momento de generar (no en el render) para que no cambie entre renders.

- [ ] **Step 1: Crear `src/components/admin/crea-imagenes/ImageRenderer.tsx`**

```tsx
// src/components/admin/crea-imagenes/ImageRenderer.tsx
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { generateImageAction } from '@/app/actions/generate-image';
import { parseAspectRatio, type AspectRatio } from '@/lib/aspect-ratio';
import { AlertCircle, Download, Loader2, RefreshCw, Wand2 } from 'lucide-react';

const ASPECT_CLASS: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
};

function slugify(value: string): string {
  const slug = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || 'imagen';
}

interface GeneratedImage {
  dataUri: string;
  mimeType: string;
  fileName: string;
}

interface ImageRendererProps {
  prompt: string;
  aspectRatio?: string;
  suggestedFileName?: string;
}

export function ImageRenderer({ prompt, aspectRatio, suggestedFileName }: ImageRendererProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ratio = parseAspectRatio(aspectRatio);
  const canGenerate = prompt.trim().length > 0 && !isPending;

  const handleGenerate = () => {
    setError(null);
    startTransition(async () => {
      const result = await generateImageAction({ prompt, aspectRatio: ratio });
      if ('error' in result) {
        setError(result.error);
        toast({ title: 'No se pudo generar la imagen', description: result.error, variant: 'destructive' });
        return;
      }
      setImage({
        dataUri: result.imageDataUri,
        mimeType: result.mimeType,
        fileName: `envios-dosruedas-${slugify(suggestedFileName ?? 'imagen')}-${Date.now()}.png`,
      });
    });
  };

  return (
    <div className="w-full mt-4 space-y-3">
      {!image && (
        <Button type="button" onClick={handleGenerate} disabled={!canGenerate} className="w-full gap-2">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generando imagen… (10–20 s)</span>
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              <span>Generar imagen con Nano Banana</span>
            </>
          )}
        </Button>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No se pudo generar la imagen</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {image && (
        <div className="rounded-xl border border-primary/20 overflow-hidden bg-muted shadow-xl">
          <div className={`relative w-full ${ASPECT_CLASS[ratio]}`}>
            <Image
              src={image.dataUri}
              alt="Imagen generada con Nano Banana"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-3 border-t border-border bg-background">
            <Button asChild className="gap-2">
              <a href={image.dataUri} download={image.fileName}>
                <Download className="h-4 w-4" />
                <span>Descargar PNG</span>
              </a>
            </Button>
            <Button type="button" variant="outline" onClick={handleGenerate} disabled={isPending} className="gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span>Regenerar</span>
            </Button>
            <span className="text-xs text-muted-foreground ml-auto">{ratio} · {image.mimeType}</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Lint y typecheck del componente**

Run: `pnpm lint` y `pnpm typecheck`
Expected: sin errores ni warnings nuevos.

- [ ] **Step 3: Integrar en `ImagePromptGenerator.tsx` (Generales)**

Agregar el import junto a los otros imports de componentes (después de la línea `import { Button } from '@/components/ui/button';`):

```tsx
import { ImageRenderer } from './ImageRenderer';
```

Localizar el bloque que empieza con `{state.prompt && (` dentro de `<CardFooter>` (≈ línea 436) y termina con `)}` justo antes de `</CardFooter>` (≈ línea 467). Inmediatamente **después** de ese `)}` y **antes** de `</CardFooter>`, insertar:

```tsx
            {state.prompt && (
              <ImageRenderer
                key={state.prompt}
                prompt={state.prompt}
                aspectRatio={form.watch('aspectRatio')}
                suggestedFileName={form.watch('service')}
              />
            )}
```

- [ ] **Step 4: Integrar en `ServiceImagePromptGenerator.tsx` (Servicios)**

Agregar el import junto a los otros imports de componentes (después de `import { Button } from '@/components/ui/button';`):

```tsx
import { ImageRenderer } from './ImageRenderer';
```

Localizar el bloque `{state.prompt && (` … `)}` dentro de `<CardFooter>` (≈ líneas 285–316). Inmediatamente después del `)}` de cierre y antes de `</CardFooter>`, insertar (este form no tiene `aspectRatio`; el `sectionType` incluye el ratio entre paréntesis, ej. `'Banner Web (16:9)'`, y `parseAspectRatio` lo extrae):

```tsx
            {state.prompt && (
              <ImageRenderer
                key={state.prompt}
                prompt={state.prompt}
                aspectRatio={form.watch('sectionType')}
                suggestedFileName={form.watch('serviceName')}
              />
            )}
```

- [ ] **Step 5: Integrar en `OptimalImagePromptGenerator.tsx` (Óptimas)**

Agregar el import junto a los otros imports de componentes (después de `import { Button } from '@/components/ui/button';`):

```tsx
import { ImageRenderer } from './ImageRenderer';
```

Localizar el bloque `{state.prompt && (` … `)}` dentro de `<CardFooter>` (≈ líneas 282–313). Inmediatamente después del `)}` de cierre y antes de `</CardFooter>`, insertar (mismo criterio que Servicios: `sectionType` trae el ratio):

```tsx
            {state.prompt && (
              <ImageRenderer
                key={state.prompt}
                prompt={state.prompt}
                aspectRatio={form.watch('sectionType')}
                suggestedFileName={form.watch('serviceName')}
              />
            )}
```

- [ ] **Step 6: Lint, typecheck y build**

Run: `pnpm lint`, `pnpm typecheck`, `powershell -ExecutionPolicy Bypass -Command "pnpm build"`
Expected: los tres sin errores.

- [ ] **Step 7: Verificación en el navegador (sin gastar créditos)**

Run: `pnpm dev` y abrir `http://localhost:3000/generales`.
- Completar el form y generar un prompt.
- Confirmar que debajo del bloque "Prompt Listo para Usar" aparece el botón "Generar imagen con Nano Banana" habilitado.
- **No** hacer click todavía (la verificación con imagen real es Task 7).
- Repetir en `/servicios` y `/optimas`.

- [ ] **Step 8: Commit**

```bash
git add src/components/admin/crea-imagenes/ImageRenderer.tsx src/components/admin/crea-imagenes/ImagePromptGenerator.tsx src/components/admin/crea-imagenes/ServiceImagePromptGenerator.tsx src/components/admin/crea-imagenes/OptimalImagePromptGenerator.tsx
git commit -m "feat: componente ImageRenderer integrado en los generadores de imagen

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 6: Página `/generar-imagen` + navegación

**Files:**
- Create: `src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx`
- Create: `src/app/generar-imagen/page.tsx`
- Modify: `src/lib/navigation.ts` (array `toolsNavItems`)

**Interfaces:**
- Consumes: `ImageRenderer` (Task 5), `ASPECT_RATIOS`, `AspectRatio`, `DEFAULT_ASPECT_RATIO` (Task 1).
- Produces:
  ```tsx
  export function StandaloneImageGenerator(props: { initialPrompt?: string }): JSX.Element;
  ```
  y la ruta `/generar-imagen?prompt=<texto>`.

Notas para el implementador:
- En Next.js 16, `searchParams` de una página es una **Promise**: la página debe ser `async` y hacer `await searchParams`.
- El layout de la página copia el de `src/app/generales/page.tsx` (AdminHeader + main container + Footer) para mantener consistencia visual.

- [ ] **Step 1: Crear `StandaloneImageGenerator.tsx`**

```tsx
// src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageRenderer } from './ImageRenderer';
import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO, type AspectRatio } from '@/lib/aspect-ratio';

const ASPECT_LABELS: Record<AspectRatio, string> = {
  '16:9': '16:9 (Panorámica)',
  '1:1': '1:1 (Cuadrada)',
  '9:16': '9:16 (Vertical)',
  '4:3': '4:3 (Clásica)',
  '3:4': '3:4 (Retrato)',
};

interface StandaloneImageGeneratorProps {
  initialPrompt?: string;
}

export function StandaloneImageGenerator({ initialPrompt = '' }: StandaloneImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(DEFAULT_ASPECT_RATIO);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generar imagen con Nano Banana</CardTitle>
        <CardDescription>
          Pegá cualquier prompt en inglés, elegí la relación de aspecto y generá la imagen. No se guarda nada: descargá el PNG cuando te guste el resultado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="standalone-prompt">Prompt</Label>
          <Textarea
            id="standalone-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={8}
            maxLength={4000}
            placeholder="Cinematic photo of a friendly courier on a blue and yellow motorbike riding along the Mar del Plata seaside..."
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground text-right">{prompt.length}/4000</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="standalone-aspect-ratio">Relación de aspecto</Label>
          <Select value={aspectRatio} onValueChange={(value) => setAspectRatio(value as AspectRatio)}>
            <SelectTrigger id="standalone-aspect-ratio" className="w-full sm:w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ASPECT_RATIOS.map((ratio) => (
                <SelectItem key={ratio} value={ratio}>
                  {ASPECT_LABELS[ratio]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ImageRenderer key={prompt} prompt={prompt} aspectRatio={aspectRatio} suggestedFileName="prompt-libre" />
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Crear `src/app/generar-imagen/page.tsx`**

```tsx
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { StandaloneImageGenerator } from "@/components/admin/crea-imagenes/StandaloneImageGenerator";
import { ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generar Imagen con Nano Banana | Estudio IA",
  description: "Renderizá cualquier prompt a imagen real con Nano Banana y descargala en PNG.",
};

interface GenerarImagenPageProps {
  searchParams: Promise<{ prompt?: string | string[] }>;
}

export default async function GenerarImagenPage({ searchParams }: GenerarImagenPageProps) {
  const params = await searchParams;
  const initialPrompt = Array.isArray(params.prompt) ? (params.prompt[0] ?? '') : (params.prompt ?? '');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Generar Imagen
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Convertí un prompt en una imagen real con Nano Banana (Gemini 2.5 Flash Image).
              </p>
            </div>
          </div>
        </div>

        <StandaloneImageGenerator initialPrompt={initialPrompt} />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Dar de alta la herramienta en `src/lib/navigation.ts`**

En el array `toolsNavItems`, insertar el siguiente objeto **después** del item con `href: "/optimas"` y **antes** del item con `href: "/hero"`:

```ts
  {
    href: "/generar-imagen",
    label: "Generar Imagen",
    icon: ImageIcon,
    description: "Renderizá cualquier prompt a imagen real con Nano Banana y descargala en PNG.",
    badge: "Nano Banana",
  },
```

(`ImageIcon` ya está importado de `lucide-react` al inicio del archivo.)

- [ ] **Step 4: Lint, typecheck y build**

Run: `pnpm lint`, `pnpm typecheck`, `powershell -ExecutionPolicy Bypass -Command "pnpm build"`
Expected: los tres sin errores; el build lista la ruta `/generar-imagen`.

- [ ] **Step 5: Verificación en el navegador (sin gastar créditos)**

Run: `pnpm dev`.
- Abrir `http://localhost:3000/` y confirmar que aparece la card "Generar Imagen" con badge "Nano Banana".
- Abrir `http://localhost:3000/generar-imagen?prompt=hello%20world` y confirmar que el textarea muestra `hello world`, el select muestra `1:1 (Cuadrada)` y el botón "Generar imagen con Nano Banana" está habilitado.
- Borrar el textarea y confirmar que el botón se deshabilita.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx src/app/generar-imagen/page.tsx src/lib/navigation.ts
git commit -m "feat: página /generar-imagen con Nano Banana

Claude-Session: https://claude.ai/code/session_016SAkzT9iaqsd4iFhje3BtB"
```

---

### Task 7: Verificación final (Definition of Done)

**Files:** ninguno nuevo. Solo si algo falla se corrige en el archivo correspondiente.

- [ ] **Step 1: Suite completa de verificación**

Run, en este orden:
```bash
pnpm lint
pnpm typecheck
pnpm test
powershell -ExecutionPolicy Bypass -Command "pnpm build"
```
Expected: los cuatro en verde. Pegar el resumen de cada uno en el reporte.

- [ ] **Step 2: Generar una imagen real desde `/generales`** (usa la `GEMINI_API_KEY` de `.env`; consume una llamada al modelo)

Run: `pnpm dev`, abrir `http://localhost:3000/generales`.
- Generar un prompt con `aspectRatio = '16:9 (Panorámica)'`.
- Click en "Generar imagen con Nano Banana". Debe mostrar el spinner "Generando imagen… (10–20 s)" y luego la preview en un contenedor 16:9.
- Click en "Descargar PNG": se descarga `envios-dosruedas-<servicio>-<timestamp>.png` y abre correctamente en el visor de imágenes.
- Confirmar visualmente que la imagen es apaisada (16:9), es decir que `imageConfig.aspectRatio` fue respetado.
- Click en "Regenerar": vuelve a generar y reemplaza la preview.

- [ ] **Step 3: Generar una imagen real desde `/generar-imagen`**

- Abrir `http://localhost:3000/generar-imagen?prompt=Cinematic%20photo%20of%20a%20yellow%20delivery%20motorbike%20in%20Mar%20del%20Plata`.
- Elegir `9:16 (Vertical)` y generar. Confirmar preview vertical y descarga.

- [ ] **Step 4: Verificar el camino de error sin API key**

- Detener `pnpm dev`. Renombrar temporalmente la variable en `.env` a `GEMINI_API_KEY_OFF=...`.
- `pnpm dev`, ir a `/generar-imagen`, escribir cualquier prompt y generar.
- Expected: alerta roja inline + toast con "Falta configurar la API key de Gemini (GEMINI_API_KEY)." y la página sigue usable.
- Restaurar `.env` a `GEMINI_API_KEY=...` y detener el dev server.

- [ ] **Step 5: Confirmar working tree limpio y reportar**

Run: `git status --short`
Expected: vacío (si `AGENTS.md` aparece modificado por `next dev`, commitearlo con el mensaje `chore: refresh AGENTS.md generado por next dev`).

Reportar: comandos corridos con su resultado, rutas verificadas, y cualquier desvío respecto del spec.
