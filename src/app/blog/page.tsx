
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { allArticles, CATEGORIES } from "./data";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/lib/types";

export default function BlogPage() {
  const today = new Date();
  const formattedDate = format(today, "eeee, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const featuredArticle = allArticles[0];
  const recentArticles = allArticles.slice(1, 4);
  const articlesByCategory = CATEGORIES.map(cat => ({
    ...cat,
    articles: allArticles.filter(a => a.category.id === cat.id)
  }));

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* 1. HEADER SIMPLIFICADO */}
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

        {/* 2. HERO SECTION */}
        <main className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Artículo Principal */}
            <div className="lg:col-span-8 lg:border-r lg:border-gray-300 lg:pr-8">
                <Link href={featuredArticle.href} className="block group">
                    <div className="relative h-96 mb-4 bg-gray-200 rounded-md overflow-hidden">
                        <Image
                            src={featuredArticle.imageUrl}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-semibold px-3 py-1 rounded-full" style={{backgroundColor: featuredArticle.category.bgColor, color: featuredArticle.category.textColor}}>
                                {featuredArticle.category.name}
                            </span>
                            <time>{format(featuredArticle.date, "d 'de' MMMM, yyyy", { locale: es })}</time>
                            <span>Por {featuredArticle.author}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {featuredArticle.title}
                        </h2>
                        <p className="text-gray-700 text-lg">
                            {featuredArticle.description}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Sidebar Recientes */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 uppercase tracking-wider">
                Más Recientes
              </h3>
              {recentArticles.map((article) => (
                <div key={article.href} className="border-b border-gray-200 pb-6">
                     <Link href={article.href} className="block group">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase">
                                <span className="font-semibold px-2 py-1 rounded" style={{backgroundColor: article.category.bgColor, color: article.category.textColor}}>
                                    {article.category.name}
                                </span>
                                <time>{format(article.date, "d MMM, yyyy", { locale: es })}</time>
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
                                {article.title}
                            </h4>
                            <div className="w-full h-32 relative bg-gray-200 rounded-md overflow-hidden">
                                 <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        {/* 3. SECCIÓN DE CATEGORÍAS VISIBLES */}
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
                <Link href={category.href} key={category.id} className="block bg-white border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
                        <span className="text-sm font-medium text-primary">
                        {allArticles.filter(a => a.category.id === category.id).length} artículos
                        </span>
                    </div>
                </Link>
            ))}
            </div>
        </section>

        {/* 4. CONTENIDO POR CATEGORÍAS */}
        <div className="space-y-16">
            {articlesByCategory.map((category) => (
                <section key={category.id} className="border-t border-gray-300 pt-8">
                {/* Header de Sección */}
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

                {/* Grid de Artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {category.articles.map((article: Article) => (
                        <ArticleCard key={article.href} article={article} />
                    ))}
                </div>
                </section>
            ))}
        </div>

      </div>
    </div>
  );
}

    