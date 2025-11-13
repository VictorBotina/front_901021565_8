// src/app/services/articleService.ts
import { Article } from "@/app/types/article";
import { fetchFromStrapi } from "@/lib/api";

/**
 * Obtiene todos los artículos de la API de Strapi para la página principal del blog.
 */
export async function getArticles(): Promise<Article[]> {
  const params = {
    sort: { date: 'desc' },
    // Se elimina "slug" de los campos principales porque no es un atributo directo solicitado así.
    // El slug del artículo es un campo de nivel superior que se obtiene por defecto.
    fields: ["title", "description", "date"],
    populate: {
      image: { fields: ["url", "formats"] },
      author: { fields: ["name"] },
      category: { fields: ["name", "slug"] },
    },
  };

  try {
    const data = await fetchFromStrapi("articles", params);
    // Asegurarse de que siempre devolvemos un array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // El error ya se loguea en fetchFromStrapi
    console.error("📦 getArticles falló, devolviendo un array vacío para evitar que la página se rompa.");
    return []; // Devolver un array vacío en caso de error para evitar que la página se rompa
  }
}

/**
 * Obtiene un artículo específico por su slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const params = {
    filters: { slug: { $eq: slug } },
    populate: {
      image: { fields: ["url", "formats"] },
      category: { fields: ["name", "slug"] },
      author: {
        populate: { avatar: { fields: ["url"] } },
      },
      content: {
        populate: '*', // Poblar todo el contenido dinámico
      },
    },
  };

  try {
    const data = await fetchFromStrapi("articles", params);
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`No se encontró artículo con el slug: ${slug}`);
      return null;
    }
    // La API devuelve un array, tomamos el primer elemento
    return data[0] as Article;
  } catch (error) {
    // El error ya se loguea en fetchFromStrapi
    console.error(`📦 getArticleBySlug falló para el slug '${slug}', devolviendo null.`);
    return null; // Devolver null en caso de error
  }
}

// Función para formatear la fecha, útil para la UI
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    // Se añade 'T00:00:00' para asegurar que se interprete como UTC y evitar problemas de zona horaria (hydration error)
    const utcDate = new Date(dateString.split('T')[0] + 'T00:00:00');
    return utcDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: 'UTC',
    });
  } catch (error) {
    console.error("Error al formatear la fecha:", dateString, error);
    return "Fecha inválida";
  }
}

// Función para calcular el tiempo de lectura estimado
export function calculateReadingTime(content: any[]): string {
  if (!content || !Array.isArray(content)) return "5 min";

  let totalWords = 0;
  try {
    content.forEach((section) => {
      // Comprobar si el bloque es del tipo 'richtext' y tiene 'body'
      if (section.__component === 'shared.rich-text' && section.body && typeof section.body === 'string') {
        totalWords += section.body.trim().split(/\s+/).length;
      }
    });
  } catch (error) {
    console.error("Error calculando el tiempo de lectura:", error);
    return "5 min";
  }
  
  const readingTimeMinutes = Math.ceil(totalWords / 200);
  return `${readingTimeMinutes} min`;
}
