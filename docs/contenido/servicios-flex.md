# 📄 Nodo: Servicio Envíos Flex

> **URL:** `/servicios/enviosflex`  
> **Path Relativa Página:** `src/app/servicios/enviosflex/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/servicios/enviosflex/page.tsx` | Server Component [SC] |
| Componente | `src/components/servicios/flex/FlexHero.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/flex/FlexFeatures.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/flex/FlexBenefits.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/flex/FlexPricing.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/flex/FlexHowItWorks.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/flex/FlexRequirements.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/servicios/enviosflex/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import FlexHero from '@/src/components/servicios/flex/FlexHero';
import FlexFeatures from '@/src/components/servicios/flex/FlexFeatures';
import FlexBenefits from '@/src/components/servicios/flex/FlexBenefits';
import FlexPricing from '@/src/components/servicios/flex/FlexPricing';
import FlexHowItWorks from '@/src/components/servicios/flex/FlexHowItWorks';
import FlexRequirements from '@/src/components/servicios/flex/FlexRequirements';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Envíos Flex, Reparto MercadoLibre y Logística Flex Mar del Plata | Envíos DosRuedas',
  description:
    'Socio logístico especialista en envíos flex y reparto MercadoLibre en Mar del Plata. SLA 100% entregas en el día para proteger tu reputación MercadoLíder. Horario de corte 15:00 hs, entregas antes de las 20:00 hs, sin mínimo de paquetes.',
  keywords: [
    'envios flex',
    'reparto mercadolibre',
    'logistica flex',
    'envios flex mar del plata',
    'mercado envios flex mar del plata',
  ],
  alternates: {
    canonical: `${baseUrl}/servicios/enviosflex`,
  },
  openGraph: {
    title: 'Envíos Flex, Reparto MercadoLibre y Logística Flex | Envíos DosRuedas',
    description:
      'Logística flex y reparto MercadoLibre Same-Day en Mar del Plata. SLA 100% entregas garantizadas en el día, corte 15:00 hs y múltiples retiros sin mínimos.',
    url: `${baseUrl}/servicios/enviosflex`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Envíos Flex, Reparto MercadoLibre y Logística Flex en Mar del Plata',
  description:
    'Solución integral en envíos flex, reparto MercadoLibre y logística flex en Mar del Plata. SLA de 100% entregas en el día para proteger reputación MercadoLíder. Horario de corte 15:00 hs, entregas antes de las 20:00 hs, múltiples retiros diarios sin mínimo de envíos.',
  url: `${baseUrl}/servicios/enviosflex`,
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
    name: 'Servicios Flex para Vendedores ML',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Logística Flex Emprendedor',
        description: 'Retiros diarios sin mínimos y 100% de entregas Same-Day antes de las 20:00 hs',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Reparto MercadoLibre Alto Volumen',
        description: 'Múltiples retiros diarios y soporte dedicado vía WhatsApp para MercadoLíderes',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
};

export default function EnviosFlexPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-brand-blue-700 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header Block — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <FlexHero />
      </section>

      {/* MercadoLibre expert key features — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <FlexFeatures />
      </section>

      {/* Seller value-added benefits grid — Deep Midnight Navy (#052C87) */}
      <section className="relative z-10 bg-[#052C87] font-sans">
        <FlexBenefits />
      </section>

      {/* Pricing levels and weather discounts — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <FlexPricing />
      </section>

      {/* Step by step streamlined workflow — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <FlexHowItWorks />
      </section>

      {/* Active prerequisites for starting — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <FlexRequirements />
      </section>
    </main>
  );
}

```

---

## 2. Componente: `FlexHero.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexHero.tsx`  
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
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  QrCode,
  Award,
} from 'lucide-react';

