/**
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
      name: "Soft Blue Tint",
      hex: "#E6EEFE"
    }
  },

  typography: {
    display: "Anton (display H1/H2)",
    subheading: "Bebas Neue (subheadings/badges)",
    body: "Outfit (body)",
    technical: "Geist Mono (métricas/precios)"
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
    photo: `Brand anchor: Envíos DosRuedas (Mar del Plata). Aesthetic: High-Velocity Cobalt, Safety-Yellow Impact, Digital Dispatch Modernism. Couriers wear Deep Cobalt navy polos (#0636A5) with Lemon Yellow trim (#FFEC01) and yellow caps. Fleet: light-blue urban scooters with square top delivery boxes. Parcels: clean kraft cardboard boxes. Natural Atlantic coastal sunlight (Mar del Plata landmarks or Friuli 1972 hub). Shot on Sony A7R IV / Canon EOS R5, documentary commercial realism, high resolution, no artificial logo renders.`,

    render3d: `Style anchor: Glossy 3D product render in Envíos DosRuedas brand style. Aesthetic: Kinetic Industrialism, High-Velocity Cobalt (#0636A5), Lemon Yellow (#FFEC01) accents, clean kraft cardboard, glossy light-blue surfaces. Soft upper-left studio illumination, subtle contact shadow, pure white cutout background (#FFFFFF). Rounded friendly proportions, ultra-realistic textures, no text.`,

    isometric: `Style anchor: 30-degree isometric 3D architectural illustration in Envíos DosRuedas style. Pale-blue city blocks (#E6EEFE), white grid avenues, Deep Cobalt (#0636A5) and Lemon Yellow (#FFEC01) logistics nodes and route pathways. Pure white background, clean clay-like shading, high resolution.`
  }
} as const;
