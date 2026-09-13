# 📄 Nodo: Nuestras Redes & Comunidad

> **URL:** `/nosotros/nuestras-redes`  
> **Path Relativa Página:** `src/app/nosotros/nuestras-redes/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/nosotros/nuestras-redes/page.tsx` | Server Component [SC] |
| Componente | `src/components/nosotros/nuestras-redes/NetworksHero.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/nuestras-redes/NetworksChannels.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/nuestras-redes/RecentPosts.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/nuestras-redes/NetworksBenefits.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/nuestras-redes/NewsletterSubscribe.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/nosotros/nuestras-redes/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import NetworksHero from '@/src/components/nosotros/nuestras-redes/NetworksHero';
import NetworksChannels from '@/src/components/nosotros/nuestras-redes/NetworksChannels';
import RecentPosts from '@/src/components/nosotros/nuestras-redes/RecentPosts';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Nuestras Redes y Comunidad | Envíos DosRuedas Mar del Plata',
  description: 'Conectate con la mayor comunidad logística y de mensajería urbana en Mar del Plata. Seguí nuestras novedades operativas de calle, beneficios y promociones.',
  alternates: {
    canonical: `${baseUrl}/nosotros/nuestras-redes`,
  },
};

export default function NuestrasRedesPage() {
  return (
    <main className="min-h-screen bg-brand-white-50 text-brand-blue-700 relative overflow-hidden">
      {/* 3D Ambient floating glow-orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-brand-blue-500/10 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-brand-yellow-500/5 rounded-full blur-[110px] pointer-events-none" style={{ animationDelay: '-3s' }} />

      {/* Community brand header hero banner */}
      <div className="relative z-10">
        <NetworksHero />
      </div>

      {/* Grid channels connection block */}
      <div className="relative z-10">
        <NetworksChannels />
      </div>

      {/* Social mockup posts grid visualizer */}
      <div className="relative z-10">
        <RecentPosts />
      </div>
    </main>
  );
}

```

---

## 2. Componente: `NetworksHero.tsx`

