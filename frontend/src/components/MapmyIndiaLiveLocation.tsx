'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    mappls: any;
  }
}

const MAP_KEY = 'e6c49a0f21518d6bbf38108faa3aa79c'; // 🔁 Replace this with your real Map SDK Key

export default function MapmyIndiaLiveLocation() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapPlotted, setMapPlotted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load MapmyIndia SDK dynamically in browser
  const loadMapmyIndiaSDK = () =>
    new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') return reject('Not running in browser');

      if (window.mappls) return resolve(); // Already loaded

      const existing = document.getElementById('mapmyindia-sdk');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        return;
      }

      const script = document.createElement('script');
      script.id = 'mapmyindia-sdk';
      script.src = `https://apis.mappls.com/advancedmaps/v1/${MAP_KEY}/map_load?v=1.5`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('❌ Failed to load MapmyIndia SDK'));
      document.body.appendChild(script);
    });

useEffect(() => {
  const init = async () => {
    try {
      await loadMapmyIndiaSDK();

      const waitForMapRef = () =>
        new Promise<void>((resolve, reject) => {
          let attempts = 0;
          const interval = setInterval(() => {
            if (mapRef.current) {
              clearInterval(interval);
              resolve();
            }
            if (attempts > 10) {
              clearInterval(interval);
              reject('DOM not ready');
            }
            attempts++;
          }, 100);
        });

      await waitForMapRef();

      if (!window.mappls || !mapRef.current) {
        setError('MapmyIndia SDK not available or DOM not ready');
        return;
      }

      if (!navigator.geolocation) {
        setError('Geolocation not supported.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const map = new window.mappls.Map(mapRef.current, {
            center: [lon, lat],
            zoom: 14,
          });

          new window.mappls.Marker({
            map,
            position: { lat, lng: lon },
            title: 'Your Location',
          });

          setMapPlotted(true);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Please allow location access.');
        },
        { enableHighAccuracy: true }
      );
    } catch (err: any) {
      console.error('MapmyIndia SDK init error:', err);
      setError(err.message || 'SDK/DOM failed to load');
    }
  };

  init();
}, []);


  return (
    <div className="w-full h-[500px] mt-4 border rounded-md relative shadow">
      {!mapPlotted && !error && (
        <p className="absolute top-2 left-2 text-sm text-blue-600">🔄 Loading map...</p>
      )}
      {error && (
        <p className="absolute top-2 left-2 text-sm text-red-600 font-medium">{error}</p>
      )}
      {mapPlotted && (
        <p className="absolute top-2 left-2 text-sm text-green-600 font-medium">✅ Map Ready</p>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
