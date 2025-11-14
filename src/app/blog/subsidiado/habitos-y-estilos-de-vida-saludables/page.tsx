<<<<<<< HEAD
// The dynamic route at src/app/blog/subsidiado/[slug]/page.tsx now handles all articles.
export default function HabitosSaludablesPage() {
    return null;
=======
// src/app/blog/subsidiado/habitos-y-estilos-de-vida-saludables/page.tsx
import { fetchFromStrapi } from "@/lib/api";

const ARTICLE_ID = "fni951bnbpi9tc18e7t92l6i";

// Parámetros de la consulta, extraídos de la URL que proporcionaste
const queryParams = {
    fields: ['title', 'description', 'date'],
    populate: {
        author: {
            fields: ['name', 'bio'],
            populate: {
                avatar: {
                    fields: ['url']
                }
            }
        },
        category: {
            fields: ['name']
        },
        image: {
            fields: ['url']
        },
        content: {
            fields: ['title_seccion', 'text', 'media_url']
        }
    }
};

export default async function HabitosSaludablesPage() {
  try {
    console.log(`[PRUEBA] Obteniendo datos para el artículo con ID: ${ARTICLE_ID}`);
    // Llamamos a fetchFromStrapi directamente con el endpoint y los parámetros
    const article = await fetchFromStrapi(`articles/${ARTICLE_ID}`, queryParams);

    console.log("✅ [PRUEBA] Respuesta de la API de Strapi recibida:");
    console.log(JSON.stringify(article, null, 2));

    if (!article) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-destructive">Error de prueba</h1>
          <p className="mt-4 text-muted-foreground">
            No se encontró el artículo con ID {ARTICLE_ID}. Revisa la consola del servidor para más detalles.
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Prueba de API para: {article.title}</h1>
        <p className="mt-4 text-muted-foreground">
          La respuesta completa de la API ha sido mostrada en la consola del servidor.
        </p>
        <pre className="mt-6 bg-secondary p-4 rounded-md overflow-auto text-sm">
          <code>{JSON.stringify(article, null, 2)}</code>
        </pre>
      </div>
    );

  } catch (error: any) {
    console.error("❌ [PRUEBA] Falló la obtención de datos desde Strapi:", error.message);
    return (
       <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-destructive">Error de prueba</h1>
          <p className="mt-4 text-muted-foreground">
            Ocurrió un error al intentar conectar con la API de Strapi. Revisa la consola del servidor para más detalles.
          </p>
        </div>
    )
  }
>>>>>>> b053c06 (en "/blog/subsidiado/habitos-y-estilos-de-vida-saludables", a manera de)
}
