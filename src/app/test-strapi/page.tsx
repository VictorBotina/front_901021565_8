// pages/test-strapi.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/api';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// The Post type now reflects the flattened structure
type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
  };
  category?: {
    name: string;
  };
};

export default function TestStrapiPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We use populate: '*' to get all related data
        const fetchedPosts: Post[] = await fetchFromStrapi('articles', { populate: '*' });
        setPosts(fetchedPosts);
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
      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg">
            {post.cover?.url && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.cover.url}
                  alt={post.cover.alternativeText || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex-1">
                {post.category && (
                  <Badge variant="secondary" className="mb-2">{post.category.name}</Badge>
                )}
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                 <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Slug:</span> {post.slug}
                </p>
              </div>
              {post.author && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Autor: {post.author.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Raw JSON data view */}
      {posts.length > 0 && (
        <div className="w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4">Datos Crudos (JSON Aplanado)</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                {JSON.stringify(posts, null, 2)}
            </pre>
        </div>
      )}
    </div>
  );
}
