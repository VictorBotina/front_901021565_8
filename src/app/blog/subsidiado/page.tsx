
// src/app/blog/subsidiado/page.tsx
import { getArticles } from "@/app/services/articleService";
import { ArticleCard } from "@/app/blog/ArticleCard";
import type { Article } from "@/app/types/article";

// Esto es un mapeo manual. Idealmente, los slugs vendrían de la API.
const articleUrlMap: { [key: string]: string } = {
  "Hábitos y estilos de vida saludables: La Clave para un bienestar integral": "/blog/subsidiado/habitos-y-estilos-de-vida-saludables",
  "Conozca cómo aplica el régimen de libre escogencia de IPS en Emssanar EPS": "/blog/subsidiado/libre-escogencia-de-ips",
  "¿Sabes cómo radicar tus PQRS y cómo facilita la atención con nuestros afiliados?": "/blog/subsidiado/como-radicar-tus-pqrs"
};

export default async function SubsidiadoBlogPage() {
  const articles: Article[] = await getArticles("Subsidiado");

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Blog: Régimen Subsidiado</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Novedades, guías y noticias relevantes para nuestros afiliados del Régimen Subsidiado.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            // Usa el mapeo para encontrar la URL correcta, o un enlace genérico si no se encuentra.
            const articleHref = articleUrlMap[article.title] || `/blog/subsidiado/${article.slug || article.id}`;
            return (
              <ArticleCard key={article.id} article={article} href={articleHref} />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No hay artículos disponibles en esta categoría por el momento.</p>
        </div>
      )}
    </div>
  );
}
