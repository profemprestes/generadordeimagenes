# 📄 Nodo: Servicio Plan Emprendedores / 3PL

> **URL:** `/servicios/plan-emprendedores`  
> **Path Relativa Página:** `src/app/servicios/plan-emprendedores/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/servicios/plan-emprendedores/page.tsx` | Server Component [SC] |
| Componente | `src/components/servicios/emprendedores/EmprendedoresHero.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/emprendedores/EmprendedoresFeatures.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/emprendedores/EmprendedoresBenefits.tsx` | Client Component [CC] |
| Componente | `src/components/servicios/emprendedores/EmprendedoresPricing.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/servicios/plan-emprendedores/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import EmprendedoresHero from '@/src/components/servicios/emprendedores/EmprendedoresHero';
import EmprendedoresFeatures from '@/src/components/servicios/emprendedores/EmprendedoresFeatures';
import EmprendedoresBenefits from '@/src/components/servicios/emprendedores/EmprendedoresBenefits';
import EmprendedoresPricing from '@/src/components/servicios/emprendedores/EmprendedoresPricing';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Paquetería E-Commerce, Envíos E-Commerce y Logística 3PL Mar del Plata | Envíos DosRuedas',
  description:
    'Especialistas en paquetería e-commerce, envíos e-commerce y logística 3PL en Mar del Plata. Almacenamiento en Friuli 1972 con picking QR Same Day, E-Commerce Next Day (24hs), opción DropOFF (-20% OFF) y contrareembolso sin cargo extra.',
  keywords: [
    'paqueteria ecommerce',
    'envios ecommerce',
    'logistica 3pl mar del plata',
    'fulfillment mar del plata',
    'dropoff envios mar del plata',
  ],
  alternates: {
    canonical: `${baseUrl}/servicios/plan-emprendedores`,
  },
  openGraph: {
    title: 'Paquetería E-Commerce, Envíos E-Commerce y Logística 3PL | Envíos DosRuedas',
    description:
      'Soluciones integrales de paquetería e-commerce y logística 3PL en Mar del Plata. Depósito en Friuli 1972, picking QR Same Day, Next Day 24hs, DropOFF 20% OFF y cobro contrareembolso gratis.',
    url: `${baseUrl}/servicios/plan-emprendedores`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Paquetería E-Commerce, Envíos E-Commerce y Logística 3PL en Mar del Plata',
  description:
    'Servicio integral de paquetería e-commerce y logística 3PL en Mar del Plata. Incluye E-Commerce Same Day desde Friuli 1972 con picking QR, E-Commerce Next Day 24hs, opción DropOFF con 20% de descuento y cobro contrareembolso sin cargo extra.',
  url: `${baseUrl}/servicios/plan-emprendedores`,
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
    name: 'Planes 3PL y Paquetería E-Commerce',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'E-Commerce Same Day',
        description: 'Stock almacenado en Friuli 1972, despachado inmediatamente con picking QR y empaquetado',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'E-Commerce Next Day (24hs)',
        description: 'Retiro programado para entrega al día siguiente. Recolección gratis para más de 10 envíos',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Opción DropOFF (-20% OFF)',
        description: 'Despacho directo en Friuli 1972 con un 20% de descuento en la tarifa final',
        priceCurrency: 'ARS',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
};

export default function PlanEmprendedoresPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-brand-blue-700 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header block — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <EmprendedoresHero />
      </section>

      {/* Corporate 3PL logistics features — Slate Canvas (#F8FAFC) */}
      <section className="relative z-10 bg-[#F8FAFC] font-sans">
        <EmprendedoresFeatures />
      </section>

      {/* Strategic business benefits grid — Deep Midnight Navy (#052C87) */}
      <section className="relative z-10 bg-[#052C87] font-sans">
        <EmprendedoresBenefits />
      </section>

      {/* Premium custom e-commerce plans and 3PL warehousing prices — Electric Speed Blue (#0950F6) */}
      <section className="relative z-10 bg-[#0950F6]">
        <EmprendedoresPricing />
      </section>
    </main>
  );
}

```

---

## 2. Componente: `EmprendedoresHero.tsx`

> **Path Relativa:** `src/components/servicios/emprendedores/EmprendedoresHero.tsx`  
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
  PackageCheck,
  Warehouse,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Boxes,
  MapPin,
} from 'lucide-react';

