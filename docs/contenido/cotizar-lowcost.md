# 📄 Nodo: Cotizador LowCost

> **URL:** `/cotizar/lowcost`  
> **Path Relativa Página:** `src/app/cotizar/lowcost/page.tsx`  
> **Tipo de Render:** Server Component [SC]  

## 🧭 Componentes del Nodo

| Rol | Path Relativa | Tipo |
|-----|---------------|------|
| **Página Raíz** | `src/app/cotizar/lowcost/page.tsx` | Server Component [SC] |
| Componente | `src/components/cotizar/lowcost/CotizadorLowCostHero.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/lowcost/CotizadorLowCostForm.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/lowcost/BatchGrid.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/lowcost/CotizadorLowCostDetails.tsx` | Client Component [CC] |
| Componente | `src/components/cotizar/lowcost/CotizadorLowCostHelp.tsx` | Client Component [CC] |

---

## 1. Código de la Página Raíz (`src/app/cotizar/lowcost/page.tsx`)

```tsx
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/src/lib/prisma';
import { PriceRange } from '@/generated/prisma/client';
import CotizadorLowCostHero from '@/src/components/cotizar/lowcost/CotizadorLowCostHero';
import CotizadorLowCostForm from '@/src/components/cotizar/lowcost/CotizadorLowCostForm';
import BatchGrid from '@/src/components/cotizar/lowcost/BatchGrid';
import CotizadorLowCostDetails from '@/src/components/cotizar/lowcost/CotizadorLowCostDetails';
import CotizadorLowCostHelp from '@/src/components/cotizar/lowcost/CotizadorLowCostHelp';

const baseUrl = 'https://www.enviosdosruedas.com';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cotizador de Envíos LowCost en Moto | Mar del Plata | Envíos DosRuedas',
  description:
    'Calculá tu tarifa de envío económico programado con entrega en el día en Mar del Plata (pedidos antes de las 13 hs). Ruteo optimizado para comercios y PyMEs.',
  alternates: {
    canonical: `${baseUrl}/cotizar/lowcost`,
  },
  openGraph: {
    title: 'Cotizá tu Envío LowCost en Moto | Mar del Plata | Envíos DosRuedas',
    description:
      'Calculá tu envío programado con entrega en el día en Mar del Plata. Máxima rentabilidad y eficiencia logística.',
    url: `${baseUrl}/cotizar/lowcost`,
    type: 'website',
    locale: 'es_AR',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cotizador de Envíos LowCost Envíos DosRuedas',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  url: `${baseUrl}/cotizar/lowcost`,
  description:
    'Herramienta de cálculo para envíos económicos consolidados y ruteos urbanos masivos en Mar del Plata.',
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

async function LowCostFormAsync() {
  let priceRanges: PriceRange[] = [];
  try {
    priceRanges = await prisma.priceRange.findMany();
  } catch (error) {
    console.error('Error fetching price ranges from Prisma Postgres:', error);
  }
  return <CotizadorLowCostForm priceRanges={priceRanges} />;
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
      <div id="cotizar-lowcost-page" className="w-full bg-[#0950F6] text-white min-h-screen relative overflow-hidden font-sans">
        {/* Hero Section — Rendered and Streamed Immediately */}
        <CotizadorLowCostHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-24 relative z-10">
          {/* 1. Main Quote Form Streamed with Suspense */}
          <main className="w-full font-sans">
            <Suspense fallback={<FormSkeleton />}>
              <LowCostFormAsync />
            </Suspense>

            {/* Batch / Multi-Destination Planilla */}
            <BatchGrid />
          </main>

          {/* 2. Detail Guidelines */}
          <div className="font-sans">
            <CotizadorLowCostDetails />
          </div>

          {/* 3. Help Contact Banner */}
          <div className="font-sans">
            <CotizadorLowCostHelp />
          </div>
        </div>
      </div>
    </>
  );
}

```

---

## 2. Componente: `CotizadorLowCostHero.tsx`

