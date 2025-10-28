import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export type HeroProps = {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
};

export function Hero(props: HeroProps) {
  const { title, description, image, primaryButton, secondaryButton } = props;

  const defaultHeroImage = PlaceHolderImages[0];

  const heroImage = image
    ? {
        src: image.url,
        alt: image.alt || "Banner",
      }
    : {
        src: defaultHeroImage.imageUrl,
        alt: defaultHeroImage.description,
      };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Tarjeta con imagen */}
          <Card className="overflow-hidden rounded-xl shadow-lg">
            <CardContent className="p-0">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={600}
                height={400}
                className="aspect-video w-full h-full object-cover"
                priority
                data-ai-hint={image ? undefined : defaultHeroImage.imageHint}
              />
            </CardContent>
          </Card>

          {/* Texto y botones */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1
                className="text-4xl font-extrabold tracking-tight text-title sm:text-5xl md:text-6xl"
                dangerouslySetInnerHTML={{
                  __html: title || "Servicios Digitales <br /> Accesibles para Todos",
                }}
              />
              <p className="max-w-[600px] text-lg text-foreground/90 md:text-xl">
                {description ||
                  "Innovación y compromiso al servicio de nuestros afiliados y prestadores."}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {primaryButton?.text ? (
                <Button asChild size="lg">
                  <Link href={primaryButton.url || "#"}>{primaryButton.text}</Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="#">Portal Afiliados</Link>
                </Button>
              )}

              {secondaryButton?.text ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={secondaryButton.url || "#"}>{secondaryButton.text}</Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="secondary">
                  <Link href="#">Portal Prestadores</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
