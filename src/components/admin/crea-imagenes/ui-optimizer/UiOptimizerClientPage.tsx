// src/components/admin/crea-imagenes/ui-optimizer/UiOptimizerClientPage.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, FileSearch, Text, Code, Wand2, Sparkles } from "lucide-react";
import { FileSelector, type SelectedPaths, type PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";

interface SelectedFile {
  path: string;
  content: string;
}

interface UiOptimizerClientPageProps {
  projectStructure: PageStructure[];
}

export function UiOptimizerClientPage({ projectStructure }: UiOptimizerClientPageProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<SelectedPaths | null>(null);

  const handleFilesSelect = useCallback((files: SelectedFile[], paths: SelectedPaths) => {
    setSelectedFiles(files);
    setSelectedPaths(paths);
  }, []);

  const promptTemplate = useMemo(() => {
    let prompt = `Eres un experto en diseño de UI/UX y desarrollador frontend especializado en el stack Next.js, React, Tailwind CSS y ShadCN UI.\n\n`;

    if (!selectedPaths || !selectedPaths.pagePath) {
        prompt += `Analiza el código del siguiente archivo que se encuentra en el proyecto actual: [Selecciona un archivo].\n\n`;
    } else {
        if (selectedPaths.components.length === 0) {
            prompt += `Analiza el código de la página principal: \`${selectedPaths.pagePath}\` y sus componentes importados.\n\n`;
        } else {
            prompt += `El objetivo es refactorizar el componente principal \`${selectedPaths.components[0].path}\`.\n`;
            if (selectedPaths.components[0].subComponents.length > 0) {
                 const subComponentList = selectedPaths.components[0].subComponents.map(p => `\`${p}\``).join(', ');
                 prompt += `Este componente utiliza los siguientes sub-componentes, cuyo código también se proporciona para darte contexto: ${subComponentList}.\n\n`;
            } else {
                 prompt += `Este componente no tiene dependencias directas seleccionadas, pero se encuentra dentro de la página \`${selectedPaths.pagePath}\`.\n\n`;
            }
        }
    }

    prompt += `Basándote en el código proporcionado, realiza una revisión exhaustiva y proporciona sugerencias accionables para refactorizarlo y optimizarlo, asegurando un diseño profesional, estético y completamente responsivo (mobile-first).\n\n`;
    prompt += `**Debes enfocarte en las siguientes áreas clave:**\n\n`;
    prompt += `1. **Layout y Espaciado:** Recomienda Flexbox o Grid, consistencia en espaciado con Tailwind CSS y jerarquía visual limpia.\n`;
    prompt += `2. **Componentes ShadCN UI:** Reemplaza elementos nativos por primitivas accesibles de ShadCN.\n`;
    prompt += `3. **Diseño Responsivo:** Mobile-first con breakpoints claros (sm, md, lg) y prevención de desbordamientos.\n`;
    prompt += `4. **Estilo Visual Moderno:** Coherencia de colores con tokens del tema, bordes suaves y microinteracciones.\n\n`;
    prompt += `**Formato de Respuesta:** Proporciona un formato antes/después con explicaciones del porqué de cada decisión de diseño.`;

    return prompt;
  }, [selectedPaths]);

  const combinedContent = useMemo(() => {
    if (selectedFiles.length === 0) {
      return "Selecciona una página y componentes para ver su código fuente...";
    }
    return selectedFiles.map(file =>
      `// --- INICIO: ${file.path} ---\n\n${file.content}\n\n// --- FIN: ${file.path} ---`
    ).join('\n\n\n');
  }, [selectedFiles]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate)
      .then(() => {
        setCopied(true);
        toast({ title: "Prompt Copiado", description: "El prompt se ha copiado al portapapeles." });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast({ title: "Error", description: "No se pudo copiar el prompt.", variant: "destructive" });
      });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Step 1: File Selector */}
      <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/10">
          <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-foreground">
            <FileSearch className="w-5 h-5 text-primary" />
            Paso 1: Seleccionar Archivos a Analizar
          </CardTitle>
          <CardDescription>
            Elige la página y los componentes específicos de la aplicación que deseas optimizar.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <FileSelector projectStructure={projectStructure} onFilesSelect={handleFilesSelect} />
        </CardContent>
      </Card>

      {/* Grid for Steps 2 and 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Step 2: AI Prompt */}
        <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-foreground">
              <Wand2 className="w-5 h-5 text-primary" />
              Paso 2: Prompt Contextualizado
            </CardTitle>
            <CardDescription>
              Prompt generado listo para enviar a la IA.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full rounded-xl border border-primary/20 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-[11px] font-semibold text-slate-300 uppercase">Prompt UI/UX</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 gap-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                  onClick={handleCopy}
                  type="button"
                  disabled={selectedFiles.length === 0}
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
              <div className="p-3.5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed h-80 overflow-y-auto select-all">
                {promptTemplate}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Source Code Viewer */}
        <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-foreground">
              <Code className="w-5 h-5 text-primary" />
              Paso 3: Código Fuente Seleccionado
            </CardTitle>
            <CardDescription>
              Código fuente de los archivos seleccionados.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Textarea
              readOnly
              value={combinedContent}
              className="h-[23rem] font-mono text-xs bg-slate-950 text-slate-300 border-slate-800 rounded-xl leading-relaxed resize-none p-3.5"
              aria-label="Código fuente del archivo seleccionado"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
