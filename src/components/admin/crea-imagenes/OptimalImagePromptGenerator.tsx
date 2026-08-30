// src/components/admin/crea-imagenes/OptimalImagePromptGenerator.tsx
'use client';

import { useActionState, useEffect, useState, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  getOptimalServiceContextAction,
  suggestOptimalImageDetailsAction,
  generateOptimalImagePromptAction,
} from '@/app/optimas/actions';
import type { GenerateOptimalImagePromptState } from '@/app/optimas/actions';
import { navGroups } from '@/lib/navigation';


import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageRenderer } from './ImageRenderer';
import { Loader2, Wand2, Sparkles, Copy, Check, Bot, Pilcrow } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const serviceOptions = navGroups.flatMap(group => group.items.map(item => item.label));
const visualStyleOptions = [
    'Fotografía Urbana y Cinematográfica', 'Ilustración Vectorial Infográfica', 'Render 3D Promocional', 'Fotografía Humanizada (con Enfoque Minimalista)'
];
const sectionTypeOptions = ['Banner Web (16:9)', 'Post Red Social (1:1)', 'Historia (9:16)', 'Tarjeta de Servicio (4:3)'];
const CUSTOM_OPTION_VALUE = "custom";

const fontOptions = ['Orbitron', 'Roboto'];


const optimalImagePromptSchema = z.object({
  serviceName: z.string().min(1, 'Debes seleccionar un servicio.'),
  sectionType: z.string().min(1, 'El tipo de sección es requerido.'),
  visualStyle: z.string().min(1, 'El estilo visual es requerido.'),
  backgroundDetailsOption: z.string().min(1, 'Debes seleccionar o escribir un detalle de fondo.'),
  customBackgroundDetails: z.string().optional(),
  contentDetailsOption: z.string().min(1, 'Debes seleccionar o escribir un detalle de contenido.'),
  customContentDetails: z.string().optional(),
  includeText: z.boolean(),
  includeBrand: z.boolean(),
  fontToInclude: z.string().optional(),
  additionalDetails: z.string().optional(),
}).refine(data => data.backgroundDetailsOption !== CUSTOM_OPTION_VALUE || (data.customBackgroundDetails && data.customBackgroundDetails.length > 0), {
    message: 'El detalle de fondo personalizado no puede estar vacío.',
    path: ['customBackgroundDetails'],
}).refine(data => data.contentDetailsOption !== CUSTOM_OPTION_VALUE || (data.customContentDetails && data.customContentDetails.length > 0), {
    message: 'El detalle de contenido personalizado no puede estar vacío.',
    path: ['customContentDetails'],
});

type OptimalImagePromptValues = z.infer<typeof optimalImagePromptSchema>;

const initialState: GenerateOptimalImagePromptState = {};

