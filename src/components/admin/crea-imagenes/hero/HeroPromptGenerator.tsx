// src/components/admin/crea-imagenes/hero/HeroPromptGenerator.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, FileCode, Wand2, Sparkles, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PageStructure } from "@/components/admin/crea-imagenes/ui-optimizer/FileSelector";

interface HeroPromptGeneratorProps {
  projectStructure: PageStructure[];
}

export function HeroPromptGenerator({ projectStructure }: HeroPromptGeneratorProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [targetPagePath, setTargetPagePath] = useState<string>('');
  const [referencePagePath, setReferencePagePath] = useState<string>('');
  
  const findHeroComponent = useCallback((pagePath: string): string | null => {
    const page = projectStructure.find(p => p.page_path === pagePath);
    const heroComponent = page?.components.find(c => c.component_path.toLowerCase().includes('hero'));
    return heroComponent?.component_path || null;
  }, [projectStructure]);

  const targetHeroPath = useMemo(() => findHeroComponent(targetPagePath), [targetPagePath, findHeroComponent]);
  const referenceHeroPath = useMemo(() => findHeroComponent(referencePagePath), [referencePagePath, findHeroComponent]);

  const promptTemplate = useMemo(() => {
    const finalTargetHeroPath = targetHeroPath || "[Ruta del Hero a modificar]";
    const finalReferenceHeroPath = referenceHeroPath || "[Ruta del Hero de referencia]";

    return `Hola, necesito que refactorices el componente Hero que se encuentra en \`${finalTargetHeroPath}\`.

El objetivo es que este componente se ajuste y utilice las mismas propiedades, estructura y estilo visual que el componente HeroSection de referencia que se encuentra en \`${finalReferenceHeroPath}\`.

Específicamente, asegúrate de:
1. Reemplazar el código del Hero actual con el componente reutilizable <HeroSection />.
2. Ajustar las propiedades (props) como title, description, minHeight, ctaButtons, etc., para que el contenido sea relevante para la página, pero la apariencia y el layout coincidan con el componente de referencia.
3. Presta especial atención a la propiedad minHeight para que ocupe una altura similar y responsiva (ej: min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh]).
4. Conserva el texto y los enlaces originales, pero adáptalos a la nueva estructura de props del componente HeroSection.

En resumen: toma el contenido de \`${finalTargetHeroPath}\` y aplícalo a un nuevo <HeroSection /> que se vea y se comporte como el de \`${finalReferenceHeroPath}\`.`;
  }, [targetHeroPath, referenceHeroPath]);

  const handleCopy = () => {
    if (!targetPagePath || !referencePagePath) {
        toast({
            title: "Selección incompleta",
            description: "Por favor, selecciona la página a modificar y la de referencia.",
            variant: "destructive",
        });
        return;
    }
    navigator.clipboard.writeText(promptTemplate).then(() => {
      setCopied(true);
      toast({ title: "Prompt Copiado", description: "El prompt se ha copiado al portapapeles." });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Could not copy text: ", err);
      toast({ title: "Error", description: "No se pudo copiar el prompt.", variant: "destructive" });
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-lg border-border/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/10">
          <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-foreground">
            <FileCode className="w-5 h-5 text-primary" />
            Paso 1: Seleccionar Páginas
          </CardTitle>
          <CardDescription>
            Elige la página que contiene el Hero que quieres cambiar y la página que servirá como modelo visual de referencia.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Página a Modificar (Objetivo)</label>
            <Select onValueChange={setTargetPagePath} value={targetPagePath}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Elige la página objetivo..." />
              </SelectTrigger>
              <SelectContent>
                {projectStructure.map(page => (
                  <SelectItem key={page.page_path} value={page.page_path}>
                    {page.page_path.replace('src/app/', '').replace('/page.tsx', '')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Página de Referencia (Modelo)</label>
            <Select onValueChange={setReferencePagePath} value={referencePagePath}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Elige la página de referencia..." />
              </SelectTrigger>
              <SelectContent>
                {projectStructure.map(page => (
                  <SelectItem key={page.page_path} value={page.page_path}>
                    {page.page_path.replace('src/app/', '').replace('/page.tsx', '')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="py-3 px-6 bg-muted/20 border-t border-border/40">
          <p className="text-xs text-muted-foreground">
            Solo se listan páginas que contienen una sección 'Hero' identificada en el proyecto.
          </p>
        </CardFooter>
      </Card>

      <Card className="shadow-xl border-border/80 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/10">
          <CardTitle className="flex items-center gap-2.5 text-lg font-bold text-foreground">
            <Wand2 className="w-5 h-5 text-primary" />
            Paso 2: Prompt Generado para IA
          </CardTitle>
          <CardDescription>
            Copia este prompt detallado y pégalo en tu asistente o IDE para ejecutar la refactorización.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="w-full rounded-xl border border-primary/20 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">Prompt de Refactor</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                onClick={handleCopy}
                type="button"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Prompt</span>
                  </>
                )}
              </Button>
            </div>
            <div className="p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto select-all">
              {promptTemplate}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
