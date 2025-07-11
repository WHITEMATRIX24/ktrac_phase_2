'use client';

import { useEffect, useRef, useState } from 'react';

export default function TomTomLiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load TomTom SDK JS + CSS
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadTomTomSDK = () => {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).tt) return resolve();

        const existingScript = document.querySelector('script[src*="maps-web.min.js"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('TomTom JS load error')));
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/maps/maps-web.min.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('TomTom JS failed to load'));
        document.head.appendChild(script);

        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/maps/maps.css';
        document.head.appendChild(css);
      });
    };

    loadTomTomSDK()
      .then(() => {
        console.log('✅ TomTom SDK loaded');
        setSdkLoaded(true);
      })
      .catch((err) => {
        console.error('❌', err.message);
        setError(err.message);
      });
  }, []);

  // Initialize map after SDK is ready
  useEffect(() => {
    if (!sdkLoaded || !mapRef.current || typeof window === 'undefined') return;

    const tt = (window as any).tt;

    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`📍 Your location: ${latitude}, ${longitude}`);

        const map = tt.map({
          key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
          container: mapRef.current,
          center: [longitude, latitude],
          zoom: 14,
        });

        // Add user location marker
        new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
      },
      (err) => {
        console.error('❌ Geolocation error:', err.message);
        setError(err.message);
      }
    );
  }, [sdkLoaded]);

  return (
    <div className="w-full h-[500px] border rounded shadow">
      {error ? (
        <div className="text-red-600 p-4">Error: {error}</div>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </div>
  );
}
