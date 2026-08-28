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
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg shadow-purple-500/20">
              <View className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-display">
                Refactor de Componentes Hero
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Genera prompts especializados para unificar y diseñar secciones Hero de alto impacto.
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
