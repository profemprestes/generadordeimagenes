# 📄 Nodo: Servicio Envíos Express

> **URL:** `/servicios/envios-express`  
> **Path Relativa Página:** `src/app/servicios/envios-express/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/servicios/envios-express/page.tsx` | Server Component [SC] |
| Componente | `src/components/servicios/express/ExpressHero.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/express/ExpressFeatures.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/express/ExpressPricing.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/express/ExpressUseCases.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/servicios/envios-express/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import ExpressHero from '@/src/components/servicios/express/ExpressHero';
import ExpressFeatures from '@/src/components/servicios/express/ExpressFeatures';
import ExpressPricing from '@/src/components/servicios/express/ExpressPricing';
import ExpressUseCases from '@/src/components/servicios/express/ExpressUseCases';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Mensajería en Moto y Envíos Express | Entregas Inmediatas Mar del Plata | Envíos DosRuedas',
  description:
    'Servicio prioritario de mensajería en moto y envíos express en Mar del Plata. Entregas inmediatas con rango de 3 horas (solicitud con 2 hs de anticipación antes de las 15:00 hs). Bultos hasta 5 kg y 40x30 cm.',
  keywords: [
    'mensajeria en moto',
    'envios express',
    'entregas inmediatas',
    'cadeteria express mar del plata',
    'mensajeria urbana mar del plata',
  ],
  alternates: {
    canonical: `${baseUrl}/servicios/envios-express`,
  },
  openGraph: {
    title: 'Mensajería en Moto y Envíos Express en Mar del Plata | Envíos DosRuedas',
    description:
      'Cadetería prioritarias y entregas inmediatas en Mar del Plata. Rango de entrega de 3 horas, solicitud antes de las 15:00 hs. Hasta 5 kg y 40x30 cm.',
    url: `${baseUrl}/servicios/envios-express`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mensajería en Moto y Envíos Express con Entregas Inmediatas en Mar del Plata',
  description:
    'Servicio prioritario de mensajería en moto y envíos express con entregas inmediatas en rango de 3 horas en Mar del Plata. Solicita con 2 hs de anticipación antes de las 15:00 hs. Bultos de hasta 5 kg y 40x30 cm.',
  url: `${baseUrl}/servicios/envios-express`,
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
    name: 'Tarifas Express Vigentes 2026',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Express Zona 1 (0 a 3 km)',
        price: '3700',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Express Zona 2 (3 a 5 km)',
        price: '4600',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Express Zona 3 (5 a 7 km)',
        price: '6100',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Express Zona 4 (7 a 10 km)',
        price: '8200',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Express Zona 5 (+10 km)',
        price: '8200',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
        description: '$8.200 base más $1.000 por kilómetro adicional entero',
      },
    ],
  },
};

export default function EnviosExpressPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-brand-blue-700 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {/* 1. Hero Presentation — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <ExpressHero />
      </section>

      {/* 2. Value Propositions & Key Features — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <ExpressFeatures />
      </section>

      {/* 3. 2026 Zone Pricing Rates & Dynamic Quote Hook — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <ExpressPricing />
      </section>

      {/* 4. Common Use Cases & Scenarios — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <ExpressUseCases />
      </section>
    </main>
  );
}

```

---

## 2. Componente: `ExpressHero.tsx`

