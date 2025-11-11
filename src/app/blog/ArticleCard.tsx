
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Article } from '@/lib/types';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={article.href} className="block group">
      <div className="relative h-56 w-full bg-gray-200 rounded-md overflow-hidden mb-4">
        <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-semibold px-2 py-1 rounded" style={{backgroundColor: article.category.bgColor, color: article.category.textColor}}>
            {article.category.name}
        </span>
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
            {article.description}
        </p>
        <div className="text-xs text-gray-500">
            <span>Por {article.author}</span> ・ <time>{format(article.date, "d MMM, yyyy", { locale: es })}</time>
        </div>
      </div>
    </Link>
  );
}

    