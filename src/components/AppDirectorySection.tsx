import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Wand2,
  Truck,
  ImageIcon,
  View,
  Palette,
  FileCode,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export interface AppRouteInfo {
  path: string;
  name: string;
  category: "Dashboard" | "Generador de Prompts" | "Renderizado Directo" | "Optimización de UI / Código" | "Redirecciones & Utilidades";
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  icon: React.ElementType;
  description: string;
  keyFeatures: string[];
  status: "Activa" | "Redirección";
}

export const APP_ROUTES: AppRouteInfo[] = [
  {
    path: "/",
    name: "Dashboard Principal",
    category: "Dashboard",
    badge: "Inicio",
    badgeVariant: "secondary",
    icon: LayoutDashboard,
    description: "Hub central del Estudio de Imágenes IA. Presenta acceso rápido a todos los generadores, métricas clave de la identidad visual de Envíos DosRuedas y enlaces directos a cada flujo de trabajo.",
    keyFeatures: [
      "Bento Grid con acceso directo a cada módulo especializado",
      "Banner de alto impacto con resumen de identidad visual (#0950F6 y #FFF12E)",
      "Directorio interactivo de páginas y rutas del sistema",
    ],
    status: "Activa",
  },
  {
    path: "/generales",
    name: "Prompts Generales",
    category: "Generador de Prompts",
    badge: "Versátil",
    badgeVariant: "default",
    icon: Wand2,
    description: "Generador de prompts estructurados en 5 capas para branding, campañas de redes sociales, banners y gráfica general con coherencia visual corporativa.",
    keyFeatures: [
      "Estructuración canónica en 5 capas (Sujeto, Entorno, Composición, Iluminación, Materiales)",
      "Compilador determinista en lenguaje natural en inglés denso",
      "Limpieza automática de keywords obsoletas y etiquetas prohibidas",
    ],
    status: "Activa",
  },
  {
    path: "/servicios",
    name: "Imágenes de Servicios",
    category: "Generador de Prompts",
    badge: "Logística 3PL",
    badgeVariant: "default",
    icon: Truck,
    description: "Generador de imágenes y prompts altamente contextualizados para los 5 servicios canónicos (Express, LowCost, Flex, Plan Emprendedores y Fulfillment 3PL).",
    keyFeatures: [
      "Inyección contextual de especificaciones operativas y flota de Envíos DosRuedas",
      "Integración de cascos reglamentarios, scooters y cajas térmicas",
      "Generación de nombres de archivo semánticos limpios en formato .webp",
    ],
    status: "Activa",
  },
  {
    path: "/optimas",
    name: "Imágenes Óptimas",
    category: "Generador de Prompts",
    badge: "Recomendado",
    badgeVariant: "secondary",
    icon: Sparkles,
    description: "Motor asistido con sugerencias inteligentes automáticas para componer escenas fotográficas urbanas de alto impacto en Mar del Plata.",
    keyFeatures: [
      "Sugerencias de fondos icónicos marplatenses (Rambla, Casino Central, Chauvín, Güemes)",
      "Composiciones dinámicas preconfiguradas para máxima conversión",
      "Control fino de estilo (Fotografía Urbana, 3D Isométrico, Editorial, Arte Vectorial)",
    ],
    status: "Activa",
  },
  {
    path: "/generar-imagen",
    name: "Generar Imagen Real",
    category: "Renderizado Directo",
    badge: "Nano Banana Pro & 2",
    badgeVariant: "secondary",
    icon: ImageIcon,
    description: "Suite de renderizado multimodal directo que convierte prompts en imágenes reales usando Nano Banana Pro (4K) y Nano Banana 2 con Google Search Grounding.",
    keyFeatures: [
      "Selector de modelos: Nano Banana Pro (gemini-3-pro) y Nano Banana 2 (gemini-3.1-flash)",
      "Soporte de resoluciones estándar (1K, 2K, 4K) y ratios extremos (4:1, 1:4, 8:1, 1:8, 21:9)",
      "Switch de Google Search Grounding para información en tiempo real y descarga en PNG",
    ],
    status: "Activa",
  },
  {
    path: "/hero",
    name: "Refactor de Hero",
    category: "Optimización de UI / Código",
    badge: "Estructural",
    badgeVariant: "outline",
    icon: View,
    description: "Herramienta especializada en analizar y refactorizar componentes Hero del sitio web, generando variantes estéticas y consistentes con los tokens de diseño.",
    keyFeatures: [
      "Inspección automática de archivos con componentes Hero en el árbol del proyecto",
      "Generación de prompts para actualizar titulares, fondos e iluminación",
      "Estandarización de layouts y consistencia de proporciones visuales",
    ],
    status: "Activa",
  },
  {
    path: "/ui-optimizer",
    name: "Optimizador UI (Páginas)",
    category: "Optimización de UI / Código",
    badge: "UI / UX",
    badgeVariant: "outline",
    icon: Palette,
    description: "Analizador de jerarquía visual y layout de páginas completas para sugerir refactorizaciones modernas, responsive y alineadas al sistema de diseño.",
    keyFeatures: [
      "Exploración del árbol de páginas del proyecto desde context/project_structure.json",
      "Sugerencias automáticas de tokens de color, espaciado y tipografía",
      "Asistencia de IA para crear interfaces de alto impacto y accesibilidad",
    ],
    status: "Activa",
  },
  {
    path: "/ui-optimizer/componentes",
    name: "Optimizador de Componentes",
    category: "Optimización de UI / Código",
    badge: "Código Limpio",
    badgeVariant: "outline",
    icon: FileCode,
    description: "Herramienta granular para seleccionar componentes React/Next.js específicos y generar refactorizaciones de código y directivas de estilo precisas.",
    keyFeatures: [
      "Selección y desglose a nivel de nodo de componente",
      "Recomendaciones de refactor modular con Tailwind CSS y shadcn/ui",
      "Prompts de ingeniería inversa y mejora de componentes individuales",
    ],
    status: "Activa",
  },
  {
    path: "/admin",
    name: "Ruta /admin & /admin/crea-imagenes",
    category: "Redirecciones & Utilidades",
    badge: "Alias",
    badgeVariant: "outline",
    icon: ShieldCheck,
    description: "Rutas de compatibilidad histórica y administración interna que redirigen automáticamente al Dashboard principal asegurando navegación continua.",
    keyFeatures: [
      "Redirección limpia a través de Next.js Server Navigation",
      "Compatibilidad con accesos directos heredados y bookmarks",
    ],
    status: "Redirección",
  },
];

