import {
  Wand2,
  ImageIcon,
  Sparkles,
  Truck,
  Palette,
  View,
  FileCode,
  LayoutDashboard,
  Zap,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Box,
  type LucideIcon,
} from "lucide-react";
import type React from "react";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon | React.ElementType;
  description?: string;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon | React.ElementType;
  items: NavItem[];
  basePath?: string;
}

// 5 Canonical Services supported by Envíos DosRuedas (2026)
export const navGroups: NavGroup[] = [
  {
    label: "Servicios",
    icon: Truck,
    basePath: "/servicios",
    items: [
      { href: "/servicios", label: "Envíos Express", icon: Zap },
      { href: "/servicios", label: "Envíos LowCost", icon: DollarSign },
      { href: "/servicios", label: "Envíos Flex", icon: ShoppingCart },
      { href: "/servicios", label: "Plan Emprendedores", icon: TrendingUp },
      { href: "/servicios", label: "Fulfillment 3PL", icon: Box },
    ],
  },
];

export interface ToolItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  badge?: string;
}

export const toolsNavItems: ToolItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Panel principal de herramientas de creación con IA.",
  },
  {
    href: "/generales",
    label: "Prompts Generales",
    icon: ImageIcon,
    description: "Generador de prompts para imágenes de marca, banners y contenido general.",
  },
  {
    href: "/servicios",
    label: "Imágenes de Servicios",
    icon: Truck,
    description: "Generador inteligente de imágenes específicas para cada servicio.",
  },
  {
    href: "/optimas",
    label: "Imágenes Óptimas",
    icon: Sparkles,
    description: "Generador avanzado con múltiples sugerencias de IA.",
    badge: "Recomendado",
  },
  {
    href: "/generar-imagen",
    label: "Generar Imagen",
    icon: ImageIcon,
    description: "Renderizá cualquier prompt a imagen real con Nano Banana y descargala en PNG.",
    badge: "Nano Banana",
  },
  {
    href: "/hero",
    label: "Refactor Hero",
    icon: View,
    description: "Generador de prompts para estandarizar componentes Hero.",
  },
  {
    href: "/ui-optimizer",
    label: "Optimizador UI",
    icon: Palette,
    description: "Analiza páginas completas para sugerir mejoras de UI/UX.",
  },
  {
    href: "/ui-optimizer/componentes",
    label: "Optimizador de Componentes",
    icon: FileCode,
    description: "Refactorización detallada de componentes específicos.",
  },
];
