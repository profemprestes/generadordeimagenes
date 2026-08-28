import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { OptimalImagePromptGenerator } from "@/components/admin/crea-imagenes/OptimalImagePromptGenerator";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Imágenes Óptimas | Estudio IA",
  description: "Herramienta avanzada con múltiples sugerencias de IA para crear imágenes contextualizadas.",
};

export default function CreaImagenesOptimasPage() {
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
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg shadow-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Generador de Imágenes Óptimas
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Herramienta avanzada que ofrece sugerencias inteligentes para conceptualizar la composición perfecta.
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
