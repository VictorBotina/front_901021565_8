// src/app/blog/ArticleCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate } from "@/app/services/articleService";
import { getStrapiURL } from "@/lib/api";
import { Article } from "@/app/types/article";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const [imageUrl, setImageUrl] = useState<string>("/images/placeholder.png");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (article.image) {
      // Priorizar formato 'small' para el card, si existe
      const url = article.image.formats?.small?.url || article.image.url;
      setImageUrl(getStrapiURL(url));
    } else {
      setImageLoading(false);
    }
  }, [article.image]);

  const articleUrl = `/blog/${article.category?.slug || 'general'}/${article.slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <div className="relative h-56 w-full bg-gray-200 rounded-md overflow-hidden mb-4">
        {imageLoading && <Skeleton className="h-full w-full" />}
        <Image
          src={imageUrl}
          alt={article.title || "Artículo del blog"}
          fill
          className={`object-cover transition-transform duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100 group-hover:scale-105"
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageUrl("/images/placeholder.png"); // Fallback image
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2">
        {article.category && (
            <span className="text-xs font-semibold px-2 py-1 rounded bg-accent text-accent-foreground">
                {article.category.name}
            </span>
        )}
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        {article.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
                {article.description}
            </p>
        )}
        <div className="text-xs text-gray-500">
          {article.author?.name && <span>Por {article.author.name}</span>}
          {article.author?.name && article.date && " ・ "}
          {article.date && <time>{formatDate(article.date)}</time>}
        </div>
      </div>
    </Link>
  );
}