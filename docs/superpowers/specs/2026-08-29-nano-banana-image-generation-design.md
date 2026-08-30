# Generación de imágenes con Nano Banana — Diseño

**Fecha:** 2026-08-29
**Proyecto:** `generadordeimagenes` (Next.js 16 + Genkit + `@genkit-ai/google-genai`)
**Estado:** Aprobado en brainstorming; pendiente de plan de implementación.

## 1. Problema y objetivo

La app hoy genera **prompts de texto** para modelos de imagen (Gemini 2.5 Flash vía Genkit) pero no renderiza ninguna imagen: el usuario copia el prompt y lo pega en otra herramienta. El objetivo es que la app **genere la imagen real** con Nano Banana (`gemini-2.5-flash-image`) a partir del prompt, la muestre en pantalla y permita descargarla como PNG.

Este documento cubre solo el **sub-proyecto 1** (generación en la app). El sub-proyecto 2 (configurar skills de Nano Banana para Claude Code en `.claude/`) se diseña e implementa por separado después.

## 2. Alcance

### Incluido
- Un flow Genkit `generateImage` que llama a `gemini-2.5-flash-image`.
- Una Server Action `generateImageAction` como única puerta de entrada desde el cliente.
- Un componente cliente compartido `<ImageRenderer>` con botón "Generar imagen", preview, descarga y regenerar.
- `<ImageRenderer>` incrustado en los 3 generadores de prompts de imagen: **Generales**, **Servicios** y **Óptimas**.
- Una página dedicada `/generar-imagen` para generar desde un prompt suelto.
- Helper puro `parseAspectRatio`.
- Vitest como test runner + tests unitarios de la lógica sin IA.

### Excluido (decisiones explícitas)
- **Un solo modelo**: `gemini-2.5-flash-image`. Sin selector de modelo en la UI. El ID vive en una constante única para poder cambiarlo después.
- **Sin persistencia**: no se guarda nada en disco, DB ni `localStorage`. Solo preview + descarga.
- **Sin variantes múltiples** por click (una imagen por generación).
- **Hero** no recibe `<ImageRenderer>`: su prompt es de refactor de código, no de imagen.
- No se unifica la duplicación existente entre `/x` y `/admin/crea-imagenes/x`; los cambios a los generadores son mínimos y se aplican a los componentes compartidos en `src/components/admin/crea-imagenes/`, que ya usan ambas rutas.

## 3. Arquitectura

```
[Generador (cliente)] ── state.prompt ──▶ <ImageRenderer prompt aspectRatio>
                                                  │ generateImageAction(input)
                                                  ▼
                              src/app/actions/generate-image.ts  ('use server')
                                                  │ valida Zod → llama flow
                                                  ▼
                              src/ai/flows/generate-image.ts (Genkit flow)
                                                  │ ai.generate(model: IMAGE_MODEL, responseModalities: ['IMAGE'])
                                                  ▼
                              Google AI: gemini-2.5-flash-image  ──▶ response.media.url (data URI)
```

Enfoque elegido (A): Server Action que devuelve el data URI. Alternativas descartadas: route handler binario (rompe el patrón de actions del proyecto; queda como vía de escape si el tamaño de respuesta fuera un problema) y generación de N variantes (costo/latencia ×N; se puede agregar después sin cambiar la arquitectura).

## 4. Componentes

### 4.1 `src/ai/models.ts`
```ts
export const IMAGE_MODEL = 'gemini-2.5-flash-image';
```
Único lugar donde se nombra el modelo de imagen.

### 4.2 `src/ai/flows/generate-image.ts`
- Registrar en `src/ai/dev.ts`.
- Input schema (Zod de `genkit`):
  - `prompt: string` (1–4000 chars)
  - `aspectRatio: '16:9' | '1:1' | '9:16' | '4:3' | '3:4'`
- Output schema: `{ imageDataUri: string; mimeType: string }`.
- Implementación:
  ```ts
  const response = await ai.generate({
    model: googleAI.model(IMAGE_MODEL),
    prompt: input.prompt,
    config: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: input.aspectRatio } },
  });
  const media = response.media;
  if (!media?.url) throw new Error('Nano Banana no generó imagen para este prompt. Probá ajustar el texto.');
  return { imageDataUri: media.url, mimeType: media.contentType ?? 'image/png' };
  ```