> **Path Relativa:** `src/components/servicios/express/ExpressHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import HeroProceduralBackground from '@/components/ui/HeroProceduralBackground';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Phone,
  Zap,
} from 'lucide-react';

export default function ExpressHero() {

  return (
    <section
      id="express-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Pure Vector & Dynamic Procedural Background */}
      <HeroProceduralBackground variant="express" />

      {/* Ghost Wordmark Monumental de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display uppercase text-[16vw] leading-none text-white/[0.035] tracking-tighter whitespace-nowrap">
          MENSAJERÍA EN MOTO
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Kinetic Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Velocity Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="-rotate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-subheading font-bold uppercase tracking-widest bg-[#052C87] border border-[#FFF12E]/30 text-[#FFF12E] shadow-glow-yellow"
            >
              <Zap className="h-4 w-4 text-[#FFF12E] shrink-0" />
              <span>MENSAJERÍA EN MOTO Y ENTREGAS INMEDIATAS · MDQ 2026</span>
            </motion.div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">MENSAJERÍA EN MOTO Y</span>
              <span className="block text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.35)]">
                ENVÍOS EXPRESS
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-blue-100 mt-1">
                ENTREGAS INMEDIATAS EN MAR DEL PLATA
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-2 border-[#FFF12E] font-light">
              Especialistas en mensajería en moto y envíos express prioritarios. Asignación de rango horario de entrega de 3 horas (solicitud con 2 hs de anticipación antes de las 15:00 hs). Todo lo que entre en moto (hasta 5 kg y 40x30 cm).
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/cotizar/express"
                id="express-hero-cta-cotizar"
                className="group inline-flex items-center justify-between gap-4 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Cotizá tu envío Express</span>
                <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-[#052C87]" />
                </span>
              </Link>

              <a
                href="https://wa.me/542236602699"
                target="_blank"
                rel="noopener noreferrer"
                id="express-hero-cta-whatsapp"
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
                  3 Horas
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Rango de Entrega
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  15:00 hs
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Corte Solicitud
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  Hasta 5 kg
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  40x30 cm Límite
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Kinetic Dispatch HUD Animation (5 cols) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FFF12E]/20 via-[#0950F6]/30 to-[#FFF12E]/10 rounded-[32px] blur-2xl pointer-events-none" />

            {/* Double Bezel System: outer rounded-[28px], inner rounded-[20px] */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-[28px] shadow-2xl relative z-10">
              <div className="bg-[#052C87] text-white p-6 sm:p-7 rounded-[20px] border border-white/10 relative overflow-hidden space-y-6">
                {/* Background Radar Watermark Icon */}
                <Zap className="absolute -bottom-6 -right-6 h-48 w-48 text-white/[0.04] pointer-events-none select-none" />
                {/* Background Radar Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#628FF9_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-brand-blue-700/60 pb-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow-500" />
                    </span>
                    <span className="font-subheading text-xs uppercase tracking-widest font-bold text-brand-yellow-500">
                      TELEMETRÍA EN VIVO · MDQ
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold bg-brand-yellow-500 text-brand-blue-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    PRIORIDAD 1
                  </span>
                </div>

                {/* Animated Route & Beacon Visual */}
                <div className="relative py-2 z-10 flex flex-col items-center justify-center">
                  <div className="w-full h-32 relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background Route Path */}
                      <path
                        d="M 25 50 C 85 15, 140 85, 215 40 L 295 50"
                        stroke="#0950F6"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        opacity="0.35"
                      />
                      {/* Active Route Pulse Stroke */}
                      <path
                        d="M 25 50 C 85 15, 140 85, 215 40 L 295 50"
                        stroke="#FFEC01"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        className="animate-pulse"
                      />

                      {/* Origin Beacon */}
                      <circle cx="25" cy="50" r="9" fill="#0636A5" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="25" cy="50" r="3.5" fill="#FFEC01" />

                      {/* Moving Rider Beacon */}
                      <motion.circle
                        r="6"
                        fill="#FFEC01"
                        animate={{
                          cx: [25, 75, 140, 215, 295],
                          cy: [50, 25, 75, 40, 50],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />

                      {/* Destination Beacon */}
                      <circle cx="295" cy="50" r="9" fill="#0636A5" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="295" cy="50" r="3.5" fill="#FFEC01" />
                    </svg>

                    {/* Telemetry Labels */}
                    <div className="absolute left-1 top-1 bg-brand-blue-800/90 border border-brand-blue-500/30 px-2 py-0.5 rounded text-[10px] font-mono text-brand-blue-200">
                      RETIRO EN ORIGEN
                    </div>
                    <div className="absolute right-1 bottom-1 bg-brand-blue-800/90 border border-brand-blue-500/30 px-2 py-0.5 rounded text-[10px] font-mono text-brand-yellow-400 font-bold">
                      ENTREGA DESTINO
                    </div>
                  </div>

                  {/* Kinetic ETA Counter Display */}
                  <div className="text-center mt-3">
                    <span className="text-xs font-subheading uppercase tracking-widest text-brand-blue-200 block">
                      RANGO HORARIO PROGRAMADO
                    </span>
                    <div className="flex items-baseline justify-center gap-2 mt-1">
                      <span className="font-display text-4xl sm:text-5xl text-brand-yellow-500 tracking-tight leading-none drop-shadow-[0_0_20px_rgba(255,236,1,0.35)]">
                        3 HS
                      </span>
                      <span className="font-subheading text-xl text-white tracking-wider uppercase font-bold">
                        RANGO
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Chips */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-brand-blue-700/60 relative z-10 text-center">
                  <div className="bg-brand-blue-800/60 border border-brand-blue-500/30 p-2 rounded-xl">
                    <span className="block text-[9px] font-subheading uppercase tracking-wider text-brand-blue-200">
                      RUTEO
                    </span>
                    <span className="block font-display text-sm sm:text-base text-white mt-0.5">
                      DIRECTO
                    </span>
                  </div>
                  <div className="bg-brand-blue-800/60 border border-brand-blue-500/30 p-2 rounded-xl">
                    <span className="block text-[9px] font-subheading uppercase tracking-wider text-brand-blue-200">
                      CUSTODIA
                    </span>
                    <span className="block font-display text-sm sm:text-base text-brand-yellow-500 mt-0.5">
                      100% EXCLUSIVA
                    </span>
                  </div>
                  <div className="bg-brand-blue-800/60 border border-brand-blue-500/30 p-2 rounded-xl">
                    <span className="block text-[9px] font-subheading uppercase tracking-wider text-brand-blue-200">
                      CONFIRMACIÓN
                    </span>
                    <span className="block font-display text-sm sm:text-base text-white mt-0.5">
                      AL INSTANTE
                    </span>
                  </div>
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

## 3. Componente: `ExpressFeatures.tsx`

> **Path Relativa:** `src/components/servicios/express/ExpressFeatures.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Compass, Users } from 'lucide-react';

