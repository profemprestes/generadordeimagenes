// src/components/admin/crea-imagenes/ui-optimizer/UiOptimizerClientPage.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Palette, Copy, Check, FileSearch, Text, Code, Wand2 } from "lucide-react";
import { FileSelector, type SelectedPaths, type PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
            prompt += `El objetivo es refactorizar el componente principal \`${selectedPaths.components[0].path}\`.\n`
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
    prompt += `1.  **Layout y Espaciado (Layout & Spacing):**\n    *   **Estructura:** Recomienda el uso de Flexbox (\`flex\`) o CSS Grid (\`grid\`).\n    *   **Consistencia:** Sugiere clases de Tailwind CSS (\`p-4\`, \`m-8\`, \`space-y-4\`).\n    *   **Jerarquía:** Propón mejoras para la jerarquía visual en diferentes pantallas.\n\n`;
    prompt += `2.  **Componentes y ShadCN UI:**\n    *   **Reemplazo:** Identifica elementos HTML nativos que puedan ser reemplazados por componentes de ShadCN UI (\`<Button>\`, \`<Card>\`, etc.).\n    *   **Estructura:** Aconseja sobre la correcta utilización de los componentes de ShadCN (ej. \`<CardHeader>\` dentro de \`<Card>\`).\n\n`;
    prompt += `3.  **Diseño Responsivo (Mobile-First):**\n    *   **Estrategia:** Proporciona ejemplos "mobile-first" con breakpoints de Tailwind (\`sm:\`, \`md:\`, \`lg:\`).\n    *   **Prevención de Overflow:** Asegúrate de que no haya desbordamiento horizontal.\n    *   **Accesibilidad Táctil:** Verifica que los botones sean fáciles de presionar en móviles.\n\n`;
    prompt += `4.  **Estilo Visual y Profesionalismo:**\n    *   **Colores del Tema:** Utiliza exclusivamente colores de \`globals.css\` (ej. \`bg-primary\`). No uses colores hardcodeados.\n    *   **Estética Moderna:** Recomienda añadir sombras (\`shadow-md\`), bordes redondeados (\`rounded-lg\`), etc.\n    *   **Tipografía:** Asegura el uso de las fuentes del proyecto (\`font-sans\`, \`font-display\`).\n\n`;
    prompt += `**Formato de Respuesta:**\nQuiero que tus sugerencias sean presentadas en un formato claro de "antes" y "después". Muestra el fragmento de código original y, a continuación, el código refactorizado con tus mejoras aplicadas. Explica brevemente el "porqué" de cada cambio.`;

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
    // Modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(promptTemplate)
        .then(() => {
          setCopied(true);
          toast({ title: "Prompt Copiado", description: "El prompt se ha copiado al portapapeles." });
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error("Async: Could not copy text: ", err);
          fallbackCopyTextToClipboard(promptTemplate);
        });
    } else {
      // Fallback for older browsers or insecure contexts
      fallbackCopyTextToClipboard(promptTemplate);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        toast({ title: "Prompt Copiado", description: "El prompt se ha copiado al portapapeles." });
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast({ title: "Error", description: "No se pudo copiar el prompt.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      toast({ title: "Error", description: "No se pudo copiar el prompt.", variant: "destructive" });
    }
    document.body.removeChild(textArea);
  };


  return (
    <>
      <Card className="max-w-4xl mx-auto mb-8 bg-background shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3">
            <Palette className="w-7 h-7 text-primary" />
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
              Optimizador de UI con IA
            </CardTitle>
          </div>
          <CardDescription>
            Selecciona los archivos, copia el prompt contextualizado y pégalo en tu IA para obtener sugerencias de mejora.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step 1: File Selector */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary">
              <FileSearch className="w-6 h-6" />
              Paso 1: Seleccionar Archivos a Analizar
            </CardTitle>
            <CardDescription>
              Elige la página y los componentes específicos que deseas optimizar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileSelector projectStructure={projectStructure} onFilesSelect={handleFilesSelect} />
          </CardContent>
        </Card>

        {/* Grid for Steps 2 and 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
           {/* Step 2: AI Prompt */}
          <Card className="shadow-lg">
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary"><Text className="w-6 h-6"/> Paso 2: Copiar Prompt para IA</CardTitle>
                  <CardDescription>
                     Este prompt está contextualizado según tu selección.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Alert className="relative bg-muted/50 p-4">
                     <Wand2 className="h-5 w-5 absolute -top-2 -left-2 text-primary bg-background rounded-full p-0.5" />
                      <AlertDescription className="font-mono text-xs text-foreground h-72 overflow-y-auto">
                          <pre className="whitespace-pre-wrap">{promptTemplate}</pre>
                      </AlertDescription>
                      <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2"
                          onClick={handleCopy}
                          aria-label="Copiar prompt"
                          disabled={selectedFiles.length === 0}
                      >
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                  </Alert>
              </CardContent>
          </Card>

          {/* Step 3: Source Code Viewer */}
          <Card className="shadow-lg">
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary"><Code className="w-6 h-6"/> Paso 3: Revisar Código Fuente</CardTitle>
                  <CardDescription>
                      Este es el código que la IA analizará.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <Textarea
                      readOnly
                      value={combinedContent}
                      className="h-[19.5rem] font-mono text-xs bg-muted/50"
                      aria-label="Código fuente del archivo seleccionado"
                  />
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
