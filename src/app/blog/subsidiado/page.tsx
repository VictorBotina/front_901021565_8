
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SubsidiadoBlogPage() {
  const articles = [
    {
      title: "Artículo de Prueba para Régimen Subsidiado",
      description: "Este es un artículo de ejemplo para la categoría del régimen subsidiado.",
      href: "/blog/subsidiado/articulo-1",
    },
    // Futuros artículos para esta categoría se añadirán aquí
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog: Régimen Subsidiado</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={article.href} key={article.title} className="block">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{article.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
