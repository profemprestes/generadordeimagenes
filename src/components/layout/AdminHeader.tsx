// src/components/layout/AdminHeader.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Wand2, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toolsNavItems } from "@/lib/navigation";

export function AdminHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary-foreground/10"
          : "bg-primary"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
            <Sparkles className="w-6 h-6 text-amber-300 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Estudio de Imágenes IA
            </span>
            <span className="text-xs text-blue-200">Generación y Optimización Visual</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {toolsNavItems.map((item) => {
            const ItemIcon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-white/20 text-white font-semibold shadow-inner"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                )}
              >
                <ItemIcon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        {isMounted && (
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[310px] bg-slate-900 text-white pt-10 border-slate-800">
                <SheetHeader className="mb-6 flex flex-row items-center space-x-3 text-left">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <SheetTitle className="text-white font-bold text-base">Estudio de Imágenes IA</SheetTitle>
                    <p className="text-xs text-slate-400">Herramientas de Creación Visual</p>
                  </div>
                </SheetHeader>

                <div className="flex flex-col space-y-1.5 mt-4">
                  {toolsNavItems.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-3 px-3.5 rounded-xl transition-all duration-200 text-left",
                            active
                              ? "bg-primary text-white font-semibold shadow-md"
                              : "text-slate-300 hover:text-white hover:bg-slate-800"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <ItemIcon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          {item.badge ? (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 opacity-40" />
                          )}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export { AdminHeader as Header };

