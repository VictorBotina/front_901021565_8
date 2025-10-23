import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages[0];

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full lg:h-[70vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-title sm:text-5xl md:text-6xl">
            Servicios Digitales <br />
            Accesibles para Todos
          </h1>
          <p className="mt-4 max-w-lg text-lg text-foreground/90 md:text-xl">
            Innovación y compromiso al servicio de nuestros afiliados y prestadores.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="/afiliados">Portal Afiliados</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/prestadores">Portal Prestadores</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
