# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Qué es este proyecto

Estudio interno de IA para **Envíos DosRuedas** (mensajería en Mar del Plata): genera **prompts** de imagen/UI alineados a la marca y, además, **renderiza imágenes reales** con Nano Banana (Gemini image). No es el sitio público de la empresa: es una herramienta que produce assets y prompts para ese sitio. Stack: Next.js 16 (App Router, React 19, React Compiler), Tailwind v4, shadcn/ui (Radix), Genkit + `@genkit-ai/google-genai`, Vitest. Sin base de datos ni persistencia.

## Comandos

Solo `pnpm` (el `packageManager` está fijado a pnpm 11).

| Acción | Comando |
|---|---|
| Dev (Turbopack) | `pnpm dev` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Tests (todos) | `pnpm test` |
| Un archivo de test | `pnpm vitest run src/lib/aspect-ratio.test.ts` |
| Un test por nombre | `pnpm vitest run -t "rechaza un prompt vacío"` |
| Genkit Developer UI (probar flows aislados) | `pnpm genkit:dev` / `pnpm genkit:watch` |

- Variable requerida: `GEMINI_API_KEY` en `.env` / `.env.local`.
- Vitest corre en entorno `node` y solo toma `src/**/*.test.ts` (no hay tests de componentes `.tsx`).
- **TypeScript con alias**: `typescript` en realidad es TS 6 (`npm:@typescript/typescript6`) y TS 7 está instalado aparte como `@typescript/native`. `next.config.ts` usa `experimental.useTypeScriptCli: false`, así que `next build` type-checkea con TS 6. No "arregles" estos alias.
- `eslint.config.mjs` fija `settings.react.version` a mano porque la detección automática de `eslint-plugin-react` rompe con ESLint 10. No lo quites.

## Arquitectura

### Flujo de una herramienta

```
Página (src/app/<herramienta>/page.tsx, Server Component)
  └─ Componente cliente compartido (src/components/admin/crea-imagenes/*)
       └─ Server Action (src/app/<herramienta>/actions.ts, 'use server')
            └─ Genkit flow (src/ai/flows/*.ts) ── ai.generate / ai.definePrompt
```

- **`src/ai/genkit.ts`**: instancia única `ai` con el plugin Google AI; modelo de texto por defecto `googleai/gemini-2.5-flash`.
- **`src/ai/models.ts`**: único lugar donde se nombran los modelos de imagen (`NANO_BANANA_PRO` = `gemini-3-pro-image-preview`, por defecto; `NANO_BANANA_2` = `gemini-3.1-flash-image-preview`, soporta Search Grounding).
- **`src/ai/dev.ts`**: registra los flows para la Genkit Dev UI. Al crear un flow nuevo, importalo acá.
- **Flows**: definen schemas de entrada/salida con el `z` de `genkit` (no el de `zod`) y exportan una función wrapper async que llama al flow. Los prompts de sistema van en inglés; la salida visible para el usuario, en español.
- **Server Actions**: validan con `zod`, llaman al flow y **nunca lanzan**: devuelven `{ error }` (o `{ success, data, error }`) con mensajes en español. Muchas se usan con `useActionState` (firma `(prevState, formData)`).
- **Generación de imagen real**: `src/app/actions/generate-image.ts` → `src/ai/flows/generate-image.ts` devuelve un data URI (sin guardar nada). La UI es `<ImageRenderer>`, que se incrusta en los generadores. Los errores del SDK se traducen en `src/lib/image-generation-errors.ts` (`toUserFacingError`); `src/lib/aspect-ratio.ts` normaliza valores como `"16:9 (Panorámica)"`.

### Rutas: las de raíz son las reales, `/admin/*` son redirects

Las herramientas viven en `/generales`, `/servicios`, `/optimas`, `/generar-imagen`, `/hero`, `/ui-optimizer`, `/ui-optimizer/componentes` y `/crear-prompts-webs` (listadas en `src/lib/navigation.ts` → `toolsNavItems`, que alimenta el dashboard `/`). Todas las `page.tsx` bajo `src/app/admin/**` solo hacen `redirect()` a la ruta de raíz. Los componentes importan las actions de `@/app/<ruta>/actions`, así que los `actions.ts` bajo `src/app/admin/crea-imagenes/**` no se usan: editá los de raíz.

### Fuentes de contexto de marca (se inyectan en los prompts)

- **`src/lib/brand-style.ts`** (`BRAND_STYLE`): paleta, tipografías y `promptAnchors` (photo / render3d / isometric), reexportados en `src/ai/flows/brand-anchors.ts`. Es la fuente para los prompts de imagen.
- **`src/lib/context/`**: contexto operativo de los 5 servicios canónicos (`envios-express`, `envios-lowcost`, `envios-flex`, `plan-emprendedores`, `fulfillment-3pl`). Usá `getServiceContext()` / `normalizeServiceKey()` (hace matching difuso de nombres). `src/context/*.md|json` son las versiones fuente en texto.
- **`src/lib/empresa.json`**, **`src/lib/imagenes.json`** (perfiles de imágenes de inspiración, también servidos estáticamente en `/api/images`).
- **`docs/contenido/*.md`**: documentación de las páginas del sitio público. `src/lib/docs-contenido.ts` la lee **del disco en runtime** (`process.cwd()/docs/contenido`) y la parsea en páginas → secciones → "visual slots" para `/crear-prompts-webs`. Si cambiás el formato de esos `.md`, revisá el parser.
- **`actualizar-branding.mjs`**: script que reescribe de golpe varios archivos de marca (p. ej. `src/lib/empresa.json`). Correrlo pisa esos archivos.

### Reglas de prompts (Prompt Architecture v2.0, `docs/PROMPT_ARCHITECTURE.md`)

Los prompts de imagen se escriben en inglés, en un único párrafo denso, con este orden: Subject & Action → Environment & Staging → Materials (PBR) → Typography opcional (texto literal entre comillas) → Optics & Lighting + aspect ratio/resolución. Están prohibidos el keyword-stuffing y los tags "Nano Banana", "photorealistic", "8k", "trending on artstation", "hyperrealistic", "masterpiece", "unreal engine" y "octane render". `src/lib/prompt-compiler.ts` (`compilePromptBlueprint`, `sanitizePromptSegment`) aplica estas reglas en código.

### UI y estilos

- Tema oscuro fijo (`className="dark"` en `src/app/layout.tsx`). Fuentes vía `next/font`: Outfit (`font-sans`), Anton (`font-display`), Bebas Neue (`font-subheading`), Geist Mono (`font-mono`).
- `src/components/ui/` es shadcn/ui; hay dos sistemas de toasts montados (`toaster` de Radix y `sonner`).
- **Ojo con la paleta**: `DESIGN.md` y la UI usan `#0950F6` / `#052C87` / `#FFF12E`, pero `src/lib/brand-style.ts` (los prompts) usa `#0636A5` / `#FFEC01`, y algunos flows traen otros hex hardcodeados (p. ej. `#0C59F2`). No unifiques sin confirmarlo con el usuario.

### Specs y planes

Los diseños y planes aprobados están en `docs/superpowers/specs/` y `docs/superpowers/plans/` (p. ej. el de generación de imágenes con Nano Banana). Algunos detalles quedaron viejos (el spec menciona `gemini-2.5-flash-image`); el código manda.
