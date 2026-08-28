import { Sparkles, Wand2, Shield, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Estudio de Generación de Imágenes con IA</p>
              <p className="text-xs text-slate-500">Optimizado para modelos de última generación</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/generales" className="hover:text-white transition-colors">Generales</Link>
            <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
            <Link href="/optimas" className="hover:text-white transition-colors">Óptimas</Link>
            <Link href="/hero" className="hover:text-white transition-colors">Hero</Link>
            <Link href="/ui-optimizer" className="hover:text-white transition-colors">Optimizador UI</Link>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-6 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {currentYear} Estudio de Imágenes IA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