> **Path Relativa:** `src/components/nosotros/nuestras-redes/NetworksHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import HeroProceduralBackground from '@/components/ui/HeroProceduralBackground';
import { motion } from 'motion/react';
import { Share2, Users, ArrowRight, Sparkles, MessageCircle, Instagram, Facebook, ExternalLink } from 'lucide-react';

const SOCIAL_CHANNELS = [
  {
    id: 'instagram',
    name: 'Instagram Oficial',
    handle: '@enviosdosruedas',
    desc: 'Rutas en vivo, fotos de la flota en MDQ y novedades de horarios.',
    icon: Instagram,
    badge: 'Último post: hace 18 min',
    link: 'https://instagram.com/enviosdosruedas',
    ctaText: 'Ver historias',
  },
  {
    id: 'facebook',
    name: 'Facebook Comunidad',
    handle: '@enviosdosruedas',
    desc: 'El día a día de nuestros cadetes recorriendo calles y barrios de Mar del Plata.',
    icon: Facebook,
    badge: 'Video nuevo hoy',
    link: 'https://facebook.com/enviosdosruedas',
    ctaText: 'Mirar videos',
  },
  {
    id: 'whatsapp',
    name: 'Canal de WhatsApp',
    handle: 'Alertas & Promos MDQ',
    desc: 'Avisos de cortes de tránsito, clima y códigos de descuento relámpago.',
    icon: MessageCircle,
    badge: 'Canal activo 24/7',
    link: 'https://wa.me/542236602699',
    ctaText: 'Unirme al canal',
  },
];

export default function NetworksHero() {
  const [followers, setFollowers] = useState(4850);

  useEffect(() => {
    const target = 5200;
    const step = 10;
    const interval = setInterval(() => {
      setFollowers((prev) => {
        if (prev + step >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="networks-hero" 
      className="relative min-h-[90dvh] flex items-center justify-center pt-28 pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-brand-blue-500 text-white border-b border-white/10"
    >
      {/* Halo glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline & Channel Cards (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Speed Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-yellow-500/40 bg-[#052C87]/90 text-brand-yellow-500 text-xs sm:text-sm font-subheading uppercase tracking-widest shadow-md backdrop-blur-md transform -rotate-1">
              <Share2 className="h-4 w-4 text-brand-yellow-500 animate-pulse shrink-0" />
              <span>COMUNIDAD EN MOVIMIENTO · SOCIAL MEDIA 2026</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display uppercase tracking-tight leading-[0.98] text-white">
              <span className="block">COMUNIDAD EN</span>
              <span className="inline-block bg-brand-yellow-500 text-[#052C87] px-3 py-1 rounded-md transform -rotate-1 mt-1 font-display tracking-tight shadow-glow-yellow">
                LÍNEA
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-4 border-l-4 border-brand-yellow-500">
              La logística también se vive en redes. Rutas en vivo, promos relámpago y la comunidad de repartidores más grande de Mar del Plata.
            </p>

            {/* 3 Horizontal Channel Cards */}
            <div className="space-y-3.5 pt-2 max-w-xl mx-auto lg:mx-0">
              {SOCIAL_CHANNELS.map((ch) => {
                const IconComp = ch.icon;
                return (
                  <a
                    key={ch.id}
                    href={ch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-1.5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-brand-yellow-500 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
                  >
                    <div className="rounded-[20px] bg-white p-4 sm:p-4.5 border border-brand-blue-50/50 flex items-center justify-between gap-4 min-h-[44px]">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center shrink-0 text-[#0950F6] group-hover:bg-brand-yellow-500 group-hover:text-brand-blue-900 group-hover:border-brand-yellow-500 transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-base sm:text-lg uppercase tracking-wide text-brand-blue-700 leading-none">
                              {ch.name}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-yellow-50 text-[10px] font-subheading font-bold uppercase text-brand-blue-900 border border-brand-yellow-200 transform -rotate-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow-500 animate-pulse" />
                              {ch.badge}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-brand-ink/75 truncate mt-0.5">
                            {ch.desc}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1 text-xs font-subheading uppercase font-bold text-[#0950F6] group-hover:text-brand-blue-900 group-hover:translate-x-0.5 transition-all">
                        <span className="hidden sm:inline">{ch.ctaText}</span>
                        <ArrowRight className="w-4 h-4 text-brand-yellow-500" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Floating Social Proof & Live Follower Widget (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl">
              <div className="rounded-[20px] bg-[#052C87] p-6 sm:p-8 border border-white/10 shadow-sm text-white space-y-6 relative overflow-hidden">
                {/* Visual Accent Top Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-yellow-500 via-white to-brand-yellow-400" />

                {/* Follower Counter Block */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-brand-yellow-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono text-3xl sm:text-4xl font-bold uppercase tracking-tight text-brand-yellow-500 leading-none tabular-nums">
                        +{followers.toLocaleString('es-AR')}
                      </div>
                      <p className="text-xs text-white/80 font-subheading uppercase tracking-wider font-bold mt-0.5">
                        MÁS DE 5.000 SEGUIDORES EN REDES
                      </p>
                    </div>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-brand-yellow-500 animate-pulse shadow-glow-yellow" />
                </div>

                {/* Content description */}
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  Sumate a la red más activa de la ciudad. Compartimos historias del asfalto marplatense, consejos de embalaje para e-commerce y promociones sorpresa todos los meses.
                </p>

                {/* Dynamic Status Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between h-24 text-left group hover:border-brand-yellow-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-subheading uppercase font-bold text-brand-yellow-500 tracking-wider">
                        RUTAS EN VIVO
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-yellow-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="block font-display text-lg text-white leading-none">
                        #RutasMDQ
                      </span>
                      <span className="text-[10px] text-white/70 font-sans">Cadetes en calle</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between h-24 text-left group hover:border-brand-yellow-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-subheading uppercase font-bold text-brand-yellow-500 tracking-wider">
                        SAME-DAY SLA
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-yellow-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="block font-display text-lg text-white leading-none">
                        #SameDayMDQ
                      </span>
                      <span className="text-[10px] text-white/70 font-sans">100% efectividad</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://instagram.com/enviosdosruedas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-[52px] w-full px-8 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 shadow-glow-yellow font-subheading text-base uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
                >
                  <span>Seguinos en Instagram</span>
                  <span className="w-8 h-8 rounded-full bg-[#052C87]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ExternalLink className="h-4 w-4 text-[#052C87]" />
                  </span>
                </a>

                {/* Trust Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70 font-sans">
                  <span>Oficina: Friuli 1972</span>
                  <span className="font-mono font-bold text-brand-yellow-500">MDQ 2026</span>
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

## 3. Componente: `NetworksChannels.tsx`

> **Path Relativa:** `src/components/nosotros/nuestras-redes/NetworksChannels.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NetworksChannels() {
  return (
    <section
      id="networks-channels"
      className="py-24 bg-brand-white-50 relative z-10 border-t border-brand-blue-100/30"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

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
          <span className="px-4 py-1 bg-brand-yellow-500 text-brand-blue-700 rounded-full text-base font-subheading uppercase tracking-widest inline-block border border-brand-blue-200/50">
            CONEXIÓN SOCIAL
          </span>
          <h2 className="text-brand-blue-700 text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-[0.02em] leading-[1.1]">
            CANALES OFICIALES
          </h2>
          <p className="text-brand-blue-600/90 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Conectate al instante con nuestras plataformas oficiales y formá parte de la mayor comunidad logística de Mar del Plata.
          </p>
          <div className="h-1 w-16 bg-brand-blue-700 mx-auto rounded-full" />
        </div>

        {/* Asymmetric Bento Grid (Replaces banned 3 equal card layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* WhatsApp: Full width 12 columns (Main Call Channel con #25D366 exclusivo para soporte directo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-12 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal hover:shadow-lg transition-all"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-brand-blue">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-2xl relative w-12 h-12 flex items-center justify-center shrink-0">
                    <Image
                      src="/iconos/whatapps.svg"
                      alt="WhatsApp"
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-subheading uppercase tracking-wider text-brand-blue-700 font-bold leading-none">
                      WHATSAPP DIRECTO
                    </h3>
                    <span className="text-xs text-brand-blue-400 font-mono font-bold mt-1 block tabular-nums">
                      +54 223 660-2699 | ATENCIÓN INMEDIATA
                    </span>
                  </div>
                </div>
                <p className="text-sm text-brand-blue-600/90 font-sans leading-relaxed">
                  Atención personalizada y sin demoras por WhatsApp. El canal más ágil para coordinar cotizaciones, retiros inmediatos, envíos FLEX y resolver dudas sobre nuestra operativa diaria.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <a
                  href="https://wa.me/5492236602699?text=Hola%20Envios%20DosRuedas,%20vengo%20desde%20la%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-[52px] w-full md:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading tracking-wider text-lg uppercase font-bold rounded-full flex items-center justify-center gap-3 shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
                >
                  <span>CHATEÁ AHORA</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Instagram: 6 columns */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal hover:shadow-lg transition-all"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue min-h-[340px]">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-brand-blue-50 border border-brand-blue-100 rounded-2xl relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/iconos/instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="px-3 py-1 bg-brand-yellow-50 text-[#052C87] border border-brand-yellow-200 rounded-full text-xs font-mono font-bold uppercase tracking-wider transform -rotate-1 shadow-glow-yellow tabular-nums">
                    +3.000 SEGUIDORES
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-subheading uppercase tracking-wider text-brand-blue-700 font-bold leading-none">
                    INSTAGRAM
                  </h3>
                  <span className="text-xs text-brand-blue-400 font-sans font-bold mt-1 block">
                    @enviosdosruedas
                  </span>
                </div>
                <p className="text-sm text-brand-blue-600/90 font-sans leading-relaxed">
                  Mirá nuestro día a día, fotos reales de las entregas diarias de la flota y promociones especiales diseñadas para tu e-commerce.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-brand-blue-100/60 w-full">
                <a
                  href="https://instagram.com/enviosdosruedas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-[52px] w-full px-8 py-3.5 bg-[#0950F6] hover:bg-[#052C87] text-white font-subheading tracking-wider text-base uppercase font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0950F6]/50"
                >
                  <span>SEGUINOS EN INSTAGRAM</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-4.5 w-4.5 text-white" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Facebook: 6 columns (Utilizando Social Facebook Blue #1877F2 para badge/acento) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal hover:shadow-lg transition-all"
          >
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue min-h-[340px]">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-2xl relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/iconos/facebook.svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <span className="px-3 py-1 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/20 rounded-full text-xs font-mono font-bold uppercase tracking-wider transform -rotate-1 tabular-nums">
                    +2.000 SEGUIDORES
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-subheading uppercase tracking-wider text-brand-blue-700 font-bold leading-none">
                    FACEBOOK
                  </h3>
                  <span className="text-xs text-brand-blue-400 font-sans font-bold mt-1 block">
                    @enviosdosruedas
                  </span>
                </div>
                <p className="text-sm text-brand-blue-600/90 font-sans leading-relaxed">
                  Seguinos para enterarte de ofertas exclusivas y novedades logísticas sobre el tránsito y cadetería comercial local.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-brand-blue-100/60 w-full">
                <a
                  href="https://facebook.com/enviosdosruedas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-[52px] w-full px-8 py-3.5 bg-[#1877F2] hover:bg-[#1565cb] text-white font-subheading tracking-wider text-base uppercase font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1877F2]/50"
                >
                  <span>SEGUINOS EN FACEBOOK</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-4.5 w-4.5 text-white" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
```

---

## 4. Componente: `RecentPosts.tsx`

> **Path Relativa:** `src/components/nosotros/nuestras-redes/RecentPosts.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Facebook, Instagram, ExternalLink } from 'lucide-react';

export default function RecentPosts() {
  const posts = [
    {
      platform: 'Facebook',
      platformIcon: Facebook,
      date: '21 Jun',
      avatar: 'https://picsum.photos/seed/avatar1/100/100',
      image: '/redes/fac2.webp',
      alt: 'Publicación de Facebook - Solución para tus envíos',
      text: 'MENSAJERÍA ENVÍOS DOSRUEDAS ~ ¡Somos la solución para tus envíos en Mar del Plata! ~ Confianza y responsabilidad son nuestros pilares.',
      likes: 12,
      comments: 10,
      url: 'https://www.facebook.com/enviosdosruedas/posts/pfbid03WPv5ZE93ZNwL5PMRwuTpJxGaGSBzLigJqDSyzATNcSkRT3xBMZz7GKbhPv1mC53l',
    },
    {
      platform: 'Instagram',
      platformIcon: Instagram,
      date: '21 Jun',
      avatar: 'https://picsum.photos/seed/avatar2/100/100',
      image: '/redes/ig4.webp',
      alt: 'Publicación de Instagram - Servicio confiable en Mar del Plata',
      text: 'MENSAJERÍA ENVÍOS DOSRUEDAS ~ ¡Somos la solución para tus envíos en Mar del Plata! ~ Te ofrecemos un servicio confiable...',
      likes: 14,
      comments: 2,
      url: 'https://www.instagram.com/enviosdosruedas/p/DEaAGAmRMKj/',
    },
    {
      platform: 'Facebook',
      platformIcon: Facebook,
      date: '21 Jun',
      avatar: 'https://picsum.photos/seed/avatar1/100/100',
      image: '/redes/fac1.webp',
      alt: 'Publicación de Facebook - Confianza y responsabilidad',
      text: 'Para vos, que vendés en Mar del Plata y hacés envíos... ¿Solés usar apps genéricas pero no te dan tranquilidad ni cara visible?',
      likes: 19,
      comments: 7,
      url: 'https://www.facebook.com/enviosdosruedas/posts/pfbid0a1i4tygsZQjwp9bsvS9xSHApJqMe5JkeoJbqx12Qvas18nSojtGhj6U9cFn3m5hDl',
    },
    {
      platform: 'Instagram',
      platformIcon: Instagram,
      date: '21 Jun',
      avatar: 'https://picsum.photos/seed/avatar2/100/100',
      image: '/redes/ig1.webp',
      alt: 'Publicación de Instagram - Pilares fundamentales',
      text: 'En Envíos DosRuedas, nuestro servicio se construye sobre tres pilares fundamentales: Responsabilidad, Eficiencia y Confianza...',
      likes: 24,
      comments: 4,
      url: 'https://www.instagram.com/enviosdosruedas/p/DJhlS5xOrTb/',
    },
    {
      platform: 'Instagram',
      platformIcon: Instagram,
      date: '21 Jun',
      avatar: 'https://picsum.photos/seed/avatar2/100/100',
      image: '/redes/ig3.webp',
      alt: 'Publicación de Instagram - Tu confianza es nuestro motor',
      text: 'En cada envío, nos das tu confianza. Con cada entrega, te demostramos por qué vale la pena. En Envíos Dos Ruedas, la responsabilidad es nuestro motor...',
      likes: 31,
      comments: 6,
      url: 'https://www.instagram.com/enviosdosruedas/p/DK12WIDslKW/',
    },
  ];

  return (
    <section 
      id="recent-posts" 
      className="py-24 bg-[#052C87] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,#0950F6,transparent_50%)] pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,#FFF12E,transparent_50%)] pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-left max-w-2xl mb-16 space-y-4">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-[#052C87] rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block shadow-glow-yellow font-bold transform -rotate-1">
            EN VIVO
          </span>
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            PUBLICACIONES RECIENTES
          </h2>
          <p className="text-white/80 font-sans text-base sm:text-lg max-w-prose leading-relaxed">
            Lo que está pasando ahora mismo en nuestras redes sociales oficiales de Mar del Plata. Seguinos para no perderte nada.
          </p>
        </div>

        {/* Structured Bento Layout of 5 posts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {posts.map((post, idx) => {
            const SocialIcon = post.platformIcon;
            const isFeatured = idx === 0;

            return (
              <motion.div
                key={post.url}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'
                }`}
              >
                <div className={`rounded-[20px] bg-white text-brand-blue-700 overflow-hidden flex flex-col justify-between h-full border border-brand-blue-50/50 shadow-sm ${
                  isFeatured ? 'md:flex-row' : ''
                }`}>
                  
                  {/* Simulated Image */}
                  <div className={`relative w-full overflow-hidden bg-brand-blue-50 border-b border-brand-blue-100/50 ${
                    isFeatured ? 'md:w-1/2 h-64 md:h-full min-h-[300px] md:border-b-0 md:border-r' : 'h-64'
                  }`}>
                    <Image
                      src={post.image}
                      alt={post.alt || "Envíos DosRuedas Social Post"}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-brand-yellow-500 text-brand-blue-900 text-xs font-subheading uppercase tracking-widest rounded-lg font-bold shadow-glow-yellow transform -rotate-1 inline-block">
                          DESTACADO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Copy Details */}
                  <div className={`flex flex-col justify-between w-full ${isFeatured ? 'md:w-1/2' : ''}`}>
                    <div>
                      {/* Post Profile Header */}
                      <div className="p-5 flex items-center justify-between border-b border-brand-blue-100/50">
                        <div className="flex items-center gap-3">
                          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-brand-blue-100 shrink-0">
                            <Image
                              src={post.avatar}
                              alt="Envíos DosRuedas Avatar"
                              fill={true}
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-brand-blue-700 leading-none">
                              Envíos DosRuedas
                            </h3>
                            <span className="text-[10px] font-mono font-bold text-brand-blue-400 mt-1 block tabular-nums">
                              {post.date}
                            </span>
                          </div>
                        </div>

                        <div className="p-2 bg-brand-blue-50 text-[#0950F6] border border-brand-blue-100 rounded-lg">
                          <SocialIcon className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Post Text Description */}
                      <div className={`p-5 ${isFeatured ? 'md:p-8' : ''}`}>
                        <p className={`text-sm md:text-base font-sans leading-relaxed text-brand-ink/90 ${
                          isFeatured ? 'line-clamp-6' : 'line-clamp-3'
                        }`}>
                          {post.text}
                        </p>
                      </div>
                    </div>

                    {/* Simulated Interactions Footer & Original Post Link */}
                    <div className={`p-5 pt-0 ${isFeatured ? 'md:px-8' : ''}`}>
                      <div className="pt-4 border-t border-brand-blue-100/50 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs font-mono font-bold text-brand-blue-500 tabular-nums">
                          <span className="flex items-center gap-1 hover:text-brand-yellow-500 transition-colors cursor-pointer">
                            <Heart className="h-4.5 w-4.5" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center gap-1 hover:text-brand-yellow-500 transition-colors cursor-pointer">
                            <MessageCircle className="h-4.5 w-4.5" />
                            <span>{post.comments}</span>
                          </span>
                        </div>

                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group min-h-[44px] bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading tracking-wider text-sm uppercase font-bold py-2 px-4.5 rounded-full flex items-center justify-center gap-2 shadow-glow-yellow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                        >
                          <span>Ver original</span>
                          <span className="w-6 h-6 rounded-full bg-[#052C87]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 shrink-0">
                            <ExternalLink className="h-3.5 w-3.5 text-[#052C87]" />
                          </span>
                        </a>
                      </div>
                    </div>

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

## 5. Componente: `NetworksBenefits.tsx`

> **Path Relativa:** `src/components/nosotros/nuestras-redes/NetworksBenefits.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Gift, Bell, Heart, MessageSquare, CheckCircle } from 'lucide-react';

export default function NetworksBenefits() {
  const benefits = [
    {
      title: 'Ofertas Exclusivas',
      desc: 'Accedé a descuentos quincenales y promociones relámpago de delivery diseñadas en exclusiva para toda nuestra comunidad de seguidores.',
      icon: Gift,
      colSpan: 'lg:col-span-7',
    },
    {
      title: 'Actualizaciones',
      desc: 'Sé el primero en enterarte de la incorporación de nuevos servicios urbanos, ampliación de zonas y cambios de horarios importantes.',
      icon: Bell,
      colSpan: 'lg:col-span-5',
    },
    {
      title: 'Comunidad Activa',
      desc: 'Formá parte de nuestro grupo diario de clientes locales, compartiendo opiniones y enriqueciendo el servicio con tu feedback directo.',
      icon: Heart,
      colSpan: 'lg:col-span-5',
    },
    {
      title: 'Soporte Ágil',
      desc: 'Obtené contención y respuestas rápidas a consultas logísticas generales de bultos directamente por medio de mensajes privados directos.',
      icon: MessageSquare,
      colSpan: 'lg:col-span-7',
    },
  ];

  return (
    <section
      id="networks-benefits"
      className="py-24 bg-brand-white-50 relative z-10 overflow-hidden border-t border-brand-blue-100/30"
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-widest inline-block font-bold transform -rotate-1 shadow-glow-yellow">
            VALORES DE COMUNIDAD
          </span>
          <h2 className="text-brand-blue-700 text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05]">
            BENEFICIOS DE FORMAR PARTE
          </h2>
          <p className="text-brand-ink/80 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Descubrí por qué cientos de marplatenses y PyMEs locales ya nos siguen activamente en nuestros canales de difusión oficiales.
          </p>
        </div>

        {/* Benefits Bento Grid (Asymmetrical Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${benefit.colSpan} rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 shadow-minimal hover:shadow-lg transition-all`}
              >
                <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm flex flex-col justify-between h-full text-brand-blue min-h-[220px]">
                  <div className="space-y-5">
                    <div className="p-3 bg-brand-blue-50 text-[#0950F6] border border-brand-blue-100 rounded-2xl w-fit">
                      <Icon className="h-5 w-5 shrink-0 text-[#0950F6]" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-brand-blue-700 leading-tight">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-brand-ink leading-relaxed font-sans">
                      {benefit.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-blue-100/60 flex items-center justify-between text-xs font-mono font-bold uppercase text-brand-blue-500 tabular-nums">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="h-4.5 w-4.5 text-brand-yellow-500 shrink-0" />
                      <span>Beneficio Oficial</span>
                    </span>
                    <span>0{idx + 1}</span>
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

## 6. Componente: `NewsletterSubscribe.tsx`

> **Path Relativa:** `src/components/nosotros/nuestras-redes/NewsletterSubscribe.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section 
      id="newsletter-subscribe" 
      className="py-24 bg-[#052C87] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Aesthetic ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#0950F6,transparent_30%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#FFF12E,transparent_40%)] opacity-15 pointer-events-none" />
 
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-8 flex flex-col items-center">
          
          <div className="inline-flex p-3.5 bg-white/10 text-brand-yellow-500 rounded-3xl mx-auto border border-white/15 shadow-glow-yellow">
            <Mail className="h-6 w-6 text-brand-yellow-500" />
          </div>
 
          <div className="space-y-3">
            <span className="px-4 py-1.5 bg-brand-yellow-500 text-[#052C87] font-bold rounded-full text-xs font-subheading uppercase tracking-widest inline-block shadow-glow-yellow transform -rotate-1">
              COMUNIDAD LOGÍSTICA
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[1.05] text-white">
              NEWSLETTER EXCLUSIVO
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed max-w-lg mx-auto">
              Recibí promociones relámpago, novedades operativas de calle, beneficios corporativos y noticias logísticas de Mar del Plata directamente en tu bandeja de entrada.
            </p>
          </div>
  
          {/* Form container with state change */}
          <div className="w-full rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl">
            <div className="rounded-[20px] bg-white p-6 sm:p-8 border border-brand-blue-50/50 shadow-sm text-brand-blue-700">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="newsletter-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Tu correo electrónico..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-11 border-2 border-brand-blue-100 rounded-xl bg-white px-4 text-brand-ink font-sans text-sm focus:border-[#0950F6] focus:ring-2 focus:ring-[#0950F6]/20 focus:outline-none transition-all placeholder:text-brand-blue-400"
                    />
                    <button
                      type="submit"
                      className="group min-h-[52px] bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading tracking-wider text-base uppercase font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-3 shadow-glow-yellow transition-all duration-300 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow-500/50"
                    >
                      <span>Unirme Ahora</span>
                      <span className="w-8 h-8 rounded-full bg-[#052C87]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                        <Mail className="h-4.5 w-4.5 text-[#052C87]" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="py-4 text-center space-y-3 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2.5 bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 rounded-full w-fit">
                      <CheckCircle2 className="h-6 w-6 text-[#0950F6] animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-display uppercase tracking-tight text-brand-blue-700 leading-none">
                      ¡Suscripción Exitosa!
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-ink font-sans max-w-sm mx-auto">
                      Ya formás parte de la lista prioritaria. Preparate para recibir las mejores novedades y descuentos.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
 
          {/* Disclaimer text */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/80 font-sans pt-2">
            <ShieldCheck className="h-4.5 w-4.5 text-brand-yellow-500 shrink-0" />
            <span>Garantizamos la privacidad de tus datos. Podés darte de baja con un solo clic en cualquier momento.</span>
          </div>
 
        </div>
      </div>
    </section>
  );
}

```

