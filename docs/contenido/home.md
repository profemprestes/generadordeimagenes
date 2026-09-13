# 📄 Nodo: Home (Inicio)

> **URL:** `/`  
> **Path Relativa Página:** `src/app/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/page.tsx` | Server Component [SC] |
| Componente | `src/components/home/HeroAnimado.tsx` | Client Component [CC] |
| Componente | `src/components/home/LogisticaNetworkCanvas.tsx` | Client Component [CC] |
| Componente | `src/components/home/VisionSection.tsx` | Client Component [CC] |
| Componente | `src/components/home/ServicesOverview.tsx` | Client Component [CC] |
| Componente | `src/components/home/SliderServicios.tsx` | Client Component [CC] |
| Componente | `src/components/home/EmprendedoresHome.tsx` | Client Component [CC] |
| Componente | `src/components/home/SocialProofSection.tsx` | Client Component [CC] |
| Componente | `src/components/home/CtaSection.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/page.tsx`)

```tsx
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroAnimado from '@/src/components/home/HeroAnimado';
import VisionSection from '@/src/components/home/VisionSection';
import ServicesOverview from '@/src/components/home/ServicesOverview';

// Below-the-fold sections are dynamically loaded to minimize initial JS execution
const SliderServicios = dynamic(() => import('@/src/components/home/SliderServicios'), {
  loading: () => <div className="w-full py-24 min-h-[400px]" />,
});

const EmprendedoresHome = dynamic(() => import('@/src/components/home/EmprendedoresHome'), {
  loading: () => <div className="w-full py-24 min-h-[400px]" />,
});

const SocialProofSection = dynamic(() => import('@/src/components/home/SocialProofSection'), {
  loading: () => <div className="w-full py-24 min-h-[400px]" />,
});

const CtaSection = dynamic(() => import('@/src/components/home/CtaSection'), {
  loading: () => <div className="w-full py-24 min-h-[300px]" />,
});

const baseUrl = 'https://www.enviosdosruedas.com';

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Envíos DosRuedas',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/cotizar/express?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const metadata: Metadata = {
  title: 'Mensajería y Logística E-commerce en Mar del Plata | Envíos DosRuedas',
  description: 'Especialistas en logística e-commerce y última milla en Mar del Plata. Envíos en el día, Flex y soluciones 3PL para potenciar tu negocio local.',
  alternates: {
    canonical: baseUrl,
  },
};

export default function Home() {
  return (
    <div id="home-page-container" className="w-full bg-brand-white-50 text-brand-blue-700 min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      {/* 1. Hero Presentation — Critical Above-the-fold (Immediate FCP & LCP) */}
      <section className="relative z-10">
        <HeroAnimado />
      </section>

      {/* 2. Brand Vision & Trust Metrics — Light Surface */}
      <section className="relative z-10">
        <VisionSection />
      </section>

      {/* 3. Logistics Services Overview — White Bento Grid Canvas */}
      <section className="relative z-10">
        <ServicesOverview />
      </section>

      {/* 4. Tailored Solutions for Industries — Lazy Loaded Below-the-fold */}
      <section className="relative z-10">
        <SliderServicios />
      </section>

      {/* 5. Entrepreneurs & B2B Solutions Panel — Lazy Loaded */}
      <section className="relative z-10">
        <EmprendedoresHome />
      </section>

      {/* 6. Social Proof & Verified Testimonials — Lazy Loaded */}
      <section className="relative z-10">
        <SocialProofSection />
      </section>

      {/* 7. Call to Action High Conversion Segment — Lazy Loaded */}
      <section className="relative z-10">
        <CtaSection />
      </section>
    </div>
  );
}

```

---

## 2. Componente: `HeroAnimado.tsx`

> **Path Relativa:** `src/components/home/HeroAnimado.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Package, MapPin, FastForward, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { CTANestedPill } from '@/src/components/ui';
import HeroProceduralBackground from '@/src/components/ui/HeroProceduralBackground';

export default function HeroAnimado() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Spring configurations following HyperFrames & Framer Motion skill standard
  const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 };
  const snappySpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

  // Orchestrated entrance animation variants for left column
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : springTransition,
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Smooth 3D tilt calculation (±8deg)
    setTilt({
      rotateX: (-y / (rect.height / 2)) * 7,
      rotateY: (x / (rect.width / 2)) * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      id="hero-animado"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white shadow-ambient-elevation"
      style={{ minHeight: '90dvh' }}
    >
      {/* Pure Vector & Dynamic Procedural Background */}
      <HeroProceduralBackground variant="express" />

      {/* Ghost Wordmark Monumental de Fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display uppercase text-[15vw] leading-none text-white/[0.035] tracking-tighter whitespace-nowrap">
          ENVÍOS DOS RUEDAS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions (7 Cols on desktop) */}
          <motion.div
            className="lg:col-span-7 space-y-7 lg:space-y-9 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Top Badge */}
            <motion.div className="flex justify-center lg:justify-start" variants={itemVariants}>
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-subheading font-bold uppercase tracking-widest bg-[#FFF12E] text-[#0950F6] shadow-glow-yellow border border-[#FFF12E] cursor-default"
                whileHover={reduceMotion ? undefined : { scale: 1.03, transition: snappySpring }}
              >
                <Sparkles className="w-3.5 h-3.5 fill-[#0950F6]" />
                Tu Solución Confiable en Mar del Plata
              </motion.span>
            </motion.div>

            {/* Title with Signature Kinetic Typography */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display uppercase tracking-tight leading-[0.98] flex flex-col items-center lg:items-start gap-2 select-none"
              variants={itemVariants}
            >
              <span className="kinetic-font-stretch">
                Mensajería y Logística
              </span>
              <span className="relative inline-block bg-[#052C87]/80 px-3.5 py-1 my-1 transform -rotate-1 rounded-xl border border-[#FFF12E]/40 shadow-xl">
                <span className="relative z-10 bg-[#FFF12E] text-[#0950F6] px-3 py-1 inline-block font-display font-black rounded-lg">
                  E-Commerce
                </span>
              </span>
              <span className="kinetic-font-stretch text-white">
                en Mar del Plata
              </span>
            </motion.h1>

            {/* Body Text in Rioplatense voice */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed text-brand-blue-100/90 font-light"
              variants={itemVariants}
            >
              Somos tu partner estratégico en mensajería urbana, envíos en el día y delivery de última milla. Flota propia de motos, cero tercerización y respuesta inmediata.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-1"
              variants={itemVariants}
            >
              <a
                href="/cotizar/express"
                id="hero-cta-solicitar"
                className="group inline-flex items-center justify-between rounded-full min-h-[52px] px-8 py-3.5 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading text-lg font-bold uppercase tracking-wider shadow-glow-yellow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Cotizá Express</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0950F6]/15 text-[#0950F6] ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="/servicios/envios-express"
                id="hero-cta-servicios"
                className="group inline-flex items-center justify-between rounded-full min-h-[52px] px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white font-subheading text-lg font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>Mirá los Servicios</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white ml-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            {/* Features / Trust Badges list */}
            <motion.div
              className="pt-2 flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-8 text-brand-blue-100/80"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center gap-2.5 font-subheading text-sm uppercase tracking-wider cursor-default"
                whileHover={reduceMotion ? undefined : { x: 3, transition: snappySpring }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-yellow-500/15 border border-brand-yellow-500/30 flex items-center justify-center text-brand-yellow-500">
                  <Package className="h-4 w-4" />
                </div>
                <span>+50k Envíos</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2.5 font-subheading text-sm uppercase tracking-wider cursor-default"
                whileHover={reduceMotion ? undefined : { x: 3, transition: snappySpring }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-yellow-500/15 border border-brand-yellow-500/30 flex items-center justify-center text-brand-yellow-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Cobertura Total MDQ</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2.5 font-subheading text-sm uppercase tracking-wider cursor-default"
                whileHover={reduceMotion ? undefined : { x: 3, transition: snappySpring }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-yellow-500/15 border border-brand-yellow-500/30 flex items-center justify-center text-brand-yellow-500">
                  <FastForward className="h-4 w-4" />
                </div>
                <span>Entregas en el Día</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Card with 3D Tilt & Lighting */}
          <div
            className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0"
            style={{ perspective: '1200px' }}
          >
            {/* Ambient Backlight Glow behind 3D image */}
            <motion.div
              className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-brand-yellow-500/20 rounded-full blur-[100px] pointer-events-none -z-10"
              animate={reduceMotion ? {} : { scale: [1, 1.06, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute w-60 sm:w-80 h-60 sm:h-80 bg-brand-blue-500/30 rounded-full blur-[90px] pointer-events-none -z-10" />

            {/* Interactive Floating 3D Graphic Container */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: reduceMotion ? 0 : tilt.rotateX,
                rotateY: reduceMotion ? 0 : tilt.rotateY,
              }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : {
                      opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      rotateX: snappySpring,
                      rotateY: snappySpring,
                    }
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={reduceMotion ? undefined : { y: -6, transition: snappySpring }}
              className="relative w-full max-w-[460px] transform-style-3d cursor-pointer"
            >
              {/* Outer Double Bezel Frame for Hero Asset */}
              <div className="p-3 sm:p-4 rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-glow-yellow transition-shadow duration-300">
                <div className="relative rounded-[20px] overflow-hidden bg-[#052C87] border border-white/15 p-4 sm:p-6 flex flex-col items-center">
                  
                  {/* Top HUD Telemetry Pill */}
                  <div className="w-full flex items-center justify-between gap-2 mb-4 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFF12E] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFF12E]" />
                      </span>
                      <span className="font-subheading text-[11px] sm:text-xs uppercase tracking-widest text-[#FFF12E] font-bold">
                        Ruteo Activo · MDQ
                      </span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-white bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
                      Friuli 1972
                    </span>
                  </div>

                  {/* Main 3D Card Image Asset with depth */}
                  <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center my-1 drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] transform-style-3d">
                    <Image
                      src="/card_mapa.webp"
                      alt="Envíos DosRuedas - Mapa y Cobertura Logística en Mar del Plata"
                      width={500}
                      height={500}
                      priority
                      className="object-contain w-full h-full transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Bottom Feature Badges Overlay */}
                  <div className="w-full grid grid-cols-2 gap-2.5 mt-3">
                    <motion.div
                      className="bg-brand-blue-900/80 border border-white/15 p-2.5 rounded-xl flex items-center gap-2.5"
                      whileHover={reduceMotion ? undefined : { scale: 1.03, transition: snappySpring }}
                    >
                      <div className="p-1.5 rounded-lg bg-brand-yellow-500 text-brand-blue-900 shrink-0">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-subheading text-xs font-bold uppercase text-white leading-tight">
                          Envíos Same-Day
                        </p>
                        <p className="font-sans text-[10px] text-brand-blue-200">Entrega en el Día</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-brand-blue-900/80 border border-white/15 p-2.5 rounded-xl flex items-center gap-2.5"
                      whileHover={reduceMotion ? undefined : { scale: 1.03, transition: snappySpring }}
                    >
                      <div className="p-1.5 rounded-lg bg-brand-blue-500 text-white shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-subheading text-xs font-bold uppercase text-white leading-tight">
                          Flota Propia
                        </p>
                        <p className="font-sans text-[10px] text-brand-blue-200">Cero Tercerización</p>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom gradient border fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-yellow-500 pointer-events-none" />
    </section>
  );
}
```

---

## 3. Componente: `LogisticaNetworkCanvas.tsx`