export default function ExpressFeatures() {
  const features = [
    {
      title: 'Rangos de Entrega de 3 Horas',
      desc: 'Elegí franjas horarias precisas de 3 horas de espaciado (ej: 10 a 13 hs) para trámites y gestiones urgentes.',
      icon: Clock,
    },
    {
      title: 'Corte 15:00 hs (2h anticipación)',
      desc: 'Pedí con 2 horas de anticipación y antes de las 15:00 hs para entrega asegurada en el mismo día.',
      icon: ShieldCheck,
    },
    {
      title: 'Bultos en Moto (Hasta 5 kg)',
      desc: 'Traslado seguro de paquetes de hasta 5 kg y 40x30 cm con control y avisos en tiempo real por WhatsApp.',
      icon: Compass,
    },
    {
      title: 'Cadetería propia de confianza',
      desc: 'Nuestros riders están identificados, con más de 7 años de trayectoria en las calles de Mar del Plata.',
      icon: Users,
    },
  ];

  return (
    <section
      id="express-features"
      className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden border-t border-brand-blue-100"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Header Segment */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-sm">
              SOLUCIONES PREMIUM MDQ
            </span>

            <h2 className="text-[#0950F6] text-4xl sm:text-5xl font-display uppercase tracking-tight leading-[0.98] border-l-4 border-[#FFF12E] pl-4">
              ENTREGAS RÁPIDAS <br />
              <span className="text-[#052C87] bg-[#FFF12E] px-2 py-0.5 inline-block mt-1">Y EFICIENTES</span>
            </h2>

            <p className="text-[#00277C] text-base leading-relaxed font-sans font-normal">
              Nuestro servicio Express ofrece cobertura total en el Partido de General Pueyrredón. Llegamos a todos los barrios con franjas horarias prioritarias: Centro, Chauvín, Los Troncos, Güemes, Puerto, Playa Grande, Punta Mogotes, Batán.
            </p>

            <div className="pt-2 flex items-center gap-3 text-sm text-[#0950F6] font-bold uppercase tracking-wider font-subheading">
              <Compass className="h-5 w-5 text-[#FFF12E] shrink-0 fill-current" />
              <span>LOGÍSTICA URBANA INTEGRAL 2026</span>
            </div>
          </div>

          {/* Bento Grid with Double-Bezel cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {features.map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep hover:border-brand-blue-300 transition-all duration-300 flex flex-col group cursor-default relative overflow-hidden"
                >
                  <div className="bg-white p-6 rounded-[20px] border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full space-y-4 relative overflow-hidden">
                    {/* Giant Watermark Icon */}
                    <Icon className="absolute -bottom-6 -right-6 h-32 w-32 text-[#0950F6]/[0.05] pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                    <div className="h-12 w-12 rounded-xl bg-[#0950F6] text-[#FFF12E] flex items-center justify-center shrink-0 border border-[#0950F6] shadow-sm group-hover:bg-[#FFF12E] group-hover:text-[#052C87] transition-colors duration-200 relative z-10">
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <div className="space-y-1.5 relative z-10">
                      <h4 className="text-xl font-display uppercase tracking-wider text-[#0950F6] leading-tight">
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

## 4. Componente: `ExpressPricing.tsx`

> **Path Relativa:** `src/components/servicios/express/ExpressPricing.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Sparkles } from '@/src/components/ui/sparkles';
import { TimelineContent } from '@/src/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/src/components/ui/vertical-cut-reveal';
import NumberFlow from '@number-flow/react';

export default function ExpressPricing() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const zones = [
    {
      name: 'Radio Cercano',
      scope: 'Hasta 3 km',
      ctaText: 'Cotizá hasta 3 km',
      price: '$3.700',
      description: 'Ideal para entregas inmediatas de cercanía.',
      bullets: ['Elegís rango horario', 'Mínimo 2hs anticipación', 'Notificación digital por WhatsApp', 'Custodia digital'],
      highlight: false,
    },
    {
      name: 'Radio Central',
      scope: '3 a 5 km',
      ctaText: 'Cotizá 3 a 5 km',
      price: '$4.600',
      description: 'Cobertura intermedia rápida en el casco urbano.',
      bullets: ['Elegís rango horario', 'Mínimo 2hs anticipación', 'Notificación digital por WhatsApp', 'Custodia digital'],
      highlight: true,
    },
    {
      name: 'Radio Extendido',
      scope: '5 a 7 km',
      ctaText: 'Cotizá 5 a 7 km',
      price: '$6.100',
      description: 'Llegamos a distancias medias con máxima agilidad.',
      bullets: ['Elegís rango horario', 'Mínimo 2hs anticipación', 'Notificación digital por WhatsApp', 'Custodia digital'],
      highlight: false,
    },
    {
      name: 'Radio Perimetral',
      scope: '7 a 10 km',
      ctaText: 'Cotizá 7 a 10 km',
      price: '$8.200',
      description: 'Máxima cobertura urbana perimetral.',
      bullets: ['Elegís rango horario', 'Mínimo 2hs anticipación', 'Notificación digital por WhatsApp', 'Custodia digital'],
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
      id="express-pricing"
      className="py-24 bg-[#0950F6] relative overflow-hidden text-white border-t border-b border-white/10"
      ref={pricingRef}
    >
      {/* Background Sparkles overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)] opacity-25 pointer-events-none">
        <Sparkles
          density={1000}
          direction="bottom"
          speed={0.6}
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
            className="-rotate-1 px-4 py-1.5 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading font-bold uppercase tracking-widest inline-block shadow-glow-yellow"
          >
            TARIFARIO VIGENTE 2026
          </TimelineContent>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white flex justify-center leading-[0.98]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
            >
              TARIFAS POR DISTANCIA
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            as="p"
            className="text-blue-100 font-sans text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          >
            Precios oficiales calculados por rango kilométrico para envíos inmediatos en Mar del Plata.
          </TimelineContent>
        </div>

        {/* Pricing Cards Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {zones.map((zone, idx) => {
            const isNumericPrice = zone.price.startsWith('$');
            const numericValue = isNumericPrice ? parseInt(zone.price.replace('$', '').replace('.', '')) : null;

            return (
              <TimelineContent
                key={zone.scope}
                animationNum={2 + idx}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                as="div"
                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col"
              >
                <Card
                  className={`border-0 bg-white text-[#052C87] rounded-[20px] p-6 flex flex-col justify-between h-full group text-left shadow-sm relative overflow-hidden ${
                    zone.highlight ? 'ring-2 ring-[#FFF12E]' : ''
                  }`}
                >
                  <CardHeader className="p-0 pb-4 text-left relative z-10">
                    {zone.highlight && (
                      <span className="-rotate-1 inline-block self-start mb-3 bg-[#FFF12E] text-[#052C87] font-bold font-subheading text-xs tracking-wider px-3 py-1 rounded-full shadow-glow-yellow">
                        MÁS ELEGIDO
                      </span>
                    )}

                    <div>
                      <span className="text-xs font-subheading tracking-wider uppercase text-[#0950F6] font-bold">
                        {zone.name}
                      </span>
                      <h3 className="text-2xl font-display uppercase tracking-wider mt-1 leading-tight text-[#052C87] font-bold">
                        {zone.scope}
                      </h3>
                    </div>

                    <div className="py-3">
                      {isNumericPrice && numericValue ? (
                        <div className="flex items-baseline">
                          <span className="text-4xl sm:text-5xl font-mono tabular-nums font-bold tracking-tight text-[#052C87]">
                            $
                            <NumberFlow
                              value={numericValue}
                              format={{ minimumFractionDigits: 0 }}
                              className="inline-block font-mono tabular-nums"
                            />
                          </span>
                        </div>
                      ) : (
                        <span className="text-4xl sm:text-5xl font-mono tabular-nums font-bold tracking-tight text-[#052C87]">
                          {zone.price}
                        </span>
                      )}
                      <span className="text-xs font-subheading tracking-wider uppercase block mt-1 text-[#3570F8]">/ despacho final</span>
                    </div>

                    <p className="text-sm leading-relaxed font-sans text-[#00277C]/80">
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
                        href="/cotizar/express"
                        className={`group w-full inline-flex items-center justify-between gap-2 px-6 py-3 rounded-full text-sm font-subheading font-bold uppercase tracking-wider min-h-[48px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0950F6] ${
                          zone.highlight
                            ? 'bg-[#FFF12E] text-[#052C87] hover:bg-[#FFF44A] shadow-glow-yellow'
                            : 'bg-[#0950F6] text-white hover:bg-[#0742CA]'
                        }`}
                      >
                        <span>{zone.ctaText}</span>
                        <span className="w-7 h-7 rounded-full bg-current/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TimelineContent>
            );
          })}
        </div>

        {/* Dynamic Quote Callout (+10 km rule) */}
        <TimelineContent
          animationNum={6}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          as="div"
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float"
        >
          <div className="bg-[#052C87] text-white rounded-[20px] p-8 relative overflow-hidden text-left border border-white/10 shadow-sm">
            {/* Background icon watermark */}
            <Calculator className="absolute -bottom-8 -right-8 h-64 w-64 text-white/[0.04] pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              <div className="lg:col-span-8 space-y-3 text-left">
                <span className="-rotate-1 inline-block px-3.5 py-1 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-glow-yellow">
                  TRAYECTOS DE MÁS DE 10 KM
                </span>
                <h3 className="text-3xl font-display uppercase tracking-tight text-white">
                  <span className="font-mono tabular-nums">$8.200</span> Base + <span className="font-mono tabular-nums">$1.000</span> x km adicional
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed font-sans max-w-2xl">
                  Para envíos que exceden los 10 km (Batán, Sierra de los Padres, Camet o periferia de General Pueyrredón), el cálculo aplica tarifa base de 7 a 10 km (<span className="font-mono tabular-nums">$8.200</span>) más <span className="font-mono tabular-nums">$1.000</span> por kilómetro adicional entero.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  href="/cotizar/express"
                  id="express-pricing-cta-cotizador"
                  className="group inline-flex items-center justify-between gap-3 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] shadow-glow-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] w-full sm:w-auto"
                >
                  <span>Calcular con Mapa</span>
                  <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    <Calculator className="h-4 w-4 shrink-0 text-[#052C87]" />
                  </span>
                </Link>
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

## 5. Componente: `ExpressUseCases.tsx`

> **Path Relativa:** `src/components/servicios/express/ExpressUseCases.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Package, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ExpressUseCases() {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const cases = [
    {
      title: 'Envíos de documentación',
      desc: 'Contratos, documentos legales, escrituras y trámites críticos que requieren custodia y entrega inmediata.',
      examples: ['Documentos notariales y escrituras', 'Contratos comerciales firmados', 'Certificados médicos y habilitaciones oficiales'],
      icon: FileText,
      badge: 'LEGAL & TRÁMITES',
    },
    {
      title: 'Distribución de insumos',
      desc: 'Despacho urgente de repuestos mecánicos, insumos gastronómicos, tecnología y suministros comerciales.',
      examples: ['Repuestos y piezas mecánicas críticas', 'Insumos de stock para locales y gastronomía', 'Suministros médicos prioritarios'],
      icon: Package,
      badge: 'INSUMOS & REPUESTOS',
    },
    {
      title: 'Entregas con horario estricto',
      desc: 'Operaciones que necesitan entregarse con altísima puntualidad dentro de una franja horaria restringida.',
      examples: ['Entregas en turnos específicos de oficina', 'Desayunos, regalos y catering para eventos', 'Entregas coordinadas en obras y talleres'],
      icon: Clock,
      badge: 'FRANJA HORARIA EXACTA',
    },
  ];

  const toggleTab = (idx: number) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <section
      id="express-use-cases"
      className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden border-t border-brand-blue-100"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
        }}
      >

        {/* Header segment */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="-rotate-1 inline-block px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-sm">
            CASOS DE USO REALES
          </span>
          <h2 className="text-[#0950F6] text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-none">
            ¿CUÁNDO NECESITÁS EXPRESS?
          </h2>
          <p className="text-[#00277C] text-base sm:text-lg font-sans max-w-lg mx-auto leading-relaxed">
            Situaciones cotidianas y corporativas donde cada minuto cuenta y la puntualidad es innegociable.
          </p>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Interactive Case Columns with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((useCase, idx) => {
            const Icon = useCase.icon;
            const isOpen = activeTab === idx;

            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col group cursor-default relative overflow-hidden"
              >
                <div className={`p-6 sm:p-7 space-y-6 h-full flex flex-col justify-between text-left rounded-[20px] transition-colors duration-300 relative overflow-hidden ${
                  isOpen
                    ? 'bg-[#052C87] text-white border border-white/10 shadow-md'
                    : 'bg-white text-[#0950F6] border border-brand-blue-50/50 shadow-sm'
                }`}>
                  {/* Giant Watermark Icon */}
                  <Icon className={`absolute -bottom-6 -right-6 h-32 w-32 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 ${
                    isOpen ? 'text-white/[0.04]' : 'text-[#0950F6]/[0.05]'
                  }`} />

                  {/* Icon & Badge Header */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${
                      isOpen
                        ? 'bg-[#FFF12E] text-[#052C87] border-[#FFF12E] shadow-glow-yellow'
                        : 'bg-[#0950F6] text-[#FFF12E] border-[#0950F6] shadow-sm'
                    }`}>
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <span className={`text-[10px] font-subheading font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      isOpen
                        ? 'bg-white/10 text-[#FFF12E] border-white/20'
                        : 'bg-brand-blue-50 text-[#0950F6] border-brand-blue-200'
                    }`}>
                      {useCase.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 relative z-10">
                    <h3 className={`text-2xl font-display uppercase tracking-wide leading-tight ${
                      isOpen ? 'text-white' : 'text-[#0950F6]'
                    }`}>
                      {useCase.title}
                    </h3>
                    <p className={`text-sm font-sans leading-relaxed ${
                      isOpen ? 'text-blue-100' : 'text-[#00277C]/80'
                    }`}>
                      {useCase.desc}
                    </p>
                  </div>

                  {/* Toggle button for examples */}
                  <button
                    onClick={() => toggleTab(idx)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase font-subheading flex items-center justify-between border transition-all cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] relative z-10 ${
                      isOpen
                        ? 'bg-[#FFF12E] text-[#052C87] border-[#FFF12E] hover:bg-[#FFF44A] shadow-glow-yellow'
                        : 'bg-brand-blue-50 text-[#0950F6] border-brand-blue-200 hover:bg-brand-blue-100'
                    }`}
                  >
                    <span>Ver Ejemplos</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#052C87]' : 'text-[#0950F6]'
                    }`} />
                  </button>

                  {/* Expandable list of examples */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="space-y-3 pt-4 border-t border-white/15">
                          <p className="text-[10px] font-bold tracking-widest text-[#FFF12E] uppercase font-mono">
                            DESPACHOS HABITUALES
                          </p>
                          <ul className="space-y-2">
                            {useCase.examples.map((ex, exIdx) => (
                              <motion.li
                                key={ex}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: exIdx * 0.06 }}
                                className="flex items-start gap-2 text-xs text-blue-50 font-sans"
                              >
                                <CheckCircle2 className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                                <span className="leading-tight">{ex}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

