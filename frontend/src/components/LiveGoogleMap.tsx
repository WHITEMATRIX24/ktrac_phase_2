'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const GOOGLE_MAP_SRC = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyImDLbhEdnr5HQ6UD0L0JOBEU2x7b7BUtU`;

interface LiveGoogleMapProps {
  coordinates: { lat: number; lng: number };
}

const LiveGoogleMap: React.FC<LiveGoogleMapProps> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return;

      if (window.google?.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${GOOGLE_MAP_SRC}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        return;
      }

      const script = document.createElement('script');
      script.src = GOOGLE_MAP_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps script failed to load'));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    if (!mounted || !coordinates || !mapRef.current) return;

    loadGoogleMapsScript()
      .then(() => {
        const { lat, lng } = coordinates;

        if (!mapInstance.current) {
          // Initialize the map once
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 17,
          });
          mapInstance.current = map;

          // Add initial marker
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title: 'Selected location',
            icon: {
              url: 'https://cdn-icons-png.flaticon.com/512/4871/4871384.png',
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });
          markerInstance.current = marker;
        } else {
          // Update center and marker on new coordinates
          mapInstance.current.setCenter({ lat, lng });
          if (markerInstance.current) {
            markerInstance.current.setPosition({ lat, lng });
          }
        }
      })
      .catch((err) => {
        console.error("Google Maps init error:", err);
      });
  }, [coordinates, mounted]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-center mb-2">Live Google Map</h2>
      <div
        ref={mapRef}
        className="w-full h-[300px] rounded shadow bg-gray-100"
        id="map"
      />
    </div>
  );
};

export default LiveGoogleMap;
