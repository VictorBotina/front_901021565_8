
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/app/blog/data";

// Definimos un tipo para la estructura del artículo, para mayor seguridad y autocompletado.
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
  href: string;
}

// Función auxiliar para formatear la fecha
function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    // Aseguramos que la fecha se interprete correctamente, añadiendo la hora para evitar errores de zona horaria.
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: 'UTC', // Usar UTC para consistencia
    });
  } catch (error) {
    console.error("Error al formatear la fecha:", dateString, error);
    return "Fecha inválida";
  }
}

export function ArticleCard({ article, href }: ArticleCardProps) {
  const categoryInfo = CATEGORIES.find(c => c.name === article.category);

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
            style={{ backgroundColor: categoryInfo?.color || '#3b82f6' }}
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
