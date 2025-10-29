//V02
"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from "@/lib/types";
import Image from "next/image";
import { MapPin, Clock, ChevronDown } from "lucide-react";

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

    const renderServicesAsList = (services: string) => {
        if (!services) return <p className="text-sm text-muted-foreground">No hay servicios especificados.</p>;
        const serviceList = services.split(/\r\n\r\n|\n\n/).map(s => s.trim()).filter(Boolean);
        return (
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                {serviceList.map((service, index) => (
                    <li key={index}>{service}</li>
                ))}
            </ul>
        );
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
                            <div className="p-0.5 max-w-md font-sans overflow-hidden rounded-xl shadow-lg font-body">
                                <div className="bg-card text-card-foreground">
                                    <div className="p-4 flex items-center gap-4 border-b">
                                        <Image src="https://emssanareps.co/images/logo_emssanareps.svg" alt="Logo Emssanar" width={40} height={40} className="h-10 w-auto" />
                                        <h3 className="text-lg font-bold text-foreground">
                                            {activeLocation.details.municipio}
                                            <span className="text-muted-foreground font-normal text-base">, {activeLocation.details.departamento}</span>
                                        </h3>
                                    </div>
                                    <div className="p-4 space-y-4 text-base">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-foreground">Dirección</p>
                                                <p className="text-sm text-muted-foreground">{activeLocation.details.direccion || 'No especificada'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-foreground">Horario</p>
                                                <p className="text-sm text-muted-foreground">{activeLocation.details.horario_atencion || 'No especificado'}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 pt-2">
                                            <details className="group">
                                                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground hover:text-accent-foreground">
                                                    Servicios Subsidiado
                                                    <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
                                                </summary>
                                                <div className="mt-2 text-foreground/80">
                                                    {renderServicesAsList(activeLocation.details.servicios_sub)}
                                                </div>
                                            </details>
                                            
                                            <div className="border-t"></div>

                                            <details className="group">
                                                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground hover:text-accent-foreground pt-2">
                                                    Servicios Contributivo
                                                    <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
                                                </summary>
                                                <div className="mt-2 text-foreground/80">
                                                    {renderServicesAsList(activeLocation.details.servicios_cont)}
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    )}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default React.memo(GeoMap);
