# 📄 Nodo: Términos y Condiciones

> **URL:** `/terminos-y-condiciones`  
> **Path Relativa Página:** `src/app/terminos-y-condiciones/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/terminos-y-condiciones/page.tsx` | Server Component [SC] |
| Componente | `src/app/terminos-y-condiciones/TermsContent.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/terminos-y-condiciones/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import TermsContent from './TermsContent';
import CarruselRedes from '@/src/components/layout/CarruselRedes';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Envíos DosRuedas Mar del Plata',
  description: 'Leé detenidamente las pautas operativas, obligaciones del usuario, tarifas, formas de pago y limitaciones de responsabilidad de Envíos DosRuedas.',
  alternates: {
    canonical: `${baseUrl}/terminos-y-condiciones`,
  },
};

export default function TerminosCondicionesPage() {
  return (
    <main className="min-h-screen bg-brand-blue-700 text-white relative overflow-hidden">
      {/* 3D Ambient floating glow-orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-brand-blue/20 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-brand-yellow/5 rounded-full blur-[110px] pointer-events-none" style={{ animationDelay: '-3s' }} />

      {/* Interactive terms and conditions reader */}
      <div className="relative z-10 font-sans">
        <TermsContent />
      </div>

      {/* Unified social networking carousel loop */}
      <div className="relative z-10">
        <CarruselRedes />
      </div>
    </main>
  );
}


```

---

## 2. Componente: `TermsContent.tsx`

