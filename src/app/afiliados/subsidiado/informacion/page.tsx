// src/app/afiliados/subsidiado/informacion/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, BookUser, FileText, Building, Network } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import React from "react";

export default function InformacionLandingPage() {
  const sublinks = [
    {
      href: "/afiliados/subsidiado/informacion/derechos-y-deberes",
      title: "Derechos y Deberes",
      description: "Conoce tus derechos como afiliado y tus responsabilidades en el sistema.",
      icon: <BookUser />
    },
    {
      href: "/afiliados/subsidiado/informacion/plan-de-beneficios",
      title: "Plan de Beneficios",
      description: "Detalles sobre la cobertura, servicios y medicamentos incluidos.",
      icon: <FileText />
    },
    {
      href: "/afiliados/subsidiado/informacion/oficinas",
      title: "Oficinas de Atención",
      description: "Encuentra nuestras oficinas y puntos de atención más cercanos.",
      icon: <Building />
    }
  ];

  return (
    <div className="p-6">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Información para el Afiliado</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
          Encuentra aquí todo lo que necesitas saber sobre tu afiliación, derechos, beneficios y nuestra red de servicios.
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
          ))}
      </div>
    </div>
  );
}