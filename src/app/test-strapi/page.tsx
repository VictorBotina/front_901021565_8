// pages/test-strapi.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/api';

// The Post type now reflects the flattened structure
type Post = {
  id: number;
  title: string;
  Slug: string;
  content: string;
  Image?: {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string | null;
  };
};

export default function TestStrapiPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts: Post[] = await fetchFromStrapi('articles', { populate: '*' });
        setPosts(fetchedPosts);
        setRawData(fetchedPosts); // Also store for JSON view
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

      {/* Visual rendering */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-3xl border p-4 rounded-md bg-white dark:bg-zinc-900 mb-6 shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">
            {post.title}
          </h2>

          {post.Image?.url && (
            <img
              src={post.Image.url}
              width={post.Image.width || 600}
              height={post.Image.height || 400}
              alt={post.Image.alternativeText || post.title}
              className="my-2 rounded"
            />
          )}

          {post.content && (
            <p className="my-2 text-zinc-700 dark:text-zinc-300">{post.content}</p>
          )}
        </div>
      ))}
      
      {/* Raw JSON data view */}
      {rawData && (
        <div className="w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4">Datos Crudos (JSON Aplanado)</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {JSON.stringify(rawData, null, 2)}
            </pre>
        </div>
      )}
    </div>
  );
}
