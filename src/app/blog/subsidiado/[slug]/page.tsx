// src/app/blog/subsidiado/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';
import {
  getArticleBySlug,
  getAuthorAvatarUrl,
  calculateReadingTime,
  formatDate,
  getArticles,
} from "@/app/services/articleService";
import { getStrapiURL } from "@/lib/api";
import { Article, RichTextBlock } from "@/app/types/article";
import { Calendar, Clock } from "lucide-react";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { notFound } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

// Genera los parámetros estáticos para cada artículo en la categoría "Subsidiado"
export async function generateStaticParams() {
  const articles = await getArticles("Subsidiado");
  
  if (!articles || articles.length === 0) {
    return [];
  }

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Genera los metadatos para la página del artículo
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const ogImageUrl = article.image ? getStrapiURL(article.image.url) : `${siteUrl}/default-og.jpg`;
  const shareUrl = `${siteUrl}/blog/subsidiado/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: shareUrl,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
  };
}


function renderArticleContent(content: Article['content']) {
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
    const defaultBio = "Comunicador especializado en temas de salud y bienestar.";
    
    if (!bio || !Array.isArray(bio) || bio.length === 0) {
        return <p className="text-muted-foreground leading-relaxed">{defaultBio}</p>;
    }
    
    const bioText = bio
      .filter(block => block.type === 'paragraph' && block.children)
      .flatMap(block => block.children.map(child => child.text).join(''))
      .join('\n')
      .trim();

    if (!bioText) {
        return <p className="text-muted-foreground leading-relaxed">{defaultBio}</p>;
    }

    return bioText.split('\n').map((paragraph, index) => (
        <p key={index} className="text-muted-foreground leading-relaxed">{paragraph}</p>
    ));
}


export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }
  
  const readingTime = calculateReadingTime(article.content);
  const authorAvatarUrl = article.author ? getAuthorAvatarUrl(article.author.avatar) : null;
  const imageUrl = article.image ? getStrapiURL(article.image.url) : null;
  const shareUrl = `${siteUrl}/blog/subsidiado/${article.slug}`;

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
            <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={article.date}>
                    {formatDate(article.date)}
                </time>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{readingTime}</span>
            </div>
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

         <div className="mt-12 border-t pt-8">
            <ShareButtons url={shareUrl} title={article.title} summary={article.description} />
        </div>

        {article.author && (
            <footer className="mt-12 bg-muted/50 rounded-xl border p-8">
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
