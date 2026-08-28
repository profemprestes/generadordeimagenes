import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { OptimalImagePromptGenerator } from "@/components/admin/crea-imagenes/OptimalImagePromptGenerator";
import { Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Imágenes Óptimas | Estudio IA",
  description: "Herramienta avanzada con múltiples sugerencias de IA para crear imágenes contextualizadas.",
};

export default function CreaImagenesOptimasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-10 max-w-5xl">
        <Card className="max-w-4xl mx-auto mb-8 bg-card shadow-lg border-border/60">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <Sparkles className="w-7 h-7" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Generador de Imágenes Óptimas
              </CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Una herramienta de IA que te ofrece múltiples ideas inteligentes para conceptualizar la imagen perfecta para cada servicio.
            </CardDescription>
          </CardHeader>
        </Card>
        <OptimalImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
