# 📄 Nodo: Contacto Comercial & Soporte

> **URL:** `/contacto`  
> **Path Relativa Página:** `src/app/contacto/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/contacto/page.tsx` | Server Component [SC] |
| Componente | `src/components/contacto/ContactHero.tsx` | Client Component [CC] |
| Componente | `src/components/contacto/ContactForm.tsx` | Client Component [CC] |
| Componente | `src/components/contacto/ContactInfo.tsx` | Client Component [CC] |
| Componente | `src/components/contacto/ConversionBanner.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/contacto/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import ContactHero from '@/src/components/contacto/ContactHero';
import ContactForm from '@/src/components/contacto/ContactForm';
import ContactInfo from '@/src/components/contacto/ContactInfo';
import ConversionBanner from '@/src/components/contacto/ConversionBanner';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Contacto | Envíos DosRuedas Mar del Plata',
  description: 'Contacto con el equipo comercial y logística urbana de Envíos DosRuedas en Mar del Plata. Cotizaciones inmediatas por WhatsApp y atención personalizada.',
  alternates: {
    canonical: `${baseUrl}/contacto`,
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto - Envíos DosRuedas',
  description: 'Contacto oficial y cotización inmediata de Envíos DosRuedas en Mar del Plata.',
  url: `${baseUrl}/contacto`,
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'Envíos DosRuedas',
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
  },
};

export default function ContactoPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0950F6] text-white relative overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Section */}
      <ContactHero />

      {/* Interactive Contact & Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 space-y-16">
        {/* Upper Grid: Contact Form & Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Formulario de Cotización Inmediata (5 Cols on desktop) */}
          <div className="lg:col-span-5 h-full">
            <ContactForm />
          </div>

          {/* Column 2: Bento Grid Redes, Canales y Base (7 Cols on desktop) */}
          <div className="lg:col-span-7 h-full">
            <ContactInfo />
          </div>
        </div>

        {/* Bottom Banner de Conversión / Cierre */}
        <ConversionBanner />
      </section>
    </main>
  );
}

```

---

## 2. Componente: `ContactHero.tsx`

