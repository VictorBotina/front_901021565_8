//V03
"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from "@/lib/types";

// Arreglo para el icono por defecto de Leaflet que a veces no carga en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const activeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


type GeoMapProps = {
  locations: Location[];
  center: [number, number];
  zoom: number;
  onMarkerClick: (location: Location) => void;
  activeLocationId?: string;
};

// Componente para centrar el mapa cuando cambia la ubicación activa
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.5 });
  }, [center, zoom, map]);
  return null;
};

const GeoMap: React.FC<GeoMapProps> = ({ locations, center, zoom, onMarkerClick, activeLocationId }) => {
    const [mapCenter, setMapCenter] = React.useState<[number, number]>(center);
    const [mapZoom, setMapZoom] = React.useState<number>(zoom);

    React.useEffect(() => {
        if (activeLocationId) {
            const activeLoc = locations.find(l => l.id_dane === activeLocationId);
            if (activeLoc) {
                setMapCenter([activeLoc.latitud, activeLoc.longitud]);
                setMapZoom(14);
            }
        }
    }, [activeLocationId, locations]);

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} className="h-full w-full">
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map(location => (
                <Marker
                    key={location.id_dane}
                    position={[location.latitud, location.longitud]}
                    icon={activeLocationId === location.id_dane ? activeIcon : defaultIcon}
                    eventHandlers={{
                        click: () => onMarkerClick(location),
                    }}
                />
            ))}
        </MapContainer>
    );
};

export default React.memo(GeoMap);
