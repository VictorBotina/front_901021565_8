import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export type HeroProps = {
  title?: string;
  description?: string;
  image?: {
    url: string;
    alt: string;
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
  const heroImage = image ? { src: image.url, alt: image.alt } : { src: defaultHeroImage.imageUrl, alt: defaultHeroImage.description };

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full lg:h-[70vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={image ? undefined : defaultHeroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-title sm:text-5xl md:text-6xl"
            dangerouslySetInnerHTML={{ __html: title || "Servicios Digitales <br /> Accesibles para Todos" }}>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/90 md:text-xl">
            {description || "Innovación y compromiso al servicio de nuestros afiliados y prestadores."}
          </p>
          <div className="mt-8 flex gap-4">
            {primaryButton?.text && (
              <Button asChild size="lg">
                <Link href={primaryButton.url || "#"}>{primaryButton.text}</Link>
              </Button>
            )}
            {secondaryButton?.text && (
               <Button asChild size="lg" variant="secondary">
                <Link href={secondaryButton.url || "#"}>{secondaryButton.text}</Link>
              </Button>
            )}
            {!primaryButton && (
                 <Button asChild size="lg">
                    <Link href="#">Portal Afiliados</Link>
                 </Button>
            )}
            {!secondaryButton && (
                <Button asChild size="lg" variant="secondary">
                    <Link href="#">Portal Prestadores</Link>
                </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
