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

export default async function BlogPage() {
  const articles: Article[] = await fetchFromStrapi('articles');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog y Noticias</h1>
      
      {articles && articles.length > 0 ? (
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
      ) : (
        <div className="text-center">
         <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
       </div>
      )}
    </div>
  );
}
