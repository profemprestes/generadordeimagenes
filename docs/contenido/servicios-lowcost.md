# 📄 Nodo: Servicio Envíos LowCost

> **URL:** `/servicios/envios-lowcost`  
> **Path Relativa Página:** `src/app/servicios/envios-lowcost/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/servicios/envios-lowcost/page.tsx` | Server Component [SC] |
| Componente | `src/components/servicios/lowcost/LowCostHero.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/lowcost/LowCostFeatures.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/lowcost/LowCostPricing.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/lowcost/LowCostBenefits.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/lowcost/LowCostHowItWorks.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/servicios/envios-lowcost/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import LowCostHero from '@/src/components/servicios/lowcost/LowCostHero';
import LowCostFeatures from '@/src/components/servicios/lowcost/LowCostFeatures';
import LowCostPricing from '@/src/components/servicios/lowcost/LowCostPricing';
import LowCostBenefits from '@/src/components/servicios/lowcost/LowCostBenefits';
import LowCostHowItWorks from '@/src/components/servicios/lowcost/LowCostHowItWorks';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Paquetería E-Commerce, Servicio de Cadetería y Encomiendas LowCost | Envíos DosRuedas',
  description:
    'Paquetería e-commerce, servicio de cadetería y servicio de encomiendas más rentable en Mar del Plata. Pedidos solicitados antes de las 13:00 hs se entregan en el día antes de las 19:00 hs. Tarifas 2026.',
  keywords: [
    'paqueteria ecommerce',
    'servicio de cadeteria',
    'servicio de encomiendas',
    'envios lowcost mar del plata',
    'cadeteria economica mar del plata',
  ],
  alternates: {
    canonical: `${baseUrl}/servicios/envios-lowcost`,
  },
  openGraph: {
    title: 'Paquetería E-Commerce y Servicio de Encomiendas LowCost | Envíos DosRuedas',
    description:
      'El servicio de cadetería y encomiendas más económico de Mar del Plata. Pedidos antes de las 13:00 hs se entregan antes de las 19:00 hs.',
    url: `${baseUrl}/servicios/envios-lowcost`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Paquetería E-Commerce, Servicio de Cadetería y Encomiendas LowCost en Mar del Plata',
  description:
    'Servicio de paquetería e-commerce, cadetería y encomiendas programadas de máxima rentabilidad en Mar del Plata. Pedidos ingresados antes de las 13:00 hs con entrega garantizada antes de las 19:00 hs.',
  url: `${baseUrl}/servicios/envios-lowcost`,
  provider: {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'Envíos DosRuedas',
    telephone: '+54-223-660-2699',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Friuli 1972',
      addressLocality: 'Mar del Plata',
      addressRegion: 'Buenos Aires',
      postalCode: '7600',
      addressCountry: 'AR',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Mar del Plata',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tarifas LowCost Vigentes 2026',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'LowCost 0 a 3 km',
        price: '3000',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'LowCost 3 a 5 km',
        price: '4000',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'LowCost 5 a 7 km',
        price: '5300',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'LowCost 7 a 10 km',
        price: '7000',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'LowCost +10 km',
        price: '7000',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        description: '$7.000 base más $700 por kilómetro adicional entero',
      },
    ],
  },
};

export default function EnviosLowCostPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-brand-blue-700 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header Block — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <LowCostHero />
      </section>

      {/* Ruteo masivo features — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <LowCostFeatures />
      </section>

      {/* 2026 Zone Pricing rates table — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <LowCostPricing />
      </section>

      {/* Structured logistics benefits grid — Deep Midnight Navy (#052C87) */}
      <section className="relative z-10 bg-[#052C87] font-sans">
        <LowCostBenefits />
      </section>

      {/* Step by step operation diagram — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <LowCostHowItWorks />
      </section>
    </main>
  );
}

```

---

## 2. Componente: `LowCostHero.tsx`

