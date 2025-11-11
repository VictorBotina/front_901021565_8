
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

type Article = {
  title: string;
  description: string;
  href: string;
};

type Category = {
  title: string;
  href: string;
  featuredArticle: Article;
};

const blogData: Category[] = [
  {
    title: "Régimen Subsidiado",
    href: "/blog/subsidiado",
    featuredArticle: {
      title: "Artículo de Prueba para Régimen Subsidiado",
      description: "Este es un artículo de ejemplo para la categoría del régimen subsidiado.",
      href: "/blog/subsidiado/articulo-1",
    },
  },
  {
    title: "Régimen Contributivo",
    href: "/blog/contributivo",
    featuredArticle: {
      title: "Artículo de Prueba para Régimen Contributivo",
      description: "Este es un artículo de ejemplo para la categoría del régimen contributivo.",
      href: "/blog/contributivo/articulo-1",
    },
  },
  {
    title: "Prestadores",
    href: "/blog/prestadores",
    featuredArticle: {
      title: "Artículo de Prueba para Prestadores",
      description: "Este es un artículo de ejemplo para la categoría de prestadores de servicios de salud.",
      href: "/blog/prestadores/articulo-1",
    },
  },
  {
    title: "Comunicados de Prensa",
    href: "/blog/comunicados-de-prensa",
    featuredArticle: {
      title: "Comunicado de Prensa de Prueba",
      description: "Este es un ejemplo de un comunicado de prensa oficial de la entidad.",
      href: "/blog/comunicados-de-prensa/articulo-1",
    },
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Blog y Noticias
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Mantente informado sobre las últimas novedades, comunicados y actualizaciones de nuestra entidad.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {blogData.map((category) => (
          <Card key={category.href} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
            <CardHeader className="border-b bg-muted/30 p-4">
              <CardTitle as="h2">
                <Link href={category.href} className="hover:text-primary transition-colors">
                  {category.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="flex items-start gap-4">
                  <Newspaper className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{category.featuredArticle.title}</h3>
                    <CardDescription className="line-clamp-2">{category.featuredArticle.description}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                 <Button asChild variant="outline">
                    <Link href={category.featuredArticle.href}>
                        Leer artículo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild variant="link">
                  <Link href={category.href}>Ver todo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
