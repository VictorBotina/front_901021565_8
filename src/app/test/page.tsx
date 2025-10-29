//V02
"use client";

import * as React from "react";
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { Location } from "@/lib/types";

// Carga dinámica del mapa para evitar problemas de renderizado en SSR
const GeoMap = dynamic(() => import('@/components/GeoMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const ALL_DEPARTMENTS = "__ALL_DEPARTMENTS__";
const ALL_MUNICIPALITIES = "__ALL_MUNICIPALITIES__";

type LocationData = {
  [department: string]: Location[];
};

export default function TestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const [locationData, setLocationData] = React.useState<LocationData>({});
  const [allLocations, setAllLocations] = React.useState<Location[]>([]);
  const [departments, setDepartments] = React.useState<string[]>([]);
  const [municipalities, setMunicipalities] = React.useState<Location[]>([]);

  const [selectedDept, setSelectedDept] = React.useState<string>(ALL_DEPARTMENTS);
  const [selectedMuni, setSelectedMuni] = React.useState<string>(ALL_MUNICIPALITIES);
  
  const [activeLocation, setActiveLocation] = React.useState<any>(null);
  const [loadingOfficeDetails, setLoadingOfficeDetails] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);

  // Cargar locations.json para poblar los selects y el mapa inicial
  React.useEffect(() => {
    fetch('/locations.json')
      .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data: LocationData) => {
        setLocationData(data);
        const deptNames = Object.keys(data).sort((a, b) => a.localeCompare(b));
        setDepartments(deptNames);
        // Aplanar todas las ubicaciones para el mapa
        const all = Object.values(data).flat();
        setAllLocations(all);
      })
      .catch(() => {
        setError("No se pudo cargar el archivo de ubicaciones (locations.json).");
      });
  }, []);

  // Función para obtener detalles de la oficina
  const fetchOfficeDetails = React.useCallback(async (daneId: string) => {
    if (!supabaseUrl || !supabaseApiKey) {
      setError("Error: Las variables de entorno de Supabase no están configuradas.");
      return;
    }
    if (!daneId) return;

    setLoadingOfficeDetails(true);
    setError(null);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/of_emssanar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseApiKey,
          'Authorization': `Bearer ${supabaseApiKey}`,
        },
        body: JSON.stringify({ "id_dane": daneId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la solicitud a Supabase: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      const location = allLocations.find(loc => loc.id_dane === daneId);
      
      if (location && result.success && result.data) {
        setActiveLocation({ ...location, details: result.data });
      } else {
         throw new Error("No se encontraron detalles para la oficina seleccionada.");
      }

    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado al obtener los datos.");
      setActiveLocation(null);
    } finally {
      setLoadingOfficeDetails(false);
    }
  }, [supabaseUrl, supabaseApiKey, allLocations]);


  // Actualizar la lista de municipios cuando cambia el departamento
  React.useEffect(() => {
    if (selectedDept && selectedDept !== ALL_DEPARTMENTS) {
      const munis = locationData[selectedDept] || [];
      setMunicipalities(munis.sort((a, b) => a.nombre_municipio.localeCompare(b.nombre_municipio)));
    } else {
      setMunicipalities([]);
    }
    setSelectedMuni(ALL_MUNICIPALITIES);
    setActiveLocation(null);
  }, [selectedDept, locationData]);

  // Enviar la solicitud POST cuando se selecciona un municipio en el select
  React.useEffect(() => {
    if (selectedMuni && selectedMuni !== ALL_MUNICIPALITIES) {
      fetchOfficeDetails(selectedMuni);
    } else {
      setActiveLocation(null);
    }
  }, [selectedMuni, fetchOfficeDetails]);

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
  };

  const handleMuniChange = (value: string) => {
    setSelectedMuni(value);
  };
  
  const handleMarkerClick = React.useCallback((location: Location) => {
    // Actualiza los selects
    const dept = Object.keys(locationData).find(d => locationData[d].some(m => m.id_dane === location.id_dane));
    if (dept) {
        setSelectedDept(dept);
    }
    // El useEffect de selectedDept se encargará de actualizar los municipios.
    // Damos un pequeño tiempo para que el estado del departamento y la lista de municipios se actualice
    // antes de seleccionar el municipio y disparar la llamada a la API.
    setTimeout(() => {
        setSelectedMuni(location.id_dane);
    }, 0);
  }, [locationData]);


  if (error && !locationData) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Error de Carga de Datos</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const center: [number, number] = [2.9, -75.0];
  const zoom: number = 6;

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 left-0 z-10 h-full w-full md:w-96 p-4 overflow-y-auto">
         <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Filtros de Ubicación</CardTitle>
            <CardDescription>
              Selecciona un departamento y un municipio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="department-select">Departamento</Label>
              <Select value={selectedDept} onValueChange={handleDeptChange}>
                <SelectTrigger id="department-select">
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_DEPARTMENTS}>Todos los Departamentos</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept} className="capitalize">{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="municipality-select">Municipio</Label>
              <Select value={selectedMuni} onValueChange={handleMuniChange} disabled={selectedDept === ALL_DEPARTMENTS}>
                <SelectTrigger id="municipality-select">
                  <SelectValue placeholder="Selecciona un municipio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_MUNICIPALITIES}>Todos los Municipios</SelectItem>
                  {municipalities.map(muni => (
                    <SelectItem key={muni.id_dane} value={muni.id_dane}>{muni.nombre_municipio}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
       </div>
      <main className="absolute inset-0 z-0">
        <GeoMap 
            locations={allLocations}
            center={center}
            zoom={zoom}
            onMarkerClick={handleMarkerClick}
            activeLocation={activeLocation}
        />
      </main>
    </div>
  );
}
