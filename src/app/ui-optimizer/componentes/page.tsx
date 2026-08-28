import { promises as fs } from 'fs';
import path from 'path';
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { ComponentOptimizerClientPage } from "@/components/admin/crea-imagenes/ui-optimizer/ComponentOptimizerClientPage";
import type { PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Optimizador de Componentes | Estudio IA",
  description: "Selecciona componentes específicos de una página para una refactorización detallada con IA.",
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

export default async function ComponentOptimizerPage() {
  const projectStructure = await getProjectStructure();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8 pt-10 max-w-5xl">
        <ComponentOptimizerClientPage projectStructure={projectStructure} />
      </main>
      <Footer />
    </div>
  );
}
