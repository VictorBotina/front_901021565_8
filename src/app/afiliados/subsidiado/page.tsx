// src/app/afiliados/subsidiado/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookUser, Briefcase, HeartPulse, ShieldCheck } from "lucide-react";
import React from 'react';
import type { Metadata } from 'next';
import { ArticleSection } from "@/components/articles/ArticleSection";

export const metadata: Metadata = {
  title: 'Régimen Subsidiado: Tu Derecho a la Salud Integral y Oportuna',
  description: 'Régimen Subsidiado en Colombia: acceso inmediato a salud integral para ti y tu familia, sin barreras ni carencias.',
  keywords: 'Régimen Subsidiado, EPS, salud integral, SGSSS, cobertura en salud, atención médica, Colombia, acceso a salud, Plan de Beneficios en Salud, PBSCUPC, afiliación EPS, servicios de salud, población vulnerable, atención sin carencias, subsidio estatal, promoción de la salud, prevención, diagnóstico, tratamiento, rehabilitación, paliación.',
};


export default function SubsidiadoLandingPage() {
  const sublinks = [
    { 
      href: "/afiliados/subsidiado/informacion", 
      title: "Información", 
      description: "Conoce tus derechos, deberes y el plan de beneficios que te protege.",
      icon: <BookUser className="h-8 w-8 text-primary" /> 
    },
    { 
      href: "/afiliados/subsidiado/tramites", 
      title: "Trámites", 
      description: "Gestiona tu afiliación, certificados y solicitudes de movilidad fácilmente.",
      icon: <Briefcase className="h-8 w-8 text-primary" />
    },
    { 
      href: "/afiliados/subsidiado/cuidado-de-la-salud", 
      title: "Cuidado de la Salud", 
      description: "Accede a programas de prevención, nutrición y bienestar para ti y tu familia.",
      icon: <HeartPulse className="h-8 w-8 text-primary" />
    },
  ];

  return (
    <>
      <div className="p-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-title">Régimen Subsidiado: Tu Derecho a la Salud Integral y Oportuna</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
            ¡Bienvenido/a! Nos alegra tenerte con nosotros. Nuestro propósito es cuidar de ti y de tu familia, asegurando que todas las personas, sin importar su condición, accedan a servicios de salud dignos y de calidad.
          </p>
        </header>

        <section className="max-w-4xl mx-auto mb-12">
          <Card className="bg-accent/50 border-primary/20">
              <CardHeader>
                   <CardTitle as="h2" className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      <span>¿Qué es el Régimen Subsidiado?</span>
                   </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                  <p>El Régimen Subsidiado es el mecanismo del Sistema General de Seguridad Social en Salud (SGSSS) diseñado para permitir que la población pobre y vulnerable, sin capacidad de pago, acceda a los servicios de salud a través de un subsidio, total o parcial, otorgado por el Estado.</p>
                  <p>Al estar afiliado a este régimen, usted y su núcleo familiar tienen garantizada la cobertura total del Plan de Beneficios en Salud con cargo a la UPC (PBSCUPC). Nuestro compromiso es brindarle una atención integral que cubra todas las fases: promoción, prevención, diagnóstico, tratamiento, rehabilitación y paliación de la enfermedad.</p>
                  <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold text-lg">Acceso Garantizado: Sin Periodos de Carencia</h3>
                      <p className="text-muted-foreground mt-2">Es fundamental que sepa que en el Régimen Subsidiado no existen periodos de carencia. Esto significa que, desde el momento de su afiliación, tiene acceso inmediato a los servicios y tecnologías de salud del PBSCUPC, y no hay restricciones en los servicios por causa de traslados entre EPS.</p>
                  </div>
              </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Explora tus Beneficios y Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {sublinks.map(link => (
                  <Card key={link.href} className="group relative flex flex-col text-center items-center overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                      <CardHeader className="items-center p-6 z-10 transition-all duration-300">
                        <div className="p-4 bg-primary/10 rounded-full mb-2 transition-transform duration-300 group-hover:scale-90">
                            {link.icon}
                        </div>
                        <CardTitle as="h3" className="transition-colors duration-300 group-hover:text-white">{link.title}</CardTitle>
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
        </section>
      </div>
      <ArticleSection title="Últimas noticias" />
    </>
  );
}