> **Path Relativa:** `src/components/cotizar/lowcost/CotizadorLowCostHero.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Percent,
  Truck,
  ShieldCheck,
  Calculator,
} from 'lucide-react';
import HeroProceduralBackground from '@/src/components/ui/HeroProceduralBackground';

const SIMULATED_LOWCOST_TRIPS = [
  {
    origen: 'Av. Constitución 5500',
    destino: 'Plaza Mitre',
    distancia: '5.8 km',
    tarifa: '$5.300 ARS',
  },
  {
    origen: 'Centro de Distribución (Av. Colón 1200)',
    destino: 'Zona Güemes (Centro)',
    distancia: '2.8 km',
    tarifa: '$3.000 ARS',
  },
  {
    origen: 'Terminal Ferroautomotora',
    destino: 'B° Stella Maris',
    distancia: '3.7 km',
    tarifa: '$4.000 ARS',
  },
  {
    origen: 'Puerto Mar del Plata',
    destino: 'Punta Mogotes',
    distancia: '7.4 km',
    tarifa: '$7.000 ARS',
  },
];

export default function CotizadorLowCostHero() {
  const [tripIndex, setTripIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTripIndex((prev) => (prev + 1) % SIMULATED_LOWCOST_TRIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentTrip = SIMULATED_LOWCOST_TRIPS[tripIndex];

  return (
    <section
      id="cotizador-lowcost-hero"
      className="relative w-full overflow-hidden bg-[#0950F6] text-white min-h-[72vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-white/10"
    >
      {/* Dynamic Procedural Background */}
      <HeroProceduralBackground variant="lowcost" />

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
              <ShoppingBag className="h-4 w-4 text-[#FFF12E] shrink-0" />
              <span>SERVICIO ECONÓMICO Y PROGRAMADO</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] font-display uppercase tracking-tight leading-[0.92] text-white">
              <span>COTIZÁ TU </span>
              <span className="text-[#FFF12E] drop-shadow-[0_2px_16px_rgba(255,241,46,0.4)]">
                ENVÍO{' '}
              </span>
              <span className="block sm:inline">LOWCOST</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl font-sans text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Eficiencia y rentabilidad. Calculá tu envío con entrega garantizada en el día si es solicitado antes de 13hs.
            </p>

            {/* Feature Pills Row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <Percent className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Hasta 40% de Ahorro</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <Truck className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Entrega Same-Day</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-subheading uppercase tracking-wide bg-[#052C87]/80 border border-white/20 text-white backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-[#FFF12E] shrink-0" />
                <span>Tarifa Plana PyME</span>
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
                      SISTEMA LOWCOST BATCH
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
                    ENTREGA INCLUIDA EN EL DÍA
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

## 3. Componente: `CotizadorLowCostForm.tsx`

> **Path Relativa:** `src/components/cotizar/lowcost/CotizadorLowCostForm.tsx`  
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

export default function CotizadorLowCostForm({ priceRanges = [] }: { priceRanges?: PriceRangeProp[] }) {
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
      formData.append('serviceType', 'LOW_COST');
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
    const text = `¡Hola Envíos DosRuedas! Quiero coordinar un Envío LowCost cotizado en la web:
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
📦 *Producto:* ${producto}
📍 *Origen:* ${origen}
🏁 *Destino:* ${destino}
📏 *Distancia:* ${result.distancia} km
💵 *Tarifa LowCost 2026:* ${priceText}`;
    return `https://wa.me/542236602699?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="cotizador-lowcost-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                Programado y Económico · Mar del Plata
              </span>
              <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white mt-3">
                Calculá tu Envío LowCost
              </h2>
              <p className="text-white/80 text-sm font-sans mt-1 leading-relaxed">
                Ingresá las direcciones de origen y destino para calcular la tarifa económica agrupada con entrega garantizada en el día (solicitando antes de 13:00 hs).
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
                      <span>Calculando Tarifa LowCost...</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#0950F6]/10 text-[#0950F6] flex items-center justify-center shrink-0">
                      <Calculator className="h-4 w-4" />
                    </span>
                  </>
                ) : (
                  <>
                    <span>Calcular Ruta y Tarifa LowCost</span>
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
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/15">
                        <span className="block text-[10px] font-subheading font-bold text-[#FFF12E] uppercase tracking-wider">
                          DISTANCIA REAL
                        </span>
                        <span className="text-xl font-mono text-white font-bold tabular-nums">
                          {result.distancia} km
                        </span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/15">
                        <span className="block text-[10px] font-subheading font-bold text-[#FFF12E] uppercase tracking-wider">
                          FRANJA ESTIMADA
                        </span>
                        <span className="text-sm font-subheading font-bold text-white uppercase">
                          Hoy (Mismo Día)
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <span className="block text-[10px] font-subheading font-bold text-[#FFF12E] uppercase tracking-wider">
                          TARIFA EXACTA LOWCOST 2026
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
                Ruteador Batch Activo
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
              serviceType="LOW_COST"
            />
          </div>

          {/* Footer map details */}
          <div className="relative z-10 text-[11px] font-mono text-white/90 space-y-1.5 border-t border-white/15 pt-3 mt-3 tabular-nums">
            <div className="flex justify-between">
              <span>Servicio:</span>
              <span className="text-[#FFF12E] font-bold uppercase">Envío LowCost Batch</span>
            </div>
            <div className="flex justify-between">
              <span>Modalidad:</span>
              <span className="text-white">Ruteo Agrupado Diario MDQ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## 4. Componente: `BatchGrid.tsx`

> **Path Relativa:** `src/components/cotizar/lowcost/BatchGrid.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, MessageSquare, Layers, CheckCircle2, Shield } from 'lucide-react';

interface BatchRow {
  id: string;
  destinatario: string;
  direccion: string;
  telefono: string;
  producto: string;
}

export default function BatchGrid() {
  const [rows, setRows] = useState<BatchRow[]>([
    {
      id: '1',
      destinatario: '',
      direccion: '',
      telefono: '',
      producto: '',
    },
    {
      id: '2',
      destinatario: '',
      direccion: '',
      telefono: '',
      producto: '',
    },
  ]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        destinatario: '',
        direccion: '',
        telefono: '',
        producto: '',
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, field: keyof BatchRow, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const getBatchWhatsAppLink = () => {
    const validRows = rows.filter((r) => r.direccion.trim().length > 0);
    const count = validRows.length;
    
    let text = `¡Hola Envíos DosRuedas! Quiero solicitar una cotización por lote de ${count} envíos LowCost en Mar del Plata:\n\n`;
    validRows.forEach((r, idx) => {
      text += `📍 *Envío #${idx + 1}:*\n`;
      if (r.destinatario) text += `• Destinatario: ${r.destinatario}\n`;
      text += `• Destino: ${r.direccion}\n`;
      if (r.telefono) text += `• Teléfono: ${r.telefono}\n`;
      if (r.producto) text += `• Contenido: ${r.producto}\n\n`;
    });
    text += `📦 *Modalidad:* Ruteo LowCost Programado 2026 (Corte 13:00 hs)`;
    return `https://wa.me/542236602699?text=${encodeURIComponent(text)}`;
  };

  const validCount = rows.filter((r) => r.direccion.trim().length > 0).length;

  return (
    <div id="batch-grid" className="double-bezel-outer bg-brand-blue-50/80 border border-brand-blue-100 p-2 rounded-2xl shadow-elevated transition-all duration-300 mt-12">
      <div className="double-bezel-inner bg-white p-6 sm:p-8 rounded-xl border border-brand-blue-50/50 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-blue-50 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-blue-50 text-brand-blue-700">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-display uppercase tracking-tight text-brand-blue-700">
                Planilla de Despachos Masivos (Batch)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-brand-ink/75 font-sans">
              Cargá múltiples destinos de Mar del Plata para ruteo agrupado del día y consultá por WhatsApp con un solo clic.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-yellow-50 text-brand-blue-900 border border-brand-yellow-200 font-subheading text-xs font-bold uppercase tracking-wider">
              {rows.length} {rows.length === 1 ? 'paquete' : 'paquetes en lote'}
            </span>
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-1.5 bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-subheading text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar Fila</span>
            </button>
          </div>
        </div>

        {/* Rows Table / List */}
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {rows.map((row, index) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100 flex flex-col md:flex-row gap-3 items-center"
              >
                <div className="w-7 h-7 rounded-full bg-brand-blue-700 text-brand-yellow-500 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 w-full flex-grow">
                  <input
                    type="text"
                    placeholder="Destinatario"
                    value={row.destinatario}
                    onChange={(e) => updateRow(row.id, 'destinatario', e.target.value)}
                    className="h-10 bg-white border border-brand-blue-200 focus:border-brand-blue-700 rounded-lg px-3 text-xs outline-none text-brand-ink font-sans placeholder:text-brand-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="Dirección en MDQ *"
                    value={row.direccion}
                    onChange={(e) => updateRow(row.id, 'direccion', e.target.value)}
                    className="h-10 bg-white border border-brand-blue-200 focus:border-brand-blue-700 rounded-lg px-3 text-xs outline-none text-brand-ink font-sans placeholder:text-brand-blue-300"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={row.telefono}
                    onChange={(e) => updateRow(row.id, 'telefono', e.target.value)}
                    className="h-10 bg-white border border-brand-blue-200 focus:border-brand-blue-700 rounded-lg px-3 text-xs outline-none text-brand-ink font-sans placeholder:text-brand-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="Producto / Bulto"
                    value={row.producto}
                    onChange={(e) => updateRow(row.id, 'producto', e.target.value)}
                    className="h-10 bg-white border border-brand-blue-200 focus:border-brand-blue-700 rounded-lg px-3 text-xs outline-none text-brand-ink font-sans placeholder:text-brand-blue-300"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length <= 1}
                  className="p-2 text-brand-blue-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-brand-blue-400 rounded-lg transition-colors shrink-0 cursor-pointer"
                  title="Eliminar fila"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer & Submit to WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-blue-50">
          <div className="flex items-center gap-2 text-xs text-brand-ink/70 font-sans">
            <Shield className="h-4 w-4 text-brand-blue-700 shrink-0" />
            <span>Tarifas LowCost vigentes 2026 ($3.000 a $7.000 + excedente por km).</span>
          </div>

          <a
            href={getBatchWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading font-bold text-sm tracking-wider uppercase px-6 py-3.5 rounded-full shadow-accent-sm hover:shadow-cta-glow transition-all"
          >
            <MessageSquare className="h-4.5 w-4.5 shrink-0" />
            <span>Cotizar Lote ({validCount > 0 ? validCount : rows.length} Envíos) por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

```

---

## 5. Componente: `CotizadorLowCostDetails.tsx`

> **Path Relativa:** `src/components/cotizar/lowcost/CotizadorLowCostDetails.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { Shield, Map, Clock, Calendar, Truck, CheckCircle2 } from 'lucide-react';

export default function CotizadorLowCostDetails() {
  const features = [
    {
      icon: Map,
      title: 'Ruteo Batch Inteligente',
      desc: 'Agrupamos entregas por cercanía en Mar del Plata para reducir costos operativos y transferirte el ahorro.',
    },
    {
      icon: Clock,
      title: 'Entrega Same-Day Garantizada',
      desc: 'Solicitando antes de las 13:00 hs, tu paquete se entrega en el día dentro de las franjas habituales.',
    },
    {
      icon: CheckCircle2,
      title: 'Tarifa Fija Predecible',
      desc: 'Valores oficiales 2026 claros y sin sorpresas para que puedas presupuestar los costos de tu tienda.',
    },
  ];

  return (
    <div id="cotizador-lowcost-details" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
      {/* Column 1: Benefits (7 cols) */}
      <div className="lg:col-span-7 rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 space-y-6 text-white relative overflow-hidden">
          {/* Visual Watermark */}
          <Truck
            className="absolute -bottom-8 -right-8 w-56 h-56 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
            <h3 className="text-xl font-subheading uppercase tracking-wider text-[#FFF12E] font-bold">
              Beneficios del Servicio LowCost
            </h3>
            <span className="px-3 py-1 bg-white/10 text-[#FFF12E] border border-white/20 rounded-full text-xs font-mono font-bold uppercase tabular-nums">
              Hasta 40% Ahorro
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

      {/* Column 2: Delivery Windows & Operational Advice (5 cols) */}
      <div className="lg:col-span-5 rounded-[28px] sm:rounded-[30px] bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl transition-all duration-300">
        <div className="bg-[#052C87] p-6 sm:p-8 rounded-[20px] border border-white/10 space-y-6 flex flex-col justify-between h-full text-white relative overflow-hidden">
          {/* Visual Watermark */}
          <Clock
            className="absolute -bottom-8 -right-8 w-56 h-56 text-white/[0.04] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <h3 className="text-xl font-subheading uppercase tracking-wider text-[#FFF12E] font-bold border-b border-white/15 pb-3">
              Franjas de Entrega LowCost
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-white/85 font-sans leading-relaxed mt-4">
              <div className="flex items-start gap-2.5">
                <Calendar className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Horario de Corte:</strong> Pedidos ingresados antes de las <span className="font-mono text-[#FFF12E] font-bold tabular-nums">13:00 hs</span> se entregan en la tarde del mismo día.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Turno Tarde:</strong> Reparto masivo entre las <span className="font-mono text-white font-bold tabular-nums">14:00 y 20:00 hs</span> con trazabilidad garantizada.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="h-4 w-4 text-[#FFF12E] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Pedidos Posteriores:</strong> Los pedidos recibidos después de las <span className="font-mono text-white font-bold tabular-nums">13:00 hs</span> se programan para el primer turno del día hábil siguiente.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-white/10 border border-white/20 rounded-xl p-4 mt-4">
            <h4 className="font-bold text-[#FFF12E] font-subheading text-sm tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <Shield className="h-4 w-4 shrink-0 text-[#FFF12E]" />
              Garantía de Reparto Diario
            </h4>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Optimizamos los circuitos viales de la ciudad para garantizar que cada paquete llegue a destino con seguridad y al menor costo por km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

## 6. Componente: `CotizadorLowCostHelp.tsx`

> **Path Relativa:** `src/components/cotizar/lowcost/CotizadorLowCostHelp.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Mail, PhoneCall } from 'lucide-react';

export default function CotizadorLowCostHelp() {
  return (
    <div
      id="cotizador-lowcost-help"
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
            Cuentas Corrientes y PyMEs
          </span>
          <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white leading-tight">
            ¿Tenés envíos recurrentes o tienda E-Commerce?
          </h3>
          <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans font-light">
            Accedé a facturación quincenal o mensual consolidada, retiro programado en tu depósito o local y tarifas diferenciales por volumen en Mar del Plata.
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

