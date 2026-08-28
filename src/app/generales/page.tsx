import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ImagePromptGenerator } from "@/components/admin/crea-imagenes/ImagePromptGenerator";
import { Wand2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generador de Prompts de Imagen | Estudio IA",
  description: "Herramienta de IA para crear prompts para generación de imágenes consistentes con la marca.",
};

export default function CreaImagenesGeneralesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-10 max-w-5xl">
        <Card className="max-w-4xl mx-auto mb-8 bg-card shadow-lg border-border/60">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <Wand2 className="w-7 h-7" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Generador de Prompts Generales
              </CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Crea prompts detallados y de calidad hiperrealista para generar imágenes que mantengan la coherencia visual.
            </CardDescription>
          </CardHeader>
        </Card>
        <ImagePromptGenerator />
      </main>
      <Footer />
    </div>
  );
}
