import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Footer } from "@/components/layout/footer";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <AdminHeader />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground mb-3">404</h1>
          <h2 className="text-xl font-bold text-foreground mb-2">Herramienta o página no encontrada</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            La página que buscas no existe o ha sido reestructurada.
          </p>

          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Volver al Estudio
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

