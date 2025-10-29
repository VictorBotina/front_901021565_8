//V02
"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ChevronsUpDown } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

import type { Location } from "@/lib/types";

const GeoMap = dynamic(() => import("@/components/GeoMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

const ALL_DEPARTMENTS = "__ALL_DEPARTMENTS__";
const ALL_MUNICIPALITIES = "__ALL_MUNICIPALITIES__";
const DEFAULT_CENTER: [number, number] = [2.9, -75.0];
const DEFAULT_ZOOM = 6;

export default function TestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const [allLocations, setAllLocations] = React.useState<Location[]>([]);
  const [departments, setDepartments] = React.useState<string[]>([]);
  const [municipalities, setMunicipalities] = React.useState<Location[]>([]);
  
  const [selectedDept, setSelectedDept] = React.useState<string>(ALL_DEPARTMENTS);
  const [selectedMuni, setSelectedMuni] = React.useState<string>(ALL_MUNICIPALITIES);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!supabaseUrl || !supabaseApiKey) {
      setError("Error: Las variables de entorno de Supabase no están configuradas. Revisa tu archivo .env.local.");
      setLoading(false);
      return;
    }

    const fetchLocations = async () => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/of_emssanar`, {
          method: 'POST',
          headers: {
            'apikey': supabaseApiKey,
            'Authorization': `Bearer ${supabaseApiKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        // Assuming data is an array of locations
        setAllLocations(data);

        // Extract unique departments
        const deptNames = [...new Set(data.map((loc: Location) => loc.departamento))].sort((a, b) => a.localeCompare(b));
        setDepartments(deptNames);

      } catch (err: any) {
        setError("No se pudo cargar la información de las oficinas desde Supabase.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [supabaseUrl, supabaseApiKey]);

  React.useEffect(() => {
    if (selectedDept && selectedDept !== ALL_DEPARTMENTS) {
      const munis = allLocations
        .filter(loc => loc.departamento === selectedDept)
        .map(m => ({ ...m, nombre: m.municipio }));
      
      const uniqueMunis = [...new Map(munis.map(item => [item.municipio, item])).values()];
      
      setMunicipalities(uniqueMunis.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    } else {
      setMunicipalities([]);
    }
    setSelectedMuni(ALL_MUNICIPALITIES);
  }, [selectedDept, allLocations]);
  
  const filteredLocations = React.useMemo(() => {
    if (selectedMuni !== ALL_MUNICIPALITIES) {
      return allLocations.filter(loc => loc.municipio === selectedMuni);
    }
    if (selectedDept !== ALL_DEPARTMENTS) {
      return allLocations.filter(loc => loc.departamento === selectedDept);
    }
    return allLocations;
  }, [selectedDept, selectedMuni, allLocations]);
  
  const activeLocation = React.useMemo(() => {
    if (selectedMuni !== ALL_MUNICIPALITIES) {
      // Find the first location that matches the municipality name
      return allLocations.find(m => m.municipio === selectedMuni);
    }
    return undefined;
  }, [selectedMuni, allLocations]);

  const { center, zoom } = React.useMemo(() => {
    if (activeLocation && activeLocation.latitud && activeLocation.longitud) {
      return { center: [activeLocation.latitud, activeLocation.longitud] as [number, number], zoom: 17 };
    }
    if (selectedDept !== ALL_DEPARTMENTS && filteredLocations.length > 0) {
      const locationsWithCoords = filteredLocations.filter(l => l.latitud && l.longitud);
      if (locationsWithCoords.length > 0) {
        const avgLat = locationsWithCoords.reduce((acc, loc) => acc + (loc.latitud || 0), 0) / locationsWithCoords.length;
        const avgLng = locationsWithCoords.reduce((acc, loc) => acc + (loc.longitud || 0), 0) / locationsWithCoords.length;
        return { center: [avgLat, avgLng] as [number, number], zoom: 8 };
      }
    }
    return { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
  }, [activeLocation, selectedDept, filteredLocations]);
  
  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
  }

  const handleMuniChange = (value: string) => {
    setSelectedMuni(value);
  }

  const handleMarkerClick = React.useCallback((id_dane: string) => {
    const location = allLocations.find(loc => loc.id_dane === id_dane);
    if (location) {
      if(selectedDept !== location.departamento){
        setSelectedDept(location.departamento || ALL_DEPARTMENTS);
      }
      setSelectedMuni(location.municipio);
    }
  }, [allLocations, selectedDept]);


  if (error) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTitle>Error de Configuración o Carga</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Respuesta de la API de Supabase</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <pre className="mt-2 h-[600px] w-full overflow-auto rounded-md bg-secondary p-4">
          <code>{JSON.stringify(allLocations, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}
