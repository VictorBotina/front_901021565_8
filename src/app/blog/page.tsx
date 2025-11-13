
// src/app/blog/page.tsx
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ArticleCard } from "./ArticleCard";
import { getArticles } from "@/app/services/articleService";
import { CATEGORIES } from "./data"; 
import type { Article } from "@/app/types/article";
import { getStrapiURL } from "@/lib/api";

// Helper para agrupar artículos por categoría
const groupArticlesByCategory = (articles: Article[]): Record<string, Article[]> => {
  if (!articles) return {};
  return articles.reduce((acc, article) => {
    const categoryName = article.category?.name || "General";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(article);
    return acc;
  }, {} as Record<string, Article[]>);
};

export default async function BlogPage() {
  const allArticles: Article[] = await getArticles();
  
  const today = new Date();
  const formattedDate = format(today, "eeee, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;
  const recentArticles = allArticles.slice(1, 5); // Tomamos 4 para el sidebar

  // Procesamos los artículos por categoría usando la data estática como base
  const articlesByCategory = CATEGORIES.map(category => {
    const categoryArticles = allArticles.filter(article => article.category?.name === category.name);
    return {
      ...category,
      articles: categoryArticles,
    };
  }).filter(category => category.articles.length > 0); // Solo mostrar categorías con artículos

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        <header className="text-center border-b border-gray-300 pb-6 mb-8">
          <Link href="/blog" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <Logo className="h-10 w-10 text-gray-900" />
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                Entidad Digital | Blog
              </span>
            </div>
          </Link>
          <p className="text-lg text-gray-600 mt-2 capitalize">
            {formattedDate}
          </p>
        </header>

        <main className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {featuredArticle && (
              <div className="lg:col-span-8 lg:border-r lg:border-gray-300 lg:pr-8">
                <ArticleCard article={featuredArticle} featured />
              </div>
            )}

            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 uppercase tracking-wider">
                Más Recientes
              </h3>
              <ul className="space-y-4">
                {recentArticles.map((article) => {
                   const articleUrl = `/blog/${article.category?.slug || 'general'}/${article.slug}`;
                   const thumbnailUrl = article.image.formats?.small?.url 
                                        ? getStrapiURL(article.image.formats.small.url) 
                                        : getStrapiURL(article.image.url);

                   return(
                    <li key={article.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <Link href={articleUrl} className="flex items-start gap-4 group">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                          {thumbnailUrl && (
                            <Image
                              src={thumbnailUrl}
                              alt={`miniatura de ${article.title}`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="64px"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          {article.category && (
                              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
                                  {article.category.name}
                              </span>
                          )}
                          <h4 className="font-semibold text-sm text-gray-800 hover:text-primary transition-colors leading-tight">
                            {article.title}
                          </h4>
                        </div>
                      </Link>
                    </li>
                   );
                })}
              </ul>
            </div>
          </div>
        </main>
        
        {articlesByCategory.length > 0 && (
          <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {articlesByCategory.map((category) => (
                  <Link href={category.href} key={category.id} className="block bg-white border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 flex items-center justify-center text-white text-2xl" style={{ backgroundColor: category.color }}>
                              <category.icon className="h-7 w-7" />
                          </div>
                          <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors"/>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xl mb-3">
                          {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 h-10">
                          {category.description}
                      </p>
                      <div className="pt-4 border-t border-gray-200">
                          <span className="text-sm font-medium" style={{ color: category.textColor }}>
                            {category.articles.length} {category.articles.length === 1 ? 'artículo' : 'artículos'}
                          </span>
                      </div>
                  </Link>
              ))}
              </div>
          </section>
        )}

        <div className="space-y-16">
            {articlesByCategory.map((category) => (
                <section key={category.id} className="border-t border-gray-300 pt-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center text-white" style={{backgroundColor: category.color}}>
                            <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {category.name}
                        </h2>
                        <p className="text-gray-600">
                            {category.articles.length} {category.articles.length === 1 ? 'publicación' : 'publicaciones'}
                        </p>
                        </div>
                    </div>
                    <Link href={category.href} className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 text-sm hover:bg-gray-200 transition-colors">
                        Ver todos ({category.articles.length})
                    </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {category.articles.slice(0, 3).map((article) => ( // Limitar a 3 para la vista previa
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                </section>
            ))}
        </div>

      </div>
    </div>
  );
}
