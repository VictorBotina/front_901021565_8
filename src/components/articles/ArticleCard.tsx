// src/components/articles/ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";
// AJUSTE: Actualizar la ruta de importación al archivo renombrado.
import { CATEGORIES } from "@/app/blog/blog-data";

interface Article {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  url: string;
}

interface ArticleCardProps {
  article: Article;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString + 'T00:00:00');
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

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryInfo = CATEGORIES.find(c => c.name === article.category);

  return (
    <Link href={article.url} className="block group">
      <div className="bg-card rounded-lg shadow-sm border overflow-hidden transition-shadow hover:shadow-md h-full flex flex-col">
        <div className="w-full bg-gray-200 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800}
            height={450}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-auto aspect-video"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {article.category && (
            <span
              className="text-xs font-semibold px-2 py-1 rounded text-white self-start mb-2"
              style={{ backgroundColor: categoryInfo?.color || '#3b82f6' }}
            >
              {article.category}
            </span>
          )}
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors flex-grow">
            {article.title}
          </h3>
          {article.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {article.description}
              </p>
          )}
          <div className="text-xs text-muted-foreground mt-4 pt-4 border-t">
            {article.author && <span>Por {article.author}</span>}
            {article.author && article.date && " ・ "}
            {article.date && <time>{formatDate(article.date)}</time>}
          </div>
        </div>
      </div>
    </Link>
  );
}