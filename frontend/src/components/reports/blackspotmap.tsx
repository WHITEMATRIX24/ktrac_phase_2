"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { Input } from "@/components/ui/input";

interface Coordinate {
  lat: number;
  lng: number;
  label?: string;
  date?: string;
}

interface ReportMapProps {
  data: Coordinate[];
  title?: string;
  isLoading?: boolean;
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = data.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.label?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStartDate =
      !startDate || new Date(item.date || "") >= new Date(startDate);

    const matchesEndDate =
      !endDate || new Date(item.date || "") <= new Date(endDate);

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const center: LatLngTuple = [10.0, 76.0]; // Initial center (used just to initialize)

  const boundsCoords: [number, number][] = filteredLocations.map((loc) => [
    loc.lat,
    loc.lng,
  ]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}

      {/* Filters */}
      <div className="flex items-center justify-between py-2 flex-wrap gap-4">
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <label className="text-sm font-medium">From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md p-1 text-sm w-[130px] bg-gray-100"
            />
          </div>
          <div className="flex gap-1 items-center">
            <label className="text-sm font-medium">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md p-1 text-sm w-[130px] bg-gray-100"
            />
          </div>
        </div>
        <Input
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-100"
        />
      </div>

      {/* Map */}
      <div className="rounded-md border w-full overflow-hidden h-[60vh] relative">
        {isLoading ? (
          <p className="text-center mt-10">Loading map...</p>
        ) : (
          <MapContainer
            center={center}
            zoom={10}
            scrollWheelZoom={true}
            className="w-full h-full z-10"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.lat, loc.lng]}
                icon={customIcon}
              />
            ))}
            <AutoFitBounds coordinates={boundsCoords} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default ReportMap;
