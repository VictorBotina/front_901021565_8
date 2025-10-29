//V02
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Label
} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import type {
  Location
} from "@/lib/types";


const ALL_DEPARTMENTS = "__ALL_DEPARTMENTS__";
const ALL_MUNICIPALITIES = "__ALL_MUNICIPALITIES__";


type LocationData = {
  [department: string]: {
    nombre_municipio: string;
    id_dane: string;
    latitud: number;
    longitud: number;
  } [];
};

export default function TestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const [locationData, setLocationData] = React.useState < LocationData > ({});
  const [departments, setDepartments] = React.useState < string[] > ([]);
  const [municipalities, setMunicipalities] = React.useState < Location[] > ([]);

  const [selectedDept, setSelectedDept] = React.useState < string > (ALL_DEPARTMENTS);
  const [selectedMuni, setSelectedMuni] = React.useState < string > (ALL_MUNICIPALITIES);
  const [error, setError] = React.useState < string | null > (null);
  const [loading, setLoading] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState < any > (null);

  // Cargar locations.json para poblar los selects
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
      })
      .catch(() => {
        setError("No se pudo cargar el archivo de ubicaciones (locations.json).");
      });
  }, []);

  // Actualizar la lista de municipios cuando cambia el departamento
  React.useEffect(() => {
    if (selectedDept && selectedDept !== ALL_DEPARTMENTS) {
      const munis = locationData[selectedDept] ?.map(m => ({
        ...m,
        nombre: m.nombre_municipio
      })) || [];
      setMunicipalities(munis.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    } else {
      setMunicipalities([]);
    }
    setSelectedMuni(ALL_MUNICIPALITIES);
    setApiResponse(null); // Limpiar la respuesta anterior
  }, [selectedDept, locationData]);


  // Enviar la solicitud POST cuando se selecciona un municipio
  React.useEffect(() => {
    if (!selectedMuni || selectedMuni === ALL_MUNICIPALITIES) {
      setApiResponse(null);
      return;
    };

    const fetchOfficeData = async () => {
      if (!supabaseUrl || !supabaseApiKey) {
        setError("Error: Las variables de entorno de Supabase no están configuradas.");
        return;
      }

      setLoading(true);
      setError(null);
      setApiResponse(null);

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/of_emssanar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseApiKey,
            'Authorization': `Bearer ${supabaseApiKey}`,
          },
          body: JSON.stringify({
            "id_dane": selectedMuni
          }),
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud a Supabase: ${response.statusText}`);
        }

        const result = await response.json();
        setApiResponse(result);

      } catch (err: any) {
        setError(err.message || "Ocurrió un error inesperado al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeData();

  }, [selectedMuni, supabaseUrl, supabaseApiKey]);


  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
  }

  const handleMuniChange = (value: string) => {
    setSelectedMuni(value);
  }


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

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
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
                  <SelectItem key={muni.id_dane} value={muni.id_dane}>{muni.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {(loading || apiResponse || error) && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Respuesta de la API</h2>
          {loading && <p>Cargando...</p>}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {apiResponse && (
            <pre className="mt-2 h-[400px] w-full overflow-auto rounded-md bg-secondary p-4">
              <code>{JSON.stringify(apiResponse, null, 2)}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}