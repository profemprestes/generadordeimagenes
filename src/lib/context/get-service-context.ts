import { SERVICE_CONTEXT_MAP, ServiceContextKey } from "./service-context-map";

export function getServiceContext(serviceKey: ServiceContextKey) {
  const context = SERVICE_CONTEXT_MAP[serviceKey];
  if (!context) {
    throw new Error(`Servicio desconocido: ${serviceKey}`);
  }
  return context;
}