export function AppDirectorySection() {
  const activeRoutes = APP_ROUTES.filter((r) => r.status === "Activa");
  const redirectRoutes = APP_ROUTES.filter((r) => r.status === "Redirección");

  return (
    <section className="mt-16 pt-12 border-t border-border/80">
      {/* Header de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0950F6] dark:text-[#FFF12E] font-subheading mb-1">
            <Compass className="w-4 h-4" />
            Mapa de Arquitectura Web
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-foreground font-display uppercase">
            Rutas y Páginas de la Aplicación
          </h2>
          <p className="text-sm text-muted-foreground mt-1 font-sans max-w-2xl">
            Explora la estructura completa de rutas de <strong className="text-foreground">src/app</strong>, el propósito operativo de cada vista y sus capacidades técnicas.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="outline" className="text-xs px-3 py-1 font-mono border-primary/30 text-primary dark:text-[#FFF12E] bg-primary/5">
            {activeRoutes.length} Módulos Activos
          </Badge>
          <Badge variant="secondary" className="text-xs px-3 py-1 font-mono">
            {APP_ROUTES.length} Rutas Totales
          </Badge>
        </div>
      </div>

      {/* Grid de Rutas Activas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeRoutes.map((route) => {
          const Icon = route.icon;
          return (
            <Card
              key={route.path}
              className="flex flex-col bg-card/60 backdrop-blur-sm border-border/70 hover:border-[#FFF12E]/60 transition-all duration-300 shadow-sm hover:shadow-xl rounded-3xl overflow-hidden group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#052C87] to-[#0950F6] text-[#FFF12E] shadow-md group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-subheading">
                        {route.category}
                      </span>
                      <CardTitle className="text-lg font-normal uppercase font-display text-foreground group-hover:text-primary transition-colors">
                        {route.name}
                      </CardTitle>
                    </div>
                  </div>

                  {route.badge && (
                    <Badge
                      variant={route.badgeVariant || "secondary"}
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 font-subheading"
                    >
                      {route.badge}
                    </Badge>
                  )}
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 text-foreground text-xs font-mono w-fit border border-border/40">
                  <span className="text-primary dark:text-[#FFF12E] font-bold">GET</span>
                  <span className="text-muted-foreground">{route.path}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow pb-4 space-y-4">
                <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {route.description}
                </CardDescription>

                <div className="pt-2 border-t border-border/40">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-foreground block mb-2 font-subheading">
                    Capacidades Principales:
                  </span>
                  <ul className="space-y-1.5">
                    {route.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary dark:text-[#FFF12E] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-border/50 mt-auto py-3 bg-muted/20 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">
                  src/app{route.path === "/" ? "/page.tsx" : `${route.path}/page.tsx`}
                </span>
                <Button asChild variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase tracking-wider text-primary dark:text-[#FFF12E] group-hover:translate-x-1 transition-transform">
                  <Link href={route.path} className="flex items-center gap-1.5">
                    <span>Ir a la página</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Rutas de Redirección / Soporte */}
      {redirectRoutes.length > 0 && (
        <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary dark:text-[#FFF12E] shrink-0" />
            <span>
              <strong>Rutas de Redirección Activas:</strong> <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">/admin</code> y <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">/admin/crea-imagenes</code> redirigen automáticamente al Dashboard con redirección HTTP de servidor.
            </span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono shrink-0">
            HTTP 307 /redirect
          </Badge>
        </div>
      )}
    </section>
  );
}
