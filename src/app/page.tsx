import { Hero } from "./(sections)/Hero";
import { ContentSection } from "./(sections)/ContentSection";
import { fetchFromStrapi } from "@/lib/api";

type Article = {
  id: number;
  attributes: {
    title: string;
    content: string;
  }
}

export default async function Home() {
  const articles: Article[] = await fetchFromStrapi('articles');

  return (
    <>
      <Hero />
      <ContentSection
        title="Bienvenido a Entidad Digital"
        text="Somos una entidad comprometida con la transparencia, la accesibilidad y el servicio a nuestros afiliados y prestadores. Explore nuestro sitio para encontrar la información que necesita."
      />

      {/* Ejemplo de cómo mostrar datos de Strapi */}
      {articles && articles.length > 0 ? (
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Noticias y Actualizaciones</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div key={article.id} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                  <h3 className="text-2xl font-bold mb-2">{article.attributes.title}</h3>
                  <p className="text-muted-foreground">{article.attributes.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-24">
           <div className="container mx-auto px-4 text-center">
             <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
           </div>
        </section>
      )}

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
