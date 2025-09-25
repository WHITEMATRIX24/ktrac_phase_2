"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { Input } from "@/components/ui/input";

interface SeverityDistribution {
  minor: number;
  major: number;
  fatal: number;
  insignificant:number;
}

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
  severity: "Minor" | "Major" | "Fatal";
  details: {
    total: number;
/*     fatalities: number;
 */    severity_distribution: SeverityDistribution;
  };
}

interface ReportMapProps {
  data: Coordinate[];
  title?: string;
  isLoading?: boolean;
}

const getSeverityColor = (severity?: string) => {
  switch (severity) {
    case "Fatal":
      return "red";
    case "Major":
      return "orange";
    case "Minor":
      return "green";
    default:
      return "blue";
  }
};

const getCustomIcon = (severity?: string) =>
  new L.Icon({
    iconUrl: `/marker-icon-${getSeverityColor(severity)}.png`,
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const AutoFitBounds = ({ coordinates }: { coordinates: [number, number][] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [coordinates, map]);

  return null;
};

const ReportMap: React.FC<ReportMapProps> = ({ data, title, isLoading }) => {
    

 // const center: LatLngTuple = [10.0, 76.0];
 const center: LatLngTuple = [10.8505, 76.2711]; // Approx. center of Kerala

  const boundsCoords: [number, number][] = data.map((loc) => [
    loc.lat,
    loc.lng,
  ]);

  return (
    <div className="flex flex-col gap-4 w-[90%] border m-5 p-5">
{/*       {title && <h2 className="text-lg font-semibold">{title}</h2>}
 */}
      
      {/* Map */}
      <div className="rounded-md border w-full overflow-hidden h-[60vh] relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-gray-500">Loading map...</p>
          </div>
        ) : (
          <MapContainer
            center={center}
            zoom={18}
            scrollWheelZoom={true}
            className="w-full h-full z-10"
          >
            <TileLayer
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

            {data
  .filter((loc) => loc.details.total >1)
  .map((loc, index) => (
    <Marker
      key={index}
      position={[loc.lat, loc.lng]}
      icon={getCustomIcon(loc.severity)}
    >
      <Popup>
        <div className="text-sm">
          <strong>{loc.label}</strong><br />
          Total Accidents: {loc.details.total}<br />
{/*           Fatalities: {loc.details.fatalities}<br />
 */}          Minor: {loc.details.severity_distribution.minor},{" "}
          Major: {loc.details.severity_distribution.major},{" "}
          Fatal: {loc.details.severity_distribution.fatal},{" "}
          Insignificant:{loc.details.severity_distribution.insignificant}
        </div>
      </Popup>
    </Marker>
))}

            <AutoFitBounds coordinates={boundsCoords} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ReportMap;
