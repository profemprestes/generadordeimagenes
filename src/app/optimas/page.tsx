import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { OptimalImagePromptGenerator } from "@/components/admin/crea-imagenes/OptimalImagePromptGenerator";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Imágenes Óptimas | Envíos DosRuedas",
  description: "Herramienta avanzada con múltiples sugerencias de IA para crear imágenes contextualizadas.",
};

export default function CreaImagenesOptimasPage() {
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
            <div className="p-3.5 bg-[#FFF12E] text-[#052C87] rounded-2xl shadow-[0_0_20px_rgba(255,241,46,0.35)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                Generador de Imágenes Óptimas
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Herramienta asistida que ofrece sugerencias inteligentes y composiciones de alta conversión para Envíos DosRuedas.
              </p>
            </div>
          </div>
        </div>

        <OptimalImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
