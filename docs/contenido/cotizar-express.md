# 📄 Nodo: Cotizador Express

> **URL:** `/cotizar/express`  
> **Path Relativa Página:** `src/app/cotizar/express/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/cotizar/express/page.tsx` | Server Component [SC] |
| Componente | `src/components/cotizar/express/CotizadorExpressHero.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/express/CotizadorExpressForm.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/express/CotizadorExpressDetails.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/express/CotizadorExpressHelp.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/cotizar/express/page.tsx`)

```tsx
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/src/lib/prisma';
import { PriceRange } from '@/generated/prisma/client';
import CotizadorExpressHero from '@/src/components/cotizar/express/CotizadorExpressHero';
import CotizadorExpressForm from '@/src/components/cotizar/express/CotizadorExpressForm';
import CotizadorExpressDetails from '@/src/components/cotizar/express/CotizadorExpressDetails';
import CotizadorExpressHelp from '@/src/components/cotizar/express/CotizadorExpressHelp';

const baseUrl = 'https://www.enviosdosruedas.com';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cotizador de Envíos Express en Moto | Mar del Plata | Envíos DosRuedas',
  description:
    'Calculá el costo exacto de tu envío prioritario en Mar del Plata. Tarifas transparentes por kilómetro, entrega en el día y coordinación en el acto.',
  alternates: {
    canonical: `${baseUrl}/cotizar/express`,
  },
  openGraph: {
    title: 'Cotizá tu Envío Express en Moto | Mar del Plata | Envíos DosRuedas',
    description:
      'Calculá al instante el valor de tu envío express en Mar del Plata. Tarifas transparentes 2026.',
    url: `${baseUrl}/cotizar/express`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cotizador de Envíos Express Envíos DosRuedas',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  url: `${baseUrl}/cotizar/express`,
  description:
    'Herramienta interactiva para calcular tarifas y distancias de envíos express en moto en Mar del Plata.',
  provider: {
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'Envíos DosRuedas',
    telephone: '+54-223-660-2699',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Friuli 1972',
      addressLocality: 'Mar del Plata',
      addressRegion: 'Buenos Aires',
      postalCode: '7600',
      addressCountry: 'AR',
    },
  },
};

async function ExpressFormAsync() {
  let priceRanges: PriceRange[] = [];
  try {
    priceRanges = await prisma.priceRange.findMany();
  } catch (error) {
    console.error('Error fetching price ranges from Prisma Postgres:', error);
  }
  return <CotizadorExpressForm priceRanges={priceRanges} />;
}

function FormSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-pulse">
      <div className="lg:col-span-7 h-[540px] bg-white/10 rounded-[28px] border border-white/20" />
      <div className="lg:col-span-5 h-[540px] bg-[#052C87] rounded-[28px] border border-white/10" />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div id="cotizar-express-page" className="w-full bg-[#0950F6] text-white min-h-screen relative overflow-hidden font-sans">
        {/* Hero Section — Rendered and Streamed Immediately */}
        <CotizadorExpressHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 relative z-10">
          {/* 1. Main Quote Form Streamed with Suspense */}
          <main className="w-full font-sans">
            <Suspense fallback={<FormSkeleton />}>
              <ExpressFormAsync />
            </Suspense>
          </main>

          {/* 2. Detail Guidelines */}
          <div className="font-sans">
            <CotizadorExpressDetails />
          </div>

          {/* 3. Help Contact Banner */}
          <div className="font-sans">
            <CotizadorExpressHelp />
          </div>
        </div>
      </div>
    </>
  );
}

```

---

## 2. Componente: `CotizadorExpressHero.tsx`

