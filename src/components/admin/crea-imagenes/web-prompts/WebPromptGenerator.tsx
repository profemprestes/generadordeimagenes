'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ImageRenderer } from '../ImageRenderer';
import { optimizeWebSectionPromptAction } from '@/app/crear-prompts-webs/actions';
import type { WebPageDoc, WebSectionDoc } from '@/lib/docs-contenido';
import type { GenerateWebSectionPromptOutput } from '@/ai/flows/generate-web-section-prompt';
import {
  Sparkles,
  Layout,
  Layers,
  Palette,
  Copy,
  Check,
  Wand2,
  Search,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Laptop,
  Box,
  CreditCard,
  FormInput,
  Star,
  Zap,
  HelpCircle,
  Maximize2,
  RefreshCw,
  Code2,
} from 'lucide-react';

interface WebPromptGeneratorProps {
  initialPagesDocs: WebPageDoc[];
}

const VISUAL_STYLES = [
  { id: 'Mockup UI 3D Isométrico', label: '3D Isométrico Moderno', desc: 'Tarjetas flotantes en perspectiva 3D con sombras suaves y profundidad.' },
  { id: 'Mockup Realista en Dispositivo (Laptop & Mobile)', label: 'Dispositivos Realistas', desc: 'Pantallas renderizadas en MacBook Pro y iPhone con marco limpio.' },
  { id: 'Glassmorphism Moderno de Estudio', label: 'Glassmorphism de Estudio', desc: 'Vidrio esmerilado translúcido, reflejos sutiles y fondo con gradiente suave.' },
  { id: 'Minimalismo Flat con Sombras Suaves', label: 'Minimalista & Editorial', desc: 'Diseño limpio y espacioso, alto contraste tipográfico y estética nórdica.' },
  { id: 'Fotografía Urbana & Logística con UI Integrada', label: 'Urbana con UI Integrada', desc: 'Escenas reales de Mar del Plata con elementos de interfaz superpuestos.' },
];

const COLOR_MODES = [
  { id: 'Acentos Envíos DosRuedas', label: 'Acentos de Marca (Cobalto #052C87 + Amarillo #FFF12E)' },
  { id: 'Modo Claro Luminoso', label: 'Modo Claro (Fondo Blanco Puro y Reflejos Cálidos)' },
  { id: 'Modo Oscuro Profundo', label: 'Modo Oscuro (Dark Navy #001744 con Neón Acento)' },
  { id: 'Bicolor Minimalista', label: 'Monocromático Tech con Acento Único' },
];

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 (Panorámico / Banner / Hero Web)' },
  { id: '1:1', label: '1:1 (Card Cuadrada / Grilla Bento / Social)' },
  { id: '4:3', label: '4:3 (Desktop Box / Sección Compacta)' },
  { id: '21:9', label: '21:9 (Ultrawide Header Cinemático)' },
  { id: '9:16', label: '9:16 (Vertical / Mobile App Mockup)' },
];

function getSectionIcon(type: WebSectionDoc['type']) {
  switch (type) {
    case 'hero':
      return Laptop;
    case 'bento':
    case 'cards':
      return Box;
    case 'pricing':
      return CreditCard;
    case 'form':
      return FormInput;
    case 'social-proof':
      return Star;
    case 'cta':
      return Zap;
    case 'faq':
      return HelpCircle;
    default:
      return Layout;
  }
}

