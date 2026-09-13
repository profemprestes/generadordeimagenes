# 🏗️ Nodo: Layout Global & Navegación

> Contenedores y componentes que envuelven a todas las páginas de la aplicación.

## 🧭 Archivos del Nodo

| Archivo | Path Relativa | Tipo |
|---------|---------------|------|
| `layout.tsx` | `src/app/layout.tsx` | Server Component [SC] |
| `template.tsx` | `src/app/template.tsx` | Client Component [CC] |
| `ClientLayout.tsx` | `src/components/ClientLayout.tsx` | Client Component [CC] |
| `OptimizedHeader.tsx` | `src/components/layout/OptimizedHeader.tsx` | Client Component [CC] |
| `OptimizedFooter.tsx` | `src/components/layout/OptimizedFooter.tsx` | Client Component [CC] |
| `MobileNav.tsx` | `src/components/layout/MobileNav.tsx` | Client Component [CC] |
| `CarruselRedes.tsx` | `src/components/layout/CarruselRedes.tsx` | Client Component [CC] |

---

## 1. `layout.tsx`

> **Path Relativa:** `src/app/layout.tsx`  
> **Tipo:** Server Component [SC]  

```tsx
import type { Metadata } from 'next';
import { Outfit, Anton, Bebas_Neue, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ClientLayout from '../components/ClientLayout';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-subheading',
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

const baseUrl = 'https://www.enviosdosruedas.com';

export const metadata: Metadata = {
  title: {
    default: 'Envíos DosRuedas · Tu Partner Logístico en Mar del Plata',
    template: '%s | Envíos DosRuedas',
  },
  description: 'Tu partner logístico de confianza en Mar del Plata. Envíos Express (rango 3hs), Envíos Flex MercadoLibre en el día, Paquetería LowCost y Fulfillment 3PL para E-Commerce.',
  keywords: [
    'envios flex',
    'mensajeria en moto',
    'paqueteria ecommerce',
    'envios express',
    'reparto mercadolibre',
    'servicio de cadeteria',
    'logistica flex',
    'envios mar del plata',
    'mensajeria mar del plata',
    'cadeteria mar del plata',
    'logistica 3pl mar del plata',
  ],
  authors: [{ name: 'Envíos DosRuedas' }],
  creator: 'Envíos DosRuedas',
  publisher: 'Envíos DosRuedas',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: baseUrl,
    siteName: 'Envíos DosRuedas',
    title: 'Envíos DosRuedas - Mensajería & Logística en Mar del Plata',
    description: 'La solución logística y última milla de mayor confianza en Mar del Plata. Envíos Express, MercadoLibre Flex, ruteo eficiente y cadetería inteligente.',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Envíos DosRuedas - Logística y Mensajería en Mar del Plata',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Envíos DosRuedas - Mensajería & Logística en Mar del Plata',
    description: 'La solución logística y última milla de mayor confianza en Mar del Plata.',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@enviosdosruedas',
  },
  verification: {
    google: 'Xmi1zpx45Gdf_z7dZfPWRjDuG7ExiOo7N2fy1hnlBbA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${anton.variable} ${bebasNeue.variable} ${geistMono.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch & Preconnect para recursos externos */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Schema Markup: Organization + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Envíos DosRuedas',
                  url: baseUrl,
                  logo: `${baseUrl}/logo-envios-simplified.webp`,
                  sameAs: [
                    'https://www.instagram.com/enviosdosruedas',
                    'https://www.facebook.com/enviosdosruedas',
                    'https://wa.me/542236602699',
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+54-223-660-2699',
                    contactType: 'customer service',
                    availableLanguage: 'Spanish',
                    areaServed: 'AR',
                  },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${baseUrl}#localbusiness`,
                  name: 'Envíos DosRuedas',
                  description: 'Mensajería y logística e-commerce en Mar del Plata. Envíos Express, LowCost, MercadoLibre Flex y soluciones 3PL para PyMEs.',
                  url: baseUrl,
                  telephone: '+54-223-660-2699',
                  email: 'matiascejas@enviosdosruedas.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Friuli 1972',
                    addressLocality: 'Mar del Plata',
                    addressRegion: 'Buenos Aires',
                    postalCode: '7600',
                    addressCountry: 'AR',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: -38.0055,
                    longitude: -57.5426,
                  },
                  openingHoursSpecification: [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                      opens: '08:00',
                      closes: '20:00',
                    },
                  ],
                  areaServed: {
                    '@type': 'City',
                    name: 'Mar del Plata',
                  },
                  priceRange: '$$',
                  currenciesAccepted: 'ARS',
                  paymentAccepted: 'Cash, Credit Card, Transfer, MercadoPago',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Servicios de Logística y Mensajería',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Envíos Express',
                          description: 'Entregas prioritarias en menos de 2 horas en Mar del Plata.',
                          url: `${baseUrl}/servicios/envios-express`,
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Envíos LowCost',
                          description: 'Envíos económicos con entrega garantizada en el día para PyMEs.',
                          url: `${baseUrl}/servicios/envios-lowcost`,
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Envíos Flex (MercadoLibre)',
                          description: 'Socio logístico certificado para Mercado Envíos Flex. Same-Day delivery.',
                          url: `${baseUrl}/servicios/enviosflex`,
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Logística 3PL y Plan Emprendedores',
                          description: 'Almacenamiento, picking, packing y fulfillment para e-commerce.',
                          url: `${baseUrl}/servicios/plan-emprendedores`,
                        },
                      },
                    ],
                  },
                },
              ],
            }, null, 2)
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17510443994"
          strategy="lazyOnload"
        />
        <Script id="google-tag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17510443994');
            gtag('config', 'G-LSLQ3RJ8WT');
          `}
        </Script>
      </head>
      <body className="bg-white text-brand-ink font-sans antialiased selection:bg-brand-yellow selection:text-brand-blue min-h-screen flex flex-col" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

```


