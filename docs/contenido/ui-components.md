# 🧩 Nodo: UI Kit — Componentes Base del Sistema de Diseño

> Componentes atómicos reutilizables del sistema de diseño (Tailwind v4 tokens, Double Bezel, CTAs, Steppers, Inputs).

## 🧭 Componentes del UI Kit

| Componente | Path Relativa | Tipo |
|------------|---------------|------|
| `AddressAutocomplete.tsx` | `src/components/ui/AddressAutocomplete.tsx` | Client Component [CC] |
| `Badge.tsx` | `src/components/ui/Badge.tsx` | Client Component [CC] |
| `BentoGrid.tsx` | `src/components/ui/BentoGrid.tsx` | Client Component [CC] |
| `CTANestedPill.tsx` | `src/components/ui/CTANestedPill.tsx` | Client Component [CC] |
| `DoubleBezelCard.tsx` | `src/components/ui/DoubleBezelCard.tsx` | Client Component [CC] |
| `DynamicRouteMap.tsx` | `src/components/ui/DynamicRouteMap.tsx` | Client Component [CC] |
| `FloatTiltCard.tsx` | `src/components/ui/FloatTiltCard.tsx` | Client Component [CC] |
| `HeroProceduralBackground.tsx` | `src/components/ui/HeroProceduralBackground.tsx` | Client Component [CC] |
| `InputField.tsx` | `src/components/ui/InputField.tsx` | Client Component [CC] |
| `LeafletRouteMap.tsx` | `src/components/ui/LeafletRouteMap.tsx` | Client Component [CC] |
| `LogosCarousel.tsx` | `src/components/ui/LogosCarousel.tsx` | Client Component [CC] |
| `RadioCardGroup.tsx` | `src/components/ui/RadioCardGroup.tsx` | Client Component [CC] |
| `StepperHorizontal.tsx` | `src/components/ui/StepperHorizontal.tsx` | Client Component [CC] |
| `StepperVertical.tsx` | `src/components/ui/StepperVertical.tsx` | Client Component [CC] |
| `timeline-animation.tsx` | `src/components/ui/timeline-animation.tsx` | Client Component [CC] |
| `vertical-cut-reveal.tsx` | `src/components/ui/vertical-cut-reveal.tsx` | Client Component [CC] |
| `card.tsx` | `src/components/ui/card.tsx` | Server Component [SC] |
| `sparkles.tsx` | `src/components/ui/sparkles.tsx` | Client Component [CC] |

---

## 1. `AddressAutocomplete.tsx`