> **Path Relativa:** `src/components/cotizar/express/CotizadorExpressHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Clock,
  Navigation,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import HeroProceduralBackground from '@/src/components/ui/HeroProceduralBackground';

const SIMULATED_EXPRESS_TRIPS = [
  {
    origen: 'Terminal Ferroautomotora',
    destino: 'B° Stella Maris',
    distancia: '3.7 km',
    tarifa: '$4.600 ARS',
  },
  {
    origen: 'Centro de Distribución (Av. Colón 1200)',
    destino: 'Zona Güemes (Centro)',
    distancia: '2.8 km',
    tarifa: '$3.700 ARS',
  },
  {
    origen: 'Av. Constitución 5500',
    destino: 'Plaza Mitre',
    distancia: '5.8 km',
    tarifa: '$6.100 ARS',
  },
  {
    origen: 'Puerto Mar del Plata',
    destino: 'Punta Mogotes',
    distancia: '7.4 km',
    tarifa: '$8.200 ARS',
  },
];

export default function CotizadorExpressHero() {
  const [tripIndex, setTripIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTripIndex((prev) => (prev + 1) % SIMULATED_EXPRESS_TRIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentTrip = SIMULATED_EXPRESS_TRIPS[tripIndex];

  return (
    <section
      id="cotizador-express-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[72vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Dynamic Procedural Background */}
      <HeroProceduralBackground variant="express" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Headline & Value Proposition (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Glowing Pill Badge with velocity tilt */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-subheading font-bold uppercase tracking-wider bg-[#052C87]/90 text-[#FFF12E] border-2 border-[#FFF12E]/50 -rotate-1 shadow-glow-yellow backdrop-blur-md">
              <Zap className="h-4 w-4 text-[#FFF12E] shrink-0 fill-[#FFF12E]" />
              <span>SERVICIO EXPRESS PRIORITARIO</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.92] text-white">
              <span>COTIZÁ TU </span>
              <span className="text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.4)]">
                ENVÍO{' '}
              </span>
              <span className="block sm:inline">EXPRESS</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Calculá el costo de tu envío prioritario al instante. Obtené la tarifa de entrega según la distancia y coordiná en el acto con nosotros por WhatsApp.
            </p>

            {/* Feature Pills Row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <Clock className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Entrega en &lt; 2 Horas</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <Navigation className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Ruta Optimizada</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Tarifa 100% Precisa</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Double Bezel Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full max-w-lg mx-auto"
          >
            {/* Double Bezel Outer Frame */}
            <div className="p-2.5 sm:p-3 rounded-[28px] sm:rounded-[30px] bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md">
              {/* Inner Midnight Card */}
              <div className="bg-[#052C87] rounded-[20px] p-6 sm:p-8 text-white border border-white/10 shadow-lg space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between border-b border-white/15 pb-4">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none">
                      CÁLCULO AUTOMÁTICO
                    </h3>
                    <p className="font-subheading text-[11px] sm:text-xs uppercase tracking-widest text-[#FFF12E] mt-1 font-bold">
                      SISTEMA EXPRESS MAPS
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/20 text-[#FFF12E] shrink-0">
                    <Calculator className="h-5 w-5" />
                  </div>
                </div>

                {/* Simulated Values with Animated Transitions */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tripIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* ORIGEN */}
                    <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                      <span className="font-subheading text-xs uppercase tracking-wider font-bold text-[#FFF12E]">
                        ORIGEN
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-white text-right truncate max-w-[210px]">
                        {currentTrip.origen}
                      </span>
                    </div>

                    {/* DESTINO */}
                    <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                      <span className="font-subheading text-xs uppercase tracking-wider font-bold text-[#FFF12E]">
                        DESTINO
                      </span>
                      <span className="font-sans text-xs sm:text-sm font-semibold text-white text-right truncate max-w-[210px]">
                        {currentTrip.destino}
                      </span>
                    </div>

                    {/* DISTANCIA */}
                    <div className="flex items-center justify-between py-1.5 border-b border-white/15">
                      <span className="font-subheading text-xs uppercase tracking-wider font-bold text-[#FFF12E]">
                        DISTANCIA
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white tabular-nums">
                        {currentTrip.distancia}
                      </span>
                    </div>

                    {/* TARIFA FINAL */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-subheading text-sm uppercase tracking-wider font-bold text-white">
                        TARIFA FINAL
                      </span>
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[#FFF12E] tabular-nums">
                        {currentTrip.tarifa}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Centered Yellow Badge */}
                <div className="pt-3 flex justify-center">
                  <span className="px-4 py-1.5 rounded-full border border-[#FFF12E]/40 bg-[#FFF12E]/10 text-[#FFF12E] font-subheading text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    SIN REGISTRO OBLIGATORIO
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

```