---

## 2. `template.tsx`

> **Path Relativa:** `src/app/template.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const subscribe = () => () => {};

export default function Template({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={isMounted ? { opacity: 0, filter: "blur(4px)" } : false}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}


```


---

## 3. `ClientLayout.tsx`

> **Path Relativa:** `src/components/ClientLayout.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import OptimizedHeader from './layout/OptimizedHeader';
import OptimizedFooter from './layout/OptimizedFooter';

// CarruselRedes contains GSAP ScrollTrigger and is dynamically imported to avoid blocking FCP / TBT on initial paint
const CarruselRedes = dynamic(() => import('./layout/CarruselRedes'), {
  loading: () => <div className="w-full py-16 bg-brand-blue-700 min-h-[250px]" />,
  ssr: true,
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-[9999] bg-brand-yellow text-brand-blue px-6 py-3 rounded-xl font-subheading border-2 border-brand-blue shadow-[3px_3px_0px_var(--color-brand-blue)] uppercase font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
      >
        Saltar al contenido
      </a>
      <OptimizedHeader />
      <main id="main-content" className="flex-grow pt-[72px]" tabIndex={-1}>
        {children}
      </main>
      <CarruselRedes />
      <OptimizedFooter />
    </>
  );
}

```


---

## 4. `OptimizedHeader.tsx`

