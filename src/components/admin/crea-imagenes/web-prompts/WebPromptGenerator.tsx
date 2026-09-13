'use client';

import React, { useState, useTransition, useMemo } from 'react';
import dynamic from 'next/dynamic';
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
import { optimizeWebSectionPromptAction } from '@/app/crear-prompts-webs/actions';
import type {
  ClientWebPageDoc as WebPageDoc,
  ClientWebSectionDoc as WebSectionDoc,
  VisualSlotDoc,
} from '@/lib/docs-contenido';
import type { GenerateWebSectionPromptOutput } from '@/ai/flows/generate-web-section-prompt';
import {
  Sparkles,
  Layout,
  Layers,
  Copy,
  Check,
  Wand2,
  Search,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Laptop,
  Box,
  CreditCard,
  FormInput,
  Star,
  Zap,
  HelpCircle,
  RefreshCw,
  Code2,
  Globe,
  FileText,
  Loader2,
  Terminal,
  FileCode,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

// Bundle Optimization (Vercel React Best Practices: bundle-dynamic-imports)
const DynamicImageRenderer = dynamic(
  () => import('../ImageRenderer').then((mod) => mod.ImageRenderer),
  {
    loading: () => (
      <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#0C59F2]" />
        <p className="text-xs font-subheading uppercase tracking-wider text-muted-foreground">
          Cargando motor de renderizado Nano Banana...
        </p>
      </div>
    ),
    ssr: false,
  }
);

interface WebPromptGeneratorProps {
  initialPagesDocs: WebPageDoc[];
}

const VISUAL_STYLES = [
  { id: 'Mockup UI 3D Isométrico Asimétrico', label: 'Bento 3D Isométrico Asimétrico', desc: 'Tarjetas flotantes en grilla 12 cols con profundidad, vidrio y sombras suaves.' },
  { id: 'Mockup Realista en Dispositivo (Laptop & Mobile)', label: 'Dispositivos de Alta Gama', desc: 'Pantallas renderizadas en MacBook Pro y iPhone con marco limpio de precisión.' },
  { id: 'Fotografía Urbana Mar del Plata con UI Integrada', label: 'Fotografía Urbana MDQ & UI', desc: 'Escenas reales de logística en Mar del Plata (Friuli 1972, Rambla) con módulos interactivos.' },
  { id: 'Glassmorphism Traslúcido de Estudio', label: 'Glassmorphism Traslúcido', desc: 'Vidrio esmerilado bg-white/10, reflejos reflectivos amarillos y fondo azul puro.' },
  { id: 'Minimalismo Editorial de Alto Contraste', label: 'Minimalista & Tipográfico', desc: 'Diseño ultra limpio, tipografía Anton y Bebas Neue con acento amarillo neón.' },
];

const COLOR_MODES = [
  { id: 'Tríada Oficial Envíos DosRuedas (#0C59F2 + #FFF12E + #FFFFFF)', label: 'Tríada Oficial (#0C59F2 Eléctrico + #FFF12E Neón + #FFFFFF Blanco)' },
  { id: 'Lienzo Azul Eléctrico (#0C59F2 con texto Blanco Puro #FFFFFF)', label: 'Lienzo Azul (#0C59F2 con texto Blanco y acentos Neón)' },
  { id: 'Superficie Blanca (#FFFFFF con títulos y acentos en #0C59F2)', label: 'Superficie Blanca (#FFFFFF con textos y botones en contraste)' },
  { id: 'Glassmorphic Transparente (bg-white/10 con borde white/20)', label: 'Glassmorphic Transparente (bg-white/10 con borde blanco sutil)' },
];

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 (Panorámico / Banner / Hero Card / HUD)' },
  { id: '1:1', label: '1:1 (Card Cuadrada / Scooter 3D / Social)' },
  { id: '4:3', label: '4:3 (Desktop Box / Módulo Bento Compacto)' },
  { id: '21:9', label: '21:9 (Ultrawide Header Cinemático / Fondo)' },
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

  // Stepper Flow: Step 1 = Page/Section, Step 2 = Visual Sub-part/Slot, Step 3 = Art Direction, Step 4 = Result & Code
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Search and filter state
  const [pageSearch, setPageSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Step 1 Selection state
  const defaultPage = initialPagesDocs.find((p) => p.id === 'contacto') || initialPagesDocs[0] || null;
  const [selectedPage, setSelectedPage] = useState<WebPageDoc | null>(defaultPage);
  const [selectedSection, setSelectedSection] = useState<WebSectionDoc | null>(
    defaultPage?.sections.find((s) => s.id === 'contacthero') || defaultPage?.sections[0] || null
  );

  // Step 2 Visual Sub-part / Slot selection state
  const defaultSlot = selectedSection?.visualSlots?.[0] || null;
  const [selectedSlot, setSelectedSlot] = useState<VisualSlotDoc | null>(defaultSlot);
  const [customSlotName, setCustomSlotName] = useState('');

  // Step 3 Art Direction parameters
  const [visualStyle, setVisualStyle] = useState('Mockup UI 3D Isométrico Asimétrico');
  const [colorMode, setColorMode] = useState('Tríada Oficial Envíos DosRuedas (#0C59F2 + #FFF12E + #FFFFFF)');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [brandEmphasis, setBrandEmphasis] = useState(true);
  const [generateVariants, setGenerateVariants] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');

  // Step 4 Output state
  const [result, setResult] = useState<GenerateWebSectionPromptOutput | null>(null);
  const [activePromptEn, setActivePromptEn] = useState<string>('');
  const [activePromptEs, setActivePromptEs] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'en' | 'es' | 'code' | 'render'>('en');

  // Performance Optimization: useMemo for list filtering (rerender-derived-state)
  const filteredPages = useMemo(() => {
    const search = pageSearch.toLowerCase().trim();
    return initialPagesDocs.filter((page) => {
      const matchesSearch =
        !search ||
        page.title.toLowerCase().includes(search) ||
        page.url.toLowerCase().includes(search) ||
        page.description.toLowerCase().includes(search);
      const matchesCategory =
        categoryFilter === 'all' ? true : page.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [initialPagesDocs, pageSearch, categoryFilter]);

  const handleSelectPage = (page: WebPageDoc) => {
    setSelectedPage(page);
    const firstSec = page.sections[0] || null;
    setSelectedSection(firstSec);
    setSelectedSlot(firstSec?.visualSlots?.[0] || null);
  };

  const handleSelectSection = (section: WebSectionDoc) => {
    setSelectedSection(section);
    const firstSlot = section.visualSlots?.[0] || null;
    setSelectedSlot(firstSlot);
    if (firstSlot?.suggestedAspectRatio) {
      setAspectRatio(firstSlot.suggestedAspectRatio);
    }
  };

  const handleSelectSlot = (slot: VisualSlotDoc) => {
    setSelectedSlot(slot);
    if (slot.suggestedAspectRatio) {
      setAspectRatio(slot.suggestedAspectRatio);
    }
    if (slot.suggestedPromptFocus && !customInstructions) {
      setCustomInstructions(slot.suggestedPromptFocus);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast({
      title: 'Copiado al portapapeles',
      description: 'El contenido ha sido copiado con éxito.',
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
      const slotFinalName =
        selectedSlot?.id === 'custom-slot' && customSlotName.trim()
          ? customSlotName.trim()
          : selectedSlot?.name || selectedSection.name;

      const res = await optimizeWebSectionPromptAction({
        pageId: selectedPage.id,
        sectionId: selectedSection.id,
        slotId: selectedSlot?.id,
        slotName: slotFinalName,
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
        setCurrentStep(4);
        setActiveTab('en');
        toast({
          title: '¡Prompt y Código Generados!',
          description: `Variante optimizada para ${selectedSection.componentName || selectedSection.name}.`,
        });
      } else {
        toast({
          title: 'Error al generar',
          description: res.error || 'No se pudo generar el prompt y código.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Interactive Step Navigation Bar */}
      <div className="bg-card border border-border/80 rounded-2xl p-3 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { step: 1, label: '1. Página & Componente', desc: 'docs/contenido' },
            { step: 2, label: '2. Sub-parte / Slot Visual', desc: selectedSlot ? selectedSlot.name : 'Elegir slot' },
            { step: 3, label: '3. Dirección de Arte', desc: 'Tríada y Estilo' },
            { step: 4, label: '4. Prompt & Código TSX', desc: result ? 'Generado' : 'Resultado' },
          ].map((item) => {
            const isActive = currentStep === item.step;
            const isDone = currentStep > item.step;
            return (
              <button
                key={item.step}
                onClick={() => {
                  if (item.step === 4 && !result) return;
                  setCurrentStep(item.step as 1 | 2 | 3 | 4);
                }}
                disabled={item.step === 4 && !result}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between border cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
                  isActive
                    ? 'bg-[#0C59F2] text-white border-[#0C59F2] shadow-[0_0_15px_rgba(12,89,242,0.25)]'
                    : isDone
                    ? 'bg-muted/40 text-foreground border-border/70 hover:border-[#0C59F2]/50'
                    : 'bg-background text-muted-foreground border-border/40 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold font-subheading uppercase tracking-wider ${isActive ? 'text-[#FFF12E]' : ''}`}>
                    {item.label}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                  ) : null}
                </div>
                <span className={`text-[11px] truncate mt-1 ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Page & Component Selection */}
      {currentStep === 1 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Page Selection (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0C59F2] text-[#FFF12E] text-xs font-bold font-mono">
                    1A
                  </span>
                  <h2 className="text-base font-bold uppercase tracking-wider text-foreground font-subheading">
                    Página del Sitio
                  </h2>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {filteredPages.length} páginas
                </span>
              </div>

              {/* Search & Categories */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar página (ej: contacto, home, express)..."
                    value={pageSearch}
                    onChange={(e) => setPageSearch(e.target.value)}
                    className="pl-9 text-xs rounded-xl bg-card border-border/80 focus-visible:ring-1 focus-visible:ring-[#0C59F2]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'contacto', label: 'Contacto' },
                    { id: 'home', label: 'Inicio' },
                    { id: 'servicios', label: 'Servicios' },
                    { id: 'cotizadores', label: 'Cotizadores' },
                    { id: 'nosotros', label: 'Nosotros' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-all font-subheading ${
                        categoryFilter === cat.id
                          ? 'bg-[#0C59F2] text-[#FFF12E] shadow-[0_0_15px_rgba(12,89,242,0.3)]'
                          : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pages List */}
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filteredPages.map((page) => {
                  const isSelected = selectedPage?.id === page.id;
                  return (
                    <div
                      key={page.id}
                      onClick={() => handleSelectPage(page)}
                      className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-[#0C59F2]/5 border-[#0C59F2] shadow-md ring-2 ring-[#0C59F2]'
                          : 'bg-card hover:bg-muted/40 border-border/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground group-hover:text-[#0C59F2] transition-colors">
                              {page.title}
                            </h3>
                            {page.id === 'contacto' ? (
                              <Badge className="text-[10px] py-0 px-2 rounded-full bg-[#FFF12E] text-[#0C59F2] border-none font-bold uppercase tracking-wider">
                                Destacado
                              </Badge>
                            ) : null}
                          </div>
                          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                            {page.url}
                          </p>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 mt-1 transition-transform ${
                            isSelected
                              ? 'text-[#0C59F2] translate-x-1'
                              : 'text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5'
                          }`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5 font-sans">
                        {page.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Component Selection (Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0C59F2] text-[#FFF12E] text-xs font-bold font-mono">
                    1B
                  </span>
                  <h2 className="text-base font-bold uppercase tracking-wider text-foreground font-subheading">
                    Componente Visual ({selectedPage ? selectedPage.title : 'Seleccioná una página'})
                  </h2>
                </div>
                {selectedSection ? (
                  <Badge variant="outline" className="text-[10px] font-mono border-[#0C59F2]/30 text-[#0C59F2] bg-[#0C59F2]/5">
                    {selectedSection.componentName || selectedSection.id}.tsx
                  </Badge>
                ) : null}
              </div>

              {selectedPage ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Elegí el componente que querés ilustrar o mejorar con un asset visual de producción.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {selectedPage.sections.map((section) => {
                      const isSelected = selectedSection?.id === section.id;
                      const Icon = getSectionIcon(section.type);
                      const hasProcedural = Boolean(section.proceduralVariant);
                      const hasSlots = (section.visualSlots?.length || 0) > 0;

                      return (
                        <div
                          key={section.id}
                          onClick={() => handleSelectSection(section)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0C59F2]/8 border-[#0C59F2] shadow-md ring-2 ring-[#0C59F2]'
                              : 'bg-card hover:bg-muted/40 border-border/70'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="p-2 rounded-xl bg-background border border-border shadow-xs text-primary">
                                <Icon className="w-4 h-4 text-[#0C59F2]" />
                              </div>
                              <div className="flex items-center gap-1.5">
                                {hasProcedural ? (
                                  <Badge className="text-[9px] bg-[#FFF12E] text-[#0950F6] border-none font-bold uppercase">
                                    Hero BG
                                  </Badge>
                                ) : null}
                                <Badge
                                  variant="outline"
                                  className="text-[10px] uppercase tracking-wider font-subheading rounded-full border-[#0C59F2]/20 text-[#0C59F2]"
                                >
                                  {section.type}
                                </Badge>
                              </div>
                            </div>
                            <h4 className="text-xs font-bold text-foreground mt-2">
                              {section.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 font-sans">
                              {section.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                            <span className="flex items-center gap-1 truncate">
                              <Code2 className="w-3 h-3 text-[#0C59F2]" />
                              <span className="truncate">{section.componentName || section.id}.tsx</span>
                            </span>
                            {hasSlots ? (
                              <span className="text-[#0C59F2] font-semibold">
                                {section.visualSlots.length} slots
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 1 Next Button */}
                  <div className="pt-3 flex justify-end">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedSection}
                      className="bg-[#0C59F2] hover:bg-[#0C59F2]/90 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-full shadow-[0_0_20px_rgba(12,89,242,0.25)] flex items-center gap-2 font-subheading cursor-pointer"
                    >
                      <span>Siguiente: Elegir Sub-parte Visual</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed rounded-3xl text-muted-foreground">
                  Seleccioná primero una página a la izquierda.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* STEP 2: Visual Sub-part / Slot Selection */}
      {currentStep === 2 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0C59F2] text-[#FFF12E] text-xs font-bold font-mono">
                  2
                </span>
                <h2 className="text-lg font-bold uppercase tracking-wider font-subheading text-foreground">
                  ¿Qué parte visual específica querés generar en {selectedSection?.componentName || selectedSection?.name}?
                </h2>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Elegí si querés sustituir un fondo procedimental por una imagen de producción, generar una tarjeta HUD, o ilustrar la sección completa.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(1)}
              className="rounded-full text-xs font-subheading uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Cambiar Componente</span>
            </Button>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(selectedSection?.visualSlots || []).map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isImageReplacement = slot.type === 'image-replacement';

              return (
                <div
                  key={slot.id}
                  onClick={() => handleSelectSlot(slot)}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#0C59F2]/8 border-[#0C59F2] shadow-lg ring-2 ring-[#0C59F2]'
                      : 'bg-card hover:bg-muted/40 border-border/80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        className={`text-[10px] font-bold uppercase tracking-wider font-subheading ${
                          isImageReplacement
                            ? 'bg-[#FFF12E] text-[#0950F6] border-none shadow-[0_0_10px_rgba(255,241,46,0.3)]'
                            : 'bg-[#0C59F2]/10 text-[#0C59F2] border-none'
                        }`}
                      >
                        {slot.slotBadge || slot.type}
                      </Badge>
                      <span className="text-[11px] font-mono font-bold text-muted-foreground">
                        Ratio: {slot.suggestedAspectRatio}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground leading-tight">
                      {slot.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {slot.description}
                    </p>
                  </div>

                  {slot.targetCodeSnippet ? (
                    <div className="pt-2 border-t border-border/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0C59F2] font-subheading flex items-center gap-1 mb-1">
                        <Terminal className="w-3 h-3" />
                        Código detectado en docs/contenido:
                      </span>
                      <pre className="text-[10px] font-mono bg-muted/70 p-2.5 rounded-xl text-muted-foreground overflow-x-auto max-h-24">
                        {slot.targetCodeSnippet}
                      </pre>
                    </div>
                  ) : null}

                  {slot.id === 'custom-slot' && isSelected ? (
                    <div className="pt-2 space-y-1.5" onClick={(e) => e.stopPropagation()}>
                      <Label className="text-[11px] font-bold text-foreground">
                        Nombre de la parte personalizada:
                      </Label>
                      <Input
                        placeholder="Ej: Ilustración 3D de caja de embalaje con precinto de seguridad"
                        value={customSlotName}
                        onChange={(e) => setCustomSlotName(e.target.value)}
                        className="text-xs rounded-xl"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Navigation to Step 3 */}
          <div className="flex items-center justify-between pt-4 border-t border-border/70">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(1)}
              className="rounded-full text-xs font-subheading uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Volver a Componentes</span>
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              disabled={!selectedSlot}
              className="bg-[#0C59F2] hover:bg-[#0C59F2]/90 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_0_20px_rgba(12,89,242,0.25)] flex items-center gap-2 font-subheading cursor-pointer"
            >
              <span>Siguiente: Dirección de Arte & Estilo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : null}

      {/* STEP 3: Art Direction & Design System Configuration */}
      {currentStep === 3 ? (
        <Card className="rounded-3xl border border-[#0C59F2]/15 shadow-[0_20px_40px_-15px_rgba(12,89,242,0.1)] overflow-hidden bg-card">
          <CardHeader className="bg-muted/30 border-b border-border/60 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0C59F2] text-[#FFF12E] text-xs font-bold font-mono">
                  3
                </span>
                <CardTitle className="text-base font-bold uppercase tracking-wider font-subheading">
                  Dirección de Arte & Tríada Oficial DosRuedas
                </CardTitle>
              </div>
              <Badge className="bg-[#FFF12E] text-[#0950F6] border-none font-bold uppercase text-[10px]">
                {selectedSlot?.name || selectedSection?.name}
              </Badge>
            </div>
            <CardDescription className="text-xs font-sans">
              Personalizá el acabado fotográfico o 3D y asegurá el cumplimiento estricto de la tríada (#0C59F2, #FFF12E, #FFFFFF).
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
                  <SelectTrigger className="rounded-xl bg-background border-border text-xs focus:ring-1 focus:ring-[#0C59F2]">
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
                  Tema de Color (Tríada Estricta)
                </Label>
                <Select value={colorMode} onValueChange={setColorMode}>
                  <SelectTrigger className="rounded-xl bg-background border-border text-xs focus:ring-1 focus:ring-[#0C59F2]">
                    <SelectValue placeholder="Elegí paleta" />
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
                  Aspect Ratio Sugerido
                </Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="rounded-xl bg-background border-border text-xs focus:ring-1 focus:ring-[#0C59F2]">
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
                  <p className="text-[11px] text-muted-foreground font-sans">
                    Fuerza la tríada pura (#0C59F2, #FFF12E, #FFFFFF), flota eléctrica y cajas amarillas.
                  </p>
                </div>
                <Switch checked={brandEmphasis} onCheckedChange={setBrandEmphasis} />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/20 border border-border/60">
                <div className="space-y-0.5 pr-2">
                  <Label className="text-xs font-bold cursor-pointer">
                    Generar 2-3 Variantes Alternativas
                  </Label>
                  <p className="text-[11px] text-muted-foreground font-sans">
                    Ofrece perspectivas cinemáticas, consola holográfica y vistas de estudio.
                  </p>
                </div>
                <Switch checked={generateVariants} onCheckedChange={setGenerateVariants} />
              </div>
            </div>

            {/* Custom user instructions */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-subheading">
                Detalles Específicos o Requerimientos Adicionales (Opcional)
              </Label>
              <Textarea
                placeholder="Ej: Destacar la moto eléctrica urbana con caja cúbica amarilla neón #FFF12E en Friuli 1972 con interfaz de ruteo holográfico..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="rounded-2xl bg-background border-border text-xs min-h-[80px] focus:ring-1 focus:ring-[#0C59F2]"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex items-center justify-between border-t border-border/70">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(2)}
                className="rounded-full text-xs font-subheading uppercase"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Volver a Sub-partes</span>
              </Button>

              <Button
                onClick={handleGeneratePrompt}
                disabled={isPending || !selectedSection}
                className="bg-[#FFF12E] text-[#0950F6] hover:bg-[#FFF12E]/90 text-sm font-bold uppercase tracking-wider px-8 py-5 rounded-full shadow-[0_0_25px_rgba(255,241,46,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group cursor-pointer font-subheading"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0950F6]" />
                    <span>Generando Prompt y Código TSX con Genkit...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-[#0950F6] group-hover:rotate-12 transition-transform" />
                    <span>Optimizar Prompt & Generar Código TSX</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* STEP 4: Results Display Card (Prompt + Code + Live Render) */}
      {currentStep === 4 && result ? (
        <Card className="rounded-3xl border-2 border-[#0C59F2]/30 shadow-[0_20px_40px_-15px_rgba(12,89,242,0.2)] overflow-hidden bg-card">
          <CardHeader className="bg-[#0C59F2] text-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFF12E]" />
                  <CardTitle className="text-lg font-bold font-display uppercase tracking-tight text-white">
                    Prompt Visual & Variante de Código Mejorada
                  </CardTitle>
                </div>
                <CardDescription className="text-white/80 text-xs font-sans">
                  Sub-parte: <strong className="text-[#FFF12E]">{selectedSlot?.name || selectedSection?.name}</strong> en{' '}
                  <strong className="text-white">{selectedSection?.componentName || selectedSection?.name}.tsx</strong> ({selectedPage?.title})
                </CardDescription>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(3)}
                  className="rounded-full text-xs font-subheading uppercase bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                  <span>Ajustar Parámetros</span>
                </Button>
                {result.suggestedSettings ? (
                  <Badge className="bg-[#FFF12E] text-[#0950F6] font-bold text-[11px] font-mono rounded-full px-3">
                    Ratio: {result.suggestedSettings.aspectRatio}
                  </Badge>
                ) : null}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Design Rationale Callout */}
            {result.designRationale ? (
              <div className="p-4 rounded-2xl bg-[#0C59F2]/8 border border-[#0C59F2]/20 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0C59F2] text-[#FFF12E] shrink-0 mt-0.5 shadow-sm">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-subheading">
                    Decisiones de Dirección de Arte & Composición (Sistema Envíos DosRuedas)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">
                    {result.designRationale}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Prompt & Code Tabs */}
            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
              <div className="flex flex-wrap items-center justify-between border-b border-border pb-2 gap-2">
                <TabsList className="bg-muted rounded-xl p-1 flex-wrap">
                  <TabsTrigger value="en" className="rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 font-subheading uppercase">
                    <Globe className="w-3.5 h-3.5 text-[#0C59F2]" />
                    <span>Prompt Inglés (Difusión)</span>
                  </TabsTrigger>
                  <TabsTrigger value="es" className="rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 font-subheading uppercase">
                    <FileText className="w-3.5 h-3.5 text-[#0C59F2]" />
                    <span>Prompt Español (Arte)</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 font-subheading uppercase">
                    <FileCode className="w-3.5 h-3.5 text-[#0C59F2]" />
                    <span>Código TSX Mejorado</span>
                  </TabsTrigger>
                  <TabsTrigger value="render" className="rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 font-subheading uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#0C59F2]" />
                    <span>Renderizar en Vivo</span>
                  </TabsTrigger>
                </TabsList>

                {/* Quick Copy Buttons */}
                <div className="flex items-center gap-2">
                  {activeTab === 'en' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(activePromptEn, 'en')}
                      className="rounded-full text-xs flex items-center gap-1.5 border-[#0C59F2]/30 text-[#0C59F2] hover:bg-[#0C59F2]/10"
                    >
                      {copiedKey === 'en' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Prompt EN</span>
                    </Button>
                  ) : null}
                  {activeTab === 'code' && result.improvedCodeSnippet ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(result.improvedCodeSnippet, 'code')}
                      className="rounded-full text-xs flex items-center gap-1.5 border-[#0C59F2]/30 text-[#0C59F2] hover:bg-[#0C59F2]/10"
                    >
                      {copiedKey === 'code' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Código TSX</span>
                    </Button>
                  ) : null}
                </div>
              </div>

              {/* Tab EN */}
              <TabsContent value="en" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Label className="font-semibold text-foreground">Prompt en Inglés (Arquitectura v2.0):</Label>
                    <span className="font-mono">Listo para Nano Banana Pro / Midjourney / FLUX</span>
                  </div>
                  <Textarea
                    value={activePromptEn}
                    onChange={(e) => setActivePromptEn(e.target.value)}
                    className="font-mono text-xs leading-relaxed min-h-[140px] rounded-2xl bg-muted/30 border-border p-4 focus:ring-1 focus:ring-[#0C59F2]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab('render')}
                    className="bg-[#0C59F2] hover:bg-[#0C59F2]/90 text-white text-xs font-bold rounded-full px-6 flex items-center gap-2 font-subheading uppercase tracking-wider shadow-[0_0_20px_rgba(12,89,242,0.25)] cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[#FFF12E]" />
                    <span>Renderizar en Vivo con Nano Banana</span>
                  </Button>
                </div>
              </TabsContent>

              {/* Tab ES */}
              <TabsContent value="es" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Label className="font-semibold text-foreground">Prompt Descriptivo en Español:</Label>
                    <span className="font-mono">Descripción conceptual y artística</span>
                  </div>
                  <Textarea
                    value={activePromptEs}
                    onChange={(e) => setActivePromptEs(e.target.value)}
                    className="text-xs leading-relaxed min-h-[140px] rounded-2xl bg-muted/30 border-border p-4 font-sans focus:ring-1 focus:ring-[#0C59F2]"
                  />
                </div>
              </TabsContent>

              {/* Tab Code (TSX Improved Component Variant) */}
              <TabsContent value="code" className="pt-4 space-y-4">
                <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold font-subheading uppercase text-[#0C59F2]">
                    <Terminal className="w-4 h-4" />
                    <span>Instrucciones de Integración en el Componente</span>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-pre-line font-sans">
                    {result.codeIntegrationAdvice}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-muted-foreground">
                    <span>Archivo sugerido para guardar:</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-[#0C59F2]/40 text-[#0C59F2]">
                      public/images/{result.suggestedSettings?.suggestedFileName || 'hero-visual-asset.webp'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Label className="font-semibold text-foreground">
                      Variante Mejorada TSX (Sustituye la sub-parte en {selectedSection?.componentName || selectedSection?.name}.tsx):
                    </Label>
                    <span className="font-mono text-[#0C59F2] font-semibold">Next.js Image · WCAG AAA · Vercel LCP</span>
                  </div>
                  <pre className="text-xs font-mono leading-relaxed min-h-[200px] max-h-[380px] overflow-y-auto rounded-2xl bg-muted/40 border border-border p-4 text-foreground">
                    <code>{result.improvedCodeSnippet}</code>
                  </pre>
                </div>
              </TabsContent>

              {/* Tab Render: Lazy loaded via dynamic import */}
              <TabsContent value="render" className="pt-4">
                <div className="p-4 rounded-3xl bg-muted/20 border border-border/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-subheading">
                    Renderizador Directo (Nano Banana Pro)
                  </h4>
                  <DynamicImageRenderer
                    prompt={activePromptEn}
                    aspectRatio={aspectRatio}
                    suggestedFileName={result.suggestedSettings?.suggestedFileName || `web-${selectedPage?.id}-${selectedSection?.id}`}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Alternative Variants */}
            {result.variants && result.variants.length > 0 ? (
              <div className="pt-6 border-t border-border space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-subheading flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0C59F2]" />
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
                          <Badge variant="secondary" className="text-[10px] font-mono rounded-full px-2.5 bg-[#0C59F2]/10 text-[#0C59F2] border-none font-bold">
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
                        className="w-full text-xs font-semibold rounded-full border-[#0C59F2]/30 text-[#0C59F2] hover:bg-[#0C59F2]/10 font-subheading uppercase tracking-wider cursor-pointer"
                      >
                        Usar esta Variante en el Prompt Principal
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
