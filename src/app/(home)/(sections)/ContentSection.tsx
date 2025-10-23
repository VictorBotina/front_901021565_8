import Image from "next/image";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ContentSectionProps = {
  title: string;
  text: string;
  image?: ImagePlaceholder;
  reverse?: boolean;
};

export function ContentSection({ title, text, image, reverse = false }: ContentSectionProps) {
  const imageToShow = image || PlaceHolderImages[1];

  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16", reverse && "md:[grid-template-areas:'image_text']")}>
          <div className={cn("space-y-4", reverse && "md:[grid-area:text]")}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {text}
            </p>
          </div>
          {imageToShow && (
            <div className={cn("overflow-hidden rounded-xl", reverse && "md:[grid-area:image]")}>
              <Image
                src={imageToShow.imageUrl}
                alt={imageToShow.description}
                width={600}
                height={400}
                className="aspect-video w-full object-cover"
                data-ai-hint={imageToShow.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