- Si `imageConfig.aspectRatio` no es aceptado por la versión del plugin/modelo, el fallback es anteponer al prompt una instrucción de composición (`"Aspect ratio 16:9."`). Esto se verifica en el primer test manual y se documenta en el plan.

### 4.3 `src/lib/aspect-ratio.ts`
```ts
export const ASPECT_RATIOS = ['16:9', '1:1', '9:16', '4:3', '3:4'] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];
export function parseAspectRatio(raw?: string | null): AspectRatio; // '16:9 (Panorámica)' → '16:9'; inválido/undefined → '1:1'
```
Extrae con regex `\d+:\d+` y valida contra `ASPECT_RATIOS`.

### 4.4 `src/app/actions/generate-image.ts` (`'use server'`)
```ts
export type GenerateImageResult = { imageDataUri: string; mimeType: string } | { error: string };
export async function generateImageAction(input: { prompt: string; aspectRatio: string }): Promise<GenerateImageResult>;
```
- Valida con Zod: `prompt` trim, 1–4000 chars; `aspectRatio` pasa por `parseAspectRatio`.
- Llama a `generateImage(...)`.
- **Nunca lanza**: todo error se traduce a `{ error }` con mensaje en español (ver §6). Loguea con `console.error` en servidor.

### 4.5 `src/components/admin/crea-imagenes/ImageRenderer.tsx` (`'use client'`)
- Props: `{ prompt: string; aspectRatio?: string; suggestedFileName?: string }`.
- Estado: `status: 'idle' | 'generating' | 'done' | 'error'`, `image?: { dataUri; mimeType }`, `error?: string`. `useTransition` para el pending.
- UI:
  - Botón primario "Generar imagen con Nano Banana" (ícono `Wand2`). Deshabilitado si `!prompt.trim()` o generando. Mientras genera: spinner + "Generando… (10–20 s)".
  - Al terminar: `<img>` dentro de un contenedor con clase de aspect ratio derivada (`aspect-video`, `aspect-square`, `aspect-[9/16]`, `aspect-[4/3]`, `aspect-[3/4]`), y botones **"Descargar PNG"** (`<a download={fileName} href={dataUri}>`) y **"Regenerar"**.
  - `fileName = envios-dosruedas-${slug(suggestedFileName ?? 'imagen')}-${timestamp}.png`.
  - Error: `<Alert variant="destructive">` inline + toast (`useToast`).
- Si `prompt` cambia (nuevo prompt generado), vuelve a `idle` y descarta la imagen anterior.

### 4.6 Integración en generadores existentes
En `ImagePromptGenerator.tsx`, `ServiceImagePromptGenerator.tsx` y `OptimalImagePromptGenerator.tsx`, inmediatamente debajo del bloque "Prompt Listo para Usar":
```tsx
{state.prompt && (
  <ImageRenderer prompt={state.prompt} aspectRatio={form.watch('aspectRatio')} suggestedFileName={form.watch('service')} />
)}
```
Donde el form no tenga campo `aspectRatio` o `service`, se omite la prop (fallback `'1:1'` / `'imagen'`). No se modifica ninguna otra lógica de esos componentes.

### 4.7 Página `/generar-imagen`
- `src/app/generar-imagen/page.tsx` (Server Component): lee `searchParams.prompt` y renderiza `<StandaloneImageGenerator initialPrompt={...} />`.
- `src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx` (`'use client'`): `Textarea` para el prompt, `Select` con los 5 aspect ratios (default `1:1`), y `<ImageRenderer>` debajo. Usa `Card`, `Button`, `Select`, `Textarea` existentes.
- Alta en `src/lib/navigation.ts` → `toolsNavItems`:
  ```ts
  { href: '/generar-imagen', label: 'Generar Imagen', icon: ImageIcon, description: 'Renderizá cualquier prompt a imagen real con Nano Banana.', badge: 'Nano Banana' }
  ```
  Con eso aparece en el dashboard (`/`) y en el header sin más cambios.

## 5. Flujo de datos (camino feliz)
1. El usuario genera el prompt como hoy → `state.prompt`.
2. Click en "Generar imagen" → `<ImageRenderer>` llama `generateImageAction({ prompt, aspectRatio })` dentro de `startTransition`.
3. La action valida → flow → `ai.generate` → `response.media.url` (`data:image/png;base64,...`).
4. La action devuelve `{ imageDataUri, mimeType }` → el componente lo usa como `src` del `<img>` y `href` de descarga.