> **Path Relativa:** `src/app/terminos-y-condiciones/TermsContent.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import {
  Scale,
  FileText,
  Truck,
  UserCheck,
  CreditCard,
  ShieldAlert,
  RefreshCw,
  Mail,
  Calendar,
  ChevronRight,
  ChevronUp,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react";

interface TermSection {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  bullets?: string[];
}

const SECTIONS: TermSection[] = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los Términos",
    shortTitle: "Aceptación",
    icon: FileText,
    content: "Al solicitar o utilizar cualquiera de los servicios de envío proporcionados por Envíos DosRuedas, vos (el cliente o comercio) aceptás y te comprometés a cumplir con los siguientes términos y condiciones.",
    bullets: [
      "Consentimiento expreso al solicitar servicios en la plataforma",
      "Aplicable a usuarios individuales, comercios y clientes corporativos",
      "Vigencia legal plena en toda la ciudad de Mar del Plata"
    ]
  },
  {
    id: "descripcion",
    title: "2. Descripción del Servicio",
    shortTitle: "Descripción",
    icon: Truck,
    content: "Envíos DosRuedas proporciona servicios de mensajería urbana y paquetería local en todo el ejido urbano de Mar del Plata (no cubrimos zonas aledañas no especificadas). Los detalles específicos de cada modalidad (Express inmediato, LowCost programado, MercadoLibre Flex y 3PL) se rigen según la tabla tarifaria oficial 2026.",
    bullets: [
      "Operación activa y cobertura integral en Mar del Plata",
      "Diversas modalidades de envío (Express, LowCost y Flex)",
      "Soporte logístico adaptado para eCommerce y PyMEs locales"
    ]
  },
  {
    id: "obligaciones",
    title: "3. Obligaciones del Usuario",
    shortTitle: "Obligaciones",
    icon: UserCheck,
    content: "Como cliente, sos responsable de proporcionar información precisa para la recolección y entrega (direcciones exactas, timbres, referencias y teléfono del destinatario). El embalaje adecuado para su transporte seguro en motocicleta es responsabilidad del remitente. No transportamos sustancias ilegales, peligrosas ni dinero en efectivo fuera de cobros contrareembolso autorizados.",
    bullets: [
      "Precisión total en datos de origen, destino y contactos directos",
      "Prohibición estricta de sustancias peligrosas o ilícitas",
      "Responsabilidad del cliente sobre el embalaje y sellado"
    ]
  },
  {
    id: "tarifas",
    title: "4. Tarifas y Pago",
    shortTitle: "Tarifas y Pago",
    icon: CreditCard,
    content: "Las tarifas se calculan en base a la distancia kilométrica real y el tipo de servicio seleccionado según la tabla 2026. Los viajes de más de 10 km aplican tarifa base más excedente por kilómetro adicional entero (Math.ceil). Los medios de pago incluyen efectivo, transferencia bancaria inmediata o cuenta corriente quincenal/mensual para clientes corporativos.",
    bullets: [
      "Tarifas transparentes calculadas por rangos kilométricos 2026",
      "Medios de pago: Transferencia, efectivo o cuenta corriente",
      "Ajustes únicamente por demoras ajenas o cambios de recorrido"
    ]
  },
  {
    id: "responsabilidad",
    title: "5. Limitación de Responsabilidad",
    shortTitle: "Responsabilidad",
    icon: ShieldAlert,
    content: "Garantizamos la máxima custodia y cuidado de cada paquete. No nos responsabilizamos por demoras extraordinarias ocasionadas por fuerza mayor, condiciones meteorológicas severas (temporal o inundaciones en la vía pública) o cortes de tránsito.",
    bullets: [
      "Exclusión de responsabilidad por eventos de fuerza mayor",
      "Tiempos de entrega con SLA prioritario garantizado",
      "Cobertura de reenvío en caso de incidencias de transporte"
    ]
  },
  {
    id: "modificaciones",
    title: "6. Modificaciones de los Términos",
    shortTitle: "Modificaciones",
    icon: RefreshCw,
    content: "Nos reservamos el derecho de actualizar estos términos para adecuarlos a nuevas tecnologías y disposiciones operativas. Las modificaciones entrarán en vigencia tras su publicación online en este sitio web.",
    bullets: [
      "Actualización transparente en el sitio oficial en tiempo real",
      "Notificación directa de condiciones tarifarias a comercios adheridos",
      "Vigencia inmediata para nuevos despachos solicitados"
    ]
  }
];

export default function TermsContent() {
  const [activeId, setActiveId] = useState<string>("aceptacion");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -55% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="bg-brand-white-50 min-h-screen relative font-sans text-brand-ink">
      {/* HERO HEADER */}
      <section className="bg-brand-blue-700 text-white relative py-20 lg:py-28 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-yellow-500/5 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-white/5 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-yellow-500 text-brand-blue-900 flex items-center gap-2 shadow-md w-fit mx-auto mb-6 font-subheading"
          >
            <Scale className="h-4 w-4" />
            <span>Marco Legal del Servicio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            Términos y <span className="text-brand-yellow-500">Condiciones</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-brand-blue-50 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl mt-4 leading-relaxed font-sans"
          >
            Las reglas del juego claras y transparentes. Al solicitar nuestros servicios, aceptás estas pautas operativas diseñadas para proteger tu mercadería.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 text-xs text-brand-yellow-500 font-medium mt-6 bg-white/10 border border-white/10 px-4 py-2 rounded-full font-mono"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Vigencia Operativa 2026</span>
          </motion.div>
        </div>
      </section>

      {/* NAVIGATION & LEGAL CONTENT */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT: Sticky Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit self-start">
            <div className="double-bezel-outer bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-3xl shadow-sm">
              <div className="double-bezel-inner bg-white rounded-2xl p-5 border border-brand-blue-50/50">
                <h3 className="text-xs uppercase tracking-widest text-brand-blue-500 font-subheading font-bold mb-4 px-2">
                  Secciones del Contrato
                </h3>
                <nav className="flex flex-col gap-1.5">
                  {SECTIONS.map((section) => {
                    const IconComponent = section.icon;
                    const isActive = activeId === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-brand-blue-700 text-white shadow-sm scale-[1.02]"
                            : "text-brand-ink hover:text-brand-blue-700 hover:bg-brand-blue-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? "text-brand-yellow-500" : "text-brand-blue-500"}`} />
                          <span className="truncate">{section.shortTitle}</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "text-brand-yellow-500 translate-x-0.5" : "text-brand-blue-300"}`} />
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-5 border-t border-brand-blue-50 px-2 text-center">
                  <Shield className="h-7 w-7 text-brand-blue-700 mx-auto mb-2" />
                  <p className="text-xs font-bold text-brand-blue-700 uppercase font-subheading tracking-wide">
                    Operación Transparente
                  </p>
                  <p className="text-[11px] text-brand-blue-500 mt-1 leading-normal font-sans">
                    Nuestras pautas operativas aseguran un servicio responsable y veloz.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Document Text Flow */}
          <main className="w-full lg:w-3/4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8"
            >
              {SECTIONS.map((section, index) => {
                const IconComponent = section.icon;
                const isActive = activeId === section.id;
                return (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    variants={cardVariants}
                    className={`scroll-mt-28 double-bezel-outer p-2 rounded-3xl transition-all duration-300 ${
                      isActive
                        ? "bg-brand-blue-100/80 border border-brand-blue-300 shadow-md"
                        : "bg-brand-blue-50/60 border border-brand-blue-100 shadow-sm"
                    }`}
                  >
                    <div className="double-bezel-inner bg-white rounded-2xl p-7 sm:p-9 border border-brand-blue-50/50">
                      {/* Section title & icon */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                            isActive
                              ? "bg-brand-blue-700 text-brand-yellow-500 shadow-sm"
                              : "bg-brand-blue-50 text-brand-blue-700"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue-400 block mb-0.5">
                            Cláusula {index + 1} de {SECTIONS.length}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-700">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      {/* Section textual body */}
                      <div>
                        <p className="text-brand-ink/90 text-sm sm:text-base leading-relaxed font-sans">
                          {section.content}
                        </p>
                      </div>

                      {/* Section key points */}
                      {section.bullets && (
                        <div className="mt-5 pt-4 border-t border-brand-blue-50">
                          <h4 className="text-xs font-subheading font-bold uppercase tracking-wider text-brand-blue-700 mb-2.5">
                            Aspectos Clave:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.bullets.map((bullet, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-brand-ink/80 font-sans leading-relaxed"
                              >
                                <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-brand-yellow-500 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}

              {/* Contact Call to Action */}
              <motion.section
                variants={cardVariants}
                className="double-bezel-outer bg-brand-blue-900/90 border border-brand-blue-700 p-2 rounded-3xl shadow-xl"
              >
                <div className="double-bezel-inner bg-gradient-to-br from-brand-blue-800 to-brand-blue-950 text-white rounded-2xl p-8 sm:p-10 border border-brand-blue-700/60">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2.5 max-w-lg">
                      <span className="px-3 py-1 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-[10px] font-subheading font-bold uppercase tracking-widest inline-block">
                        Contacto y Dudas Legales
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
                        ¿Tenés alguna consulta legal?
                      </h3>
                      <p className="text-brand-blue-100 text-xs sm:text-sm leading-relaxed font-sans">
                        Si tenés dudas operativas o inquietudes sobre nuestros términos, ponete en contacto con nuestro equipo directivo.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                      <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-2 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md transition-all"
                      >
                        <span>Formulario de Contacto</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          </main>
        </div>
      </section>

      {/* FLOATING TOP SCROLLER */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-brand-blue-700 hover:bg-brand-blue-800 border border-white/10 text-brand-yellow-500 rounded-full shadow-lg cursor-pointer transition-all"
          title="Volver Arriba"
          aria-label="Volver arriba"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

```