export default function FlexHero() {
  const [activeTab, setActiveTab] = useState<'ventajas' | 'integracion'>('ventajas');

  return (
    <section
      id="flex-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Pure Vector & Dynamic Procedural Background */}
      <HeroProceduralBackground variant="flex" />

      {/* Ghost Wordmark Monumental de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display uppercase text-[16vw] leading-none text-white/[0.035] tracking-tighter whitespace-nowrap">
          LOGÍSTICA FLEX
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
              className="-rotate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-subheading font-bold uppercase tracking-widest bg-[#052C87] border border-[#FFF12E]/30 text-[#FFF12E] shadow-glow-yellow"
            >
              <Award className="h-4 w-4 text-[#FFF12E] shrink-0" />
              <span>ENVÍOS FLEX Y REPARTO MERCADOLIBRE · MDQ 2026</span>
            </motion.div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">ENVÍOS FLEX Y</span>
              <span className="block text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.35)]">
                REPARTO MERCADOLIBRE
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-blue-100 mt-1">
                LOGÍSTICA FLEX CON 100% CUMPLIMIENTO
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-2 border-[#FFF12E] font-light">
              Líderes en envíos flex, reparto MercadoLibre y logística flex en Mar del Plata. SLA real con 100% de entregas en el día antes de las 20:00 hs para proteger la reputación de MercadoLíder. Horario de corte 15:00 hs y múltiples retiros diarios sin mínimos de paquetes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/cotizar/lowcost"
                id="flex-hero-cta-activar"
                className="group inline-flex items-center justify-between gap-4 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Activar Envíos Flex</span>
                <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-[#052C87]" />
                </span>
              </Link>

              <a
                href="https://wa.me/542236602699"
                target="_blank"
                rel="noopener noreferrer"
                id="flex-hero-cta-whatsapp"
                className="group inline-flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Contactar Asesor Flex</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <Phone className="h-4 w-4 text-white" />
                </span>
              </a>
            </div>

            {/* Quick KPI Chips */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  15:00 hs
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Horario de Corte
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  100%
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Entregas en el Día
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  Sin Mínimos
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Retiros Múltiples
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Double Bezel Mini-Comparador Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-[28px] shadow-2xl">
              <div className="bg-white p-5 sm:p-7 rounded-[20px] border border-brand-blue-50/50 shadow-sm text-[#0950F6] space-y-5 relative overflow-hidden">
                {/* Giant Watermark Icon */}
                <Award className="absolute -bottom-6 -right-6 h-48 w-48 text-[#0950F6]/[0.04] pointer-events-none select-none" />
                {/* Header with status badge */}
                <div className="flex items-center justify-between border-b border-brand-blue-100/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow-500" />
                    </span>
                    <span className="font-subheading text-xs uppercase tracking-wider font-bold text-brand-blue-700">
                      INTEGRACIÓN LOGÍSTICA FLEX
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-brand-blue-50 text-brand-blue-700 px-2.5 py-1 rounded-lg border border-brand-blue-100">
                    SLA 100%
                  </span>
                </div>

                {/* Interactive Segmented Toggle */}
                <div className="grid grid-cols-2 p-1 bg-brand-blue-50 rounded-xl border border-brand-blue-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ventajas')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'ventajas'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Ventajas MercadoLíder</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('integracion')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'integracion'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 shrink-0" />
                    <span>Proceso QR</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'ventajas' ? (
                      <motion.div
                        key="ventajas"
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
                              Corte a las 15:00 hs
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Procesamos tus envíos flex recibidos hasta las 15:00 hs con entregas aseguradas antes de las 20:00 hs.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <ShieldCheck className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Protección de Reputación
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              100% de entregas en el día para mantener tu reputación y medalla de MercadoLíder impecable.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <Zap className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Sin Mínimos y Múltiples Retiros
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Retiramos en tu local cuantas veces sea necesario en el día sin mínimo de paquetes.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="integracion"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3"
                      >
                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>1. Imprimís tus etiquetas Flex</span>
                            <span className="text-brand-blue-500 font-mono">Paso 1</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Generás las etiquetas de MercadoLibre con código QR habitual.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>2. Escaneo en mano</span>
                            <span className="text-brand-blue-500 font-mono">Paso 2</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Nuestro cadete escanea el paquete con la app oficial al retirar en tu dirección.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>3. Entrega Same-Day</span>
                            <span className="text-brand-blue-500 font-mono">Paso 3</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Entrega final antes de las 20:00 hs asegurando tu reputación.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer trust strip */}
                <div className="pt-3 border-t border-brand-blue-100 flex items-center justify-between text-[11px] font-subheading uppercase tracking-wider text-brand-blue-600 font-bold">
                  <span>Reparto MercadoLibre MDQ</span>
                  <span className="text-brand-blue-700 font-mono text-xs">Corte 15:00 hs</span>
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

## 3. Componente: `FlexFeatures.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexFeatures.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Truck, Clock, Coins } from 'lucide-react';

export default function FlexFeatures() {
  const features = [
    {
      title: 'Recolección gratis',
      desc: 'Retiramos tus paquetes sin costo adicional directamente por tu local o depósito.',
      icon: Truck,
    },
    {
      title: 'Entrega en el día antes de 20hs.',
      desc: 'Garantizamos que tus clientes reciban sus compras el mismo día antes de las 20:00 hs.',
      icon: Clock,
    },
    {
      title: 'Tarifas LowCost.',
      desc: 'Tarifas competitivas súper económicas para cuidar la rentabilidad de cada una de tus ventas.',
      icon: Coins,
    },
    {
      title: 'Horario de corte: 15hs.',
      desc: 'Recibimos y procesamos tus despachos del día hasta las 15:00 hs de manera garantizada.',
      icon: Clock,
    },
  ];

  return (
    <section
      id="flex-features"
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
            <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-sm">
              MERCADOLIBRE EXPERTS
            </span>

            <h2 className="text-[#0950F6] text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight leading-[0.98] border-l-4 border-[#FFF12E] pl-4">
              DOMINÁ TUS VENTAS <br />
              <span className="text-[#052C87] bg-[#FFF12E] px-2 py-0.5 inline-block mt-1 font-bold">CON ENVÍOS FLEX</span>
            </h2>

            <p className="text-[#00277C] text-base leading-relaxed font-sans">
              Somos el aliado estratégico definitivo para vendedores de MercadoLibre en Mar del Plata. Optimizamos tus Envíos Same-Day Mar del Plata para que vos solo te preocupes por publicar, atender clientes y vender más de lo que imaginás.
            </p>

            <div className="pt-4 flex items-center gap-3.5 text-sm text-[#0950F6] font-bold uppercase tracking-wider font-subheading">
              <Truck className="h-5 w-5 text-[#FFF12E] shrink-0 fill-current" />
              <span>COBERTURA TOTAL EN MAR DEL PLATA</span>
            </div>
          </div>

          {/* Features columns (Right) - Bento Grid layout with Double-Bezel cards */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              const spanClass = 'lg:col-span-6';

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

## 4. Componente: `FlexBenefits.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexBenefits.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, Award, RefreshCw, Compass, Users 
} from 'lucide-react';

export default function FlexBenefits() {
  const benefits = [
    {
      title: 'Corte 15:00 hs',
      desc: 'Despachá tus ventas hasta las 15:00 hs para entrega garantizada en el mismo día. Más tiempo de ventas online.',
      icon: Clock,
    },
    {
      title: 'Reputación Intacta',
      desc: 'Cumplimos con rigor tus acuerdos de nivel de servicio (SLAs) para que mantengas tu estatus de MercadoLíder sin sobresaltos.',
      icon: Award,
    },
    {
      title: 'Devoluciones sin cargo',
      desc: 'Si el comprador rechaza el producto en el domicilio por cualquier causa, la devolución a tu local es totalmente SIN CARGO.',
      icon: RefreshCw,
    },
    {
      title: 'Cobertura MDP',
      desc: 'Cubrimos absolutamente todas las zonas de entrega habilitadas por MercadoLibre Flex en la ciudad de Mar del Plata.',
      icon: Compass,
    },
    {
      title: 'Choferes Calificados',
      desc: 'Contamos con personal altamente capacitado para brindar la mejor experiencia de entrega y atención a tus clientes finales.',
      icon: Users,
    },
  ];

  return (
    <section 
      id="flex-benefits" 
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
            SOCIOS ESTRATÉGICOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white leading-[0.98]">
            BENEFICIOS PARA VENDEDORES
          </h2>
          <p className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            La solución definitiva para llevar tu tienda o e-commerce de MercadoLibre al siguiente nivel de competitividad.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Benefits Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            let spanClass = 'lg:col-span-4';
            if (idx === 0 || idx === 1) spanClass = 'lg:col-span-6';

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
                <div className="bg-white p-8 rounded-[20px] h-full space-y-5 text-[#052C87] relative overflow-hidden">
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

## 5. Componente: `FlexPricing.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexPricing.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useRef } from 'react';
import { Check, ArrowRight, MessageSquare, CloudRain } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Sparkles } from '@/src/components/ui/sparkles';
import { TimelineContent } from '@/src/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/src/components/ui/vertical-cut-reveal';
import NumberFlow from '@number-flow/react';

export default function FlexPricing() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const levels = [
    {
      name: 'Nivel 1 (Crecimiento)',
      volume: '1 a 4 envíos diarios',
      price: '$3.000',
      description: 'Tarifas estándar segmentadas por distancia en km.',
      bullets: [
        'Z1 (0-3km) $3.000 | Z2 (3-5km) $4.000',
        'Z3 (5-7km) $5.300 | Z4 (7-10km) $7.000',
        'Z5 (+10km) $7.000 + $700 x km adicional',
        'Segunda visita bonificada al 50%'
      ],
      highlight: false,
    },
    {
      name: 'Nivel 2 (Pro)',
      volume: '5 a 10 envíos diarios',
      price: '$3.000',
      description: 'Tarifas con tope fijo para envíos de mayor distancia.',
      bullets: [
        'Z1 (0-3km) $3.000 | Z2 (3-5km) $4.000',
        'Z3 (5-7km) $5.300 | Z4 y Z5 (Tope) $6.500',
        'Segunda visita Z1 gratis, otras al 50%',
        'Retiro bonificado sin cargo'
      ],
      highlight: true,
    },
    {
      name: 'Nivel 3 (Elite)',
      volume: '+10 envíos diarios',
      price: '$4.500',
      description: 'Tarifa plana unificada para toda la ciudad sin límites.',
      bullets: [
        'Tarifa plana de $4.500 a toda la ciudad',
        'Segunda visita sin cargo a toda la ciudad',
        'Soporte directo prioritario',
        'Retiro bonificado sin cargo'
      ],
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
      id="flex-pricing"
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
            NIVELES FLEX 2026
          </TimelineContent>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white flex justify-center leading-[0.98]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
            >
              NIVELES Y TARIFAS FLEX
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            as="p"
            className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Escalá tu negocio con MercadoLibre Flex. A mayor volumen diario de despachos, mejores beneficios y tarifas para tus envíos Same-Day.
          </TimelineContent>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Pricing Cards Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {levels.map((level, idx) => {
            const isNumericPrice = level.price.startsWith('$');
            const numericValue = isNumericPrice ? parseInt(level.price.replace('$', '').replace('.', '')) : null;

            const spanClass = 'lg:col-span-4';

            return (
              <TimelineContent
                key={level.name}
                animationNum={2 + idx}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                as="div"
                className={`${spanClass} bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col`}
              >
                <Card
                  className={`border-0 bg-white text-[#052C87] rounded-[20px] flex flex-col justify-between h-full transition-all duration-300 group text-left shadow-none relative overflow-hidden ${
                    level.highlight ? 'ring-2 ring-[#FFF12E]' : ''
                  }`}
                >
                  <CardHeader className="p-8 pb-2 text-left relative z-10">
                    {level.highlight && (
                      <span className="-rotate-1 absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFF12E] text-[#052C87] font-bold font-subheading text-xs tracking-wider px-4 py-1 rounded-full shadow-glow-yellow">
                        RECOMENDADO
                      </span>
                    )}

                    <div>
                      <span className="text-xs font-subheading tracking-wider uppercase text-[#0950F6] font-bold">
                        {level.volume}
                      </span>
                      <h3 className="text-2xl font-display uppercase tracking-wider mt-1 min-h-[56px] leading-tight text-[#052C87] font-bold">
                        {level.name}
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
                        <span className="text-3xl font-mono tabular-nums uppercase font-bold tracking-tight text-[#052C87]">
                          {level.price}
                        </span>
                      )}
                      <span className="text-xs font-subheading tracking-wider uppercase block mt-1 text-[#3570F8]">/ liquidación quincenal</span>
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed font-sans min-h-[48px] text-[#00277C]/80">
                      {level.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-8 pt-0 flex flex-col justify-between flex-grow relative z-10">
                    {/* Bullets */}
                    <ul className="space-y-2.5 pt-4 border-t border-brand-blue-100 mb-6">
                      {level.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-xs text-[#00277C]">
                          <Check className="h-4 w-4 shrink-0 text-[#0950F6]" />
                          <span className="font-sans text-xs">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <a
                        href="https://wa.me/542236602699"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full inline-flex items-center justify-between gap-2 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] shadow-glow-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E]"
                      >
                        <span>Activar {level.name.split(' ')[0]}</span>
                        <span className="w-7 h-7 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4 shrink-0 text-[#052C87]" />
                        </span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </TimelineContent>
            );
          })}
        </div>

        {/* Special Benefit: Rain Weather (Full width callout) */}
        <TimelineContent
          animationNum={5}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          as="div"
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float"
        >
          <div className="bg-[#052C87] text-white rounded-[20px] p-8 relative overflow-hidden text-left border border-white/10 shadow-sm">
            {/* Background icon watermark */}
            <CloudRain className="absolute -bottom-8 -right-8 h-64 w-64 text-white/[0.04] pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="-rotate-1 inline-block px-4 py-1 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-glow-yellow">
                  RECARGO POR LLUVIA
                </span>
                <h3 className="text-3xl font-display uppercase tracking-tight text-white">
                  <span className="font-mono tabular-nums">30%</span> adicional en caso de lluvia
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed font-sans max-w-2xl">
                  Para todos nuestros clientes asociados al canal Flex, el recargo por días de lluvia es de solo un <span className="font-mono tabular-nums">30%</span> adicional sobre el valor del envío. Cuidamos tu rentabilidad operativa para que sigas vendiendo con tranquilidad.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href="https://wa.me/542236602699"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="flex-pricing-cta-whatsapp"
                  className="group inline-flex items-center justify-between gap-3 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] shadow-glow-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] w-full sm:w-auto"
                >
                  <span>Más Información Flex</span>
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

## 6. Componente: `FlexHowItWorks.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexHowItWorks.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Truck, CheckSquare, Sparkles } from 'lucide-react';

export default function FlexHowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Vendés',
      desc: 'Recibís una venta con Mercado Envíos Flex en tu panel tradicional de vendedor de MercadoLibre.',
      icon: ShoppingBag,
    },
    {
      number: '02',
      title: 'Retiramos',
      desc: 'Coordinamos y pasamos a retirar todos los paquetes por tu local o depósito en el horario de corte acordado.',
      icon: Truck,
    },
    {
      number: '03',
      title: 'Entregamos',
      desc: 'Todas las ventas realizadas antes de 15hs serán entregadas en el día en Mar del Plata.',
      icon: CheckSquare,
    },
    {
      number: '04',
      title: 'Calificás',
      desc: 'Tu cliente recibe el paquete en el mismo día y tu reputación de MercadoLíder sube automáticamente.',
      icon: Sparkles,
    },
  ];

  return (
    <section 
      id="flex-how-it-works" 
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
            LOGÍSTICA SINCRONIZADA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-[#0950F6] border-l-4 border-[#FFF12E] pl-4 inline-block leading-[0.98]">
            LOGÍSTICA SIN FRICCIONES
          </h2>
          <p className="text-[#00277C]/80 font-sans text-sm sm:text-base max-w-lg mx-auto">
            Integramos tu flujo diario de ventas con nuestra red de distribución de última milla de forma directa.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Steps Grid Bento Layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="absolute top-[2.4rem] left-12 right-12 h-1 bg-[#0950F6]/20 hidden lg:block -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const spanClass = 'lg:col-span-3';

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

---

## 7. Componente: `FlexRequirements.tsx`

> **Path Relativa:** `src/components/servicios/flex/FlexRequirements.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Clock } from 'lucide-react';

export default function FlexRequirements() {
  const requirements = [
    {
      title: 'Cuenta activa de vendedor',
      desc: 'Tener una cuenta activa de vendedor dentro de MercadoLibre.',
      icon: Sparkles,
    },
    {
      title: 'Envíos flex activados',
      desc: 'Habilitar la opción de envíos rápidos en el día en tu configuración logística.',
      icon: MapPin,
    },
    {
      title: 'Embalaje apto para moto',
      desc: 'Tener tus paquetes embalados de forma adecuada para el traslado seguro en moto.',
      icon: Clock,
    },
  ];

  return (
    <section 
      id="flex-requirements" 
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
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading uppercase font-bold tracking-widest shadow-sm">
            PUESTA EN MARCHA
          </span>
          <h2 className="text-[#0950F6] text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight border-l-4 border-[#FFF12E] pl-4 inline-block leading-[0.98]">
            ¿QUÉ NECESITÁS?
          </h2>
          <p className="text-[#00277C]/80 font-sans text-sm sm:text-base max-w-lg mx-auto">
            Requisitos mínimos e indispensables para empezar a ofrecer envíos Same-Day y potenciar tu e-commerce hoy mismo.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Requirements Grid Bento Grid layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {requirements.map((req, idx) => {
            const Icon = req.icon;
            return (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, x: 2 }}
                className="lg:col-span-4 bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col group cursor-pointer relative overflow-hidden"
              >
                <div className="bg-white p-6 rounded-[20px] border border-brand-blue-50/50 shadow-sm h-full flex flex-col gap-5 text-left relative overflow-hidden">
                  {/* Giant Watermark Icon */}
                  <Icon className="absolute -bottom-6 -right-6 h-32 w-32 text-[#0950F6]/[0.05] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                  <div className="p-3 bg-[#FFF12E] text-[#052C87] rounded-xl w-fit shrink-0 border border-[#FFF12E] shadow-glow-yellow relative z-10">
                    <Icon className="h-6 w-6 shrink-0" />
                  </div>
                  
                  <div className="space-y-1.5 relative z-10">
                    <h3 className="text-xl font-display uppercase tracking-wide text-[#0950F6] font-bold leading-tight">
                      {req.title}
                    </h3>
                    <p className="text-sm text-[#00277C]/80 font-sans leading-relaxed">
                      {req.desc}
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

