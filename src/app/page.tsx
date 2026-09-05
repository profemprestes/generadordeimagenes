import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ImageIcon,
  ArrowRight,
  Truck,
  Sparkles,
  Palette,
  View,
  FileCode,
  Wand2,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio de Creación de Imágenes IA | Envíos DosRuedas",
  description: "Suite de herramientas con Inteligencia Artificial para generar prompts e imágenes de alto impacto para Envíos DosRuedas.",
};

const tools = [
  {
    href: "/generales",
    icon: Wand2,
    title: "Prompts Generales",
    description: "Crea prompts hiperrealistas para branding, banners publicitarios y campañas en redes de Envíos DosRuedas.",
    badge: "Versátil",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#0950F6] text-[#FFF12E]",
  },
  {
    href: "/servicios",
    icon: Truck,
    title: "Imágenes de Servicios",
    description: "Generador contextualizado que inyecta automáticamente la información técnica y logística de cada servicio.",
    badge: "Logística",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#052C87] text-[#FFF12E]",
  },
  {
    href: "/optimas",
    icon: Sparkles,
    title: "Imágenes Óptimas",
    description: "Motor asistido con múltiples sugerencias automáticas de composición, estilo urbano y fondos de Mar del Plata.",
    badge: "Recomendado",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#FFF12E] text-[#052C87]",
  },
  {
    href: "/generar-imagen",
    icon: ImageIcon,
    title: "Generar Imagen Real",
    description: "Renderizá cualquier prompt a imagen real con Nano Banana (Gemini 2.5 Flash) y descargala en PNG alta resolución.",
    badge: "Nano Banana",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#0950F6] text-white",
  },
  {
    href: "/hero",
    icon: View,
    title: "Refactor de Hero",
    description: "Estandariza los componentes de encabezado (Hero) y genera variantes visuales consistentes con la marca.",
    badge: "Estructural",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#052C87] text-white",
  },
  {
    href: "/ui-optimizer",
    icon: Palette,
    title: "Optimizador UI (Páginas)",
    description: "Analiza la jerarquía de tus páginas y sugiere prompts de optimización estética, responsive y tokens modernos.",
    badge: "UI / UX",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#0950F6] text-[#FFF12E]",
  },
  {
    href: "/ui-optimizer/componentes",
    icon: FileCode,
    title: "Optimizador de Componentes",
    description: "Selecciona componentes específicos de tu código para recibir refactorizaciones y prompts precisos.",
    badge: "Código",
    borderGlow: "hover:border-[#FFF12E]/60",
    iconBg: "bg-[#052C87] text-[#FFF12E]",
  },
];

const highlights = [
  "Identidad de marca Envíos DosRuedas (Azul #0950F6 & Amarillo #FFF12E)",
  "Geometría dinámica, badges de alta visibilidad y datos monoespaciados",
  "Optimizado para Google Imagen 3, Nano Banana y Gemini 2.5",
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section Banner - High Velocity Industrial Modern */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#052C87] via-[#0950F6] to-[#041d5b] p-8 sm:p-10 md:p-14 text-white shadow-2xl border border-white/15 mb-12">
          {/* Ambient Glows */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#FFF12E]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF12E] text-[#052C87] text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(255,241,46,0.35)]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="font-subheading text-xs">High-Velocity Visual Suite · Mar del Plata</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-5 leading-[0.98] font-display uppercase">
              CREA PROMPTS E IMÁGENES <span className="text-[#FFF12E]">DE ALTO IMPACTO</span>
            </h1>

            <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-sans font-normal">
              Suite de inteligencia artificial para estandarizar y generar la gráfica visual de <strong className="text-white font-semibold">Envíos DosRuedas</strong>: logística express, tarifas claras, fotografía urbana realista y consistencia de marca.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button asChild variant="cta" size="lg">
                <Link href="/generales" className="flex items-center gap-2">
                  <span>Comenzar con Prompts</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/generar-imagen" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#FFF12E]" />
                  <span>Generar Imagen Real</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15 text-xs text-blue-100 font-mono">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0950F6] dark:text-[#FFF12E] font-subheading">
              <Cpu className="w-4 h-4" />
              Módulos del Sistema
            </div>
            <h2 className="text-3xl font-normal tracking-tight text-foreground font-display uppercase mt-1">
              Herramientas Disponibles
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-sans">
              Elegí el módulo especializado según el tipo de contenido que necesitás crear
            </p>
          </div>
        </div>

        {/* Tools Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.title} className="group block h-full">
                <Card className={`h-full flex flex-col bg-card hover:bg-card/90 transition-all duration-300 border-border/80 ${tool.borderGlow} shadow-md hover:shadow-2xl hover:-translate-y-1 rounded-3xl overflow-hidden`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-2xl ${tool.iconBg} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {tool.badge && (
                        <Badge variant="secondary" className="text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider font-subheading">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-normal uppercase font-display text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed font-sans">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-3 border-t border-border/50 mt-auto py-3.5 bg-muted/20">
                    <div className="flex items-center text-xs font-bold uppercase tracking-wider text-primary dark:text-[#FFF12E] group-hover:translate-x-1.5 transition-transform">
                      <span>Abrir herramienta</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
