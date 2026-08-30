import fs from 'node:fs';
import path from 'node:path';

const files = {
  // 1. src/lib/empresa.json
  'src/lib/empresa.json': JSON.stringify({
    empresa: {
      nombre_oficial: "Envíos DosRuedas",
      nombre_comercial: "Envíos DosRuedas | Logística E-commerce y Mensajería MDP",
      tagline: "El Motor de su Última Milla",
      categoria_gbp: "Servicio de mensajería y transporte",
      descripcion: "Somos tu aliado estratégico en logística urbana y mensajería de última milla con más de 7 años de trayectoria en Mar del Plata. Especialistas en soluciones E-commerce, MercadoLibre Flex y distribución urbana con flota propia de motos.",
      año_vigencia: 2026,
      trayectoria_años: 7,
      metricas_clave: {
        envios_realizados: "+50K",
        calificacion_google: 5.0,
        resenas_google: 15,
        paquetes_extraviados: 0,
        flota_propia: "100% motos propias sin tercerización"
      }
    },
    contacto_y_ubicacion: {
      base_operativa: {
        direccion: "Friuli 1972",
        barrio: "Chauvín",
        ciudad: "Mar del Plata",
        provincia: "Buenos Aires",
        codigo_postal: "B7608DEE",
        pais: "Argentina",
        coordenadas: { lat: -38.028406, lng: -57.5926499 }
      },
      canales: {
        telefono_whatsapp: "+54 223 660-2699",
        whatsapp_url: "https://wa.me/542236602699",
        email_comercial: "matiascejas@enviosdosruedas.com",
        website: "https://www.enviosdosruedas.com/",
        redes: {
          instagram: "https://instagram.com/enviosdosruedas",
          facebook: "https://www.facebook.com/enviosdosruedas"
        }
      },
      horarios_atencion: {
        lunes_a_viernes: "09:00 - 18:00 hs",
        sabados: "10:00 - 15:00 hs",
        domingos: "Cerrado"
      },
      zona_cobertura: "Mar del Plata y Partido de General Pueyrredón completo (Centro, Chauvín, Güemes, Playa Grande, Mogotes, Batán, Camet, Puerto)"
    },
    identidad_visual: {
      colores: {
        primary_brand: "#0636A5",
        brand_ink: "#00277C",
        conversion_accent: "#FFEC01",
        surface_white: "#FFFFFF",
        surface_tint: "#E6EEFE"
      },
      tipografia: {
        display: "Anton",
        subheading: "Bebas Neue",
        body: "Outfit",
        mono: "Geist Mono"
      }
    }
  }, null, 2),

  // 2. src/lib/brand-style.ts
  'src/lib/brand-style.ts': `/**
 * BRANDING STYLE GUIDE - ENVÍOS DOSRUEDAS
 * Fuente oficial: Brand Book Pomelli & Design System Oficial 2026
 */

export const BRAND_STYLE = {
  name: "Envíos DosRuedas",
  tagline: "El Motor de su Última Milla",
  city: "Mar del Plata, Argentina",
  hub: "Friuli 1972, Chauvín, Mar del Plata",

  colors: {
    primary: {
      name: "Deep Cobalt",
      hex: "#0636A5",
      rgb: "6, 54, 165",
      cmyk: "96%, 67%, 0%, 35%",
      hsl: "222, 93%, 34%"
    },
    accent: {
      name: "Lemon Yellow / Safety-Yellow",
      hex: "#FFEC01",
      rgb: "255, 236, 1",
      cmyk: "0%, 7%, 100%, 0%",
      hsl: "56, 100%, 50%"
    },
    surface: {
      name: "Pure White",
      hex: "#FFFFFF",
      rgb: "255, 255, 255"
    },
    ink: {
      name: "Brand Ink",
      hex: "#00277C"
    },
    tint: {
      name: "Soft Ice Blue",
      hex: "#E6EEFE"
    }
  },

  typography: {
    display: "Anton (uppercase, tight tracking)",
    subheading: "Bebas Neue (uppercase, tracking-widest)",
    body: "Outfit (clean geometric sans-serif)",
    technical: "Geist Mono (tabular figures, precise rates)"
  },

  aesthetic: [
    "High-Velocity Cobalt",
    "Safety-Yellow Impact",
    "Kinetic Industrialism",
    "Digital Dispatch Modernism",
    "Data-Driven Efficiency"
  ],

  values: ["Confianza", "Responsabilidad", "Eficiencia", "Transparencia"],
  tone: ["Professional", "Reliable", "Approachable", "Local MDQ"],

  promptAnchors: {
    photo: \`Brand anchor: Envíos DosRuedas (Mar del Plata). Aesthetic: High-Velocity Cobalt, Safety-Yellow Impact, Digital Dispatch Modernism. Couriers wear Deep Cobalt navy polos (#0636A5) with Lemon Yellow trim (#FFEC01) and yellow caps. Fleet: light-blue urban scooters with square top delivery boxes. Parcels: clean kraft cardboard boxes. Natural Atlantic coastal sunlight (Mar del Plata landmarks or Friuli 1972 hub). Shot on Sony A7R IV / Canon EOS R5, documentary commercial realism, high resolution, no artificial logo renders.\`,

    render3d: \`Style anchor: Glossy 3D product render in Envíos DosRuedas brand style. Aesthetic: Kinetic Industrialism, High-Velocity Cobalt (#0636A5), Lemon Yellow (#FFEC01) accents, clean kraft cardboard, glossy light-blue surfaces. Soft upper-left studio illumination, subtle contact shadow, pure white cutout background (#FFFFFF). Rounded friendly proportions, ultra-realistic textures, no text.\`,

    isometric: \`Style anchor: 30-degree isometric 3D architectural illustration in Envíos DosRuedas style. Pale-blue city blocks (#E6EEFE), white grid avenues, Deep Cobalt (#0636A5) and Lemon Yellow (#FFEC01) logistics nodes and route pathways. Pure white background, clean clay-like shading, high resolution.\`
  }
} as const;
`,

  // 3. src/lib/context/envios-express.ts
  'src/lib/context/envios-express.ts': `export const enviosExpressContext = {
  id: "envios-express",
  nombre: "Envíos Express",
  nombre_gbp: "Envíos Express / Mensajería Urgente",
  sla: "Entrega en franja de 3 hs o < 90 min",
  corte_pedido: "15:00 hs",
  anticipacion_minima: "2 horas",
  tarifas_2026: {
    base_hasta_3km: 3700,
    rango_3_a_5km: 4600,
    rango_5_a_7km: 6100,
    rango_7_a_10km: 8200,
    excedente_mas_10km: "1000 por km adicional (Math.ceil)"
  },
  condiciones_adicionales: {
    bulto_excedente: "Mayor a 5kg o 40x40x30cm: adicional desde $1.800",
    retorno_vuelta: "50% del valor original",
    segunda_visita: "100% (se computa como nuevo viaje)",
    lluvia_calle_mojada: "+50%",
    demora_espera: "10 min tolerancia sin cargo. $2.200 cada 10 min adicionales"
  },
  prompt_anchor_visual: "A courier in navy polo (#0636A5) and yellow cap (#FFEC01) on a light-blue delivery scooter waiting at a busy downtown Mar del Plata avenue traffic light, checking delivery route on a handlebar-mounted phone."
};
`,

  // 4. src/lib/context/envios-lowcost.ts
  'src/lib/context/envios-lowcost.ts': `export const enviosLowCostContext = {
  id: "envios-lowcost",
  nombre: "Envíos LowCost",
  nombre_gbp: "Envíos Lowcost / Cadetería Programada",
  sla: "Entrega garantizada antes de las 19:00 hs",
  corte_pedido: "13:00 hs",
  anticipacion_minima: "2 horas para organización de hoja de ruta",
  tarifas_2026: {
    z1_hasta_3km: 3000,
    z2_3_a_5km: 4000,
    z3_5_a_7km: 5300,
    z4_7_a_10km: 7000,
    z5_mas_10km: "700 por km adicional (Math.ceil)"
  },
  condiciones_adicionales: {
    segunda_visita: "100% del valor (nuevo envío)",
    ahorro: "Hasta 30% agrupando entregas por planilla",
    cobranza_destino: "Sin costo adicional (contrareembolso gratuito)"
  },
  prompt_anchor_visual: "Inside a compact distribution hub, dozens of kraft parcels sorted into labelled crates on steel shelving, courier in navy polo scanning a box near a roll-up door with daylight."
};
`,

  // 5. src/lib/context/envios-flex.ts
  'src/lib/context/envios-flex.ts': `export const enviosFlexContext = {
  id: "envios-flex",
  nombre: "Envíos Flex",
  nombre_gbp: "Envío Flex / Reparto E-Commerce",
  sla: "Same-Day antes de las 20:00 hs (Ventas hasta las 15:00 hs)",
  niveles_flex: {
    nivel_1_inicial: {
      volumen: "1 a 4 envíos/día",
      tarifas: "Z1 $3.000 | Z2 $4.000 | Z3 $5.300 | Z4 $7.000 | Z5 $700/km",
      segunda_visita: "50% en todas las zonas"
    },
    nivel_2_frecuente: {
      volumen: "+5 envíos/día",
      tarifas: "Z1 $3.000 | Z2 $4.000 | Z3 $5.300 | Z4 y Z5 tope fijo $6.500",
      segunda_visita: "Zona 1 Sin Cargo (Z2 a Z5 al 50%)"
    },
    nivel_3_cuentas: {
      volumen: "+10 envíos/día",
      tarifas: "Tarifa Plana $4.500 a todo Mar del Plata",
      segunda_visita: "100% Bonificada / Sin Cargo en todas las zonas"
    }
  },
  recargo_lluvia: "Reducido exclusivo para Flex al 30%",
  prompt_anchor_visual: "A smiling courier in navy polo and yellow cap handing a kraft parcel with marketplace shipping label to a customer at a residential front door in Mar del Plata."
};
`,

  // 6. src/lib/context/plan-emprendedores.ts
  'src/lib/context/plan-emprendedores.ts': `export const planEmprendedoresContext = {
  id: "plan-emprendedores",
  nombre: "Plan Emprendedores & E-Commerce",
  nombre_gbp: "Plan Emprendedores / Reparto E-Commerce",
  modalidades: {
    ecommerce_24hs: {
      descripcion: "Retiro hoy y entrega mañana en toda la ciudad (franja 9 a 20 hs)",
      escalas_tarifa_plana: [
        { nivel: "Inicial (1-199 envíos/mes)", valor: 3800 },
        { nivel: "Pro (200-1.199 envíos/mes)", valor: 3500 },
        { nivel: "Elite (1.200-1.999 envíos/mes)", valor: 3200 },
        { nivel: "Partner (+2.000 envíos/mes)", valor: 3000 }
      ],
      retiro_diario: "Gratis superando 10 paquetes. Si es menor: $4.000",
      opcion_dropoff: "20% de descuento directo despachando en depósito Friuli 1972"
    },
    cuenta_corriente_flexible: {
      descripcion: "Para PyMEs sin volumen fijo. Tarifa LowCost con beneficios de franja Express",
      liquidacion: "Diaria, Semanal, Quincenal o Mensual con Factura C"
    }
  },
  prompt_anchor_visual: "Young entrepreneur setting kraft parcels on the reception counter at Friuli 1972 logistics hub, staff member in navy polo entering intake on a tablet."
};
`,

  // 7. src/lib/context/fulfillment-3pl.ts
  'src/lib/context/fulfillment-3pl.ts': `export const fulfillment3plContext = {
  id: "fulfillment-3pl",
  nombre: "E-Commerce & 3PL Fulfillment",
  nombre_gbp: "Servicio de logística",
  sla: "Same-Day (pedidos hasta las 15:00 hs se entregan en el día)",
  ubicacion_stock: "Depósito central en Friuli 1972, Chauvín",
  tarifa_integral_plana: 6000,
  servicios_incluidos: [
    "Almacenamiento y control de stock operativo",
    "Preparación (Picking QR) y embalaje básico (bolsa y film estándar)",
    "Entrega Same Day en todo Mar del Plata (9 a 20 hs)",
    "Cobranza contra entrega (contrareembolso) sin cargo",
    "2da visita 100% bonificada"
  ],
  prompt_anchor_visual: "Bright warehouse interior at Friuli 1972, steel shelving with QR-tagged bins, worker in navy polo packing kraft box on an epoxy floor."
};
`,

  // 8. src/lib/context/service-context-map.ts
  'src/lib/context/service-context-map.ts': `import { enviosExpressContext } from "./envios-express";
import { enviosLowCostContext } from "./envios-lowcost";
import { enviosFlexContext } from "./envios-flex";
import { planEmprendedoresContext } from "./plan-emprendedores";
import { fulfillment3plContext } from "./fulfillment-3pl";

export const SERVICE_CONTEXT_MAP = {
  "envios-express": enviosExpressContext,
  "envios-lowcost": enviosLowCostContext,
  "envios-flex": enviosFlexContext,
  "plan-emprendedores": planEmprendedoresContext,
  "fulfillment-3pl": fulfillment3plContext
} as const;

export type ServiceContextKey = keyof typeof SERVICE_CONTEXT_MAP;
`,

  // 9. src/lib/context/get-service-context.ts
  'src/lib/context/get-service-context.ts': `import { SERVICE_CONTEXT_MAP, ServiceContextKey } from "./service-context-map";

export function getServiceContext(serviceKey: ServiceContextKey) {
  const context = SERVICE_CONTEXT_MAP[serviceKey];
  if (!context) {
    throw new Error(\`Servicio desconocido: \${serviceKey}\`);
  }
  return context;
}
`,

  // 10. src/ai/flows/brand-anchors.ts
  'src/ai/flows/brand-anchors.ts': `import { BRAND_STYLE } from "../../lib/brand-style";

export const BRAND_PHOTO_ANCHOR = BRAND_STYLE.promptAnchors.photo;
export const BRAND_3D_ANCHOR = BRAND_STYLE.promptAnchors.render3d;
export const BRAND_ISO_ANCHOR = BRAND_STYLE.promptAnchors.isometric;
export const BRAND_AESTHETIC_TAGS = BRAND_STYLE.aesthetic.join(", ");
`,

  // 11. src/ai/flows/generate-service-image-prompt.ts
  'src/ai/flows/generate-service-image-prompt.ts': `import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { getServiceContext } from "../../lib/context/get-service-context";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR, BRAND_ISO_ANCHOR } from "./brand-anchors";
import { BRAND_STYLE } from "../../lib/brand-style";

export const GenerateServiceImagePromptInputSchema = z.object({
  serviceId: z.enum([
    "envios-express",
    "envios-lowcost",
    "envios-flex",
    "plan-emprendedores",
    "fulfillment-3pl"
  ]),
  styleMode: z.enum(["photo", "render3d", "isometric"]).default("photo"),
  targetLocationOrUse: z.string().optional()
});

export const GenerateServiceImagePromptOutputSchema = z.object({
  prompt: z.string(),
  alt_es: z.string(),
  filename_kebab: z.string(),
  aspect_ratio: z.enum(["16:9", "4:3", "1:1"]),
  aesthetic_tags: z.array(z.string())
});

export const generateServiceImagePromptFlow = defineFlow(
  {
    name: "generateServiceImagePrompt",
    inputSchema: GenerateServiceImagePromptInputSchema,
    outputSchema: GenerateServiceImagePromptOutputSchema
  },
  async ({ serviceId, styleMode, targetLocationOrUse }) => {
    const service = getServiceContext(serviceId);

    const anchor =
      styleMode === "render3d"
        ? BRAND_3D_ANCHOR
        : styleMode === "isometric"
        ? BRAND_ISO_ANCHOR
        : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: \`You are the lead Art Director & Prompt Engineer for Envíos DosRuedas (Mar del Plata, Argentina).
Brand Aesthetic Pillars (Pomelli Brand Book & Google Business Profile 2026):
- High-Velocity Cobalt (#0636A5)
- Safety-Yellow Impact (#FFEC01)
- Kinetic Industrialism & Digital Dispatch Modernism
- Data-Driven Efficiency & Local Reliability

Prompt Construction Rules:
1. Always prepend the specific brand anchor.
2. Structure the prompt into 6 components: Subject, Action, Mar del Plata Context, Angle/Framing, Lighting, Camera/Render specs.
3. Keep surfaces clean: DO NOT generate overlaid typography or fake rendered logos on photos (logos are placed in post-production).
4. Provide a descriptive alt text in Argentinian Spanish and a clean kebab-case .webp filename.\`,
      prompt: \`Service: \${service.nombre} (\${service.nombre_gbp})
SLA / Operational Focus: \${service.sla}
Base Hub: \${BRAND_STYLE.hub}
Target Placement: \${targetLocationOrUse || "Service Hero Asset"}
Style Mode: \${styleMode}
Anchor to use: \${anchor}\`,
      output: {
        schema: GenerateServiceImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
`,

  // 12. src/ai/flows/generate-image-prompt.ts
  'src/ai/flows/generate-image-prompt.ts': `import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { BRAND_PHOTO_ANCHOR, BRAND_3D_ANCHOR } from "./brand-anchors";

export const GenerateImagePromptInputSchema = z.object({
  topic: z.string(),
  aspectRatio: z.enum(["16:9", "4:3", "1:1", "3:2"]).default("16:9"),
  sceneType: z.enum(["editorial_photo", "product_3d", "social_media_action"]).default("editorial_photo")
});

export const GenerateImagePromptOutputSchema = z.object({
  prompt_en: z.string(),
  alt_es: z.string(),
  target_aspect_ratio: z.string(),
  recommended_resolution: z.string()
});

export const generateImagePromptFlow = defineFlow(
  {
    name: "generateImagePrompt",
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema
  },
  async ({ topic, aspectRatio, sceneType }) => {
    const anchor = sceneType === "product_3d" ? BRAND_3D_ANCHOR : BRAND_PHOTO_ANCHOR;

    const response = await ai.generate({
      system: \`You are the lead visual art director for Envíos DosRuedas (Mar del Plata logistics company).
Generate precise, high-conversion prompts for diffusion models (Imagen 3 / SDXL / Flux).
- Include local Mar del Plata landmarks when relevant (Chauvín, Güemes, Rambla, Casino Central, Friuli 1972 hub).
- Uniforms: navy blue Deep Cobalt (#0636A5) with Lemon Yellow (#FFEC01) details and yellow cap.
- Fleet: light-blue scooters with square delivery boxes.
- No text overlays or artificial logos.\`,
      prompt: \`Create a visual prompt for the following topic: "\${topic}".
Aspect ratio: \${aspectRatio}.
Scene type: \${sceneType}.
Anchor to prepend: \${anchor}\`,
      output: {
        schema: GenerateImagePromptOutputSchema
      }
    });

    return response.output!;
  }
);
`,

  // 13. src/ai/flows/suggest-service-image-details.ts
  'src/ai/flows/suggest-service-image-details.ts': `import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { ai } from "../genkit";
import { SERVICE_CONTEXT_MAP } from "../../lib/context/service-context-map";

export const SuggestServiceImageDetailsInputSchema = z.object({
  serviceKey: z.string()
});

export const SuggestServiceImageDetailsOutputSchema = z.object({
  recommendedScenes: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      recommendedRatio: z.enum(["16:9", "4:3", "1:1"]),
      suggestedStyle: z.enum(["photo", "render3d", "isometric"])
    })
  )
});

export const suggestServiceImageDetailsFlow = defineFlow(
  {
    name: "suggestServiceImageDetails",
    inputSchema: SuggestServiceImageDetailsInputSchema,
    outputSchema: SuggestServiceImageDetailsOutputSchema
  },
  async ({ serviceKey }) => {
    const service = SERVICE_CONTEXT_MAP[serviceKey as keyof typeof SERVICE_CONTEXT_MAP];

    const response = await ai.generate({
      system: \`You are a creative planner for Envíos DosRuedas digital assets in Mar del Plata. Suggest 3 high-impact scene ideas for marketing and Google Business profile posts.\`,
      prompt: \`Service: \${service?.nombre || serviceKey}
Details: \${JSON.stringify(service || {})}\`,
      output: {
        schema: SuggestServiceImageDetailsOutputSchema
      }
    });

    return response.output!;
  }
);
`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Creado / actualizado: ${filePath}`);
}

console.log('\\n🚀 Todos los archivos de branding y contexto han sido actualizados con éxito.');