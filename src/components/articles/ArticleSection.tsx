// src/components/articles/ArticleSection.tsx
import { ArticleCard } from "./ArticleCard";
import fs from 'fs';
import path from 'path';

type Article = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
};

async function getArticles(): Promise<Article[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'articles.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    return [];
  }
}

type ArticleSectionProps = {
    title: string;
}

export async function ArticleSection({ title }: ArticleSectionProps) {
  const articles = await getArticles();

  return (
    <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
                </h2>
            </header>

            {articles.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                <p className="text-muted-foreground">No hay artículos disponibles.</p>
                </div>
            )}
        </div>
    </section>
  );
}
