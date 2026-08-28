// src/lib/context/get-service-context.ts
import deliveryGastronomico from '@/lib/context/delivery-gastronomico';
import enviosExpress from '@/lib/context/envios-express';
import enviosFlex from '@/lib/context/envios-flex';
import enviosLowcost from '@/lib/context/envios-lowcost';
import motoFija from '@/lib/context/moto-fija';
import planEmprendedores from '@/lib/context/plan-emprendedores';
import { serviceContextMap } from '@/lib/context/service-context-map';

const contexts: Record<string, any> = {
  'delivery-gastronomico': deliveryGastronomico,
  'envios-express': enviosExpress,
  'enviosflex': enviosFlex,
  'envios-lowcost': enviosLowcost,
  'moto-fija': motoFija,
  'plan-emprendedores': planEmprendedores,
};

// Gets context based on service name (e.g., "Delivery Gastronómico")
export function getServiceContext(serviceName: string): any | null {
    const contextKey = Object.keys(serviceContextMap).find(key => serviceContextMap[key].name === serviceName);
    if (!contextKey) return null;
    return contexts[contextKey] || null;
}

// Gets context based on file path (e.g., 'src/app/servicios/delivery-gastronomico/page.tsx')
export function getServiceContextFromPath(relativePath: string): any | null {
    const pathSegments = relativePath.split('/');
    const pageSegment = pathSegments[pathSegments.length - 2];
    
    if (pageSegment && contexts[pageSegment]) {
        return contexts[pageSegment];
    }
    
    return null;
}
