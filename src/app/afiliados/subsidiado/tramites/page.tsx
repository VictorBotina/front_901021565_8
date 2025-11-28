// src/app/afiliados/subsidiado/tramites/page.tsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserPlus, FileBadge, Route } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import React from "react";
import { ArticleSection } from "@/components/articles/ArticleSection";

export default function TramitesLandingPage() {
  const sublinks = [
    {
      href: "/afiliados/subsidiado/tramites/afiliacion",
      title: "Afiliación",
      description: "Guía paso a paso sobre cómo afiliarte y qué documentos necesitas.",
      icon: <UserPlus />
    },
    {
      href: "/afiliados/subsidiado/tramites/certificado-afiliacion",
      title: "Certificados",
      description: "Accede y descarga tus certificados de afiliación y otros documentos importantes.",
      icon: <FileBadge />
    },
    {
      href: "/afiliados/subsidiado/tramites/portabilidad",
      title: "Portabilidad",
      description: "Información sobre cómo solicitar la portabilidad de tus servicios de salud.",
      icon: <Route />
    },
  ];

  return (
    <>
      <div className="p-6">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Trámites para el Afiliado</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            Gestiona tus solicitudes de forma fácil y rápida. Encuentra guías y recursos para todos tus trámites.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sublinks.map(link => (
                <Card key={link.href} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow">
                    <CardHeader className="items-center p-6">
                      <div className="p-4 bg-primary/10 rounded-full mb-2">
                          {React.cloneElement(link.icon, { className: "h-8 w-8 text-primary"})}
                      </div>
                      <CardTitle as="h3">{link.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{link.description}</CardDescription>
                    </CardContent>
                     <div className="p-6 pt-0">
                        <Button asChild variant="outline">
                            <Link href={link.href}>
                                Conocer más <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
      </div>
      <ArticleSection title="Últimas noticias" />
    </>
  );
}
