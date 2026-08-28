
// src/components/tracking/interactive-tracking-map.tsx
"use client";

import { useEffect, useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { RouteTracker } from '@/components/tracking/route-tracker';
import { Button } from '@/components/ui/button';
import { RefreshCw, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { GoogleMap } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

interface RoutePoint {
  location: Location;
  title: string;
  type: 'pickup' | 'delivery' | 'driver';
  completed?: boolean;
}

interface InteractiveTrackingMapProps {
  center: Location;
  routePoints?: RoutePoint[];
  driverLocation?: Location | null;
}

export function InteractiveTrackingMap({
  center,
  routePoints = [],
  driverLocation,
}: InteractiveTrackingMapProps) {
  const { map, isLoaded, error: mapError } = useGoogleMaps({ center });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleRefresh = () => {
    setLastUpdate(new Date());
    if (map && driverLocation) {
        map.panTo(driverLocation);
    }
  };

  const handleCenterOnDriver = () => {
    if (map && driverLocation) {
      map.panTo(driverLocation);
      map.setZoom(15);
    } else if (map && routePoints.length > 0) {
      map.panTo(routePoints[0].location);
      map.setZoom(15);
    }
  };
  
  useEffect(() => {
    if (isLoaded && map && (routePoints.length > 0 || driverLocation)) {
        const bounds = new window.google.maps.LatLngBounds();
        routePoints.forEach(point => bounds.extend(point.location));
        if (driverLocation) {
            bounds.extend(driverLocation);
        }
        
        if (map.getBounds()?.equals(bounds) && map.getZoom() !== null) {
            // If the bounds are already correct, don't refit, just pan if needed.
             if (driverLocation) map.panTo(driverLocation);
             else if (routePoints.length === 1) map.panTo(routePoints[0].location);
        } else {
            // Fit to bounds if there's more than one point or it's a new set of points
            map.fitBounds(bounds, 100); // 100px padding
        }

    } else if (isLoaded && map) {
        map.panTo(center);
        map.setZoom(13);
    }
  }, [isLoaded, map, driverLocation, routePoints, center]);


  if (mapError) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center p-6">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Error al Cargar el Mapa
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {mapError}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Intente recargar la página. Si el problema persiste, verifique su conexión a internet y asegúrese de que la API Key de Google Maps (<code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>) sea válida, esté configurada correctamente en su proyecto de Google Cloud (con la &quot;Maps JavaScript API&quot; habilitada y facturación activa) y no tenga restricciones que impidan su uso. Consulte la consola para más detalles.
            </p>
             <Button
                onClick={() => window.open(`https://maps.google.com/maps?ll=${center.lat},${center.lng}&z=13&t=m`, '_blank')}
                variant="outline"
                size="sm"
              >
                Abrir en Google Maps
              </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${driverLocation ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            <span className="text-sm font-medium">
              {driverLocation ? 'Repartidor en Ruta' : 'Esperando Ubicación'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 hidden sm:inline">
              Actualizado: {lastUpdate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <Button
              onClick={handleRefresh}
              size="icon"
              variant="outline"
              className="h-8 w-8"
              title="Actualizar ubicación del mapa"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCenterOnDriver}
              size="icon"
              variant="outline"
              className="h-8 w-8"
              title="Centrar en conductor"
              disabled={!driverLocation && routePoints.length === 0}
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative flex-grow">
        {!isLoaded && !mapError ? (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600">Cargando mapa...</p>
                </div>
            </div>
        ) : (
             <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%', minHeight: '300px' }}
                center={center}
                zoom={13}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                }}
            >
                {isLoaded && map && (
                <RouteTracker
                    map={map}
                    isLoaded={isLoaded}
                    routePoints={routePoints}
                    driverLocation={driverLocation || undefined}
                />
                )}
            </GoogleMap>
        )}
      </div>
    </div>
  );
}
