
"use client";

import { useRef, useCallback, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface UseGoogleMapsProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
};

export function useGoogleMaps({ center, zoom = 13 }: UseGoogleMapsProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const isApiKeyValid = googleMapsApiKey && googleMapsApiKey !== "YOUR_GOOGLE_MAPS_API_KEY";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ['places', 'drawing'],
    preventGoogleFontsLoading: true,
    language: 'es',
    region: 'AR',
  });
  
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const onLoad = useCallback(
    function callback(mapInstance: google.maps.Map) {
      if (!isApiKeyValid) {
        setError("La clave de API de Google Maps no está configurada o es inválida.");
        return;
      }
      mapInstance.setOptions({ ...mapOptions, center, zoom });
      setMap(mapInstance);
    },
    [center, zoom, isApiKeyValid]
  );

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);
  
  if (loadError && !error) {
     setError(`Error al cargar la API de Google Maps: ${loadError.message}`);
  }

  return { 
    mapRef: mapContainerRef, 
    map, 
    isLoaded: isLoaded && isApiKeyValid && !loadError, 
    error 
  };
}
