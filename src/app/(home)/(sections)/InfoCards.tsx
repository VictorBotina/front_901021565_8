import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function InfoCards() {
  const staticCardData = [
    {
      title: "Régimen Subsidiado",
      description: "Accede a servicios de salud de calidad sin costo, garantizando tu bienestar y el de tu familia.",
      buttonText: "Conoce más",
      buttonLink: "/afiliados/subsidiado",
      imageUrl: "/images/img-sub/ico_subsidiado.svg",
    },
    {
      title: "Régimen Contributivo",
      description: "Cobertura completa para ti y tus beneficiarios a través de tu aporte como trabajador o independiente.",
      buttonText: "Explora beneficios",
      buttonLink: "/afiliados/contributivo",
    },
    {
      title: "Prestadores",
      description: "Accede a nuestro portal de servicios para gestionar convenios, facturación y autorizaciones de manera ágil.",
      buttonText: "Ir al portal",
      buttonLink: "/prestadores",
    },
  ];

  return (
    <section className="bg-muted/40 py-12 lg:py-24" aria-labelledby="info-cards-title">
       <h2 id="info-cards-title" className="sr-only">Nuestros Portales Principales</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta Régimen Subsidiado */}
          <Card className="flex flex-col text-center items-center">
            <CardHeader className="items-center">
              <Image
                src="/images/img-sub/ico_subsidiado.svg"
                alt="Icono Régimen Subsidiado"
                width={100}
                height={100}
                className="h-[100px] w-[100px]"
              />
              <CardTitle as="h3" className="pt-4">{staticCardData[0].title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{staticCardData[0].description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild>
                <Link href={staticCardData[0].buttonLink}>{staticCardData[0].buttonText}</Link>
              </Button>
            </div>
          </Card>

          {/* Tarjeta Régimen Contributivo */}
          <Card className="flex flex-col text-center items-center">
            <CardHeader className="items-center">
              <Image
                src="/images/img-sub/ico_subsidiado.svg"
                alt="Icono Régimen Contributivo"
                width={100}
                height={100}
                className="h-[100px] w-[100px]"
              />
              <CardTitle as="h3" className="pt-4">{staticCardData[1].title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{staticCardData[1].description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild>
                <Link href={staticCardData[1].buttonLink}>{staticCardData[1].buttonText}</Link>
              </Button>
            </div>
          </Card>

          {/* Tarjeta Prestadores */}
          <Card className="flex flex-col text-center items-center">
            <CardHeader className="items-center">
              <Image
                src="/images/img-sub/ico_subsidiado.svg"
                alt="Icono Prestadores"
                width={100}
                height={100}
                className="h-[100px] w-[100px]"
              />
              <CardTitle as="h3" className="pt-4">{staticCardData[2].title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{staticCardData[2].description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild>
                <Link href={staticCardData[2].buttonLink}>{staticCardData[2].buttonText}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
