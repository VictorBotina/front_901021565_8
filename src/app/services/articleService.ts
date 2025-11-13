// src/app/services/articleService.ts
import { Article } from "@/app/types/article";
import { fetchFromStrapi, getStrapiURL } from "@/lib/api";

/**
 * Obtiene todos los artículos de la API de Strapi para la página principal del blog.
 */
export async function getArticles(): Promise<Article[]> {
  const params = {
    fields: ["title", "description", "date", "slug"],
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
        fields: ["title_seccion", "text", "media_url"],
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
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      if (section.text && Array.isArray(section.text)) {
        section.text.forEach((textBlock: any) => {
          if (textBlock.children && Array.isArray(textBlock.children)) {
            textBlock.children.forEach((child: any) => {
              if (typeof child.text === 'string') {
                totalWords += child.text.trim().split(/\s+/).length;
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error calculando el tiempo de lectura:", error);
    return "5 min";
  }
  
  const readingTimeMinutes = Math.ceil(totalWords / 200);
  return `${readingTimeMinutes} min`;
}
