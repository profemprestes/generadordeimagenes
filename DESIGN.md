---
name: "Envíos DosRuedas"
description: "Sistema de diseño estricto y de alto impacto para logística urbana, e-commerce y mensajería en Mar del Plata. Basado en alternancia de contraste bimodal: Azul Eléctrico (#0950F6) y Blanco Canvas (#F8FAFC), con acento Amarillo Neón (#FFF12E) y Azul Marino (#052c87). Texto en negro estrictamente prohibido."
colors:
  primary: "#0950F6"
  primary_dark: "#06349e"
  primary_hover: "#0744d4"
  surface_deep: "#052c87"
  surface_light: "#F8FAFC"
  surface_card_light: "#FFFFFF"
  accent: "#FFF12E"
  accent_hover: "#e8dc24"
  text_primary: "#FFFFFF"
  text_light_mode_primary: "#0950F6"
  text_light_mode_secondary: "rgba(9, 80, 246, 0.85)"
  border_subtle: "rgba(255, 255, 255, 0.20)"
  border_light_subtle: "rgba(9, 80, 246, 0.20)"
  social_facebook: "#1877F2"
  social_instagram: "#E1306C"
  social_whatsapp: "#25D366"
typography:
  display: '"Bebas Neue", sans-serif'
  subheading: '"Anton", sans-serif'
  sans: '"Outfit", sans-serif'
  mono: '"Geist Mono", monospace'
---

# Design System: Envíos DosRuedas

## 1. Visual Theme & Atmosphere

El sistema de diseño de **Envíos DosRuedas** proyecta una estética enérgica, confiable, técnica y de alto impacto inspirada en la velocidad de la distribución de última milla y la logística urbana en Mar del Plata. El sistema opera bajo una **arquitectura cromática bimodal alternada**: secciones en **Azul Eléctrico (`#0950F6`)** intercaladas con secciones en **Blanco Canvas Claro (`#F8FAFC`)**, creando un ritmo visual nítido y moderno.

### Regla Fundamental de Contraste

- **Prohibición Total del Negro (`#000000` / `text-slate-900`)**: Tanto en fondos azules como en fondos blancos, la tipografía y los elementos gráficos se construyen exclusivamente mediante la vibración de **Azul Eléctrico (`#0950F6`)**, **Azul Marino (`#052c87`)** y **Amarillo Neón (`#FFF12E`)**, logrando identidad de marca pura y diferenciación absoluta.
- **Asimetría Tipográfica Activa**: Los encabezados display incorporan pastillas rotadas (`transform -rotate-1`) con fondo azul y cápsula interior amarilla con texto azul (`bg-brand-yellow text-brand-blue font-black`) para romper la rigidez de grilla y elevar la tasa de lectura.

---

## 2. Color Palette & Roles

El proyecto aplica una **paleta calibrada de 3 pilares de marca** adaptada a ambos tipos de superficie:

### 1. Primary Foundations & Surfaces

- **Electric Logistic Blue** (`#0950F6`): Fondo maestro de secciones impares (Hero, Servicios Overview, Emprendedores, Footer), botones secundarios en modo claro y bordes interactivos.
- **Deep Slate / Marine Container** (`#052c87`): Superficie para tarjetas bento en fondo azul, modales técnicos y contenedores showcase.
- **Canvas White / Light Surface** (`#F8FAFC`): Fondo maestro de secciones pares (Visión & Métricas, Slider de Industrias, Comunidad & Redes) para descanso visual y máxima legibilidad.
- **Pure Surface Card** (`#FFFFFF`): Fondo de tarjetas en secciones claras con bordes calibrados `border-brand-blue/20` y sombras nítidas.

### 2. High-Visibility Accent & Interaction

- **High-Vis Neon Yellow** (`#FFF12E`): Acento primario para badges clave, botones CTA de conversión inmediata, iconos de estado y pastillas de énfasis tipográfico.
- **Deepened Yellow Hover** (`#E8DC24`): Estado `:hover` táctil de botones amarillos.
- **Pure White** (`#FFFFFF`): Textos en modo oscuro, iconos y líneas divisorias translúcidas.

### 3. Dual-Surface Typography Rules

| Tipo de Sección        | Fondo          | Título Principal                   | Texto de Cuerpo / Párrafo                   | Badge / Pill                      |
| :--------------------- | :------------- | :--------------------------------- | :------------------------------------------ | :-------------------------------- |
| **Sección Modo Azul**  | `bg-[#0950F6]` | `text-brand-white`                 | `text-brand-white/85`                       | `bg-brand-yellow text-brand-blue` |
| **Sección Modo Claro** | `bg-[#F8FAFC]` | `text-brand-blue` + cápsula rotada | `text-brand-blue/85` y `text-brand-blue/75` | `bg-brand-blue text-brand-yellow` |

### 4. Functional States & Social Channels

- **WhatsApp Emerald** (`#25D366`): CTA de contacto directo y canal de atención inmediata. Sombra glow: `0 0 25px rgba(37, 211, 102, 0.75)`.
- **Facebook Royal Blue** (`#1877F2`): Tarjeta social de comunidad. Sombra glow: `0 0 25px rgba(24, 119, 242, 0.75)`.
- **Instagram Gradient** (`from #f97316 via #e11d48 to #9333ea`): Tarjeta de contenido visual. Sombra glow: `0 0 25px rgba(225, 48, 108, 0.75)`.

