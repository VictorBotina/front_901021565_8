import { Hero } from "@/components/layout/home/Hero";
import { ContentSection } from "@/components/layout/home/ContentSection";
import { fetchFromStrapi } from "@/lib/api";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Article = {
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

export default async function Home() {
  const articles: Article[] = await fetchFromStrapi('articles');

  return (
    <>
      <Hero />
      
      {articles && articles.length > 0 ? (
        <section className="py-12 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Noticias y Actualizaciones</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div key={article.id} className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-transform hover:scale-105">
                  {article.cover?.url && (
                     <div className="relative h-48 w-full">
                        <Image
                            src={article.cover.url}
                            alt={article.cover.alternativeText || article.title}
                            fill
                            className="object-cover"
                        />
                     </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex-1">
                        {article.category && (
                            <Badge variant="secondary" className="mb-2">{article.category.name}</Badge>
                        )}
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Slug:</span> {article.slug}
                        </p>
                    </div>
                    {article.author && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Autor: {article.author.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-24">
           <div className="container mx-auto px-4 text-center">
             <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
           </div>
        </section>
      )}
    </>
  );
}
