import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ServiceImagePromptGenerator } from "@/components/admin/crea-imagenes/ServiceImagePromptGenerator";
import { Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Imágenes para Servicios | Estudio IA",
  description: "Herramienta de IA para crear imágenes impactantes y contextualizadas para cada servicio.",
};

export default function CreaImagenesServiciosPage() {
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
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Generador de Imágenes de Servicios
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Genera imágenes contextualizadas inyectando la información de cada servicio automáticamente.
              </p>
            </div>
          </div>
        </div>

        <ServiceImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
