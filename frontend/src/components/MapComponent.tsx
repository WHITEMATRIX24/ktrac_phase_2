import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

interface MapProps {
    latitude: number;
    longitude: number;
    onLocationChange: (lat: number, lng: number) => void;
}

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const LocationMarker = ({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click(e) {
            onLocationChange(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    map.setView([lat, lng], map.getZoom());
    return null;
};

const MapComponent: React.FC<MapProps> = ({ latitude, longitude, onLocationChange }) => {
    const position: LatLngExpression = [latitude, longitude];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="w-full h-52 rounded z-10">
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon} />
            <LocationMarker onLocationChange={onLocationChange} />
            <RecenterMap lat={latitude} lng={longitude} />
        </MapContainer>
    );
};

export default MapComponent;
