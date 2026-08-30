import { SERVICE_CONTEXT_MAP, serviceContextMap, ServiceContextKey } from "./service-context-map";

export function getServiceContext(serviceKey: ServiceContextKey | string) {
  const context = SERVICE_CONTEXT_MAP[serviceKey as ServiceContextKey];
  if (!context) {
    throw new Error(`Servicio desconocido: ${serviceKey}`);
  }
  return context;
}

export function getServiceContextFromPath(path: string) {
  const entry = Object.values(serviceContextMap).find((item) => item.path === path || path.includes(item.path || '___none___'));
  if (entry) {
    return entry.context;
  }
  // Try matching slug from path
  for (const [key, ctx] of Object.entries(SERVICE_CONTEXT_MAP)) {
    if (path.includes(key)) {
      return ctx;
    }
  }
  return null;
}