---

## 3. Typography Architecture

El sistema tipográfico combina 4 familias estrictas:

### 1. Display Headings (`Bebas Neue` / `sans-serif`)

- **Uso**: Encabezados H1 y H2 de gran escala (`text-4xl` a `text-7xl`), nombres de tarjetas principales y marcas de agua.
- **Estructura**: `uppercase`, `tracking-tight`, `leading-[0.95]`.
- **Firma Visual**: Integración de cápsula asimétrica rotada para la palabra clave:
  ```html
  <span
    class="relative inline-block bg-brand-blue px-3 py-1 my-1 transform -rotate-1 rounded-xl border border-brand-yellow/60 shadow-xl"
  >
    <span
      class="relative z-10 bg-brand-yellow text-brand-blue px-3.5 py-0.5 inline-block font-display font-black rounded-lg"
    >
      [PALABRA CLAVE]
    </span>
  </span>
  ```

### 2. Subheadings & Action Labels (`Anton` / `sans-serif`)

- **Uso**: Botones CTA, tabs de navegación, títulos de menú, encabezados H3/H4 (`text-sm` a `text-2xl`).
- **Estilo**: `uppercase`, `tracking-wider` / `tracking-widest`, `font-bold`.

### 3. Body & Editorial (`Outfit` / `sans-serif`)

- **Uso**: Párrafos descriptivos, especificaciones técnicas de servicio y modales (`text-xs` a `text-lg`).
- **Estilo**: `font-medium` o `font-light` con interlineado relajado (`leading-relaxed`).

### 4. Technical & Metric (`Geist Mono` / `monospace`)

- **Uso**: Direcciones operativas (`Friuli 1972`), números de teléfono, insignias SLA ("SLA: MÁXIMA VELOCIDAD"), contadores de slider (`1 / 6`).
- **Estilo**: `tracking-widest`, `text-[10px]` a `text-xs`, alta precisión técnica.

---

## 4. Component Stylings

### 1. Buttons & Interactive Badges

- **Primary CTA ("Cotizá tu envío / Cotizá Express")**:
  - Forma: Píldora redondeada completa (`rounded-full`).
  - Fondo: Amarillo Neón (`#FFF12E`) con texto en Azul Eléctrico (`#0950F6`).
  - Resplandor: `shadow-glow-yellow` (`0 0 35px rgba(255, 241, 46, 0.45)`).
- **Tab Pills (Slider por Industria)**:
  - **Activo**: `bg-brand-blue text-brand-yellow border-brand-blue shadow-md scale-105`.
  - **Inactivo (Fondo Claro)**: `bg-white text-brand-blue border-brand-blue/25 hover:bg-brand-yellow/20 hover:border-brand-blue`.
  - **Inactivo (Fondo Azul)**: `bg-brand-white/10 text-brand-white border-brand-white/20 hover:bg-brand-white/20`.

### 2. Cards & Containers

- **Cards en Fondo Azul**:
  - Superficie: `bg-[#052c87]/90` con borde translúcido `border-brand-white/20`.
  - Marca de agua decorativa: Icono Phosphor masivo (`text-[13rem]` a `text-[18rem]`) con opacidad ultra sutil (`text-brand-white/[0.04]`).
- **Cards en Fondo Claro**:
  - Superficie: `bg-white` con borde azul tenue `border-brand-blue/20`, sombra `shadow-lg` y hover dinámico `hover:border-brand-blue hover:shadow-xl`.

---

## 5. Layout Principles & Alternation Pattern

### Ritmo Secuencial de la Landing Page

1. **Hero Principal (`#hero-animado`)**: Fondo Azul Eléctrico (`bg-brand-blue`)
2. **Visión & Métricas Bento (`#vision-mar-del-plata`)**: Fondo Blanco Canvas (`bg-[#f8fafc]`)
3. **Servicios Overview & Modales (`#servicios`)**: Fondo Azul Eléctrico (`bg-brand-blue`)
4. **Slider de Soluciones por Industria (`#slider-industrias`)**: Fondo Blanco Canvas (`bg-[#f8fafc]`)
5. **Emprendedores & Marcas Locales (`#emprendedores-mdq`)**: Fondo Azul Eléctrico (`bg-brand-blue`)
6. **Comunidad Digital & Redes (`#carrusel-redes`)**: Fondo Blanco Canvas (`bg-[#f8fafc]`)
7. **Footer Institucional (`#contacto`)**: Fondo Azul Eléctrico (`bg-brand-blue`)

---

## 6. Anti-Patterns (Banned Rules)

- ❌ **NO usar texto en color negro (`#000000`, `text-black`, `text-slate-900`) en ninguna sección.**
- ❌ **NO usar fuentes genéricas como Inter, Arial o Times New Roman.**
- ❌ **NO usar emojis estándar; utilizar únicamente iconos vectoriales Phosphor.**
- ❌ **NO centrar títulos principales en modo asimétrico salvo cuando se requiera intencionalmente en una sola fila (`flex-wrap justify-center`).**
- ❌ **NO generar datos o métricas ficticias ajenas a la operación real de Mar del Plata.**
