import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ImageIcon, ArrowRight, Truck, Sparkles, Palette, View, FileCode, Wand2, Zap, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Estudio de Creación de Imágenes IA",
  description: "Suite de herramientas con Inteligencia Artificial para generar prompts e imágenes de alto impacto.",
};

const tools = [
  {
    href: "/generales",
    icon: ImageIcon,
    title: "Imágenes Generales",
    description: "Generador de prompts con IA para imágenes de marca, banners, publicaciones y contenido general.",
    badge: "Versátil",
    color: "from-blue-500 to-indigo-600",
  },
  {
    href: "/servicios",
    icon: Truck,
    title: "Imágenes de Servicios",
    description: "Generador inteligente de imágenes específicas para cada uno de los servicios y casos de uso.",
    badge: "Contextualizado",
    color: "from-emerald-500 to-teal-600",
  },
  {
    href: "/optimas",
    icon: Sparkles,
    title: "Imágenes Óptimas",
    description: "Herramienta avanzada con múltiples sugerencias automáticas de IA para conceptualizar la imagen perfecta.",
    badge: "Recomendado",
    color: "from-amber-500 to-orange-600",
  },
  {
    href: "/hero",
    icon: View,
    title: "Refactor de Hero",
    description: "Genera prompts especializados para estandarizar y rediseñar componentes Hero visuales.",
    badge: "Estructural",
    color: "from-purple-500 to-pink-600",
  },
  {
    href: "/ui-optimizer",
    icon: Palette,
    title: "Optimizador UI (Páginas)",
    description: "Analiza páginas completas y genera prompts de refactorización estética y UI/UX responsiva.",
    badge: "UI / UX",
    color: "from-cyan-500 to-blue-600",
  },
  {
    href: "/ui-optimizer/componentes",
    icon: FileCode,
    title: "Optimizador de Componentes",
    description: "Selecciona componentes específicos de una página para obtener una refactorización de código detallada.",
    badge: "Componentes",
    color: "from-rose-500 to-red-600",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-6xl">
        {/* Hero Section Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 md:p-12 text-white shadow-2xl mb-12">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suite de Generación Visual con IA</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Crea Prompts e Imágenes de Impacto Profesional
            </h1>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Selecciona una herramienta para generar prompts optimizados para Google Imagen, Gemini y otros modelos de vanguardia, manteniendo siempre la identidad visual de tu marca.
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-20 top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.title} className="group block h-full">
                <Card className="h-full flex flex-col bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/60 overflow-hidden relative group-hover:border-primary/40">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${tool.color} text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {tool.badge && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-border/40 mt-auto py-4 bg-muted/20">
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                      Abrir herramienta
                      <ArrowRight className="ml-2 h-4 w-4" />
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

