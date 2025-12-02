// src/app/afiliados/contributivo/page.tsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookUser, Briefcase, Building } from "lucide-react";
import React from 'react';
import type { Metadata } from 'next';
import { ArticleSection } from "@/components/articles/ArticleSection";

export const metadata: Metadata = {
  title: 'Régimen Contributivo | Cobertura Integral para Trabajadores',
  description: 'Información sobre afiliación, beneficios, aportes y trámites para trabajadores dependientes, independientes y empleadores en el Régimen Contributivo.',
  keywords: ['Régimen Contributivo', 'afiliación EPS', 'aportes en línea', 'PILA', 'incapacidades', 'licencias de maternidad', 'beneficiarios', 'trámites empleadores'],
};

export default function ContributivoPage() {
  const sublinks = [
    { 
      href: "/afiliados/contributivo/informacion", 
      title: "Información para Afiliados", 
      description: "Conoce tus beneficios, red de servicios y detalles de tu cobertura.",
      icon: <BookUser className="h-8 w-8 text-primary" /> 
    },
    { 
      href: "/afiliados/contributivo/tramites", 
      title: "Trámites en Línea", 
      description: "Gestiona citas, autorizaciones, certificados y más desde nuestro portal.",
      icon: <Briefcase className="h-8 w-8 text-primary" />
    },
    { 
      href: "/afiliados/contributivo/tramites/empleadores", 
      title: "Trámites para Empleadores", 
      description: "Registra tu empresa, afilia a tus trabajadores y gestiona novedades.",
      icon: <Building className="h-8 w-8 text-primary" />
    },
  ];

  return (
    <>
      <div className="p-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-title">Régimen Contributivo</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            Ofrecemos una cobertura integral en salud para ti y tu familia a través de tu vinculación laboral. Encuentra aquí toda la información, servicios y trámites que necesitas.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Nuestros Portales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {sublinks.map(link => (
                  <Card key={link.href} className="group relative flex flex-col text-center items-center overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                      <CardHeader className="items-center p-6 z-10 transition-all duration-300">
                        <div className="p-4 bg-primary/10 rounded-full mb-2 transition-transform duration-300 group-hover:scale-90">
                            {link.icon}
                        </div>
                        <CardTitle className="transition-colors duration-300 group-hover:text-white">{link.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10 flex-grow">
                          <p className="text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">{link.description}</p>
                      </CardContent>
                      <div className="relative z-10 p-6 pt-0">
                        <Button asChild variant="secondary" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Link href={link.href}>
                                Ir a la sección <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 transition-opacity duration-300 group-hover:opacity-0">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={link.href}>
                                    Conocer más
                                </Link>
                            </Button>
                        </div>
                      </div>
                  </Card>
              ))}
          </div>
        </section>
      </div>
      <ArticleSection title="Noticias de Interés para el Régimen Contributivo" />
    </>
  );
}
