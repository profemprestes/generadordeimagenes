# 📄 Nodo: Política de Privacidad

> **URL:** `/politica-de-privacidad`  
> **Path Relativa Página:** `src/app/politica-de-privacidad/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/politica-de-privacidad/page.tsx` | Server Component [SC] |
| Componente | `src/app/politica-de-privacidad/PrivacyContent.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/politica-de-privacidad/page.tsx`)

```tsx
import React from 'react';
import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import CarruselRedes from '@/src/components/layout/CarruselRedes';

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Envíos DosRuedas Mar del Plata',
  description: 'Conocé cómo protegemos, procesamos y resguardamos tu información personal y los datos logísticos de tus despachos en Envíos DosRuedas.',
  alternates: {
    canonical: `${baseUrl}/politica-de-privacidad`,
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-brand-blue-700 text-white relative overflow-hidden">
      {/* 3D Ambient floating glow-orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-brand-blue/20 rounded-full blur-[130px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] bg-brand-yellow/5 rounded-full blur-[110px] pointer-events-none" style={{ animationDelay: '-3s' }} />

      {/* Interactive privacy policy reader */}
      <div className="relative z-10 font-sans">
        <PrivacyContent />
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

## 2. Componente: `PrivacyContent.tsx`

> **Path Relativa:** `src/app/politica-de-privacidad/PrivacyContent.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Database,
  Settings,
  Share2,
  Scale,
  RefreshCw,
  Mail,
  FileText,
  Calendar,
  ArrowRight,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  extraDetails?: string[];
}

const SECTIONS: Section[] = [
  {
    id: "introduccion",
    title: "Introducción",
    shortTitle: "Introducción",
    icon: FileText,
    content: "Bienvenido a Envíos DosRuedas. Nos comprometemos a proteger tu privacidad y a manejar tus datos personales de manera transparente y segura.",
    extraDetails: [
      "Transparencia absoluta en el tratamiento de datos",
      "Cumplimiento con la Ley de Protección de Datos Personales N° 25.326",
      "Seguridad y resguardo de la información de envíos"
    ]
  },
  {
    id: "informacion",
    title: "1. Información que Recopilamos",
    shortTitle: "Recopilación",
    icon: Database,
    content: "Recopilamos información que nos proporcionás directamente, como tu nombre, número de teléfono, dirección de correo electrónico y direcciones de recogida/entrega al utilizar nuestros servicios. También podemos recopilar información técnica sobre tu dispositivo y uso de nuestro sitio web a través de cookies y tecnologías similares.",
    extraDetails: [
      "Datos de contacto (Nombre, teléfono, e-mail)",
      "Datos logísticos (Dirección de recogida y entrega en MDQ)",
      "Datos de navegación (Cookies y telemetría técnica)"
    ]
  },
  {
    id: "uso",
    title: "2. Uso de la Información",
    shortTitle: "Uso de Datos",
    icon: Settings,
    content: "Utilizamos tu información para proveer y gestionar nuestros servicios de envío, comunicar el estado de tus despachos, enviar ofertas y actualizaciones importantes, y optimizar y personalizar nuestro servicio.",
    extraDetails: [
      "Gestión y ruteo de envíos express y lowcost",
      "Notificaciones automáticas y alertas de entrega en tiempo real",
      "Mejora continua del algoritmo de cotización y servicio"
    ]
  },
  {
    id: "compartir",
    title: "3. Cómo Compartimos tu Información",
    shortTitle: "Compartir Datos",
    icon: Share2,
    content: "No vendemos ni alquilamos tu información personal. La compartimos con nuestros repartidores y socios logísticos únicamente para completar el servicio de entrega, o cuando es requerido por ley.",
    extraDetails: [
      "Cero reventa ni alquiler de bases de datos a terceros",
      "Sincronización segura con cadetes asignados al despacho",
      "Requerimientos legales y auditorías obligatorias"
    ]
  },
  {
    id: "seguridad",
    title: "4. Seguridad de los Datos",
    shortTitle: "Seguridad",
    icon: Lock,
    content: "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración o destrucción.",
    extraDetails: [
      "Encriptación SSL en pasarelas y transmisión de datos",
      "Control estricto de accesos internos a las consolas de despacho",
      "Monitoreo activo de brechas y almacenamiento seguro"
    ]
  },
  {
    id: "derechos",
    title: "5. Tus Derechos",
    shortTitle: "Tus Derechos",
    icon: Scale,
    content: "Tenés derecho a acceder, rectificar o suprimir tus datos personales, u oponerte a su tratamiento en cualquier momento.",
    extraDetails: [
      "Acceso inmediato a la información personal almacenada",
      "Rectificación rápida de direcciones y números telefónicos erróneos",
      "Supresión definitiva a solicitud del usuario"
    ]
  },
  {
    id: "cambios",
    title: "6. Cambios en esta Política",
    shortTitle: "Cambios",
    icon: RefreshCw,
    content: "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento publicando la nueva versión aquí.",
    extraDetails: [
      "Notificación de cambios sustanciales a través de la web",
      "Archivo histórico de políticas anteriores disponible a solicitud",
      "Vigencia inmediata tras su publicación online"
    ]
  },
  {
    id: "contacto",
    title: "7. Contacto",
    shortTitle: "Contacto",
    icon: Mail,
    content: "Si tenés preguntas sobre esta Política, contactanos a través de nuestro formulario de contacto o en matiascejas@enviosdosruedas.com.",
    extraDetails: [
      "Atención directa del responsable de privacidad",
      "Respuesta garantizada en menos de 48 horas hábiles",
      "Soporte especializado para PyMEs y eCommerce"
    ]
  }
];

