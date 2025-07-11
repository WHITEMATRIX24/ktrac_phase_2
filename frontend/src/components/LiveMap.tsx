// 'use client';
// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

// const LiveMap = () => {
//   const [position, setPosition] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error('Geolocation error:', err);
//         }
//       );
//     }
//   }, []);

//   const icon = L.icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/4871/4871384.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   if (!position) return <p className="text-center mt-10">Fetching location...</p>;

//   return (
//     <MapContainer center={position} zoom={15} style={{ height: '200px', width: '100%' }}>
//       <TileLayer
//         attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position} icon={icon}>
//         <Popup>You are here!</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default LiveMap;
