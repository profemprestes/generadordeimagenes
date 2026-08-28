// src/lib/context/service-context-map.ts
export const serviceContextMap: Record<string, { name: string, path: string }> = {
  'delivery-gastronomico': {
    name: 'Delivery Gastronómico',
    path: 'src/app/servicios/delivery-gastronomico/page.tsx'
  },
  'envios-express': {
    name: 'Envíos Express',
    path: 'src/app/servicios/envios-express/page.tsx'
  },
  'enviosflex': {
    name: 'Mercado Libre Flex',
    path: 'src/app/servicios/enviosflex/page.tsx'
  },
  'envios-lowcost': {
    name: 'Envíos LowCost',
    path: 'src/app/servicios/envios-lowcost/page.tsx'
  },
  'moto-fija': {
    name: 'Moto Fija',
    path: 'src/app/servicios/moto-fija/page.tsx'
  },
  'plan-emprendedores': {
    name: 'Plan Emprendedores',
    path: 'src/app/servicios/plan-emprendedores/page.tsx'
  },
};
