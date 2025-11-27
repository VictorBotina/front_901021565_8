import { Hero, type Slide } from "@/components/layout/home/Hero";
import { InfoCards } from "@/components/layout/home/InfoCards";
import { FeedbackSection } from "@/components/layout/home/FeedbackSection";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { StrapiApiTester } from "@/components/layout/home/StrapiApiTester";

export default function Home() {
  // Define el contenido para cada slide del carrusel
  const heroSlides: Slide[] = [
    {
      image: PlaceHolderImages[0],
      title: "Servicios Digitales Accesibles para Todos",
      description: "Innovación y compromiso al servicio de nuestros afiliados y prestadores.",
      ctaText: "Portal Afiliados",
      ctaLink: "#",
    },
    {
      image: PlaceHolderImages[1],
      title: "Cuidamos de ti y tu Familia",
      description: "Accede a una red de especialistas y servicios de alta calidad.",
      ctaText: "Conoce Más",
      ctaLink: "#",
    },
    {
      image: PlaceHolderImages[2],
      title: "Innovación en Salud Digital",
      description: "Gestiona tus citas, autorizaciones y consultas desde la comodidad de tu hogar.",
      ctaText: "Ir al Portal",
      ctaLink: "#",
    },
  ];

  return (
    <>
      <Hero slides={heroSlides} />
      <InfoCards />
      <FeedbackSection />
      <StrapiApiTester />
    </>
  );
}
