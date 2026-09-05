import { promises as fs } from 'fs';
import path from 'path';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { UiOptimizerClientPage } from "@/components/admin/crea-imagenes/ui-optimizer/UiOptimizerClientPage";
import type { PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Palette, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Optimizador UI (Páginas) | Estudio IA",
  description: "Analiza páginas completas o componentes principales para sugerir mejoras de UI/UX.",
};

async function getProjectStructure(): Promise<PageStructure[]> {
  const filePath = path.join(process.cwd(), 'src', 'context', 'project_structure.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to read project structure:", error);
    return [];
  }
}

export default async function UiOptimizerPage() {
  const projectStructure = await getProjectStructure();

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
            <div className="p-3.5 bg-[#0950F6] text-[#FFF12E] rounded-2xl shadow-[0_0_20px_rgba(9,80,246,0.35)]">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                Optimizador UI de Páginas
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Analiza la estructura de tus páginas y genera prompts de optimización estética, responsive y accesibilidad.
              </p>
            </div>
          </div>
        </div>

        <UiOptimizerClientPage projectStructure={projectStructure} />
      </main>
      <Footer />
    </div>
  );
}
