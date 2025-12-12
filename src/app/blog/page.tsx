"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "./ArticleCard";
import { getArticles, formatDate } from "@/app/services/articleService";
// AJUSTE: Actualizar la ruta de importación al archivo renombrado.
import { CATEGORIES } from "@/app/blog/blog-data"; 
import type { Article } from "@/app/types/article";
import { getStrapiURL } from "@/lib/api";

export default function BlogPage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    getArticles().then(setArticles);
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const featuredArticle = useMemo(() => {
    // Encuentra el primer artículo con imagen para usarlo como destacado
    return filteredArticles.find(a => a.image);
  }, [filteredArticles]);

  const nonFeaturedArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter(a => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  // Construye la URL del artículo dinámicamente
  const getArticleUrl = (article: Article) => {
    const categorySlug = CATEGORIES.find(c => c.name === article.category?.name)?.href || '';
    const articleSlug = article.slug || article.title.toLowerCase().replace(/\s+/g, '-');
    if (categorySlug) {
      return `${categorySlug}/${articleSlug}`;
    }
    // Fallback por si no se encuentra la categoría
    return `/blog/${articleSlug}`;
  };

  return (
    <div className="bg-background text-foreground">
      <header className="py-12 px-6 text-center">
        <h1 className="text-5xl font-bold mb-2">Nuestro Blog</h1>
        <p className="text-xl text-muted-foreground">
          Información y recursos sobre nuestros servicios y el sistema de salud.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Buscar en el blog..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {featuredArticle && (
          <div className="mb-12">
            <ArticleCard 
              article={featuredArticle} 
              href={getArticleUrl(featuredArticle)} 
              featured 
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nonFeaturedArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              href={getArticleUrl(article)} 
            />
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">
            No se encontraron artículos con ese término de búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}