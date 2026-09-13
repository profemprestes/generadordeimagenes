# 📄 Nodo: Sobre Nosotros & Historia

> **URL:** `/nosotros/sobre-nosotros`  
> **Path Relativa Página:** `src/app/nosotros/sobre-nosotros/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/nosotros/sobre-nosotros/page.tsx` | Server Component [SC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutHero.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutAdvantages.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutValues.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutTimeline.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutTeam.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/sobre-nosotros/AboutMissionVision.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/nosotros/sobre-nosotros/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import AboutHero from '@/src/components/nosotros/sobre-nosotros/AboutHero';
import AboutAdvantages from '@/src/components/nosotros/sobre-nosotros/AboutAdvantages';
import AboutValues from '@/src/components/nosotros/sobre-nosotros/AboutValues';
import AboutTimeline from '@/src/components/nosotros/sobre-nosotros/AboutTimeline';
import AboutTeam from '@/src/components/nosotros/sobre-nosotros/AboutTeam';
import AboutMissionVision from '@/src/components/nosotros/sobre-nosotros/AboutMissionVision';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Sobre Nosotros & Historia | Envíos DosRuedas Mar del Plata',
  description:
    'Conocé la historia, valores y equipo detrás de Envíos DosRuedas. Más de 7 años de trayectoria liderando la logística urbana, cadetería y última milla e-commerce en Mar del Plata.',
  alternates: {
    canonical: `${baseUrl}/nosotros/sobre-nosotros`,
  },
  openGraph: {
    title: 'Sobre Nosotros & Historia | Envíos DosRuedas Mar del Plata',
    description:
      'Más de 7 años de trayectoria transformando la logística urbana y la última milla en Mar del Plata con flota propia.',
    url: `${baseUrl}/nosotros/sobre-nosotros`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre Nosotros - Envíos DosRuedas',
  description:
    'Historia, valores y equipo de Envíos DosRuedas en Mar del Plata. Más de 7 años de trayectoria en logística urbana y última milla.',
  url: `${baseUrl}/nosotros/sobre-nosotros`,
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'Envíos DosRuedas',
    description:
      'Somos tu aliado estratégico en logística urbana y mensajería de última milla. Con más de 7 años de trayectoria en Mar del Plata, transformamos el despacho de tus productos en un motor de crecimiento para emprendedores, PyMEs y comercios locales.',
    telephone: '+54-223-660-2699',
    email: 'matiascejas@enviosdosruedas.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Friuli 1972',
      addressLocality: 'Mar del Plata',
      addressRegion: 'Buenos Aires',
      postalCode: '7600',
      addressCountry: 'AR',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 20,
      maxValue: 50,
    },
  },
};

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-brand-white-50 text-brand-ink relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* 3D Ambient floating glow-orbs */}
      <div className="absolute top-[15%] left-[-10%] w-[40vw] h-[40vw] bg-brand-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-[35vw] h-[35vw] bg-brand-yellow-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] bg-brand-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Header & Identidad */}
      <div className="relative z-10">
        <AboutHero />
      </div>

      {/* Ventajas Territoriales */}
      <div className="relative z-10">
        <AboutAdvantages />
      </div>

      {/* Valores Operativos */}
      <div className="relative z-10">
        <AboutValues />
      </div>

      {/* Línea de Tiempo & Evolución Histórica */}
      <div className="relative z-10">
        <AboutTimeline />
      </div>

      {/* Equipo & Fuerza Operativa */}
      <div className="relative z-10">
        <AboutTeam />
      </div>

      {/* Misión, Visión & Cierre */}
      <div className="relative z-10 font-sans">
        <AboutMissionVision />
      </div>
    </main>
  );
}

