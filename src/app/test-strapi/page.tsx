'use client';

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Tipado de la respuesta del Home
type Banner = {
  id: number;
  title: string;
  description: {
    type: string;
    children: { text: string; type: string }[];
  }[];
  button_primary_text: string;
  button_primary_url: string;
  button_secondary_text: string;
  button_secondary_url: string;
};

type HomeData = {
  id: number;
  banner: Banner;
};

export default function TestHomePage() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamado al endpoint de Home. fetchFromStrapi devuelve un solo objeto o null para single types.
        const fetchedHome: HomeData | null = await fetchFromStrapi('home', { populate: '*' });
        
        if (fetchedHome) {
          setHome(fetchedHome);
        } else {
          setError('No se encontraron datos para la página de inicio.');
        }
      } catch (err: any) {
        console.error('Error al conectar con Strapi:', err);
        setError(err.message || 'Error desconocido');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Hero dinámico */}
      {home && (
        <section className="relative h-[60vh] min-h-[400px] w-full lg:h-[70vh] bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black flex items-center">
          <div className="container relative z-10 mx-auto flex h-full items-center px-4">
            <div className="max-w-2xl text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-title sm:text-5xl md:text-6xl">
                {home.banner.title}
              </h1>

              <div className="mt-4 space-y-2 text-foreground/90 md:text-lg">
                {home.banner.description.map((block, i) =>
                  block.children.map((child, j) => <p key={`${i}-${j}`}>{child.text}</p>)
                )}
              </div>

              <div className="mt-8 flex gap-4">
                {home.banner.button_primary_text && (
                  <Button asChild size="lg">
                    <Link href={home.banner.button_primary_url || '#'}>
                      {home.banner.button_primary_text}
                    </Link>
                  </Button>
                )}
                {home.banner.button_secondary_text && (
                  <Button asChild size="lg" variant="secondary">
                    <Link href={home.banner.button_secondary_url || '#'}>
                      {home.banner.button_secondary_text}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mensajes de carga o error */}
      {!home && !error && (
        <p className="p-8 text-center text-lg text-muted-foreground">
          Cargando sección principal...
        </p>
      )}
      {error && (
        <p className="p-8 text-center text-red-500">
          Error al cargar Home: {error}
        </p>
      )}

      {/* Datos crudos JSON */}
      {home && (
        <div className="w-full max-w-3xl mx-auto mt-12 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Datos Crudos (JSON)</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            {JSON.stringify(home, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
