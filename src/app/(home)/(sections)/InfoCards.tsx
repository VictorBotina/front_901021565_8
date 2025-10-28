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

const staticCardData = [
  {
    iconName: "HeartHandshake",
    title: "Régimen Subsidiado",
    description: "Accede a servicios de salud de calidad sin costo, garantizando tu bienestar y el de tu familia.",
    buttonText: "Conoce más",
    buttonLink: "/afiliados/subsidiado",
  },
  {
    iconName: "Briefcase",
    title: "Régimen Contributivo",
    description: "Cobertura completa para ti y tus beneficiarios a través de tu aporte como trabajador o independiente.",
    buttonText: "Explora beneficios",
    buttonLink: "/afiliados/contributivo",
  },
  {
    iconName: "Stethoscope",
    title: "Prestadores",
    description: "Accede a nuestro portal de servicios para gestionar convenios, facturación y autorizaciones de manera ágil.",
    buttonText: "Ir al portal",
    buttonLink: "/prestadores",
  },
];

const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  HeartHandshake: HeartHandshake,
  Briefcase: Briefcase,
  Stethoscope: Stethoscope,
  sub: HeartHandshake,
  cont: Briefcase,
  prest: Stethoscope,
};

// Function to get the appropriate icon component
const getIcon = (iconIdentifier: string | undefined) => {
  if (!iconIdentifier) return Stethoscope; // Default icon
  const IconComponent = icons[iconIdentifier];
  return IconComponent || Stethoscope; // Default if not found
};


type CardInfo = {
  id?: number;
  title: string;
  description: string | { type: string, children: { text: string }[] }[];
  buttonText: string;
  buttonLink: string;
  icon?: string;
  iconName?: string;
};

type InfoCardsProps = {
  cards?: CardInfo[];
};


export function InfoCards({ cards }: InfoCardsProps) {
  const cardDataToRender = cards?.map(card => ({
    ...card,
    description: Array.isArray(card.description) 
      ? card.description.map(d => d.children.map(c => c.text).join(' ')).join('\n')
      : card.description,
    iconName: card.icon || card.iconName,
  })) || staticCardData;

  return (
    <section className="bg-muted/40 py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardDataToRender.map((card, index) => {
             const IconComponent = getIcon(card.iconName);
             return (
              <Card key={card.id || index} className="flex flex-col text-center items-center">
                <CardHeader className="items-center">
                  <IconComponent className="h-10 w-10 text-primary" />
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
             )
          })}
        </div>
      </div>
    </section>
  );
}