```

---

## 2. Componente: `AboutHero.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroProceduralBackground from '@/components/ui/HeroProceduralBackground';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Star, ShieldCheck, Sparkles, MapPin, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    author: "Sol R.",
    role: "Google Local Guide · Mar del Plata",
    text: "Matías de Envíos DosRuedas se convirtió en mi héroe logístico por segundo año consecutivo. Rapidez, comunicación clara y un embalaje impecable.",
    rating: 5,
    date: "Hace 26 semanas",
  },
  {
    author: "Karen H.",
    role: "Comercio Local · Mar del Plata",
    text: "Excelente servicio, rápidos, muy atentos, resolvieron mi problema con la mejor predisposición. Los recomiendo ampliamente.",
    rating: 5,
    date: "Hace 13 semanas",
  },
  {
    author: "Agustín T.",
    role: "Tienda Online · Centro",
    text: "Lo usé varias veces para llevar pedidos a nuestros clientes. Impecable el servicio y la confianza de su flota propia.",
    rating: 5,
    date: "Hace 48 semanas",
  },
];

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutHero() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="about-hero" 
      className="relative min-h-[90dvh] flex items-center justify-center pt-28 pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-brand-blue-500 text-white border-b border-white/10"
    >
      {/* Dynamic procedural background */}
      <HeroProceduralBackground variant="default" />

      {/* Halo glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8"
          >
            {/* Speed Badge with -rotate-1 */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-yellow-500/40 bg-[#052C87]/90 text-brand-yellow-500 text-xs sm:text-sm font-subheading uppercase tracking-widest shadow-md backdrop-blur-md transform -rotate-1">
              <Award className="h-4 w-4 text-brand-yellow-500 shrink-0" />
              <span>LOGÍSTICA SOBERANA · MAR DEL PLATA 2026</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.2rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">LÍDERES EN</span>
              <span className="block">LOGÍSTICA DE</span>
              <span className="inline-block bg-brand-yellow-500 text-[#052C87] px-3 py-1 rounded-md transform -rotate-1 mt-1 font-display tracking-tight shadow-glow-yellow">
                ÚLTIMA MILLA
              </span>
            </h1>

            {/* Description matching official profile */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-4 border-brand-yellow-500">
              Con más de 7 años de trayectoria en Mar del Plata, transformamos el despacho de tus productos en un motor de crecimiento para emprendedores, PyMEs y comercios locales con flota propia y compromiso humano.
            </p>

            {/* Conversion Primary CTA button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <Link
                href="/cotizar/express"
                className="group relative inline-flex items-center justify-between min-h-[52px] px-8 py-3.5 rounded-full bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading text-lg uppercase tracking-wider font-bold shadow-glow-yellow transition-all duration-300 transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
              >
                <span>COTIZÁ TU ENVÍO EN VIVO</span>
                <span className="w-8 h-8 rounded-full bg-[#052C87]/15 flex items-center justify-center ml-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#052C87]" />
                </span>
              </Link>
            </div>

            {/* Mission Callout Card (Double Bezel Dark Variant) */}
            <div className="rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl max-w-xl mx-auto lg:mx-0">
              <div className="rounded-[20px] bg-[#052C87] p-5 sm:p-6 border border-white/10 text-white space-y-2 relative overflow-hidden">
                <Sparkles className="absolute -right-4 -bottom-4 w-24 h-24 text-white/[0.04] pointer-events-none" />
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Sparkles className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                  <h3 className="text-xs font-subheading uppercase tracking-wider text-brand-yellow-500 font-bold">
                    PROPÓSITO OPERATIVO 2026
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans text-center lg:text-left">
                  Conectamos tiendas online, PyMEs y emprendedores de General Pueyrredón mediante una flota motorizada 100% propia, soporte en tiempo real y cumplimiento estricto de horarios desde nuestro Hub Central en Friuli 1972.
                </p>
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-yellow-500 tabular-nums">
                  +7
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-white/90 mt-0.5">
                  Años en MDQ
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-yellow-500 tabular-nums">
                  100%
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-white/90 mt-0.5">
                  Flota Propia
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-brand-yellow-500 tabular-nums">
                  5.0 ★
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-white/90 mt-0.5">
                  Google Reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Verified Reputation Card & Live Reviews Widget (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl">
              <div className="rounded-[20px] bg-[#052C87] p-6 sm:p-8 border border-white/10 text-white space-y-6 relative overflow-hidden">
                {/* Watermark Icon */}
                <ShieldCheck className="absolute -right-6 -bottom-6 w-36 h-36 text-white/[0.04] pointer-events-none" />

                {/* Accent line top */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-yellow-500 via-white to-brand-yellow-400" />

                {/* Rating header */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-brand-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-yellow-500 text-brand-yellow-500" />
                    ))}
                  </div>
                  <span className="text-xs font-subheading font-bold bg-white/15 text-brand-yellow-500 px-3 py-1 rounded-full tracking-wider flex items-center gap-1 border border-white/20">
                    <span>GOOGLE REVIEWS</span>
                    <span className="tabular-nums font-mono">5.0 / 5</span>
                  </span>
                </div>

                {/* Reputation title */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-500 animate-pulse shadow-glow-yellow" />
                    <h4 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white leading-none">
                      CONFIANZA LOCAL
                    </h4>
                  </div>
                  <p className="text-xs text-brand-yellow-500 font-subheading uppercase tracking-wider mt-1.5 font-bold">
                    +7 AÑOS DE TRAYECTORIA EN CALLES DE MDQ
                  </p>
                </div>

                {/* Live Google Reviews Carousel */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative min-h-[140px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReview}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <p className="font-sans text-xs sm:text-sm text-white/90 italic leading-relaxed">
                        &ldquo;{REVIEWS[currentReview].text}&rdquo;
                      </p>
                      <div className="flex justify-between items-center pt-1 text-[11px] font-sans">
                        <span className="font-bold text-brand-yellow-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow-500" />
                          {REVIEWS[currentReview].author}
                        </span>
                        <span className="text-white/70">{REVIEWS[currentReview].role}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel pagination */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-2">
                    <div className="flex gap-1.5">
                      {REVIEWS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentReview(idx)}
                          aria-label={`Ver opinión ${idx + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 min-w-[20px] min-h-[20px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500`}
                        >
                          <span className={`h-1.5 rounded-full ${
                            idx === currentReview
                              ? 'w-6 bg-brand-yellow-500'
                              : 'w-2 bg-white/30 hover:bg-white/60'
                          }`} />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setCurrentReview((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                        aria-label="Opinión anterior"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentReview((prev) => (prev + 1) % REVIEWS.length)}
                        aria-label="Siguiente opinión"
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  Nuestros clientes avalan la excelencia operativa. Controlamos cada despacho desde el centro de distribución en <strong className="text-white">Friuli 1972</strong> con seguimiento constante.
                </p>

                {/* Trust anchors footer */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="font-subheading text-white font-bold flex items-center gap-1.5 text-xs sm:text-sm tracking-wider uppercase">
                    <ShieldCheck className="h-4 w-4 text-brand-yellow-500" />
                    FLOTA 100% PROPIA
                  </span>
                  <span className="font-subheading text-white/90 flex items-center gap-1.5 text-xs sm:text-sm tracking-wider uppercase font-bold">
                    <MapPin className="h-4 w-4 text-brand-yellow-500" />
                    MAR DEL PLATA
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

```

---

## 3. Componente: `AboutAdvantages.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutAdvantages.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutAdvantages() {
  return (
    <section 
      id="about-advantages" 
      className="py-20 sm:py-24 bg-brand-white-50 relative overflow-hidden border-t border-brand-blue-100/50"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            VENTAJAS TERRITORIALES
          </span>
          <h2 className="text-brand-blue-700 text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            POR QUÉ CONFIAR EN DOSRUEDAS
          </h2>
          <p className="text-brand-ink/80 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Frente a aplicaciones automatizadas y plataformas impersonales, nosotros brindamos compromiso presencial, operadores locales y conocimiento metro a metro de Mar del Plata.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 1: Soporte Humano Directo (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue-700 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex items-center justify-center border border-brand-blue-100">
                  <MessageSquare className="h-6 w-6 text-[#0950F6]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                  Atención Humana & Directa
                </h3>
                <p className="text-sm sm:text-base text-brand-ink leading-relaxed font-sans">
                  Damos la cara siempre. Cuando surge una duda o reprogramación, te comunicás directamente por WhatsApp con operadores en Mar del Plata que gestionan y resuelven en el acto.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-blue-50 flex items-center gap-2 text-xs font-subheading font-bold uppercase tracking-wider text-[#0950F6]">
                <Sparkles className="h-4 w-4 text-brand-yellow-500 fill-brand-yellow-500" />
                <span>COMUNICACIÓN DIRECTA VÍA WHATSAPP</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Flota Propia Coordinada (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue-700 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-yellow-50 text-brand-blue-900 rounded-2xl flex items-center justify-center border border-brand-yellow-200">
                  <Truck className="h-6 w-6 text-brand-blue-700" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                  Flota Propia Capacitada
                </h3>
                <p className="text-sm sm:text-base text-brand-ink leading-relaxed font-sans">
                  No tercerizamos de forma descontrolada. Nuestro equipo de cadetes está uniformado, capacitado en manejo de paquetes frágiles y con base física en <strong>Friuli 1972</strong>.
                </p>
              </div>
              <div className="pt-4 border-t border-brand-blue-50 flex items-center gap-2 text-xs font-subheading font-bold uppercase tracking-wider text-[#0950F6]">
                <Sparkles className="h-4 w-4 text-brand-yellow-500 fill-brand-yellow-500 animate-pulse" />
                <span>COBERTURA TOTAL GENERAL PUEYRREDÓN</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Garantía de Puntualidad (12 cols full width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-12 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-blue-50 text-brand-blue-700 rounded-xl">
                    <ShieldCheck className="h-6 w-6 text-brand-blue-700" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-none">
                    Garantía Operativa Sin Excusas
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-brand-ink leading-relaxed font-sans">
                  Tu reputación comercial depende de la puntualidad de entrega. Si coordinamos un envío express en 2 horas o un ruteo programado, cumplimos la franja pactada sin desvíos.
                </p>
              </div>
              <div className="shrink-0 flex items-center">
                <Link
                  href="/cotizar/express"
                  className="group min-h-[52px] px-8 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 shadow-glow-yellow font-subheading text-base sm:text-lg rounded-full uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
                >
                  <span>Cotizar tu Envío</span>
                  <span className="w-8 h-8 rounded-full bg-[#052C87]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-4 w-4 text-[#052C87]" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

```

---

## 4. Componente: `AboutValues.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutValues.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Handshake, Heart } from 'lucide-react';

export default function AboutValues() {
  const values = [
    {
      title: 'Transparencia Total',
      desc: 'Tarifas públicas por kilómetro exacto según tabla oficial 2026. Sin costos ocultos, sin sorpresas en la liquidación de tus envíos.',
      icon: Handshake,
    },
    {
      title: 'Cuidado del Paquete',
      desc: 'Tratamos cada paquete como si fuera nuestro. Mochilas reforzadas, cajas seguras y manipulación profesional de mercadería frágil.',
      icon: ShieldCheck,
      featured: true,
    },
    {
      title: 'Innovación Tecnológica',
      desc: 'Ruteo optimizado en tiempo real, trazabilidad GPS instantánea y avisos automáticos para tus clientes en Mar del Plata.',
      icon: Heart,
    },
  ];

  return (
    <section 
      id="about-values" 
      className="py-20 sm:py-24 bg-[#052C87] text-white relative z-10 overflow-hidden border-t border-white/10"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0950F6]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-left max-w-2xl mb-16 space-y-3.5">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            FILOSOFÍA OPERATIVA
          </span>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            NUESTROS VALORES
          </h2>
          <p className="text-white/80 font-sans text-base sm:text-lg max-w-prose leading-relaxed">
            Los pilares innegociables que sostienen nuestra operativa diaria en cada rincón de General Pueyrredón.
          </p>
        </div>

        {/* Values Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Featured Value (Cuidado Extremo) - 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl"
          >
            <div className="rounded-[20px] bg-white p-7 sm:p-10 border border-brand-blue-50/50 shadow-sm flex flex-col gap-6 text-brand-blue-700 h-full justify-between">
              <div className="w-14 h-14 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex items-center justify-center border border-brand-blue-100">
                <ShieldCheck className="h-7 w-7 text-[#0950F6]" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-subheading uppercase tracking-wider text-[#052C87] font-bold bg-brand-yellow-500 px-3 py-1 rounded-full w-fit transform -rotate-1 inline-block">
                  Pilar de Confianza
                </span>
                <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                  Cuidado del Paquete
                </h3>
                <p className="text-brand-ink font-sans leading-relaxed text-sm sm:text-base max-w-prose">
                  Manipulación profesional de paquetería e-commerce, indumentaria, tecnología y repuestos. Cada envío viaja seguro y protegido de las inclemencias del clima marplatense.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secondary Values - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {values
              .filter((v) => !v.featured)
              .map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                    className="rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl flex-1"
                  >
                    <div className="rounded-[20px] bg-white p-6 sm:p-7 border border-brand-blue-50/50 shadow-sm flex flex-col gap-4 text-brand-blue-700 h-full justify-between">
                      <div className="w-11 h-11 bg-brand-blue-50 text-brand-blue-700 rounded-xl flex items-center justify-center border border-brand-blue-100 shrink-0">
                        <Icon className="h-5 w-5 text-[#0950F6]" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                          {val.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-ink leading-relaxed font-sans">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>

        </div>

      </div>
    </section>
  );
}

```

---

## 5. Componente: `AboutTimeline.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutTimeline.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Compass, TrendingUp, Award, CheckCircle, Truck, MapPin } from 'lucide-react';

export default function AboutTimeline() {
  const milestones = [
    {
      year: '2019',
      title: 'Lanzamiento Inicial en MDQ',
      desc: 'Iniciamos operaciones con flota propia de motocicletas en las calles céntricas de Mar del Plata, apostando a un servicio ágil y de confianza.',
      icon: Compass,
    },
    {
      year: '2021',
      title: 'Soluciones PyME y LowCost',
      desc: 'Lanzamos la modalidad LowCost agrupada y el Plan Emprendedores para impulsar las ventas online durante la expansión del e-commerce local.',
      icon: TrendingUp,
    },
    {
      year: '2023',
      title: 'Consolidación de Flota Propia',
      desc: 'Estructura propia de repartidores uniformados y coordinados por WhatsApp para garantizar entregas puntuales sin tercerización.',
      icon: Truck,
    },
    {
      year: '2024',
      title: 'Pioneros MercadoLibre Flex en MDQ',
      desc: 'Nos convertimos en el socio logístico de referencia para entregas Same-Day de Mercado Libre en todo General Pueyrredón.',
      icon: CheckCircle,
    },
    {
      year: '2025',
      title: 'Hub Logístico Friuli 1972',
      desc: 'Inauguración de nuestro depósito central en Chauvín con depósitos de paquetería, picking y tecnología de ruteo optimizado.',
      icon: MapPin,
    },
    {
      year: '2026',
      title: 'Infraestructura 3PL y Cobertura Total',
      desc: 'Más de 7 años de trayectoria consolidada con flota propia, cotizadores en tiempo real y fulfillment integral para tiendas online.',
      icon: Award,
    },
  ];

  return (
    <section
      id="about-timeline"
      className="py-20 sm:py-24 bg-[#F8FAFC] relative overflow-hidden border-t border-brand-blue-100/50"
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0950F6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            TRAYECTORIA & EVOLUCIÓN
          </span>
          <h2 className="text-brand-blue-700 text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            NUESTRA HISTORIA
          </h2>
          <p className="text-brand-ink/80 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Más de 7 años transformando la última milla y la mensajería urbana en la ciudad de Mar del Plata.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Line (Desktop) */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-brand-blue-100 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={`${milestone.year}-${milestone.title}`}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Circle Pin on Line */}
                  <div className="hidden sm:flex absolute left-6 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-brand-yellow-500 border-2 border-white shadow-md items-center justify-center z-10 text-brand-blue-900 shadow-glow-yellow">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  {/* Spacer Column for Desktop */}
                  <div className="w-full sm:w-[45%] hidden sm:block" />

                  {/* Card Content Column - Double Bezel */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="w-full sm:w-[45%] rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
                  >
                    <div className="rounded-[20px] bg-white p-5 sm:p-6 border border-brand-blue-50/50 shadow-sm text-brand-blue-700 flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-3xl sm:text-4xl text-[#0950F6] font-bold leading-none tabular-nums">
                          {milestone.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-yellow-50 text-[10px] font-mono text-[#052C87] font-bold uppercase border border-brand-yellow-200 transform -rotate-1">
                          Hito MDQ
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-ink leading-relaxed font-sans">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 6. Componente: `AboutTeam.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutTeam.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Users2, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutTeam() {
  const teamStats = [
    {
      number: '+20',
      role: 'Repartidores en Calle',
      desc: 'Cadetes capacitados y uniformados que conocen cada atajo y zona de Mar del Plata para entregas veloces y seguras.',
      icon: Users2,
      tag: 'Flota Propia',
    },
    {
      number: '100%',
      role: 'Base Operativa en MDQ',
      desc: 'Depósito central en Friuli 1972 para recepción, almacenamiento, consolidación de paquetes y despacho diario.',
      icon: MapPin,
      tag: 'Hub Chauvín',
    },
    {
      number: '< 2h',
      role: 'Tiempo Promedio Express',
      desc: 'Servicio prioritario punto a punto dentro del ejido urbano con monitoreo continuo de ruta.',
      icon: ShieldCheck,
      tag: 'Máxima Velocidad',
    },
    {
      number: '+7',
      role: 'Años de Trayectoria',
      desc: 'Compromiso ininterrumpido con comerciantes, emprendedores y empresas marplatenses.',
      icon: HeartHandshake,
      tag: 'Confianza Local',
    },
  ];

  return (
    <section
      id="about-team"
      className="py-20 sm:py-24 bg-[#052C87] text-white relative z-10 overflow-hidden border-t border-white/10"
    >
      {/* Dynamic ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,#0950F6,transparent_50%)] pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,#FFF12E,transparent_50%)] pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-left max-w-3xl mb-16 space-y-3.5">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            FUERZA OPERATIVA & EXPERIENCIA
          </span>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            NUESTRO EQUIPO EN CALLE
          </h2>
          <p className="text-white/80 font-sans text-base sm:text-lg max-w-prose leading-relaxed">
            Una estructura humana consolidada con base física en la ciudad, lista para responder al ritmo de tu negocio.
          </p>
        </div>

        {/* Team Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl"
              >
                <div className="rounded-[20px] bg-[#052C87] p-6 border border-white/10 shadow-sm flex flex-col justify-between h-full text-white space-y-5 relative overflow-hidden">
                  <Icon className="absolute -right-4 -bottom-4 w-28 h-28 text-white/[0.04] pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-white/10 text-brand-yellow-500 rounded-xl flex items-center justify-center border border-white/15">
                        <Icon className="w-5 h-5 text-brand-yellow-500" />
                      </div>
                      <span className="text-[10px] font-subheading uppercase tracking-wider bg-brand-yellow-500 text-[#052C87] px-2.5 py-0.5 rounded-full font-bold transform -rotate-1">
                        {stat.tag}
                      </span>
                    </div>

                    <span className="block font-mono text-5xl sm:text-6xl font-bold text-brand-yellow-500 leading-none mb-2 tabular-nums">
                      {stat.number}
                    </span>

                    <h3 className="text-xl font-display uppercase tracking-tight text-white leading-tight mb-2">
                      {stat.role}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                      {stat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Image src="/logo-master.svg" alt="Envíos DosRuedas" width={16} height={16} className="object-contain" />
                      Envíos DosRuedas
                    </span>
                    <span className="font-bold text-brand-yellow-500">MDQ 2026</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

```

---

## 7. Componente: `AboutMissionVision.tsx`

> **Path Relativa:** `src/components/nosotros/sobre-nosotros/AboutMissionVision.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AboutMissionVision() {
  return (
    <section
      id="about-mission-vision"
      className="py-20 sm:py-24 bg-brand-white-50 relative overflow-hidden border-t border-brand-blue-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            PROPÓSITO & FUTURO
          </span>
          <h2 className="text-brand-blue-700 text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            MISIÓN, VISIÓN & COMPROMISO
          </h2>
          <p className="text-brand-ink/80 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Hacia dónde vamos y cuáles son las convicciones que guían cada entrega y ruteo diario en Mar del Plata.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Card 1: Nuestra Misión (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue-700 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-blue-50 text-brand-blue-700 rounded-2xl flex items-center justify-center border border-brand-blue-100">
                  <Target className="h-6 w-6 text-[#0950F6]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                  NUESTRA MISIÓN
                </h3>

                <p className="text-sm sm:text-base text-brand-ink leading-relaxed font-sans">
                  Brindar a cada negocio, e-commerce y particular de Mar del Plata una infraestructura de última milla confiable, accesible y ágil. Eliminamos las fricciones logísticas para que nuestros clientes puedan enfocarse en vender más y crecer.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-blue-50 flex items-center gap-2 text-xs font-subheading font-bold uppercase tracking-wider text-[#0950F6]">
                <ShieldCheck className="h-4 w-4 text-brand-yellow-500" />
                <span>COMPROMISO OPERATIVO PERMANENTE</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Nuestra Visión (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue-700 space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-brand-yellow-50 text-brand-blue-900 rounded-2xl flex items-center justify-center border border-brand-yellow-200">
                  <Eye className="h-6 w-6 text-brand-blue-700" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                  NUESTRA VISIÓN
                </h3>

                <p className="text-sm sm:text-base text-brand-ink leading-relaxed font-sans">
                  Ser el estándar indiscutido de logística urbana y fulfillment 3PL en la Costa Atlántica, reconocidos por nuestra puntualidad, tecnología de ruteo y calidez en la atención humana.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-blue-50 flex items-center gap-2 text-xs font-subheading font-bold uppercase tracking-wider text-[#0950F6]">
                <ShieldCheck className="h-4 w-4 text-brand-yellow-500" />
                <span>VISIÓN DE FUTURO 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Compromiso e Innovación CTA (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-12 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal"
          >
            <div className="rounded-[20px] bg-[#052C87] p-6 sm:p-8 border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 text-brand-yellow-500 rounded-xl border border-white/15">
                    <Rocket className="h-6 w-6 text-brand-yellow-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white leading-none">
                    ¿LISTO PARA ENVIAR CON LOS MEJORES?
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
                  Sumate a las cientos de tiendas y emprendimientos de Mar del Plata que confían su logística diaria en Envíos DosRuedas. Cotizá en línea o hablá hoy con un asesor comercial.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <Link
                  href="/cotizar/express"
                  className="group min-h-[52px] px-8 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 shadow-glow-yellow font-subheading text-base sm:text-lg rounded-full uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
                >
                  <span>Cotizar Envío</span>
                  <span className="w-8 h-8 rounded-full bg-[#052C87]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-4 w-4 text-[#052C87]" />
                  </span>
                </Link>
                <Link
                  href="/contacto"
                  className="min-h-[52px] px-6 py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-subheading uppercase text-sm sm:text-base tracking-wider font-bold transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  Contactar Asesor
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
```

