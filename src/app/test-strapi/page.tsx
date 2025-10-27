'use server';

import { fetchFromStrapi } from "@/lib/api";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Hero, type HeroProps } from "./Hero";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  author?: {
    name: string;
  };
  category?: {
    name: string;
  };
};

type HomeData = {
  banner: {
    id: number;
    title: string;
    description: {
      type: string;
      children: { text: string; type: string }[];
    }[];
    button_primary_text: string;
    button_primary_url: string;
    button_secondary_text: string;
    button_secondary_url: string;
    background_image?: {
      url: string;
      alternativeText?: string;
    };
  };
};

export default async function TestStrapiPage() {
    const articles: Article[] = await fetchFromStrapi('articles');

    const homeData: HomeData | null = await fetchFromStrapi('home', {
        populate: {
          banner: {
            populate: '*',
          },
        },
      });
    
      const heroProps: HeroProps = {
        title: homeData?.banner.title,
        description: homeData?.banner.description.map(d => d.children.map(c => c.text).join(' ')).join('\n'),
        image: homeData?.banner.background_image ? {
          url: homeData.banner.background_image.url,
          alt: homeData.banner.background_image.alternativeText,
        } : undefined,
        primaryButton: {
          text: homeData?.banner.button_primary_text || "",
          url: homeData?.banner.button_primary_url || "",
        },
        secondaryButton: {
          text: homeData?.banner.button_secondary_text || "",
          url: homeData?.banner.button_secondary_url || "",
        },
      };

  return (
    <div>
        <Hero {...heroProps} />
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog y Noticias</h1>
            
            {articles && articles.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <div key={article.id} className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-transform hover:scale-105">
                    {article.cover?.url && (
                        <div className="relative h-48 w-full">
                            <Image
                                src={article.cover.url}
                                alt={article.cover.alternativeText || article.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex-1">
                            {article.category && (
                                <Badge variant="secondary" className="mb-2">{article.category.name}</Badge>
                            )}
                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                            <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Slug:</span> {article.slug}
                            </p>
                        </div>
                        {article.author && (
                        <div className="mt-4 border-t pt-4">
                            <p className="text-sm font-medium text-muted-foreground">
                            Autor: {article.author.name}
                            </p>
                        </div>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center">
                <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
            </div>
            )}
        </div>
        <div className="mt-8 bg-gray-100 p-4 rounded">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h2 className="text-2xl font-bold">Raw Strapi Data (Articles)</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                            <code>{JSON.stringify(articles, null, 2)}</code>
                        </pre>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
        <div className="mt-8 bg-gray-100 p-4 rounded">
            <h2 className="text-2xl font-bold mb-4">Raw Strapi Data (Hero)</h2>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <code>{JSON.stringify(homeData, null, 2)}</code>
            </pre>
        </div>
    </div>
  );
}
