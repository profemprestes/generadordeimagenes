import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ImagePromptGenerator } from "@/components/admin/crea-imagenes/ImagePromptGenerator";
import { Wand2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Prompts Generales | Estudio IA",
  description: "Herramienta de IA para crear prompts para generación de imágenes consistentes con la marca.",
};

export default function CreaImagenesGeneralesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/20">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Generador de Prompts Generales
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Crea prompts detallados y de calidad hiperrealista para generar imágenes que mantengan coherencia visual.
              </p>
            </div>
          </div>
        </div>

        <ImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
