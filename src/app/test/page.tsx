// src/app/test/page.tsx
import { ArticleCard } from "./ArticleCard";
import type { Article } from "./ArticleList";

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/articles.json`);
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await res.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

export default async function TestPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Componente de Artículos de Prueba</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estos artículos se cargan desde un archivo JSON ubicado en /public.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const articleHref = `/test/articulo/${article.id}`;
            return (
              <ArticleCard key={article.id} article={article} href={articleHref} />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No hay artículos disponibles en el archivo JSON.</p>
        </div>
      )}
    </div>
  );
}
