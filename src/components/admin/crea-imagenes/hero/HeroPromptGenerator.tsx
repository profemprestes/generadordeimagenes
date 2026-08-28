// src/components/admin/crea-imagenes/hero/HeroPromptGenerator.tsx
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { View, Copy, Check, FileCode, Wand2 } from "lucide-react";
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
    <>
      <Card className="max-w-4xl mx-auto mb-8 bg-background shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3">
            <View className="w-7 h-7 text-primary" />
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
              Generador de Prompts para Refactorizar "Heros"
            </CardTitle>
          </div>
          <CardDescription>
            Selecciona las páginas para generar un prompt estandarizado y solicitar la refactorización a la IA.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary">
                <FileCode className="w-6 h-6" />
                Paso 1: Seleccionar Páginas
            </CardTitle>
            <CardDescription>
                Elige la página que contiene el Hero que quieres cambiar y la página que servirá como modelo visual.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Página a Modificar</label>
                <Select onValueChange={setTargetPagePath} value={targetPagePath}>
                    <SelectTrigger><SelectValue placeholder="Elige la página objetivo..." /></SelectTrigger>
                    <SelectContent>
                        {projectStructure.map(page => (
                            <SelectItem key={page.page_path} value={page.page_path}>{page.page_path.replace('src/app/', '').replace('/page.tsx', '')}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Página de Referencia (Modelo)</label>
                <Select onValueChange={setReferencePagePath} value={referencePagePath}>
                    <SelectTrigger><SelectValue placeholder="Elige la página de referencia..." /></SelectTrigger>
                    <SelectContent>
                        {projectStructure.map(page => (
                            <SelectItem key={page.page_path} value={page.page_path}>{page.page_path.replace('src/app/', '').replace('/page.tsx', '')}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">Solo se muestran las páginas que contienen un componente 'Hero' en su estructura.</p>
        </CardFooter>
      </Card>

      <Card className="max-w-4xl mx-auto shadow-lg mt-8">
        <CardHeader>
             <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary"><Wand2 className="w-6 h-6"/> Paso 2: Copiar Prompt Generado</CardTitle>
             <CardDescription>
                Este es el prompt que debes pegar en el chat para solicitar la modificación.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative">
                <Textarea
                    readOnly
                    value={promptTemplate}
                    className="h-96 font-mono text-xs bg-muted/50"
                    aria-label="Prompt generado"
                />
                <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-3 right-3"
                    onClick={handleCopy}
                    aria-label="Copiar prompt"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span className="ml-2 hidden sm:inline">Copiar</span>
                </Button>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
