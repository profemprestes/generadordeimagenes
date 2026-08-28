import { promises as fs } from 'fs';
import path from 'path';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { HeroPromptGenerator } from "@/components/admin/crea-imagenes/hero/HeroPromptGenerator";
import type { PageStructure, ComponentNode } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Refactor de Hero | Estudio IA",
  description: "Herramienta de IA para generar prompts y estandarizar los componentes Hero del sitio.",
};

// Función recursiva para buscar un componente Hero
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
    // Filtramos para obtener solo páginas que tengan al menos un componente Hero-like
    return structure.filter(page => hasHeroComponent(page.components));
  } catch (error) {
    console.error("Failed to read or parse project structure:", error);
    return [];
  }
}

export default async function CreaImagenesHeroPage() {
  const projectStructure = await getProjectStructure();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-10 max-w-5xl">
        <HeroPromptGenerator projectStructure={projectStructure} />
      </main>
      <Footer />
    </div>
  );
}
