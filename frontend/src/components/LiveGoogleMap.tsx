'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const GOOGLE_MAP_SRC = `https://maps.gomaps.pro/maps/api/js?key=AlzaSyImDLbhEdnr5HQ6UD0L0JOBEU2x7b7BUtU`;

const LiveGoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
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
    let isMounted = true;

    const init = async () => {
      try {
        await loadGoogleMapsScript();

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (!isMounted) return;

            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };

            setPosition(coords);
            setAccuracy(pos.coords.accuracy);

            console.log("📍 Accurate Coordinates:", coords, "Accuracy:", pos.coords.accuracy);

            if (pos.coords.accuracy > 100) {
              alert("⚠️ Location accuracy is low. Try moving outdoors or enabling GPS.");
            }
          },
          (err) => {
            console.error("❌ Geolocation error:", err);
            alert("Failed to fetch location. Please enable location services.");
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } catch (err) {
        console.error("❌ Google Maps init error:", err);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!position || !mounted || mapInstance.current || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 17,
    });

    new window.google.maps.Marker({
      position,
      map,
      title: 'You are here!',
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/4871/4871384.png',
        scaledSize: new window.google.maps.Size(32, 32),
      },
    });

    mapInstance.current = map;
  }, [position, mounted]);

  if (!mounted) return null;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-center mb-2">Live Google Map</h2>
      <div
        ref={mapRef}
        className="w-full h-[300px] rounded shadow bg-gray-100"
        id="map"
      >
        {!position && (
          <p className="text-center pt-10 text-sm text-gray-500">Fetching location...</p>
        )}
      </div>
      {accuracy !== null && (
        <p className="text-sm text-center mt-2 text-gray-600">
          Accuracy: ±{Math.round(accuracy)} meters
        </p>
      )}
    </div>
  );
};

export default LiveGoogleMap;