export function OptimalImagePromptGenerator() {
  const [state, formAction] = useActionState(generateOptimalImagePromptAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestions, setSuggestions] = useState<{ background: string[]; content: string[] }>({ background: [], content: [] });
  const [serviceContext, setServiceContext] = useState<any | null>(null);

  const { toast } = useToast();

  const form = useForm<OptimalImagePromptValues>({
    resolver: zodResolver(optimalImagePromptSchema),
    defaultValues: {
      serviceName: '', sectionType: 'Banner Web (16:9)', visualStyle: 'Fotografía Urbana y Cinematográfica',
      backgroundDetailsOption: '', customBackgroundDetails: '', contentDetailsOption: '', customContentDetails: '',
      includeText: true, includeBrand: false, fontToInclude: 'ia_choice', additionalDetails: ''
    },
  });

  const backgroundChoice = form.watch('backgroundDetailsOption');
  const contentChoice = form.watch('contentDetailsOption');

  const handleServiceChange = useCallback(async (serviceName: string) => {
    form.reset({
      ...form.getValues(),
      serviceName,
      backgroundDetailsOption: '', customBackgroundDetails: '', contentDetailsOption: '', customContentDetails: ''
    });
    setSuggestions({ background: [], content: [] });
    setServiceContext(null);

    if (!serviceName) return;

    setIsSuggesting(true);
    toast({ title: 'Obteniendo contexto y sugerencias...', description: `Analizando el servicio: ${serviceName}` });

    const contextResult = await getOptimalServiceContextAction(serviceName);
    if (contextResult.success && contextResult.context) {
      setServiceContext(contextResult.context);
      const suggestionsResult = await suggestOptimalImageDetailsAction(contextResult.context);
      if (suggestionsResult.success && suggestionsResult.data) {
        setSuggestions({
            background: suggestionsResult.data.backgroundSuggestions,
            content: suggestionsResult.data.contentSuggestions,
        });
        toast({ title: '¡Sugerencias Listas!', description: 'Elige las mejores ideas para tu imagen.', className: 'bg-green-100 border-green-300' });
      } else {
        toast({ title: 'Error en Sugerencias', description: suggestionsResult.error, variant: 'destructive' });
      }
    } else {
      toast({ title: 'Error de Contexto', description: contextResult.error, variant: 'destructive' });
    }

    setIsSuggesting(false);
  }, [form, toast]);


  useEffect(() => {
    if (state.error) {
      toast({ title: 'Error al Generar Prompt', description: state.error, variant: 'destructive' });
    }
  }, [state, toast]);
  

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    formData.append('serviceName', data.serviceName);
    formData.append('serviceContext', JSON.stringify(serviceContext || {}));
    formData.append('sectionType', data.sectionType);
    formData.append('visualStyle', data.visualStyle);
    formData.append('backgroundDetails', data.backgroundDetailsOption === CUSTOM_OPTION_VALUE ? data.customBackgroundDetails! : data.backgroundDetailsOption);
    formData.append('contentDetails', data.contentDetailsOption === CUSTOM_OPTION_VALUE ? data.customContentDetails! : data.contentDetailsOption);
    formData.append('includeText', String(data.includeText));
    formData.append('includeBrand', String(data.includeBrand));
    formData.append('fontToInclude', data.fontToInclude === 'ia_choice' ? '' : data.fontToInclude || '');
    formData.append('additionalDetails', data.additionalDetails || '');
    startTransition(() => formAction(formData));
  });

  const handleCopy = () => {
    if (state.prompt) {
      navigator.clipboard.writeText(state.prompt);
      setCopied(true);
      toast({ title: 'Copiado', description: 'El prompt se ha copiado al portapapeles.' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
     <Card className="max-w-4xl mx-auto shadow-lg">
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 relative">
            {isSuggesting && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-20 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-3 text-primary p-4 bg-background rounded-lg shadow-md">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="font-semibold">Analizando servicio y generando ideas...</span>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2">
              <FormField
                control={form.control} name="serviceName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>1. Selecciona el Servicio</FormLabel>
                    <Select onValueChange={handleServiceChange} value={field.value}><FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Elige un servicio para empezar..." /></SelectTrigger></FormControl>
                      <SelectContent>{serviceOptions.map(service => (<SelectItem key={service} value={service}>{service}</SelectItem>))}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            
            <FormField control={form.control} name="sectionType" render={({ field }) => (<FormItem><FormLabel>2. Tipo de Sección</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{sectionTypeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="visualStyle" render={({ field }) => (<FormItem><FormLabel>3. Estilo Visual</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{visualStyleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
            
            <div className="md:col-span-2 space-y-2">
                <FormField
                    control={form.control} name="backgroundDetailsOption" render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2"><Bot className="w-4 h-4 text-primary"/> 4. Elige un Fondo (Sugerido por IA)</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="gap-2" disabled={!suggestions.background.length}>
                                {suggestions.background.map((suggestion, i) => (
                                <FormItem key={i} className="flex items-center space-x-3 space-y-0 border rounded-md p-3 has-[:checked]:bg-primary/5 has-[:checked]:border-primary/50">
                                    <FormControl><RadioGroupItem value={suggestion} /></FormControl>
                                    <FormLabel className="font-normal">{suggestion}</FormLabel>
                                </FormItem>
                                ))}
                                <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 has-[:checked]:bg-primary/5 has-[:checked]:border-primary/50">
                                    <FormControl><RadioGroupItem value={CUSTOM_OPTION_VALUE} /></FormControl>
                                    <FormLabel className="font-normal">Otra (personalizada)</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                {backgroundChoice === CUSTOM_OPTION_VALUE && <FormField control={form.control} name="customBackgroundDetails" render={({ field }) => (<FormItem><FormControl><Input placeholder="Escribe tu detalle de fondo personalizado..." {...field} /></FormControl><FormMessage /></FormItem>)}/>}
            </div>

             <div className="md:col-span-2 space-y-2">
                <FormField
                    control={form.control} name="contentDetailsOption" render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel className="flex items-center gap-2"><Bot className="w-4 h-4 text-primary"/> 5. Elige un Contenido (Sugerido por IA)</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="gap-2" disabled={!suggestions.content.length}>
                                {suggestions.content.map((suggestion, i) => (
                                <FormItem key={i} className="flex items-center space-x-3 space-y-0 border rounded-md p-3 has-[:checked]:bg-primary/5 has-[:checked]:border-primary/50">
                                    <FormControl><RadioGroupItem value={suggestion} /></FormControl>
                                    <FormLabel className="font-normal">{suggestion}</FormLabel>
                                </FormItem>
                                ))}
                                <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 has-[:checked]:bg-primary/5 has-[:checked]:border-primary/50">
                                    <FormControl><RadioGroupItem value={CUSTOM_OPTION_VALUE} /></FormControl>
                                    <FormLabel className="font-normal">Otro (personalizado)</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                {contentChoice === CUSTOM_OPTION_VALUE && <FormField control={form.control} name="customContentDetails" render={({ field }) => (<FormItem><FormControl><Textarea placeholder="Escribe tu contenido principal personalizado..." {...field} /></FormControl><FormMessage /></FormItem>)}/>}
            </div>
            
            <div className="md:col-span-2 space-y-4">
                <FormLabel>6. Opciones de Texto y Marca</FormLabel>
                <FormField control={form.control} name="includeText" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Incluir Nombre del Servicio</FormLabel></div><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                <FormField control={form.control} name="includeBrand" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Incluir Marca y Contacto</FormLabel></div><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                 <FormField
                    control={form.control}
                    name="fontToInclude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2"><Pilcrow className="h-4 w-4"/> Tipografía Sugerida (Opcional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Dejar que la IA decida la tipografía..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ia_choice">Dejar que la IA decida</SelectItem>
                                    {fontOptions.map(font => (
                                        <SelectItem key={font} value={font}>{font}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="md:col-span-2">
                <FormField
                    control={form.control}
                    name="additionalDetails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>7. Detalles Adicionales (Opcional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Añade cualquier otro detalle o requerimiento específico para la imagen..." rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
             </div>

          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 border-t border-border/40 bg-muted/10">
            <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              {isPending ? 'Generando Prompt...' : 'Generar Prompt Final'}
            </Button>
            {state.prompt && (
              <div className="w-full mt-4 rounded-xl border border-primary/20 bg-slate-950 text-slate-100 overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">Prompt Listo para Usar</span>
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
                <div className="p-4 font-mono text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto select-all">
                  {state.prompt}
                </div>
              </div>
            )}
            {state.prompt && (
              <ImageRenderer
                key={state.prompt}
                prompt={state.prompt}
                aspectRatio={form.watch('sectionType')}
                suggestedFileName={form.watch('serviceName')}
              />
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
