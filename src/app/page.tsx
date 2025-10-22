import { Hero } from "./(sections)/Hero";
import { ContentSection } from "./(sections)/ContentSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSection
        title="Bienvenido a Entidad Digital"
        text="Somos una entidad comprometida con la transparencia, la accesibilidad y el servicio a nuestros afiliados y prestadores. Explore nuestro sitio para encontrar la información que necesita."
      />
      <ContentSection
        title="Nuestros Servicios"
        text="Ofrecemos una amplia gama de servicios para el régimen subsidiado y contributivo, garantizando el acceso a una atención de calidad. Para nuestros prestadores, facilitamos procesos y fortalecemos nuestra red de colaboración."
        reverse
      />
       <ContentSection
        title="Compromiso con la Accesibilidad"
        text="Creemos que la información debe ser para todos. Nuestro sitio está diseñado siguiendo las pautas de accesibilidad WCAG 2.1 AA para garantizar que todas las personas, independientemente de sus capacidades, puedan navegar y utilizar nuestros servicios digitales."
      />
    </>
  );
}
