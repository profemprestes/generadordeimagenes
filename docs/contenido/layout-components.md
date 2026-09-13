# 🏗️ LAYOUT COMPONENTS — `src/components/layout/` + `ClientLayout`

> Componentes de estructura global presentes en TODAS las páginas vía `src/app/layout.tsx`.

---

## Layout Global (`src/app/layout.tsx`)

```tsx
// Estructura del root layout
<html lang="es">
  <body>
    <ClientLayout>        ← envuelve todo el body
      <OptimizedHeader /> ← presente en TODAS las páginas
      <MobileNav />       ← nav mobile (CC)
      {children}          ← contenido de cada página
      <OptimizedFooter /> ← presente en TODAS las páginas
    </ClientLayout>
  </body>
</html>
```

---

## `ClientLayout` [CC]
**path:** `src/components/ClientLayout.tsx`
**tamaño:** 1.2 KB
**descripción:** Wrapper de cliente que envuelve el layout global. Provee contextos (theme, toast, etc.) y aplica transiciones de página.
**uses:** `template.tsx` (animación de transición entre rutas)
**notas:** `'use client'`. Punto de inyección de providers globales.

---

## `OptimizedHeader` [CC]
**path:** `src/components/layout/OptimizedHeader.tsx`
**tamaño:** ~variable
**descripción:** Header principal con logo, navegación desktop y CTA de cotización. Comportamiento sticky con scroll.
**uses:** `CTANestedPill`, logo SVG `/public/logo-master.svg`
**props:** ninguna
**notas:**
- Logo: `/public/logo-master.svg` vectorial — mínimo **120px** de ancho
- Nav links: Servicios (dropdown), Cotizar, Nosotros, Contacto
- CTA: `Cotizá Ahora` → `/cotizar/express`
- Sticky en desktop; se oculta en mobile (ver `MobileNav`)

---

## `MobileNav` [CC]
**path:** `src/components/layout/MobileNav.tsx`
**tamaño:** ~variable
**descripción:** Navegación mobile con menú hamburguesa / drawer lateral. Mismos links que `OptimizedHeader`.
**props:** ninguna
**notas:** `'use client'`. Visible solo en breakpoints `< lg`. Drawer animado con Framer Motion.

---

## `OptimizedFooter` [SC]
**path:** `src/components/layout/OptimizedFooter.tsx`
**tamaño:** ~variable
**descripción:** Footer con columnas de links, datos de contacto, legal y redes sociales.
**props:** ninguna
**notas:**
- Datos: Friuli 1972, Mar del Plata | +54-223-660-2699 | matiascejas@enviosdosruedas.com
- Links legales: `/politica-de-privacidad`, `/terminos-y-condiciones`
- Redes: Instagram, Facebook, WhatsApp
- Copyright: 2026 Envíos DosRuedas

---

## `CarruselRedes` [CC]
**path:** `src/components/layout/CarruselRedes.tsx`
**tamaño:** ~variable
**descripción:** Carrusel de scroll infinito con accesos a redes sociales. Aparece en páginas legales y opcionalmente en footer.
**uses:** `LogosCarousel` (o implementación propia)
**props:** ninguna
**notas:**
- Pausa en hover/focusin/`document.hidden` (a11y requerido)
- Ítems: Instagram, Facebook, WhatsApp, TikTok (si aplica)

---

## `template.tsx` (`src/app/template.tsx`)

**path:** `src/app/template.tsx`
**tamaño:** 777 B
**descripción:** Template de Next.js App Router que se re-monta en cada navegación. Aplica animación de transición entre páginas (fade-in o slide).
**notas:** Framer Motion `AnimatePresence` + `motion.div` con `initial/animate/exit`.
