// src/app/test/page.tsx
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ArticleCard } from "@/app/blog/ArticleCard";
import { getArticles, formatDate } from "@/app/services/articleService";
import { CATEGORIES } from "@/app/blog/data"; 
import type { Article } from "@/app/types/article";
import { getStrapiURL } from "@/lib/api";

const articleUrlMap: { [key: string]: { [key: string]: string } } = {
  "Subsidiado": {
    "Hábitos y estilos de vida saludables: La Clave para un bienestar integral": "/blog/subsidiado/habitos-y-estilos-de-vida-saludables",
  },
  "Régimen Contributivo": {
    "Artículo de Prueba para Régimen Contributivo": "/blog/contributivo/articulo-1",
  },
  "Prestadores": {
    "Artículo de Prueba para Prestadores": "/blog/prestadores/articulo-1",
  },
  "Comunicados de Prensa": {
    "Comunicado de Prensa de Prueba": "/blog/comunicados-de-prensa/articulo-1",
  },
  "Eventos": {
    "IV Jornada de Vacunación Nacional – 24 de octubre de 2025": "/blog/eventos/jornada-vacunacion-octubre-2025",
  }
};

const getArticleUrl = (article: Article): string => {
  const categoryName = article.category?.name;
  if (categoryName && articleUrlMap[categoryName] && articleUrlMap[categoryName][article.title]) {
    return articleUrlMap[categoryName][article.title];
  }
  // Fallback a la página de la categoría si no hay un mapeo específico
  const categoryInfo = CATEGORIES.find(c => c.name === categoryName);
  return categoryInfo?.href || '/blog';
};


export default async function BlogPage() {
  const allArticles: Article[] = await getArticles();
  
  const today = new Date();
  const formattedDate = format(today, "eeee, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;
  const recentArticles = allArticles.slice(1, 5);

  const articlesByCategory = CATEGORIES.map(category => {
    const categoryArticles = allArticles.filter(article => article.category?.name === category.name);
    return {
      ...category,
      articles: categoryArticles,
    };
  }).filter(category => category.articles.length > 0);


  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <header className="text-center border-b border-border pb-6 mb-8">
          <Link href="/blog" className="inline-block">
            <div className="flex items-center justify-center space-x-2">
              <Logo className="h-10 w-10 text-foreground" />
              <span className="text-3xl font-bold text-foreground tracking-tight">
                Emssanar EPS | Blog
              </span>
            </div>
          </Link>
          <p className="text-lg text-muted-foreground mt-2 capitalize">
            {formattedDate}
          </p>
        </header>

        <main className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {featuredArticle && (
              <div className="lg:col-span-8 lg:border-r lg:border-border lg:pr-8">
                <ArticleCard article={featuredArticle} href={getArticleUrl(featuredArticle)} featured />
              </div>
            )}

            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-lg font-bold text-foreground border-b border-border pb-2 uppercase tracking-wider">
                Más Recientes
              </h3>
              <ul className="space-y-4">
                {recentArticles.map((article) => {
                   const articleUrl = getArticleUrl(article);
                   const imageUrl = article.image?.formats?.small?.url || article.image?.url || '';
                   const categoryInfo = CATEGORIES.find(c => c.name === article.category?.name);

                   return(
                    <li key={article.id} className="border-b border-border/50 pb-4 last:border-b-0 last:pb-0">
                      <Link href={articleUrl} className="flex items-start gap-4 group">
                        {imageUrl && (
                           <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                              <Image
                                src={getStrapiURL(imageUrl)}
                                alt={`miniatura de ${article.title}`}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              />
                          </div>
                        )}
                        <div className="flex-1">
                          {article.category && (
                              <span 
                                className="text-xs font-semibold px-2 py-1 rounded mb-1 inline-block"
                                style={{ 
                                  backgroundColor: categoryInfo?.color,
                                  color: '#FFFFFF' 
                                }}
                              >
                                  {article.category.name}
                              </span>
                          )}
                          <h4 className="font-semibold text-sm text-foreground hover:text-primary transition-colors leading-tight">
                            {article.title}
                          </h4>
                          {article.date && (
                            <time className="text-xs text-muted-foreground mt-1 block">
                                {formatDate(article.date)}
                            </time>
                           )}
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
                  <Link href={category.href} key={category.id} className="block bg-card border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 flex items-center justify-center text-white text-2xl" style={{ backgroundColor: category.color }}>
                              <category.icon className="h-7 w-7" />
                          </div>
                          <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors"/>
                      </div>
                      <h3 className="font-bold text-foreground text-xl mb-3">
                          {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 h-10">
                          {category.description}
                      </p>
                      <div className="pt-4 border-t border-border">
                          <span className="text-sm font-medium" style={{ color: category.color }}>
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
                <section key={category.id} className="border-t border-border pt-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 flex items-center justify-center text-white" style={{backgroundColor: category.color}}>
                            <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                        <h2 className="text-3xl font-bold" style={{ color: category.color }}>
                            {category.name}
                        </h2>
                        <p className="text-muted-foreground">
                            {category.articles.length} {category.articles.length === 1 ? 'publicación' : 'publicaciones'}
                        </p>
                        </div>
                    </div>
                    <Link href={category.href} className="bg-muted text-muted-foreground font-semibold px-4 py-2 text-sm hover:bg-secondary transition-colors">
                        Ver todos ({category.articles.length})
                    </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {category.articles.slice(0, 3).map((article) => ( 
                        <ArticleCard key={article.id} article={article} href={getArticleUrl(article)} />
                    ))}
                </div>
                </section>
            ))}
        </div>

      </div>
    </div>
  );
}