> **Path Relativa:** `src/components/home/LogisticaNetworkCanvas.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import gsap from 'gsap';

// Deterministic particle configuration (pre-calculated, no Math.random at runtime)
const DETERMINISTIC_PARTICLES = [
  { connIndex: 0, speed: 0.0035, size: 2.8, color: '#FFEC01', initialProgress: 0.1 },
  { connIndex: 1, speed: 0.0028, size: 3.2, color: '#ffffff', initialProgress: 0.3 },
  { connIndex: 2, speed: 0.0042, size: 2.5, color: '#ffffff', initialProgress: 0.5 },
  { connIndex: 3, speed: 0.0031, size: 3.0, color: '#FFEC01', initialProgress: 0.7 },
  { connIndex: 4, speed: 0.0038, size: 2.7, color: '#ffffff', initialProgress: 0.2 },
  { connIndex: 5, speed: 0.0025, size: 3.3, color: '#FFEC01', initialProgress: 0.4 },
  { connIndex: 6, speed: 0.0045, size: 2.4, color: '#ffffff', initialProgress: 0.6 },
  { connIndex: 7, speed: 0.0032, size: 2.9, color: '#ffffff', initialProgress: 0.8 },
  { connIndex: 8, speed: 0.0037, size: 2.6, color: '#FFEC01', initialProgress: 0.05 },
  { connIndex: 9, speed: 0.0029, size: 3.1, color: '#ffffff', initialProgress: 0.25 },
  { connIndex: 10, speed: 0.0041, size: 2.3, color: '#ffffff', initialProgress: 0.45 },
  { connIndex: 11, speed: 0.0033, size: 2.85, color: '#FFEC01', initialProgress: 0.65 },
  { connIndex: 12, speed: 0.0036, size: 2.75, color: '#ffffff', initialProgress: 0.85 },
  { connIndex: 13, speed: 0.0030, size: 3.05, color: '#FFEC01', initialProgress: 0.15 },
  { connIndex: 14, speed: 0.0043, size: 2.45, color: '#ffffff', initialProgress: 0.35 },
  { connIndex: 15, speed: 0.0034, size: 2.95, color: '#FFEC01', initialProgress: 0.55 },
];

export default function LogisticaNetworkCanvas() {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const particleRefs = useRef<Array<{
    fromNode: { x: number; y: number };
    toNode: { x: number; y: number };
    progress: number;
    speed: number;
    size: number;
    color: string;
    connIndex: number;
  }>>([]);
  const nodeMapRef = useRef<Map<string, { id: string; x: number; y: number; label: string; size: number }>>(new Map());
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    widthRef.current = canvas.width = canvas.offsetWidth;
    heightRef.current = canvas.height = canvas.offsetHeight;

    // ─── Definición de nodos (posiciones relativas al viewport) ─────────────────
    type NodeDef = { id: string; label: string; size: number; xRatio: number; yRatio: number };
    const nodeDefs: NodeDef[] = [
      { id: 'cd',           label: 'Sede Central (Friuli)', size: 6, xRatio: 0.45, yRatio: 0.60 },
      { id: 'centro',       label: 'Centro',                size: 4, xRatio: 0.68, yRatio: 0.42 },
      { id: 'la_perla',     label: 'La Perla',              size: 4, xRatio: 0.65, yRatio: 0.30 },
      { id: 'constitucion', label: 'Constitución',          size: 4, xRatio: 0.52, yRatio: 0.18 },
      { id: 'guemes',       label: 'Zona Güemes',           size: 4, xRatio: 0.73, yRatio: 0.52 },
      { id: 'playa_grande', label: 'Playa Grande',          size: 4, xRatio: 0.77, yRatio: 0.63 },
      { id: 'puerto',       label: 'Puerto',                size: 4, xRatio: 0.72, yRatio: 0.76 },
      { id: 'bosque',       label: 'Bosque Peralta Ramos',  size: 4, xRatio: 0.64, yRatio: 0.88 },
      { id: 'batan',        label: 'Batán / P. Industrial', size: 5, xRatio: 0.22, yRatio: 0.72 },
    ];

    // Conexiones de ruteo (avenidas / costanera de MDQ)
    const connections: { from: string; to: string }[] = [
      { from: 'cd',          to: 'batan' },
      { from: 'cd',          to: 'centro' },
      { from: 'cd',          to: 'guemes' },
      { from: 'cd',          to: 'puerto' },
      { from: 'cd',          to: 'constitucion' },
      { from: 'constitucion', to: 'la_perla' },
      { from: 'constitucion', to: 'centro' },
      { from: 'la_perla',    to: 'centro' },
      { from: 'centro',      to: 'guemes' },
      { from: 'guemes',      to: 'playa_grande' },
      { from: 'playa_grande', to: 'puerto' },
      { from: 'puerto',      to: 'bosque' },
    ];

    const buildNodeMap = () => {
      const newMap = new Map<string, { id: string; x: number; y: number; label: string; size: number }>();
      nodeDefs.forEach((def) => {
        newMap.set(def.id, {
          id: def.id,
          x: widthRef.current * def.xRatio,
          y: heightRef.current * def.yRatio,
          label: def.label,
          size: def.size,
        });
      });
      nodeMapRef.current = newMap;
    };

    buildNodeMap();

    // Initialize deterministic particles
    particleRefs.current = DETERMINISTIC_PARTICLES.map((p) => {
      const conn = connections[p.connIndex % connections.length];
      const fromNode = nodeMapRef.current.get(conn.from);
      const toNode = nodeMapRef.current.get(conn.to);
      return {
        fromNode: fromNode!,
        toNode: toNode!,
        progress: p.initialProgress,
        speed: p.speed,
        size: p.size,
        color: p.color,
        connIndex: p.connIndex,
      };
    });

    // ─── Eventos de mouse / touch ────────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const heroSection = canvas.closest('section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
      heroSection.addEventListener('touchmove', handleTouchMove);
      heroSection.addEventListener('touchend', handleMouseLeave);
    }

    // ─── GSAP Timeline (paused, deterministic, seek-safe) ────────────────────────
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    timelineRef.current = tl;

    // Register with HyperFrames global (determinism contract)
    if (typeof window !== 'undefined') {
      (window as Window & { __timelines?: Record<string, gsap.core.Timeline> }).__timelines = {
        ...(window as Window & { __timelines?: Record<string, gsap.core.Timeline> }).__timelines,
        'logistica-network-canvas': tl,
      };
    }

    // Timeline duration = particle cycle time (deterministic)
    const timelineDuration = 10; // seconds

    // Create a proxy object to drive the animation progress
    const progressProxy = { value: 0 };

    tl.to(progressProxy, {
      value: 1,
      duration: timelineDuration,
      ease: 'none',
    });

    // Start the timeline
    tl.play();

    // ─── Render loop driven by GSAP timeline ─────────────────────────────────────
    const render = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      // 1. Conexiones
      ctx.lineWidth = 1.0;
      connections.forEach((conn) => {
        const fromNode = nodeMapRef.current.get(conn.from);
        const toNode = nodeMapRef.current.get(conn.to);
        if (!fromNode || !toNode) return;

        const dx = (fromNode.x + toNode.x) / 2 - mouseRef.current.x;
        const dy = (fromNode.y + toNode.y) / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.strokeStyle =
          dist < 180
            ? `rgba(255, 236, 1, ${0.15 + (1 - dist / 180) * 0.3})`
            : 'rgba(255, 255, 255, 0.12)';

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      });

      // 2. Partículas (driven by GSAP timeline progress)
      const timelineProgress = tl.progress();

      particleRefs.current.forEach((p) => {
        // Update progress based on timeline (deterministic, seek-safe)
        p.progress += p.speed * 0.016; // ~60fps equivalent per frame

        if (p.progress >= 1) {
          p.progress = 0;
          const conn = connections[p.connIndex % connections.length];
          const fromNode = nodeMapRef.current.get(conn.from);
          const toNode = nodeMapRef.current.get(conn.to);
          if (fromNode && toNode) {
            p.fromNode = fromNode;
            p.toNode = toNode;
          }
        }

        const x = p.fromNode.x + (p.toNode.x - p.fromNode.x) * p.progress;
        const y = p.fromNode.y + (p.toNode.y - p.fromNode.y) * p.progress;

        const dx = x - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let currentSize = p.size;
        let glow = 0;

        if (dist < 120) {
          const force = 1 - dist / 120;
          currentSize += force * 1.5;
          glow = force * 4;
        }

        ctx.fillStyle = p.color;
        if (glow > 0) {
          ctx.shadowBlur = glow;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Nodos (centros de la red logística)
      nodeMapRef.current.forEach((node) => {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < 150;

        if (isNear) {
          ctx.fillStyle = 'rgba(255, 236, 1, 0.4)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = isNear ? '#FFEC01' : '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        if (isNear || node.id === 'cd') {
          ctx.fillStyle = isNear ? '#FFEC01' : '#ffffff';
          ctx.font = '500 10px var(--font-sans)';
          ctx.fillText(node.label.toUpperCase(), node.x + 10, node.y + 3);
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    // ─── Resize handler ──────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!canvas) return;
      widthRef.current = canvas.width = canvas.offsetWidth;
      heightRef.current = canvas.height = canvas.offsetHeight;
      buildNodeMap();

      // Re-assign particle nodes after resize
      particleRefs.current.forEach((p) => {
        const conn = connections[particleRefs.current.indexOf(p) % connections.length];
        const fromNode = nodeMapRef.current.get(conn.from);
        const toNode = nodeMapRef.current.get(conn.to);
        if (fromNode && toNode) {
          p.fromNode = fromNode;
          p.toNode = toNode;
        }
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
        heroSection.removeEventListener('touchmove', handleTouchMove);
        heroSection.removeEventListener('touchend', handleMouseLeave);
      }
      // Cleanup global timeline reference
      if (typeof window !== 'undefined' && (window as Window & { __timelines?: Record<string, gsap.core.Timeline> }).__timelines) {
        delete (window as Window & { __timelines?: Record<string, gsap.core.Timeline> }).__timelines!['logistica-network-canvas'];
      }
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.3 }} />;
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
```

---

## 4. Componente: `VisionSection.tsx`

> **Path Relativa:** `src/components/home/VisionSection.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, animate, type Variants } from 'motion/react';
import { Clock, ShieldCheck, Users, Truck } from 'lucide-react';

function CounterMetric({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  return (
    <motion.span
      onViewportEnter={() => {
        if (reduceMotion) {
          count.set(value);
        } else {
          animate(count, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
        }
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="tabular-nums font-mono"
    >
      {rounded}
    </motion.span>
  );
}

export default function VisionSection() {
  const reduceMotion = useReducedMotion();

  // Spring transition configs
  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 20 };
  const springConfigCard = { type: 'spring' as const, stiffness: 300, damping: 25 };

  // Container variants with orchestrated stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : springConfig,
    },
  };

  return (
    <section
      id="vision-section"
      className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Information Block */}
          <motion.div className="lg:col-span-6 space-y-8" variants={itemVariants}>
            <motion.span
              className="px-4 py-1.5 bg-[#FFF12E]/20 text-[#0950F6] rounded-full text-xs font-subheading font-bold tracking-widest inline-block border border-[#FFF12E] uppercase cursor-default shadow-glow-yellow"
              whileHover={reduceMotion ? undefined : { scale: 1.03, transition: springConfigCard }}
            >
              Partner Logístico Especializado
            </motion.span>

            <motion.h2
              className="kinetic-font-stretch text-[#0950F6] text-5xl sm:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[0.98] text-left inline-block"
            >
              CONECTAMOS MAR DEL PLATA DE PUNTA A PUNTA
            </motion.h2>

            <motion.p
              className="text-brand-ink/85 text-base sm:text-lg leading-relaxed font-sans max-w-prose font-medium"
            >
              Nos especializamos en la distribución de última milla para e-commerce locales y retailers nacionales, asegurando que tus productos lleguen al destino en tiempo récord con flota propia y tarifas transparentes.
            </motion.p>

            <motion.div className="space-y-5 pt-4" variants={itemVariants}>
              {/* Feature 1 */}
              <motion.div
                className="flex gap-4 items-start p-4 rounded-xl hover:bg-brand-blue-50/70 border border-transparent hover:border-brand-blue-100 transition-colors group cursor-default"
                whileHover={reduceMotion ? undefined : { x: 4, transition: springConfigCard }}
              >
                <motion.div
                  className="p-3 bg-brand-yellow-500 text-brand-blue-900 rounded-xl shrink-0 border border-brand-yellow-400 shadow-xs"
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 6, transition: springConfigCard }}
                >
                  <Clock className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-subheading uppercase tracking-wider text-brand-blue-700 leading-none mb-2 font-bold">
                    Entregas a Tiempo
                  </h3>
                  <p className="text-sm text-brand-ink/75 font-sans leading-relaxed">
                    Puntualidad garantizada en cada envío. Optimizamos cada ruta mediante geolocalización avanzada en Mar del Plata.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex gap-4 items-start p-4 rounded-xl hover:bg-brand-blue-50/70 border border-transparent hover:border-brand-blue-100 transition-colors group cursor-default"
                whileHover={reduceMotion ? undefined : { x: 4, transition: springConfigCard }}
              >
                <motion.div
                  className="p-3 bg-brand-yellow-500 text-brand-blue-900 rounded-xl shrink-0 border border-brand-yellow-400 shadow-xs"
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -6, transition: springConfigCard }}
                >
                  <ShieldCheck className="h-6 w-6" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-subheading uppercase tracking-wider text-brand-blue-700 leading-none mb-2 font-bold">
                    Envíos Seguros
                  </h3>
                  <p className="text-sm text-brand-ink/75 font-sans leading-relaxed">
                    Protección total de tus paquetes. Despachos con custodia digital y confirmación de entrega en el acto.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Stats Deck Block (Asymmetrical Bento Grid) */}
          <motion.div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6" variants={itemVariants}>

            {/* Main Bento Card: Envíos Realizados */}
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -6, transition: springConfigCard }}
              className="sm:col-span-2 p-3 sm:p-4 rounded-[28px] bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl hover:shadow-glow-yellow transition-shadow group cursor-default"
            >
              <div className="bg-[#0950F6] rounded-[20px] p-6 sm:p-8 text-white relative overflow-hidden h-full flex flex-col justify-between border border-white/20">
                <div className="flex justify-between items-start mb-12">
                  <motion.div
                    className="p-3 bg-[#FFF12E] text-[#0950F6] border border-[#FFF12E] rounded-xl shadow-glow-yellow"
                    whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4, transition: springConfigCard }}
                  >
                    <Truck className="h-6 w-6" />
                  </motion.div>
                  <span className="text-[10px] font-subheading tracking-widest uppercase px-3 py-1.5 rounded-lg bg-[#052C87] text-[#FFF12E] font-bold border border-[#FFF12E]/30">
                    MAR DEL PLATA 2026
                  </span>
                </div>
                <div>
                  <h3 className="text-7xl lg:text-8xl font-mono tracking-tighter font-bold uppercase leading-none mb-3 tabular-nums text-white">
                    <CounterMetric value={50} prefix="+" suffix="K" />
                  </h3>
                  <p className="text-sm text-white/90 font-sans uppercase tracking-wider leading-relaxed font-medium">
                    Envíos y entregas realizadas con éxito en toda la región
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Paquetes Extraviados (Double Bezel Glass Container) */}
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -6, transition: springConfigCard }}
              className="p-2 sm:p-2.5 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-glow-blue transition-shadow group cursor-default"
            >
              <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-blue-100 shadow-sm flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-blue-50 text-[#0950F6] group-hover:bg-[#0950F6] group-hover:text-[#FFF12E] border border-blue-100 transition-colors shadow-xs"
                    whileHover={reduceMotion ? undefined : { scale: 1.08, transition: springConfigCard }}
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-6xl font-mono font-bold tracking-tighter text-[#0950F6] leading-none mb-2 tabular-nums">
                    0
                  </h3>
                  <p className="text-[11px] text-[#0950F6]/80 font-sans uppercase tracking-widest font-bold">
                    Paquetes extraviados
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 3: Emprendedores Confían (Double Bezel Glass Container) */}
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -6, transition: springConfigCard }}
              className="p-2 sm:p-2.5 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-glow-blue transition-shadow group cursor-default"
            >
              <div className="bg-white p-6 sm:p-8 rounded-[20px] border border-blue-100 shadow-sm flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-blue-50 text-[#0950F6] group-hover:bg-[#0950F6] group-hover:text-[#FFF12E] border border-blue-100 transition-colors shadow-xs"
                    whileHover={reduceMotion ? undefined : { scale: 1.08, transition: springConfigCard }}
                  >
                    <Users className="h-5 w-5" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-6xl font-mono font-bold tracking-tighter text-[#0950F6] leading-none mb-2 tabular-nums">
                    <CounterMetric value={50} prefix="+" />
                  </h3>
                  <p className="text-[11px] text-[#0950F6]/80 font-sans uppercase tracking-widest font-bold">
                    Emprendedores confían
                  </p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
```

