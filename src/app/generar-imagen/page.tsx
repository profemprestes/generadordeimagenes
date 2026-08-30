import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { StandaloneImageGenerator } from "@/components/admin/crea-imagenes/StandaloneImageGenerator";
import { ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generar Imagen con Nano Banana | Estudio IA",
  description: "Renderizá cualquier prompt a imagen real con Nano Banana y descargala en PNG.",
};

interface GenerarImagenPageProps {
  searchParams: Promise<{ prompt?: string | string[] }>;
}

export default async function GenerarImagenPage({ searchParams }: GenerarImagenPageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.prompt) ? (params.prompt[0] ?? '') : (params.prompt ?? '');
  const initialPrompt = raw.trim().slice(0, 4000);

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
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Generar Imagen
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Convertí un prompt en una imagen real con Nano Banana (Gemini 2.5 Flash Image).
              </p>
            </div>
          </div>
        </div>

        <StandaloneImageGenerator initialPrompt={initialPrompt} />
      </main>
      <Footer />
    </div>
  );
}
