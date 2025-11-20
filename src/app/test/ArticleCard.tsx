import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Article } from "./ArticleList";

interface ArticleCardProps {
  article: Article;
  href: string;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString + 'T00:00:00'); // Asegurar que se interprete como local
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: 'UTC',
    });
  } catch (error) {
    console.error("Error al formatear la fecha:", dateString, error);
    return "Fecha inválida";
  }
}

export function ArticleCard({ article, href }: ArticleCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="w-full bg-gray-200 rounded-md overflow-hidden mb-4">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={800}
          height={450}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-auto aspect-video"
        />
      </div>
      <div className="space-y-2">
        {article.category && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded text-white"
            style={{ backgroundColor: '#3b82f6' }} // Color de categoría de ejemplo
          >
            {article.category}
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
          {article.author && <span>Por {article.author}</span>}
          {article.author && article.date && " ・ "}
          {article.date && <time>{formatDate(article.date)}</time>}
        </div>
      </div>
    </Link>
  );
}
