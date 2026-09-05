'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ImageRenderer } from './ImageRenderer';
import {
  DEFAULT_ASPECT_RATIO,
  STANDARD_ASPECT_RATIOS,
  EXTREME_ASPECT_RATIOS,
  type AspectRatio,
} from '@/lib/aspect-ratio';
import { NANO_BANANA_PRO, NANO_BANANA_2 } from '@/ai/models';
import type { NanoBananaModel } from '@/types/prompt';
import { Sparkles, Globe, Cpu } from 'lucide-react';

const ASPECT_LABELS: Record<AspectRatio, string> = {
  '16:9': '16:9 (Panorámica estándar)',
  '1:1': '1:1 (Cuadrada)',
  '9:16': '9:16 (Vertical / Stories)',
  '4:3': '4:3 (Clásica)',
  '3:4': '3:4 (Retrato)',
  '21:9': '21:9 (Cinemática Ultrawide)',
  '1:4': '1:4 (Vertical Extrema - Banner)',
  '4:1': '4:1 (Horizontal Extrema - Header)',
  '1:8': '1:8 (Ultra Vertical Skyscraper)',
  '8:1': '8:1 (Ultra Horizontal Ribbon)',
};

interface StandaloneImageGeneratorProps {
  initialPrompt?: string;
}

export function StandaloneImageGenerator({ initialPrompt = '' }: StandaloneImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [model, setModel] = useState<NanoBananaModel>(NANO_BANANA_PRO);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(DEFAULT_ASPECT_RATIO);
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableRatios = model === NANO_BANANA_2
    ? [...STANDARD_ASPECT_RATIOS, ...EXTREME_ASPECT_RATIOS]
    : STANDARD_ASPECT_RATIOS;

  const handleModelChange = (newModel: NanoBananaModel) => {
    setModel(newModel);
    if (newModel === NANO_BANANA_PRO && EXTREME_ASPECT_RATIOS.includes(aspectRatio as any)) {
      setAspectRatio('16:9');
    }
    if (newModel === NANO_BANANA_PRO) {
      setUseSearchGrounding(false);
    }
  };

  return (
    <Card className="shadow-xl rounded-3xl border-border/80 overflow-hidden">
      <CardHeader className="border-b border-border/40 bg-muted/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-normal font-display uppercase tracking-tight flex items-center gap-2">
              <span>Generar imagen con Nano Banana</span>
              <Badge variant="secondary" className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#052C87] text-[#FFF12E] border border-white/10">
                v2.0
              </Badge>
            </CardTitle>
            <CardDescription className="font-sans mt-1">
              Renderizado directo con Nano Banana Pro (alta fidelidad & tipografía) y Nano Banana 2 (grounding & ultra-aspect ratios).
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Model Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span>Motor de Renderizado</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => handleModelChange(NANO_BANANA_PRO)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                model === NANO_BANANA_PRO
                  ? 'border-[#FFF12E] bg-[#052C87]/80 text-white shadow-lg ring-1 ring-[#FFF12E]/50'
                  : 'border-border/60 bg-muted/20 hover:bg-muted/40 text-foreground'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Nano Banana Pro</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FFF12E] text-[#052C87] font-extrabold">
                  Recomendado
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-blue-200">
                gemini-3-pro-image-preview. Máximo razonamiento, renderizado tipográfico nativo, 4K Studio.
              </p>
            </button>

            <button
              type="button"
              disabled={isGenerating}
              onClick={() => handleModelChange(NANO_BANANA_2)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                model === NANO_BANANA_2
                  ? 'border-[#FFF12E] bg-[#052C87]/80 text-white shadow-lg ring-1 ring-[#FFF12E]/50'
                  : 'border-border/60 bg-muted/20 hover:bg-muted/40 text-foreground'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Nano Banana 2</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-extrabold">
                  Fast & Ratios
                </span>
              </div>
              <p className="text-xs text-muted-foreground dark:text-blue-200">
                gemini-3.1-flash-image-preview. Ratios extremos (4:1, 1:4, 8:1) y Google Search Grounding.
              </p>
            </button>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="standalone-prompt" className="text-sm font-semibold flex items-center justify-between">
            <span>Prompt de Imagen (Inglés recomendado)</span>
            <span className="text-xs text-muted-foreground font-mono">{prompt.length}/4000</span>
          </Label>
          <Textarea
            id="standalone-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={7}
            maxLength={4000}
            placeholder="Cinematic medium shot of an Envíos DosRuedas courier in navy Deep Cobalt polo (#0636A5) with Lemon Yellow trim (#FFEC01), riding a light-blue scooter along the Mar del Plata Rambla. The literal typography 'ENVÍOS DOSRUEDAS' is integrated with modern sans-serif. 16:9 aspect ratio."
            className="font-mono text-sm leading-relaxed"
            disabled={isGenerating}
          />
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-2">
            <Label htmlFor="standalone-aspect-ratio" className="text-sm font-semibold">
              Relación de Aspecto
            </Label>
            <Select
              value={aspectRatio}
              onValueChange={(value) => setAspectRatio(value as AspectRatio)}
              disabled={isGenerating}
            >
              <SelectTrigger id="standalone-aspect-ratio" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableRatios.map((ratio) => (
                  <SelectItem key={ratio} value={ratio}>
                    {ASPECT_LABELS[ratio]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {model === NANO_BANANA_2 && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-muted/20 mt-auto">
              <div className="space-y-0.5">
                <Label htmlFor="search-grounding" className="text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Google Search Grounding</span>
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Fidelidad de hitos geográficos de Mar del Plata
                </p>
              </div>
              <Switch
                id="search-grounding"
                checked={useSearchGrounding}
                onCheckedChange={setUseSearchGrounding}
                disabled={isGenerating}
              />
            </div>
          )}
        </div>

        {/* Action and Output */}
        <ImageRenderer
          key={`${prompt}-${model}-${aspectRatio}-${useSearchGrounding}`}
          prompt={prompt}
          aspectRatio={aspectRatio}
          model={model}
          useSearchGrounding={useSearchGrounding}
          suggestedFileName="prompt-libre"
          onPendingChange={setIsGenerating}
        />
      </CardContent>
    </Card>
  );
}

