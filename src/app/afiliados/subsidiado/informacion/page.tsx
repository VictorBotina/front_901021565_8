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
    },
    {
      href: "/afiliados/subsidiado/consulta-ips",
      title: "Consulta tu IPS",
      description: "Valida tus derechos y encuentra tu Institución Prestadora de Salud.",
      icon: <Network />
    },
  ];

  return (
    <div className="p-6">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Información para el Afiliado</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
          Encuentra aquí todo lo que necesitas saber sobre tu afiliación, derechos, beneficios y nuestra red de servicios.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sublinks.map(link => (
              <Card key={link.href} className="group relative flex flex-col text-center items-center overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="items-center p-6 z-10 transition-all duration-300">
                    <div className="p-4 bg-primary/10 rounded-full mb-2 transition-transform duration-300 group-hover:scale-90">
                        {React.cloneElement(link.icon, { className: "h-8 w-8 text-primary"})}
                    </div>
                    <CardTitle className="transition-colors duration-300 group-hover:text-white">{link.title}</CardTitle>
                  </CardHeader>
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-primary/90"></div>
                    <div className="relative z-10">
                      <p className="text-primary-foreground mb-4">{link.description}</p>
                      <Button asChild variant="secondary">
                          <Link href={link.href}>
                              Conocer más <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                    </div>
                  </div>
              </Card>
          ))}
      </div>
    </div>
  );
}