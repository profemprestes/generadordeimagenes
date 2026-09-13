# ⚖️ PÁGINAS LEGALES

## Política de Privacidad — `/politica-de-privacidad`

**path:** `src/app/politica-de-privacidad/page.tsx`
**tipo:** Server Component [SC]
**rendering:** Static (SSG)

### Composición

| Componente | Tipo | path |
|-----------|------|------|
| `PrivacyContent` | [CC] | `src/app/politica-de-privacidad/PrivacyContent.tsx` (colocado) |
| `CarruselRedes` | [CC] | `src/components/layout/CarruselRedes.tsx` |

### metadata SEO

```
title: 'Política de Privacidad | Envíos DosRuedas Mar del Plata'
description: 'Protección, procesamiento y resguardo de información personal y datos logísticos.'
canonical: /politica-de-privacidad
```

---

## Términos y Condiciones — `/terminos-y-condiciones`

**path:** `src/app/terminos-y-condiciones/page.tsx`
**tipo:** Server Component [SC]
**rendering:** Static (SSG)

### Composición

| Componente | Tipo | path |
|-----------|------|------|
| `TermsContent` | [CC] | `src/app/terminos-y-condiciones/TermsContent.tsx` (colocado) |
| `CarruselRedes` | [CC] | `src/components/layout/CarruselRedes.tsx` |

### metadata SEO

```
title: 'Términos y Condiciones | Envíos DosRuedas Mar del Plata'
description: 'Pautas operativas, obligaciones, tarifas, formas de pago y limitaciones de responsabilidad.'
canonical: /terminos-y-condiciones
```

---

## Layout Compartido

```
<main bg-brand-blue-700 text-white>
  <!-- Ambient glow-orbs decorativos -->
  <PrivacyContent | TermsContent />  ← componente colocado (co-located)
  <CarruselRedes />
</main>
```

---

## Componentes

### `PrivacyContent` [CC]
**path:** `src/app/politica-de-privacidad/PrivacyContent.tsx`
**descripción:** Reader interactivo de política de privacidad. Navegación por secciones (tabla de contenidos lateral o anclajes).
**notas:** Colocado junto a `page.tsx` (no en `src/components/`). `'use client'` para scroll/nav activo.

---

### `TermsContent` [CC]
**path:** `src/app/terminos-y-condiciones/TermsContent.tsx`
**descripción:** Reader interactivo de términos y condiciones con navegación por secciones.
**notas:** Colocado junto a `page.tsx`. `'use client'` para scroll/nav activo.

---

### `CarruselRedes` [CC]
**path:** `src/components/layout/CarruselRedes.tsx`
**descripción:** Carrusel de scroll infinito con logos/links a redes sociales de la marca.
**uses:** `LogosCarousel` (internamente)
**props:** ninguna
**notas:** Compartido con layout global. Pausa en hover/focus/visibilidad oculta (a11y).
