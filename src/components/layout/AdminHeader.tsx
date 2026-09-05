// src/components/layout/AdminHeader.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Sparkles, ChevronRight, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
          ? "bg-[#052C87]/90 backdrop-blur-xl border-b border-white/15 shadow-2xl"
          : "bg-[#052C87]/95 backdrop-blur-md border-b border-white/10"
      )}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-6 max-w-6xl">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 bg-[#FFF12E] text-[#052C87] rounded-full shadow-[0_0_20px_rgba(255,241,46,0.35)] group-hover:shadow-[0_0_25px_rgba(255,241,46,0.55)] transition-all duration-300 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-[#052C87] transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-normal text-white tracking-tight flex items-center gap-1.5 font-display uppercase">
              ENVÍOS <span className="text-[#FFF12E]">DOSRUEDAS</span>
            </span>
            <span className="text-[10px] text-blue-200 uppercase tracking-widest font-subheading">Estudio de Imágenes IA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#031c59]/80 p-1.5 rounded-full border border-white/10">
          {toolsNavItems.map((item) => {
            const ItemIcon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200",
                  active
                    ? "bg-[#FFF12E] text-[#052C87] shadow-[0_0_15px_rgba(255,241,46,0.35)]"
                    : "text-slate-200 hover:text-white hover:bg-white/10"
                )}
              >
                <ItemIcon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider",
                    active
                      ? "bg-[#052C87] text-[#FFF12E]"
                      : "bg-[#FFF12E] text-[#052C87]"
                  )}>
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
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[310px] bg-[#052C87] text-white pt-10 border-white/15">
                <SheetHeader className="mb-6 flex flex-row items-center space-x-3 text-left">
                  <div className="p-2.5 bg-[#FFF12E] text-[#052C87] rounded-full shadow-[0_0_15px_rgba(255,241,46,0.35)]">
                    <Sparkles className="w-5 h-5 text-[#052C87]" />
                  </div>
                  <div>
                    <SheetTitle className="text-white font-normal text-base font-display uppercase tracking-wider">Envíos DosRuedas</SheetTitle>
                    <p className="text-xs text-blue-200 font-subheading tracking-wider">Estudio de Imágenes IA</p>
                  </div>
                </SheetHeader>

                <div className="flex flex-col space-y-2 mt-4">
                  {toolsNavItems.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-3 px-4 rounded-2xl transition-all duration-200 text-left uppercase text-xs font-bold tracking-wider",
                            active
                              ? "bg-[#FFF12E] text-[#052C87] shadow-[0_0_20px_rgba(255,241,46,0.30)]"
                              : "text-slate-100 hover:text-white hover:bg-white/10"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <ItemIcon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge ? (
                            <span className={cn(
                              "text-[10px] font-extrabold px-2 py-0.5 rounded-full",
                              active
                                ? "bg-[#052C87] text-[#FFF12E]"
                                : "bg-[#FFF12E] text-[#052C87]"
                            )}>
                              {item.badge}
                            </span>
                          ) : (
                            <ChevronRight className="w-4 h-4 opacity-50" />
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
