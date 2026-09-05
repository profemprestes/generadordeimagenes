import { promises as fs } from 'fs';
import path from 'path';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { HeroPromptGenerator } from "@/components/admin/crea-imagenes/hero/HeroPromptGenerator";
import type { PageStructure, ComponentNode } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";
import type { Metadata } from 'next';
import Link from 'next/link';
import { View, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "Refactor de Hero | Estudio IA",
  description: "Herramienta de IA para generar prompts y estandarizar los componentes Hero del sitio.",
};

const hasHeroComponent = (components: ComponentNode[]): boolean => {
  for (const component of components) {
    if (component.component_path.toLowerCase().includes('hero')) {
      return true;
    }
    if (component.components && hasHeroComponent(component.components)) {
      return true;
    }
  }
  return false;
};

async function getProjectStructure(): Promise<PageStructure[]> {
  const filePath = path.join(process.cwd(), 'src', 'context', 'project_structure.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const structure: PageStructure[] = JSON.parse(fileContent);
    return structure.filter(page => hasHeroComponent(page.components));
  } catch (error) {
    console.error("Failed to read or parse project structure:", error);
    return [];
  }
}

export default async function CreaImagenesHeroPage() {
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
            <div className="p-3.5 bg-[#052C87] text-[#FFF12E] rounded-2xl shadow-[0_0_20px_rgba(5,44,135,0.35)]">
              <View className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground font-display uppercase">
                Refactor de Componentes Hero
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Genera prompts especializados para estandarizar y diseñar secciones Hero de alto impacto para Envíos DosRuedas.
              </p>
            </div>
          </div>
        </div>

        <HeroPromptGenerator projectStructure={projectStructure} />
      </main>
      <Footer />
    </div>
  );
}