> **Path Relativa:** `src/components/servicios/lowcost/LowCostHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeroProceduralBackground from '@/components/ui/HeroProceduralBackground';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Phone,
  TrendingDown,
  Clock,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function LowCostHero() {
  const [activeTab, setActiveTab] = useState<'ahorro' | 'franjas'>('ahorro');

  return (
    <section
      id="lowcost-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Pure Vector & Dynamic Procedural Background */}
      <HeroProceduralBackground variant="lowcost" />

      {/* Ghost Wordmark Monumental de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display uppercase text-[16vw] leading-none text-white/[0.035] tracking-tighter whitespace-nowrap">
          PAQUETERÍA LOWCOST
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Kinetic Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Speed Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rotate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-subheading font-bold uppercase tracking-widest bg-[#052C87] border border-[#FFF12E]/30 text-[#FFF12E] shadow-glow-yellow"
            >
              <TrendingDown className="h-4 w-4 text-[#FFF12E] shrink-0" />
              <span>PAQUETERÍA E-COMMERCE Y CADETERÍA ECONÓMICA · MDQ 2026</span>
            </motion.div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">PAQUETERÍA E-COMMERCE Y</span>
              <span className="block text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.35)]">
                ENCOMIENDAS LOWCOST
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-blue-100 mt-1">
                EL SERVICIO DE CADETERÍA MÁS RENTABLE
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-2 border-[#FFF12E] font-light">
              Solución en paquetería e-commerce, servicio de cadetería y servicio de encomiendas programadas en Mar del Plata. Pedidos solicitados antes de las 13:00 hs se entregan en el día antes de las 19:00 hs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/cotizar/lowcost"
                id="lowcost-hero-cta-cotizar"
                className="group inline-flex items-center justify-between gap-4 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Cotizá tu lote LowCost</span>
                <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-[#052C87]" />
                </span>
              </Link>

              <a
                href="https://wa.me/542236602699"
                target="_blank"
                rel="noopener noreferrer"
                id="lowcost-hero-cta-whatsapp"
                className="group inline-flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Hablar por WhatsApp</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <Phone className="h-4 w-4 text-white" />
                </span>
              </a>
            </div>

            {/* Quick KPI Chips */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  $3.000
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Base 0-3 km 2026
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  13:00 hs
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Horario de Corte
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  Antes 19:00 hs
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Entrega Misma Jornada
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Double Bezel Mini-Comparador Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-[28px] shadow-2xl">
              <div className="bg-white p-5 sm:p-7 rounded-[20px] border border-brand-blue-50/50 shadow-sm text-[#0950F6] space-y-5 relative overflow-hidden">
                {/* Giant Watermark Icon */}
                <TrendingDown className="absolute -bottom-6 -right-6 h-48 w-48 text-[#0950F6]/[0.04] pointer-events-none select-none" />
                {/* Header with status badge */}
                <div className="flex items-center justify-between border-b border-brand-blue-100/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow-500" />
                    </span>
                    <span className="font-subheading text-xs uppercase tracking-wider font-bold text-brand-blue-700">
                      CIRCUITOS ACTIVOS MDQ
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-brand-blue-50 text-brand-blue-700 px-2.5 py-1 rounded-lg border border-brand-blue-100">
                    CONSOLIDADO
                  </span>
                </div>

                {/* Interactive Segmented Toggle */}
                <div className="grid grid-cols-2 p-1 bg-brand-blue-50 rounded-xl border border-brand-blue-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ahorro')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'ahorro'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Ventajas Ahorro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('franjas')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'franjas'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>Horario y Corte</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'ahorro' ? (
                      <motion.div
                        key="ahorro"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3"
                      >
                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <CheckCircle2 className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Paquetería E-Commerce Rentable
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Optimización en paquetería e-commerce y encomiendas para bajar costos de envío significativamente.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <Layers className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Servicio de Cadetería Flexible
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Ideal para emprendedores con envíos esporádicos o volúmenes diarios ruteados.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <ShieldCheck className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Seguimiento y Notificaciones
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Notificaciones directas vía WhatsApp para cada despacho en Mar del Plata.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="franjas"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3"
                      >
                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-brand-yellow-500" />
                              Corte Solicitud
                            </span>
                            <span className="font-mono text-brand-blue-500 font-bold">13:00 hs Límite</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Pedí tu servicio de encomiendas o cadetería antes de las 13:00 hs para entrega el mismo día.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-brand-yellow-500" />
                              Horario de Entrega
                            </span>
                            <span className="font-mono text-brand-blue-500 font-bold">Antes de 19:00 hs</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Entregas continuas ruteadas en el transcurso del día sin elección de hora puntual.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 flex items-center justify-between text-xs font-subheading uppercase font-bold text-brand-blue-700">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-brand-yellow-500" />
                            Todo Mar del Plata
                          </span>
                          <span className="text-brand-blue-500">100% Cobertura</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer trust strip */}
                <div className="pt-3 border-t border-brand-blue-100 flex items-center justify-between text-[11px] font-subheading uppercase tracking-wider text-brand-blue-600 font-bold">
                  <span>Tarifa Vigente 2026</span>
                  <span className="text-brand-blue-700 font-mono text-xs">Excedente $700/km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

---

## 3. Componente: `LowCostFeatures.tsx`

> **Path Relativa:** `src/components/servicios/lowcost/LowCostFeatures.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Route, Clock, Landmark, Coins } from 'lucide-react';