> **Path Relativa:** `src/components/layout/OptimizedHeader.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import {
  Menu, X, ChevronDown, Bike, ChevronRight, Phone,
  Home, Zap, TrendingDown, Clock, ShoppingBag, Info, HelpCircle, Share2, Mail
} from 'lucide-react';
import { CTANestedPill } from '@/components/ui';

// Dynamically import MobileNav so mobile drawer logic is loaded only on demand
const MobileNav = dynamic(() => import('./MobileNav'), {
  ssr: false,
});

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdownItems?: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

// Spring presets
const SPRING_NAV = { type: 'spring', stiffness: 400, damping: 28 } as const;
const SPRING_DROPDOWN = { type: 'spring', stiffness: 320, damping: 24 } as const;
const EASE_MOUNT = { duration: 0.45, ease: [0.25, 0.8, 0.25, 1] } as const;

export default function OptimizedHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setActiveDropdown(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navItems: NavItem[] = [
    { label: 'Inicio', href: '/', icon: Home },
    {
      label: 'Servicios',
      icon: Bike,
      dropdownItems: [
        { label: 'Envíos Express', href: '/servicios/envios-express', icon: Zap },
        { label: 'Envíos LowCost', href: '/servicios/envios-lowcost', icon: TrendingDown },
        { label: 'Envíos Flex (MeLi)', href: '/servicios/enviosflex', icon: Clock },
        { label: 'E-Commerce & 3PL', href: '/servicios/plan-emprendedores', icon: ShoppingBag },
      ],
    },
    {
      label: 'Nosotros',
      icon: Info,
      dropdownItems: [
        { label: 'Sobre Nosotros', href: '/nosotros/sobre-nosotros', icon: Info },
        { label: 'Preguntas Frecuentes', href: '/nosotros/preguntas-frecuentes', icon: HelpCircle },
        { label: 'Nuestras Redes', href: '/nosotros/nuestras-redes', icon: Share2 },
      ],
    },
    { label: 'Contacto', href: '/contacto', icon: Mail },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  // Stagger container for dropdown items
  const dropdownContainer: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 320,
        damping: 24,
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 6,
      scale: prefersReducedMotion ? 1 : 0.97,
      transition: { duration: 0.15, ease: 'easeIn' as const },
    },
  };

  const dropdownItem: Variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -8 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } },
  };

  return (
    // Mount animation: slide down from -8px + fade
    <motion.header
      id="optimized-header"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={EASE_MOUNT}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-blue-700/95 shadow-elevated border-b border-white/10 py-2.5 backdrop-blur-md'
          : 'bg-brand-blue-700 py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo — isotipo bounce + kinetic wordmark */}
          <Link
            href="/"
            id="nav-logo-opt"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500 rounded-xl"
          >
            <div className="flex items-center gap-2.5">
              {/* Isotipo: bounce on group-hover via Framer */}
              <motion.div
                className="relative w-10 h-10 shrink-0"
                whileHover={prefersReducedMotion ? {} : { rotate: 12, scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                <Image
                  src="/logo-envios-simplified.webp"
                  alt="Isotipo Envíos Dos Ruedas"
                  fill={true}
                  className="object-contain"
                  priority
                />
              </motion.div>
              {/* Wordmark: kinetic font stretch via CSS utility */}
              <span className="font-display text-2xl sm:text-3xl tracking-tight leading-none uppercase select-none flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
                <span className="text-white kinetic-font-stretch">Envíos</span>
                <span className="text-brand-yellow-500 kinetic-font-stretch">DosRuedas</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav id="desktop-nav-opt" className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdownItems && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdownItems && setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-base xl:text-lg font-subheading font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500 ${
                      pathname === item.href
                        ? 'text-brand-yellow-500 bg-white/10 shadow-sm'
                        : 'text-white hover:text-brand-yellow-500 hover:bg-white/5'
                    }`}
                  >
                    {item.icon && <item.icon className="h-4.5 w-4.5 shrink-0 text-brand-yellow-500" />}
                    {/* Kinetic font stretch on nav link text */}
                    <span className="kinetic-font-stretch">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    onFocus={() => item.dropdownItems && setActiveDropdown(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        setActiveDropdown(null);
                      }
                    }}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === item.label}
                    className="px-4 py-2 text-base xl:text-lg font-subheading font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 text-white hover:text-brand-yellow-500 hover:bg-white/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                  >
                    {item.icon && <item.icon className="h-4.5 w-4.5 shrink-0 text-brand-yellow-500" />}
                    {/* Kinetic font stretch on dropdown trigger */}
                    <span className="kinetic-font-stretch">{item.label}</span>
                    <motion.span
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={SPRING_NAV}
                    >
                      <ChevronDown
                        className={`h-4.5 w-4.5 ${
                          activeDropdown === item.label ? 'text-brand-yellow-500' : 'text-brand-blue-200'
                        }`}
                      />
                    </motion.span>
                  </button>
                )}

                {/* Dropdown Menu — staggered spring items */}
                <AnimatePresence>
                  {item.dropdownItems && activeDropdown === item.label && (
                    <motion.div
                      variants={dropdownContainer}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-64 bg-brand-blue-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/15 py-2.5 text-white overflow-hidden z-50"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <div className="flex flex-col gap-1 px-2">
                        {item.dropdownItems.map((subItem) => {
                          const SubIcon = subItem.icon || ChevronRight;
                          return (
                            <motion.div key={subItem.href} variants={dropdownItem}>
                              <Link
                                href={subItem.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-white/10 text-white hover:text-brand-yellow-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500"
                              >
                                <div className="p-1.5 rounded-lg bg-white/10 text-brand-blue-100 group-hover:bg-brand-yellow-500 group-hover:text-brand-blue-900 transition-colors shrink-0">
                                  <SubIcon className="h-4 w-4" />
                                </div>
                                <span className="text-sm sm:text-base font-bold uppercase font-subheading tracking-wider leading-none text-white group-hover:text-brand-yellow-500 transition-colors">
                                  {subItem.label}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Action & Phone */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+542236602699"
              className="flex items-center gap-2 text-white hover:text-brand-yellow-500 transition-colors font-mono text-sm font-bold"
            >
              <Phone className="h-4 w-4 text-brand-yellow-500" />
              <span>223 660-2699</span>
            </a>

            {/* CTA with idle pulse ring */}
            <div className="relative">
              {/* Idle pulse ring — draws attention without distraction */}
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-brand-yellow-500/25 pointer-events-none"
                  animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                />
              )}
              <CTANestedPill href="/cotizar/express" variant="primary" size="default">
                Cotizá tu envío
              </CTANestedPill>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:+542236602699"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white hover:text-brand-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Llamar"
              aria-label="Llamar por teléfono"
            >
              <Phone className="h-5 w-5 text-brand-yellow-500" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle-opt"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white hover:text-brand-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500 transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={prefersReducedMotion ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={prefersReducedMotion ? false : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
          activeDropdown={activeDropdown}
          onDropdownToggle={handleDropdownToggle}
        />
      )}
    </motion.header>
  );
}

```


---

## 5. `OptimizedFooter.tsx`

> **Path Relativa:** `src/components/layout/OptimizedFooter.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import {
  Phone, MapPin, Mail, Clock, ShieldCheck, ArrowUpRight,
  Zap, TrendingDown, ShoppingBag, ArrowUp
} from 'lucide-react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

// ─── Animation Variants ───────────────────────────────────────────────────────

/** Fade-up stagger container for footer columns */
const FOOTER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const;

/** Each column fades up */
const FOOTER_COL = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
} as const;

