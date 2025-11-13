// src/app/blog/contributivo/page.tsx
import { getArticles } from "@/app/services/articleService";
import { ArticleCard } from "@/app/blog/ArticleCard";
import type { Article } from "@/app/types/article";

export default async function ContributivoBlogPage() {
  const allArticles = await getArticles();
  const articles: Article[] = allArticles.filter(
    (article) => article.category?.name === "Régimen Contributivo"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Blog: Régimen Contributivo</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Información para trabajadores, independientes y sus familias.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No hay artículos disponibles en esta categoría por el momento.</p>
        </div>
      )}
    </div>
  );
}