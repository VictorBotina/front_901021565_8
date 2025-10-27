import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, HeartHandshake, Stethoscope } from "lucide-react";
import Link from "next/link";

const cardData = [
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: "Régimen Subsidiado",
    description: "Accede a servicios de salud de calidad sin costo, garantizando tu bienestar y el de tu familia.",
    buttonText: "Conoce más",
    buttonLink: "/afiliados/subsidiado",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Régimen Contributivo",
    description: "Cobertura completa para ti y tus beneficiarios a través de tu aporte como trabajador o independiente.",
    buttonText: "Explora beneficios",
    buttonLink: "/afiliados/contributivo",
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: "Prestadores",
    description: "Accede a nuestro portal de servicios para gestionar convenios, facturación y autorizaciones de manera ágil.",
    buttonText: "Ir al portal",
    buttonLink: "/prestadores",
  },
];

export function InfoCards() {
  return (
    <section className="bg-muted/40 py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <Card key={index} className="flex flex-col text-center items-center">
              <CardHeader className="items-center">
                {card.icon}
                <CardTitle className="pt-4">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild>
                  <Link href={card.buttonLink}>{card.buttonText}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