> **Path Relativa:** `src/components/contacto/ContactHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import HeroProceduralBackground from '@/src/components/ui/HeroProceduralBackground';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const CHANNELS = [
  {
    title: "WhatsApp Comercial",
    desc: "Respuestas y cotizaciones de envíos en tiempo real.",
    icon: Mail,
    href: "https://wa.me/542236602699?text=Hola!%20Quiero%20solicitar%20una%20cotizaci%C3%B3n%20para%20mis%20env%C3%ADos.",
  },
  {
    title: "Llamada de Coordinación",
    desc: "Para hablar directamente con un coordinador logístico.",
    icon: Phone,
    href: "tel:+542236602699",
  },
  {
    title: "Solicitar Cotización B2B",
    desc: "Envianos tu base de envíos para un plan personalizado.",
    icon: MapPin,
    href: "mailto:matiascejas@enviosdosruedas.com",
  },
];

export default function ContactHero() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    volumen: '50-200',
    servicio: 'express',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full pt-20 pb-16 lg:pt-24 lg:pb-24 bg-[#0950F6] text-white overflow-hidden">
      {/* Glow orbs - high voltage neon & deep midnight navy */}
      <div
        className="absolute top-[-128px] left-[-128px] w-[384px] h-[384px] rounded-full pointer-events-none bg-[#FFF12E]/25 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-160px] right-[-128px] w-[500px] h-[500px] rounded-full pointer-events-none bg-[#052C87]/60 blur-[130px]"
        aria-hidden="true"
      />

      {/* Border accent */}
      <div className="absolute inset-0 pointer-events-none border border-white/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-24">
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline & Channels (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Badge - "Conexión Directa Mar del Plata" with velocity tilt & neon glow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit bg-[#052C87]/80 backdrop-blur-md border border-[#FFF12E]/40 -rotate-1 shadow-glow-yellow">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFF12E] shadow-[0_0_10px_#FFF12E]" />
              <span className="font-subheading text-xs font-bold uppercase tracking-wider text-[#FFF12E]">
                Conexión Directa Mar del Plata
              </span>
            </div>

            {/* Monumental Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display uppercase tracking-tight leading-[0.98] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white"
            >
              ¿Hablamos<br />
              <span className="italic text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.4)]">
                ahora?
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl font-sans leading-relaxed text-lg sm:text-xl text-white/90"
            >
              Sin formularios complejos ni esperas. Elegí el canal que mejor se adapte al ritmo de tu e-commerce.
            </motion.p>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-8 pt-6 border-t border-white/20"
            >
              <div className="grid gap-1">
                <span className="font-subheading text-xs uppercase tracking-wider text-[#FFF12E] font-bold">
                  Oficina Central
                </span>
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  Friuli 1972, Mar del Plata
                </span>
              </div>
              <div className="grid gap-1">
                <span className="font-subheading text-xs uppercase tracking-wider text-[#FFF12E] font-bold">
                  Operación
                </span>
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  Lunes a Sábado · Turnos 2026
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Channel Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-5"
          >
            {CHANNELS.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                target={channel.title === 'Llamada de Coordinación' ? '_self' : '_blank'}
                rel={channel.title === 'Llamada de Coordinación' ? undefined : 'noopener noreferrer'}
                className="group flex items-center justify-between p-6 rounded-2xl bg-[#052C87] border border-white/15 shadow-lg hover:shadow-glow-yellow hover:border-[#FFF12E]/60 transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-4 sm:gap-5">
                  <span className="inline-flex p-3 rounded-xl bg-white/10 text-[#FFF12E] group-hover:bg-[#FFF12E] group-hover:text-[#0950F6] transition-colors duration-300">
                    <channel.icon className="h-6 w-6 shrink-0" />
                  </span>
                  <span>
                    <span className="block font-display uppercase tracking-wide text-lg sm:text-xl text-white leading-tight mb-1">
                      {channel.title}
                    </span>
                    <span className="block font-sans text-xs text-white/70">
                      {channel.desc}
                    </span>
                  </span>
                </span>
                <span className="text-[#FFF12E] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: "Pedí un plan a medida" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 sm:pt-16 border-t border-white/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Column: Heading, Description & Moto Image */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#052C87] border border-white/20 text-[#FFF12E] text-xs font-subheading uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#FFF12E]" />
                <span>PROPUESTA B2B · GENERAL PUEYRREDÓN</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white leading-[0.98]">
                Pedí un plan a medida
              </h2>

              <p className="font-sans text-base sm:text-lg text-white/85 leading-relaxed">
                Si tu negocio despacha a diario en Mar del Plata o necesitás integración de envíos para tu tienda online, armamos un esquema con tarifas fijas, retiros programados y cuenta corriente mensual.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#052C87]/80 border border-white/15 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span className="font-subheading text-xs uppercase tracking-wider text-white font-bold">
                    Tarifas por volumen
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#052C87]/80 border border-white/15 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span className="font-subheading text-xs uppercase tracking-wider text-white font-bold">
                    Retiros en tu local
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#052C87]/80 border border-white/15 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span className="font-subheading text-xs uppercase tracking-wider text-white font-bold">
                    Todo MDQ y Batán
                  </span>
                </div>
              </div>

              {/* Vector Dispatch HUD Card */}
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-gradient-to-br from-[#052C87] via-[#04236B] to-[#021440] p-6 flex flex-col justify-between">
                <HeroProceduralBackground variant="contact" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="font-subheading text-xs uppercase tracking-widest text-[#FFF12E] font-bold block">
                      CENTRAL DE DESPACHO MDQ
                    </span>
                    <span className="font-display text-2xl uppercase tracking-tight text-white mt-1 block">
                      COBERTURA GENERAL PUEYRREDÓN
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFF12E]/20 border border-[#FFF12E] text-[#FFF12E] font-mono text-xs font-bold tabular-nums">
                    GPS ACTIVO
                  </span>
                </div>
                <div className="relative z-10 flex justify-between items-end text-white border-t border-white/10 pt-3">
                  <div>
                    <span className="font-subheading uppercase text-xs tracking-wider block text-white/80">
                      Hub Operativo Friuli 1972
                    </span>
                    <span className="font-mono text-xs text-[#FFF12E] font-medium tabular-nums">
                      Salidas cada 30 min · Soporte en directo
                    </span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-[#FFF12E] animate-pulse shadow-[0_0_8px_#FFF12E]" />
                </div>
              </div>
            </div>

            {/* Right Column: Double-Bezel Quick Request Card */}
            <div className="rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl">
              <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 relative overflow-hidden text-white">
                {/* Accent line top */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0950F6] via-white to-[#FFF12E]" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#FFF12E] text-[#0950F6] mx-auto flex items-center justify-center shadow-glow-yellow">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                      ¡SOLICITUD REGISTRADA!
                    </h3>
                    <p className="font-sans text-sm text-white/80 max-w-sm mx-auto">
                      Un asesor comercial de Envíos DosRuedas te escribirá a la brevedad con la tarifa especial para tu volumen.
                    </p>
                    <a
                      href={`https://wa.me/542236602699?text=Hola!%20Ped%C3%AD%20un%20plan%20a%20medida%20a%20nombre%20de%20${encodeURIComponent(
                        formData.nombre || 'mi comercio'
                      )}%20para%20${encodeURIComponent(formData.volumen)}%20env%C3%ADos%20mensuales.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between min-h-[52px] px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading uppercase text-sm tracking-wider font-bold shadow-lg transition-all cursor-pointer mt-2 group"
                    >
                      <span>Coordinar ahora por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div>
                      <span className="font-subheading text-xs uppercase tracking-wider text-[#FFF12E] font-bold block">
                        COTIZACIÓN INMEDIATA
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-tight text-white leading-none mt-1">
                        Cotizá tu cuenta comercial
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold">
                        Nombre o Comercio <span className="text-[#FFF12E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Tienda Güemes / Juan Pérez"
                        className="w-full h-11 px-4 rounded-xl border-2 border-[#0950F6]/30 bg-white/5 text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] transition-all placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold">
                        WhatsApp / Teléfono <span className="text-[#FFF12E]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Ej: 223 660-2699"
                        className="w-full h-11 px-4 rounded-xl border-2 border-[#0950F6]/30 bg-white/5 text-white font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] transition-all placeholder:text-white/40 tabular-nums"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold">
                          Volumen Mensual
                        </label>
                        <select
                          value={formData.volumen}
                          onChange={(e) => setFormData({ ...formData, volumen: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl border-2 border-[#0950F6]/30 bg-[#052C87] text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] cursor-pointer"
                        >
                          <option value="20-50">20 a 50 envíos</option>
                          <option value="50-200">50 a 200 envíos</option>
                          <option value="200-500">200 a 500 envíos</option>
                          <option value="+500">+500 envíos (Gran cuenta)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold">
                          Modalidad
                        </label>
                        <select
                          value={formData.servicio}
                          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl border-2 border-[#0950F6]/30 bg-[#052C87] text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] cursor-pointer"
                        >
                          <option value="express">Express (2 horas)</option>
                          <option value="lowcost">LowCost (Mismo día)</option>
                          <option value="flex">MercadoLibre Flex</option>
                          <option value="3pl">Fulfillment 3PL</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group w-full mt-2 min-h-[52px] rounded-full bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading uppercase text-base tracking-wider font-bold py-3 px-6 shadow-glow-yellow transition-all duration-300 cursor-pointer flex items-center justify-between"
                    >
                      <span>Solicitar Plan y Tarifas</span>
                      <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                        <Send className="h-4 w-4" />
                      </span>
                    </button>

                    <p className="text-center font-sans text-xs text-white/60 pt-1">
                      Atención comercial directa en Mar del Plata · Sin costos de apertura de cuenta
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

```

---

## 3. Componente: `ContactForm.tsx`

> **Path Relativa:** `src/components/contacto/ContactForm.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, CheckCircle2, AlertCircle, Sparkles, Clock, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    volumen: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const message = `Hola Envíos DosRuedas! Soy ${formData.nombre.trim()}${
      formData.empresa.trim() ? ` de ${formData.empresa.trim()}` : ''
    }.${
      formData.volumen ? ` Volumen mensual estimado: ${formData.volumen}.` : ''
    } Quisiera recibir una cotización.`;

    const waUrl = `https://wa.me/542236602699?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setStatus('success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      empresa: '',
      volumen: '',
    });
    setStatus('idle');
  };

  return (
    <div className="rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl h-full flex flex-col justify-between">
      <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 shadow-lg relative overflow-hidden h-full flex flex-col justify-between text-white">
        {/* Visual Watermark in bottom right */}
        <MessageCircle
          className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.04] pointer-events-none"
          aria-hidden="true"
        />

        {/* Accent top gradient bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0950F6] via-[#FFF12E] to-[#25D366]" />

        <div className="relative z-10">
          {/* Header & Badges */}
          <div className="mb-6 pb-6 border-b border-white/15">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FFF12E] text-xs font-subheading uppercase tracking-wider font-bold -rotate-1 shadow-glow-yellow">
                <Sparkles className="w-3.5 h-3.5 text-[#FFF12E]" />
                Cotización Inmediata
              </span>

              {/* SLA Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF12E]/15 border border-[#FFF12E]/40 text-[#FFF12E] text-xs font-mono font-bold uppercase tracking-wider tabular-nums">
                <Clock className="w-3.5 h-3.5 text-[#FFF12E] animate-pulse" />
                Atención comercial &lt; 2 MIN
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white mb-2 leading-tight">
              ¿Listo para escalar la logística de tu e-commerce?
            </h2>
            <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
              Olvidate de la gestión de paquetes en Mar del Plata. Completá tus datos y te respondemos por WhatsApp al instante.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFF12E] text-[#0950F6] mx-auto flex items-center justify-center shadow-glow-yellow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                    ¡SOLICITUD ENVIADA!
                  </h3>
                  <p className="font-sans text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
                    Se abrió WhatsApp para conectar directamente con nuestro equipo comercial en Mar del Plata.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 font-subheading uppercase text-xs tracking-wider font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E]"
                >
                  Completar otro formulario
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                data-testid="contact-main-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {status === 'error' && (
                  <div className="p-3.5 bg-red-500/20 border border-red-500/40 rounded-xl flex items-center gap-3 text-red-200 text-xs font-sans">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Por favor, ingresá tu nombre para iniciar el contacto.</span>
                  </div>
                )}

                {/* Campo 1: Tu Nombre */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="nombre"
                    className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold"
                  >
                    Tu Nombre <span className="text-[#FFF12E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Tu Nombre"
                    className="w-full h-11 px-4 rounded-xl border-2 border-[#0950F6]/30 bg-white/5 text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] transition-all placeholder:text-white/40 disabled:opacity-50"
                  />
                </div>

                {/* Campo 2: Empresa / Negocio */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="empresa"
                    className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold"
                  >
                    Empresa / Negocio
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    placeholder="Empresa / Negocio"
                    className="w-full h-11 px-4 rounded-xl border-2 border-[#0950F6]/30 bg-white/5 text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] transition-all placeholder:text-white/40 disabled:opacity-50"
                  />
                </div>

                {/* Campo 3: Volumen Estimado Mensual */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="volumen"
                    className="block text-xs font-subheading uppercase tracking-wider text-white/90 font-bold"
                  >
                    Volumen Estimado Mensual
                  </label>
                  <select
                    id="volumen"
                    name="volumen"
                    value={formData.volumen}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full h-11 px-4 rounded-xl border-2 border-[#0950F6]/30 bg-[#052C87] text-white font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <option value="" disabled className="text-white/40">
                      Seleccioná una opción
                    </option>
                    <option value="1 a 50 envíos">1 a 50 envíos</option>
                    <option value="51 a 200 envíos">51 a 200 envíos</option>
                    <option value="Más de 200 envíos">Más de 200 envíos</option>
                  </select>
                </div>

                {/* Botón CTA: Hablar por WhatsApp */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full min-h-[52px] rounded-full bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading tracking-wider uppercase text-base font-bold flex items-center justify-between px-6 py-3.5 transition-all duration-300 shadow-glow-yellow active:scale-[0.99] cursor-pointer border-none disabled:opacity-50"
                >
                  <span>Hablar por WhatsApp</span>
                  <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-4 mt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/60 font-sans relative z-10">
          <span>Respuesta garantizada</span>
          <span className="font-mono font-bold text-[#FFF12E] tabular-nums">Mar del Plata 2026</span>
        </div>
      </div>
    </div>
  );
}

```

---

## 4. Componente: `ContactInfo.tsx`

> **Path Relativa:** `src/components/contacto/ContactInfo.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Facebook,
  Instagram,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function ContactInfo() {
  const socialCards = [
    {
      id: 'facebook',
      tag: 'FACEBOOK OFICIAL',
      subtag: 'FACEBOOK',
      title: 'Envíos DosRuedas',
      description: 'Seguí nuestro día a día, novedades operativas y la comunidad comercial en Mar del Plata.',
      buttonText: 'SEGUIR COMUNIDAD',
      href: 'https://facebook.com/enviosdosruedas',
      icon: Facebook,
    },
    {
      id: 'instagram',
      tag: 'INSTAGRAM MDQ',
      subtag: 'INSTAGRAM',
      title: '@enviosdosruedas',
      description: 'Mirá el detrás de escena de nuestros riders y la flota recorriendo las calles de MDQ.',
      buttonText: 'VER CONTENIDO',
      href: 'https://instagram.com/enviosdosruedas',
      icon: Instagram,
    },
    {
      id: 'whatsapp',
      tag: 'WHATSAPP DIRECTO',
      subtag: 'WHATSAPP',
      title: '+54 223 660-2699',
      description: 'Escribinos directamente para consultas, contrataciones o soporte express al toque.',
      buttonText: 'INICIAR CHAT',
      href: 'https://wa.me/542236602699?text=Hola!%20Escribo%20desde%20la%20secci%C3%B3n%20de%20contacto.',
      icon: MessageCircle,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Sección de Redes y Canales Digitales */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FFF12E] text-xs font-subheading uppercase tracking-wider font-bold -rotate-1 shadow-glow-yellow">
            <Sparkles className="w-3.5 h-3.5 text-[#FFF12E]" />
            Nuestra Comunidad Digital
          </span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white">
            SEGUÍ NUESTRO MOVIMIENTO
          </h2>
          <p className="text-white/85 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
            Sumate a nuestros canales digitales y enterate al toque de todas las novedades operativas en Mar del Plata.
          </p>
        </div>

        {/* Bento Grid de Canales Digitales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {socialCards.map((card) => {
            const IconComp = card.icon;
            const isWhatsApp = card.id === 'whatsapp';
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-lg flex flex-col justify-between"
              >
                <div className="bg-[#052C87] p-5 rounded-[20px] border border-white/10 shadow-md h-full flex flex-col justify-between text-white relative overflow-hidden">
                  {/* Visual Watermark in card corner */}
                  <IconComp
                    className="absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.04] pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-subheading uppercase tracking-wider text-[#FFF12E] font-bold px-2.5 py-0.5 rounded bg-white/10 border border-white/20">
                        {card.tag}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-white/60 tabular-nums">
                        {card.subtag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/10 border border-white/20 text-[#FFF12E]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-lg uppercase tracking-tight text-white truncate">
                        {card.title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-10 w-full min-h-[44px] h-11 rounded-full font-subheading tracking-wider uppercase text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border ${
                      isWhatsApp
                        ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E]`}
                  >
                    <span>{card.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Base de Operaciones MDQ (Datos de Contacto Central) */}
      <div className="rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 shadow-lg relative overflow-hidden text-white">
          {/* Watermark icon */}
          <MapPin
            className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFF12E] animate-pulse shadow-[0_0_8px_#FFF12E]" />
                <span className="text-xs font-subheading uppercase tracking-widest text-[#FFF12E] font-bold">
                  CENTRO DE DISTRIBUCIÓN & BASE CENTRAL
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white">
                BASE DE OPERACIONES MDQ
              </h3>
            </div>
            <span className="font-mono text-xs text-white/80 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20 tabular-nums">
              Partido de General Pueyrredón
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Datos directos */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-[#FFF12E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-subheading uppercase tracking-wider text-[#FFF12E] font-bold">
                    Centro de Distribución
                  </span>
                  <span className="block font-mono text-sm sm:text-base font-bold text-white mt-0.5 tabular-nums">
                    Friuli 1972, Mar del Plata
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-[#FFF12E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-subheading uppercase tracking-wider text-[#FFF12E] font-bold">
                    Línea Directa y WhatsApp
                  </span>
                  <a
                    href="tel:+542236602699"
                    className="block font-mono text-sm sm:text-base font-bold text-white hover:text-[#FFF12E] transition-colors mt-0.5 tabular-nums"
                  >
                    +54 223 660-2699
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-[#FFF12E] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-subheading uppercase tracking-wider text-[#FFF12E] font-bold">
                    Atención Comercial
                  </span>
                  <a
                    href="mailto:matiascejas@enviosdosruedas.com"
                    className="block font-mono text-sm sm:text-base font-bold text-white hover:text-[#FFF12E] transition-colors mt-0.5 break-all tabular-nums"
                  >
                    matiascejas@enviosdosruedas.com
                  </a>
                </div>
              </div>
            </div>

            {/* Horarios de Despacho (Base Central) */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-white/5 border border-white/15">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
                  <Clock className="w-5 h-5 text-[#FFF12E]" />
                  <h4 className="font-display text-lg uppercase tracking-tight text-white">
                    Horarios de Despacho (Base Central)
                  </h4>
                </div>

                <div className="space-y-4 font-sans text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-white/90 font-mono tabular-nums">Lunes a Viernes: 09:00 - 18:00 hs</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold text-[#0950F6] bg-[#FFF12E] rounded-full shadow-xs tabular-nums">
                      Activo
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10">
                    <span className="text-white/90 font-mono tabular-nums">Sábados: 10:00 - 15:00 hs</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold text-[#0950F6] bg-[#FFF12E] rounded-full shadow-xs tabular-nums">
                      Activo
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 text-xs text-white/60 flex items-center justify-between font-mono">
                <span>Atención presencial y retiro de cargas</span>
                <span className="text-[#FFF12E] font-bold tabular-nums">Friuli 1972</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## 5. Componente: `ConversionBanner.tsx`

> **Path Relativa:** `src/components/contacto/ConversionBanner.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function ConversionBanner() {
  return (
    <section className="rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-2xl my-12">
      <div className="bg-[#052C87] text-white p-8 sm:p-12 rounded-[20px] border border-white/10 relative overflow-hidden text-center space-y-6">
        {/* Background glow ambient effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF12E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0950F6]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Watermark Icon */}
        <MessageCircle
          className="absolute -bottom-10 -right-10 w-72 h-72 text-white/[0.03] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 -rotate-1 shadow-glow-yellow">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFF12E] animate-pulse shadow-[0_0_8px_#FFF12E]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFF12E] tabular-nums">
              Operaciones Activas Mar del Plata 2026
            </span>
          </div>

          {/* Título */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-white leading-tight">
            ¿Tenés envíos para hoy? Los entregamos a tiempo.
          </h2>

          {/* Bajada */}
          <p className="text-white/85 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Cotizá online en segundos o coordiná directo con nuestro equipo logístico por WhatsApp.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Botón Primario: Cotizá tu Envío */}
            <Link
              href="/cotizar/express"
              className="group w-full sm:w-auto min-h-[52px] rounded-full bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading tracking-wider uppercase text-base font-bold py-3.5 px-8 shadow-glow-yellow flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.99]"
            >
              <span>Cotizá tu Envío</span>
              <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Botón Secundario: Chateá con Nosotros */}
            <a
              href="https://wa.me/542236602699?text=Hola!%20Quiero%20coordinar%20mis%20env%C3%ADos%20de%20hoy."
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto min-h-[52px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading tracking-wider uppercase text-base font-bold py-3.5 px-8 shadow-lg flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.99]"
            >
              <span>Chateá con Nosotros</span>
              <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

```

