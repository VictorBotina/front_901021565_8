'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TestStrapiConnection() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Las variables de entorno del cliente DEBEN empezar con NEXT_PUBLIC_
      const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
      const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

      if (!apiUrl || !apiToken) {
        setError("Las variables de entorno de Strapi (NEXT_PUBLIC_STRAPI_API_URL y NEXT_PUBLIC_STRAPI_API_TOKEN) no están configuradas.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${apiUrl}/articles`, // Endpoint de tu colección
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        setData(res.data);
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

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Prueba de Conexión Strapi → Next.js</h1>
      
      {loading && <p>Cargando datos desde Strapi...</p>}
      
      {error && <div style={{ color: 'red', background: '#ffebee', border: '1px solid red', padding: '1rem', marginTop: '1rem' }}>
          <p><strong>Error de Conexión:</strong></p>
          <p>{error}</p>
        </div>
      }
      
      {data && (
        <div>
            <h2 style={{marginTop: '2rem'}}>Datos recibidos exitosamente:</h2>
            <pre style={{ background: '#f4f4f4', border: '1px solid #ddd', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(data, null, 2)}
            </pre>
        </div>
      )}
    </div>
  );
}
