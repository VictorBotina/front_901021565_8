// src/app/blog/comunicados-de-prensa/page.tsx
import { getArticles } from "@/app/services/articleService";
import { ArticleCard } from "@/app/blog/ArticleCard";
import type { Article } from "@/app/types/article";

const getArticleUrl = (article: Article): string => {
  return `/blog/comunicados-de-prensa/articulo-1`;
};

export default async function ComunicadosPrensaBlogPage() {
  const allArticles = await getArticles();
  const articles: Article[] = allArticles.filter(
    (article) => article.category?.name === "Comunicados de Prensa"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Blog: Comunicados de Prensa</h1>
        <p className="mt-4 text-lg text-muted-foreground">
         Anuncios oficiales y noticias corporativas de la entidad.
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
          <p className="text-muted-foreground">No hay artículos disponibles en esta categoría por el momento.</p>
        </div>
      )}
    </div>
  );
}
