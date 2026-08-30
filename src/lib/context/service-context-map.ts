import { enviosExpressContext } from "./envios-express";
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

export const serviceContextMap: Record<ServiceContextKey, { path?: string; context: any }> = {
  "envios-express": { path: "src/app/servicios/envios-express/page.tsx", context: enviosExpressContext },
  "envios-lowcost": { path: "src/app/servicios/envios-lowcost/page.tsx", context: enviosLowCostContext },
  "envios-flex": { path: "src/app/servicios/envios-flex/page.tsx", context: enviosFlexContext },
  "plan-emprendedores": { path: "src/app/servicios/plan-emprendedores/page.tsx", context: planEmprendedoresContext },
  "fulfillment-3pl": { path: "src/app/servicios/fulfillment-3pl/page.tsx", context: fulfillment3plContext }
};
