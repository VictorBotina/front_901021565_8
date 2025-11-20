import data from './articles.json';
import { ArticleCard } from './ArticleCard';

export type Article = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

export function ArticleList() {
  const articles: Article[] = data.articles;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Componente de Artículos de Prueba</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estos artículos se cargan desde un archivo JSON local.
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
