// src/app/blog/ArticleCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { formatDate } from "@/app/services/articleService";
import { getStrapiURL } from "@/lib/api";
import { Article } from "@/app/types/article";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES } from "./data";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
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

  const articleUrl = `/blog/${article.category?.slug || 'general'}/${article.slug}`;

  return (
    <Link href={articleUrl} className="block group">
      <div className="w-full bg-gray-200 rounded-md overflow-hidden mb-4">
        {imageLoading && <Skeleton className="w-full aspect-video" />}
        <Image
          src={imageUrl}
          alt={article.title || "Artículo del blog"}
          width={800}
          height={450}
          className={cn(
            "w-full object-cover transition-transform duration-300 group-hover:scale-105",
             featured ? "h-auto" : "aspect-video",
             imageLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageUrl("/images/placeholder.png"); // Fallback image
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={featured}
        />
      </div>
      <div className="space-y-2">
        {article.category && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded"
            style={{
              backgroundColor: categoryInfo?.bgColor,
              color: categoryInfo?.textColor,
            }}
          >
            {article.category.name}
          </span>
        )}
        <h3 className={`font-bold text-gray-900 group-hover:text-primary transition-colors ${featured ? 'text-3xl' : 'text-lg'}`}>
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