Tamaño de respuesta: un PNG de ~1024 px en base64 ronda 1.5–2.5 MB. Las Server Actions no limitan el tamaño de la **respuesta**, así que no se toca `next.config.ts`. Si apareciera un límite en la práctica, la vía de escape es un route handler binario que reutiliza el mismo flow.

## 6. Manejo de errores

| Caso | Dónde se detecta | Mensaje al usuario |
|---|---|---|
| Prompt vacío / > 4000 chars | Zod en la action | "El prompt es requerido." / "El prompt es demasiado largo (máx. 4000 caracteres)." |
| `GEMINI_API_KEY` ausente o inválida | Error del SDK (`API key` / `401`/`403` en el mensaje) | "Falta configurar la API key de Gemini (GEMINI_API_KEY)." |
| El modelo no devuelve media (bloqueo de seguridad, rechazo) | Flow: `!response.media?.url` | "Nano Banana no generó imagen para este prompt. Probá ajustar el texto." |
| Cuota / rate limit (`429` / `RESOURCE_EXHAUSTED`) | Action inspecciona el error | "Límite de uso alcanzado. Esperá un momento y reintentá." |
| Timeout / red / otro | Catch genérico en la action | "Hubo un error al generar la imagen: <detalle>." |

La clasificación de errores se hace en una función pura `toUserFacingError(e: unknown): string` dentro de la action (exportada para testear), para no acoplar la UI a mensajes del SDK.

## 7. Testing

### Runner
Agregar **Vitest** (`vitest` devDependency, `vitest.config.ts` con alias `@/` → `src/`, script `"test": "vitest run"`). Motivo: consistencia con `00enviosdosruedas`, que ya usa Vitest.

### Unitarios (sin llamar a la IA)
- `src/lib/aspect-ratio.test.ts`: `'16:9 (Panorámica)' → '16:9'`, `'1:1' → '1:1'`, `'basura' → '1:1'`, `undefined → '1:1'`, `'4:3 (Clásica)' → '4:3'`.
- `src/app/actions/generate-image.test.ts` con `vi.mock('@/ai/flows/generate-image')`:
  - prompt vacío → `{ error }` y el flow **no** se llama;
  - prompt de 4001 chars → `{ error }`;
  - flow resuelve → `{ imageDataUri, mimeType }`;
  - flow lanza `Error('429 RESOURCE_EXHAUSTED')` → mensaje de cuota;
  - flow lanza `Error('API key not valid')` → mensaje de API key;
  - flow lanza error genérico → mensaje genérico con el detalle.
- `src/ai/flows/generate-image.test.ts` con `ai.generate` mockeado: respuesta sin `media` → lanza "no generó imagen"; respuesta con `media.url` → devuelve el data URI y `mimeType`.

### Manual (requiere `GEMINI_API_KEY` real)
- `/generales`: generar prompt → "Generar imagen" → preview 16:9 → descarga un `.png` que abre correctamente.
- `/generar-imagen?prompt=...`: prompt precargado, generar en `9:16`.
- `/servicios` y `/optimas`: una generación cada uno.
- Confirmar que `imageConfig.aspectRatio` es respetado; si no, activar el fallback de §4.2.

## 8. Definition of Done
- `pnpm build` ✅
- `pnpm lint` ✅
- `pnpm typecheck` ✅
- `pnpm test` ✅
- Verificación manual: al menos una imagen real generada y descargada desde `/generales` y desde `/generar-imagen`.

## 9. Archivos afectados

**Nuevos**
- `src/ai/models.ts`
- `src/ai/flows/generate-image.ts` (+ `generate-image.test.ts`)
- `src/lib/aspect-ratio.ts` (+ `aspect-ratio.test.ts`)
- `src/app/actions/generate-image.ts` (+ `generate-image.test.ts`)
- `src/components/admin/crea-imagenes/ImageRenderer.tsx`
- `src/components/admin/crea-imagenes/StandaloneImageGenerator.tsx`
- `src/app/generar-imagen/page.tsx`
- `vitest.config.ts`

**Modificados**
- `src/ai/dev.ts` (import del flow nuevo)
- `src/components/admin/crea-imagenes/ImagePromptGenerator.tsx`
- `src/components/admin/crea-imagenes/ServiceImagePromptGenerator.tsx`
- `src/components/admin/crea-imagenes/OptimalImagePromptGenerator.tsx`
- `src/lib/navigation.ts`
- `package.json` (devDependency `vitest`, script `test`)