export default function LowCostFeatures() {
  const features = [
    {
      title: 'Eficiencia en Ruteo',
      desc: 'Ruteo diario masivo optimizado de última milla. No se elige rango horario para maximizar la eficiencia logística y bajar costos.',
      icon: Route,
    },
    {
      title: 'Corte y Entrega',
      desc: 'Pedidos ingresados antes de las 13:00 hs se entregan de forma totalmente garantizada antes de las 19:00 hs del mismo día.',
      icon: Clock,
    },
    {
      title: 'Tarifa Económica',
      desc: 'La mejor tarifa de Mar del Plata para envíos masivos agrupados, ruteos continuos y entregas a clientes finales.',
      icon: Coins,
    },
  ];

  return (
    <section
      id="lowcost-features"
      className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden border-t border-brand-blue-100"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Header column (Left) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading uppercase font-bold tracking-widest shadow-sm">
              MÁXIMA RENTABILIDAD
            </span>

            <h2 className="text-[#0950F6] text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight leading-[0.98] border-l-4 border-[#FFF12E] pl-4">
              ENVÍOS LOWCOST: <br />
              <span className="text-[#052C87] bg-[#FFF12E] px-2 py-0.5 inline-block mt-1 font-bold">MÁXIMA EFICIENCIA</span>
            </h2>

            <p className="text-[#00277C] text-base leading-relaxed font-sans">
              Nuestro servicio LowCost está diseñado para el ruteo diario masivo. Optimizamos nuestras rutas agrupando despachos para ofrecer la tarifa más competitiva, garantizando la entrega en el día para pedidos ingresados antes del horario de corte.
            </p>

            <div className="pt-4 flex items-center gap-3.5 text-sm text-[#0950F6] font-bold uppercase tracking-wider font-subheading">
              <Landmark className="h-5 w-5 text-[#FFF12E] shrink-0 fill-current" />
              <span>LOGÍSTICA PREDECIBLE PARA NEGOCIOS</span>
            </div>
          </div>

          {/* Features columns (Right) - Bento Grid layout with Double-Bezel cards */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              // Asymmetric Bento Grid spans
              const spanClass = idx === 0
                ? 'lg:col-span-12'
                : idx === 1
                  ? 'lg:col-span-7'
                  : 'lg:col-span-5';

              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -5,
                    x: 2,
                    boxShadow: "0 20px 40px -15px rgba(6, 54, 165, 0.15), 0 0 25px -5px rgba(255, 236, 1, 0.2)"
                  }}
                  className={`${spanClass} bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col group cursor-pointer relative overflow-hidden`}
                >
                  <div className="bg-white p-6 rounded-[20px] border border-brand-blue-50/50 shadow-sm flex flex-col md:flex-row gap-5 items-start h-full relative overflow-hidden">
                    {/* Giant Watermark Icon */}
                    <Icon className="absolute -bottom-6 -right-6 h-32 w-32 text-[#0950F6]/[0.05] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                    <div className="p-3 bg-[#0950F6] text-[#FFF12E] rounded-xl shrink-0 border border-[#0950F6] shadow-md group-hover:bg-[#FFF12E] group-hover:text-[#052C87] transition-colors duration-300 relative z-10">
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <div className="space-y-1.5 relative z-10">
                      <h4 className="text-xl font-display uppercase tracking-wider text-[#0950F6] leading-tight group-hover:text-[#052C87] transition-colors duration-300">
                        {feat.title}
                      </h4>
                      <p className="text-sm text-[#00277C]/80 font-sans leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
```

---

## 4. Componente: `LowCostPricing.tsx`

> **Path Relativa:** `src/components/servicios/lowcost/LowCostPricing.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, MessageSquare, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Sparkles } from '@/src/components/ui/sparkles';
import { TimelineContent } from '@/src/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/src/components/ui/vertical-cut-reveal';
import NumberFlow from '@number-flow/react';

export default function LowCostPricing() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const zones = [
    {
      name: 'Zona 1',
      scope: 'Hasta 3 km',
      price: '$3.000',
      description: 'La mejor tarifa para ruteo diario de cercanía.',
      bullets: ['Eficiencia en ruteo masivo', 'Corte de carga 13:00 hs', 'Entrega antes de las 19:00 hs', 'SLA de entrega garantizada'],
      highlight: false,
    },
    {
      name: 'Zona 2',
      scope: '3 a 5 km',
      price: '$4.000',
      description: 'Cobertura intermedia económica para PyMEs.',
      bullets: ['Eficiencia en ruteo masivo', 'Corte de carga 13:00 hs', 'Entrega antes de las 19:00 hs', 'SLA de entrega garantizada'],
      highlight: true,
    },
    {
      name: 'Zona 3',
      scope: '5 a 7 km',
      price: '$5.300',
      description: 'Llegamos a distancias medias al mejor costo.',
      bullets: ['Eficiencia en ruteo masivo', 'Corte de carga 13:00 hs', 'Entrega antes de las 19:00 hs', 'SLA de entrega garantizada'],
      highlight: false,
    },
    {
      name: 'Zona 4',
      scope: '7 a 10 km',
      price: '$7.000',
      description: 'Máximo ahorro en distancias urbanas largas.',
      bullets: ['Eficiencia en ruteo masivo', 'Corte de carga 13:00 hs', 'Entrega antes de las 19:00 hs', 'SLA de entrega garantizada'],
      highlight: false,
    },
  ];

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <section
      id="lowcost-pricing"
      className="py-24 bg-[#0950F6] relative overflow-hidden text-white border-t border-b border-white/10"
      ref={pricingRef}
    >
      {/* Background Sparkles overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)] opacity-30">
        <Sparkles
          density={1200}
          direction="bottom"
          speed={0.8}
          color="#FFFFFF"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <TimelineContent
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            as="span"
            className="-rotate-1 px-4 py-1.5 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading uppercase tracking-widest inline-block font-bold shadow-glow-yellow"
          >
            TARIFARIO INTELIGENTE 2026
          </TimelineContent>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white flex justify-center leading-[0.98]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
            >
              TARIFAS 2026 ENVÍOS LOWCOST
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            as="p"
            className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Eficiencia en ruteo masivo. Garantizamos entregas antes de las 19:00 hs para pedidos cargados antes de las 13:00 hs.
          </TimelineContent>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Pricing Cards Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {zones.map((zone, idx) => {
            const isNumericPrice = zone.price.startsWith('$');
            const numericValue = isNumericPrice ? parseInt(zone.price.replace('$', '').replace('.', '')) : null;

            // Asymmetric layout
            const spanClass = 'lg:col-span-3';

            return (
              <TimelineContent
                key={zone.name}
                animationNum={2 + idx}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                as="div"
                className={`${spanClass} bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col`}
              >
                <Card
                  className={`border-0 bg-white text-[#052C87] rounded-[20px] p-6 flex flex-col justify-between h-full transition-all duration-300 group text-left shadow-none relative overflow-hidden ${
                    zone.highlight ? 'ring-2 ring-[#FFF12E]' : ''
                  }`}
                >
                  <CardHeader className="p-0 pb-4 text-left relative z-10">
                    {zone.highlight && (
                      <span className="-rotate-1 inline-block self-start mb-3 bg-[#FFF12E] text-[#052C87] font-bold font-subheading text-xs tracking-wider px-3 py-1 rounded-full shadow-glow-yellow">
                        RECOMENDADO PYME
                      </span>
                    )}

                    <div>
                      <span className="text-xs font-subheading tracking-wider uppercase text-[#0950F6] font-bold">
                        {zone.name}
                      </span>
                      <h3 className="text-2xl font-display uppercase tracking-wider mt-1 min-h-[48px] leading-tight text-[#052C87] font-bold">
                        {zone.scope}
                      </h3>
                    </div>

                    <div className="py-2">
                      {isNumericPrice && numericValue ? (
                        <div className="flex items-baseline">
                          <span className="text-4xl sm:text-5xl font-mono tabular-nums uppercase font-bold tracking-tight text-[#052C87]">
                            $
                            <NumberFlow
                              value={numericValue}
                              format={{ minimumFractionDigits: 0 }}
                              className="inline-block font-mono tabular-nums"
                            />
                          </span>
                        </div>
                      ) : (
                        <span className="text-4xl sm:text-5xl font-mono tabular-nums uppercase font-bold tracking-tight text-[#052C87]">
                          {zone.price}
                        </span>
                      )}
                      <span className="text-xs font-subheading tracking-wider uppercase block mt-1 text-[#3570F8]">/ despacho final</span>
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed font-sans min-h-[48px] text-[#00277C]/80">
                      {zone.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-0 pt-0 flex flex-col justify-between flex-grow relative z-10">
                    {/* Bullets */}
                    <ul className="space-y-2.5 pt-4 border-t border-brand-blue-100 mb-6">
                      {zone.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-xs text-[#00277C]">
                          <Check className="h-4 w-4 shrink-0 text-[#0950F6]" />
                          <span className="font-sans text-xs">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <Link
                        href="/cotizar/lowcost"
                        className="group w-full inline-flex items-center justify-between gap-2 bg-[#0950F6] hover:bg-[#0742CA] text-white font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0950F6]"
                      >
                        <span>Ver {zone.name}</span>
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4 shrink-0 text-white" />
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TimelineContent>
            );
          })}
        </div>

        {/* Zona 5 / Special Dynamic Quote Box */}
        <TimelineContent
          animationNum={6}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          as="div"
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float"
        >
          <div className="bg-[#052C87] text-white rounded-[20px] p-8 relative overflow-hidden text-left border border-white/10 shadow-sm">
            {/* Background icon watermark */}
            <Landmark className="absolute -bottom-8 -right-8 h-64 w-64 text-white/[0.04] pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="-rotate-1 inline-block px-4 py-1 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-glow-yellow">
                  ZONA 5 (MÁS DE 10 KM)
                </span>
                <h3 className="text-3xl font-mono tabular-nums uppercase tracking-tight text-white font-bold">
                  $7.000 Base + $700 x km adicional
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed font-sans max-w-2xl">
                  Para envíos de larga distancia fuera del ejido urbano masivo tradicional (+10 km), aplicamos tarifa base de 7 a 10 km (<span className="font-mono tabular-nums">$7.000</span>) más <span className="font-mono tabular-nums">$700</span> por kilómetro adicional entero para que sigas ruteando con máxima rentabilidad.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href="https://wa.me/542236602699"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="lowcost-pricing-cta-whatsapp"
                  className="group inline-flex items-center justify-between gap-3 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] shadow-glow-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] w-full sm:w-auto"
                >
                  <span>Consultar por WhatsApp</span>
                  <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    <MessageSquare className="h-4 w-4 shrink-0 text-[#052C87]" />
                  </span>
                </a>
              </div>

            </div>
          </div>
        </TimelineContent>

      </div>
    </section>
  );
}