export function WebPromptGenerator({ initialPagesDocs }: WebPromptGeneratorProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Navigation / Search state
  const [pageSearch, setPageSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Selection state
  const [selectedPage, setSelectedPage] = useState<WebPageDoc>(initialPagesDocs[0] || null);
  const [selectedSection, setSelectedSection] = useState<WebSectionDoc | null>(
    initialPagesDocs[0]?.sections[0] || null
  );

  // Customization parameters
  const [visualStyle, setVisualStyle] = useState('Mockup UI 3D Isométrico');
  const [colorMode, setColorMode] = useState('Acentos Envíos DosRuedas');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [brandEmphasis, setBrandEmphasis] = useState(true);
  const [generateVariants, setGenerateVariants] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');

  // Output state
  const [result, setResult] = useState<GenerateWebSectionPromptOutput | null>(null);
  const [activePromptEn, setActivePromptEn] = useState<string>('');
  const [activePromptEs, setActivePromptEs] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'es' | 'en' | 'render'>('en');

  // Filter pages
  const filteredPages = initialPagesDocs.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(pageSearch.toLowerCase()) ||
      page.url.toLowerCase().includes(pageSearch.toLowerCase()) ||
      page.description.toLowerCase().includes(pageSearch.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ? true : page.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSelectPage = (page: WebPageDoc) => {
    setSelectedPage(page);
    setSelectedSection(page.sections[0] || null);
  };

  const handleSelectSection = (section: WebSectionDoc) => {
    setSelectedSection(section);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast({
      title: 'Prompt copiado',
      description: 'El texto fue copiado al portapapeles con éxito.',
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleGeneratePrompt = () => {
    if (!selectedPage || !selectedSection) {
      toast({
        title: 'Selección incompleta',
        description: 'Por favor seleccioná una página y una sección.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const res = await optimizeWebSectionPromptAction({
        pageTitle: selectedPage.title,
        pageUrl: selectedPage.url,
        sectionName: selectedSection.name,
        sectionType: selectedSection.type,
        sectionDescription: selectedSection.description,
        componentName: selectedSection.componentName,
        visualStyle,
        colorMode,
        aspectRatio,
        brandEmphasis,
        customInstructions: customInstructions.trim() || undefined,
        generateVariants,
      });

      if (res.success && res.data) {
        setResult(res.data);
        setActivePromptEn(res.data.promptEn);
        setActivePromptEs(res.data.promptEs);
        setActiveTab('en');
        toast({
          title: '¡Prompt optimizado con éxito!',
          description: 'Generamos la descripción en lenguaje natural en Español e Inglés.',
        });
      } else {
        toast({
          title: 'Error al optimizar',
          description: res.error || 'No se pudo generar el prompt.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Step 1 & 2 Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step 1: Page Selection (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#052C87] text-[#FFF12E] text-xs font-bold font-mono">
                1
              </span>
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground font-subheading">
                Página de Destino
              </h2>
            </div>
            <span className="text-xs text-muted-foreground">
              {filteredPages.length} páginas encontradas
            </span>
          </div>

          {/* Search & Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o URL..."
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                className="pl-9 text-xs rounded-xl bg-card border-border"
              />
            </div>
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'home', label: 'Inicio' },
                { id: 'servicios', label: 'Servicios' },
                { id: 'cotizadores', label: 'Cotizadores' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'ui-kit', label: 'UI Kit' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-[#052C87] text-[#FFF12E] shadow-sm'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pages Scroll List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredPages.map((page) => {
              const isSelected = selectedPage?.id === page.id;
              return (
                <div
                  key={page.id}
                  onClick={() => handleSelectPage(page)}
                  className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#052C87]/10 border-[#0950F6] shadow-md ring-1 ring-[#0950F6]'
                      : 'bg-card hover:bg-muted/50 border-border/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-[#0950F6] transition-colors">
                          {page.title}
                        </h3>
                        {page.sections.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] py-0 px-1.5 bg-[#FFF12E]/20 text-[#052C87] dark:text-[#FFF12E] border-none font-mono"
                          >
                            {page.sections.length} secciones
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                        {page.url}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 mt-1 transition-transform ${
                        isSelected
                          ? 'text-[#0950F6] translate-x-1'
                          : 'text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5">
                    {page.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Section & Component Selection (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#052C87] text-[#FFF12E] text-xs font-bold font-mono">
                2
              </span>
              <h2 className="text-base font-bold uppercase tracking-wider text-foreground font-subheading">
                Sección o Componente Visual ({selectedPage ? selectedPage.title : 'Seleccioná una página'})
              </h2>
            </div>
            {selectedSection && (
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                {selectedSection.componentName || selectedSection.id}
              </Badge>
            )}
          </div>

          {selectedPage ? (
            <div className="space-y-2.5">
              <p className="text-xs text-muted-foreground">
                Elegí la sección que querés representar como componente visual o mockup 3D.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {selectedPage.sections.map((section) => {
                  const isSelected = selectedSection?.id === section.id;
                  const Icon = getSectionIcon(section.type);
                  return (
                    <div
                      key={section.id}
                      onClick={() => handleSelectSection(section)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0950F6]/10 border-[#0950F6] shadow-md ring-2 ring-[#0950F6]'
                          : 'bg-card hover:bg-muted/40 border-border/70'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-xl bg-background border border-border shadow-xs text-primary">
                            <Icon className="w-4 h-4 text-[#0950F6]" />
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase tracking-wider font-subheading"
                          >
                            {section.type}
                          </Badge>
                        </div>
                        <h4 className="text-xs font-bold text-foreground mt-2">
                          {section.name}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {section.description}
                        </p>
                      </div>

                      {section.componentName && (
                        <div className="mt-3 pt-2 border-t border-border/50 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                          <Code2 className="w-3 h-3 text-[#0950F6]" />
                          <span className="truncate">{section.componentName}.tsx</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed rounded-3xl text-muted-foreground">
              Seleccioná primero una página a la izquierda para ver sus componentes visuales.
            </div>
          )}
        </div>
      </div>

      {/* Step 3: Customization Controls Card */}
      <Card className="rounded-3xl border-border/80 shadow-lg overflow-hidden bg-card">
        <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#052C87] text-[#FFF12E] text-xs font-bold font-mono">
              3
            </span>
            <CardTitle className="text-base font-bold uppercase tracking-wider font-subheading">
              Personalización Visual del Prompt
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Ajustá el estilo visual, iluminación, proporciones y detalles de marca antes de optimizar con Genkit.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual Style */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-subheading">
                Estilo Visual
              </Label>
              <Select value={visualStyle} onValueChange={setVisualStyle}>
                <SelectTrigger className="rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Elegí estilo visual" />
                </SelectTrigger>
                <SelectContent>
                  {VISUAL_STYLES.map((style) => (
                    <SelectItem key={style.id} value={style.id} className="text-xs">
                      <div className="py-0.5">
                        <div className="font-semibold">{style.label}</div>
                        <div className="text-[11px] text-muted-foreground">{style.desc}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Mode */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-subheading">
                Tema de Color
              </Label>
              <Select value={colorMode} onValueChange={setColorMode}>
                <SelectTrigger className="rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Elegí paleta o tema" />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_MODES.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id} className="text-xs">
                      {mode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-subheading">
                Aspect Ratio
              </Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="rounded-xl bg-background border-border text-xs">
                  <SelectValue placeholder="Elegí aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  {ASPECT_RATIOS.map((ratio) => (
                    <SelectItem key={ratio.id} value={ratio.id} className="text-xs font-mono">
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switches row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/20 border border-border/60">
              <div className="space-y-0.5 pr-2">
                <Label className="text-xs font-bold cursor-pointer">
                  Identidad Oficial Envíos DosRuedas
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Integra flota celeste, cajas de reparto amarillas y tipografía oficial.
                </p>
              </div>
              <Switch checked={brandEmphasis} onCheckedChange={setBrandEmphasis} />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/20 border border-border/60">
              <div className="space-y-0.5 pr-2">
                <Label className="text-xs font-bold cursor-pointer">
                  Generar 2 Variantes Alternativas
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Ofrece diferentes ángulos de cámara e iluminación de estudio.
                </p>
              </div>
              <Switch checked={generateVariants} onCheckedChange={setGenerateVariants} />
            </div>
          </div>

          {/* Custom user instructions */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-subheading">
              Instrucciones Específicas / Detalles Visuales Adicionales (Opcional)
            </Label>
            <Textarea
              placeholder="Ej: Destacar una pantalla flotante con un mapa de Mar del Plata trazando una ruta con puntos amarillos, iluminación tenue de atardecer en la costa..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="rounded-2xl bg-background border-border text-xs min-h-[70px]"
            />
          </div>

          {/* CTA Generate */}
          <div className="pt-2 flex justify-end">
            <Button
              onClick={handleGeneratePrompt}
              disabled={isPending || !selectedSection}
              className="bg-[#052C87] text-[#FFF12E] hover:bg-[#042268] text-xs font-bold uppercase tracking-wider px-6 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
            >
              {isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FFF12E]" />
                  <span>Optimizando Prompt con Genkit...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-[#FFF12E] group-hover:rotate-12 transition-transform" />
                  <span>Optimizar Prompt Visual con IA</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Results Display Card */}
      {result && (
        <Card className="rounded-3xl border-2 border-[#0950F6]/40 shadow-2xl overflow-hidden bg-card">
          <CardHeader className="bg-linear-to-r from-[#052C87] to-[#0950F6] text-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFF12E]" />
                  <CardTitle className="text-lg font-bold font-display uppercase tracking-wider text-white">
                    Prompt Visual Optimizado
                  </CardTitle>
                </div>
                <CardDescription className="text-blue-100 text-xs font-sans">
                  Sección: <strong className="text-[#FFF12E]">{selectedSection?.name}</strong> de la página{' '}
                  <strong className="text-white">{selectedPage?.title}</strong>
                </CardDescription>
              </div>

              {result.suggestedSettings && (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-[#FFF12E] text-[#052C87] hover:bg-[#FFF12E] font-bold text-[11px] font-mono">
                    Ratio: {result.suggestedSettings.aspectRatio}
                  </Badge>
                  <Badge className="bg-white/15 text-white hover:bg-white/20 text-[11px]">
                    {result.suggestedSettings.recommendedModel}
                  </Badge>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Design Rationale Callout */}
            {result.designRationale && (
              <div className="p-4 rounded-2xl bg-[#0950F6]/10 border border-[#0950F6]/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0950F6] text-[#FFF12E] shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-subheading">
                    Decisiones de Dirección de Arte & Composición
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {result.designRationale}
                  </p>
                </div>
              </div>
            )}

            {/* Prompt Tabs: EN / ES / Render */}
            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <TabsList className="bg-muted rounded-xl p-1">
                  <TabsTrigger value="en" className="rounded-lg text-xs font-bold tracking-wide">
                    🇬🇧 Inglés (Nano Banana / Midjourney)
                  </TabsTrigger>
                  <TabsTrigger value="es" className="rounded-lg text-xs font-bold tracking-wide">
                    🇪🇸 Español (Lenguaje Natural)
                  </TabsTrigger>
                  <TabsTrigger value="render" className="rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0950F6]" />
                    <span>Renderizar en Vivo</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  {activeTab === 'en' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(activePromptEn, 'en')}
                      className="rounded-xl text-xs flex items-center gap-1.5"
                    >
                      {copiedKey === 'en' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Inglés</span>
                    </Button>
                  )}
                  {activeTab === 'es' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(activePromptEs, 'es')}
                      className="rounded-xl text-xs flex items-center gap-1.5"
                    >
                      {copiedKey === 'es' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Español</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Tab EN */}
              <TabsContent value="en" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Label className="font-semibold">Prompt en Inglés (Arquitectura v2.0):</Label>
                    <span>Listo para copiar o renderizar directamente</span>
                  </div>
                  <Textarea
                    value={activePromptEn}
                    onChange={(e) => setActivePromptEn(e.target.value)}
                    className="font-mono text-xs leading-relaxed min-h-[140px] rounded-2xl bg-muted/30 border-border p-4"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab('render')}
                    className="bg-[#0950F6] hover:bg-[#0740c4] text-white text-xs font-bold rounded-xl flex items-center gap-2"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Enviar a Renderizar con Nano Banana</span>
                  </Button>
                </div>
              </TabsContent>

              {/* Tab ES */}
              <TabsContent value="es" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Label className="font-semibold">Prompt Descriptivo en Español:</Label>
                    <span>Descripción artística y visual para documentación o briefings</span>
                  </div>
                  <Textarea
                    value={activePromptEs}
                    onChange={(e) => setActivePromptEs(e.target.value)}
                    className="text-xs leading-relaxed min-h-[140px] rounded-2xl bg-muted/30 border-border p-4"
                  />
                </div>
              </TabsContent>

              {/* Tab Render */}
              <TabsContent value="render" className="pt-4">
                <div className="p-4 rounded-3xl bg-muted/20 border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-subheading">
                    Renderizador Directo (Nano Banana Pro)
                  </h4>
                  <ImageRenderer
                    prompt={activePromptEn}
                    aspectRatio={aspectRatio}
                    suggestedFileName={`web-${selectedPage?.id}-${selectedSection?.id}`}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Alternative Variants (If enabled & available) */}
            {result.variants && result.variants.length > 0 && (
              <div className="pt-6 border-t border-border space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-subheading flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0950F6]" />
                  Variantes Alternativas Generadas ({result.variants.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.variants.map((variant, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-muted/20 border border-border/80 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-[10px] font-mono">
                            Variante {idx + 1}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(variant, `var-${idx}`)}
                            className="h-7 px-2 text-[11px]"
                          >
                            {copiedKey === `var-${idx}` ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground line-clamp-4 leading-relaxed">
                          {variant}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActivePromptEn(variant);
                          setActiveTab('en');
                          toast({
                            title: 'Variante seleccionada',
                            description: `Se cargó la Variante ${idx + 1} en el prompt activo en inglés.`,
                          });
                        }}
                        className="w-full text-xs font-semibold rounded-xl"
                      >
                        Usar esta Variante en el Prompt Principal
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
