
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ComunicadosPrensaBlogPage() {
  const articles = [
    {
      title: "Comunicado de Prensa de Prueba",
      description: "Este es un ejemplo de un comunicado de prensa oficial de la entidad.",
      href: "/blog/comunicados-de-prensa/articulo-1",
    },
    // Futuros comunicados se añadirán aquí
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog: Comunicados de Prensa</h1>
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
