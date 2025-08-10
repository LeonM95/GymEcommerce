// components/MaptilerComponent.tsx

"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Marker icon fix - This is crucial for Next.js 13+
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MaptilerComponentProps {
  lat: number;
  lng: number;
}

export default function MaptilerComponent({
  lat,
  lng,
}: MaptilerComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  // This component now ONLY renders on the client.
  // We can safely define client-side variables here.
  const maptilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  const position: L.LatLngExpression = [lat, lng];

  if (!maptilerApiKey) {
    return <div>API Key Missing</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
        url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerApiKey}`}
      />
      <Marker position={position}>
        <Popup>GymCore!</Popup>
      </Marker>
    </MapContainer>
  );
}