```

---

## 5. Componente: `LowCostBenefits.tsx`

> **Path Relativa:** `src/components/servicios/lowcost/LowCostBenefits.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Route, Clock, Coins, TrendingDown 
} from 'lucide-react';

export default function LowCostBenefits() {
  const benefits = [
    {
      title: 'Entregas a valores LowCost con las condiciones de express',
      desc: 'Disfrutá del mejor precio con un servicio rápido y seguro que se adapta a vos.',
      icon: Coins,
    },
    {
      title: 'Horario de corte extendido hasta 13hs',
      desc: 'Ingresá tus envíos del día hasta las 13:00 hs y los entregamos en la misma jornada antes de las 19:00 hs.',
      icon: Clock,
    },
    {
      title: 'Ruteo Urbano Eficiente',
      desc: 'Ruteo continuo optimizado que permite la máxima velocidad de entrega en Mar del Plata.',
      icon: Route,
    },
    {
      title: 'Ahorro de costos logísticos',
      desc: 'Maximizá tu rentabilidad pagando tarifas súper económicas por cada entrega.',
      icon: TrendingDown,
    },
  ];

  return (
    <section 
      id="lowcost-benefits" 
      className="py-24 bg-[#052C87] relative z-10 overflow-hidden border-t border-b border-white/10 text-white"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
      >
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading uppercase font-bold tracking-widest shadow-glow-yellow">
            VENTAJAS CLAVE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white leading-[0.98]">
            BENEFICIOS LOWCOST
          </h2>
          <p className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            La combinación perfecta entre economía inteligente y máxima eficiencia logística para la consolidación de tu negocio.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Benefits Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            const spanClass = 'lg:col-span-6';

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, x: 2 }}
                className={`${spanClass} bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col justify-between text-left group relative overflow-hidden`}
              >
                <div className="bg-white text-[#052C87] p-8 rounded-[20px] h-full space-y-5 relative overflow-hidden">
                  {/* Giant Watermark Icon */}
                  <Icon className="absolute -bottom-6 -right-6 h-36 w-32 text-[#0950F6]/[0.05] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                  <div className="p-3 bg-[#0950F6] text-[#FFF12E] rounded-xl w-fit border border-[#0950F6] shadow-sm relative z-10">
                    <Icon className="h-6 w-6 shrink-0" />
                  </div>
                  
                  <h3 className="text-xl font-display uppercase tracking-wide text-[#052C87] font-bold leading-tight relative z-10">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-sm text-[#00277C]/80 font-sans leading-relaxed relative z-10">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

```

---

## 6. Componente: `LowCostHowItWorks.tsx`

> **Path Relativa:** `src/components/servicios/lowcost/LowCostHowItWorks.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Truck, CheckSquare } from 'lucide-react';

export default function LowCostHowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Solicitud',
      desc: 'Nos solicitás el envío por WhatsApp.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Retiro',
      desc: 'Retiramos el paquete por tu local o depósito en el transcurso del día.',
      icon: Truck,
    },
    {
      number: '03',
      title: 'Entrega',
      desc: 'Entregamos de forma segura en manos de tu destinatario.',
      icon: CheckSquare,
    },
  ];

  return (
    <section 
      id="lowcost-how-it-works" 
      className="py-24 bg-[#F8FAFC] relative overflow-hidden border-t border-brand-blue-100"
    >
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
      >
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading uppercase font-bold tracking-widest shadow-sm">
            PASO A PASO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-[#0950F6] border-l-4 border-[#FFF12E] pl-4 inline-block leading-[0.98]">
            ¿CÓMO FUNCIONA?
          </h2>
          <p className="text-[#00277C] font-sans text-sm sm:text-base max-w-lg mx-auto">
            Un proceso simple, transparente y diseñado milimétricamente para maximizar tu productividad logística.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Steps Grid Bento Layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="absolute top-[2.4rem] left-12 right-12 h-1 bg-[#0950F6]/20 hidden lg:block -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const spanClass = 'lg:col-span-4';

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, x: 2 }}
                className={`${spanClass} bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 relative flex flex-col group overflow-hidden`}
              >
                <div className="bg-white p-6 rounded-[20px] border border-brand-blue-50/50 shadow-sm h-full flex flex-col items-center text-center relative overflow-hidden">
                  {/* Giant Watermark Icon */}
                  <Icon className="absolute -bottom-6 -right-6 h-32 w-32 text-[#0950F6]/[0.05] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                  {/* Floating step number */}
                  <span className="-rotate-1 absolute top-3 left-3 bg-[#FFF12E] text-[#052C87] font-bold font-mono tabular-nums text-xs tracking-widest px-3 py-1 rounded-full shadow-glow-yellow z-10">
                    PASO {step.number}
                  </span>

                  {/* Circle Icon wrapper */}
                  <div className="h-16 w-16 bg-[#0950F6] text-[#FFF12E] border border-[#0950F6] rounded-2xl flex items-center justify-center mt-4 mb-5 shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10">
                    <Icon className="h-6 w-6 shrink-0" />
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl font-display uppercase tracking-wider text-[#0950F6] font-bold leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#00277C]/80 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}

```

