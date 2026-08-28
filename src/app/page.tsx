import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ImageIcon, ArrowRight, Truck, Sparkles, Palette, View, FileCode, Wand2, Zap, Layers, Cpu, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio de Creación de Imágenes IA | Dashboard",
  description: "Suite de herramientas con Inteligencia Artificial para generar prompts e imágenes de alto impacto.",
};

const tools = [
  {
    href: "/generales",
    icon: ImageIcon,
    title: "Prompts Generales",
    description: "Crea prompts hiperrealistas para branding, banners publicitarios y publicaciones en redes.",
    badge: "Versátil",
    color: "from-blue-600 to-indigo-600",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    href: "/servicios",
    icon: Truck,
    title: "Imágenes de Servicios",
    description: "Generador contextualizado que inyecta automáticamente la información técnica de cada servicio.",
    badge: "Contextualizado",
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    href: "/optimas",
    icon: Sparkles,
    title: "Imágenes Óptimas",
    description: "Motor asistido con múltiples sugerencias automáticas de composición, estilo y fondo.",
    badge: "Recomendado",
    color: "from-amber-500 to-orange-600",
    glow: "group-hover:shadow-amber-500/20",
  },
  {
    href: "/hero",
    icon: View,
    title: "Refactor de Hero",
    description: "Estandariza los componentes de encabezado (Hero) y genera variantes visuales consistentes.",
    badge: "Estructural",
    color: "from-purple-600 to-pink-600",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    href: "/ui-optimizer",
    icon: Palette,
    title: "Optimizador UI (Páginas)",
    description: "Analiza la jerarquía de tus páginas y sugiere prompts de optimización estética y UX moderna.",
    badge: "UI / UX",
    color: "from-cyan-500 to-blue-600",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    href: "/ui-optimizer/componentes",
    icon: FileCode,
    title: "Optimizador de Componentes",
    description: "Selecciona componentes específicos de tu código para recibir refactorizaciones y prompts precisos.",
    badge: "Componentes",
    color: "from-rose-500 to-red-600",
    glow: "group-hover:shadow-rose-500/20",
  },
];

const highlights = [
  "Consistencia visual garantizada con tu identidad de marca",
  "Optimizado para Google Imagen 3, Gemini y Midjourney",
  "Flujos automatizados de contexto e ingeniería de prompts",
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 sm:p-10 md:p-14 text-white shadow-2xl border border-slate-800/80 mb-12">
          {/* Ambient Glows */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6 border border-white/15 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Suite de Generación Visual con IA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight font-display">
              Crea Prompts e Imágenes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">Calidad Profesional</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-sans">
              Selecciona una herramienta para generar prompts optimizados para los principales modelos de imagen generativa, manteniendo siempre la identidad y contexto de tu negocio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs text-slate-300">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2 font-display">
              <Cpu className="w-6 h-6 text-primary" />
              Herramientas Disponibles
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Explora los módulos especializados para cada caso de uso visual
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.title} className="group block h-full">
                <Card className={`h-full flex flex-col bg-card hover:bg-card/90 transition-all duration-300 border-border/80 hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden ${tool.glow}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {tool.badge && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-3 border-t border-border/50 mt-auto py-3.5 bg-muted/20">
                    <div className="flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
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