---

## 3. Componente: `CotizadorExpressForm.tsx`

> **Path Relativa:** `src/components/cotizar/express/CotizadorExpressForm.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight, User, Phone, Package, MapPin } from 'lucide-react';
import AddressAutocomplete from '../../ui/AddressAutocomplete';
import DynamicRouteMap from '../../ui/DynamicRouteMap';
import { useGoogleRoute, type Coordinate } from '@/src/hooks/useGoogleRoute';
import { type PriceRangeProp } from '@/src/lib/pricing';
import { calculateQuoteAction, type QuoteState } from '@/src/actions/quote';

export default function CotizadorExpressForm({ priceRanges = [] }: { priceRanges?: PriceRangeProp[] }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [producto, setProducto] = useState('');
  const [origenCoords, setOrigenCoords] = useState<Coordinate | null>(null);
  const [destinoCoords, setDestinoCoords] = useState<Coordinate | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [, startTransition] = useTransition();
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    distancia: number;
    precio: number | 'consultar';
  } | null>(null);

  const { fetchRoute } = useGoogleRoute();
  const initialState: QuoteState = { success: false, price: null, error: null };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (!origenCoords || !destinoCoords) {
        setError('Por favor, elegí direcciones válidas de la lista desplegable de sugerencias.');
        return;
      }

      setIsCalculating(true);
      setCalculated(false);
      setError(null);

      const route = await fetchRoute(origenCoords, destinoCoords);

      if (!route) {
        setError('No se pudo calcular la ruta. Por favor, intentá de nuevo en unos momentos.');
        setIsCalculating(false);
        return;
      }

      setRouteCoords(route.routeCoords);

      const formData = new FormData();
      formData.append('distanceKm', route.distanceKm.toString());
      formData.append('serviceType', 'EXPRESS');
      formData.append('priceRanges', JSON.stringify(priceRanges));

      const actionResult = await calculateQuoteAction(initialState, formData);

      if (!actionResult.success) {
        setError(actionResult.error || 'Error al calcular el valor del envío');
        setIsCalculating(false);
        return;
      }

      setResult({
        distancia: route.distanceKm,
        precio: actionResult.price!,
      });
      setCalculated(true);
      setIsCalculating(false);
    });
  };

  const getWhatsAppLink = () => {
    if (!result) return '#';
    const priceText = result.precio === 'consultar' ? 'A convenir (Excede radio estándar)' : `$${result.precio.toLocaleString('es-AR')}`;
    const text = `¡Hola Envíos DosRuedas! Quiero coordinar un Envío Express cotizado en la web:
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
📦 *Producto:* ${producto}
📍 *Origen:* ${origen}
🏁 *Destino:* ${destino}
📏 *Distancia:* ${result.distancia} km
💵 *Tarifa Express 2026:* ${priceText}`;
    return `https://wa.me/542236602699?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="cotizador-express-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Form Input & Results Panel (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 flex flex-col justify-between h-full text-white relative overflow-hidden">
          {/* Visual Watermark in bottom right */}
          <Calculator
            className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-6 relative z-10">
            <div>
              <span className="px-3.5 py-1 bg-white/10 text-[#FFF12E] rounded-full text-xs font-subheading font-bold tracking-wider uppercase border border-white/20 -rotate-1 shadow-glow-yellow inline-block">
                Cotización Al Instante · Mar del Plata
              </span>
              <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white mt-3">
                Calculá tu Envío Express
              </h2>
              <p className="text-white/80 text-sm font-sans mt-1 leading-relaxed">
                Ingresá las direcciones de origen y destino en Mar del Plata para obtener tarifa exacta y ruta OSRM en tiempo real.
              </p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Origen */}
              <div className="space-y-1.5">
                <label htmlFor="origen-input" className="text-xs font-subheading uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#FFF12E]" />
                  Dirección de Origen (Retiro)
                </label>
                <AddressAutocomplete
                  id="origen-input"
                  placeholder="Ej: Av. Colón 1234, Mar del Plata"
                  value={origen}
                  onChange={setOrigen}
                  onSelectCoordinate={setOrigenCoords}
                  required
                  className="w-full h-11 bg-white/5 border-2 border-[#0950F6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] rounded-xl px-4 text-sm transition-all text-white placeholder:text-white/40 font-sans"
                />
              </div>

              {/* Destino */}
              <div className="space-y-1.5">
                <label htmlFor="destino-input" className="text-xs font-subheading uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#FFF12E]" />
                  Dirección de Destino (Entrega)
                </label>
                <AddressAutocomplete
                  id="destino-input"
                  placeholder="Ej: Juan B. Justo 5678, Mar del Plata"
                  value={destino}
                  onChange={setDestino}
                  onSelectCoordinate={setDestinoCoords}
                  required
                  className="w-full h-11 bg-white/5 border-2 border-[#0950F6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] rounded-xl px-4 text-sm transition-all text-white placeholder:text-white/40 font-sans"
                />
              </div>

              {/* Nombre y Teléfono en Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="nombre-input" className="text-xs font-subheading uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#FFF12E]" />
                    Nombre
                  </label>
                  <input
                    id="nombre-input"
                    type="text"
                    aria-label="Nombre"
                    placeholder="Tu nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full h-11 bg-white/5 border-2 border-[#0950F6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] rounded-xl px-4 text-sm transition-all text-white placeholder:text-white/40 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="telefono-input" className="text-xs font-subheading uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#FFF12E]" />
                    Teléfono
                  </label>
                  <input
                    id="telefono-input"
                    type="tel"
                    aria-label="Teléfono"
                    placeholder="Tu teléfono de contacto"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w-full h-11 bg-white/5 border-2 border-[#0950F6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] rounded-xl px-4 text-sm transition-all text-white placeholder:text-white/40 font-mono tabular-nums"
                  />
                </div>
              </div>

              {/* Producto */}
              <div className="space-y-1.5">
                <label htmlFor="producto-input" className="text-xs font-subheading uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-[#FFF12E]" />
                  Tipo de producto a trasladar
                </label>
                <input
                  id="producto-input"
                  type="text"
                  aria-label="Tipo de producto a trasladar"
                  placeholder="Ej: Documentos, Paquete pequeño..."
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  required
                  className="w-full h-11 bg-white/5 border-2 border-[#0950F6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF12E] rounded-xl px-4 text-sm transition-all text-white placeholder:text-white/40 font-sans"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-200 border border-red-500/40 text-xs px-4 py-3 rounded-xl flex items-center gap-2 font-sans font-medium">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isCalculating || !origen.trim() || !destino.trim() || !nombre.trim() || !telefono.trim() || !producto.trim()}
                className="group w-full min-h-[52px] rounded-full bg-[#FFF12E] hover:bg-[#FFF44A] text-[#0950F6] font-subheading font-bold tracking-wider uppercase text-base py-3.5 px-6 shadow-glow-yellow transition-all flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none"
              >
                {isCalculating ? (
                  <>
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-[#0950F6]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Calculando Ruta OSRM...</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0">
                      <Calculator className="h-4 w-4" />
                    </span>
                  </>
                ) : (
                  <>
                    <span>Calcular Ruta y Tarifa Express</span>
                    <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Dynamic Results Display */}
          <div className="mt-6 relative z-10">
            <AnimatePresence mode="wait">
              {calculated && result && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-xl w-full"
                >
                  <div className="bg-[#052C87] p-5 rounded-xl border border-white/10 space-y-4 text-white">
                    <div className="bg-white/5 p-3.5 rounded-xl border border-white/15 flex items-center justify-between">
                      <span className="text-xs font-subheading font-bold text-[#FFF12E] uppercase tracking-wider">
                        DISTANCIA REAL
                      </span>
                      <span className="text-xl font-mono text-white font-bold tabular-nums">
                        {result.distancia} km
                      </span>
                    </div>

                    <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <span className="block text-[10px] font-subheading font-bold text-[#FFF12E] uppercase tracking-wider">
                          TARIFA EXACTA EXPRESS 2026
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          {result.precio === 'consultar' ? (
                            <span className="text-lg font-subheading text-white uppercase tracking-wider">
                              A Consultar (+15 km)
                            </span>
                          ) : (
                            <>
                              <span className="font-mono font-bold tracking-tight text-4xl sm:text-5xl text-white tabular-nums">
                                ${result.precio.toLocaleString('es-AR')}
                              </span>
                              <span className="text-xs text-[#FFF12E] font-mono font-bold tabular-nums">ARS</span>
                            </>
                          )}
                        </div>
                      </div>

                      {result.precio === 'consultar' ? (
                        <a
                          href="/contacto"
                          className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-between bg-white/10 hover:bg-white/20 text-white font-subheading text-sm tracking-wider uppercase px-5 py-3 rounded-full border border-white/20 shadow transition-all"
                        >
                          <span>Pedir Cotización Especial</span>
                          <ArrowRight className="h-4 w-4 ml-3" />
                        </a>
                      ) : (
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group w-full sm:w-auto min-h-[52px] inline-flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading font-bold text-sm tracking-wider uppercase px-5 py-3 rounded-full shadow-lg transition-all"
                        >
                          <span>Pedir por WhatsApp</span>
                          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 ml-3 group-hover:translate-x-1 transition-transform">
                            <CheckCircle2 className="h-4 w-4" />
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Real Interactive Map Panel (5 cols) */}
      <div className="lg:col-span-5 min-h-[360px] lg:min-h-full rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 rounded-[20px] border border-white/10 flex flex-col justify-between h-full relative overflow-hidden text-white">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Header Map */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/15 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFF12E] animate-ping" />
              <span className="text-xs font-mono text-[#FFF12E] uppercase tracking-widest font-semibold tabular-nums">
                Ruteador MDQ Activo
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/70 tabular-nums">
              OpenStreetMap + OSRM
            </span>
          </div>

          {/* Leaflet Map Loader */}
          <div className="relative flex-grow min-h-[260px] rounded-xl overflow-hidden border border-white/15 shadow-inner z-10">
            <DynamicRouteMap
              origin={origenCoords}
              destination={destinoCoords}
              routeCoords={routeCoords}
              distanceKm={result?.distancia}
              serviceType="EXPRESS"
            />
          </div>

          {/* Footer map details */}
          <div className="relative z-10 text-[11px] font-mono text-white/90 space-y-1.5 border-t border-white/15 pt-3 mt-3 tabular-nums">
            <div className="flex justify-between">
              <span>Servicio:</span>
              <span className="text-[#FFF12E] font-bold uppercase">Envío Express &lt; 2H</span>
            </div>
            <div className="flex justify-between">
              <span>Cobertura:</span>
              <span className="text-white">Partido de General Pueyrredón</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## 4. Componente: `CotizadorExpressDetails.tsx`

> **Path Relativa:** `src/components/cotizar/express/CotizadorExpressDetails.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { Shield, Map, Zap, CheckCircle2, PackageCheck, Scale, Clock } from 'lucide-react';

export default function CotizadorExpressDetails() {
  const features = [
    {
      icon: Map,
      title: 'Ruteo Urbano Preciso',
      desc: 'Medición métrica exacta entre puntos de Mar del Plata con tecnología de ruteo OSRM.',
    },
    {
      icon: Zap,
      title: 'Prioridad Inmediata (< 120 min)',
      desc: 'Asignación directa a cadete en moto apenas confirmás la solicitud. Sin esperas ni desvíos.',
    },
    {
      icon: CheckCircle2,
      title: 'Confirmación Directa por WhatsApp',
      desc: 'Coordiná en 1 clic con todos los datos precargados, sin registros tediosos ni esperas de validación.',
    },
  ];

  return (
    <div id="cotizador-express-details" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
      {/* Column 1: Benefits (7 cols) */}
      <div className="lg:col-span-7 rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 space-y-6 text-white relative overflow-hidden">
          {/* Visual Watermark */}
          <Zap
            className="absolute -bottom-8 -right-8 w-56 h-56 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
            <h3 className="text-xl font-subheading uppercase tracking-wider text-[#FFF12E] font-bold">
              Beneficios del Servicio Express
            </h3>
            <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-mono font-bold uppercase tabular-nums">
              Tarifas 2026
            </span>
          </div>

          <div className="relative z-10 space-y-5">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-3 bg-white/10 text-[#FFF12E] border border-white/20 rounded-xl shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-sans text-sm uppercase tracking-wide">
                      {feat.title}
                    </h4>
                    <p className="text-white/80 text-xs sm:text-sm font-sans mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Column 2: Guidelines & Safety (5 cols) */}
      <div className="lg:col-span-5 rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 space-y-6 flex flex-col justify-between h-full text-white relative overflow-hidden">
          {/* Visual Watermark */}
          <Shield
            className="absolute -bottom-8 -right-8 w-56 h-56 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3 className="text-xl font-subheading uppercase tracking-wider text-[#FFF12E] font-bold border-b border-white/15 pb-3">
              Pautas Operativas Express
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-white/85 font-sans leading-relaxed mt-4">
              <div className="flex items-start gap-2.5">
                <Scale className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Capacidad Máxima:</strong> Hasta <span className="font-mono text-[#FFF12E] font-bold tabular-nums">15 kg</span> por viaje en caja / mochila de moto.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <PackageCheck className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Dimensiones:</strong> Bultos de hasta <span className="font-mono text-[#FFF12E] font-bold tabular-nums">40 × 40 cm</span> entran en tarifa estándar.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Horario de Operación:</strong> Lunes a Sábados de <span className="font-mono text-white font-bold tabular-nums">08:00 a 20:00 hs</span> con monitoreo activo.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-white/10 border border-white/20 rounded-xl p-4 mt-4">
            <h4 className="font-bold text-[#FFF12E] font-subheading text-sm tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <Shield className="h-4 w-4 shrink-0 text-[#FFF12E]" />
              Garantía DosRuedas MDQ
            </h4>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Más de 7 años operando en las calles de Mar del Plata. Tu paquete viaja asegurado y con seguimiento directo de punta a punta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## 5. Componente: `CotizadorExpressHelp.tsx`

> **Path Relativa:** `src/components/cotizar/express/CotizadorExpressHelp.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Mail, PhoneCall } from 'lucide-react';

export default function CotizadorExpressHelp() {
  return (
    <div
      id="cotizador-express-help"
      className="relative overflow-hidden rounded-[28px] sm:rounded-[30px] p-6 sm:p-10 mt-12 bg-[#052C87] text-white border border-white/20 shadow-2xl"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,241,46,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(9,80,246,0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Visual Watermark */}
      <HelpCircle
        className="absolute -bottom-10 -right-10 w-72 h-72 text-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="space-y-3 max-w-2xl text-center lg:text-left">
          <span className="px-3.5 py-1 bg-white/10 text-[#FFF12E] rounded-full text-xs font-subheading font-bold tracking-wider uppercase inline-flex items-center gap-1.5 border border-white/20 -rotate-1 shadow-glow-yellow">
            <HelpCircle className="h-4 w-4 shrink-0 text-[#FFF12E]" />
            ¿Dudas o Envíos Especiales?
          </span>
          <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white leading-tight">
            ¿Necesitás cadetería recurrente o bultos especiales?
          </h3>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans font-light">
            Si realizás más de 5 envíos diarios o necesitás distribución continua para tu comercio en Mar del Plata, consultá por nuestros convenios y cuentas corrientes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto justify-center shrink-0">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/contacto"
            className="group min-h-[52px] inline-flex items-center justify-between bg-white hover:bg-white/90 text-[#0950F6] font-subheading font-bold tracking-wider text-sm uppercase px-6 py-3.5 rounded-full shadow-lg transition-all"
          >
            <span>Formulario de Contacto</span>
            <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0 ml-3 group-hover:translate-x-1 transition-transform">
              <Mail className="h-4 w-4" />
            </span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="tel:+542236602699"
            className="group min-h-[52px] inline-flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white font-subheading font-bold tracking-wider text-sm uppercase px-6 py-3.5 rounded-full shadow-lg transition-all"
          >
            <span>Llamanos: <span className="font-mono text-white tabular-nums">223 660-2699</span></span>
            <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 ml-3 group-hover:translate-x-1 transition-transform">
              <PhoneCall className="h-4 w-4" />
            </span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

```

