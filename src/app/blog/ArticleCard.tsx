// src/app/blog/ArticleCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate } from "@/app/services/articleService";
import { getStrapiURL } from "@/lib/api";
import { Article } from "@/app/types/article";
import { Skeleton } from "@/components/ui/skeleton";
// CORRECCIÓN FINAL: Cambiar a importación con alias absoluto
import { CATEGORIES } from "@/app/blog/data";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  href: string;
  featured?: boolean;
}

export function ArticleCard({ article, href, featured = false }: ArticleCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("/images/placeholder.png");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (article.image) {
      const url = article.image.formats?.small?.url || article.image.url;
      setImageUrl(getStrapiURL(url));
    } else {
      setImageLoading(false);
    }
  }, [article.image]);

  const categoryInfo = CATEGORIES.find(c => c.name === article.category?.name);

  return (
    <Link href={href} className="block group">
      <div className="bg-card rounded-lg shadow-sm border overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col">
        <div className="w-full bg-gray-200 overflow-hidden">
          {imageLoading && <Skeleton className="w-full aspect-video" />}
          <Image
            src={imageUrl}
            alt={article.title || "Artículo del blog"}
            width={800}
            height={450}
            className={cn(
              "w-full object-cover transition-transform duration-300 group-hover:scale-105",
              featured ? "h-auto" : "h-auto aspect-video",
              imageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageUrl("/images/placeholder.png"); // Fallback image
            }}
            priority={featured}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {article.category && (
            <span
              className="text-xs font-semibold px-2 py-1 rounded text-white self-start mb-2"
              style={{
                backgroundColor: categoryInfo?.color || '#3b82f6',
              }}
            >
              {article.category.name}
            </span>
          )}
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors flex-grow ${featured ? 'text-3xl' : 'text-lg'}`}>
            {article.title}
          </h3>
          {article.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {article.description}
              </p>
          )}
          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            {article.author?.name && <span>Por {article.author.name}</span>}
            {article.author?.name && article.date && " ・ "}
            {article.date && <time>{formatDate(article.date)}</time>}
          </div>
        </div>
      </div>
    </Link>
  );
}
