'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Article = {
  id: number;
  attributes: {
    title: string;
    content: string;
  }
}

export default function TestStrapiConnection() {
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

      if (!apiUrl || !apiToken) {
        setError("Las variables de entorno de Strapi (NEXT_PUBLIC_STRAPI_API_URL y NEXT_PUBLIC_STRAPI_API_TOKEN) no están configuradas.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${apiUrl}/articles`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        setResponseData(res.data);
      } catch (err: any) {
        console.error('Error al conectar con Strapi:', err);
        if (err.response) {
          setError(`Error ${err.response.status}: ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          setError('No se recibió respuesta del servidor de Strapi. ¿Está la URL correcta y el servidor en línea?');
        } else {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const articles = responseData?.data as Article[] | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Prueba de Conexión Strapi → Next.js</h1>
      
      {loading && <p className="text-muted-foreground">Cargando datos desde Strapi...</p>}
      
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive-foreground">
          <p className="font-bold">Error de Conexión:</p>
          <p>{error}</p>
        </div>
      )}
      
      {articles && articles.length > 0 && (
        <>
          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Visualización de Artículos</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                article.attributes ? (
                  <div key={article.id} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                    <h3 className="mb-2 text-xl font-bold">{article.attributes.title}</h3>
                    <p className="text-muted-foreground">{article.attributes.content}</p>
                  </div>
                ) : null
              ))}
            </div>
          </section>

          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">Respuesta JSON de la API</h2>
            <pre className="w-full overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </section>
        </>
      )}

      {responseData && (!articles || articles.length === 0) && !error && (
         <p className="text-muted-foreground">La conexión fue exitosa, pero no se encontraron artículos.</p>
      )}
    </div>
  );
}
