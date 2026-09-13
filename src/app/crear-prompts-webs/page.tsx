import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Footer } from '@/components/layout/footer';
import { WebPromptGenerator } from '@/components/admin/crea-imagenes/web-prompts/WebPromptGenerator';
import { getAllWebPagesDocs } from '@/lib/docs-contenido';

export const metadata: Metadata = {
  title: 'Generador de Prompts Web (docs/contenido) | Estudio IA Envíos DosRuedas',
  description:
    'Conceptualiza y genera prompts visuales optimizados con Genkit bajo el Sistema de Diseño oficial (Tríada #0C59F2, #FFF12E, #FFFFFF) a partir de docs/contenido.',
};

export default async function CrearPromptsWebsPage() {
  const pagesDocs = await getAllWebPagesDocs();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-7xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#0C59F2] transition-colors mb-4 font-subheading"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#0C59F2] text-[#FFF12E] rounded-2xl shadow-[0_0_25px_rgba(12,89,242,0.25)]">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase leading-tight">
                  Generador de Prompts Web
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF12E] text-[#0C59F2] uppercase tracking-wider font-subheading shadow-[0_0_15px_rgba(255,241,46,0.3)]">
                  docs/contenido
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-sans max-w-3xl leading-relaxed">
                Seleccioná páginas y componentes de la documentación técnica para generar prompts visuales de producción ajustados al Sistema de Diseño oficial de Envíos DosRuedas (Tríada estricta <span className="font-mono font-semibold text-foreground">#0C59F2</span>, <span className="font-mono font-semibold text-foreground">#FFF12E</span> y <span className="font-mono font-semibold text-foreground">#FFFFFF</span>).
              </p>
            </div>
          </div>
        </div>

        <WebPromptGenerator initialPagesDocs={pagesDocs} />
      </main>
      <Footer />
    </div>
  );
}
