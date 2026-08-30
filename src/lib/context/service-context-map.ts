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
