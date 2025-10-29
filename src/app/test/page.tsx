//V02
"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TestPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const [allLocations, setAllLocations] = React.useState<any[]>([]);
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
          },
          body: JSON.stringify({ "id_dane": "52001" })
        });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        // Assuming data is an array of locations, if not, wrap it
        setAllLocations(Array.isArray(data) ? data : [data]);

      } catch (err: any) {
        setError("No se pudo cargar la información de las oficinas desde Supabase.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [supabaseUrl, supabaseApiKey]);


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