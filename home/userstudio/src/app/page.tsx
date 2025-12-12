import { Hero, type Slide } from "@/components/layout/home/Hero";
import { InfoCards } from "@/components/layout/home/InfoCards";
import { FeedbackSection } from "@/components/layout/home/FeedbackSection";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { InfoPopup } from "@/components/ui/popup";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const consentHandled = !!cookieStore.get('analytics_consent');
  // Define el contenido para cada slide del carrusel
  const heroSlides: Slide[] = [
    {
      image: PlaceHolderImages[0],
      title: "Servicios Digitales Accesibles para Todos",
      description: "Innovación y compromiso al servicio de nuestros afiliados y prestadores.",
      ctaText: "Portal Afiliados",
      ctaLink: "/afiliados",
    },
    {
      image: PlaceHolderImages[1],
      title: "Cuidamos de ti y tu Familia",
      description: "Accede a una red de especialistas y servicios de alta calidad.",
      ctaText: "Conoce Más",
      ctaLink: "/nosotros",
    },
    {
      image: PlaceHolderImages[2],
      title: "Innovación en Salud Digital",
      description: "Gestiona tus citas, autorizaciones y consultas desde la comodidad de tu hogar.",
      ctaText: "Ir al Portal",
      ctaLink: "/tramites-en-linea",
    },
  ];

  return (
    <>
      <InfoPopup popupId="popup_main_v1" consentHandled={consentHandled} />
      <Hero slides={heroSlides} />
      <InfoCards />
      <FeedbackSection />
    </>
  );
}