---

## 5. Componente: `ServicesOverview.tsx`

> **Path Relativa:** `src/components/home/ServicesOverview.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap, Package, Truck, Warehouse, Info, X, MapPin, ShieldCheck } from 'lucide-react';

interface ServiceDetails {
  summary: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

interface ServiceStats {
  time: string;
  price: string;
  weight: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  city: string;
  founded: string;
  imageUrl: string;
  cardStyleCenter: string;
  cardStyleSide: string;
  textColor: string;
  titleColor: string;
  descColor: string;
  imgBlend: string;
  badgeStyle: string;
  statBoxStyle: string;
  statValStyle: string;
  statLabelStyle: string;
  hintColor: string;
  stats: ServiceStats;
  details: ServiceDetails;
}

export default function ServicesOverview() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Snappy spring configs
  const springConfigSnappy = { type: 'spring' as const, stiffness: 300, damping: 25 };
  const springConfigCarousel = { type: 'spring' as const, stiffness: 140, damping: 22 };

  const services: ServiceItem[] = [
    {
      id: 'express',
      title: 'Envíos Express',
      description: 'Mensajería en moto con entregas inmediatas de alta prioridad.',
      href: '/servicios/envios-express',
      icon: Zap,
      badge: 'URGENTE',
      city: 'Cobertura MDQ',
      founded: '+7 Años de Trayectoria',
      imageUrl: '/cards/fondo_express.webp',
      cardStyleCenter: 'border-brand-yellow-500 bg-gradient-to-br from-brand-blue-700 to-brand-blue-900 shadow-cta-glow text-white',
      cardStyleSide: 'border-brand-blue-500/20 bg-brand-blue-800 text-white/90',
      textColor: 'text-white',
      titleColor: 'text-white group-hover:text-brand-yellow-500',
      descColor: 'text-brand-blue-100',
      imgBlend: 'opacity-25 mix-blend-overlay',
      badgeStyle: 'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-400',
      statBoxStyle: 'bg-white/10 border border-white/10 text-white',
      statValStyle: 'text-brand-yellow-500',
      statLabelStyle: 'text-brand-blue-200',
      hintColor: 'text-brand-yellow-500',
      stats: {
        time: '30-90 min',
        price: '$3.700 Base',
        weight: 'Hasta 10 kg',
      },
      details: {
        summary: 'Servicio de mensajería urbana inmediata, ideal para trámites urgentes, despacho de encomiendas y entrega de documentación. Se asigna un repartidor exclusivo para tu envío.',
        features: [
          'Tarifa base de $3.700 hasta 3 km.',
          'Entrega garantizada puerta a puerta en tiempo récord.',
          'Notificación automática de entrega por WhatsApp.'
        ],
        ctaText: 'COTIZÁ TU EXPRESS',
        ctaHref: '/cotizar/express'
      }
    },
    {
      id: 'lowcost',
      title: 'Envíos LowCost',
      description: 'Envíos económicos planificados con retiro y entrega coordinados.',
      href: '/servicios/envios-lowcost',
      icon: Package,
      badge: 'ECONÓMICO',
      city: 'Todo Gral. Pueyrredón',
      founded: 'Tarifa Fija Especial',
      imageUrl: '/cards/fondo_lowcost.webp',
      cardStyleCenter: 'border-brand-blue-500 bg-gradient-to-br from-brand-white-50 to-brand-blue-50 shadow-[8px_8px_0px_rgba(6,54,165,0.2)] text-brand-ink',
      cardStyleSide: 'border-brand-blue-100 bg-white text-brand-ink',
      textColor: 'text-brand-ink',
      titleColor: 'text-brand-ink group-hover:text-brand-blue-700',
      descColor: 'text-brand-blue-600',
      imgBlend: 'opacity-[0.15] grayscale mix-blend-multiply',
      badgeStyle: 'bg-brand-blue-700 text-brand-yellow-500 border-brand-blue-600/30',
      statBoxStyle: 'bg-brand-blue-50/80 border border-brand-blue-100 text-brand-ink',
      statValStyle: 'text-brand-blue-700',
      statLabelStyle: 'text-brand-blue-600',
      hintColor: 'text-brand-blue-700',
      stats: {
        time: 'Same / Next Day',
        price: '$3.000 Base',
        weight: 'Hasta 15 kg',
      },
      details: {
        summary: 'La alternativa ideal para e-commerce locales que buscan optimizar costos de envío. Agrupamos los repartos en rutas inteligentes diarias para ofrecer la tarifa más baja de la ciudad.',
        features: [
          'Tarifa base de $3.000 hasta 3 km.',
          'Retiro gratis a domicilio a partir de 5 envíos diarios.',
          'Dos franjas horarias de entrega en el día.'
        ],
        ctaText: 'PROBÁ EL LOWCOST',
        ctaHref: '/cotizar/lowcost'
      }
    },
    {
      id: 'flex',
      title: 'Envíos Flex',
      description: 'Entregas en el día integradas para tus ventas de MercadoLibre.',
      href: '/servicios/enviosflex',
      icon: Truck,
      badge: 'MERCADOLIBRE FLEX',
      city: 'Mar del Plata y Batán',
      founded: 'Corte extendido 15hs',
      imageUrl: '/cards/fondo_flex.webp',
      cardStyleCenter: 'border-brand-blue-700 bg-gradient-to-br from-brand-yellow-500 to-brand-yellow-400 shadow-[8px_8px_0px_rgba(255,236,1,0.25)] text-brand-ink',
      cardStyleSide: 'border-brand-yellow-500/30 bg-brand-yellow-500 text-brand-ink',
      textColor: 'text-brand-ink',
      titleColor: 'text-brand-ink group-hover:text-brand-blue-900',
      descColor: 'text-brand-blue-900/80',
      imgBlend: 'opacity-20 mix-blend-multiply',
      badgeStyle: 'bg-brand-blue-900 text-white border-brand-blue-700/30',
      statBoxStyle: 'bg-brand-blue-700/10 border border-brand-blue-700/20 text-brand-ink',
      statValStyle: 'text-brand-blue-900',
      statLabelStyle: 'text-brand-blue-800',
      hintColor: 'text-brand-blue-900',
      stats: {
        time: 'En el día',
        price: 'Zonificado LowCost',
        weight: 'Apto Moto / Auto',
      },
      details: {
        summary: 'Habilitá Envíos Flex en tu cuenta de MercadoLibre y despachá todas tus ventas en el mismo día. Mejorá tu reputación y convertite en vendedor destacado con recolección gratuita.',
        features: [
          'Visitas bonificadas según tu volumen diario de entregas.',
          'Reparto coordinado antes de las 20:00 hs.',
          'Recolección a domicilio sin cargo extra por nuestro equipo.'
        ],
        ctaText: 'CONFIGURÁ FLEX',
        ctaHref: '/servicios/enviosflex'
      }
    },
    {
      id: '3pl',
      title: 'E-Commerce & 3PL',
      description: 'Logística integral: almacenamiento, preparación y despacho de pedidos.',
      href: '/servicios/plan-emprendedores',
      icon: Warehouse,
      badge: 'LOGÍSTICA INTEGRAL',
      city: 'Depósito Friuli 1972',
      founded: 'Depósito Inteligente',
      imageUrl: '/cards/fondo_emprendedores.webp',
      cardStyleCenter: 'border-brand-blue-500 bg-gradient-to-br from-brand-blue-800 to-brand-blue-950 shadow-2xl text-white',
      cardStyleSide: 'border-brand-blue-800/20 bg-brand-blue-900 text-white/90',
      textColor: 'text-white',
      titleColor: 'text-white group-hover:text-brand-yellow-500',
      descColor: 'text-brand-blue-100',
      imgBlend: 'opacity-25 mix-blend-overlay',
      badgeStyle: 'bg-brand-blue-900 text-white border-brand-blue-700/30',
      statBoxStyle: 'bg-white/10 border border-white/10 text-white',
      statValStyle: 'text-brand-yellow-500',
      statLabelStyle: 'text-brand-blue-200',
      hintColor: 'text-brand-yellow-500',
      stats: {
        time: '24 hs / Stock',
        price: 'Planes a Medida',
        weight: 'Sin límite',
      },
      details: {
        summary: 'Almacená tus productos en nuestro depósito central en Mar del Plata y olvidate del empaque y los despachos. Nosotros nos encargamos de todo el proceso logístico para que te dediques a vender.',
        features: [
          'Control de stock digital por sistema QR/barras.',
          'Embalaje profesional (packing personalizado y seguro).',
          'Distribución de pedidos Same-Day y Next-Day.'
        ],
        ctaText: 'CONSULTÁ PLANES',
        ctaHref: '/servicios/plan-emprendedores'
      }
    },
  ];

  const totalServices = services.length;
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation with deterministic timing
  useEffect(() => {
    if (!isAutoRotate || reduceMotion || selectedService) {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      return;
    }

    autoRotateIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalServices);
    }, 4500);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
    };
  }, [isAutoRotate, totalServices, reduceMotion, selectedService]);

  const handlePrev = useCallback(() => {
    setIsAutoRotate(false);
    setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
  }, [totalServices]);

  const handleNext = useCallback(() => {
    setIsAutoRotate(false);
    setActiveIndex((prev) => (prev + 1) % totalServices);
  }, [totalServices]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedService) {
        if (e.key === 'Escape') setSelectedService(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, selectedService]);

  // Calculate card transforms using spring-based derived values
  const getCardTransform = (index: number) => {
    const offset = (index - activeIndex + totalServices / 2) % totalServices - totalServices / 2;
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    if (reduceMotion) {
      return {
        rotateY: 0,
        translateZ: 0,
        translateX: 0,
        opacity: isCenter ? 1 : 0,
        scale: isCenter ? 1 : 0.7,
        zIndex: isCenter ? totalServices : totalServices - absOffset,
      };
    }

    const rotateY = offset * -28;
    const translateZ = isCenter ? 120 : -absOffset * 180;
    const translateX = offset * (isSmallScreen ? 140 : 260);
    const opacity = isCenter ? 1 : Math.max(0.15, 1 - absOffset * 0.4);
    const scale = isCenter ? 1.05 : Math.max(0.65, 1 - absOffset * 0.18);

    return { rotateY, translateZ, translateX, opacity, scale, zIndex: totalServices - absOffset };
  };

  return (
    <section
      id="services-overview"
      className="py-24 bg-[#052C87] text-white relative overflow-hidden"
      style={{ perspective: '2000px' }}
      onMouseEnter={() => setIsAutoRotate(false)}
      onMouseLeave={() => !selectedService && setIsAutoRotate(true)}
    >
      {/* Background Decorative Asymmetric Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow-500/5 rounded-full blur-3xl pointer-events-none"
        animate={reduceMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header with Viewport Entry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8"
        >
          <div>
            <div className="px-4 py-1.5 bg-[#0950F6] text-[#FFF12E] rounded-full text-xs font-subheading font-bold tracking-widest inline-block uppercase shadow-glow-yellow mb-3 border border-[#FFF12E]/40">
              NUESTROS SERVICIOS
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight leading-none text-balance">
              SOLUCIONES LOGÍSTICAS <br />
              <span className="text-[#FFF12E] drop-shadow-[0_2px_10px_rgba(255,241,46,0.35)] underline decoration-[#0950F6] underline-offset-8">
                A TU MEDIDA
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className={`px-4 py-2 rounded-full text-xs font-bold font-subheading tracking-wider border transition-colors cursor-pointer ${
                isAutoRotate
                  ? 'bg-[#FFF12E] text-[#0950F6] border-[#FFF12E] shadow-glow-yellow'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {isAutoRotate ? '⚡ ROTACIÓN AUTOMÁTICA' : 'ROTACIÓN PAUSADA'}
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                onClick={handlePrev}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className="p-3 rounded-full bg-white/10 hover:bg-brand-yellow-500 hover:text-brand-blue-900 border border-white/20 cursor-pointer transition-colors"
                aria-label="Anterior Servicio"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleNext}
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className="p-3 rounded-full bg-white/10 hover:bg-brand-yellow-500 hover:text-brand-blue-900 border border-white/20 cursor-pointer transition-colors"
                aria-label="Siguiente Servicio"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 3D Tilted Card Carousel Container */}
        <div
          ref={carouselRef}
          className="relative h-[500px] sm:h-[540px] flex items-center justify-center my-8"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const transform = getCardTransform(index);
            const isCenter = transform.opacity === 1;

            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => {
                  if (isCenter) {
                    setSelectedService(service);
                  } else {
                    setActiveIndex(index);
                    setIsAutoRotate(false);
                  }
                }}
                className="absolute w-[290px] sm:w-[350px] h-[440px] sm:h-[490px] rounded-3xl cursor-pointer select-none group text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: transform.zIndex,
                  willChange: 'transform, opacity',
                }}
                animate={{
                  rotateY: transform.rotateY,
                  translateZ: transform.translateZ,
                  translateX: transform.translateX,
                  opacity: transform.opacity,
                  scale: transform.scale,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0.01 }
                    : springConfigCarousel
                }
                whileHover={isCenter && !reduceMotion ? { scale: 1.02, transition: springConfigSnappy } : undefined}
              >
                {/* Card Structure with Color Block Themes */}
                <div
                  className={`w-full h-full rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden border-4 shadow-2xl ${
                    isCenter ? service.cardStyleCenter : service.cardStyleSide
                  }`}
                >
                  {/* Background Image with Layer Blend */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill={true}
                      sizes="(max-width: 768px) 290px, 350px"
                      className={`object-cover ${service.imgBlend}`}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent opacity-60" />
                  </div>

                  {/* Center Card Ambient Glow Overlay */}
                  {isCenter && (
                    <motion.div
                      className="absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 -mr-12 -mb-12"
                      style={{
                        backgroundColor: index === 3 ? 'var(--color-brand-blue-500)' : 'var(--color-brand-yellow-500)',
                      }}
                      animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
                      transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                    />
                  )}

                  {/* Watermark Background Icon */}
                  <motion.div
                    className="absolute right-4 bottom-4 opacity-[0.06] pointer-events-none select-none"
                    animate={isCenter && !reduceMotion ? { rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                  >
                    <Icon className="w-48 h-48" />
                  </motion.div>

                  {/* Top Badge Symbol & Serie Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <motion.div
                      className="flex items-center gap-2.5"
                      whileHover={reduceMotion ? undefined : { scale: 1.05, transition: springConfigSnappy }}
                    >
                      <div className="p-3 bg-brand-yellow-500 text-brand-blue-900 rounded-xl shadow-[2px_2px_0px_var(--color-brand-blue-700)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-bold font-subheading px-2.5 py-1 rounded-full border shadow-sm ${service.badgeStyle}`}>
                        {service.badge}
                      </span>
                    </motion.div>
                  </div>

                  {/* Middle Service Information */}
                  <div className="relative z-10 space-y-2 mt-auto">
                    <div className={`text-xs font-bold uppercase tracking-widest font-subheading flex items-center gap-1 ${service.hintColor}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      {service.city}
                    </div>
                    <motion.h3
                      className={`font-display text-2xl sm:text-3xl font-extrabold uppercase leading-none text-balance ${service.titleColor}`}
                      whileHover={reduceMotion ? undefined : { x: 4, transition: springConfigSnappy }}
                    >
                      {service.title}
                    </motion.h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${service.descColor}`}>
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Stats Grid & Callout */}
                  <div className="relative z-10 pt-4 border-t border-black/5 grid grid-cols-3 gap-2 text-center">
                    <div className={`p-2 rounded-xl backdrop-blur-sm ${service.statBoxStyle}`}>
                      <div className="text-sm font-bold font-subheading truncate">{service.stats.time}</div>
                      <div className={`text-[9px] uppercase font-bold tracking-wider ${service.statLabelStyle}`}>ENTREGA</div>
                    </div>
                    <div className={`p-2 rounded-xl backdrop-blur-sm ${service.statBoxStyle}`}>
                      <div className="text-sm font-bold font-subheading truncate">{service.stats.price}</div>
                      <div className={`text-[9px] uppercase font-bold tracking-wider ${service.statLabelStyle}`}>TARIFA</div>
                    </div>
                    <div className={`p-2 rounded-xl backdrop-blur-sm ${service.statBoxStyle}`}>
                      <div className="text-sm font-bold font-subheading truncate">{service.stats.weight}</div>
                      <div className={`text-[9px] uppercase font-bold tracking-wider ${service.statLabelStyle}`}>PESO</div>
                    </div>
                  </div>

                  {/* Center Card Click Hint */}
                  {isCenter && (
                    <motion.div
                      className="relative z-10 mt-3 text-center"
                      animate={reduceMotion ? {} : { opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                    >
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold font-subheading tracking-wider underline uppercase ${service.hintColor}`}>
                        <Info className="w-3.5 h-3.5" />
                        Mirá la Ficha Técnica
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mt-8"
          role="group"
          aria-label="Navegación de servicios"
        >
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => {
                setActiveIndex(i);
                setIsAutoRotate(false);
              }}
              aria-label={`Ir al servicio ${service.title}${i === activeIndex ? ', servicio actual' : ''}`}
              aria-current={i === activeIndex ? 'true' : 'false'}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500`}
              whileHover={i !== activeIndex && !reduceMotion ? { scale: 1.2, transition: springConfigSnappy } : undefined}
              whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            >
              <motion.span
                className={`h-2.5 rounded-full block ${
                  i === activeIndex ? 'bg-brand-yellow-500 shadow-cta-glow' : 'bg-white/30 hover:bg-white/60 border border-brand-blue-200'
                }`}
                animate={{ width: i === activeIndex ? '2.5rem' : '0.625rem' }}
                transition={springConfigSnappy}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Interactive Modal for Selected Service Details */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-brand-blue-950/80 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="double-bezel-outer p-2 rounded-3xl bg-brand-blue-50/10 border border-brand-blue-100/20 max-w-2xl w-full"
            >
              <div className="double-bezel-inner bg-brand-blue-700 border border-brand-blue-500/20 rounded-2xl p-6 sm:p-8 text-white relative shadow-2xl space-y-6">
                {/* Close Modal Button */}
                <motion.button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: 90, transition: springConfigSnappy }}
                  whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-brand-yellow-500 hover:text-brand-blue-900 transition-colors cursor-pointer z-20"
                  aria-label="Cerrar ficha técnica"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Modal Header */}
                <div className="flex items-center gap-4 text-left">
                  <div className="p-4 bg-brand-yellow-500 text-brand-blue-900 rounded-2xl shadow-[3px_3px_0px_var(--color-brand-blue-900)]">
                    {React.createElement(selectedService.icon, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-yellow-500 font-subheading tracking-widest uppercase">
                      {selectedService.founded} • {selectedService.city}
                    </span>
                    <h3 id="service-modal-title" className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-balance mt-0.5">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Description & Features Box */}
                <div className="space-y-4 bg-brand-ink/40 p-5 rounded-2xl border border-brand-blue-500/10 text-left">
                  <p className="text-sm sm:text-base leading-relaxed text-brand-blue-100 font-sans">
                    {selectedService.details.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-brand-blue-500/10">
                    <span className="text-xs font-subheading text-brand-yellow-500 font-bold uppercase tracking-wider block">Beneficios Clave:</span>
                    {selectedService.details.features.map((feat: string, fIdx: number) => (
                      <motion.div
                        key={fIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: fIdx * 0.08 }}
                        className="flex items-start gap-2 text-xs sm:text-sm text-white"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-yellow-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Statistics Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
                  className="grid grid-cols-3 gap-3 text-center"
                >
                  <div className="bg-brand-ink/60 border border-brand-blue-500/20 p-3 rounded-xl">
                    <span className="text-xl font-bold font-subheading text-brand-yellow-500 block truncate">
                      {selectedService.stats.time}
                    </span>
                    <span className="text-[10px] text-brand-blue-200 font-bold uppercase tracking-wider">Tiempos</span>
                  </div>
                  <div className="bg-brand-ink/60 border border-brand-blue-500/20 p-3 rounded-xl">
                    <span className="text-xl font-bold font-subheading text-white block truncate">
                      {selectedService.stats.price}
                    </span>
                    <span className="text-[10px] text-brand-blue-200 font-bold uppercase tracking-wider">Precio Base</span>
                  </div>
                  <div className="bg-brand-ink/60 border border-brand-blue-500/20 p-3 rounded-xl">
                    <span className="text-xl font-bold font-subheading text-brand-yellow-500 block truncate">
                      {selectedService.stats.weight}
                    </span>
                    <span className="text-[10px] text-brand-blue-200 font-bold uppercase tracking-wider">Capacidad</span>
                  </div>
                </motion.div>

                {/* Action Footer */}
                <div className="pt-2 flex justify-between items-center gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    whileHover={reduceMotion ? undefined : { x: -4, transition: springConfigSnappy }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className="text-xs text-brand-blue-300 hover:text-white underline uppercase font-bold tracking-wider cursor-pointer"
                  >
                    Volver Atrás
                  </motion.button>
                  <a
                    href={selectedService.details.ctaHref}
                    className="cta-nested-pill bg-brand-yellow-500 text-brand-blue-900 px-6 py-2.5 text-sm font-subheading font-bold uppercase hover:bg-brand-yellow-400"
                  >
                    <span>{selectedService.details.ctaText}</span>
                    <span className="cta-nested-icon bg-brand-blue-900/10">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

---

## 6. Componente: `SliderServicios.tsx`

> **Path Relativa:** `src/components/home/SliderServicios.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import Link from 'next/link';
import {
  ShoppingBag,
  Wrench,
  Shirt,
  FileText,
  ClipboardCheck,
  Package,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface IndustrySlide {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  sla: string;
  keyBenefits: string[];
  ctaUrl: string;
  ctaText: string;
  variant: 'dark-blue' | 'yellow-accent' | 'frost-blue' | 'clean-white';
}

const INDUSTRY_SLIDES: IndustrySlide[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce & Tiendas Online',
    badge: 'MÁXIMA VELOCIDAD',
    subtitle: 'Envíos Flex Same-Day & Next-Day',
    desc: 'Retiramos tus ventas online y las entregamos en la misma jornada en todo Mar del Plata. Integración directa para Mercado Libre Flex y tiendas independientes con reputación garantizada.',
    icon: ShoppingBag,
    sla: 'Entregas en el día',
    keyBenefits: ['Rendición de dinero en el acto', 'Seguimiento por WhatsApp', 'Cero suspensiones de Flex'],
    ctaUrl: '/servicios/enviosflex',
    ctaText: 'Ver Solución Flex',
    variant: 'yellow-accent',
  },
  {
    id: 'repuestos',
    title: 'Repuestos & Talleres Mecánicos',
    badge: 'ENTREGA CRÍTICA',
    subtitle: 'Cadetería Urgente para el Sector Automotor',
    desc: 'Despacho prioritario de autopartes, repuestos y herramientas hacia talleres, concesionarios y lubricentros de la ciudad sin demoras que frenen tus reparaciones.',
    icon: Wrench,
    sla: 'Prioridad Express',
    keyBenefits: ['Hasta 5 kg por moto', 'Entregas puerta a puerta', 'Cobro contrareembolso'],
    ctaUrl: '/cotizar/express',
    ctaText: 'Cotizar Envío Urgente',
    variant: 'dark-blue',
  },
  {
    id: 'indumentaria',
    title: 'Moda, Calzado & Indumentaria',
    badge: 'LOGÍSTICA INVERSA',
    subtitle: 'Showrooms, Locales & E-Shops',
    desc: 'Distribución ágil con servicio de logística inversa para cambios de talle y devoluciones sin fricción para tus clientas. Cuidado riguroso del empaque.',
    icon: Shirt,
    sla: 'LowCost o Express',
    keyBenefits: ['Gestión de cambios en puerta', 'Tarifas agrupadas LowCost', 'Bolsas y cajas protegidas'],
    ctaUrl: '/servicios/envios-lowcost',
    ctaText: 'Ver Tarifas LowCost',
    variant: 'frost-blue',
  },
  {
    id: 'tramites',
    title: 'Trámites & Gestiones Corporativas',
    badge: 'MÁXIMA SEGURIDAD',
    subtitle: 'Cadetería Administrativa y Cobranzas',
    desc: 'Gestión segura de contratos, facturas, firmas de documentos y depósitos bancarios o cobros en efectivo con rendición inmediata y comprobante digital.',
    icon: FileText,
    sla: 'Custodia Certificada',
    keyBenefits: ['Firma en conformidad', 'Depósitos bancarios', 'Mensajeros de confianza'],
    ctaUrl: '/cotizar/express',
    ctaText: 'Solicitar Cadetería',
    variant: 'clean-white',
  },
  {
    id: 'insumos',
    title: 'Insumos Médicos & Gastronómicos',
    badge: 'PUNTUALIDAD RIGUROSA',
    subtitle: 'Envíos Programados para Comercios',
    desc: 'Abastecimiento de insumos descartables, ópticas, laboratorios, cafeterías y locales gastronómicos que requieren cumplimiento horario riguroso.',
    icon: ClipboardCheck,
    sla: 'Horarios Programados',
    keyBenefits: ['Franjas pactadas de entrega', 'Depósito central Friuli 1972', 'Atención personalizada'],
    ctaUrl: '/servicios/plan-emprendedores',
    ctaText: 'Conocer Plan Comercios',
    variant: 'dark-blue',
  },
  {
    id: 'encomiendas',
    title: 'Encomiendas & Distribución 3PL',
    badge: 'LOGÍSTICA INTEGRAL',
    subtitle: 'Almacenamiento, Picking y Despacho',
    desc: 'Guardamos tu stock en nuestro centro logístico de Chauvín, preparamos tus pedidos apenas entra la venta y despachamos sin que tengas que ocuparte del empaque.',
    icon: Package,
    sla: 'Fulfillment Total',
    keyBenefits: ['Depósito seguro en MDQ', 'Picking & Packing profesional', 'Control de stock diario'],
    ctaUrl: '/servicios/plan-emprendedores',
    ctaText: 'Ver Servicio 3PL',
    variant: 'yellow-accent',
  },
];

export default function SliderServicios() {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const snappySpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

  // Section entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (reduceMotion || isPaused) return;

    autoRotateIntervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % INDUSTRY_SLIDES.length);
    }, 6500);

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
    };
  }, [reduceMotion, isPaused]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + INDUSTRY_SLIDES.length) % INDUSTRY_SLIDES.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % INDUSTRY_SLIDES.length);
  }, []);

  const activeSlide = INDUSTRY_SLIDES[current];
  const IconComponent = activeSlide.icon;

  // Background variants
  const isDarkBlue = activeSlide.variant === 'dark-blue';
  const isYellowAccent = activeSlide.variant === 'yellow-accent';
  const isFrostBlue = activeSlide.variant === 'frost-blue';

  return (
    <section
      id="slider-servicios"
      className="py-24 bg-gradient-to-b from-brand-white-50 via-brand-blue-50/30 to-brand-white-50 text-brand-ink relative z-10 overflow-hidden border-t border-brand-blue-100/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <motion.div className="lg:col-span-8 space-y-4" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs font-subheading tracking-widest font-bold border border-brand-yellow-400 uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-brand-blue-900" />
              <span>Logística a Medida de tu Rubro · MDQ 2026</span>
            </div>

            <h2 className="text-brand-blue-700 text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[0.95]">
              Soluciones Especiales para Industrias
            </h2>

            <p className="text-brand-blue-600/90 font-sans text-base sm:text-lg max-w-2xl leading-relaxed">
              Adaptamos nuestra flota propia de motos a la dinámica de tu negocio. Elegí tu sector y descubrí cómo optimizamos tus entregas urbanas.
            </p>
          </motion.div>

          {/* Navigation Controls & Counter */}
          <motion.div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3" variants={itemVariants}>
            <div className="font-mono text-xs font-bold text-brand-blue-500 bg-brand-blue-50 px-3 py-1.5 rounded-full border border-brand-blue-100 mr-2">
              <span className="text-brand-blue-700 text-sm font-extrabold">{current + 1}</span> / {INDUSTRY_SLIDES.length}
            </div>

            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              aria-label="Industria anterior"
              className="h-11 w-11 rounded-xl border-2 border-brand-blue-200 bg-white text-brand-blue-700 hover:bg-brand-blue-700 hover:text-white hover:border-brand-blue-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              aria-label="Siguiente industria"
              className="h-11 w-11 rounded-xl border-2 border-brand-yellow-500 bg-brand-yellow-500 text-brand-blue-900 hover:bg-brand-yellow-400 flex items-center justify-center transition-colors cursor-pointer shadow-xs font-bold"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Quick Industry Navigation Pills */}
        <motion.div
          role="tablist"
          aria-label="Seleccionar rubro industrial"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
          variants={itemVariants}
        >
          {INDUSTRY_SLIDES.map((slide, idx) => {
            const isSelected = idx === current;
            const MiniIcon = slide.icon;

            return (
              <motion.button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setCurrent(idx)}
                whileHover={reduceMotion ? undefined : { scale: isSelected ? 1.05 : 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={cn(
                  'px-4 py-2 rounded-full font-subheading text-xs sm:text-sm uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border shrink-0',
                  isSelected
                    ? 'bg-brand-blue-700 text-white border-brand-blue-700 shadow-sm scale-105'
                    : 'bg-white text-brand-blue-700 border-brand-blue-100 hover:bg-brand-blue-50 hover:border-brand-blue-300'
                )}
              >
                <MiniIcon className={cn('w-4 h-4', isSelected ? 'text-brand-yellow-500' : 'text-brand-blue-500')} />
                <span>{slide.title.split('&')[0].trim()}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Dynamic Showcase Hero Card (Double-Layered Glass Container) */}
        <motion.div
          variants={itemVariants}
          className={cn(
            'p-2.5 sm:p-3.5 rounded-[30px] backdrop-blur-md transition-all duration-500 shadow-2xl border',
            isDarkBlue && 'bg-[#052C87]/80 border-white/20',
            isYellowAccent && 'bg-[#FFF12E]/20 border-[#FFF12E]/40',
            isFrostBlue && 'bg-white/40 border-white/60',
            !isDarkBlue && !isYellowAccent && !isFrostBlue && 'bg-white/50 border-white/60'
          )}
        >
          <div
            className={cn(
              'p-6 sm:p-10 lg:p-12 rounded-[20px] border relative overflow-hidden transition-colors duration-500',
              isDarkBlue && 'bg-[#052C87] text-white border-white/15',
              isYellowAccent && 'bg-white text-[#00277C] border-yellow-200',
              isFrostBlue && 'bg-white text-[#00277C] border-blue-100',
              !isDarkBlue && !isYellowAccent && !isFrostBlue && 'bg-white text-[#00277C] border-blue-50'
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={reduceMotion ? { duration: 0.01 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Visual Column: Icon Box & SLA Callout */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-5">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 3, transition: snappySpring }}
                    className={cn(
                      'w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center shadow-lg border-2 relative cursor-pointer',
                      isDarkBlue
                        ? 'bg-brand-blue-900/80 border-brand-yellow-500 text-brand-yellow-500 shadow-brand-yellow-500/10'
                        : 'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-400 shadow-brand-yellow-500/30'
                    )}
                  >
                    <IconComponent className="h-14 w-14 sm:h-16 sm:w-16" />
                  </motion.div>

                  {/* Operational Tag */}
                  <div
                    className={cn(
                      'px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5',
                      isDarkBlue
                        ? 'bg-white/10 text-brand-yellow-400 border-white/15'
                        : 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-200'
                    )}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>SLA: {activeSlide.sla}</span>
                  </div>
                </div>

                {/* Right Info Column: Title, Description, Benefits & CTA */}
                <div className="lg:col-span-8 space-y-6 text-left">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          'px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider',
                          isDarkBlue
                            ? 'bg-brand-yellow-500 text-brand-blue-900'
                            : 'bg-brand-blue-700 text-white'
                        )}
                      >
                        {activeSlide.badge}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-subheading uppercase tracking-wider font-bold',
                          isDarkBlue ? 'text-brand-blue-200' : 'text-brand-blue-500'
                        )}
                      >
                        {activeSlide.subtitle}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        'text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight leading-none',
                        isDarkBlue ? 'text-white' : 'text-brand-blue-700'
                      )}
                    >
                      {activeSlide.title}
                    </h3>
                  </div>

                  <p
                    className={cn(
                      'font-sans text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl',
                      isDarkBlue ? 'text-brand-blue-100/90' : 'text-brand-ink/85'
                    )}
                  >
                    {activeSlide.desc}
                  </p>

                  {/* Bullet Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {activeSlide.keyBenefits.map((benefit, bIdx) => (
                      <motion.div
                        key={bIdx}
                        whileHover={reduceMotion ? undefined : { x: 3, transition: snappySpring }}
                        className={cn(
                          'p-3 rounded-xl border flex items-center gap-2.5 text-xs font-sans font-medium cursor-default',
                          isDarkBlue
                            ? 'bg-white/5 border-white/10 text-brand-blue-50'
                            : 'bg-brand-blue-50/70 border-brand-blue-100 text-brand-blue-900'
                        )}
                      >
                        <ShieldCheck
                          className={cn(
                            'w-4 h-4 shrink-0',
                            isDarkBlue ? 'text-brand-yellow-400' : 'text-brand-blue-600'
                          )}
                        />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action CTA Button (Primary Conversion Pill) */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href={activeSlide.ctaUrl}
                      className={cn(
                        'inline-flex items-center justify-between rounded-full min-h-[52px] px-8 py-3.5 font-subheading text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer group',
                        isDarkBlue
                          ? 'bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] shadow-glow-yellow'
                          : 'bg-[#0950F6] hover:bg-[#0742CA] text-white shadow-glow-blue'
                      )}
                    >
                      <span>{activeSlide.ctaText}</span>
                      <span
                        className={cn(
                          'inline-flex items-center justify-center w-8 h-8 rounded-full ml-3 transition-transform duration-300 group-hover:translate-x-1',
                          isDarkBlue ? 'bg-[#0950F6]/15 text-[#0950F6]' : 'bg-white/20 text-white'
                        )}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>

                    <Link
                      href="/contacto"
                      className={cn(
                        'font-subheading text-xs sm:text-sm uppercase tracking-wider font-bold transition-colors underline-offset-4 hover:underline py-2',
                        isDarkBlue ? 'text-brand-blue-200 hover:text-white' : 'text-brand-blue-600 hover:text-brand-blue-800'
                      )}
                    >
                      Consultar Cuenta Corriente Comercial →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress Bar & Indicators */}
        <motion.div className="flex justify-center items-center gap-1 mt-8" variants={itemVariants}>
          {INDUSTRY_SLIDES.map((_, idx) => (
            <div key={idx} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
              <button
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Ir al rubro ${idx + 1}`}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500',
                  idx === current
                    ? 'w-10 bg-brand-yellow-500 border-brand-yellow-400 shadow-cta-glow'
                    : 'w-2.5 bg-brand-blue-200 border-brand-blue-200 hover:bg-brand-blue-400'
                )}
              />
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
```

---

## 7. Componente: `EmprendedoresHome.tsx`

> **Path Relativa:** `src/components/home/EmprendedoresHome.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Building2, ShoppingBag, Landmark, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function EmprendedoresHome() {
  const reduceMotion = useReducedMotion();

  const descriptionText = "Si vendés online, necesitás un socio logístico que responda al toque. Creamos planes a tu medida con tarifas dinámicas transparentes y recolección programada a domicilio en Mar del Plata.";
  const words = descriptionText.split(" ");

  const partners = [
    'TOY PIOLA JUGUETERÍA', 'AMA & POLA', 'DROPIX 3D', 'EL CÓNDOR',
    'STARCEL', 'URBANCOW', 'WANCA', 'CATALINA INDUMENTARIA', 'ENVASES 3G', 'LA PERI'
  ];

  // Spring transition configs
  const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 };
  const snappySpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

  // Orchestrated section entrance variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : springTransition,
    },
  };

  const wordContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="emprendedores-home"
      className="py-32 md:py-48 bg-[#052C87] relative overflow-hidden text-white border-y border-white/10"
    >
      {/* Background Decorative Asymmetric Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-yellow-500/5 rounded-full blur-[150px] pointer-events-none"
        animate={reduceMotion ? {} : { scale: [1, 1.04, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={sectionVariants}
      >

        {/* Section Header - Editorial Split with Inline Typography Badge */}
        <motion.div className="max-w-6xl mb-24 space-y-6 text-left" variants={itemVariants}>
          <span className="px-4 py-1.5 bg-brand-blue-50/5 text-brand-yellow-500 border border-brand-yellow-500/20 rounded-full text-xs font-bold tracking-widest inline-block uppercase shadow-sm font-subheading">
            Socio Estratégico Local
          </span>

          <h2 className="text-white text-5xl sm:text-6xl lg:text-7xl font-display uppercase tracking-tight leading-[0.9] text-left max-w-5xl">
            Potenciamos tu{' '}
            <span
              className="inline-flex items-center justify-center w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 rounded-full align-middle bg-gradient-to-r from-brand-yellow-500 to-brand-yellow-400 mx-2 border border-brand-yellow-500 shadow-md text-brand-blue-900 font-display text-base sm:text-xl font-bold uppercase transition-transform duration-500 hover:scale-105"
              role="img"
              aria-label="Envíos DosRuedas"
            >
              MDQ
            </span>{' '}
            Marca en Mar del Plata
          </h2>

          <motion.div className="pt-2" variants={wordContainerVariants}>
            <p className="text-brand-blue-200 font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl font-medium tracking-tight">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <div className="h-[2px] w-24 bg-brand-yellow-500 rounded-full pt-1" />
        </motion.div>

        {/* Solutions Cards Grid: Asymmetric Bento Layout with Double-Bezel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-auto lg:auto-rows-[340px] grid-flow-row-dense">
          
          {/* Card 1: PyMEs (E-Commerce) - lg:col-span-7 lg:row-span-2 (Dark Navy Card with Double-Layered Glass Shell) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 lg:row-span-2 p-3 sm:p-4 rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#FFF12E]/40 hover:shadow-glow-yellow transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer"
            whileHover={reduceMotion ? undefined : { y: -6, transition: snappySpring }}
          >
            <div className="rounded-[20px] bg-[#052C87] p-6 sm:p-8 border border-white/10 flex flex-col justify-between h-full relative overflow-hidden text-left flex-1">
              {/* Subtle Radial Glow */}
              <motion.div
                className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-brand-yellow-500/10 blur-3xl pointer-events-none"
                animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              />

              {/* Watermark Background Icon */}
              <motion.div
                className="absolute right-4 bottom-4 text-white opacity-[0.03] pointer-events-none select-none"
                animate={reduceMotion ? {} : { rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              >
                <Landmark className="w-44 h-44" />
              </motion.div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <motion.div
                    className="p-3 bg-brand-yellow-500 text-brand-blue-900 rounded-xl shadow-[2px_2px_0px_var(--color-brand-blue-700)]"
                    whileHover={reduceMotion ? undefined : { scale: 1.08, transition: snappySpring }}
                  >
                    <Landmark className="h-5 w-5" />
                  </motion.div>
                  <span className="text-[10px] font-bold tracking-widest bg-brand-ink text-brand-yellow-500 px-3 py-1.5 rounded-lg uppercase font-subheading border border-brand-yellow-500/30">
                    EMPRENDEDORES
                  </span>
                </div>

                <div className="space-y-2">
                  <motion.h3
                    className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white group-hover:text-brand-yellow-500 transition-colors"
                    whileHover={reduceMotion ? undefined : { x: 4, transition: snappySpring }}
                  >
                    Logística E-Commerce
                  </motion.h3>
                  <p className="text-brand-blue-200 text-sm leading-relaxed font-sans">
                    Gestión de última milla pensada para PyMEs y marcas locales. Optimizamos tus costos de envío con retiros programados a domicilio y soporte post-venta.
                  </p>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {['Soporte comercial dedicado vía WhatsApp', 'Entregas contrareembolso integradas sin cargo extra', 'Rastreo digital transparente para tus clientes'].map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs sm:text-sm text-white font-sans"
                    >
                      <ShieldCheck className="h-4.5 w-4.5 text-brand-yellow-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 relative z-10 flex justify-end">
                <Link
                  href="/servicios/plan-emprendedores"
                  className="inline-flex items-center justify-between rounded-full min-h-[52px] px-8 py-3.5 bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading text-base font-bold uppercase tracking-wider shadow-glow-yellow transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  <span>Conocer más</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0950F6]/15 text-[#0950F6] ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: MercadoLibre Flex - lg:col-span-5 lg:row-span-1 (Yellow Card) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 lg:row-span-1 double-bezel-outer p-2 rounded-2xl bg-brand-yellow-500/10 border border-brand-yellow-500/20 hover:border-brand-blue-700/30 hover:bg-brand-yellow-500/15 hover:shadow-[0_20px_40px_-15px_rgba(255,236,1,0.15)] group overflow-hidden flex flex-col cursor-pointer"
            whileHover={reduceMotion ? undefined : { y: -6, transition: snappySpring }}
          >
            <div className="double-bezel-inner bg-gradient-to-br from-brand-yellow-500 to-brand-yellow-400 p-6 sm:p-8 rounded-xl border border-brand-yellow-500/20 shadow-sm flex flex-col justify-between h-full relative overflow-hidden text-left text-brand-blue-900 flex-1">
              {/* Subtle Radial Glow */}
              <motion.div
                className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-white/20 blur-2xl pointer-events-none"
                animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              />

              {/* Watermark Background Icon */}
              <motion.div
                className="absolute right-4 bottom-4 text-brand-blue-900 opacity-[0.04] pointer-events-none select-none"
                animate={reduceMotion ? {} : { rotate: [0, -2, 2, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              >
                <ShoppingBag className="w-32 h-32" />
              </motion.div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <motion.div
                    className="p-3 bg-brand-blue-700 text-white rounded-xl shadow-[2px_2px_0px_rgba(0,39,124,0.4)]"
                    whileHover={reduceMotion ? undefined : { scale: 1.08, transition: snappySpring }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </motion.div>
                  <span className="text-[10px] font-bold tracking-widest bg-brand-blue-900 text-white px-3 py-1.5 rounded-lg uppercase font-subheading border border-brand-blue-700/30">
                    MERCADOLIBRE
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-950">
                    Envíos Flex Meli
                  </h3>
                  <p className="text-brand-blue-950 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    Socio logístico homologado para tus envíos rápidos en el día. Recolección gratis en tu local y entrega garantizada dentro del SLA establecido.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-blue-900/10 relative z-10 flex justify-end">
                <Link
                  href="/servicios/enviosflex"
                  className="cta-nested-pill bg-brand-blue-700 text-white px-6 py-2.5 text-xs font-bold tracking-wider font-subheading rounded-full flex items-center gap-2 shadow-md hover:bg-brand-blue-800"
                >
                  <span>Configurar Flex</span>
                  <span className="cta-nested-icon bg-white/10 w-6 h-6 rounded-full flex items-center justify-center">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Corporativos (White Card) - lg:col-span-5 lg:row-span-1 */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 lg:row-span-1 double-bezel-outer p-2 rounded-2xl bg-brand-blue-50/80 border border-brand-blue-100 hover:border-brand-blue-300 hover:shadow-antigravity-deep group overflow-hidden flex flex-col cursor-pointer"
            whileHover={reduceMotion ? undefined : { y: -6, transition: snappySpring }}
          >
            <div className="double-bezel-inner bg-white p-6 sm:p-8 rounded-xl border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full relative overflow-hidden text-left text-brand-ink flex-1">
              {/* Subtle Radial Glow */}
              <motion.div
                className="absolute bottom-0 right-0 w-36 h-36 rounded-full bg-brand-blue-500/5 blur-2xl pointer-events-none"
                animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              />

              {/* Watermark Background Icon */}
              <motion.div
                className="absolute right-4 bottom-4 text-brand-blue-700 opacity-[0.02] pointer-events-none select-none"
                animate={reduceMotion ? {} : { rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              >
                <Building2 className="w-32 h-32" />
              </motion.div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <motion.div
                    className="p-3 bg-brand-yellow-500 text-brand-blue-900 rounded-xl shadow-[2px_2px_0px_var(--color-brand-blue-700)]"
                    whileHover={reduceMotion ? undefined : { scale: 1.08, transition: snappySpring }}
                  >
                    <Building2 className="h-5 w-5" />
                  </motion.div>
                  <span className="text-[10px] font-bold tracking-widest bg-brand-blue-50 text-brand-blue-700 px-3 py-1.5 rounded-lg uppercase font-subheading border border-brand-blue-100">
                    CORPORATIVO
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-700 group-hover:text-brand-blue-900 transition-colors">
                    Soluciones Corporativas
                  </h3>
                  <p className="text-brand-ink/75 text-xs sm:text-sm leading-relaxed font-sans">
                    Soporte a gran escala con facturación mensual, ruteos especiales para grandes volúmenes y entregas express coordinadas en Mar del Plata.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-blue-100 relative z-10 flex justify-end">
                <Link
                  href="/contacto"
                  className="cta-nested-pill bg-brand-yellow-500 text-brand-blue-900 px-6 py-2.5 text-xs font-bold tracking-wider font-subheading rounded-full flex items-center gap-2 shadow-sm hover:bg-brand-yellow-400"
                >
                  <span>Abrir Cuenta Corriente</span>
                  <span className="cta-nested-icon bg-brand-blue-900/10 w-6 h-6 rounded-full flex items-center justify-center">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Marquee of Local Partners - GPU Hardware Accelerated Infinite Scroll */}
        <motion.div
          variants={itemVariants}
          className="mt-24 pt-12 border-t border-brand-blue-500/10"
        >
          <p className="text-center font-subheading text-xs tracking-widest text-brand-blue-200 mb-6 uppercase">
            Marcas locales que confían en nosotros
          </p>
          <div
            className="relative w-full overflow-hidden py-4 select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div className="flex gap-16 w-max animate-logos-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
              {/* Set 1 */}
              <div className="flex gap-16 items-center">
                {partners.map((partner, index) => (
                  <span
                    key={index}
                    className="font-display text-2xl tracking-wider text-brand-blue-200 uppercase cursor-default hover:text-brand-yellow-500 hover:scale-105 transition-all duration-300"
                  >
                    {partner}
                  </span>
                ))}
              </div>
              {/* Set 2 (for infinite continuous loop) */}
              <div className="flex gap-16 items-center" aria-hidden="true">
                {partners.map((partner, index) => (
                  <span
                    key={`dup-${index}`}
                    className="font-display text-2xl tracking-wider text-brand-blue-200 uppercase cursor-default hover:text-brand-yellow-500 hover:scale-105 transition-all duration-300"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
```

---

## 8. Componente: `SocialProofSection.tsx`

> **Path Relativa:** `src/components/home/SocialProofSection.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import {
  Star,
  TrendingUp,
  HeartHandshake,
  ExternalLink,
  MessageSquareQuote,
  Sparkles,
  ChevronDown,
  Quote,
  Flame,
  Building2,
  Bike,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface GoogleReview {
  id: string;
  author: string;
  badge?: string;
  category: 'destacadas' | 'express' | 'empresas' | 'humanos';
  categoryLabel: string;
  rating: number;
  timeAgo: string;
  quoteHighlight: string;
  text: string;
  ownerResponse?: string;
  variant: 'dark-blue' | 'yellow-accent' | 'frost-blue' | 'clean-white';
}

const REVIEWS_DATA: GoogleReview[] = [
  {
    id: 'sol-r',
    author: 'Sol R',
    badge: 'Local Guide',
    category: 'destacadas',
    categoryLabel: 'Encargo Especial',
    rating: 5,
    timeAgo: 'Hace 26 semanas',
    quoteHighlight: '“Mi héroe logístico por segundo año consecutivo”',
    text: 'Matías de Envíos DosRuedas se convirtió en mi héroe logístico 🙌. Tenía un encargo especial: comprar alfajores Havanna de temporada en MDQ, embalarlos con mimo y enviármelos para que viajen conmigo hasta Europa. Rapidez, comunicación clara y calidez humana.',
    ownerResponse: '¡Qué gran alegría leer tu mensaje, Sol! Nos enorgullece enormemente acompañarte y garantizar que tus encargos lleguen a tiempo.',
    variant: 'yellow-accent',
  },
  {
    id: 'karen-herrera',
    author: 'Karen Herrera',
    category: 'express',
    categoryLabel: 'Resolución Inmediata',
    rating: 5,
    timeAgo: 'Hace 13 semanas',
    quoteHighlight: '“Resolvieron mi problema con la mejor predisposición”',
    text: 'Excelente el servicio, rápidos, muy atentos, resolvieron mi problema con la mejor predisposición, los recomiendo ampliamente.',
    ownerResponse: '¡Muchas gracias por tus palabras, Karen! Nos alegra saber que pudimos resolver tu envío en el acto.',
    variant: 'dark-blue',
  },
  {
    id: 'agustin-torres',
    author: 'Agustin Torres',
    category: 'empresas',
    categoryLabel: 'Tiendas & Comercios',
    rating: 5,
    timeAgo: 'Hace 48 semanas',
    quoteHighlight: '“Impecable para llevar pedidos a nuestros clientes”',
    text: 'Lo usé varias veces para llevar pedidos a nuestros clientes. Impecable el servicio. Además hacen depósitos en cajeros sin problemas. ¡Unos genios!',
    variant: 'frost-blue',
  },
  {
    id: 'alexis-bogarin',
    author: 'Alexis Bogarin',
    category: 'destacadas',
    categoryLabel: 'Calidad Premium',
    rating: 5,
    timeAgo: 'Hace 37 semanas',
    quoteHighlight: '“El mejor servicio premium de la zona”',
    text: 'El mejor servicio premium de la zona en Mar del Plata. 100% recomendable por puntualidad y trato.',
    variant: 'dark-blue',
  },
  {
    id: 'lorenzo-elizagoyen',
    author: 'Lorenzo Elizagoyen',
    category: 'express',
    categoryLabel: 'Seguridad & Rapidez',
    rating: 5,
    timeAgo: 'Hace 32 semanas',
    quoteHighlight: '“Atención de primera, rápido, confiable y seguro”',
    text: 'Excelente servicio, atención de primera, rápido, confiable y seguro. Recomendado 100% para envíos puntuales.',
    ownerResponse: '¡Gracias Lorenzo! Trabajamos día a día para brindar una mensajería rápida, segura y confiable.',
    variant: 'clean-white',
  },
  {
    id: 'ezequiel-monson',
    author: 'Ezequiel Monson',
    category: 'humanos',
    categoryLabel: 'Cara Humana',
    rating: 5,
    timeAgo: 'Hace 47 semanas',
    quoteHighlight: '“Muy buenos humanos, total confianza”',
    text: 'Muy buenos humanos 😊. Servicio cálido, responsable y de total confianza para cualquier trámite o paquete.',
    variant: 'yellow-accent',
  },
  {
    id: 'emiliano-garri',
    author: 'Emiliano Garri',
    category: 'destacadas',
    categoryLabel: 'Líder en MDQ',
    rating: 5,
    timeAgo: 'Hace 48 semanas',
    quoteHighlight: '“¡La mejor mensajería de MDP!”',
    text: '¡La mejor mensajería de Mar del Plata! Cumplen siempre con lo prometido y no te dejan tirado.',
    variant: 'frost-blue',
  },
  {
    id: 'nahuari',
    author: 'NahuAri',
    category: 'empresas',
    categoryLabel: 'Compromiso Total',
    rating: 5,
    timeAgo: 'Hace 48 semanas',
    quoteHighlight: '“10 de 10, responsables por sobre todas las cosas”',
    text: '10 de 10 muy buenos en lo que hacen, responsables por sobre todas las cosas, súper recomendable para tu negocio.',
    variant: 'clean-white',
  },
  {
    id: 'ignacio',
    author: 'Ignacio',
    category: 'express',
    categoryLabel: 'Cadetería Ágil',
    rating: 5,
    timeAgo: 'Hace 39 semanas',
    quoteHighlight: '“Buena atención y rapidez en la entrega”',
    text: 'Recomendado lo de estos muchachos. Buena atención y rapidez en la entrega en toda la ciudad.',
    variant: 'frost-blue',
  },
  {
    id: 'daniel-gonzalez',
    author: 'Daniel Gonzalez',
    badge: 'Local Guide',
    category: 'humanos',
    categoryLabel: 'Confianza Local',
    rating: 5,
    timeAgo: 'Hace 48 semanas',
    quoteHighlight: '“Excelente servicio muy responsables”',
    text: 'Excelente servicio muy responsables en todo momento.',
    variant: 'clean-white',
  },
  {
    id: 'sergio-rivas',
    author: 'Sergio Rivas',
    category: 'express',
    categoryLabel: 'Puntualidad',
    rating: 5,
    timeAgo: 'Hace 39 semanas',
    quoteHighlight: '“Calidad y puntualidad garantizada”',
    text: 'Excelente servicio calidad y puntualidad en cada entrega.',
    variant: 'dark-blue',
  },
  {
    id: 'ana-veronica',
    author: 'Ana Verónica Abruza',
    category: 'empresas',
    categoryLabel: 'Eficiencia',
    rating: 5,
    timeAgo: 'Hace 39 semanas',
    quoteHighlight: '“Confiable y eficiente”',
    text: 'Confiable y eficiente. Respuesta inmediata para nuestros envíos comerciales.',
    variant: 'yellow-accent',
  },
];

const CATEGORIES = [
  { id: 'todas', label: 'Todas', icon: Sparkles },
  { id: 'destacadas', label: 'Destacadas', icon: Flame },
  { id: 'express', label: 'Express & Flex', icon: Bike },
  { id: 'empresas', label: 'Comercios & PyMEs', icon: Building2 },
  { id: 'humanos', label: 'Cara Humana', icon: HeartHandshake },
];

export default function SocialProofSection() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [activeSnapIndex, setActiveSnapIndex] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const snappySpring = { type: 'spring' as const, stiffness: 300, damping: 25 };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const filteredReviews =
    activeCategory === 'todas'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedReviewId((prev) => (prev === id ? null : id));
  };

  // Scroll Snap tracking and state updater
  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const childWidth = el.firstElementChild?.clientWidth || 360;
    const gap = 24;
    const index = Math.round(scrollLeft / (childWidth + gap));
    setActiveSnapIndex(Math.min(Math.max(index, 0), filteredReviews.length - 1));
  }, [filteredReviews.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Handle slide snap navigation
  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;

    const children = el.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handlePrev = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = (el.firstElementChild?.clientWidth || 360) + 24;
    el.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  };

  const handleNext = () => {
    const el = carouselRef.current;
    if (!el) return;
    const slideWidth = (el.firstElementChild?.clientWidth || 360) + 24;
    el.scrollBy({ left: slideWidth, behavior: 'smooth' });
  };

  return (
    <section
      id="social-proof"
      className="py-24 bg-[#F8FAFC] relative z-10 border-y border-blue-100/60 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <motion.div className="lg:col-span-8 space-y-4" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF12E] text-[#0950F6] rounded-full text-xs font-subheading font-bold tracking-widest uppercase shadow-glow-yellow border border-[#FFF12E]">
              <Star className="w-3.5 h-3.5 fill-[#0950F6]" />
              <span>5.0 / 5.0 en Google Maps · Calificación Perfecta</span>
            </div>

            <h2 className="text-[#0950F6] text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[0.98]">
              Reseñas Reales de Mar del Plata
            </h2>

            <p className="text-brand-blue-600/90 font-sans text-base sm:text-lg max-w-2xl">
              Deslizá el carrusel para conocer la experiencia de vecinos, tiendas online y emprendedores que confían a diario en nuestra flota propia.
            </p>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3" variants={itemVariants}>
            <div className="font-mono text-xs font-bold text-brand-blue-500 bg-brand-blue-50 px-3.5 py-1.5 rounded-full border border-brand-blue-100 mr-2">
              <span className="text-brand-blue-700 text-sm font-extrabold">{activeSnapIndex + 1}</span> / {filteredReviews.length}
            </div>

            <motion.button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              whileHover={canScrollLeft && !reduceMotion ? { scale: 1.05 } : undefined}
              whileTap={canScrollLeft && !reduceMotion ? { scale: 0.95 } : undefined}
              aria-label="Reseña anterior"
              className={cn(
                'h-11 w-11 rounded-xl border-2 flex items-center justify-center transition-colors cursor-pointer shadow-xs',
                canScrollLeft
                  ? 'border-brand-blue-200 bg-white text-brand-blue-700 hover:bg-brand-blue-700 hover:text-white hover:border-brand-blue-700'
                  : 'border-brand-blue-100 bg-brand-blue-50/50 text-brand-blue-300 cursor-not-allowed opacity-50'
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              whileHover={canScrollRight && !reduceMotion ? { scale: 1.05 } : undefined}
              whileTap={canScrollRight && !reduceMotion ? { scale: 0.95 } : undefined}
              aria-label="Siguiente reseña"
              className={cn(
                'h-11 w-11 rounded-xl border-2 flex items-center justify-center transition-colors cursor-pointer shadow-xs font-bold',
                canScrollRight
                  ? 'border-brand-yellow-500 bg-brand-yellow-500 text-brand-blue-900 hover:bg-brand-yellow-400'
                  : 'border-brand-blue-100 bg-brand-blue-50/50 text-brand-blue-300 cursor-not-allowed opacity-50'
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* 3 Interactive Trust Metrics Strips (Double-Layered Glass Shells) */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10" variants={itemVariants}>
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4, transition: snappySpring }}
            className="p-2.5 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/60 group shadow-xl hover:shadow-glow-yellow transition-shadow cursor-default"
          >
            <div className="bg-white p-5 rounded-[20px] border border-blue-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF12E] text-[#0950F6] flex items-center justify-center shrink-0 shadow-glow-yellow">
                <Star className="w-6 h-6 fill-[#0950F6]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0950F6] tabular-nums">
                    5.0
                  </span>
                  <div className="flex text-[#FFF12E]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="font-subheading text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                  15 Opiniones en Google Maps
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4, transition: snappySpring }}
            className="p-2.5 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/60 group shadow-xl hover:shadow-glow-blue transition-shadow cursor-default"
          >
            <div className="bg-white p-5 rounded-[20px] border border-blue-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0950F6] text-[#FFF12E] flex items-center justify-center shrink-0 shadow-glow-blue">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0950F6] tabular-nums">
                  100%
                </span>
                <p className="font-subheading text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                  Flota Propia Sin Tercerizar
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4, transition: snappySpring }}
            className="p-2.5 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/60 group shadow-xl hover:shadow-glow-yellow transition-shadow cursor-default"
          >
            <div className="bg-white p-5 rounded-[20px] border border-blue-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF12E]/20 text-[#0950F6] flex items-center justify-center shrink-0 border border-[#FFF12E]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#0950F6] tabular-nums">
                  +7
                </span>
                <p className="font-subheading text-[11px] uppercase tracking-wider text-blue-600 font-bold">
                  Años de Trayectoria en MDQ
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Category Filter Bar */}
        <motion.div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar" variants={itemVariants}>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollToIndex(0);
                }}
                whileHover={reduceMotion ? undefined : { scale: isActive ? 1.05 : 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className={cn(
                  'px-4 py-2 rounded-full font-subheading text-xs sm:text-sm uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border shrink-0',
                  isActive
                    ? 'bg-brand-blue-700 text-white border-brand-blue-700 shadow-sm scale-105'
                    : 'bg-white text-brand-blue-700 border-brand-blue-100 hover:bg-brand-blue-50 hover:border-brand-blue-300'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-brand-yellow-500' : 'text-brand-blue-500')} />
                <span>{cat.label}</span>
                {cat.id === 'todas' && (
                  <span className="text-[10px] font-mono bg-white/20 text-white px-1.5 py-0.2 rounded-full">
                    {REVIEWS_DATA.length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Blossom-Style Scroll-Snap Carousel Container */}
        <motion.div
          ref={carouselRef}
          tabIndex={0}
          aria-label="Carrusel de testimonios"
          variants={itemVariants}
          className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[420px] lg:auto-cols-[460px] gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar focus:outline-none"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {filteredReviews.map((review, idx) => {
            const isExpanded = expandedReviewId === review.id;
            const isCurrentSnap = idx === activeSnapIndex;

            // Palette Variant calculation
            const isDarkBlue = review.variant === 'dark-blue';
            const isYellowAccent = review.variant === 'yellow-accent';
            const isFrostBlue = review.variant === 'frost-blue';

            return (
              <motion.div
                key={review.id}
                style={{ scrollSnapAlign: 'center' }}
                whileHover={reduceMotion ? undefined : { y: -6, transition: snappySpring }}
                className={cn(
                  'p-2.5 sm:p-3.5 rounded-[28px] backdrop-blur-md transition-all duration-300 flex flex-col h-full select-none cursor-pointer border',
                  isDarkBlue && 'bg-[#052C87]/90 border-white/20 shadow-2xl',
                  isYellowAccent && 'bg-[#FFF12E]/20 border-[#FFF12E]/40 shadow-xl',
                  isFrostBlue && 'bg-white/50 border-white/60 shadow-lg',
                  !isDarkBlue && !isYellowAccent && !isFrostBlue && 'bg-white/60 border-white/80 shadow-lg',
                  isCurrentSnap ? 'scale-[1.02] shadow-glow-yellow' : 'opacity-95'
                )}
              >
                <div
                  className={cn(
                    'p-6 sm:p-7 rounded-[20px] border relative flex flex-col justify-between h-full transition-colors',
                    isDarkBlue && 'bg-[#052C87] text-white border-white/15',
                    isYellowAccent && 'bg-white text-[#00277C] border-yellow-200/80',
                    isFrostBlue && 'bg-white text-[#00277C] border-blue-100',
                    !isDarkBlue && !isYellowAccent && !isFrostBlue && 'bg-white text-[#00277C] border-blue-50'
                  )}
                >
                  {/* Top Watermark Icon */}
                  <div
                    className={cn(
                      'absolute top-5 right-5 h-8 w-8 pointer-events-none opacity-20',
                      isDarkBlue ? 'text-brand-yellow-500 opacity-30' : 'text-brand-blue-700'
                    )}
                  >
                    <Quote className="h-full w-full" />
                  </div>

                  {/* Card Header: Rating, Tag & Time */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex text-brand-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span
                        className={cn(
                          'text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border',
                          isDarkBlue
                            ? 'bg-white/10 text-brand-yellow-400 border-white/15'
                            : 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100'
                        )}
                      >
                        {review.categoryLabel}
                      </span>
                    </div>

                    {/* Scannable Quote Headline */}
                    <h3
                      className={cn(
                        'font-subheading text-xl sm:text-2xl uppercase font-bold leading-tight mb-3',
                        isDarkBlue ? 'text-brand-yellow-400' : 'text-brand-blue-700'
                      )}
                    >
                      {review.quoteHighlight}
                    </h3>

                    {/* Review Body */}
                    <p
                      className={cn(
                        'font-sans text-xs sm:text-sm leading-relaxed mb-6',
                        isDarkBlue ? 'text-brand-blue-100/90' : 'text-brand-ink/85'
                      )}
                    >
                      {review.text}
                    </p>
                  </div>

                  {/* Author & Footer Details */}
                  <div
                    className={cn(
                      'pt-3 border-t mt-auto',
                      isDarkBlue ? 'border-white/10' : 'border-brand-blue-100/60'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full font-subheading font-bold text-xs flex items-center justify-center shrink-0 border',
                            isDarkBlue
                              ? 'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-400'
                              : 'bg-brand-blue-700 text-white border-brand-blue-800'
                          )}
                        >
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p
                            className={cn(
                              'font-bold font-sans text-xs sm:text-sm leading-none',
                              isDarkBlue ? 'text-white' : 'text-brand-blue-700'
                            )}
                          >
                            {review.author}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            {review.badge && (
                              <span
                                className={cn(
                                  'text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase',
                                  isDarkBlue
                                    ? 'bg-brand-yellow-500/20 text-brand-yellow-400'
                                    : 'bg-brand-yellow-500/20 text-brand-blue-800'
                                )}
                              >
                                {review.badge}
                              </span>
                            )}
                            <span
                              className={cn(
                                'text-[10px] font-mono',
                                isDarkBlue ? 'text-brand-blue-300' : 'text-brand-blue-400'
                              )}
                            >
                              {review.timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Owner response toggle */}
                      {review.ownerResponse && (
                        <motion.button
                          type="button"
                          onClick={() => toggleExpand(review.id)}
                          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          className={cn(
                            'p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer border',
                            isDarkBlue
                              ? 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                              : 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100 hover:bg-brand-blue-100'
                          )}
                          title="Ver respuesta del equipo"
                        >
                          <MessageSquareQuote className="w-3.5 h-3.5" />
                          <ChevronDown
                            className={cn(
                              'w-3 h-3 transition-transform duration-200',
                              isExpanded && 'rotate-180'
                            )}
                          />
                        </motion.button>
                      )}
                    </div>

                    {/* Expandable Owner Response with spring animation */}
                    <AnimatePresence>
                      {isExpanded && review.ownerResponse && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div
                            className={cn(
                              'mt-3 p-3 rounded-lg text-xs font-sans italic border-l-2 leading-relaxed',
                              isDarkBlue
                                ? 'bg-white/5 border-brand-yellow-500 text-brand-blue-100'
                                : 'bg-brand-blue-50/80 border-brand-blue-700 text-brand-ink'
                            )}
                          >
                            <span className="font-bold not-italic block text-[10px] uppercase font-mono mb-1 text-brand-yellow-500">
                              Respuesta de Envíos DosRuedas:
                            </span>
                            &ldquo;{review.ownerResponse}&rdquo;
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Snap Pagination Dots */}
        <motion.div className="flex justify-center items-center gap-1 mb-10" variants={itemVariants}>
          {filteredReviews.map((_, idx) => (
            <div key={idx} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
              <button
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Ir a la reseña ${idx + 1}`}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500',
                  idx === activeSnapIndex
                    ? 'w-10 bg-brand-yellow-500 border-brand-yellow-400 shadow-cta-glow'
                    : 'w-2.5 bg-brand-blue-200 border-brand-blue-200 hover:bg-brand-blue-400'
                )}
              />
            </div>
          ))}
        </motion.div>

        {/* Verification Link to Google Maps */}
        <motion.div className="text-center" variants={itemVariants}>
          <a
            href="https://share.google/ofw5wAQt3Fc1dArom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-yellow-500 text-brand-blue-900 font-subheading text-sm sm:text-base uppercase tracking-wider font-bold hover:bg-brand-yellow-400 transition-all shadow-cta-glow group hover:scale-[1.02] cursor-pointer"
          >
            <span>Ver Ficha y Opiniones en Google Maps</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
```

---

## 9. Componente: `CtaSection.tsx`

> **Path Relativa:** `src/components/home/CtaSection.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { MessageSquare, User, Store, PackageSearch } from 'lucide-react';

export default function CtaSection() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', business: '', volume: '' });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, business, volume } = formData;
    const message = `Hola, soy ${name} de ${business}. Me interesa cotizar envíos para ${volume} paquetes mensuales.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5492236602699?text=${encodedMessage}`, '_blank');
  };

  // HyperFrames standard spring config
  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 20 };
  const springConfigSnappy = { type: 'spring' as const, stiffness: 300, damping: 25 };

  // Container variants with orchestrated stagger
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0.01 } : springConfig,
    },
  };

  return (
    <section
      id="cta-section"
      className="py-20 lg:py-28 bg-[#0950F6] relative z-10 overflow-hidden px-4 sm:px-6 lg:px-8 shadow-ambient-elevation"
    >
      <motion.div
        className="max-w-6xl mx-auto p-2.5 sm:p-3.5 rounded-[30px] bg-white/10 backdrop-blur-md border border-white/25 shadow-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-[20px] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 border border-blue-100/50 shadow-sm relative overflow-hidden"
          variants={itemVariants}
        >

          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,54,165,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,54,165,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Left Text Block */}
          <motion.div className="lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left" variants={itemVariants}>
            <motion.div
              className="inline-flex"
              whileHover={reduceMotion ? undefined : { scale: 1.03, transition: springConfigSnappy }}
            >
              <span className="px-4 py-2 rounded-full text-xs font-subheading tracking-widest bg-[#FFF12E]/20 text-[#0950F6] border border-[#FFF12E] uppercase font-bold cursor-default shadow-glow-yellow">
                Cotización Inmediata
              </span>
            </motion.div>

            <motion.h2 className="text-[#0950F6] font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.98] tracking-tight">
              ¿Listo para escalar la logística de tu e-commerce?
            </motion.h2>

            <motion.p className="text-[#00277C] text-base sm:text-lg font-sans leading-relaxed font-medium">
              Olvidate de la gestión de paquetes en Mar del Plata. Completá tus datos y te respondemos por WhatsApp al instante.
            </motion.p>

            <motion.div
              className="pt-2 hidden lg:block cursor-default"
              whileHover={reduceMotion ? undefined : { x: 4, transition: springConfigSnappy }}
            >
              <p className="text-xs font-mono tracking-widest text-[#0950F6] font-bold uppercase leading-none">
                Atención comercial <span className="text-[#FFF12E] bg-[#0950F6] px-2 py-0.5 rounded font-mono">{'<'} 2 MIN</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Form Block */}
          <motion.div className="lg:w-1/2 w-full relative z-10" variants={itemVariants}>
            <form onSubmit={handleWhatsAppRedirect} className="space-y-5 bg-[#F8FAFC] p-6 sm:p-8 rounded-[20px] border-2 border-[#0950F6]/20 shadow-xl">

              <motion.div
                className="space-y-1.5"
                whileHover={reduceMotion ? undefined : { x: 3, transition: springConfigSnappy }}
              >
                <label className="text-xs font-subheading tracking-wider text-[#0950F6] uppercase font-bold">Tu Nombre</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0950F6]/60 pointer-events-none">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    type="text"
                    placeholder="Ingresá tu nombre"
                    className="w-full h-11 border-2 border-[#0950F6]/20 rounded-xl pl-11 pr-4 focus:outline-none focus:border-[#0950F6] focus:ring-2 focus:ring-[#0950F6]/20 text-[#052C87] placeholder:text-[#0950F6]/40 text-sm font-sans transition-colors bg-white"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-1.5"
                whileHover={reduceMotion ? undefined : { x: 3, transition: springConfigSnappy }}
              >
                <label className="text-xs font-subheading tracking-wider text-[#0950F6] uppercase font-bold">Empresa / Negocio</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0950F6]/60 pointer-events-none">
                    <Store className="w-5 h-5" />
                  </div>
                  <input
                    required
                    value={formData.business}
                    onChange={e => setFormData({...formData, business: e.target.value})}
                    type="text"
                    placeholder="Nombre de tu emprendimiento"
                    className="w-full h-11 border-2 border-[#0950F6]/20 rounded-xl pl-11 pr-4 focus:outline-none focus:border-[#0950F6] focus:ring-2 focus:ring-[#0950F6]/20 text-[#052C87] placeholder:text-[#0950F6]/40 text-sm font-sans transition-colors bg-white"
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-1.5"
                whileHover={reduceMotion ? undefined : { x: 3, transition: springConfigSnappy }}
              >
                <label htmlFor="volume-select" className="text-xs font-subheading tracking-wider text-[#0950F6] uppercase font-bold">Volumen Estimado Mensual</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0950F6]/60 pointer-events-none">
                    <PackageSearch className="w-5 h-5" />
                  </div>
                  <select
                    required
                    id="volume-select"
                    value={formData.volume}
                    onChange={e => setFormData({...formData, volume: e.target.value})}
                    className="w-full h-11 border-2 border-[#0950F6]/20 rounded-xl pl-11 pr-4 focus:outline-none focus:border-[#0950F6] focus:ring-2 focus:ring-[#0950F6]/20 text-[#052C87] text-sm font-sans transition-colors appearance-none bg-white cursor-pointer"
                  >
                    <option value="" disabled>Seleccioná una opción</option>
                    <option value="1 a 50">1 a 50 envíos</option>
                    <option value="51 a 200">51 a 200 envíos</option>
                    <option value="Más de 200">Más de 200 envíos</option>
                  </select>
                </div>
              </motion.div>

              <motion.div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { scale: 1.02, transition: springConfigSnappy }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.98, transition: springConfigSnappy }}
                  className="w-full min-h-[52px] bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading tracking-wider text-xl uppercase rounded-full shadow-glow-yellow flex items-center justify-center gap-3 cursor-pointer font-bold transition-all"
                >
                  <span>Hablar por WhatsApp</span>
                  <motion.span
                    className="h-5 w-5"
                    whileHover={reduceMotion ? undefined : { scale: 1.15, rotate: 10, transition: springConfigSnappy }}
                  >
                    <MessageSquare className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </motion.div>

            </form>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
}
```

