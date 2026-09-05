'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageRenderer } from './ImageRenderer';
import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO, type AspectRatio } from '@/lib/aspect-ratio';

const ASPECT_LABELS: Record<AspectRatio, string> = {
  '16:9': '16:9 (Panorámica)',
  '1:1': '1:1 (Cuadrada)',
  '9:16': '9:16 (Vertical)',
  '4:3': '4:3 (Clásica)',
  '3:4': '3:4 (Retrato)',
};

interface StandaloneImageGeneratorProps {
  initialPrompt?: string;
}

export function StandaloneImageGenerator({ initialPrompt = '' }: StandaloneImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(DEFAULT_ASPECT_RATIO);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <Card className="shadow-xl rounded-3xl border-border/80 overflow-hidden">
      <CardHeader className="border-b border-border/40 bg-muted/10">
        <CardTitle className="text-xl sm:text-2xl font-normal font-display uppercase tracking-tight">
          Generar imagen con Nano Banana
        </CardTitle>
        <CardDescription className="font-sans">
          Pegá cualquier prompt en inglés, elegí la relación de aspecto y generá la imagen en tiempo real con Gemini 2.5 Flash Image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="standalone-prompt">Prompt</Label>
          <Textarea
            id="standalone-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={8}
            maxLength={4000}
            placeholder="Cinematic photo of a friendly courier on a blue and yellow motorbike riding along the Mar del Plata seaside..."
            className="font-mono text-sm"
            disabled={isGenerating}
          />
          <p className={`text-xs text-right ${isGenerating ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>{prompt.length}/4000</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="standalone-aspect-ratio">Relación de aspecto</Label>
          <Select value={aspectRatio} onValueChange={(value) => setAspectRatio(value as AspectRatio)} disabled={isGenerating}>
            <SelectTrigger id="standalone-aspect-ratio" className="w-full sm:w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ASPECT_RATIOS.map((ratio) => (
                <SelectItem key={ratio} value={ratio}>
                  {ASPECT_LABELS[ratio]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ImageRenderer
          key={prompt}
          prompt={prompt}
          aspectRatio={aspectRatio}
          suggestedFileName="prompt-libre"
          onPendingChange={setIsGenerating}
        />
      </CardContent>
    </Card>
  );
}
