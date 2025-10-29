//V02
"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from "@/lib/types";

// Arreglo para el icono por defecto de Leaflet que a veces no carga en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


type GeoMapProps = {
  locations: Location[];
  center: [number, number];
  zoom: number;
  onMarkerClick: (location: Location) => void;
  activeLocation?: Location & { details: any };
};

// Componente para centrar el mapa cuando cambia la ubicación activa
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const GeoMap: React.FC<GeoMapProps> = ({ locations, center, zoom, onMarkerClick, activeLocation }) => {
    const activeMarkerRef = React.useRef<L.Marker | null>(null);
    const [mapCenter, setMapCenter] = React.useState<[number, number]>(center);
    const [mapZoom, setMapZoom] = React.useState<number>(zoom);

    React.useEffect(() => {
        if (activeLocation) {
            setMapCenter([activeLocation.latitud, activeLocation.longitud]);
            setMapZoom(14); 
            setTimeout(() => {
                activeMarkerRef.current?.openPopup();
            }, 100);
        }
    }, [activeLocation]);

    const handleMarkerClick = (location: Location) => {
        onMarkerClick(location);
    };

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
                    eventHandlers={{
                        click: () => handleMarkerClick(location),
                    }}
                    ref={ref => {
                        if (activeLocation && activeLocation.id_dane === location.id_dane) {
                            activeMarkerRef.current = ref;
                        }
                    }}
                >
                    {activeLocation && activeLocation.id_dane === location.id_dane && activeLocation.details && (
                        <Popup>
                            <div className="space-y-2 font-body">
                                <h3 className="font-bold text-lg text-title">{activeLocation.details.municipio}</h3>
                                <p className="text-sm"><strong className="font-semibold">Departamento:</strong> {activeLocation.details.departamento}</p>
                                <p className="text-sm"><strong className="font-semibold">Dirección:</strong> {activeLocation.details.direccion}</p>
                                <p className="text-sm"><strong className="font-semibold">Horario:</strong> {activeLocation.details.horario_atencion}</p>
                                {activeLocation.details.servicios_sub && (
                                    <div>
                                        <h4 className="font-semibold mt-2">Servicios Subsidiado</h4>
                                        <p className="text-xs text-muted-foreground">{activeLocation.details.servicios_sub}</p>
                                    </div>
                                )}
                                {activeLocation.details.servicios_cont && (
                                     <div>
                                        <h4 className="font-semibold mt-2">Servicios Contributivo</h4>
                                        <p className="text-xs text-muted-foreground">{activeLocation.details.servicios_cont}</p>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    )}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default React.memo(GeoMap);