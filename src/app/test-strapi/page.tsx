// pages/test-strapi.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/api';

// Tipos para Rich Text de Strapi
type RichTextChild = {
  type: "text";
  text: string;
};

type RichTextBlock = {
  type: "paragraph";
  children: RichTextChild[];
};

// Tipo para la imagen de Strapi
type PostImage = {
  data: {
    attributes: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string | null;
    }
  }
};

// Tipo para un artículo de Strapi
type Post = {
  id: number;
  attributes: {
    title: string;
    Slug: string;
    Content: string; // Asumiendo que 'Content' es un string simple por ahora
    Image?: PostImage;
  }
};

// Tipo para la respuesta de la API
type StrapiResponse = {
  data: Post[];
};

// Función para renderizar contenido Rich Text (adaptada para un string simple)
function renderContent(content: string) {
  return <p className="my-2 text-zinc-700 dark:text-zinc-300">{content}</p>;
}

export default function TestStrapiPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [rawData, setRawData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: StrapiResponse = await fetchFromStrapi('articles', { populate: '*' });
        if (res.data) {
          setPosts(res.data);
          setRawData(res);
        } else {
          setError('La respuesta de Strapi no contiene datos.');
        }
      } catch (err: any) {
        console.error('Error al conectar con Strapi:', err);
        setError(err.message || 'Error desconocido');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-zinc-50 dark:bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-zinc-50">
        Prueba de Conexión y Visualización de Strapi
      </h1>

      {error && <p className="text-red-500">Error: {error}</p>}
      
      {!error && !posts.length && <p>Cargando datos desde Strapi...</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-3xl border p-4 rounded-md bg-white dark:bg-zinc-900 mb-6 shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
            {post.attributes.title}
          </h2>

          {/* Imagen de portada opcional */}
          {post.attributes.Image?.data?.attributes.url && (
            <img
              src={post.attributes.Image.data.attributes.url}
              width={post.attributes.Image.data.attributes.width || 600}
              height={post.attributes.Image.data.attributes.height || 400}
              alt={post.attributes.Image.data.attributes.alternativeText || post.attributes.title}
              className="my-2 rounded"
            />
          )}

          {/* Contenido */}
          <div>{post.attributes.Content && renderContent(post.attributes.Content)}</div>
        </div>
      ))}
      
      {rawData && (
        <div className="w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4">Respuesta JSON Cruda</h2>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(rawData, null, 2)}
            </pre>
        </div>
      )}
    </div>
  );
}
