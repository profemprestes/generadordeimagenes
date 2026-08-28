// src/components/admin/crea-imagenes/ui-optimizer/ComponentOptimizerClientPage.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, FileSearch, Code, Wand2, Loader2, ListChecks, Sparkles } from "lucide-react";
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

    const timer = setTimeout(fetchContent, 500);
    return () => clearTimeout(timer);
  }, [selectedComponents, toast]);

  const promptTemplate = useMemo(() => {
    const selectedPaths = Object.keys(selectedComponents).filter(key => selectedComponents[key]);
    if (selectedPaths.length === 0) {
      return `Por favor, selecciona al menos un componente para generar el prompt.`;
    }

    const componentList = selectedPaths.map(p => `\`${p}\``).join(', ');
    
    let prompt = `Eres un experto en diseño de UI/UX y desarrollador frontend especializado en Next.js, React, Tailwind CSS y ShadCN UI.\n\n`;
    prompt += `Quiero que refactorices y optimices el/los siguiente(s) componente(s): ${componentList}.\n\n`;
    prompt += `Basándote en el código fuente proporcionado, realiza una revisión exhaustiva y proporciona sugerencias accionables para mejorar el diseño, asegurando que sea profesional, estético y completamente responsivo (mobile-first).\n\n`;
    prompt += `**Áreas clave:**\n`;
    prompt += `1. **Layout y Espaciado:** Recomienda Flexbox o Grid, consistencia en espaciado con Tailwind CSS y jerarquía visual limpia.\n`;
    prompt += `2. **Componentes ShadCN UI:** Reemplaza elementos nativos por componentes de ShadCN UI.\n`;
    prompt += `3. **Diseño Responsivo:** Mobile-first con breakpoints de Tailwind (sm, md, lg).\n`;
    prompt += `4. **Estilo Visual Moderno:** Coherencia de colores con tokens del tema, bordes suaves y microinteracciones.\n\n`;
    prompt += `**Formato de Respuesta:** Muestra el código original ("antes") y el código refactorizado ("después") explicando cada mejora.`;

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

  const selectedCount = Object.keys(selectedComponents).filter(k => selectedComponents[k]).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1 & 2: Selection */}
        <div className="space-y-6">
          <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/10">
              <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
                <FileSearch className="w-5 h-5 text-primary" />
                Paso 1: Seleccionar Página
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <Select onValueChange={handlePageChange} value={selectedPagePath}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Elige una página para analizar..." />
                </SelectTrigger>
                <SelectContent>
                  {projectStructure.map(page => (
                    <SelectItem key={page.page_path} value={page.page_path}>
                      {page.page_path.replace('src/app/', '')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/10">
              <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
                <ListChecks className="w-5 h-5 text-primary" />
                Paso 2: Seleccionar Componentes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {pageData?.components.length ? pageData.components.map(component => (
                  <div key={component.component_path} className="flex items-center space-x-3 rounded-xl border border-border/60 p-3 bg-muted/20 hover:bg-muted/40 transition-colors">
                    <Checkbox 
                      id={component.component_path} 
                      onCheckedChange={(checked) => handleComponentSelectionChange(component.component_path, checked)}
                      checked={selectedComponents[component.component_path] || false}
                    />
                    <Label htmlFor={component.component_path} className="text-xs font-mono font-medium leading-none cursor-pointer flex-grow text-foreground">
                      {component.component_path.split('/').pop()}
                    </Label>
                  </div>
                )) : (
                  <p className="text-xs text-muted-foreground text-center py-6">
                    Selecciona una página para listar sus componentes disponibles.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step 3 & 4: Prompt and Code */}
        <div className="space-y-6">
          <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/10">
              <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
                <Wand2 className="w-5 h-5 text-primary" />
                Paso 3: Prompt de Refactor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="w-full rounded-xl border border-primary/20 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[11px] font-semibold text-slate-300 uppercase">Prompt IA</span>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-7 gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                    onClick={handleCopy}
                    disabled={selectedCount === 0}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-3.5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed h-44 overflow-y-auto select-all">
                  {promptTemplate}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden relative">
            <CardHeader className="border-b border-border/40 bg-muted/10">
              <CardTitle className="flex items-center gap-2.5 text-base font-bold text-foreground">
                <Code className="w-5 h-5 text-primary" />
                Paso 4: Código Fuente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 relative">
              <Textarea
                readOnly
                value={combinedContent}
                className="h-64 font-mono text-xs bg-slate-950 text-slate-300 border-slate-800 rounded-xl leading-relaxed resize-none p-3.5"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center rounded-2xl">
                  <Loader2 className="w-6 h-6 animate-spin text-primary"/>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
