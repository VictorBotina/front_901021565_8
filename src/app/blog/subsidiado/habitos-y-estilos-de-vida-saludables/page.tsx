import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getArticleById,
  getAuthorAvatarUrl,
  calculateReadingTime,
  formatDate,
} from "@/app/services/articleService";
import { getStrapiURL } from "@/lib/api";
import { ArticleContentSection, RichTextBlock } from "@/app/types/article";
import { Calendar, Clock, User } from "lucide-react";

// Componente para renderizar el contenido del artículo
function renderArticleContent(content: ArticleContentSection[] | undefined) {
  if (!content || !Array.isArray(content)) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Contenido no disponible.</p>
      </div>
    );
  }

  return content.map((section, sectionIndex) => (
    <section key={section.id || sectionIndex} className="mb-10">
      {section.title_seccion && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
          {section.title_seccion}
        </h2>
      )}

      <div className="space-y-6">
        {section.text?.map((textBlock, textIndex) => {
          if (textBlock.type === "paragraph") {
            const paragraphText = textBlock.children
              .map((child) => child.text)
              .join("")
              .trim();

            if (!paragraphText) return null;

            // Detectar si es una lista numerada
            if (paragraphText.match(/^\d+\.\s/)) {
              return (
                <div key={textIndex} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm flex items-center justify-center font-semibold mt-1">
                    {paragraphText.split(".")[0]}
                  </span>
                  <p className="text-foreground/80 leading-relaxed text-lg flex-1">
                    {paragraphText.replace(/^\d+\.\s/, "")}
                  </p>
                </div>
              );
            }

            return (
              <p key={textIndex} className="text-foreground/80 leading-relaxed text-lg">
                {paragraphText}
              </p>
            );
          }
          return null;
        })}
      </div>
    </section>
  ));
}

function renderAuthorBio(bio: RichTextBlock[] | undefined) {
    if (!bio || !Array.isArray(bio)) {
        return (
            <p className="text-muted-foreground leading-relaxed">
                Comunicador especializado en temas de salud y bienestar.
            </p>
        );
    }
    
    return bio.map((block, index) => {
        if (block.type === 'paragraph') {
            const text = block.children.map(child => child.text).join('');
            if (text.trim() === '') return null;
            return <p key={index} className="text-muted-foreground leading-relaxed">{text}</p>;
        }
        return null;
    }).filter(Boolean);
}


export default async function HabitosSaludablesPage() {
  const articleId = "fni951bnbpi9tc18e7t92l6i";
  const article = await getArticleById(articleId);

  if (!article) {
    return (
      <div className="min-h-[60vh] bg-background flex items-center justify-center">
        <div className="text-center max-w-2xl mx-4 p-8">
          <h1 className="text-3xl font-bold text-destructive mb-4">
            Artículo No Encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            No pudimos cargar el artículo que estás buscando. Es posible que haya sido movido o eliminado.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition-colors"
          >
            ← Volver al Blog
          </Link>
        </div>
      </div>
    );
  }
  
  const readingTime = calculateReadingTime(article.content);
  const authorAvatarUrl = article.author ? getAuthorAvatarUrl(article.author.avatar) : null;
  const imageUrl = article.image ? getStrapiURL(article.image.url) : null;

  return (
    <div className="bg-background">
      <article className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <header className="text-center mb-12">
           {article.category && (
              <Link href={`/blog/${article.category.slug}`} className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6 hover:bg-primary/20 transition-colors">
                {article.category.name}
              </Link>
           )}

          <h1 className="text-4xl md:text-5xl font-extrabold text-title mb-6 leading-tight">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              {article.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-muted-foreground text-sm">
            {article.date && (
                <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={article.date}>
                        {formatDate(article.date)}
                    </time>
                </div>
            )}
            
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{readingTime} de lectura</span>
            </div>

            {article.author && (
                <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Por {article.author.name}</span>
                </div>
            )}
          </div>
        </header>

        {imageUrl && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg aspect-video relative">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg lg:prose-xl max-w-none mx-auto">
          {renderArticleContent(article.content)}
        </div>

        {article.author && (
            <footer className="mt-16 bg-muted/50 rounded-xl border p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {authorAvatarUrl ? (
                        <Image
                        src={authorAvatarUrl}
                        alt={`Avatar de ${article.author.name}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
                        {article.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Escrito por</h3>
                        <h4 className="text-xl font-bold text-foreground mt-1 mb-2">
                            {article.author.name}
                        </h4>
                        {renderAuthorBio(article.author.bio)}
                    </div>
                </div>
            </footer>
        )}
      </article>
    </div>
  );
}
