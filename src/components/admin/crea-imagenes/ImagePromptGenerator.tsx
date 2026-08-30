// src/components/admin/crea-imagenes/ImagePromptGenerator.tsx
'use client';

import { useActionState, useEffect, useState, useTransition, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { generateImagePromptAction, suggestImageParamsAction, getServiceContextAction } from '@/app/generales/actions';
import type { GenerateImagePromptState } from '@/app/generales/actions';
import { navGroups } from '@/lib/navigation';


import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageRenderer } from './ImageRenderer';
import { Loader2, Wand2, Sparkles, Copy, Check, Image as ImageIcon, Pilcrow, BookText, Info } from 'lucide-react';

interface ImageProfile {
  name: string;
  alt_text: string;
  description: string;
  tags: string[];
}

const sections = ['Hero', 'Card', 'Banner', 'General', 'Ilustración'];
const aspectRatios = ['16:9 (Panorámica)', '1:1 (Cuadrada)', '9:16 (Vertical)'];
const styles = ['Fotografía Realista', 'Ilustración Digital', 'Arte 3D', 'Estilo Cinematográfico', 'Minimalista'];

const promptGeneratorSchema = z.object({
  sectionType: z.string().min(1, 'El tipo de sección es requerido.'),
  service: z.string().min(1, 'El servicio es requerido.'),
  serviceContext: z.string().optional(),
  aspectRatio: z.string().min(1, 'La relación de aspecto es requerida.'),
  style: z.string().min(1, 'El estilo visual es requerido.'),
  background: z.string().optional(),
  details: z.string().optional(),
  inspirationImageName: z.string().optional(),
  textToInclude: z.string().optional(),
});

type PromptGeneratorFormValues = z.infer<typeof promptGeneratorSchema>;

const initialState: GenerateImagePromptState = {};

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      {isPending ? 'Generando Prompt...' : 'Generar Prompt'}
    </Button>
  );
}

