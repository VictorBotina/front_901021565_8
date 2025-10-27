'use client';

import { useEffect, useState } from 'react';
import { fetchFromStrapi } from '@/lib/api';
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// --- Hero Component Code ---
export type HeroProps = {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
};

export function Hero(props: HeroProps) {
  const { title, description, image, primaryButton, secondaryButton } = props;

  const defaultHeroImage = PlaceHolderImages[0];

  const heroImage = image
    ? {
        src: image.url,
        alt: image.alt || "Banner",
      }
    : {
        src: defaultHeroImage.imageUrl,
        alt: defaultHeroImage.description,
      };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Tarjeta con imagen */}
          <Card className="overflow-hidden rounded-xl shadow-lg">
            <CardContent className="p-0">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={600}
                height={400}
                className="aspect-video w-full h-full object-cover"
                priority
                data-ai-hint={image ? undefined : defaultHeroImage.imageHint}
              />
            </CardContent>
          </Card>

          {/* Texto y botones */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1
                className="text-4xl font-extrabold tracking-tight text-title sm:text-5xl md:text-6xl"
                dangerouslySetInnerHTML={{
                  __html: title || "Servicios Digitales <br /> Accesibles para Todos",
                }}
              />
              <p className="max-w-[600px] text-lg text-foreground/90 md:text-xl">
                {description ||
                  "Innovación y compromiso al servicio de nuestros afiliados y prestadores."}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {primaryButton?.text ? (
                <Button asChild size="lg">
                  <Link href={primaryButton.url || "#"}>{primaryButton.text}</Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="#">Portal Afiliados</Link>
                </Button>
              )}

              {secondaryButton?.text ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={secondaryButton.url || "#"}>{secondaryButton.text}</Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="secondary">
                  <Link href="#">Portal Prestadores</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// --- End Hero Component Code ---


// El tipo Post ahora refleja la estructura aplanada
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
        // Usamos populate: '*' para obtener todos los datos relacionados
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
    <>
      <Hero />
      <div className="flex flex-col items-center py-16 px-6 bg-zinc-50 dark:bg-black min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-zinc-50">
          Prueba de Conexión y Visualización de Strapi
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        
        {!error && !posts.length && <p>Cargando datos desde Strapi...</p>}

        {/* Renderizado visual */}
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
        
        {/* Vista de datos crudos (JSON aplanado) */}
        {posts.length > 0 && (
          <div className="w-full max-w-3xl mt-8">
              <h2 className="text-2xl font-bold mb-4">Datos Crudos (JSON Aplanado)</h2>
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                  {JSON.stringify(posts, null, 2)}
              </pre>
          </div>
        )}
      </div>
    </>
  );
}
