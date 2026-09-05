import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AdminHeader />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md mx-auto text-center p-8 rounded-3xl border border-white/10 bg-card shadow-2xl">
          <div className="w-16 h-16 bg-[#FFF12E] text-[#052C87] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,241,46,0.35)]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-6xl font-normal font-display text-foreground mb-2 uppercase">404</h1>
          <h2 className="text-xl font-normal font-display uppercase text-foreground mb-2">Herramienta no encontrada</h2>
          <p className="text-muted-foreground mb-8 text-sm font-sans">
            La página que buscas no existe o ha sido reestructurada en el estudio de Envíos DosRuedas.
          </p>

          <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4 text-[#052C87]" />
              <span>Volver al Estudio</span>
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

