// src/components/admin/crea-imagenes/ui-optimizer/ComponentOptimizerClientPage.tsx
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileCode, Copy, Check, FileSearch, Code, Wand2, Loader2, ListChecks } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getComponentFilesContentAction } from '@/app/ui-optimizer/componentes/actions';
import type { PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";



interface SelectedFile {
  path: string;
  content: string;
}

interface ComponentOptimizerClientPageProps {
  projectStructure: PageStructure[];
}

export function ComponentOptimizerClientPage({ projectStructure }: ComponentOptimizerClientPageProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [selectedPagePath, setSelectedPagePath] = useState('');
  const [selectedComponents, setSelectedComponents] = useState<Record<string, boolean>>({});
  const [fetchedFiles, setFetchedFiles] = useState<SelectedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pageData = useMemo(() => projectStructure.find(p => p.page_path === selectedPagePath), [selectedPagePath, projectStructure]);

  const handlePageChange = (pagePath: string) => {
    setSelectedPagePath(pagePath);
    setSelectedComponents({});
    setFetchedFiles([]);
  };

  const handleComponentSelectionChange = (componentPath: string, checked: boolean | 'indeterminate') => {
    setSelectedComponents(prev => ({
      ...prev,
      [componentPath]: checked === true,
    }));
  };

  useEffect(() => {
    const fetchContent = async () => {
      const pathsToFetch = Object.entries(selectedComponents)
        .filter(([, isSelected]) => isSelected)
        .map(([path]) => path);

      if (pathsToFetch.length === 0) {
        setFetchedFiles([]);
        return;
      }

      setIsLoading(true);
      const result = await getComponentFilesContentAction(pathsToFetch);
      if (result.success && result.files) {
        setFetchedFiles(result.files);
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
      setIsLoading(false);
    };

    const timer = setTimeout(fetchContent, 500); // Debounce
    return () => clearTimeout(timer);
  }, [selectedComponents, toast]);

  const promptTemplate = useMemo(() => {
    const selectedPaths = Object.keys(selectedComponents).filter(key => selectedComponents[key]);
    if (selectedPaths.length === 0) {
      return `Por favor, selecciona al menos un componente para generar el prompt.`;
    }

    const componentList = selectedPaths.map(p => `\`${p}\``).join(', ');
    
    let prompt = `Eres un experto en diseño de UI/UX y desarrollador frontend especializado en el stack Next.js, React, Tailwind CSS y ShadCN UI.\n\n`;
    prompt += `Quiero que refactorices y optimices el/los siguiente(s) componente(s): ${componentList}.\n\n`;
    prompt += `Basándote en el código fuente proporcionado, realiza una revisión exhaustiva y proporciona sugerencias accionables para mejorar el diseño, asegurando que sea profesional, estético y completamente responsivo (mobile-first).\n\n`;
    prompt += `**Debes enfocarte en las siguientes áreas clave:**\n\n`;
    prompt += `1.  **Layout y Espaciado (Layout & Spacing):**\n    *   **Estructura:** Recomienda el uso de Flexbox o CSS Grid.\n    *   **Consistencia:** Sugiere clases de Tailwind CSS (\`p-4\`, \`space-y-4\`).\n\n`;
    prompt += `2.  **Componentes y ShadCN UI:**\n    *   **Reemplazo:** Identifica elementos HTML que puedan ser reemplazados por componentes de ShadCN UI (\`<Button>\`, \`<Card>\`, etc.).\n\n`;
    prompt += `3.  **Diseño Responsivo (Mobile-First):**\n    *   **Estrategia:** Proporciona ejemplos "mobile-first" con breakpoints de Tailwind (\`sm:\`, \`md:\`, \`lg:\`).\n\n`;
    prompt += `4.  **Estilo Visual y Profesionalismo:**\n    *   **Colores y Tipografía:** Usa exclusivamente colores y fuentes del tema (\`globals.css\`).\n    *   **Estética Moderna:** Recomienda añadir sombras, bordes redondeados, etc.\n\n`;
    prompt += `**Formato de Respuesta:**\nMuestra el fragmento de código original ("antes") y luego el código refactorizado ("después"). Explica brevemente el "porqué" de cada cambio.`;

    return prompt;
  }, [selectedComponents]);

  const combinedContent = useMemo(() => {
    if (isLoading) {
        return "Cargando código fuente...";
    }
    if (fetchedFiles.length === 0) {
      return "Selecciona uno o más componentes para ver su código fuente...";
    }
    return fetchedFiles.map(file =>
      `// --- INICIO: ${file.path} ---\n\n${file.content}\n\n// --- FIN: ${file.path} ---`
    ).join('\n\n\n');
  }, [fetchedFiles, isLoading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate).then(() => {
      setCopied(true);
      toast({ title: "Prompt Copiado", description: "El prompt se ha copiado al portapapeles." });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Card className="max-w-5xl mx-auto mb-8 bg-background shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3">
            <FileCode className="w-7 h-7 text-primary" />
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
              Optimizador de Componentes
            </CardTitle>
          </div>
          <CardDescription>
            Selecciona una página y luego los componentes específicos que deseas refactorizar.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 & 2: Selection */}
            <div className="space-y-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl"><FileSearch className="w-6 h-6"/>Paso 1: Seleccionar Página</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Select onValueChange={handlePageChange} value={selectedPagePath}>
                            <SelectTrigger><SelectValue placeholder="Elige una página para analizar..." /></SelectTrigger>
                            <SelectContent>
                                {projectStructure.map(page => (
                                    <SelectItem key={page.page_path} value={page.page_path}>{page.page_path.replace('src/app/', '')}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl"><ListChecks className="w-6 h-6"/>Paso 2: Seleccionar Componentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                         {pageData?.components.length ? pageData.components.map(component => (
                            <div key={component.component_path} className="flex items-center space-x-2 rounded-md border p-3">
                                <Checkbox 
                                    id={component.component_path} 
                                    onCheckedChange={(checked) => handleComponentSelectionChange(component.component_path, checked)}
                                    checked={selectedComponents[component.component_path] || false}
                                />
                                <Label htmlFor={component.component_path} className="text-sm font-medium leading-none cursor-pointer">
                                    {component.component_path.split('/').pop()}
                                </Label>
                            </div>
                         )) : <p className="text-sm text-muted-foreground text-center py-4">Selecciona una página para ver sus componentes.</p>}
                       </div>
                    </CardContent>
                </Card>
            </div>
            {/* Step 3 & 4: Prompt and Code */}
            <div className="space-y-8">
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl"><Wand2 className="w-6 h-6"/>Paso 3: Copiar Prompt para IA</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                         <Textarea readOnly value={promptTemplate} className="h-48 font-mono text-xs bg-muted/50"/>
                         <Button size="sm" variant="secondary" className="absolute top-8 right-8" onClick={handleCopy} disabled={Object.keys(selectedComponents).filter(k => selectedComponents[k]).length === 0}>
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl"><Code className="w-6 h-6"/>Paso 4: Código Fuente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea readOnly value={combinedContent} className="h-80 font-mono text-xs bg-muted/50" />
                        {isLoading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary"/></div>}
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}
