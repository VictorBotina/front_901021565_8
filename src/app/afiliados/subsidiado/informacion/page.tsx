// src/app/afiliados/subsidiado/informacion/page.tsx
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookUser, FileText, UserCheck, Phone, HandCoins, Hospital, Pill, CalendarPlus, FileSignature, Users, Ambulance, ClipboardCheck, Receipt } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import React from "react";
import { ArticleSection } from "@/components/articles/ArticleSection";

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
      href: "/afiliados/subsidiado/informacion/consulta-ips", 
      title: "Consulta tu IPS", 
      description: "Valida tus derechos y encuentra tu Institución Prestadora de Salud asignada.",
      icon: <UserCheck />
    },
    { 
      href: "/afiliados/subsidiado/informacion/canales-de-atencion", 
      title: "Canales de Atención", 
      description: "Encuentra oficinas, líneas telefónicas y todo el soporte que necesitas.",
      icon: <Phone />
    },
     { 
      href: "/afiliados/subsidiado/informacion/contribucion-solidaria", 
      title: "Contribución Solidaria", 
      description: "Conoce cómo funciona este mecanismo de afiliación al Régimen Subsidiado.",
      icon: <HandCoins />
    },
    {
      href: "/afiliados/subsidiado/informacion/prestadores",
      title: "Red de Prestadores",
      description: "Consulta nuestra red de IPS, hospitales y clínicas para tu atención.",
      icon: <Hospital />
    },
    {
      href: "/afiliados/subsidiado/informacion/medicamentos",
      title: "Red de Medicamentos",
      description: "Consulta la red de farmacias y el listado de medicamentos cubiertos.",
      icon: <Pill />
    },
    {
      href: "/afiliados/subsidiado/informacion/directorio-prestadores",
      title: "Canales de citas red de prestadores",
      description: "Encuentra los canales de contacto para agendar tus citas.",
      icon: <CalendarPlus />
    },
    {
      href: "/afiliados/subsidiado/informacion/red-contratada",
      title: "Contratos red de prestadores",
      description: "Información sobre los contratos vigentes con nuestra red de prestadores.",
      icon: <FileSignature />
    },
    {
      href: "/afiliados/subsidiado/informacion/movilidad",
      title: "Movilidad entre regímenes",
      description: "Información sobre cómo solicitar la movilidad entre regímenes.",
      icon: <Users />
    },
    {
      href: "/afiliados/subsidiado/informacion/urgencias",
      title: "Servicios de urgencias",
      description: "Accede a la red de urgencias y conoce cómo actuar en una emergencia.",
      icon: <Ambulance />
    },
    {
      href: "/afiliados/subsidiado/informacion/sisben",
      title: "Información Sisbén IV",
      description: "Conoce la importancia del Sisbén IV para tu afiliación al Régimen Subsidiado.",
      icon: <ClipboardCheck />
    },
    {
      href: "/afiliados/subsidiado/informacion/copagos-cuotas-moderadoras",
      title: "Copagos y Cuotas Moderadoras",
      description: "Consulta los valores de los copagos y cuotas moderadoras para el Régimen Subsidiado.",
      icon: <Receipt />
    },
  ];

  return (
    <>
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