export function ImagePromptGenerator() {
  const [state, formAction] = useActionState(generateImagePromptAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serviceContextContent, setServiceContextContent] = useState('');
  const [isContextLoading, setIsContextLoading] = useState(false);
  const [imageProfiles, setImageProfiles] = useState<ImageProfile[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchImageProfiles() {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch image profiles');
        }
        const data = await response.json();
        setImageProfiles(data.image_profiles);
      } catch (error) {
        console.error("Error fetching image profiles:", error);
        toast({ title: 'Error', description: 'No se pudieron cargar los perfiles de imagen.', variant: 'destructive'});
      }
    }
    fetchImageProfiles();
  }, [toast]);

  const form = useForm<PromptGeneratorFormValues>({
    resolver: zodResolver(promptGeneratorSchema),
    defaultValues: {
      sectionType: 'General', service: 'General', aspectRatio: '16:9 (Panorámica)',
      style: 'Fotografía Realista', background: '', details: '', inspirationImageName: 'none', textToInclude: '',
      serviceContext: '',
    },
  });

  const selectedService = form.watch('service');

  const loadServiceContext = useCallback(async (serviceName: string) => {
    if (!serviceName || serviceName === 'General') {
      setServiceContextContent('');
      form.setValue('serviceContext', '');
      return;
    }
    setIsContextLoading(true);
    try {
      const result = await getServiceContextAction(serviceName);
      if (result.success && result.summary) {
        setServiceContextContent(result.summary);
        form.setValue('serviceContext', result.summary);
      } else {
        setServiceContextContent('');
        form.setValue('serviceContext', '');
        toast({ title: 'Error', description: result.error || `No se pudo cargar el contexto para ${serviceName}.`, variant: 'destructive'});
      }
    } catch (error) {
      console.error("Failed to load service context:", error);
      setServiceContextContent('');
      form.setValue('serviceContext', '');
      toast({ title: 'Error', description: `No se pudo cargar el contexto para ${serviceName}.`, variant: 'destructive'});
    } finally {
      setIsContextLoading(false);
    }
  }, [form, toast]);


  useEffect(() => {
    if (selectedService && selectedService !== 'General') {
      loadServiceContext(selectedService);
    } else {
      setServiceContextContent('');
      form.setValue('serviceContext', '');
    }
  }, [selectedService, loadServiceContext]);

  useEffect(() => {
    if (state.error) {
      toast({ title: 'Error al Generar', description: state.error, variant: 'destructive' });
    }
  }, [state, toast]);
  
  const handleInspirationChange = async (imageName: string) => {
    form.setValue('inspirationImageName', imageName);
    if (imageName === 'none') {
        form.reset({
            sectionType: 'General', service: 'General', aspectRatio: '16:9 (Panorámica)',
            style: 'Fotografía Realista', background: '', details: '', inspirationImageName: 'none', textToInclude: '',
        });
        setServiceContextContent('');
        return;
    };
    
    setIsSuggesting(true);
    toast({ title: 'Obteniendo sugerencias con IA...', description: 'Analizando la imagen de inspiración.'});

    const result = await suggestImageParamsAction(imageName);
    
    if (result.success && result.data) {
        form.setValue('sectionType', result.data.sectionType);
        form.setValue('service', result.data.serviceName);
        form.setValue('aspectRatio', result.data.aspectRatio);
        form.setValue('style', result.data.style);
        form.setValue('background', result.data.background);
        form.setValue('details', result.data.details);
        if (result.data.serviceName && result.data.serviceName !== 'General') {
            await loadServiceContext(result.data.serviceName);
        }
        toast({ title: 'Sugerencias aplicadas', description: 'El formulario se ha autocompletado.', className: 'bg-green-100 border-green-300' });
    } else {
        toast({ title: 'Error en Sugerencias', description: result.error, variant: 'destructive'});
    }
    setIsSuggesting(false);
  };
  
  const handleSuggestFromContext = async () => {
    const context = form.getValues('serviceContext');
    if (!context) {
        toast({ title: 'Sin Contexto', description: 'Selecciona un servicio para cargar su contexto primero.', variant: 'destructive'});
        return;
    }
    
    setIsSuggesting(true);
    toast({ title: 'Generando ideas con IA...', description: 'Usando el contexto del servicio para sugerir detalles.'});

    const result = await suggestImageParamsAction('', context);
    
    if (result.success && result.data) {
        form.setValue('background', result.data.background);
        form.setValue('details', result.data.details);
        toast({ title: 'Sugerencias aplicadas', description: 'Se han autocompletado los detalles y el fondo.', className: 'bg-green-100 border-green-300' });
    } else {
        toast({ title: 'Error en Sugerencias', description: result.error, variant: 'destructive'});
    }
    setIsSuggesting(false);
  };


  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || '');
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
  
  const allServicesAndPages = navGroups.flatMap(g => g.items.map(i => i.label));

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <Form {...form}>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
             {(isSuggesting || isContextLoading) && (
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-10 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{isSuggesting ? 'Generando ideas...' : 'Cargando contexto...'}</span>
                    </div>
                </div>
             )}
            <div className="md:col-span-2">
                 <FormField
                    control={form.control}
                    name="inspirationImageName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className='flex items-center gap-2'><ImageIcon className='w-4 h-4' /> Usar Imagen de Inspiración (Opcional)</FormLabel>
                        <Select onValueChange={handleInspirationChange} value={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una imagen base..." />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">Ninguna (Crear desde cero)</SelectItem>
                                {imageProfiles.map(img => (
                                    <SelectItem key={img.name} value={img.name}>{img.name} - {img.alt_text}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>La IA sugerirá parámetros y creará una versión mejorada basada en la imagen seleccionada.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Página / Servicio Asociado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       <SelectItem value="General">General / Ninguno</SelectItem>
                      {[...new Set(allServicesAndPages)].map(service => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Sección / Elemento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sección..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sections.map(section => (
                        <SelectItem key={section} value={section}>{section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
             <div className="md:col-span-2">
               <FormField
                  control={form.control}
                  name="serviceContext"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><BookText className="w-4 h-4 text-primary" /> Contexto del Servicio para la IA</FormLabel>
                      <FormControl>
                        <Textarea
                          readOnly
                          rows={6}
                          className="bg-muted/50 text-muted-foreground text-xs font-mono"
                          placeholder="El contexto del servicio seleccionado aparecerá aquí..."
                          {...field}
                        />
                      </FormControl>
                       <FormDescription className="flex items-center gap-2">
                        <Info className="w-3 h-3"/> Este texto se inyecta en el prompt para darle a la IA información precisa sobre el servicio.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>


             <FormField
              control={form.control}
              name="aspectRatio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relación de Aspecto</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {aspectRatios.map(ratio => <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estilo Visual</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {styles.map(style => <SelectItem key={style} value={style}>{style}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="md:col-span-2 space-y-1">
                <FormField
                control={form.control}
                name="background"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Detalles del Fondo (Opcional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: 'fondo de playa difuminado', 'interior de un taller moderno'" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <div className="md:col-span-2 space-y-1">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalles Adicionales de Contenido (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: 'mostrar un repartidor sonriendo', 'escena nocturna', 'cliente recibiendo el paquete feliz'"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleSuggestFromContext}
                disabled={!serviceContextContent || isSuggesting}
                className="w-full md:w-auto"
               >
                 <Sparkles className="w-4 h-4 mr-2" />
                 Sugerir con IA (Basado en Contexto)
               </Button>
            </div>
            <div className="md:col-span-2">
                <FormField
                control={form.control}
                name="textToInclude"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center gap-2"><Pilcrow className="h-4 w-4"/> Texto a Incluir en la Imagen (Opcional)</FormLabel>
                    <FormControl>
                        <Input placeholder="Ej: Envíos Express" {...field} list="text-suggestions" />
                    </FormControl>
                    <datalist id="text-suggestions">
                        {allServicesAndPages.map(item => <option key={item} value={item} />)}
                    </datalist>
                    <FormDescription>
                      Deja vacío si no quieres texto en la imagen. Puedes usar los servicios como sugerencia.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 border-t border-border/40 bg-muted/10">
            <SubmitButton isPending={isPending} />
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
                aspectRatio={form.watch('aspectRatio')}
                suggestedFileName={form.watch('service')}
              />
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
