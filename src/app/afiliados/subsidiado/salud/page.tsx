// src/app/afiliados/subsidiado/salud/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse, BrainCircuit, Apple } from "lucide-react";
import React from 'react';
import type { Sublink } from '@/lib/types';
import { ArticleSection } from "@/components/articles/ArticleSection";


export default function CuidadoSaludLandingPage() {
  const sublinks: Sublink[] = [
    { href: "/afiliados/subsidiado/salud/nutricion", title: "Nutrición y Vida Activa", description: "Consejos y guías para una alimentación balanceada.", icon: Apple },
    { href: "/afiliados/subsidiado/salud/salud-mental", title: "Salud Mental", description: "Recursos y apoyo para tu bienestar emocional.", icon: BrainCircuit },
    { href: "/afiliados/subsidiado/programas-pyp", title: "Programas PyP", description: "Programas de promoción de la salud y prevención de la enfermedad.", icon: HeartPulse },
  ];

  return (
    <>
      <div className="p-6">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Cuidado de la Salud y Bienestar</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
            En esta sección encontrarás programas y recomendaciones para mantener un estilo de vida saludable y cuidar de tu bienestar integral.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sublinks.map(link => {
                const IconComponent = link.icon;
                return (
                    <Card key={link.href} className="flex flex-col text-center items-center hover:shadow-lg transition-shadow">
                        <CardHeader className="items-center">
                          <div className="p-4 bg-primary/10 rounded-full mb-2">
                              <IconComponent className="h-8 w-8 text-primary" />
                          </div>
                          <CardTitle as="h3">{link.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground mb-4">{link.description}</p>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button asChild variant="outline">
                                <Link href={link.href}>
                                    Conocer más <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                );
            })}
        </div>
      </div>
      <ArticleSection title="Últimas noticias" />
    </>
  );
}
