import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estudio de Generación de Imágenes IA",
  description: "Suite de creación visual y optimización de imágenes con Inteligencia Artificial.",
  keywords: "generador de imagenes, ia, prompts, visual design, studio, gemini, imagen",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
