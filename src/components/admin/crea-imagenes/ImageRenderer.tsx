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

const ASPECT_CLASS: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
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
  suggestedFileName?: string;
  onPendingChange?: (pending: boolean) => void;
}

export function ImageRenderer({ prompt, aspectRatio, suggestedFileName, onPendingChange }: ImageRendererProps) {
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
        const result = await generateImageAction({ prompt, aspectRatio: ratio });
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
    <div className="w-full mt-4 space-y-3">
      {!image && (
        <Button type="button" onClick={handleGenerate} disabled={!canGenerate} className="w-full gap-2">
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generando imagen… (10–20 s)</span>
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              <span>Generar imagen con Nano Banana</span>
            </>
          )}
        </Button>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No se pudo generar la imagen</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {image && (
        <div className="rounded-xl border border-primary/20 overflow-hidden bg-muted shadow-xl">
          <div className={`relative w-full ${ASPECT_CLASS[image.ratio]}`}>
            <Image
              src={image.dataUri}
              alt="Imagen generada con Nano Banana"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 p-3 border-t border-border bg-background">
            <Button asChild className="gap-2">
              <a href={image.dataUri} download={image.fileName}>
                <Download className="h-4 w-4" />
                <span>Descargar PNG</span>
              </a>
            </Button>
            <Button type="button" variant="outline" onClick={handleGenerate} disabled={isPending} className="gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span>Regenerar</span>
            </Button>
            <span className="text-xs text-muted-foreground ml-auto">{image.ratio} · {image.mimeType}</span>
          </div>
        </div>
      )}
    </div>
  );
}
