// src/components/admin/crea-imagenes/ServiceImagePromptGenerator.tsx
'use client';

import { useActionState, useEffect, useState, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  getServiceContextAction,
  suggestServiceImageDetailsAction,
  generateServiceImagePromptAction,
} from '@/app/servicios/actions';
import type { GenerateServiceImagePromptState } from '@/app/servicios/actions';
import { navGroups } from '@/lib/navigation';


import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Sparkles, Copy, Check, BookText, Info, Bot } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';


const serviceOptions = navGroups.flatMap(group =>
  group.items
    .filter(item => item.label !== "Envíos LowCost") // Example filter if needed
    .map(item => item.label)
);

const visualStyleOptions = [
    'Fotografía Urbana y Cinematográfica',
    'Ilustración Vectorial Infográfica',
    'Render 3D Promocional',
    'Fotografía Humanizada (con Enfoque Minimalista)',
];
const sectionTypeOptions = ['Banner Web (16:9)', 'Post Red Social (1:1)', 'Historia (9:16)', 'Tarjeta de Servicio (4:3)'];

const serviceImagePromptSchema = z.object({
  serviceName: z.string().min(1, 'Debes seleccionar un servicio.'),
  serviceContext: z.string(),
  sectionType: z.string().min(1, 'El tipo de sección es requerido.'),
  visualStyle: z.string().min(1, 'El estilo visual es requerido.'),
  backgroundDetails: z.string().min(1, 'Los detalles del fondo son requeridos.'),
  contentDetails: z.string().min(1, 'Los detalles del contenido son requeridos.'),
  includeText: z.boolean().default(true),
  includeBrand: z.boolean().default(false),
});

type ServiceImagePromptValues = z.infer<typeof serviceImagePromptSchema>;

const initialState: GenerateServiceImagePromptState = {};

export function ServiceImagePromptGenerator() {
  const [state, formAction] = useActionState(generateServiceImagePromptAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const form = useForm<ServiceImagePromptValues>({
    resolver: zodResolver(serviceImagePromptSchema),
    defaultValues: {
      serviceName: '',
      serviceContext: '',
      sectionType: 'Banner Web (16:9)',
      visualStyle: 'Fotografía Urbana y Cinematográfica',
      backgroundDetails: '',
      contentDetails: '',
      includeText: true,
      includeBrand: false,
    },
  });

  const selectedService = form.watch('serviceName');

  const handleServiceChange = useCallback(async (serviceName: string) => {
    form.setValue('serviceName', serviceName);
    form.setValue('serviceContext', '');
    form.setValue('backgroundDetails', '');
    form.setValue('contentDetails', '');

    if (!serviceName) return;

    setIsSuggesting(true);
    toast({ title: 'Obteniendo contexto y sugerencias...', description: `Analizando el servicio: ${serviceName}` });

    const contextResult = await getServiceContextAction(serviceName);
    if (contextResult.success && contextResult.context) {
      const contextString = JSON.stringify(contextResult.context, null, 2);
      form.setValue('serviceContext', contextString);

      const suggestionsResult = await suggestServiceImageDetailsAction(contextResult.context);
      if (suggestionsResult.success && suggestionsResult.data) {
        form.setValue('backgroundDetails', suggestionsResult.data.backgroundDetails);
        form.setValue('contentDetails', suggestionsResult.data.contentDetails);
        toast({ title: '¡Listo!', description: 'Contexto cargado y detalles sugeridos por la IA.', className: 'bg-green-100 border-green-300' });
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
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
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
            {(isSuggesting) && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-10 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-3 text-primary p-4 bg-background rounded-lg shadow-md">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="font-semibold">Analizando servicio y generando ideas...</span>
                </div>
              </div>
            )}
            
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>1. Selecciona el Servicio</FormLabel>
                    <Select onValueChange={handleServiceChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Elige un servicio para empezar..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceOptions.map(service => (
                          <SelectItem key={service} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Esto cargará el contexto y generará sugerencias automáticas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="sectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2. Tipo de Sección</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedService}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {sectionTypeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visualStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. Estilo Visual</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedService}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {visualStyleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="md:col-span-2 space-y-2">
              <FormField
                control={form.control}
                name="backgroundDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Bot className="w-4 h-4 text-primary"/> 4. Detalles del Fondo (Sugerido por IA)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Los detalles del fondo sugeridos por la IA aparecerán aquí..." {...field} disabled={!selectedService} rows={2}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <FormField
                control={form.control}
                name="contentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Bot className="w-4 h-4 text-primary"/> 5. Contenido Principal (Sugerido por IA)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="El contenido principal sugerido por la IA aparecerá aquí..." {...field} disabled={!selectedService} rows={3}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="md:col-span-2 space-y-4">
                <FormLabel>6. Opciones de Texto y Marca</FormLabel>
                 <FormField
                    control={form.control}
                    name="includeText"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={!selectedService} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Incluir Nombre del Servicio</FormLabel>
                            <FormDescription>
                                Añade el nombre del servicio (ej. "Envíos Express") en la imagen con la tipografía y colores de la marca.
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="includeBrand"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={!selectedService} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Incluir Marca y Contacto</FormLabel>
                            <FormDescription>
                                Superpone el nombre "Envios DosRuedas" y el teléfono en la imagen.
                            </FormDescription>
                        </div>
                        </FormItem>
                    )}
                />
            </div>
             <input type="hidden" {...form.register('serviceContext')} />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 border-t">
            <Button type="submit" disabled={isPending || !selectedService} className="w-full">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              {isPending ? 'Generando Prompt...' : 'Generar Prompt Final'}
            </Button>
            {state.prompt && (
              <Alert className="bg-blue-50 border-blue-200 w-full">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 font-semibold">Prompt Generado</AlertTitle>
                <AlertDescription className="text-blue-700 whitespace-pre-wrap font-mono text-sm relative pr-10">
                  {state.prompt}
                   <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 h-8 w-8 text-blue-600 hover:bg-blue-100"
                      onClick={handleCopy}
                      type="button"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
