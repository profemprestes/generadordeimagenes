# 📄 Nodo: Preguntas Frecuentes (FAQ)

> **URL:** `/nosotros/preguntas-frecuentes`  
> **Path Relativa Página:** `src/app/nosotros/preguntas-frecuentes/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/nosotros/preguntas-frecuentes/page.tsx` | Server Component [SC] |
| Componente | `src/components/nosotros/preguntas-frecuentes/FaqHero.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/preguntas-frecuentes/Faq-categories.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/preguntas-frecuentes/FaqAccordion.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/preguntas-frecuentes/FaqCta.tsx` | Client Component [CC] |
| Componente | `src/components/nosotros/preguntas-frecuentes/faqData.ts` | Server Component [SC] |

---

## 1. Código de la Página Raíz (`src/app/nosotros/preguntas-frecuentes/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import FaqHero from '@/src/components/nosotros/preguntas-frecuentes/FaqHero';
import { FaqCategories } from '@/src/components/nosotros/preguntas-frecuentes/Faq-categories';
import { FAQ_DATA } from '@/src/components/nosotros/preguntas-frecuentes/faqData';
import FaqCta from '@/src/components/nosotros/preguntas-frecuentes/FaqCta';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes (FAQ) | Envíos DosRuedas Mar del Plata',
  description:
    'Despejá todas tus dudas sobre mensajería en moto, Envíos Flex MercadoLibre, reparto LowCost, servicio Express, tarifas 2026 y cobertura en Mar del Plata.',
  alternates: {
    canonical: `${baseUrl}/nosotros/preguntas-frecuentes`,
  },
  openGraph: {
    title: 'Preguntas Frecuentes (FAQ) | Envíos DosRuedas Mar del Plata',
    description:
      'Respuestas inmediatas sobre servicios, tiempos, tarifas y logística urbana con flota propia en Mar del Plata.',
    url: `${baseUrl}/nosotros/preguntas-frecuentes`,
    type: 'website',
    locale: 'es_AR',
  },
};

// Flatten all questions across categories for comprehensive FAQPage Schema.org structured data
const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.flatMap((cat) =>
    cat.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    }))
  ),
};

export default function PreguntasFrecuentesPage() {
  return (
    <main className="min-h-screen bg-brand-white-50 text-brand-blue-700 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {/* 3D Ambient floating glow-orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-brand-blue-500/10 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div
        className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-brand-yellow-500/5 rounded-full blur-[110px] pointer-events-none"
        style={{ animationDelay: '-3s' }}
      />

      {/* Hero Header block */}
      <div className="relative z-10">
        <FaqHero />
      </div>

      {/* Interactive FAQ category and accordion block */}
      <div className="relative z-10 font-sans">
        <FaqCategories />
      </div>

      {/* Dynamic contact and support CTA block */}
      <div className="relative z-10">
        <FaqCta />
      </div>
    </main>
  );
}

```

---

## 2. Componente: `FaqHero.tsx`

> **Path Relativa:** `src/components/nosotros/preguntas-frecuentes/FaqHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HelpCircle, ChevronDown, MessageCircle, Sparkles, ArrowRight, Clock, ShieldCheck, Truck, CreditCard } from 'lucide-react';

const TOP_FAQS = [
  {
    id: 'corte-same-day',
    question: '¿Cuál es el horario de corte para Same-Day?',
    answer: 'Para envíos LowCost con entrega en el día, el corte de solicitud es a las 14:00 hs. Para envíos Express (2 horas), tomamos pedidos de lunes a sábados hasta las 19:00 hs.',
    category: 'Express / LowCost',
  },
  {
    id: 'rastreo-paquete',
    question: '¿Cómo rastreo mi paquete en tiempo real?',
    answer: 'Ingresá el código de seguimiento en nuestro cotizador o envianos un mensaje a nuestro WhatsApp comercial. Un operador te comparte la ubicación satelital del cadete al instante.',
    category: 'Tracking & Seguridad',
  },
  {
    id: 'ausente-entrega',
    question: '¿Qué pasa si no hay nadie en el domicilio?',
    answer: 'El repartidor se comunica telefónicamente al llegar. Si el destinatario no responde, el paquete regresa a base central en Friuli 1972 y reprogramamos una 2da visita sin recargo.',
    category: 'Entregas',
  },
];