> **Path Relativa:** `src/components/ui/AddressAutocomplete.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface Suggestion {
  description: string;
  place_id: string;
}

interface AddressAutocompleteProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSelectCoordinate: (coords: { lat: number; lng: number } | null) => void;
  required?: boolean;
  className?: string;
}

export default function AddressAutocomplete({
  id,
  placeholder,
  value,
  onChange,
  onSelectCoordinate,
  required = false,
  className = '',
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // Llamar al endpoint proxy local en lugar de directo a Google para evitar CORS y proteger la Key
      const url = `/api/places/autocomplete?input=${encodeURIComponent(searchQuery)}`;

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.status === 'OK' && data.predictions) {
        setSuggestions(data.predictions);
        setIsOpen(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching addresses from local API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    onSelectCoordinate(null);

    if (val.trim() === '') {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchAddresses(val);
    }, 300);
  };

  const handleSelect = async (suggestion: Suggestion) => {
    onChange(suggestion.description);
    setIsOpen(false);
    setSuggestions([]);

    // Obtener las coordenadas a través de nuestro endpoint proxy de details
    try {
      const url = `/api/places/details?place_id=${suggestion.place_id}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 'OK' && data.result?.geometry?.location) {
        const { lat, lng } = data.result.geometry.location;
        onSelectCoordinate({ lat, lng });
      }
    } catch (error) {
      console.error('Error fetching place details from local API:', error);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          id={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className={className}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={`${id}-suggestions`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-brand-blue-300 pointer-events-none" aria-hidden="true">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          id={`${id}-suggestions`}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-brand-blue-700 border border-white/10 rounded-xl max-h-60 overflow-y-auto shadow-2xl text-brand-blue-100 divide-y divide-white/5"
        >
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(s)}
              className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-start gap-3 transition-colors text-sm"
            >
              <MapPin className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">
                  {s.description.split(',')[0]}
                </p>
                <p className="text-xs text-brand-blue-300 mt-0.5 line-clamp-1">
                  {s.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

```


---

## 2. `Badge.tsx`

> **Path Relativa:** `src/components/ui/Badge.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'urgent'
  | 'secure'
  | 'economic'
  | 'flex'
  | 'neutral'
  | 'outline'
  | 'primary'
  | 'accent';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  rounded?: 'full' | 'lg' | 'md';
  className?: string;
}

/**
 * Badge Component
 * Official badge pill system for statuses, trust indicators, and service types.
 * Follows DESIGN.md specifications:
 * - font-subheading, text-label, uppercase, tracking-wider, font-bold
 * - rounded-full or rounded-lg, padding var(--space-1) var(--space-2), border
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  rounded = 'full',
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-subheading uppercase tracking-wider font-bold border transition-colors select-none';

  const roundedStyles = {
    full: 'rounded-full',
    lg: 'rounded-lg',
    md: 'rounded-md',
  }[rounded];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] leading-tight',
    md: 'px-3 py-1 text-xs leading-tight',
    lg: 'px-4 py-1.5 text-sm leading-tight',
  }[size];

  const variantStyles = {
    urgent:
      'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-400 shadow-accent-sm',
    secure: 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-200',
    economic: 'bg-brand-blue-100 text-brand-blue-800 border-brand-blue-200',
    flex: 'bg-brand-yellow-100 text-brand-blue-900 border-brand-yellow-200',
    neutral: 'bg-white text-brand-blue-700 border-brand-blue-100 shadow-sm',
    outline: 'bg-transparent text-brand-blue-700 border-brand-blue-700',
    primary: 'bg-brand-blue-700 text-white border-brand-blue-700',
    accent:
      'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-500 shadow-accent-sm',
  }[variant];

  return (
    <span
      className={cn(baseStyles, roundedStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;

```


---

## 3. `BentoGrid.tsx`

> **Path Relativa:** `src/components/ui/BentoGrid.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import DoubleBezelCard from './DoubleBezelCard';

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  span?: '7' | '5' | '12' | 'hero' | 'standard' | 'full' | number;
  className?: string;
  doubleBezel?: boolean;
  variant?: 'light' | 'dark';
}

/**
 * BentoGrid Component
 * Asymmetric 12-column layout container for service showcases and features.
 * Follows DESIGN.md specifications:
 * - Base: grid-cols-12, gap-6 lg:gap-8, auto-rows-[380px]
 * - Span 7 (Hero cards): Express, E-Commerce 3PL -> lg:col-span-7
 * - Span 5 (Standard cards): LowCost, Flex -> lg:col-span-5
 * - Span 12 (Full width): Cotizador CTA -> col-span-12
 * - Mobile: grid-cols-1 (all col-span-12 / full width)
 */
export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(340px,auto)] md:auto-rows-[380px] w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  children,
  span = 'standard',
  className,
  doubleBezel = true,
  variant = 'light',
  ...props
}) => {
  const getSpanClass = () => {
    if (span === 7 || span === '7' || span === 'hero') {
      return 'col-span-1 md:col-span-12 lg:col-span-7';
    }
    if (span === 5 || span === '5' || span === 'standard') {
      return 'col-span-1 md:col-span-6 lg:col-span-5';
    }
    if (span === 12 || span === '12' || span === 'full') {
      return 'col-span-1 md:col-span-12 lg:col-span-12';
    }
    if (typeof span === 'number') {
      return `col-span-1 md:col-span-${Math.min(span, 12)} lg:col-span-${span}`;
    }
    return 'col-span-1 md:col-span-6 lg:col-span-5';
  };

  const spanClass = getSpanClass();

  if (doubleBezel) {
    return (
      <DoubleBezelCard
        variant={variant}
        className={cn(spanClass, 'h-full flex flex-col', className)}
        {...props}
      >
        {children}
      </DoubleBezelCard>
    );
  }

  return (
    <div
      className={cn('h-full flex flex-col overflow-hidden', spanClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default BentoGrid;

```


---

## 4. `CTANestedPill.tsx`

> **Path Relativa:** `src/components/ui/CTANestedPill.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CTANestedPillVariant = 'primary' | 'elevated' | 'outline' | 'ghost';
export type CTANestedPillSize = 'compact' | 'default' | 'large';

export interface CTANestedPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: CTANestedPillVariant;
  size?: CTANestedPillSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  iconClassName?: string;
  target?: string;
  rel?: string;
}

/**
 * CTANestedPill Component
 * Standardized nested pill CTA interactive element (Button or Link).
 * Follows DESIGN.md specifications:
 * - Rounded-full, font-subheading, uppercase, tracking-[.05em], font-bold
 * - Embedded circular icon chip (w-8 h-8) with smooth hover translation
 * - Variants: --primary (yellow), --elevated (white), --outline, --ghost
 */
export const CTANestedPill = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, CTANestedPillProps>(
  (
    {
      children,
      href,
      variant = 'primary',
      size = 'default',
      icon,
      iconPosition = 'right',
      className,
      iconClassName,
      target,
      rel,
      disabled,
      ...buttonProps
    },
    ref
  ) => {
    const isPrimary = variant === 'primary';
    const isElevated = variant === 'elevated';
    const isOutline = variant === 'outline';
    const isGhost = variant === 'ghost';

    const baseStyles =
      'cta-nested-pill group inline-flex items-center justify-between gap-3 rounded-full font-subheading uppercase tracking-[.05em] font-bold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2 select-none border';

    const sizeStyles = {
      compact: 'px-4 py-1.5 text-xs min-h-[36px]',
      default: 'px-5 py-2 text-sm min-h-[44px]',
      large: 'px-8 py-3 text-base min-h-[52px]',
    }[size];

    const variantStyles = {
      primary:
        'bg-brand-yellow-500 text-brand-blue-900 border-brand-yellow-500 shadow-accent-sm hover:shadow-cta-glow hover:bg-brand-yellow-400 active:scale-[.98] active:translate-y-[1px]',
      elevated:
        'bg-white text-brand-blue-700 border-brand-blue-100 shadow-elevated hover:shadow-hover-lift hover:border-brand-blue-300 hover:text-brand-blue-800 active:scale-[.98]',
      outline:
        'bg-transparent text-brand-blue-700 border-2 border-brand-blue-700 hover:bg-brand-blue-50 active:scale-[.98]',
      ghost:
        'bg-transparent text-brand-blue-700 border-transparent hover:bg-brand-blue-50 active:scale-[.98]',
    }[variant];

    const iconChipBase =
      'cta-nested-icon w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200';

    const iconChipVariantStyles = {
      primary:
        'bg-brand-blue-700/10 text-brand-blue-900 group-hover:bg-brand-blue-700 group-hover:text-brand-yellow-500 group-hover:translate-x-1',
      elevated:
        'bg-brand-blue-700/10 text-brand-blue-700 group-hover:bg-brand-blue-700 group-hover:text-white group-hover:translate-x-1',
      outline:
        'bg-brand-blue-700/10 text-brand-blue-700 group-hover:bg-brand-blue-700 group-hover:text-white group-hover:translate-x-1',
      ghost:
        'bg-brand-blue-700/10 text-brand-blue-700 group-hover:bg-brand-blue-700 group-hover:text-white group-hover:translate-x-1',
    }[variant];

    const defaultIcon = <ArrowRight className="w-4 h-4" />;
    const renderedIcon = icon !== undefined ? icon : defaultIcon;

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    const combinedClassName = cn(
      baseStyles,
      sizeStyles,
      variantStyles,
      disabledStyles,
      className
    );

    const iconContent = (
      <span className={cn(iconChipBase, iconChipVariantStyles, iconClassName)}>
        {renderedIcon}
      </span>
    );

    const content = (
      <>
        {iconPosition === 'left' && iconContent}
        <span className="truncate">{children}</span>
        {iconPosition === 'right' && iconContent}
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        className={combinedClassName}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

CTANestedPill.displayName = 'CTANestedPill';

export default CTANestedPill;

```


---

## 5. `DoubleBezelCard.tsx`

> **Path Relativa:** `src/components/ui/DoubleBezelCard.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface DoubleBezelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
  variant?: 'light' | 'dark';
  hoverEffect?: boolean;
}

/**
 * DoubleBezelCard Component
 * Signature Two-tier container system (outer bezel + inner card) for primary content.
 * Follows DESIGN.md specifications:
 * - Outer: bg-brand-blue-50/80, border-brand-blue-100, rounded-2xl (16px), p-2 (8px), shadow-float
 * - Inner: bg-white (or brand-blue-700 in dark variant), rounded-xl (12px), p-6, shadow-sm
 * - Hover: shadow-antigravity-deep, border-brand-blue-300
 */
export const DoubleBezelCard = React.forwardRef<HTMLDivElement, DoubleBezelCardProps>(
  (
    {
      children,
      className,
      outerClassName,
      innerClassName,
      variant = 'light',
      hoverEffect = true,
      ...props
    },
    ref
  ) => {
    const isDark = variant === 'dark';

    return (
      <div
        ref={ref}
        className={cn(
          'double-bezel-outer transition-all duration-300 rounded-2xl p-2 shadow-float',
          isDark
            ? 'bg-brand-blue-50/80 border border-brand-blue-100/80'
            : 'bg-brand-blue-50/80 border border-brand-blue-100',
          hoverEffect &&
            (isDark
              ? 'hover:shadow-antigravity-deep hover:border-brand-yellow-400/80'
              : 'hover:shadow-antigravity-deep hover:border-brand-blue-300'),
          outerClassName,
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'double-bezel-inner rounded-xl p-6 shadow-sm overflow-hidden transition-colors duration-200',
            isDark
              ? 'bg-brand-blue-700 border border-white/10 text-white'
              : 'bg-white border border-brand-blue-50/50 text-brand-blue-900',
            innerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

DoubleBezelCard.displayName = 'DoubleBezelCard';

export default DoubleBezelCard;

```


---

## 6. `DynamicRouteMap.tsx`

> **Path Relativa:** `src/components/ui/DynamicRouteMap.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LeafletRouteMap = dynamic(() => import('./LeafletRouteMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-brand-blue-700 flex items-center justify-center rounded-3xl border border-white/10 animate-pulse">
      <div className="text-center space-y-2">
        <svg className="animate-spin h-8 w-8 text-brand-yellow mx-auto" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-xs font-mono text-brand-blue-300">Cargando mapa interactivo...</span>
      </div>
    </div>
  ),
});

interface Coordinate {
  lat: number;
  lng: number;
}

interface DynamicRouteMapProps {
  origin: Coordinate | null;
  destination: Coordinate | null;
  routeCoords: [number, number][];
  distanceKm?: number;
  serviceType?: 'EXPRESS' | 'LOW_COST';
}

export default function DynamicRouteMap(props: DynamicRouteMapProps) {
  return <LeafletRouteMap {...props} />;
}

```


---

## 7. `FloatTiltCard.tsx`

> **Path Relativa:** `src/components/ui/FloatTiltCard.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface FloatTiltCardProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  disabled?: boolean;
}

/**
 * FloatTiltCard Component
 * Interactive 3D hero cards utilizing CSS perspective and multi-layer Z-translations.
 * Follows DESIGN.md specifications:
 * - Perspective 1000px on wrapper
 * - transform-style: preserve-3d
 * - Mousemove -> rotateX(±8deg) rotateY(±8deg)
 * - Hover tilt lift -> translateY(-6px) rotateX(4deg) rotateY(-2deg) + shadow-antigravity-deep
 * - Disables 3D tilt when prefers-reduced-motion is active
 */
export const FloatTiltCard: React.FC<FloatTiltCardProps> = ({
  children,
  className,
  perspective = 1000,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2; // -1 to 1
    const yPct = (mouseY / height - 0.5) * 2; // -1 to 1

    const rotateX = yPct * -8; // ±8deg
    const rotateY = xPct * 8; // ±8deg

    setTransformStyle(
      `translateY(-6px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    );
  };

  const handleMouseEnter = () => {
    if (disabled || reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disabled || reducedMotion) return;
    setIsHovered(false);
    setTransformStyle('translateY(0px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      className="float-tilt-perspective w-full"
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? transformStyle || 'translateY(-6px) rotateX(4deg) rotateY(-2deg)'
            : 'translateY(0px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered
            ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-out'
            : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease-out',
        }}
        className={cn(
          'relative transition-all duration-300',
          isHovered && 'shadow-antigravity-deep',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatTiltCard;

```


---

## 8. `HeroProceduralBackground.tsx`

> **Path Relativa:** `src/components/ui/HeroProceduralBackground.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HeroProceduralBackgroundProps {
  variant?: 'express' | 'lowcost' | 'flex' | '3pl' | 'community' | 'contact' | 'default';
  className?: string;
}

export default function HeroProceduralBackground({
  variant = 'default',
  className = '',
}: HeroProceduralBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* 1. Deep Royal Navy Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #021440 0%, #04236B 35%, #0636A5 75%, #00277C 100%)',
        }}
      />

      {/* 2. Procedural Dynamic Radial Highlights (CSS Glows) */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(9,80,246,0.35) 0%, rgba(6,54,165,0.15) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            variant === 'express' || variant === 'lowcost'
              ? 'radial-gradient(circle, rgba(255,236,1,0.22) 0%, rgba(255,236,1,0.06) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,236,1,0.16) 0%, rgba(9,80,246,0.12) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div
        className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,54,165,0.4) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* 3. Mathematical Vector Grid Topology (Pure SVG, 0 KB image) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-procedural-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeDasharray="2,6"
            />
            <circle cx="0" cy="0" r="1.5" fill="#FFEC01" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-procedural-grid)" />
      </svg>

      {/* 4. Variant-Specific Procedural Vector Graphics */}
      {variant === 'express' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* Animated Speed & Logistics Arteries */}
          <path
            d="M -100 450 Q 400 200 900 380 T 1600 150"
            fill="none"
            stroke="#FFEC01"
            strokeWidth="2.5"
            strokeDasharray="12 16"
            className="animate-pulse"
          />
          <path
            d="M -100 300 Q 500 480 1000 250 T 1600 350"
            fill="none"
            stroke="#628FF9"
            strokeWidth="1.5"
            strokeDasharray="8 12"
          />
          <circle cx="450" cy="240" r="4" fill="#FFEC01" />
          <circle cx="950" cy="360" r="5" fill="#FFEC01" />
        </svg>
      )}

      {variant === 'lowcost' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* Concentric Cluster Routing Rings */}
          <circle cx="1100" cy="300" r="160" fill="none" stroke="#FFEC01" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="1100" cy="300" r="280" fill="none" stroke="#628FF9" strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="1100" cy="300" r="400" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="4 16" />
          <line x1="200" y1="300" x2="1100" y2="300" stroke="#FFEC01" strokeWidth="1.5" strokeDasharray="8 8" />
        </svg>
      )}

      {variant === 'flex' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* Verified Dispatch Corridor Matrix */}
          <line x1="0" y1="180" x2="1440" y2="180" stroke="#FFEC01" strokeWidth="1.5" strokeDasharray="6 12" />
          <line x1="0" y1="420" x2="1440" y2="420" stroke="#628FF9" strokeWidth="1" strokeDasharray="4 10" />
          <rect x="750" y="140" width="80" height="80" rx="16" fill="none" stroke="#FFEC01" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="950" y="240" width="120" height="120" rx="24" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 8" />
        </svg>
      )}

      {variant === '3pl' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* Inventory Hub Node Matrix */}
          <polygon points="900,150 1100,220 1000,420 800,350" fill="none" stroke="#FFEC01" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="900" cy="150" r="5" fill="#FFEC01" />
          <circle cx="1100" cy="220" r="5" fill="#FFEC01" />
          <circle cx="1000" cy="420" r="5" fill="#FFEC01" />
          <circle cx="800" cy="350" r="5" fill="#FFEC01" />
        </svg>
      )}

      {variant === 'community' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* Social Network Node Links */}
          <line x1="300" y1="200" x2="700" y2="150" stroke="#628FF9" strokeWidth="1" />
          <line x1="700" y1="150" x2="1100" y2="280" stroke="#FFEC01" strokeWidth="1.5" />
          <line x1="1100" y1="280" x2="900" y2="480" stroke="#628FF9" strokeWidth="1" />
          <line x1="900" y1="480" x2="500" y2="400" stroke="#FFEC01" strokeWidth="1" />
          <line x1="500" y1="400" x2="300" y2="200" stroke="#628FF9" strokeWidth="1" />
        </svg>
      )}

      {variant === 'contact' && (
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
        >
          {/* GPS Coordinate Beacon Radar */}
          <circle cx="1050" cy="320" r="80" fill="none" stroke="#FFEC01" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="1050" cy="320" r="180" fill="none" stroke="#FFEC01" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="1050" cy="320" r="300" fill="none" stroke="#628FF9" strokeWidth="0.75" strokeDasharray="6 12" />
          <circle cx="1050" cy="320" r="6" fill="#FFEC01" />
        </svg>
      )}
    </div>
  );
}

```


---

## 9. `InputField.tsx`

> **Path Relativa:** `src/components/ui/InputField.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

/**
 * InputField Component
 * Standardized form input container.
 * Follows DESIGN.md specifications:
 * - Height: h-11 (44px touch target)
 * - Border: border-2 border-brand-blue-100 rounded-xl bg-white
 * - Padding left: pl-10 when icon is present
 * - Label: font-subheading text-xs uppercase tracking-[.05em] text-brand-blue-700
 * - Help text: font-mono text-[10px] text-brand-blue-400
 * - Focus: border-brand-blue-700 + ring-2 ring-brand-blue-500/20
 * - Error: border-red-500 + ring-2 ring-red-500/20
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helpText,
      icon,
      containerClassName,
      labelClassName,
      className,
      id,
      disabled,
      required,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('input-wrapper flex flex-col gap-1.5 w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'input-label font-subheading text-xs uppercase tracking-[.05em] font-bold text-brand-blue-700 flex items-center justify-between',
              labelClassName
            )}
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {icon && (
            <div className="input-icon absolute left-3.5 text-brand-blue-400 pointer-events-none flex items-center justify-center w-5 h-5">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'input-field h-11 w-full border-2 rounded-xl bg-white font-sans text-sm text-brand-blue-900 placeholder:text-brand-blue-300/70 transition-all duration-200 focus:outline-none',
              icon ? 'pl-10 pr-4' : 'px-4',
              error
                ? 'border-red-500 focus:border-red-500 ring-2 ring-red-500/20 text-red-600'
                : 'border-brand-blue-100 hover:border-brand-blue-200 focus:border-brand-blue-700 focus:ring-2 focus:ring-brand-blue-500/20',
              disabled && 'border-brand-blue-100 bg-brand-blue-50/50 text-brand-blue-400 cursor-not-allowed',
              className
            )}
            {...inputProps}
          />
        </div>

        {error ? (
          <p className="font-mono text-[10px] text-red-500 font-medium">{error}</p>
        ) : helpText ? (
          <p className="font-mono text-[10px] text-brand-blue-400">{helpText}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;

```


---

## 10. `LeafletRouteMap.tsx`

> **Path Relativa:** `src/components/ui/LeafletRouteMap.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';

interface Coordinate {
  lat: number;
  lng: number;
}

interface LeafletRouteMapProps {
  origin: Coordinate | null;
  destination: Coordinate | null;
  routeCoords: [number, number][]; // Array of [lng, lat] from OSRM GeoJSON
  distanceKm?: number;
  serviceType?: 'EXPRESS' | 'LOW_COST';
}

// Mar del Plata bounds
const mdpCenter: L.LatLngExpression = [-38.0055, -57.5426];
const southWest = L.latLng(-38.1500, -57.7000);
const northEast = L.latLng(-37.8500, -57.4000);
const bounds = L.latLngBounds(southWest, northEast);

export default function LeafletRouteMap({
  origin,
  destination,
  routeCoords,
  distanceKm,
  serviceType = 'EXPRESS',
}: LeafletRouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerAInstance = useRef<L.Marker | null>(null);
  const markerBInstance = useRef<L.Marker | null>(null);
  const glowPolylineInstance = useRef<L.Polyline | null>(null);
  const polylineInstance = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const map = L.map(mapContainer.current, {
      center: mdpCenter,
      zoom: 13,
      minZoom: 11,
      maxZoom: 17,
      maxBounds: bounds,
      maxBoundsViscosity: 0.8,
      zoomControl: false,
    });

    // Custom positioned zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap tiles with high clarity
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update Markers and Animated Polylines
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear old layers
    if (markerAInstance.current) map.removeLayer(markerAInstance.current);
    if (markerBInstance.current) map.removeLayer(markerBInstance.current);
    if (glowPolylineInstance.current) map.removeLayer(glowPolylineInstance.current);
    if (polylineInstance.current) map.removeLayer(polylineInstance.current);

    markerAInstance.current = null;
    markerBInstance.current = null;
    glowPolylineInstance.current = null;
    polylineInstance.current = null;

    const activeBounds: L.LatLng[] = [];

    // Add Marker A (Origen) - Styled Pin with radar pulse
    if (origin) {
      const latLng = L.latLng(origin.lat, origin.lng);
      activeBounds.push(latLng);
      markerAInstance.current = L.marker(latLng, {
        icon: L.divIcon({
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 map-marker-animate">
              <span class="absolute w-10 h-10 rounded-full bg-brand-blue-500/50 radar-pulse-ring"></span>
              <div class="relative bg-brand-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center border-2 border-white shadow-xl shadow-brand-blue-900/40">
                <div class="flex flex-col items-center justify-center leading-none">
                  <span class="text-[9px] font-subheading font-bold text-brand-yellow-500 uppercase tracking-tighter">RET</span>
                  <span class="text-xs font-display font-bold">A</span>
                </div>
              </div>
              <div class="absolute -bottom-1 w-2 h-2 bg-brand-blue-700 rotate-45 border-r border-b border-white"></div>
            </div>
          `,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 36],
        }),
      }).addTo(map);
    }

    // Add Marker B (Destino) - High visibility yellow finish pin
    if (destination) {
      const latLng = L.latLng(destination.lat, destination.lng);
      activeBounds.push(latLng);
      markerBInstance.current = L.marker(latLng, {
        icon: L.divIcon({
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 map-marker-animate">
              <span class="absolute w-10 h-10 rounded-full bg-brand-yellow-500/60 radar-pulse-ring"></span>
              <div class="relative bg-brand-yellow-500 text-brand-blue-900 rounded-full w-9 h-9 flex items-center justify-center border-2 border-brand-blue-700 shadow-xl shadow-brand-blue-950/50">
                <div class="flex flex-col items-center justify-center leading-none">
                  <span class="text-[9px] font-subheading font-bold text-brand-blue-900 uppercase tracking-tighter">ENT</span>
                  <span class="text-xs font-display font-bold">B</span>
                </div>
              </div>
              <div class="absolute -bottom-1 w-2 h-2 bg-brand-yellow-500 rotate-45 border-r border-b border-brand-blue-700"></div>
            </div>
          `,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 36],
        }),
      }).addTo(map);
    }

    // Add animated route line if coords exist
    if (routeCoords && routeCoords.length > 0) {
      // OSRM returns geometry as [lng, lat], Leaflet wants [lat, lng]
      const latLngs = routeCoords.map((coord) => L.latLng(coord[1], coord[0]));
      
      // Underlay glow polyline
      glowPolylineInstance.current = L.polyline(latLngs, {
        color: '#0636A5',
        weight: 8,
        opacity: 0.7,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      // Active animated dash polyline
      polylineInstance.current = L.polyline(latLngs, {
        color: '#FFEC01',
        weight: 5,
        opacity: 1,
        className: 'leaflet-route-animated',
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      // Fit map to route bounds
      map.fitBounds(polylineInstance.current.getBounds(), {
        padding: [50, 50],
        maxZoom: 15,
        animate: true,
      });
    } else if (activeBounds.length > 0) {
      // If no route but markers exist, fit bounds of markers
      if (activeBounds.length === 1) {
        map.setView(activeBounds[0], 14, { animate: true });
      } else {
        const boundsObj = L.latLngBounds(activeBounds);
        map.fitBounds(boundsObj, { padding: [60, 60], animate: true });
      }
    } else {
      // Reset view to default center
      map.setView(mdpCenter, 13, { animate: true });
    }

  }, [origin, destination, routeCoords]);

  return (
    <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden bg-brand-blue-900 select-none">
      {/* Map Target Canvas */}
      <div ref={mapContainer} className="w-full h-full min-h-[300px] z-0" />

      {/* Top Left: Logo Badge Branding Overlay */}
      <div className="absolute top-3 left-3 z-[400] pointer-events-none">
        <div className="bg-brand-blue-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-blue-500/30 shadow-lg flex items-center gap-2.5">
          <div className="relative w-6 h-6 shrink-0 bg-white/10 rounded-lg p-0.5 flex items-center justify-center">
            <Image
              src="/logo-master.svg"
              alt="Logo DosRuedas"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-display uppercase tracking-wider text-white">
              DosRuedas <span className="text-brand-yellow-500">Live</span>
            </span>
            <span className="text-[8px] font-mono text-brand-blue-200">
              {serviceType === 'EXPRESS' ? 'Ruta Prioritaria < 2H' : 'Ruteo Batch Económico'}
            </span>
          </div>
        </div>
      </div>

      {/* Top Right: Live Distance Pill Overlay (if distance available) */}
      {distanceKm !== undefined && distanceKm > 0 && (
        <div className="absolute top-3 right-3 z-[400] pointer-events-none">
          <div className="bg-brand-yellow-500 text-brand-blue-900 px-3 py-1.5 rounded-xl border-2 border-brand-blue-700 shadow-xl flex items-center gap-2 animate-bounce-short">
            <span className="text-[10px] font-subheading font-bold uppercase tracking-wider">
              Distancia
            </span>
            <span className="text-sm font-mono font-black tabular-nums bg-brand-blue-900 text-white px-2 py-0.5 rounded-md">
              {distanceKm.toLocaleString('es-AR')} km
            </span>
          </div>
        </div>
      )}

      {/* Bottom Center Route Status Pill */}
      {routeCoords.length > 0 && (
        <div className="absolute bottom-3 left-3 z-[400] pointer-events-none">
          <div className="bg-brand-blue-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-brand-yellow-500/40 text-[10px] font-mono text-brand-yellow-500 flex items-center gap-1.5 shadow-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-yellow-500 animate-ping" />
            <span>Ruta Óptima Trazada</span>
          </div>
        </div>
      )}
    </div>
  );
}


```


---

## 11. `LogosCarousel.tsx`

> **Path Relativa:** `src/components/ui/LogosCarousel.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface LogoItem {
  name: string;
  logoUrl?: string;
  logoSvg?: React.ReactNode;
  alt?: string;
}

export interface LogosCarouselProps {
  logos?: LogoItem[];
  speed?: number;
  className?: string;
}

const DEFAULT_LOGOS: LogoItem[] = [
  { name: 'MercadoLibre Flex', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner MercadoLibre Flex' },
  { name: 'E-Commerce MDQ', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner E-Commerce MDQ' },
  { name: 'Güemes Express', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner Güemes Express' },
  { name: 'Chauvín Logística', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner Chauvín Logística' },
  { name: 'Playa Grande Retail', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner Playa Grande Retail' },
  { name: 'Puerto Mar del Plata', logoUrl: '/logo-envios-simplified.webp', alt: 'Partner Puerto Mar del Plata' },
];

/**
 * LogosCarousel Component
 * Infinite horizontal scrolling partner logo marquee.
 * Follows DESIGN.md specifications:
 * - Mask gradient: linear-gradient(to right, transparent, black 10%, black 90%, transparent)
 * - Track: flex, gap 48px, animation speed (default 30s)
 * - Items: h-12, grayscale contrast opacity
 * - Hover/Focus: grayscale(0) contrast(1) opacity-100
 * - Pause on hover, focusin, or document.hidden
 */
export const LogosCarousel: React.FC<LogosCarouselProps> = ({
  logos = DEFAULT_LOGOS,
  speed = 30,
  className,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Triple items list to ensure smooth infinite loop without visual gap
  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden py-4 select-none',
        className
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className={cn(
          'flex items-center gap-12 w-max animate-marquee',
          isPaused && 'animation-paused'
        )}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="h-12 flex items-center justify-center px-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
          >
            {item.logoSvg ? (
              <div className="h-8 w-auto flex items-center justify-center text-brand-blue-700">
                {item.logoSvg}
              </div>
            ) : item.logoUrl ? (
              <div className="relative h-8 w-32 flex items-center justify-center">
                <Image
                  src={item.logoUrl}
                  alt={item.alt || item.name}
                  width={120}
                  height={32}
                  className="object-contain max-h-8 w-auto"
                />
              </div>
            ) : (
              <span className="font-subheading text-base font-bold uppercase tracking-wider text-brand-blue-700">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogosCarousel;

```


---

## 12. `RadioCardGroup.tsx`

> **Path Relativa:** `src/components/ui/RadioCardGroup.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface RadioCardOption {
  id: string;
  label: string;
  description?: string;
  price?: string;
  badge?: string;
  serviceType?: 'EXPRESS' | 'LOW_COST' | 'FLEX' | string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioCardGroupProps {
  options: RadioCardOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
  gridCols?: string;
}

/**
 * RadioCardGroup Component
 * Interactive service selection grid with distinct checked states per service type.
 * Follows DESIGN.md specifications:
 * - Grid 3 cols desktop, 1 col mobile
 * - Card: bg-white, border-2 border-brand-blue-100, rounded-xl, p-6
 * - Checked Express: bg-brand-blue-700, border-brand-blue-700, text-white
 * - Checked LowCost: bg-brand-blue-50, border-brand-blue-200, text-brand-blue-700
 * - Checked Flex: bg-brand-yellow-50, border-brand-yellow-200, text-brand-blue-700
 */
export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({
  options,
  value,
  onChange,
  name = 'service-selector',
  className,
  gridCols = 'grid-cols-1 md:grid-cols-3',
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Selector de servicio"
      className={cn('grid gap-4 w-full', gridCols, className)}
    >
      {options.map((opt) => {
        const isChecked = value === opt.id;
        const type = (opt.serviceType || opt.id).toUpperCase();

        const getCheckedStyles = () => {
          if (type.includes('EXPRESS')) {
            return 'bg-brand-blue-700 border-brand-blue-700 text-white shadow-md';
          }
          if (type.includes('LOW') || type.includes('LOWCOST')) {
            return 'bg-brand-blue-50 border-brand-blue-200 text-brand-blue-700 shadow-sm';
          }
          if (type.includes('FLEX')) {
            return 'bg-brand-yellow-50 border-brand-yellow-200 text-brand-blue-700 shadow-sm';
          }
          return 'bg-brand-blue-700 border-brand-blue-700 text-white shadow-md';
        };

        const uncheckedStyles =
          'bg-white border-2 border-brand-blue-100 text-brand-blue-900 hover:border-brand-blue-200 hover:bg-brand-blue-50/30';

        const checkedStyles = isChecked ? getCheckedStyles() : uncheckedStyles;

        return (
          <label
            key={opt.id}
            role="radio"
            aria-checked={isChecked}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!opt.disabled) onChange(opt.id);
              }
            }}
            onClick={() => {
              if (!opt.disabled) onChange(opt.id);
            }}
            className={cn(
              'relative flex flex-col justify-between p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-500 focus-visible:ring-offset-2',
              checkedStyles,
              opt.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.id}
              checked={isChecked}
              onChange={() => onChange(opt.id)}
              disabled={opt.disabled}
              className="sr-only"
            />

            <div>
              {/* Card Header: Icon/Badge + Check indicator */}
              <div className="flex items-center justify-between mb-4">
                {opt.icon && (
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                      isChecked && type.includes('EXPRESS')
                        ? 'bg-white/20 text-white'
                        : 'bg-brand-blue-50 text-brand-blue-700 border border-brand-blue-100'
                    )}
                  >
                    {opt.icon}
                  </div>
                )}

                {opt.badge && (
                  <span
                    className={cn(
                      'font-subheading text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full',
                      isChecked && type.includes('EXPRESS')
                        ? 'bg-brand-yellow-500 text-brand-blue-900'
                        : 'bg-brand-blue-100 text-brand-blue-800'
                    )}
                  >
                    {opt.badge}
                  </span>
                )}

                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto transition-all',
                    isChecked
                      ? type.includes('EXPRESS')
                        ? 'bg-brand-yellow-500 border-brand-yellow-500 text-brand-blue-900'
                        : 'bg-brand-blue-700 border-brand-blue-700 text-white'
                      : 'border-brand-blue-200 bg-white'
                  )}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* Title & Description */}
              <h3
                className={cn(
                  'font-subheading text-xl uppercase tracking-wide font-bold mb-1',
                  isChecked && type.includes('EXPRESS') ? 'text-white' : 'text-brand-blue-900'
                )}
              >
                {opt.label}
              </h3>

              {opt.description && (
                <p
                  className={cn(
                    'text-xs font-sans leading-relaxed',
                    isChecked && type.includes('EXPRESS')
                      ? 'text-brand-blue-100'
                      : 'text-brand-blue-700/80'
                  )}
                >
                  {opt.description}
                </p>
              )}
            </div>

            {/* Price section if provided */}
            {opt.price && (
              <div className="mt-4 pt-3 border-t border-current/10 flex items-baseline justify-between">
                <span
                  className={cn(
                    'text-[10px] font-subheading uppercase tracking-wider',
                    isChecked && type.includes('EXPRESS') ? 'text-brand-blue-100' : 'text-brand-blue-400'
                  )}
                >
                  DESDE
                </span>
                <span
                  className={cn(
                    'font-mono text-lg font-bold tabular-nums',
                    isChecked && type.includes('EXPRESS')
                      ? 'text-brand-yellow-500'
                      : 'text-brand-blue-700'
                  )}
                >
                  {opt.price}
                </span>
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default RadioCardGroup;

```


---

## 13. `StepperHorizontal.tsx`

> **Path Relativa:** `src/components/ui/StepperHorizontal.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface HorizontalStep {
  title: string;
  subtitle?: string;
}

export interface StepperHorizontalProps {
  steps: HorizontalStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

/**
 * StepperHorizontal Component
 * Multi-step progress indicator for quoters and multi-step forms.
 * Follows DESIGN.md specifications:
 * - Line 2px: brand-blue-100 (completed: brand-yellow-500)
 * - Circles 40px: completed=yellow-500 (STRICTLY NO GREEN!), active=blue-700 + ring, pending=blue-100
 * - Labels: font-subheading text-xs uppercase tracking-wider
 */
export const StepperHorizontal: React.FC<StepperHorizontalProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn('w-full py-4', className)}>
      <div className="relative flex items-center justify-between w-full">
        {/* Background Step Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-brand-blue-100 -z-0" />

        {/* Active Step Progress Line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-brand-yellow-500 transition-all duration-300 -z-0"
          style={{
            width: `${(Math.min(currentStep, steps.length - 1) / Math.max(steps.length - 1, 1)) * 100}%`,
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;
          const isClickable = onStepClick && (isCompleted || isActive);

          return (
            <div
              key={idx}
              className="flex flex-col items-center relative z-10 group"
              onClick={() => isClickable && onStepClick(idx)}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onStepClick(idx);
                }
              }}
            >
              {/* Step Circle (40px) */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-subheading text-base font-bold transition-all duration-200 border-2 select-none',
                  isCompleted &&
                    'bg-brand-yellow-500 border-brand-yellow-500 text-brand-blue-900 shadow-sm',
                  isActive &&
                    'bg-brand-blue-700 border-brand-blue-700 text-white ring-4 ring-brand-blue-500/20 scale-105',
                  isPending &&
                    'bg-white border-brand-blue-100 text-brand-blue-400',
                  isClickable && 'cursor-pointer hover:scale-110'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[3] text-brand-blue-900" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center max-w-[120px]">
                <span
                  className={cn(
                    'block font-subheading text-xs uppercase tracking-wider font-bold transition-colors',
                    isCompleted && 'text-brand-blue-900',
                    isActive && 'text-brand-blue-700 font-extrabold',
                    isPending && 'text-brand-blue-400'
                  )}
                >
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className="block font-mono text-[10px] text-brand-blue-400/80 leading-tight mt-0.5">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperHorizontal;

```


---

## 14. `StepperVertical.tsx`

> **Path Relativa:** `src/components/ui/StepperVertical.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface VerticalStep {
  number?: string | number;
  title: string;
  description: string;
  detail?: string;
  badge?: string;
}

export interface StepperVerticalProps {
  steps: VerticalStep[];
  activeStep: number;
  completedSteps?: number[];
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * StepperVertical Component
 * Vertical timeline & process indicator ("How It Works", tracking steps).
 * Follows DESIGN.md specifications:
 * - Vertical line 2px left (brand-blue-100 or white/20 in dark mode)
 * - Dots 24px fixed left with 3px border
 * - Completed: brand-yellow-500 + brand-yellow-100 ring — STRICTLY NO GREEN!
 * - Active: brand-yellow-500 + ring-4 ring-brand-yellow-500/30 + pulse-subtle
 * - Pending: brand-blue-100 / muted
 * - Numbers in font-display text-2xl/h2
 */
export const StepperVertical: React.FC<StepperVerticalProps> = ({
  steps,
  activeStep,
  completedSteps,
  className,
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={cn('relative space-y-8 pl-8 md:pl-10', className)}>
      {/* Vertical Connecting Line */}
      <div
        className={cn(
          'absolute top-3 bottom-3 left-3 md:left-3.5 w-0.5 -translate-x-1/2 -z-0',
          isDark ? 'bg-white/20' : 'bg-brand-blue-100'
        )}
      />

      {steps.map((step, idx) => {
        const stepNum = step.number !== undefined ? step.number : idx + 1;
        const isCompleted =
          completedSteps?.includes(idx) ?? idx < activeStep;
        const isActive = idx === activeStep;
        const isPending = !isCompleted && !isActive;

        return (
          <div key={idx} className="relative flex items-start gap-4 md:gap-6 group">
            {/* Step Dot (24px fixed left) */}
            <div
              className={cn(
                'absolute -left-8 md:-left-10 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all duration-300 z-10',
                isCompleted &&
                  'bg-brand-yellow-500 border-white ring-4 ring-brand-yellow-100 text-brand-blue-900',
                isActive &&
                  'bg-brand-yellow-500 border-white ring-4 ring-brand-yellow-500/30 animate-pulse-subtle text-brand-blue-900 scale-110',
                isPending &&
                  (isDark
                    ? 'bg-brand-blue-900 border-white/20 text-brand-blue-300'
                    : 'bg-brand-blue-100 border-white text-brand-blue-400')
              )}
            >
              {isCompleted ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-current" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'font-display text-xl md:text-2xl tracking-tight uppercase leading-none',
                    isActive || isCompleted
                      ? isDark
                        ? 'text-brand-yellow-500'
                        : 'text-brand-blue-700'
                      : isDark
                      ? 'text-brand-blue-200/60'
                      : 'text-brand-blue-300'
                  )}
                >
                  {typeof stepNum === 'number' && stepNum < 10 ? `0${stepNum}` : stepNum}.
                </span>

                <h3
                  className={cn(
                    'font-display text-lg md:text-xl uppercase tracking-wide leading-tight',
                    isActive
                      ? isDark
                        ? 'text-white'
                        : 'text-brand-blue-900 font-bold'
                      : isCompleted
                      ? isDark
                        ? 'text-white/90'
                        : 'text-brand-blue-800'
                      : isDark
                      ? 'text-brand-blue-200/70'
                      : 'text-brand-blue-400'
                  )}
                >
                  {step.title}
                </h3>

                {step.badge && (
                  <span
                    className={cn(
                      'font-subheading text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full',
                      isActive
                        ? 'bg-brand-yellow-500 text-brand-blue-900'
                        : 'bg-brand-blue-100 text-brand-blue-800'
                    )}
                  >
                    {step.badge}
                  </span>
                )}
              </div>

              <p
                className={cn(
                  'font-sans text-xs md:text-sm leading-relaxed max-w-xl',
                  isDark ? 'text-brand-blue-100/90' : 'text-brand-blue-700/80'
                )}
              >
                {step.description}
              </p>

              {step.detail && (
                <p
                  className={cn(
                    'font-mono text-[11px] mt-1',
                    isDark ? 'text-brand-yellow-300' : 'text-brand-blue-500'
                  )}
                >
                  {step.detail}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepperVertical;

```


---

## 15. `timeline-animation.tsx`

> **Path Relativa:** `src/components/ui/timeline-animation.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client';

import React from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'motion/react';

// ─── Preset entrance variants — cinematographic quality ───────────────────────

export const timelineVariants = {
  /** Classic fade up — most versatile */
  fadeUp: {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
  } as Variants,

  /** Slide in from left with spring */
  slideLeft: {
    hidden:  { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 16 } },
  } as Variants,

  /** Slide in from right */
  slideRight: {
    hidden:  { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 16 } },
  } as Variants,

  /** Scale pop — for cards and icons */
  scalePop: {
    hidden:  { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } },
  } as Variants,

  /** Blur reveal — cinematic, for headlines */
  blurIn: {
    hidden:  { opacity: 0, y: 20, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  } as Variants,

  /** Clip reveal from bottom — editorial feel */
  clipUp: {
    hidden:  { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0 0 0)',   opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  } as Variants,

  /** Stagger container — apply to parent for child stagger */
  staggerContainer: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  } as Variants,

  /** Stagger item — use inside staggerContainer */
  staggerItem: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 17 } },
  } as Variants,
} as const;

export type TimelineVariantName = keyof typeof timelineVariants;

interface RenderMotionElementProps extends HTMLMotionProps<'div'> {
  as?: React.ElementType | string;
  custom?: unknown;
}

// Component to dynamically switch motion tags statically (React Compiler requirement)
function RenderMotionElement({
  as,
  children,
  className,
  style,
  variants,
  initial,
  whileInView,
  viewport,
  custom,
  ...rest
}: RenderMotionElementProps) {
  switch (as) {
    case 'p':
      return <motion.p className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.p>;
    case 'span':
      return <motion.span className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.span>;
    case 'h1':
      return <motion.h1 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h1>;
    case 'h2':
      return <motion.h2 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h2>;
    case 'h3':
      return <motion.h3 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h3>;
    case 'h4':
      return <motion.h4 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h4>;
    case 'h5':
      return <motion.h5 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h5>;
    case 'h6':
      return <motion.h6 className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.h6>;
    case 'section':
      return <motion.section className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.section>;
    case 'article':
      return <motion.article className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.article>;
    case 'aside':
      return <motion.aside className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.aside>;
    case 'header':
      return <motion.header className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.header>;
    case 'footer':
      return <motion.footer className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.footer>;
    case 'nav':
      return <motion.nav className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.nav>;
    default:
      return <motion.div className={className} style={style} variants={variants} initial={initial} whileInView={whileInView} viewport={viewport} custom={custom} {...rest}>{children}</motion.div>;
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface TimelineContentProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /** One of the built-in variant presets */
  variant?: TimelineVariantName;
  /** Override with fully custom variants */
  customVariants?: Variants;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** How many px below the viewport trigger point */
  viewportMargin?: string;
  /** Run animation only once (default: true) */
  once?: boolean;
  /** Render as a different element tag */
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TimelineContent({
  children,
  variant = 'fadeUp',
  customVariants,
  delay = 0,
  viewportMargin = '-80px',
  once = true,
  as = 'div',
  className,
  style,
  animationNum,
  timelineRef,
  ...rest
}: TimelineContentProps) {
  // Merge delay into the transition of whichever variants are active
  const activeVariants: Variants = customVariants ?? timelineVariants[variant];
  const resolvedVariants: Variants = delay > 0
    ? {
        ...activeVariants,
        visible: {
          ...(activeVariants.visible as object),
          transition: {
            ...((activeVariants.visible as { transition?: object })?.transition ?? {}),
            delay,
          },
        },
      }
    : activeVariants;

  return (
    <RenderMotionElement
      as={as}
      className={className}
      style={style}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
      custom={animationNum}
      {...rest}
    >
      {children}
    </RenderMotionElement>
  );
}

// ─── Convenience: stagger wrapper ─────────────────────────────────────────────

interface TimelineGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  viewportMargin?: string;
  once?: boolean;
  as?: React.ElementType;
}

/**
 * Wraps children and staggers their `staggerItem` entrance animations.
 * Each direct child should use `<TimelineContent variant="staggerItem" />`.
 */
export function TimelineGroup({
  children,
  className,
  style,
  delay = 0,
  viewportMargin = '-80px',
  once = true,
  as = 'div',
}: TimelineGroupProps) {
  const containerVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  return (
    <RenderMotionElement
      as={as}
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: viewportMargin }}
    >
      {children}
    </RenderMotionElement>
  );
}

```


---

## 16. `vertical-cut-reveal.tsx`

> **Path Relativa:** `src/components/ui/vertical-cut-reveal.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, type Transition, type Variants } from "motion/react"
import { cn } from "@/src/lib/utils"

interface TextProps {
  children: React.ReactNode
  reverse?: boolean
  transition?: Transition
  splitBy?: "words" | "characters" | "lines" | string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | "random" | number
  containerClassName?: string
  wordLevelClassName?: string
  elementLevelClassName?: string
  onClick?: () => void
  onStart?: () => void
  onComplete?: () => void
  autoStart?: boolean
}

export interface VerticalCutRevealRef {
  startAnimation: () => void
  reset: () => void
}

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
  (
    {
      children,
      reverse = false,
      transition = {
        type: "spring",
        stiffness: 190,
        damping: 22,
      },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null)
    const text = typeof children === "string" ? children : children?.toString() || ""
    const [isAnimating, setIsAnimating] = useState(false)

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
      }
      return Array.from(text)
    }

    const elements = useMemo(() => {
      const words = text.split(" ")
      if (splitBy === "characters") {
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }))
      }
      return splitBy === "words"
        ? text.split(" ")
        : splitBy === "lines"
          ? text.split("\n")
          : text.split(splitBy)
    }, [text, splitBy])

    const getStaggerDelay = useCallback(
      (index: number) => {
        const total =
          splitBy === "characters"
            ? (elements as WordObject[]).reduce(
                (acc, word) =>
                  acc +
                  (typeof word === "string"
                    ? 1
                    : word.characters.length + (word.needsSpace ? 1 : 0)),
                0
              )
            : elements.length
        if (staggerFrom === "first") return index * staggerDuration
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total)
          return Math.abs(randomIndex - index) * staggerDuration
        }
        if (typeof staggerFrom === "number") {
          return Math.abs(staggerFrom - index) * staggerDuration
        }
        return index * staggerDuration;
      },
      [elements, splitBy, staggerFrom, staggerDuration]
    )

    const startAnimation = useCallback(() => {
      setIsAnimating(true)
      onStart?.()
    }, [onStart])

    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }))

    useEffect(() => {
      if (autoStart) {
        startAnimation()
      }
    }, [autoStart, startAnimation])

    const variants: Variants = {
      hidden: { y: reverse ? "-100%" : "100%" },
      visible: (i: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: ((transition as Transition & { delay?: number })?.delay ?? 0) + getStaggerDelay(i),
        },
      }),
    }

    return (
      <span
        className={cn(
          containerClassName,
          "flex flex-wrap whitespace-pre-wrap",
          splitBy === "lines" && "flex-col"
        )}
        onClick={onClick}
        ref={containerRef}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {(splitBy === "characters"
          ? (elements as WordObject[])
          : (elements as string[]).map((el, i) => ({
              characters: [el],
              needsSpace: i !== elements.length - 1,
            }))
        ).map((wordObj, wordIndex, array) => {
          const previousCharsCount = array
            .slice(0, wordIndex)
            .reduce((sum, word) => sum + word.characters.length, 0)

          return (
            <span
              key={wordIndex}
              aria-hidden="true"
              className={cn("inline-flex overflow-hidden", wordLevelClassName)}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  className={cn(
                    elementLevelClassName,
                    "whitespace-pre-wrap relative"
                  )}
                  key={charIndex}
                >
                  <motion.span
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    animate={isAnimating ? "visible" : "hidden"}
                    variants={variants}
                    onAnimationComplete={
                      wordIndex === elements.length - 1 &&
                      charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordObj.needsSpace && <span> </span>}
            </span>
          )
        })}
      </span>
    )
  }
)

VerticalCutReveal.displayName = "VerticalCutReveal"

export { VerticalCutReveal }

```


---

## 17. `card.tsx`

> **Path Relativa:** `src/components/ui/card.tsx`  
> **Tipo:** Server Component [SC]  

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-brand-white-50 text-brand-blue-900 shadow-sm",
  {
    variants: {
      variant: {
        default: "border-brand-blue-100",
        bezel: "double-bezel-outer p-2 shadow-float-shadow bg-brand-blue-50/80 border-brand-blue-100",
        glass: "glass-card",
        elevated: "shadow-elevated hover:shadow-hover-lift transition-shadow duration-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = ({ className, variant, ref, ...props }: CardProps & { ref?: React.Ref<HTMLDivElement> }) => {
  if (variant === 'bezel') {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <div className="double-bezel-inner bg-white rounded-xl h-full shadow-inner relative overflow-hidden">
          {props.children}
        </div>
      </div>
    )
  }
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}
Card.displayName = "Card"

const CardHeader = ({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
)
CardHeader.displayName = "CardHeader"

const CardTitle = ({ className, ref, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-subheading uppercase tracking-wider leading-none text-brand-blue-700",
      className,
    )}
    {...props}
  />
)
CardTitle.displayName = "CardTitle"

const CardDescription = ({ className, ref, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) => (
  <p
    ref={ref}
    className={cn("text-sm text-brand-blue-400 font-sans leading-relaxed", className)}
    {...props}
  />
)
CardDescription.displayName = "CardDescription"

const CardContent = ({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = ({ className, ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```


---

## 18. `sparkles.tsx`

> **Path Relativa:** `src/components/ui/sparkles.tsx`  
> **Tipo:** Client Component [CC]  

```tsx
"use client"

import { useId } from "react"
import Particles, { ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  direction?: string;
  options?: Record<string, unknown>;
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  direction = "none",
  options = {},
}: SparklesProps) {
  const id = useId()

  const particlesInit = async (engine: Parameters<typeof loadSlim>[0]) => {
    await loadSlim(engine)
  }

  const defaultOptions = {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: color,
      },
      move: {
        enable: true,
        direction: direction as any,
        speed: {
          min: minSpeed || speed / 10,
          max: speed,
        },
        straight: false,
      },
      number: {
        value: density,
      },
      opacity: {
        value: {
          min: minOpacity || opacity / 10,
          max: opacity,
        },
        animation: {
          enable: true,
          sync: false,
          speed: opacitySpeed,
        },
      },
      size: {
        value: {
          min: minSize || size / 2.5,
          max: size,
        },
      },
    },
    detectRetina: true,
  }

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id={id} options={{ ...defaultOptions, ...options }} className={className} />
    </ParticlesProvider>
  )
}

```

