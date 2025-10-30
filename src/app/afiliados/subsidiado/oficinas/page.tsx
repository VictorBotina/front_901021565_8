//V03
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
import { AnimatePresence } from "framer-motion";
import { OfficeDetailPanel } from "@/components/OfficeDetailPanel";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, SlidersHorizontal, CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

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


export const metadata: Metadata = {
  title: 'Oficinas de Atención: Encuentre la Información y Ubicación para el Régimen Subsidiado',
  description: 'Encuentra oficinas del Régimen Subsidiado: atención cercana, rápida y preferencial para todos los afiliados.',
  keywords: 'Oficinas de atención, Régimen Subsidiado, EPS, Emssanar, Emssanar EPS, SIAU, atención al usuario, afiliados EPS, salud en Colombia, puntos de atención, oficinas municipales, atención preferencial, portabilidad, movilidad entre regímenes, trámites EPS, afiliación, novedades, cobertura en salud, atención presencial, oficinas regionales, Cali, Pasto, servicios de salud, información EPS.',
};


export default function OficinasAtencionPage() {
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
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(true);

  const [error, setError] = React.useState<string | null>(null);

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
        const all = Object.values(data).flat();
        setAllLocations(all);
      })
      .catch(() => {
        setError("No se pudo cargar el archivo de ubicaciones (locations.json).");
      });
  }, []);

  const fetchOfficeDetails = React.useCallback(async (daneId: string) => {
    if (!supabaseUrl || !supabaseApiKey) {
      setError("Error: Las variables de entorno de Supabase no están configuradas.");
      return;
    }
    if (!daneId) return;

    setLoadingOfficeDetails(true);
    setError(null);
    setActiveLocation(null); 

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
        const fallbackLocation = allLocations.find(loc => loc.id_dane === daneId);
        if (fallbackLocation) {
          setActiveLocation({ ...fallbackLocation, details: null });
        }
        setError("No se encontraron detalles completos para esta oficina, pero se muestra la ubicación.");
      }

    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado al obtener los datos.");
      setActiveLocation(null);
    } finally {
      setLoadingOfficeDetails(false);
    }
  }, [supabaseUrl, supabaseApiKey, allLocations]);

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

  React.useEffect(() => {
    if (selectedMuni && selectedMuni !== ALL_MUNICIPALITIES) {
      fetchOfficeDetails(selectedMuni);
    } else {
      setActiveLocation(null);
    }
  }, [selectedMuni, fetchOfficeDetails]);
  
  const handleMarkerClick = React.useCallback((location: Location) => {
    const dept = Object.keys(locationData).find(d => locationData[d].some(m => m.id_dane === location.id_dane));
    if (dept) {
        setSelectedDept(dept);
        setTimeout(() => {
            setSelectedMuni(location.id_dane);
        }, 0);
    } else {
        fetchOfficeDetails(location.id_dane);
    }
  }, [locationData, fetchOfficeDetails]);
  
  const handleClosePanel = () => {
    setActiveLocation(null);
  };

  if (error && !Object.keys(locationData).length) {
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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Oficinas de Atención: Encuentre la Información y Ubicación para el Régimen Subsidiado
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Estamos comprometidos con la comodidad y la cercanía para nuestros afiliados. Nuestro Servicio de Información y Atención al Usuario (SIAU) es su punto de apoyo esencial.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Servicio de Información y Atención al Usuario (SIAU)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>El SIAU ha sido creado para facilitarle la atención, orientándole sobre los procesos a seguir dentro y fuera de la institución para acceder a sus servicios de salud. Este mecanismo busca la comodidad y cercanía del usuario.</p>
            <p>Como afiliado al Régimen Subsidiado, usted puede acudir a nuestras oficinas para radicar cualquier tipo de solicitud (informativa o para gestión), incluyendo trámites relacionados con afiliación, novedades, portabilidad y movilidad entre regímenes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atención Presencial y Preferencial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
             <p>Nuestra EPS cuenta con oficinas de atención al usuario en cada municipio en donde tiene cobertura, además de oficinas zonales en las principales ciudades y oficinas regionales en ciudades como Cali y Pasto.</p>
            <p className="font-semibold text-foreground">Garantizamos la atención preferencial a:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Niños y niñas.</li>
                <li>Mujeres embarazadas.</li>
                <li>Adultos mayores.</li>
                <li>Personas en situación de discapacidad.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Card className="mb-12 max-w-6xl mx-auto">
        <CardHeader>
            <CardTitle>Directorio de Oficinas Físicas</CardTitle>
            <CardDescription>Para encontrar la dirección, municipio, y detalles de contacto de su oficina más cercana, utilice nuestro mapa interactivo. Nuestra red de oficinas presenciales y canales SIAU cubre principalmente los departamentos de Nariño, Putumayo, Valle del cauca y Cauca.</CardDescription>
        </CardHeader>
      </Card>


      <main className="relative h-[70vh] w-full max-w-7xl mx-auto rounded-lg shadow-2xl overflow-hidden">
        
        <div className="absolute top-16 left-4 z-20">
          <Button onClick={() => setFilterPanelOpen(!filterPanelOpen)} size="icon">
            {filterPanelOpen ? <PanelLeftClose /> : <SlidersHorizontal />}
            <span className="sr-only">Toggle Filters</span>
          </Button>
        </div>

        <AnimatePresence>
          {filterPanelOpen && (
            <div className="absolute top-[5.5rem] left-4 z-10 w-full max-w-sm">
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Filtros de Ubicación</CardTitle>
                  <CardDescription>Selecciona un departamento y un municipio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="department-select">Departamento</Label>
                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                      <SelectTrigger id="department-select"><SelectValue placeholder="Selecciona un departamento" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL_DEPARTMENTS}>Todos los Departamentos</SelectItem>
                        {departments.map(dept => (<SelectItem key={dept} value={dept} className="capitalize">{dept}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipality-select">Municipio</Label>
                    <Select value={selectedMuni} onValueChange={setSelectedMuni} disabled={selectedDept === ALL_DEPARTMENTS}>
                      <SelectTrigger id="municipality-select"><SelectValue placeholder="Selecciona un municipio" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL_MUNICIPALITIES}>Todos los Municipios</SelectItem>
                        {municipalities.map(muni => (<SelectItem key={muni.id_dane} value={muni.id_dane}>{muni.nombre_municipio}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
                </CardContent>
              </Card>
            </div>
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 z-0 h-full w-full">
          <GeoMap 
              locations={allLocations}
              center={center}
              zoom={zoom}
              onMarkerClick={handleMarkerClick}
              activeLocationId={activeLocation?.id_dane}
          />
        </div>

        <AnimatePresence>
          {activeLocation && (
            <OfficeDetailPanel 
              location={activeLocation} 
              onClose={handleClosePanel}
              isLoading={loadingOfficeDetails}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

    