const SEARCH_SUGGESTIONS = [
  { text: '¿Cuánto cuesta un envío Express?', link: '/cotizar/express', tag: 'Express' },
  { text: '¿Hacen entregas en Batán y Sierra de los Padres?', link: '/servicios/envios-express', tag: 'Cobertura' },
  { text: '¿Cómo funciona MercadoLibre Flex en MDQ?', link: '/servicios/enviosflex', tag: 'Flex' },
  { text: '¿Cuáles son los medios de pago aceptados?', link: '#faq-accordion', tag: 'Pagos' },
  { text: '¿Tienen servicio de almacenamiento 3PL?', link: '/servicios/plan-emprendedores', tag: '3PL' },
];

const CATEGORY_CHIPS = [
  { name: 'EXPRESS', icon: Clock },
  { name: 'LOWCOST', icon: Truck },
  { name: 'FLEX', icon: Sparkles },
  { name: '3PL', icon: ShieldCheck },
  { name: 'PAGOS', icon: CreditCard },
];

export default function FaqHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <section 
      id="faq-hero" 
      className="relative w-full pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-brand-blue-500 text-white border-b border-white/10"
    >
      {/* Halo glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Monumental Headline & Smart Search (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Speed Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-yellow-500/40 bg-[#052C87]/90 text-brand-yellow-500 text-xs sm:text-sm font-subheading uppercase tracking-widest shadow-md backdrop-blur-md transform -rotate-1">
              <HelpCircle className="h-4 w-4 text-brand-yellow-500 shrink-0" />
              <span>CENTRO DE SOPORTE · MAR DEL PLATA 2026</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display uppercase tracking-tight leading-[0.98] text-5xl sm:text-7xl lg:text-[7rem] text-white">
              <span className="block">¿TENÉS</span>
              <span className="inline-block bg-brand-yellow-500 text-[#052C87] px-3 py-1 rounded-md transform -rotate-1 mt-1 font-display tracking-tight shadow-glow-yellow">
                DUDAS?
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl font-sans text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed pl-4 border-l-4 border-brand-yellow-500">
              Buscá por palabra clave o elegí una categoría. Si no está, te respondemos por WhatsApp en minutos.
            </p>

            {/* Smart Search Bar with Dropdown Suggestions */}
            <div className="relative max-w-xl">
              <div className="relative rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-1.5 shadow-2xl transition-all focus-within:ring-4 focus-within:ring-brand-yellow-500/50">
                <div className="rounded-[20px] bg-white flex items-center px-4 py-1 border border-brand-blue-50/50">
                  <Search className="w-5 h-5 text-[#0950F6] shrink-0 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder="Ej: ¿cuánto tarda un envío a Batán?"
                    className="w-full h-11 bg-transparent text-brand-ink font-sans text-sm sm:text-base focus:outline-none placeholder:text-brand-blue-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xs font-subheading uppercase text-brand-blue-400 hover:text-[#0950F6] px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0950F6]"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {(isSearchFocused || searchQuery.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-brand-blue-100 shadow-2xl p-3 z-30 space-y-1.5"
                  >
                    <span className="text-[10px] font-subheading uppercase tracking-wider text-brand-blue-400 font-bold px-2 block">
                      {searchQuery ? 'Resultados sugeridos' : 'Preguntas frecuentes sugeridas'}
                    </span>
                    {(searchQuery.length > 0 ? filteredSuggestions : SEARCH_SUGGESTIONS).slice(0, 4).map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-blue-50 text-brand-ink hover:text-[#0950F6] transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0950F6]"
                      >
                        <span className="font-sans text-xs sm:text-sm">{item.text}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-subheading font-bold uppercase text-[#0950F6] bg-brand-blue-50 px-2 py-0.5 rounded-md">
                          {item.tag}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category Quick Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-subheading uppercase tracking-wider text-white/80 font-bold mr-1">
                TEMAS:
              </span>
              {CATEGORY_CHIPS.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <a
                    key={cat.name}
                    href="#faq-accordion"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-brand-yellow-500 hover:text-[#052C87] border border-white/20 text-white text-xs font-subheading uppercase tracking-wider font-bold transition-all shadow-glow-yellow min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                  >
                    <IconComp className="w-3.5 h-3.5 text-brand-yellow-500 group-hover:text-[#052C87]" />
                    <span>{cat.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Floating "Respuesta Rápida" Accordion Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-2xl">
              <div className="rounded-[20px] bg-[#052C87] p-6 sm:p-7 border border-white/10 shadow-sm relative overflow-hidden space-y-5 text-white">
                {/* Accent line top */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-yellow-500 via-white to-brand-yellow-400" />

                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="font-subheading text-[10px] uppercase tracking-wider text-brand-yellow-500 font-bold block">
                      PREGUNTAS TOP MDQ
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-white leading-none mt-0.5">
                      Respuestas Rápidas
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-500 animate-pulse shadow-glow-yellow" />
                </div>

                {/* Top 3 Interactive FAQ Accordion */}
                <div className="space-y-2.5">
                  {TOP_FAQS.map((faq) => {
                    const isOpen = openFaq === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'bg-white/15 border-brand-yellow-500/50 shadow-2xs'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                          className="w-full text-left p-3.5 flex items-center justify-between gap-3 min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                        >
                          <span className="font-subheading text-xs sm:text-sm uppercase tracking-wide text-white font-bold leading-snug">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-white shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-brand-yellow-500' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="px-3.5 pb-3.5 pt-1 text-xs font-sans text-white/90 leading-relaxed border-t border-white/10">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* WhatsApp Help Footer CTA */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-sans text-white/90 font-medium">
                      ¿No encontrás tu duda?
                    </span>
                    <span className="font-mono text-[11px] text-brand-yellow-500 font-bold">
                      Respuesta &lt; 5 min
                    </span>
                  </div>

                  <a
                    href="https://wa.me/542236602699?text=Hola!%20Tengo%20una%20duda%20sobre%20los%20env%C3%ADos%20de%20Envíos%20DosRuedas%20en%20Mar%20del%20Plata."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-h-[52px] w-full px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg font-subheading tracking-wider uppercase text-sm font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
                  >
                    <span>Preguntanos por WhatsApp</span>
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </span>
                  </a>
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

## 3. Componente: `Faq-categories.tsx`

> **Path Relativa:** `src/components/nosotros/preguntas-frecuentes/Faq-categories.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Clock,
  CreditCard,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FAQ_DATA, type FaqCategoryGroup, type FaqQuestion } from './faqData';

export { FAQ_DATA };
export type { FaqCategoryGroup, FaqQuestion };

const ICON_MAP = {
  Truck,
  Clock,
  CreditCard,
  ShieldCheck,
};

export function FaqCategories() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('servicios');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const activeGroup = FAQ_DATA.find((cat) => cat.id === activeCategoryId) || FAQ_DATA[0];
  const ActiveIcon = ICON_MAP[activeGroup.iconName];

  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setExpandedIndex(0);
  };

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section aria-label="Preguntas Frecuentes por Categoría" className="w-full py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category selector grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {FAQ_DATA.map((category) => {
            const Icon = ICON_MAP[category.iconName];
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategorySelect(category.id)}
                aria-pressed={isActive}
                className={cn(
                  'group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 min-h-[52px] cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0950F6]/50',
                  isActive
                    ? 'bg-[#052C87] border-[#052C87] text-white shadow-lg scale-[1.02] transform -rotate-1'
                    : 'bg-white border-brand-blue-100 text-brand-blue-700 hover:border-[#0950F6] hover:bg-brand-blue-50/50'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                      isActive
                        ? 'bg-brand-yellow-500 text-brand-blue-900 shadow-glow-yellow'
                        : 'bg-brand-blue-50 text-[#0950F6] group-hover:bg-brand-blue-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-mono font-bold px-2.5 py-0.5 rounded-full tabular-nums',
                      isActive
                        ? 'bg-white/20 text-brand-yellow-500'
                        : 'bg-brand-blue-50 text-[#0950F6]'
                    )}
                  >
                    {category.questions.length} Qs
                  </span>
                </div>

                <h3
                  className={cn(
                    'font-subheading text-lg font-bold tracking-wide uppercase leading-snug mb-1',
                    isActive ? 'text-white' : 'text-brand-blue-700'
                  )}
                >
                  {category.label}
                </h3>
                <p
                  className={cn(
                    'text-xs line-clamp-2 leading-relaxed font-sans',
                    isActive ? 'text-white/80' : 'text-brand-blue-500/80'
                  )}
                >
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Double bezel container for category questions */}
        <div className="rounded-[28px] bg-brand-blue-50/80 border border-brand-blue-100 p-2 sm:p-3 shadow-sm">
          <div className="rounded-[20px] bg-white p-5 sm:p-8 border border-brand-blue-50 shadow-inner">
            {/* Header info of active category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-brand-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow-500 text-brand-blue-700 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-brand-blue-700 uppercase tracking-tight">
                    {activeGroup.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-blue-600/80 font-sans">
                    {activeGroup.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-blue-600 self-start sm:self-center bg-brand-blue-50 px-3 py-1.5 rounded-full border border-brand-blue-100">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow-500" />
                <span>Mar del Plata 2026</span>
              </div>
            </div>

            {/* Questions Accordion List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {activeGroup.questions.map((faq, index) => {
                  const isExpanded = expandedIndex === index;
                  const questionId = `faq-q-${activeGroup.id}-${index}`;
                  const answerId = `faq-a-${activeGroup.id}-${index}`;

                  return (
                    <div
                      key={faq.question}
                      className={cn(
                        'border rounded-xl transition-all duration-200 overflow-hidden',
                        isExpanded
                          ? 'border-brand-blue-300 bg-brand-blue-50/40 shadow-xs'
                          : 'border-brand-blue-100 bg-white hover:border-brand-blue-200'
                      )}
                    >
                      <button
                        type="button"
                        id={questionId}
                        aria-expanded={isExpanded}
                        aria-controls={answerId}
                        onClick={() => handleToggle(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-inset"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={cn(
                              'p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors',
                              isExpanded
                                ? 'bg-brand-blue-700 text-brand-yellow-500'
                                : 'bg-brand-blue-50 text-brand-blue-500 group-hover:bg-brand-blue-100'
                            )}
                          >
                            <HelpCircle className="w-4 h-4 shrink-0" />
                          </div>
                          <h3
                            className={cn(
                              'text-base sm:text-lg font-sans font-semibold leading-snug transition-colors',
                              isExpanded
                                ? 'text-brand-blue-700'
                                : 'text-brand-ink/90 group-hover:text-brand-blue-700'
                            )}
                          >
                            {faq.question}
                          </h3>
                        </div>

                        <div
                          className={cn(
                            'p-1.5 rounded-full shrink-0 transition-transform duration-300 mt-0.5',
                            isExpanded
                              ? 'rotate-180 bg-brand-yellow-500 text-brand-blue-700'
                              : 'bg-brand-blue-50 text-brand-blue-500 group-hover:bg-brand-blue-100'
                          )}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={answerId}
                            role="region"
                            aria-labelledby={questionId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-sm sm:text-base text-brand-blue-700/90 font-sans leading-relaxed border-t border-brand-blue-100/60 bg-white/70">
                              <p>{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqCategories;
```

---

## 4. Componente: `FaqAccordion.tsx`

> **Path Relativa:** `src/components/nosotros/preguntas-frecuentes/FaqAccordion.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import { FaqCategories } from './Faq-categories';

export default function FaqAccordion() {
  return <FaqCategories />;
}

```

---

## 5. Componente: `FaqCta.tsx`

> **Path Relativa:** `src/components/nosotros/preguntas-frecuentes/FaqCta.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MessageSquare, Mail, HelpCircle, ArrowRight } from 'lucide-react';

export default function FaqCta() {
  return (
    <section
      id="faq-cta"
      className="py-24 bg-[#052C87] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Dynamic Background Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#0950F6,transparent_35%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,#FFF12E,transparent_40%)] opacity-15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
          }}
        >
          <div className="rounded-[20px] bg-[#052C87] p-8 sm:p-12 border border-white/10 text-white text-center relative overflow-hidden">
            {/* Abstract background logo */}
            <div className="absolute right-0 bottom-0 translate-y-8 translate-x-8 text-white/5 pointer-events-none -z-10">
              <HelpCircle className="h-64 w-64 text-white opacity-10" />
            </div>

            <div className="max-w-2xl mx-auto space-y-6 relative z-10 flex flex-col items-center">

              <span className="px-4 py-1.5 bg-brand-yellow-500 text-[#052C87] font-bold rounded-full text-xs font-subheading uppercase tracking-widest inline-block shadow-glow-yellow transform -rotate-1">
                SOPORTE HUMANO EN MDP
              </span>

              <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight leading-[1.1] text-white">
                ¿NO ENCONTRASTE LO QUE BUSCABAS?
              </h3>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
                No te preocupes. Nuestro equipo de soporte está listo para ayudarte de inmediato con cualquier consulta específica que tengas sobre nuestros servicios de mensajería y delivery.
              </p>

              {/* CTA Buttons (WhatsApp en #25D366 exclusivo para soporte directo) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
                <a
                  href="https://wa.me/5492236602699?text=Hola,%20tengo%20una%20consulta%20que%20no%20encontr%C3%A9%20en%20las%20FAQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="faq-cta-whatsapp"
                  className="group min-h-[52px] px-8 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading tracking-wider text-lg uppercase font-bold rounded-full flex items-center justify-center gap-3 shadow-lg transition-all duration-300 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
                >
                  <span>Hablá por WhatsApp</span>
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <MessageSquare className="h-4.5 w-4.5 text-white fill-current" />
                  </span>
                </a>

                <Link
                  href="/contacto"
                  id="faq-cta-contacto"
                  className="group min-h-[52px] px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-subheading tracking-wider text-lg uppercase font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  <span>Contacto Directo</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="h-4.5 w-4.5 text-white" />
                  </span>
                </Link>
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

## 6. Componente: `faqData.ts`

> **Path Relativa:** `src/components/nosotros/preguntas-frecuentes/faqData.ts`  
> **Tipo:** Server Component [SC]  

```ts
export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqCategoryGroup {
  id: string;
  label: string;
  description: string;
  iconName: 'Truck' | 'Clock' | 'CreditCard' | 'ShieldCheck';
  questions: FaqQuestion[];
}

export const FAQ_DATA: FaqCategoryGroup[] = [
  {
    id: 'servicios',
    label: 'Servicios y Envíos',
    description: 'Soluciones de última milla, cobertura urbana y tipos de entrega',
    iconName: 'Truck',
    questions: [
      {
        question: '¿Qué tipo de servicios y soluciones logísticas realizan en Mar del Plata?',
        answer:
          'Ofrecemos mensajería urbana y soluciones para e-commerce: Envíos Flex para MercadoLibre, Envíos Express prioritarios, reparto LowCost programado, cadetería corporativa, mandados y servicio integral 3PL (almacenamiento, preparación de pedidos y distribución).',
      },
      {
        question: '¿Cuáles son las zonas de cobertura?',
        answer:
          'Cubrimos de forma integral todo el ejido urbano de Mar del Plata (no cubrimos zonas aledañas), garantizando presencia y entregas seguras en todos los barrios de la ciudad.',
      },
      {
        question: '¿Hacen entregas en el mismo día (Same-Day) y Mercado Envíos Flex?',
        answer:
          'Sí, somos especialistas en entregas en el día. Retiramos tus ventas y las entregamos en la misma jornada, cumpliendo estrictamente los tiempos de MercadoLibre para proteger tu reputación y medalla de vendedor.',
      },
      {
        question: '¿Cuáles son los límites de peso y tamaño por paquete?',
        answer:
          'Operamos con una flota propia y exclusiva de motocicletas. La capacidad máxima estándar es de hasta 5 kg o dimensiones de aproximadamente 40x40x30 cm por bulto.',
      },
      {
        question: '¿Realizan entregas a contrareembolso?',
        answer:
          'Sí, realizamos la cobranza en efectivo al momento de entregar el producto. El dinero recaudado se rinde en el transcurso del mismo día o a primera hora del día hábil siguiente.',
      },
      {
        question: '¿Trabajan con empresas o solo con particulares?',
        answer:
          'Atendemos a empresas, pymes, tiendas online, emprendedores y particulares que necesiten cadetería puntual o recurrente.',
      },
    ],
  },
  {
    id: 'tiempos',
    label: 'Tiempos y Operatoria',
    description: 'Horarios de base, anticipación de pedidos, seguimiento y contingencias',
    iconName: 'Clock',
    questions: [
      {
        question: '¿Cuáles son sus horarios de atención y recepción de pedidos?',
        answer:
          'Nuestro horario de atención en base (Friuli 1972) es de lunes a viernes de 09:00 a 18:00 hs y sábados de 10:00 a 15:00 hs. Para el servicio LowCost del día, el horario de corte de recepción de pedidos es a las 13:00 hs.',
      },
      {
        question: '¿Cómo funciona el Servicio Express y con cuánta anticipación debo pedirlo?',
        answer:
          'El Servicio Express cuenta con prioridad operativa inmediata para envíos urgentes. Podés programar tu franja horaria de retiro y entrega con una antelación mínima de 2 horas.',
      },
      {
        question: '¿Cómo realizo el seguimiento de mi envío?',
        answer:
          'Centralizamos la gestión de forma ágil y directa vía WhatsApp. Te mantenemos informado del estado del paquete y te enviamos la confirmación inmediata una vez concretada la entrega.',
      },
      {
        question: '¿Qué información necesito proporcionar para solicitar un envío?',
        answer:
          'Solo requerimos: dirección exacta de retiro, dirección de entrega, franja horaria, detalle o tamaño del paquete, y nombre con teléfono de contacto de quien recibe.',
      },
      {
        question: '¿Puedo modificar la dirección de entrega cuando el paquete ya está en camino?',
        answer:
          'Sí, podés avisarnos por WhatsApp y coordinamos el cambio. Tené en cuenta que, dependiendo de la distancia a la nueva zona, puede aplicar un costo adicional por kilometraje.',
      },
      {
        question: '¿Qué sucede si el destinatario no está en el domicilio o rechaza el producto?',
        answer:
          'Te avisamos en el momento para intentar resolverlo. Si el paquete no puede entregarse y debe regresar a tu local o depósito, la devolución se realiza totalmente SIN CARGO.',
      },
    ],
  },
  {
    id: 'precios',
    label: 'Precios, Pagos y Facturación',
    description: 'Cálculo por distancia, métodos de pago y planes para comercios',
    iconName: 'CreditCard',
    questions: [
      {
        question: '¿Cómo calculan el costo del envío?',
        answer:
          'El valor se calcula según la distancia punto a punto entre retiro y entrega, contemplando adicionales si existen (días de lluvia, bultos especiales o demoras en espera).',
      },
      {
        question: '¿Cuáles son las formas de pago aceptadas?',
        answer:
          'Podés abonar mediante transferencia bancaria, dinero en cuenta o efectivo al momento del retiro o la entrega.',
      },
      {
        question: '¿Emiten factura por el servicio?',
        answer:
          'Sí, emitimos Factura C para todos nuestros servicios profesionales, comerciales y corporativos.',
      },
      {
        question: '¿Tienen planes o tarifas especiales para emprendedores y envíos masivos?',
        answer:
          'Sí, contamos con el "Plan Emprendedores" y esquemas de tarifas reducidas para comercios y marcas con volumen diario recurrente.',
      },
    ],
  },
  {
    id: 'confianza',
    label: 'Confianza y Diferenciación',
    description: 'Nuestra propuesta de valor, flota propia y contacto directo',
    iconName: 'ShieldCheck',
    questions: [
      {
        question: '¿Qué diferencia a Envíos DosRuedas de otras mensajerías o apps?',
        answer:
          'Brindamos "Logística con Cara Humana": contamos con flota propia de motos (cero tercerización informal), atención personalizada y directa por WhatsApp sin bots impersonales, y una calificación perfecta de 5 estrellas en Mar del Plata respaldada por nuestra puntualidad, cuidado y compromiso real.',
      },
      {
        question: '¿Cómo puedo solicitar un envío o pedir una cotización?',
        answer:
          'Escribinos directamente por WhatsApp al 2236602699 y un operador te responderá al instante con la cotización exacta para tu pedido.',
      },
    ],
  },
];

```

