
// src/components/ui/HeroSection.tsx
'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Button, type buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight, Mail, Star, Home, Truck, Calculator as CalculatorIcon, Users, ChevronDown, Menu, X } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ArrowRight,
  Mail,
  Star,
  Home,
  Truck,
  Calculator: CalculatorIcon,
  Users,
  ChevronDown,
  Menu,
  X,
};

interface CtaButtonProps {
  text: string;
  href?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  icon?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  asChild?: boolean;
  className?: string;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  preTitle?: React.ReactNode;
  description?: string | React.ReactNode;
  ctaButtons?: CtaButtonProps[];
  backgroundType?: 'color' | 'gradient' | 'image';
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  backgroundOverlayOpacity?: number;
  textColorClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  visualElement?: React.ReactNode;
  layout?: 'center-stacked' | 'split-visual-right' | 'split-visual-left';
  minHeight?: string;
  contentMaxWidth?: string;
  textAlignment?: 'text-center' | 'text-left' | 'text-right';
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 12,
    },
  },
};

const visualElementVariants = {
  hidden: { x: 30, opacity: 0, scale: 0.95 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 15,
      delay: 0.2,
    },
  },
};

export function HeroSection({
  title,
  preTitle,
  description,
  ctaButtons,
  backgroundType = 'gradient',
  backgroundColor = 'bg-background',
  backgroundGradient = 'bg-gradient-to-br from-[#0950F6] via-[#073ec2] to-[#052C87]',
  backgroundImageUrl,
  backgroundImageAlt = 'Hero background image',
  backgroundOverlayOpacity = 0,
  textColorClassName = 'text-white',
  titleClassName = 'text-4xl sm:text-5xl lg:text-7xl font-normal font-display tracking-tight uppercase leading-[0.98]',
  descriptionClassName = 'text-base sm:text-lg lg:text-xl text-blue-100/90 leading-relaxed font-sans',
  visualElement,
  layout = 'center-stacked',
  minHeight = 'min-h-[60vh] md:min-h-[70vh]',
  contentMaxWidth = 'max-w-4xl',
  textAlignment = 'text-center',
  className = '',
  children,
  priority = false,
}: HeroSectionProps) {

  const ContentWrapper = motion.div;
  const itemWrapperProps = { variants: itemVariants };

  const VisualWrapper = motion.div;
  const visualWrapperRightProps = {
    variants: visualElementVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
  };

  let bgClasses = '';
  if (backgroundType === 'color') bgClasses = backgroundColor;
  else if (backgroundType === 'gradient') bgClasses = backgroundGradient;

  const sectionClasses = cn(
    'relative flex items-center overflow-hidden',
    minHeight,
    bgClasses,
    className
  );

  const contentContainerClasses = cn(
    'relative z-10 container mx-auto px-4 w-full',
    'py-12 sm:py-16 md:py-24 lg:py-28'
  );

  const textContentWrapper = (
     <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        textColorClassName,
        layout === 'center-stacked' ? `mx-auto ${contentMaxWidth} ${textAlignment}` :
        (layout === 'split-visual-right' ? `${textAlignment} lg:text-left` :
         layout === 'split-visual-left' ? `${textAlignment} lg:text-right` : textAlignment),
      )}
    >
      {preTitle && (
        <motion.div variants={itemVariants}>
          {typeof preTitle === 'string' ? (
            <Badge className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider font-subheading" variant="yellow">{preTitle}</Badge>
          ) : preTitle}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className={cn(titleClassName, 'mt-4')}>
        {title}
      </motion.div>

      {description && (
        <motion.div variants={itemVariants} className={cn('mt-5', descriptionClassName, 'max-w-xl', textAlignment === 'text-left' ? 'mr-auto' : textAlignment === 'text-right' ? 'ml-auto' : 'mx-auto')}>
            {description}
        </motion.div>
      )}

      {children && <motion.div variants={itemVariants} className="mt-6 md:mt-8">{children}</motion.div>}

      {ctaButtons && ctaButtons.length > 0 && (
        <motion.div
          variants={itemVariants}
          className={cn(
            'mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto',
            textAlignment === 'text-center' ? 'justify-center' :
            (layout === 'split-visual-right' || textAlignment === 'text-left') ? 'justify-start' :
            (layout === 'split-visual-left' || textAlignment === 'text-right') ? 'justify-end' :
            'justify-center'
          )}
        >
          {ctaButtons.map((button, index) => {
            const IconComponent = button.icon ? iconMap[button.icon] : null;
            return (
              <motion.div key={index} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={button.variant || 'cta'}
                  size="lg"
                  asChild={!!button.href && !button.onClick}
                  onClick={button.onClick}
                  className={cn(
                    'font-bold text-sm sm:text-base rounded-full uppercase tracking-wider transition-all duration-300 w-full sm:w-auto',
                    button.className
                  )}
                >
                  {button.href && !button.onClick ? (
                    <Link href={button.href} target={button.target} rel={button.rel}>
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      {button.text}
                    </Link>
                  ) : (
                    <>
                      {IconComponent && <IconComponent className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                      {button.text}
                    </>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <motion.section
      className={sectionClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {backgroundType === 'image' && backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={80}
          priority={priority}
          className="z-0"
        />
      )}
      {backgroundType === 'image' && backgroundOverlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black z-0"
          style={{ opacity: backgroundOverlayOpacity }}
        ></div>
      )}

      <div className={contentContainerClasses}>
        {layout === 'center-stacked' && textContentWrapper}
        {layout === 'split-visual-right' && (
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-1">{textContentWrapper}</div>
            {visualElement && (
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                {visualElement}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
