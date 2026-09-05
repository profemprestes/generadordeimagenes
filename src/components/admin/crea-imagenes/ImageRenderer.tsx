// src/components/admin/crea-imagenes/ImageRenderer.tsx
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { generateImageAction } from '@/app/actions/generate-image';
import { parseAspectRatio, type AspectRatio } from '@/lib/aspect-ratio';
import { AlertCircle, Download, Loader2, RefreshCw, Wand2 } from 'lucide-react';

import type { NanoBananaModel } from '@/types/prompt';

const ASPECT_CLASS: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '21:9': 'aspect-[21/9]',
  '1:4': 'aspect-[1/4]',
  '4:1': 'aspect-[4/1]',
  '1:8': 'aspect-[1/8]',
  '8:1': 'aspect-[8/1]',
};

function slugify(value: string): string {
  const slug = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || 'imagen';
}

function extensionForMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'image/png':
      return 'png';
    case 'image/jpeg':
      return 'jpg';
    case 'image/webp':
      return 'webp';
    default:
      return 'png';
  }
}

interface GeneratedImage {
  dataUri: string;
  mimeType: string;
  fileName: string;
  ratio: AspectRatio;
}

interface ImageRendererProps {
  prompt: string;
  aspectRatio?: string;
  model?: NanoBananaModel;
  useSearchGrounding?: boolean;
  suggestedFileName?: string;
  onPendingChange?: (pending: boolean) => void;
}

export function ImageRenderer({
  prompt,
  aspectRatio,
  model,
  useSearchGrounding,
  suggestedFileName,
  onPendingChange,
}: ImageRendererProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ratio = parseAspectRatio(aspectRatio);
  const canGenerate = prompt.trim().length > 0 && !isPending;

  const handleGenerate = () => {
    setError(null);
    onPendingChange?.(true);
    startTransition(async () => {
      try {
        const result = await generateImageAction({
          prompt,
          aspectRatio: ratio,
          model,
          useSearchGrounding,
        });
        if ('error' in result) {
          setError(result.error);
          toast({ title: 'No se pudo generar la imagen', description: result.error, variant: 'destructive' });
          return;
        }
        setImage({
          dataUri: result.imageDataUri,
          mimeType: result.mimeType,
          ratio,
          fileName: `envios-dosruedas-${slugify(suggestedFileName ?? 'imagen')}-${Date.now()}.${extensionForMimeType(result.mimeType)}`,
        });
      } finally {
        onPendingChange?.(false);
      }
    });
  };

  return (
    <div className="w-full mt-4 space-y-4">
      {!image && (
        <Button
          type="button"
          variant="cta"
          size="lg"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full gap-2 rounded-full font-bold uppercase tracking-wider text-sm sm:text-base h-12 shadow-[0_0_20px_rgba(255,241,46,0.35)]"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-[#052C87]" />
              <span>Generando imagen con Nano Banana… (10–20 s)</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5 text-[#052C87]" />
              <span>Generar imagen con Nano Banana</span>
            </>
          )}
        </Button>
      )}

      {error && (
        <Alert variant="destructive" className="rounded-2xl border-destructive/50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">No se pudo generar la imagen</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}

      {image && (
        <div className="rounded-3xl border border-white/15 overflow-hidden bg-[#052C87]/40 shadow-2xl backdrop-blur-md">
          <div className={`relative w-full bg-slate-950/60 flex items-center justify-center ${ASPECT_CLASS[image.ratio]}`}>
            <Image
              src={image.dataUri}
              alt="Imagen generada con Nano Banana"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-white/10 bg-[#052C87]">
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="cta" size="sm" className="rounded-full gap-1.5 font-bold uppercase tracking-wider text-xs">
                <a href={image.dataUri} download={image.fileName}>
                  <Download className="h-3.5 w-3.5 text-[#052C87]" />
                  <span>Descargar PNG</span>
                </a>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleGenerate}
                disabled={isPending}
                className="rounded-full gap-1.5 font-bold uppercase tracking-wider text-xs bg-white/10 hover:bg-white/20 text-white"
              >
                {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 text-[#FFF12E]" />}
                <span>Regenerar</span>
              </Button>
            </div>
            <span className="text-xs font-mono text-blue-200 font-semibold">{image.ratio} · {image.mimeType}</span>
          </div>
        </div>
      )}
    </div>
  );
}
