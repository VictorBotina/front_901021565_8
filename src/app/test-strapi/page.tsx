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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetchFromStrapi now returns the clean, flattened data
        const fetchedPosts: Post[] = await fetchFromStrapi('articles', { populate: '*' });
        if (fetchedPosts) {
          setPosts(fetchedPosts);
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
            {post.title}
          </h2>

          {/* Optional cover image, accessed directly */}
          {post.Image?.url && (
            <img
              src={post.Image.url}
              width={post.Image.width || 600}
              height={post.Image.height || 400}
              alt={post.Image.alternativeText || post.title}
              className="my-2 rounded"
            />
          )}

          {/* Content */}
          {post.content && (
            <p className="my-2 text-zinc-700 dark:text-zinc-300">{post.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
