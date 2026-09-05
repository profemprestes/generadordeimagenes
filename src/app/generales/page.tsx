import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ImagePromptGenerator } from "@/components/admin/crea-imagenes/ImagePromptGenerator";
import { Wand2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Prompts Generales | Envíos DosRuedas",
  description: "Herramienta de IA para crear prompts para generación de imágenes consistentes con la marca.",
};

export default function CreaImagenesGeneralesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#FFF12E] transition-colors mb-4 font-subheading">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#0950F6] text-[#FFF12E] rounded-2xl shadow-[0_0_20px_rgba(9,80,246,0.35)]">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                Generador de Prompts Generales
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Crea prompts detallados y de calidad hiperrealista para generar imágenes que mantengan la coherencia visual de Envíos DosRuedas.
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