export default function EmprendedoresHero() {
  const [activeTab, setActiveTab] = useState<'solucion' | 'proceso'>('solucion');

  return (
    <section
      id="emprendedores-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Pure Vector & Dynamic Procedural Background */}
      <HeroProceduralBackground variant="3pl" />

      {/* Ghost Wordmark Monumental de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display uppercase text-[16vw] leading-none text-white/[0.035] tracking-tighter whitespace-nowrap">
          LOGÍSTICA 3PL MDQ
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
              <Warehouse className="h-4 w-4 text-[#FFF12E] shrink-0" />
              <span>PAQUETERÍA E-COMMERCE Y LOGÍSTICA 3PL · FRIULI 1972 MDQ</span>
            </motion.div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">PAQUETERÍA Y</span>
              <span className="block text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.35)]">
                ENVÍOS E-COMMERCE
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl text-blue-100 mt-1">
                LOGÍSTICA 3PL EN MAR DEL PLATA
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-2 border-[#FFF12E] font-light">
              Solución en paquetería e-commerce, envíos e-commerce y logística 3PL en Mar del Plata. Ofrecemos E-Commerce Same Day desde nuestro depósito en Friuli 1972 con picking QR, E-Commerce Next Day (24hs), Opción DropOFF (-20% OFF) y Contrareembolso sin cargo extra.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/contacto"
                id="emprendedores-hero-cta-plan"
                className="group inline-flex items-center justify-between gap-4 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Solicitar Plan Corporativo</span>
                <span className="w-8 h-8 rounded-full bg-[#052C87]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-[#052C87]" />
                </span>
              </Link>

              <a
                href="https://wa.me/542236602699"
                target="_blank"
                rel="noopener noreferrer"
                id="emprendedores-hero-cta-whatsapp"
                className="group inline-flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-subheading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[52px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0950F6]"
              >
                <span>Agendar Asesoría 3PL</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <Phone className="h-4 w-4 text-white" />
                </span>
              </a>
            </div>

            {/* Quick KPI Chips */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-3 max-w-xl mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  Same Day
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Stock Friuli 1972
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  -20% OFF
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Opción DropOFF
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center">
                <span className="block font-mono font-bold text-xl sm:text-2xl text-[#FFF12E] tabular-nums">
                  $0 Comis.
                </span>
                <span className="block font-subheading text-[10px] sm:text-xs uppercase tracking-wider text-blue-100 mt-0.5">
                  Contrareembolso Gratis
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Double Bezel Mini-Comparador Card (5 cols) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-[28px] shadow-2xl">
              <div className="bg-white p-5 sm:p-7 rounded-[20px] border border-brand-blue-50/50 shadow-sm text-[#0950F6] space-y-5 relative overflow-hidden">
                {/* Giant Watermark Icon */}
                <Warehouse className="absolute -bottom-6 -right-6 h-48 w-48 text-[#0950F6]/[0.04] pointer-events-none select-none" />
                {/* Header with status badge */}
                <div className="flex items-center justify-between border-b border-brand-blue-100/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow-500" />
                    </span>
                    <span className="font-subheading text-xs uppercase tracking-wider font-bold text-brand-blue-700">
                      HUB LOGÍSTICO FRIULI 1972
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold bg-brand-blue-50 text-brand-blue-700 px-2.5 py-1 rounded-lg border border-brand-blue-100">
                    3PL ACTIVO
                  </span>
                </div>

                {/* Interactive Segmented Toggle */}
                <div className="grid grid-cols-2 p-1 bg-brand-blue-50 rounded-xl border border-brand-blue-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('solucion')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'solucion'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Modalidades</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('proceso')}
                    className={`py-2 px-3 rounded-lg text-xs font-subheading uppercase tracking-wider font-bold transition-all min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'proceso'
                        ? 'bg-brand-blue-700 text-brand-yellow-500 shadow-sm'
                        : 'text-brand-blue-700 hover:bg-white/60'
                    }`}
                  >
                    <Boxes className="w-3.5 h-3.5 shrink-0" />
                    <span>Flujo Operativo</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'solucion' ? (
                      <motion.div
                        key="solucion"
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
                              E-Commerce Same Day
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Stock guardado en Friuli 1972; al vender, sale empaquetado inmediatamente con picking QR.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <PackageCheck className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Opción DropOFF (-20% OFF)
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Traé tus envíos a Friuli 1972 y obtené un 20% de descuento en la tarifa.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100">
                          <ShieldCheck className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold font-subheading uppercase tracking-wide text-brand-blue-700">
                              Contrareembolso Sin Cargo Extra
                            </p>
                            <p className="text-[11px] text-brand-ink/80 font-sans leading-snug">
                              Cobramos a tu cliente en destino sin comisiones extra sobre la venta.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="proceso"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3"
                      >
                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>1. Recepción en Friuli 1972</span>
                            <span className="text-brand-blue-500 font-mono">Ingreso</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Recibimos tu stock en nuestro depósito central o via DropOFF con 20% OFF.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>2. Picking por QR & Packing</span>
                            <span className="text-brand-blue-500 font-mono">Picking</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Armado y etiquetado inmediato al registrarse la venta en tu e-commerce.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-brand-blue-50/60 border border-brand-blue-100 space-y-1">
                          <div className="flex justify-between items-center text-xs font-subheading uppercase font-bold text-brand-blue-700">
                            <span>3. Entrega Same Day / 24hs</span>
                            <span className="text-brand-blue-500 font-mono">Despacho</span>
                          </div>
                          <p className="text-[11px] text-brand-ink/75 font-sans">
                            Distribución en Mar del Plata con cobro contrareembolso opcional sin cargo.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer trust strip */}
                <div className="pt-3 border-t border-brand-blue-100 flex items-center justify-between text-[11px] font-subheading uppercase tracking-wider text-brand-blue-600 font-bold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-yellow-500" />
                    Depósito Friuli 1972 MDQ
                  </span>
                  <span className="text-brand-blue-700 font-mono text-xs">Atención B2B</span>
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

## 3. Componente: `EmprendedoresFeatures.tsx`

> **Path Relativa:** `src/components/servicios/emprendedores/EmprendedoresFeatures.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Container, PackageCheck, Receipt, Landmark, BarChart3, Users, Clock, Tag } from 'lucide-react';

export default function EmprendedoresFeatures() {
  const features = [
    {
      title: 'E-Commerce Same Day (Friuli 1972)',
      desc: 'Guardamos tu stock en nuestro depósito central de Friuli 1972. Al vender, tu producto sale inmediatamente empaquetado con picking por código QR.',
      icon: Container,
    },
    {
      title: 'Opción DropOFF (-20% OFF)',
      desc: 'Acercá tus paquetes directamente a nuestro depósito en Friuli 1972 y obtené un 20% de descuento automático en la tarifa final de envío.',
      icon: Tag,
    },
    {
      title: 'Contrareembolso Sin Cargo Extra',
      desc: 'Realizamos cobro contra entrega en destino sin ningún tipo de comisión ni recargo adicional por gestión de cobranza.',
      icon: Receipt,
    },
  ];

  const stats = [
    { value: 'SAME DAY', label: 'Picking por QR', icon: BarChart3 },
    { value: '-20% OFF', label: 'Opción DropOFF', icon: Tag },
    { value: '$0 COMISIÓN', label: 'Contrareembolso', icon: Clock },
  ];

  return (
    <section
      id="emprendedores-features"
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
              SOLUCIONES PAQUETERÍA E-COMMERCE
            </span>

            <h2 className="text-[#0950F6] text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight leading-[0.98] border-l-4 border-[#FFF12E] pl-4">
              LOGÍSTICA 3PL <br />
              <span className="text-[#052C87] bg-[#FFF12E] px-2 py-0.5 inline-block mt-1 font-bold">Y PAQUETERÍA E-COMMERCE</span>
            </h2>

            <p className="text-[#00277C] text-base leading-relaxed font-sans">
              Especialistas en paquetería e-commerce y logística 3PL en Mar del Plata. Almacenamos tus productos pequeños o medianos en Friuli 1972, realizamos picking por QR y despachamos en el día o 24hs con la tarifa más competitiva.
            </p>

            <div className="pt-4 flex items-center gap-3.5 text-sm text-[#0950F6] font-bold uppercase tracking-wider font-subheading">
              <Landmark className="h-5 w-5 text-[#FFF12E] shrink-0 fill-current" />
              <span>PAQUETERÍA Y LOGÍSTICA B2B MAR DEL PLATA</span>
            </div>
          </div>

          {/* Features columns (Right) - Bento Grid layout with Double-Bezel cards */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
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

        {/* Stats Section Panel */}
        <div className="mt-20 border-t border-brand-blue-100 pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float transition-all duration-300 flex items-center justify-center sm:justify-start"
                >
                  <div className="bg-white p-6 rounded-[20px] border border-brand-blue-50/50 shadow-sm flex items-center gap-5 w-full">
                    <div className="p-3.5 bg-[#FFF12E] text-[#052C87] rounded-xl shrink-0 border border-[#FFF12E] shadow-glow-yellow">
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <div className="text-left">
                      <span className="block text-2xl font-mono tabular-nums font-bold uppercase tracking-tight text-[#052C87] leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="block text-xs uppercase tracking-wider font-subheading text-[#0950F6] font-bold">
                        {stat.label}
                      </span>
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

## 4. Componente: `EmprendedoresBenefits.tsx`

> **Path Relativa:** `src/components/servicios/emprendedores/EmprendedoresBenefits.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Receipt, Info, Warehouse, UserCheck 
} from 'lucide-react';

export default function EmprendedoresBenefits() {
  const benefits = [
    {
      title: 'Partner Logístico Especializado',
      desc: 'Más que un simple servicio de envío, nos convertimos en tu depósito estratégico. Soluciones completas de almacenamiento y fulfillment diseñadas especialmente para PyMEs.',
      icon: Building2,
    },
    {
      title: 'Cuentas Corrientes',
      desc: 'Esquemas ágiles de facturación mensual consolidada adaptados al flujo de caja financiero de tu negocio (Factura C disponible de forma directa).',
      icon: Receipt,
    },
    {
      title: 'Límites Claros y Seguros',
      desc: 'Flota de motos y utilitarios. Llevamos bultos de hasta 5 kg con control y seguimiento centralizado vía WhatsApp.',
      icon: Info,
    },
    {
      title: 'Almacenaje Seguro',
      desc: 'Contamos con depósitos propios en Friuli 1972, Mar del Plata, equipados con alta seguridad para el resguardo de tu stock.',
      icon: Warehouse,
    },
    {
      title: 'Asesor Dedicado',
      desc: 'Asignamos un operador exclusivo para tu firma. Resolvé cualquier consulta operativa o eventualidad directamente con personas reales en MDQ.',
      icon: UserCheck,
    },
  ];

  return (
    <section 
      id="emprendedores-benefits" 
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
            BENEFICIOS PARA NEGOCIOS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white leading-[0.98]">
            POTENCIAMOS TU PYME
          </h2>
          <p className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Dedicá a vender, de la logística nos encargamos nosotros.
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
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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

## 5. Componente: `EmprendedoresPricing.tsx`

> **Path Relativa:** `src/components/servicios/emprendedores/EmprendedoresPricing.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useRef } from 'react';
import { Check, ArrowRight, MessageSquare, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Sparkles } from '@/src/components/ui/sparkles';
import { TimelineContent } from '@/src/components/ui/timeline-animation';
import { VerticalCutReveal } from '@/src/components/ui/vertical-cut-reveal';
import NumberFlow from '@number-flow/react';

export default function EmprendedoresPricing() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const plans = [
    {
      name: 'E-Commerce Same Day',
      price: '$6.000',
      period: 'Fijo toda la ciudad',
      description: 'Stock almacenado en Friuli 1972 (productos chicos/medianos). Sale empaquetado inmediatamente con picking QR.',
      bullets: [
        'Picking por código QR y empaquetado',
        'Despacho y logística en el día',
        'Contrareembolso sin cargo extra',
        'Rechazos devueltos 100% sin costo'
      ],
      highlight: true,
      badge: 'STOCK EN DEPÓSITO'
    },
    {
      name: 'E-Commerce Next Day (24hs)',
      price: '$3.800',
      period: 'Desde $3.800',
      description: 'Retiro programado en tu local para entrega al día siguiente. A mayor cantidad de envíos, baja la tarifa.',
      bullets: [
        'Entrega garantizada en 24 horas',
        'Recolección gratis para +10 envíos (sino $4.000)',
        'Ideal para volúmenes diarios constantes',
        'Resúmenes y reportes de envíos'
      ],
      highlight: false,
      badge: 'RETIRO EN TU LOCAL'
    },
    {
      name: 'Opción DropOFF (-20% OFF)',
      price: '20% OFF',
      period: 'Descuento directo en tarifa',
      description: 'Traé tus paquetes terminados a nuestro depósito central de Friuli 1972 y obtené un 20% de descuento.',
      bullets: [
        '20% de descuento sobre la tarifa final',
        'Recepción directa en Friuli 1972',
        'Ideal para emprendedores con vehículo',
        'Cobro contrareembolso sin comisiones'
      ],
      highlight: false,
      badge: 'AHORRO MÁXIMO'
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
      id="emprendedores-pricing"
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
            MODALIDADES E-COMMERCE Y 3PL 2026
          </TimelineContent>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white flex justify-center leading-[0.98]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              containerClassName="justify-center"
            >
              PLANES PAQUETERÍA Y FULFILLMENT
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            as="p"
            className="text-blue-100 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Elegí la modalidad e-commerce que mejor impulse tu marca. Desde almacenamiento con picking QR en Friuli 1972 hasta opción DropOFF con 20% OFF.
          </TimelineContent>
          <div className="h-1.5 w-16 bg-[#FFF12E] mx-auto rounded-full" />
        </div>

        {/* Pricing Cards Grid Bento layout with Double Bezel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {plans.map((plan, idx) => {
            const isNumericPrice = plan.price.startsWith('$');
            const numericValue = isNumericPrice ? parseInt(plan.price.replace('$', '').replace('.', '')) : null;

            const spanClass = 'lg:col-span-4';

            return (
              <TimelineContent
                key={plan.name}
                animationNum={2 + idx}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                as="div"
                className={`${spanClass} bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float hover:shadow-antigravity-deep transition-all duration-300 flex flex-col`}
              >
                <Card
                  className={`border-0 bg-white text-[#052C87] rounded-[20px] flex flex-col justify-between h-full transition-all duration-300 group text-left shadow-none relative overflow-hidden ${
                    plan.highlight ? 'ring-2 ring-[#FFF12E]' : ''
                  }`}
                >
                  <CardHeader className="p-8 pb-2 text-left relative z-10">
                    {plan.highlight && (
                      <span className="-rotate-1 absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFF12E] text-[#052C87] font-bold font-subheading text-xs tracking-wider px-4 py-1 rounded-full shadow-glow-yellow">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      <span className="text-xs font-subheading tracking-wider uppercase text-[#0950F6] font-bold">
                        {plan.badge}
                      </span>
                      <h3 className="text-2xl font-display uppercase tracking-wider mt-1 min-h-[56px] leading-tight text-[#052C87] font-bold">
                        {plan.name}
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
                          {plan.price}
                        </span>
                      )}
                      <span className="text-xs font-subheading tracking-wider uppercase block mt-1 text-[#3570F8]">{plan.period}</span>
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed font-sans min-h-[48px] text-[#00277C]/80">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-8 pt-0 flex flex-col justify-between flex-grow relative z-10">
                    {/* Bullets */}
                    <ul className="space-y-2.5 pt-4 border-t border-brand-blue-100 mb-6">
                      {plan.bullets.map((bullet) => (
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
                        <span>Elegir {plan.name.split(' ')[0]}</span>
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

        {/* Bottom CTA Special custom callout */}
        <TimelineContent
          animationNum={5}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          as="div"
          className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-[28px] shadow-float"
        >
          <div className="bg-[#052C87] text-white rounded-[20px] p-8 relative overflow-hidden text-left border border-white/10 shadow-sm">
            {/* Background icon watermark */}
            <Briefcase className="absolute -bottom-8 -right-8 h-64 w-64 text-white/[0.04] pointer-events-none select-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="-rotate-1 inline-block px-4 py-1 bg-[#FFF12E] text-[#052C87] rounded-full text-xs font-subheading font-bold uppercase tracking-widest shadow-glow-yellow">
                  CONTRAREEMBOLSO SIN COSTO EXTRA
                </span>
                <h3 className="text-3xl font-display uppercase tracking-tight text-white">
                  ¿Cobrás tus ventas en puerta?
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed font-sans max-w-2xl">
                  Realizamos cobros contrareembolso en Mar del Plata sin ningún costo adicional sobre el valor del producto. Además, podés llevar tus envíos a Friuli 1972 con un <span className="font-mono tabular-nums">20%</span> de descuento en la tarifa final.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href="https://wa.me/542236602699"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="emprendedores-pricing-cta-whatsapp"
                  className="group inline-flex items-center justify-between gap-3 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#052C87] font-subheading font-bold uppercase tracking-wider px-6 py-3 rounded-full text-sm min-h-[48px] shadow-glow-yellow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] w-full sm:w-auto"
                >
                  <span>Agendar Asesoría 3PL</span>
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

