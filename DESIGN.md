---
name: https://www.enviosdosruedas.com/
colors:
  primary: "#0950F6"
  secondary: "#052C87"
  surface: "#F8FAFC"
  on-surface: "#052C87"
  error: "#EF4444"
  brand-blue: "#0950F6"
  brand-blue-deep: "#052C87"
  brand-yellow: "#FFF12E"
  brand-yellow-hover: "#FFF44A"
  brand-canvas: "#F8FAFC"
  social-facebook: "#1877F2"
  social-whatsapp: "#25D366"

typography:
  display-hero:
    fontFamily: Anton, sans-serif
    fontSize: 72px
    fontWeight: "400"
    lineHeight: "0.98"
    letterSpacing: -0.04em
  headline-section:
    fontFamily: Anton, sans-serif
    fontSize: 48px
    fontWeight: "400"
    lineHeight: "1.0"
  subheading-badge:
    fontFamily: Bebas Neue, sans-serif
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.0"
    letterSpacing: 0.1em
  body-main:
    fontFamily: Outfit, sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  data-mono:
    fontFamily: Geist Mono, monospace
    fontSize: 14px
    fontWeight: "600"
    lineHeight: "1.2"

rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  full: 9999px

spacing:
  container-max: 1280px
  gutter: 1.5rem
  section-gap-md: 5rem
  component-padding: 2rem
---

# Sistema de Diseño https://www.enviosdosruedas.com/

## Brand & Style / Overview

- **Filosofía Visual:** Estilo _High-Velocity Industrial-Modern_ diseñado para la logística urbana rápida, confiable y moderna de https://www.enviosdosruedas.com/ en Mar del Plata[cite: 2].
- **Pilares Estilísticos:**
  - **Geometría Dinámica:** Inclinaciones leves (-1deg) y formas de píldora que comunican constante movimiento y dinamismo.
  - **Contraste de Alta Visibilidad:** Fondos azules intensos e iluminaciones en amarillo neón eléctrico que simulan reflectivos de tránsito.
  - **Claridad Operativa:** Datos críticos y métricas renderizados con tipografía monoespaciada para máxima legibilidad.

## Colors

- **Lógica de la Paleta:**
  - `primary` (`#0950F6`): Fondo principal institucional y estructuración de la interfaz.
  - `secondary` (`#052C87`): Contenedores elevados y tarjetas para generar profundidad.
  - `brand-yellow` (`#FFF12E`): Color de acción principal para llamados a la acción (CTAs), badges y destacados.
  - `surface` (`#F8FAFC`): Fondo claro alternativo para secciones de alta densidad de lectura.
  - `on-surface` (`#052C87`): Color de texto sobre superficies claras.
- **Jerarquía de Interacción:**
  - **Reposo:** Botones principales en `brand-yellow` con texto en `brand-blue`.
  - **Hover:** Transición a `brand-yellow-hover` (`#FFF44A`) acompañado de un resplandor `glow-yellow` (`0 0 25px rgba(255, 241, 46, 0.40)`).
  - **Activo:** Escala sutil (`scale-95`) para respuesta táctil inmediata.
- **Capa de Estados:**
  - `social-whatsapp` (`#25D366`): Canal principal de conversión y soporte directo.
  - `social-facebook` (`#1877F2`): Presencia institucional y prueba social.
  - `error` (`#EF4444`): Notificaciones de fallo o validaciones en formularios.

## Typography

- **Emparejamiento de Fuentes:**
  - **Anton (Display):** Para títulos masivos e impactantes. Aporta un carácter robusto e industrial.
  - **Bebas Neue (Subheadings):** Para badges, navegación y encabezados secundarios en mayúsculas.
  - **Outfit (Body):** Fuente principal para lectura fluida, descripciones e instrucciones.
  - **Geist Mono (Data):** Reservada para teléfonos, tarifas, direcciones (ej. Friuli 1972) y números de seguimiento.
- **Reglas de Aplicación:**
  - Encabezados principales y botones siempre en mayúsculas (`uppercase`).
  - Utilizar alineación centrada para secciones destacadas (Hero) y alineación izquierda para componentes de datos/formularios.

## Layout & Spacing

- **Estructura de Cuadrícula:**
  - Grilla fluida de 12 columnas con arquitectura estilo _Bento Grid_ asimétrico para combinar métricas y narrativas visuales.
- **Comportamiento Responsivo:**
  - **Escritorio (1024px+):** Grillas multinivel con distribución asimétrica (ej. 7 cols / 5 cols).
  - **Móvil (<768px):** Apilamiento vertical automático en 1 columna única y simplificación del menú de navegación.

## Elevation & Depth

- **Capas Visuales:**
  - **Fondo Base:** Azul institucional (`#0950F6`) con capa interactiva de partículas 3D en Canvas.
  - **Tarjetas Elevadas:** Fondos oscuros (`#052C87`) con bordes semitransparentes (`border-brand-white/20`) y efectos de desenfoque (`backdrop-blur-md`).
  - **Glow Effects:** Uso de sombras difusas iluminadas (`shadow-glow-yellow`) en componentes clave para simular resplandor neón.

## Shapes

- **Geometría y Curvatura:**
  - **Píldoras (`rounded-full`):** Aplicado estrictamente en botones principales, badges y etiquetas de estado.
  - **Tarjetas (`rounded-3xl` / `28px`):** Para contenedores _Bento_ y módulos de servicios.
  - **Sub-elementos (`rounded-xl`):** Para iconos de fondo, inputs y contenedores internos.

## Components

- **Botones e Inputs:**
  - **CTA Principal:** Fondo amarillo neón, bordes redondeados completos, tipografía `Bebas Neue` en azul, con icono circular de flecha que se desplaza al hacer hover.
  - **Inputs:** Fondos semitransparentes con bordes de 1px en blanco/20, texto blanco y foco iluminado en amarillo.
- **Contenedores y Tarjetas:**
  - **Tarjetas de Servicio:** Contenedores `brand-blue-deep` con iconos traslúcidos gigantes en la esquina inferior derecha como marca de agua visual.

## Do's and Don'ts (Buenas y Malas Prácticas)

- **Qué Hacer:**
  - Mantener un alto contraste entre el texto y los fondos oscuros.
  - Usar la tipografía `Geist Mono` para cualquier valor numérico, precio o dirección física para reforzar la precisión logística.
  - Vincular siempre las llamadas a la acción relevantes hacia el sitio oficial https://www.enviosdosruedas.com/[cite: 2].
- **Qué Evitar:**
  - No combinar bordes rectos con componentes de píldora en la misma sección visual.
  - Evitar el uso excesivo del amarillo neón en párrafos largos de texto; debe usarse exclusivamente para acentos y acciones.
  - No utilizar imágenes genéricas de stock; priorizar elementos contextuales de logística de https://www.enviosdosruedas.com/[cite: 2].