export default function PrivacyContent() {
  const [activeId, setActiveId] = useState<string>("introduccion");
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
      {/* HERO BANNER SECTION */}
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
            <Shield className="h-4 w-4" />
            <span>Navegación 100% Protegida</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            Política de <span className="text-brand-yellow-500">Privacidad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-brand-blue-50 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl mt-4 leading-relaxed font-sans"
          >
            En Envíos DosRuedas, tu confianza es nuestra prioridad. Te explicamos cómo protegemos y utilizamos tu información personal.
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

      {/* NAVIGATION & CONTENT PANEL */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN: Sticky table of contents */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit self-start">
            <div className="double-bezel-outer bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-3xl shadow-sm">
              <div className="double-bezel-inner bg-white rounded-2xl p-5 border border-brand-blue-50/50">
                <h3 className="text-xs uppercase tracking-widest text-brand-blue-500 font-subheading font-bold mb-4 px-2">
                  Índice de Secciones
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
                    Seguridad Garantizada
                  </p>
                  <p className="text-[11px] text-brand-blue-500 mt-1 leading-normal font-sans">
                    Tus datos logísticos se cifran con los más altos estándares.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Interactive Document Flow */}
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
                      {/* Section Header */}
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
                            Sección {index + 1} de {SECTIONS.length}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-brand-blue-700">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      {/* Section Content */}
                      <div>
                        <p className="text-brand-ink/90 text-sm sm:text-base leading-relaxed font-sans">
                          {section.content}
                        </p>
                      </div>

                      {/* Details Bullet Points */}
                      {section.extraDetails && (
                        <div className="mt-5 pt-4 border-t border-brand-blue-50">
                          <h4 className="text-xs font-subheading font-bold uppercase tracking-wider text-brand-blue-700 mb-2.5">
                            Puntos Clave:
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.extraDetails.map((detail, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-brand-ink/80 font-sans leading-relaxed"
                              >
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-yellow-500 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}

              {/* ADDITIONAL SUPPORT CARD */}
              <motion.section
                variants={cardVariants}
                className="double-bezel-outer bg-brand-blue-900/90 border border-brand-blue-700 p-2 rounded-3xl shadow-xl"
              >
                <div className="double-bezel-inner bg-gradient-to-br from-brand-blue-800 to-brand-blue-950 text-white rounded-2xl p-8 sm:p-10 border border-brand-blue-700/60">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2.5 max-w-lg">
                      <span className="px-3 py-1 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-[10px] font-subheading font-bold uppercase tracking-widest inline-block">
                        Soporte de Privacidad
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
                        ¿Tenés dudas de privacidad?
                      </h3>
                      <p className="text-brand-blue-100 text-xs sm:text-sm leading-relaxed font-sans">
                        Escribinos directamente o completá nuestro formulario para que podamos ayudarte de inmediato.
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

      {/* FLOAT TO TOP BUTTON */}
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

