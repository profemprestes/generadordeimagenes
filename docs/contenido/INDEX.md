# 📚 ÍNDICE MAESTRO DE NODOS DE DOCUMENTACIÓN · Envíos DosRuedas

> **Directorio:** `docs/contenido/`  
> **Objetivo de Eficiencia de Tokens:** Cada archivo es un **nodo modular autocontenido**. Contiene la ruta relativa de la página de `src/app/`, su código completo y el código de todos sus componentes asociados.  
> Para inspeccionar o modificar una sección específica, **solo es necesario cargar su archivo correspondiente** sin sobrecargar el contexto.

## 🌐 Nodos de Páginas (`src/app/`)

| Nodo Documentado | URL | Path Relativa Página | Componentes Incluidos |
|------------------|-----|----------------------|-----------------------|
| [Home (Inicio)](./home.md) | `/` | `src/app/page.tsx` | 8 componentes con código |
| [Contacto Comercial & Soporte](./contacto.md) | `/contacto` | `src/app/contacto/page.tsx` | 4 componentes con código |
| [Cotizador Express](./cotizar-express.md) | `/cotizar/express` | `src/app/cotizar/express/page.tsx` | 4 componentes con código |
| [Cotizador LowCost](./cotizar-lowcost.md) | `/cotizar/lowcost` | `src/app/cotizar/lowcost/page.tsx` | 5 componentes con código |
| [Servicio Envíos Express](./servicios-express.md) | `/servicios/envios-express` | `src/app/servicios/envios-express/page.tsx` | 4 componentes con código |
| [Servicio Envíos LowCost](./servicios-lowcost.md) | `/servicios/envios-lowcost` | `src/app/servicios/envios-lowcost/page.tsx` | 5 componentes con código |
| [Servicio Envíos Flex](./servicios-flex.md) | `/servicios/enviosflex` | `src/app/servicios/enviosflex/page.tsx` | 6 componentes con código |
| [Servicio Plan Emprendedores / 3PL](./servicios-emprendedores.md) | `/servicios/plan-emprendedores` | `src/app/servicios/plan-emprendedores/page.tsx` | 4 componentes con código |
| [Sobre Nosotros & Historia](./nosotros-sobre.md) | `/nosotros/sobre-nosotros` | `src/app/nosotros/sobre-nosotros/page.tsx` | 6 componentes con código |
| [Preguntas Frecuentes (FAQ)](./nosotros-faq.md) | `/nosotros/preguntas-frecuentes` | `src/app/nosotros/preguntas-frecuentes/page.tsx` | 5 componentes con código |
| [Nuestras Redes & Comunidad](./nosotros-redes.md) | `/nosotros/nuestras-redes` | `src/app/nosotros/nuestras-redes/page.tsx` | 5 componentes con código |
| [Política de Privacidad](./politica-de-privacidad.md) | `/politica-de-privacidad` | `src/app/politica-de-privacidad/page.tsx` | 1 componentes con código |
| [Términos y Condiciones](./terminos-y-condiciones.md) | `/terminos-y-condiciones` | `src/app/terminos-y-condiciones/page.tsx` | 1 componentes con código |

## 🏛️ Estructura Global y UI Kit

| Nodo | Descripción | Archivo |
|------|-------------|---------|
| **Layout Global** | Root layout, Header, Footer, MobileNav, Template y Carrusel | [layout-global.md](./layout-global.md) |
| **UI Components Kit** | DoubleBezelCard, CTANestedPill, Steppers, Inputs, Mapas, etc. | [ui-components.md](./ui-components.md) |

## 💡 Guía Rápida para Agentes y Desarrolladores

1. **Consultar una página:** Abre directamente el archivo Markdown de la página (ej: `docs/contenido/cotizar-express.md`). Tendrás la página y todos sus componentes con código completo en un único archivo.
2. **Ahorro de Tokens:** No abras el proyecto completo ni todos los archivos TSX por separado. Carga únicamente el nodo que necesitas.
3. **Diseño y Estilos:** Para componentes atómicos base, consulta `docs/contenido/ui-components.md` o la raíz `DESIGN.md`.
