import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, LayoutTemplate } from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Footer } from '@/components/layout/footer';
import { WebPromptGenerator } from '@/components/admin/crea-imagenes/web-prompts/WebPromptGenerator';
import { getAllWebPagesDocs } from '@/lib/docs-contenido';

export const metadata: Metadata = {
  title: 'Generador de Prompts Web (docs/contenido) | Estudio IA',
  description:
    'Conceptualiza y genera prompts visuales optimizados con Genkit para secciones y componentes web a partir de la documentación oficial.',
};

export default async function CrearPromptsWebsPage() {
  const pagesDocs = await getAllWebPagesDocs();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10 max-w-6xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-[#FFF12E] transition-colors mb-4 font-subheading"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-[#052C87] text-[#FFF12E] rounded-2xl shadow-[0_0_20px_rgba(5,44,135,0.35)]">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                  Generador de Prompts Web
                </h1>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FFF12E] text-[#052C87] uppercase tracking-wider">
                  docs/contenido
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-sans max-w-3xl">
                Seleccioná páginas y componentes de la documentación (Hero, Bento Grid, Cards, Formularios) y generá prompts visuales optimizados con Genkit en lenguaje natural para mockups 3D e imágenes de producción.
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
