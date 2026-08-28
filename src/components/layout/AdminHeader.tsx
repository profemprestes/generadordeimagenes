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
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl"
          : "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50"
      )}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5 font-display">
              ESTUDIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">IA</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">Suite Visual & Prompts</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/70">
          {toolsNavItems.map((item) => {
            const ItemIcon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                )}
              >
                <ItemIcon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
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
                <Button variant="ghost" size="icon" className="text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[310px] bg-slate-950 text-slate-100 pt-10 border-slate-800">
                <SheetHeader className="mb-6 flex flex-row items-center space-x-3 text-left">
                  <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <SheetTitle className="text-white font-bold text-base font-display">Estudio de Imágenes IA</SheetTitle>
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
                              ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-900"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <ItemIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
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
