import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { StandaloneImageGenerator } from "@/components/admin/crea-imagenes/StandaloneImageGenerator";
import { ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Generar Imagen Real con Nano Banana | Envíos DosRuedas",
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
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#FFF12E] transition-colors mb-4 font-subheading">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#0950F6] text-white rounded-2xl shadow-[0_0_20px_rgba(9,80,246,0.35)]">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                Generar Imagen Real
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Convertí cualquier prompt en una imagen fotográfica o gráfica con Nano Banana (Gemini 2.5 Flash Image).
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
