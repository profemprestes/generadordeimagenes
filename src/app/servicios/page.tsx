import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ServiceImagePromptGenerator } from "@/components/admin/crea-imagenes/ServiceImagePromptGenerator";
import { Truck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Imágenes para Servicios | Estudio IA",
  description: "Herramienta de IA para crear imágenes impactantes y contextualizadas para cada servicio.",
};

export default function CreaImagenesServiciosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-10 max-w-5xl">
        <Card className="max-w-4xl mx-auto mb-8 bg-card shadow-lg border-border/60">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <Truck className="w-7 h-7" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Generador de Imágenes para Servicios
              </CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Crea imágenes impactantes y 100% contextualizadas para promocionar cada servicio. La IA analiza el contexto y sugiere los detalles por ti.
            </CardDescription>
          </CardHeader>
        </Card>
        <ServiceImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
