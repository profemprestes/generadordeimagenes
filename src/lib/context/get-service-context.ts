import { SERVICE_CONTEXT_MAP, serviceContextMap, ServiceContextKey } from "./service-context-map";

/**
 * Normalizes any service name or string to a valid ServiceContextKey
 */
export function normalizeServiceKey(serviceNameOrKey: string): ServiceContextKey | null {
  if (!serviceNameOrKey) return null;
  const lower = serviceNameOrKey.trim().toLowerCase();

  if (lower in SERVICE_CONTEXT_MAP) {
    return lower as ServiceContextKey;
  }

  // Exact or fuzzy label matching
  if (lower.includes("express") || lower.includes("urgente")) return "envios-express";
  if (lower.includes("lowcost") || lower.includes("low cost") || lower.includes("low-cost") || lower.includes("economico") || lower.includes("económico")) return "envios-lowcost";
  if (lower.includes("flex") || lower.includes("ecommerce") || lower.includes("mercado")) return "envios-flex";
  if (lower.includes("emprendedor") || lower.includes("plan")) return "plan-emprendedores";
  if (lower.includes("fulfillment") || lower.includes("3pl") || lower.includes("almacen") || lower.includes("deposito") || lower.includes("depósito")) return "fulfillment-3pl";

  return null;
}

export function getServiceContext(serviceKeyOrName: ServiceContextKey | string) {
  const normalizedKey = normalizeServiceKey(serviceKeyOrName);
  if (normalizedKey && SERVICE_CONTEXT_MAP[normalizedKey]) {
    return SERVICE_CONTEXT_MAP[normalizedKey];
  }

  // Fallback direct check
  if (serviceKeyOrName in SERVICE_CONTEXT_MAP) {
    return SERVICE_CONTEXT_MAP[serviceKeyOrName as ServiceContextKey];
  }

  throw new Error(`Servicio desconocido o sin contexto definido: "${serviceKeyOrName}". Servicios válidos: ${Object.keys(SERVICE_CONTEXT_MAP).join(", ")}`);
}

export function getServiceContextFromPath(path: string) {
  const entry = Object.values(serviceContextMap).find((item) => item.path === path || path.includes(item.path || '___none___'));
  if (entry) {
    return entry.context;
  }
  // Try matching slug from path
  for (const [key, ctx] of Object.entries(SERVICE_CONTEXT_MAP)) {
    if (path.toLowerCase().includes(key)) {
      return ctx;
    }
  }

  const normalized = normalizeServiceKey(path);
  if (normalized) {
    return SERVICE_CONTEXT_MAP[normalized];
  }

  return null;
}
