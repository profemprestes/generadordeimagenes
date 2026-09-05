import { Sparkles, MessageCircle, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#052C87] text-slate-200 py-10 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#FFF12E] text-[#052C87] rounded-full shadow-[0_0_15px_rgba(255,241,46,0.35)]">
              <Sparkles className="w-4 h-4 text-[#052C87]" />
            </div>
            <div>
              <p className="text-white font-normal text-base font-display uppercase tracking-wider">Envíos DosRuedas</p>
              <p className="text-xs text-blue-200 font-subheading tracking-wider">Suite de Creación Visual IA · Mar del Plata</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-200">
            <Link href="/" className="hover:text-[#FFF12E] transition-colors">Dashboard</Link>
            <Link href="/generales" className="hover:text-[#FFF12E] transition-colors">Generales</Link>
            <Link href="/servicios" className="hover:text-[#FFF12E] transition-colors">Servicios</Link>
            <Link href="/optimas" className="hover:text-[#FFF12E] transition-colors">Óptimas</Link>
            <Link href="/generar-imagen" className="hover:text-[#FFF12E] transition-colors">Generar</Link>
            <Link href="/hero" className="hover:text-[#FFF12E] transition-colors">Hero</Link>
            <Link href="/ui-optimizer" className="hover:text-[#FFF12E] transition-colors">Optimizador</Link>
            <a
              href="https://www.enviosdosruedas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#FFF12E] hover:underline"
            >
              <span>Sitio Oficial</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-3 font-mono">
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FFF12E]" />
            <span>Friuli 1972, Mar del Plata, Argentina</span>
          </p>
          <p>&copy; {currentYear} Envíos DosRuedas. Logística Urbana & Visual AI.</p>
        </div>
      </div>
    </footer>
  );
}