/** CTA Banner slides up from below */
const BANNER_VARIANT = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22, delay: 0.08 },
  },
} as const;

/** Social icon spring bounce on hover */
const SOCIAL_HOVER = { y: -4, scale: 1.12 } as const;
const SOCIAL_SPRING = { type: 'spring', stiffness: 480, damping: 18 } as const;

export default function OptimizedFooter() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="optimized-footer"
      className="bg-brand-blue-700 text-white border-t border-white/10 relative overflow-hidden font-sans select-none"
    >
      {/* Decorative top yellow accent bar with continuous glow */}
      <div className="h-1.5 bg-brand-yellow-500 w-full shadow-md shadow-brand-yellow-500/30" />

      {/* Atmospheric Background & Subtle Blueprint Grid Details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,236,1,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(4,35,107,0.5),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">

        {/* TOP CTA BANNER — slides up from below on scroll reveal */}
        <motion.div
          variants={prefersReducedMotion ? {} : BANNER_VARIANT}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-14 rounded-2xl bg-brand-blue-800/90 border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow-500/15 border border-brand-yellow-500/30 text-brand-yellow-500 text-xs font-subheading font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-yellow-500 animate-ping" />
              Operaciones Activas Mar del Plata 2026
            </div>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
              ¿Tenés envíos para hoy? <span className="text-brand-yellow-500">Los entregamos a tiempo.</span>
            </h3>
            <p className="text-sm text-brand-blue-100 font-light max-w-xl">
              Cotizá online en segundos o coordiná directo con nuestro equipo logístico por WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/cotizar/express"
              className="w-full sm:w-auto cta-nested-pill bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-subheading font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-full shadow-accent-sm hover:shadow-cta-glow transition-all flex items-center justify-between group min-h-[48px]"
            >
              <span>Cotizá tu Envío</span>
              <span className="cta-nested-icon bg-brand-blue-900/10 text-brand-blue-900 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ml-3 group-hover:translate-x-1 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>

            <a
              href="https://wa.me/542236602699?text=Hola%20Envíos%20DosRuedas!%20Quiero%20hacer%20una%20consulta%20de%20envíos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-subheading font-bold uppercase tracking-wider text-sm px-5 py-3.5 rounded-full transition-all min-h-[48px]"
            >
              <FaWhatsapp className="h-4 w-4 text-brand-yellow-500" />
              <span>Chateá con Nosotros</span>
            </a>
          </div>
        </motion.div>

        {/* MID SECTION: fade-up stagger per column on scroll reveal */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
          variants={prefersReducedMotion ? {} : FOOTER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >

          {/* COLUMN 1: Brand details & Socials (5 Cols) */}
          <motion.div
            variants={prefersReducedMotion ? {} : FOOTER_COL}
            className="lg:col-span-5 space-y-6"
          >
            <Link href="/" className="flex items-center gap-3.5 group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-500 rounded-xl">
              <div className="relative w-11 h-11 bg-white/10 p-1.5 rounded-xl border border-white/15 group-hover:scale-105 transition-all duration-300 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo-master.svg"
                  alt="Logo Envíos DosRuedas"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl sm:text-3xl tracking-tight uppercase select-none text-white">
                  Envíos <span className="text-brand-yellow-500">DosRuedas</span>
                </span>
                <span className="text-[10px] font-mono text-brand-blue-100 tracking-widest uppercase mt-0.5 opacity-90">
                  Tu solución confiable · Mar del Plata
                </span>
              </div>
            </Link>

            <p className="text-brand-blue-50 text-sm leading-relaxed max-w-sm font-light">
              Con más de 7 años de trayectoria en Mar del Plata, transformamos el despacho de tus productos en un motor de crecimiento para emprendedores, PyMEs y comercios locales con flota propia y compromiso humano.
            </p>

            <div className="space-y-3 pt-2">
              <span className="block text-xs font-bold text-brand-yellow-500 uppercase tracking-widest font-subheading">
                Canales Oficiales
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {/* Instagram — spring bounce */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : SOCIAL_HOVER}
                  transition={SOCIAL_SPRING}
                  className="inline-block"
                >
                  <Link
                    href="/nosotros/nuestras-redes"
                    className="h-10 w-10 rounded-xl bg-white/10 hover:bg-brand-yellow-500 text-white hover:text-brand-blue-900 flex items-center justify-center transition-colors duration-200 border border-white/15 hover:border-brand-yellow-500 shadow-sm p-2.5 group cursor-pointer"
                    title="Instagram @enviosdosruedas"
                    aria-label="Instagram Oficial"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </Link>
                </motion.div>

                {/* Facebook — spring bounce */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : SOCIAL_HOVER}
                  transition={SOCIAL_SPRING}
                  className="inline-block"
                >
                  <Link
                    href="/nosotros/nuestras-redes"
                    className="h-10 w-10 rounded-xl bg-white/10 hover:bg-brand-yellow-500 text-white hover:text-brand-blue-900 flex items-center justify-center transition-colors duration-200 border border-white/15 hover:border-brand-yellow-500 shadow-sm p-2.5 group cursor-pointer"
                    title="Facebook Envíos DosRuedas"
                    aria-label="Facebook Oficial"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </Link>
                </motion.div>

                {/* WhatsApp — spring bounce */}
                <motion.div
                  whileHover={prefersReducedMotion ? {} : SOCIAL_HOVER}
                  transition={SOCIAL_SPRING}
                  className="inline-block"
                >
                  <a
                    href="https://wa.me/542236602699"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-xl bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 flex items-center justify-center transition-colors duration-200 border border-brand-yellow-500 hover:border-brand-yellow-400 shadow-accent-sm hover:shadow-cta-glow p-2.5 group cursor-pointer"
                    title="WhatsApp Directo"
                    aria-label="WhatsApp Directo"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                  </a>
                </motion.div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-mono shadow-inner">
                  <ShieldCheck className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                  <span>Partner 3PL Verificado</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2: Services & Tools (3 Cols) */}
          <motion.div
            variants={prefersReducedMotion ? {} : FOOTER_COL}
            className="lg:col-span-3 space-y-5"
          >
            <h4 className="font-subheading text-lg tracking-wider text-brand-yellow-500 uppercase border-b border-white/10 pb-2 font-bold flex items-center gap-2">
              <span>Servicios y Cotizadores</span>
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link
                  href="/cotizar/express"
                  className="text-brand-blue-50 hover:text-brand-yellow-500 flex items-center justify-between group transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                    <span>Cotizador Express &lt; 2H</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-yellow-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/cotizar/lowcost"
                  className="text-brand-blue-50 hover:text-brand-yellow-500 flex items-center justify-between group transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingDown className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                    <span>Cotizador LowCost Batch</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-yellow-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/enviosflex"
                  className="text-brand-blue-50 hover:text-brand-yellow-500 flex items-center justify-between group transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                    <span>Mercado Envíos Flex</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-yellow-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/plan-emprendedores"
                  className="text-brand-blue-50 hover:text-brand-yellow-500 flex items-center justify-between group transition-all duration-200 hover:translate-x-1"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="h-4 w-4 text-brand-yellow-500 shrink-0" />
                    <span>E-Commerce & 3PL</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-brand-yellow-500" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* COLUMN 3: Contact & Hub Operations Info (4 Cols) */}
          <motion.div
            variants={prefersReducedMotion ? {} : FOOTER_COL}
            className="lg:col-span-4 space-y-5"
          >
            <h4 className="font-subheading text-lg tracking-wider text-brand-yellow-500 uppercase border-b border-white/10 pb-2 font-bold">
              Base de Operaciones MDQ
            </h4>

            <div className="space-y-3.5 text-xs text-brand-blue-50 font-sans">
              <div className="flex gap-3 items-start bg-brand-blue-800/80 p-3 rounded-xl border border-white/15">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 text-brand-yellow-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase font-subheading tracking-wider">Centro de Distribución</p>
                  <p className="font-sans text-[13px] text-brand-blue-100 mt-0.5">Friuli 1972, Mar del Plata</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-brand-blue-800/80 p-3 rounded-xl border border-white/15">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 text-brand-yellow-500">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase font-subheading tracking-wider">Línea Directa y WhatsApp</p>
                  <a href="tel:+542236602699" className="font-mono text-[13px] font-bold text-brand-yellow-500 hover:underline block mt-0.5">
                    +54 223 660-2699
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-brand-blue-800/80 p-3 rounded-xl border border-white/15">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 text-brand-yellow-500">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase font-subheading tracking-wider">Atención Comercial</p>
                  <a href="mailto:matiascejas@enviosdosruedas.com" className="font-sans text-[12px] text-brand-blue-100 hover:text-brand-yellow-500 transition-colors block mt-0.5 break-all">
                    matiascejas@enviosdosruedas.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-brand-blue-800/80 p-3 rounded-xl border border-white/15">
                <div className="p-2 bg-white/10 rounded-lg shrink-0 text-brand-yellow-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-white uppercase font-subheading tracking-wider">Horarios de Despacho (Base Central)</p>
                  <div className="text-[12px] font-sans text-brand-blue-100 space-y-0.5">
                    <div className="flex justify-between items-center gap-4">
                      <span>Lunes a Viernes:</span>
                      <span className="font-mono font-bold text-brand-yellow-500">09:00 - 18:00 hs</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span>Sábados:</span>
                      <span className="font-mono font-bold text-brand-yellow-500">10:00 - 15:00 hs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Separator */}
        <div className="border-t border-white/10 my-10 relative">
          {/* Scroll to Top — continuous float loop */}
          <motion.button
            onClick={scrollToTop}
            className="absolute -top-5 right-4 sm:right-6 bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 p-2.5 rounded-full shadow-accent-md hover:shadow-cta-glow transition-colors flex items-center justify-center border-2 border-brand-yellow-500 cursor-pointer"
            title="Volver al inicio"
            aria-label="Volver arriba"
            /* Idle float loop */
            animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }
            }
            /* Tap feedback */
            whileTap={{ scale: 0.92 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -7 }}
          >
            <ArrowUp className="h-4 w-4 font-bold" />
          </motion.button>
        </div>

        {/* BOTTOM SECTION: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-brand-blue-100 font-sans">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6">
            <p className="font-medium text-white">© 2026 Envíos DosRuedas · Mar del Plata, Argentina.</p>
            <Link href="/nosotros/sobre-nosotros" className="hover:text-brand-yellow-500 transition-colors text-brand-blue-100">
              Sobre Nosotros
            </Link>
            <Link href="/nosotros/preguntas-frecuentes" className="hover:text-brand-yellow-500 transition-colors text-brand-blue-100">
              Preguntas Frecuentes
            </Link>
            <Link href="/nosotros/nuestras-redes" className="hover:text-brand-yellow-500 transition-colors text-brand-blue-100">
              Nuestras Redes
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 shrink-0 text-brand-blue-100">
            <Link href="/terminos-y-condiciones" className="hover:text-brand-yellow-500 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-brand-yellow-500 transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

```


---

## 6. `MobileNav.tsx`

> **Path Relativa:** `src/components/layout/MobileNav.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown, ChevronRight, Phone, X } from 'lucide-react';
import { CTANestedPill } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface MobileNavItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdownItems?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MobileNavItem[];
  activeDropdown: string | null;
  onDropdownToggle: (label: string) => void;
}

// Spring config for the panel slide-in
const SPRING_PANEL = { type: 'spring', stiffness: 340, damping: 30 } as const;

// Stagger config for nav items appearing after panel opens
const NAV_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
} as const;

const NAV_ITEM_VARIANT = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 380, damping: 26 } },
} as const;

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navItems,
  activeDropdown,
  onDropdownToggle,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Prevent page scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay — enhanced blur transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-blue-900/70 backdrop-blur-md z-50 lg:hidden"
          />

          {/* Slide-over Drawer — spring from right + enhanced blur border */}
          <motion.div
            initial={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={SPRING_PANEL}
            className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-brand-blue-700 shadow-2xl z-50 flex flex-col h-full border-l border-white/10 lg:hidden"
          >
            {/* Header Mobile Brand Info */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50 rounded-lg">
                <span className="font-display text-xl tracking-tight uppercase select-none flex flex-col items-start leading-none">
                  <span className="text-white">Envíos</span>
                  <span className="text-brand-yellow-500">DosRuedas</span>
                </span>
              </Link>

              {/* Animated close button */}
              <motion.button
                onClick={onClose}
                whileHover={prefersReducedMotion ? {} : { scale: 1.08, rotate: 90 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white hover:text-brand-yellow-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Nav Items List — staggered entrance */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              <motion.nav
                className="space-y-2"
                variants={prefersReducedMotion ? {} : NAV_CONTAINER}
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={prefersReducedMotion ? {} : NAV_ITEM_VARIANT}
                    className="border-b border-white/10 pb-2.5 last:border-b-0 last:pb-0"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl text-xl font-subheading tracking-wider uppercase text-white hover:text-brand-yellow-500 hover:bg-white/5 transition-all font-bold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50"
                      >
                        {item.icon && <item.icon className="h-5 w-5 text-brand-yellow-500 shrink-0" />}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => onDropdownToggle(item.label)}
                          className="w-full text-left py-2.5 px-3 rounded-xl text-xl font-subheading tracking-wider uppercase flex items-center justify-between text-white hover:bg-white/5 font-bold cursor-pointer transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50"
                        >
                          <span className="flex items-center gap-3.5">
                            {item.icon && <item.icon className="h-5 w-5 text-brand-yellow-500 shrink-0" />}
                            <span>{item.label}</span>
                          </span>
                          <motion.span
                            animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          >
                            <ChevronDown className="h-5 w-5 text-brand-yellow-500 shrink-0" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {item.dropdownItems && activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : { type: 'spring', stiffness: 340, damping: 28 }
                              }
                              className="pl-4 pr-1 py-2 flex flex-col gap-1 overflow-hidden"
                            >
                              {item.dropdownItems.map((subItem, idx) => {
                                const SubIcon = subItem.icon || ChevronRight;
                                return (
                                  <motion.div
                                    key={subItem.href}
                                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05, type: 'spring', stiffness: 380, damping: 26 }}
                                  >
                                    <Link
                                      href={subItem.href}
                                      onClick={onClose}
                                      className="flex items-center gap-3 py-2 px-3 rounded-xl text-base font-subheading uppercase tracking-wider font-bold text-brand-blue-50/90 hover:text-brand-yellow-500 hover:bg-white/10 transition-all min-h-[42px] focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50"
                                    >
                                      <div className="p-1 rounded-lg bg-white/10 text-brand-yellow-500 shrink-0">
                                        <SubIcon className="h-4 w-4" />
                                      </div>
                                      <span>{subItem.label}</span>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="p-5 border-t border-white/10 space-y-4 shrink-0 bg-brand-blue-700/80 backdrop-blur-md">
              <a
                href="tel:+542236602699"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/10 border border-white/5 text-white hover:text-brand-yellow-500 font-mono text-sm font-bold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-yellow-500/50"
              >
                <Phone className="h-4 w-4 text-brand-yellow-500" />
                <span>+54 223 660-2699</span>
              </a>

              <CTANestedPill
                href="/cotizar/express"
                variant="primary"
                size="large"
                className="w-full justify-center min-h-[44px] py-3.5"
                onClick={onClose}
              >
                Cotizá tu envío
              </CTANestedPill>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;

```


---

## 7. `CarruselRedes.tsx`

> **Path Relativa:** `src/components/layout/CarruselRedes.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CarruselRedes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const blocks = containerRef.current.querySelectorAll('.social-block');
        gsap.fromTo(
          blocks,
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const networks = [
    {
      id: 'facebook',
      name: 'FACEBOOK',
      handle: 'Envíos DosRuedas',
      desc: 'Seguí nuestro día a día, novedades operativas y la comunidad comercial en Mar del Plata.',
      action: 'SEGUIR COMUNIDAD',
      url: 'https://www.facebook.com/share/1RnSzyweir/',
      icon: FaFacebook,
      badgeText: 'FACEBOOK OFICIAL',
      // Estética propia Facebook (Royal Classic Blue)
      cardBg: 'bg-[#1877F2]/10 hover:bg-[#1877F2]/15',
      cardBorder: 'border-[#1877F2]/30 hover:border-[#1877F2]/70',
      badgeBg: 'bg-[#1877F2]/20 text-[#1877F2] border-[#1877F2]/40',
      iconBoxBg: 'bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/40',
      handleColor: 'text-[#1877F2]',
      watermarkColor: 'text-[#1877F2]/10 group-hover:text-[#1877F2]/20',
      btnBg: 'bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md shadow-[#1877F2]/30',
      btnIconBg: 'bg-white/20 text-white',
      glow: 'from-[#1877F2]/20 to-transparent',
    },
    {
      id: 'instagram',
      name: 'INSTAGRAM',
      handle: '@enviosdosruedas',
      desc: 'Mirá el detrás de escena de nuestros riders y la flota recorriendo las calles de MDQ.',
      action: 'VER CONTENIDO',
      url: 'https://www.instagram.com/enviosdosruedas/',
      icon: FaInstagram,
      badgeText: 'INSTAGRAM MDQ',
      // Estética propia Instagram (Gradient Sunset & Pink/Purple)
      cardBg: 'bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 hover:from-[#833AB4]/15 hover:via-[#FD1D1D]/15 hover:to-[#F77737]/15',
      cardBorder: 'border-[#E1306C]/30 hover:border-[#E1306C]/70',
      badgeBg: 'bg-gradient-to-r from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 text-[#FD1D1D] border-[#E1306C]/40',
      iconBoxBg: 'bg-gradient-to-tr from-[#F56040] via-[#FD1D1D] to-[#833AB4] text-white shadow-lg shadow-[#E1306C]/40',
      handleColor: 'text-[#FD1D1D]',
      watermarkColor: 'text-[#E1306C]/10 group-hover:text-[#E1306C]/20',
      btnBg: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white shadow-md shadow-[#FD1D1D]/30',
      btnIconBg: 'bg-white/20 text-white',
      glow: 'from-[#E1306C]/20 to-transparent',
    },
    {
      id: 'whatsapp',
      name: 'WHATSAPP',
      handle: '+54 223 660-2699',
      desc: 'Escribinos directamente para consultas, contrataciones o soporte express al toque.',
      action: 'INICIAR CHAT',
      url: 'https://wa.me/542236602699',
      icon: FaWhatsapp,
      badgeText: 'WHATSAPP DIRECTO',
      // Estética propia WhatsApp (Emerald Green)
      cardBg: 'bg-[#25D366]/10 hover:bg-[#25D366]/15',
      cardBorder: 'border-[#25D366]/30 hover:border-[#25D366]/70',
      badgeBg: 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/40',
      iconBoxBg: 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40',
      handleColor: 'text-[#25D366]',
      watermarkColor: 'text-[#25D366]/10 group-hover:text-[#25D366]/20',
      btnBg: 'bg-[#25D366] hover:bg-[#20bd5a] text-brand-blue-950 font-bold shadow-md shadow-[#25D366]/30',
      btnIconBg: 'bg-brand-blue-950/15 text-brand-blue-950',
      glow: 'from-[#25D366]/20 to-transparent',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="carrusel-redes"
      suppressHydrationWarning
      className="py-20 md:py-32 bg-brand-blue-700 border-y border-white/10 relative overflow-hidden font-sans select-none"
    >
      {/* Background Decorative Mesh & Depth Highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,236,1,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-brand-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Segment */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 bg-brand-yellow-500 text-brand-blue-900 rounded-full text-xs font-bold tracking-widest inline-block font-subheading uppercase shadow-accent-sm">
            Nuestra Comunidad Digital
          </span>
          
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-[0.95] text-center">
            SEGUÍ NUESTRO <span className="text-brand-yellow-500">MOVIMIENTO</span>
          </h2>

          <p className="text-brand-blue-50 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto opacity-90">
            Sumate a nuestros canales digitales y enterate al toque de todas las novedades operativas en Mar del Plata.
          </p>
          <div className="h-0.5 w-20 bg-brand-yellow-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Networks Grid: 3 Unique Branded Cards */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full"
        >
          {networks.map((net) => {
            const Icon = net.icon;

            return (
              <div
                key={net.id}
                className={`social-block group relative rounded-2xl p-2 transition-all duration-300 border ${net.cardBorder} bg-brand-blue-800/80 backdrop-blur-md hover:-translate-y-1.5 shadow-xl`}
              >
                {/* Internal Glow on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${net.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className={`relative rounded-xl p-6 sm:p-7 flex flex-col justify-between h-[390px] md:h-[430px] overflow-hidden ${net.cardBg} border border-white/10 transition-colors`}>
                  
                  {/* Background Watermark Icon that enlarges and tilts on hover */}
                  <div className={`absolute -right-8 -bottom-8 ${net.watermarkColor} transition-all duration-500 ease-out group-hover:scale-125 group-hover:-rotate-12 pointer-events-none select-none`}>
                    <Icon className="w-56 h-56" />
                  </div>

                  {/* Top Area: Badge & Branded Icon Box */}
                  <div className="z-10 text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase font-subheading border ${net.badgeBg}`}>
                        {net.badgeText}
                      </span>

                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${net.iconBoxBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-tight leading-none text-white">
                        {net.name}
                      </h3>
                      <p className={`font-mono text-xs font-bold mt-1.5 ${net.handleColor}`}>
                        {net.handle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-brand-blue-50/90 font-light">
                      {net.desc}
                    </p>
                  </div>

                  {/* Bottom Action Area: Custom CTA Button per Network */}
                  <div className="z-10 pt-4 border-t border-white/10">
                    <a
                      href={net.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-between font-subheading font-bold uppercase tracking-wider text-xs sm:text-sm px-5 py-3 rounded-full transition-all duration-200 group/btn ${net.btnBg}`}
                    >
                      <span>{net.action}</span>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1 ${net.btnIconBg}`}>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


```

