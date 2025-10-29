//V02
"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createClient, SupabaseClient } from '@supabase/supabase-js'

import type { Location } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

// Configuración del icono personalizado de Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const activeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png', 
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45],
});

type OfficeDetails = {
  nombre_oficina: string;
  direccion: string;
  horario_atencion: string;
  tipo_oficina: string;
  imagen_url: string;
  telefonos: string[];
};

let supabase: SupabaseClient | null = null;

const getSupabase = (supabaseUrl: string, supabaseKey: string) => {
    if (!supabase) {
      supabase = createClient(supabaseUrl, supabaseKey);
    }
    return supabase;
}

const OfficeInfoPopup: React.FC<{ id_dane: string; supabaseUrl: string; supabaseKey: string; }> = ({ id_dane, supabaseUrl, supabaseKey }) => {
  const [details, setDetails] = React.useState<OfficeDetails | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchOfficeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabaseClient = getSupabase(supabaseUrl, supabaseKey);
        const { data, error } = await supabaseClient
          .from('oficinas')
          .select('nombre_oficina, direccion, horario_atencion, tipo_oficina, telefonos, imagen_url')
          .eq('id_dane_municipio', id_dane)
          .single();

        if (error) throw error;
        if (data) {
          setDetails(data);
        } else {
          setError("No se encontraron detalles para esta oficina.");
        }
      } catch (err: any) {
        setError(err.message || "No se pudo cargar la información de la oficina.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeDetails();
  }, [id_dane, supabaseUrl, supabaseKey]);

  return (
    <Card className="w-80 border-none shadow-none">
      <CardHeader className="p-2">
        {loading ? (
          <>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </>
        ) : details ? (
          <>
            {details.imagen_url && 
              <div className="relative h-20 w-full mb-2">
                <Image src={details.imagen_url} alt={details.nombre_oficina} layout="fill" objectFit="contain" />
              </div>
            }
            <CardTitle className="text-lg">{details.nombre_oficina}</CardTitle>
            <CardDescription>{details.direccion}</CardDescription>
          </>
        ) : null}
      </CardHeader>
      <CardContent className="p-2 text-sm">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : details ? (
          <div className="space-y-2">
            <p><span className="font-semibold">Horario:</span> {details.horario_atencion}</p>
            {details.telefonos && details.telefonos.length > 0 && (
               <p><span className="font-semibold">Teléfonos:</span> {details.telefonos.join(', ')}</p>
            )}
            <Badge variant="secondary">{details.tipo_oficina}</Badge>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};


// Componente para actualizar la vista del mapa
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

type GeoMapProps = {
  locations: Location[];
  center: [number, number];
  zoom: number;
  onMarkerClick: (id_dane: string) => void;
  supabaseUrl: string | undefined;
  supabaseKey: string | undefined;
  activeLocationId?: string;
};

const GeoMap: React.FC<GeoMapProps> = ({ locations, center, zoom, onMarkerClick, supabaseUrl, supabaseKey, activeLocationId }) => {
  
  if (!supabaseUrl || !supabaseKey) {
    return <div className="h-full w-full flex items-center justify-center bg-muted">Faltan las credenciales de Supabase.</div>;
  }
  
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map(loc => {
        const isSelected = loc.id_dane === activeLocationId;
        return(
        <Marker
          key={loc.id_dane}
          position={[loc.latitud, loc.longitud]}
          icon={isSelected ? activeIcon : customIcon}
          eventHandlers={{
            click: () => onMarkerClick(loc.id_dane),
          }}
        >
          <Popup>
            <OfficeInfoPopup id_dane={loc.id_dane} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />
          </Popup>
        </Marker>
      )})}
      <MapUpdater center={center} zoom={zoom} />
    </MapContainer>
  );
};

export default GeoMap;
