// src/app/blog/eventos/page.tsx
import { getArticles } from "@/app/services/articleService";
import { ArticleCard } from "@/app/blog/ArticleCard";
import type { Article } from "@/app/types/article";

const articleUrlMap: { [key: string]: string } = {
  "IV Jornada de Vacunación Nacional – 24 de octubre de 2025": "/blog/eventos/jornada-vacunacion-octubre-2025"
};

const getArticleUrl = (article: Article): string => {
  return articleUrlMap[article.title] || `/blog/eventos`;
};

export default async function EventosBlogPage() {
  const allArticles = await getArticles();
  const articles: Article[] = allArticles.filter(
    (article) => article.category?.name === "Eventos"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Blog: Eventos</h1>
        <p className="mt-4 text-lg text-muted-foreground">
         Participa en nuestras jornadas de salud, eventos y actividades.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} href={getArticleUrl(article)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No hay eventos disponibles en esta categoría por el momento.</p>
        </div>
      )}
    </div>
  );
}
