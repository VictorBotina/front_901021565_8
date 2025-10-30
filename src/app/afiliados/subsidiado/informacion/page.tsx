// src/app/afiliados/subsidiado/informacion/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InformacionLandingPage() {
  const sublinks = [
    { href: "/afiliados/subsidiado/informacion/derechos-y-deberes", title: "Derechos y Deberes", description: "Conoce tus derechos como afiliado y tus responsabilidades en el sistema." },
    { href: "/afiliados/subsidiado/informacion/plan-de-beneficios", title: "Plan de Beneficios", description: "Detalles sobre la cobertura, servicios y medicamentos incluidos." },
  ];

  return (
    <div className="p-6">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Régimen Subsidiado: Tu Derecho a la Salud Integral y Oportuna</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
          ¡Bienvenido/a! Reconocemos tu valor y el de tu familia. Como EPS, nuestra misión es garantizar que la población más vulnerable de Colombia acceda a servicios de salud de alta calidad, sin barreras.
        </p>
      </header>
      <Card className="max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>¿Qué es el Régimen Subsidiado?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <p>
              El Régimen Subsidiado es el mecanismo del Sistema General de Seguridad Social en Salud (SGSSS) diseñado para permitir que la población pobre y vulnerable, sin capacidad de pago, acceda a los servicios de salud a través de un subsidio, total o parcial, otorgado por el Estado.
            </p>
            <p>
              Al estar afiliado a este régimen, usted y su núcleo familiar tienen garantizada la cobertura total del Plan de Beneficios en Salud con cargo a la UPC (PBSCUPC). Nuestro compromiso es brindarle una atención integral que cubra todas las fases: promoción, prevención, diagnóstico, tratamiento, rehabilitación y paliación de la enfermedad.
            </p>
        </CardContent>
      </Card>
      
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Explora esta sección</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sublinks.map(link => (
                <Card key={link.href} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>{link.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{link.description}</p>
                        <Button asChild variant="outline">
                            <Link href={link.href}>
                                Ir a {link.title} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
