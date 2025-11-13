// src/app/services/articleService.ts
import { Article, ApiListResponse, ApiSingleResponse } from "@/app/types/article";
import { fetchFromStrapi } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Helper para construir la URL completa de una imagen si es relativa
export const getStrapiURL = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (!API_BASE_URL) return path;
  return `${API_BASE_URL.replace("/api", "")}${path}`;
};


/**
 * Obtiene todos los artículos de la API de Strapi.
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const data = await fetchFromStrapi("articles", {
      fields: ["title", "description", "date", "slug"],
      populate: {
        image: { fields: ["url", "formats"] },
        author: { fields: ["name"] },
        category: { fields: ["name", "slug"] },
      },
    });

    if (!data) {
      console.log("No se recibieron datos de la API de Strapi para getArticles.");
      return [];
    }

    // El aplanador ya devuelve un array de artículos
    return data as Article[];
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    return [];
  }
}

/**
 * Obtiene un artículo específico por su slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
     const data = await fetchFromStrapi(`articles`, {
        filters: { slug: { $eq: slug } },
        populate: {
            image: { fields: ["url", "formats"] },
            category: { fields: ["name", "slug"] },
            author: { 
                populate: { avatar: { fields: ["url"] } }
            },
            content: {
                fields: ["title_seccion", "text", "media_url"],
            },
        },
    });

    if (!data || data.length === 0) {
      console.log(`No se encontró artículo con el slug: ${slug}`);
      return null;
    }

    // El aplanador devuelve un array, tomamos el primer elemento
    return data[0] as Article;
  } catch (error) {
    console.error(`❌ Error fetching article by slug ${slug}:`, error);
    return null;
  }
}

// Función para formatear fecha, puede ser útil en varios lugares
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

// Función para calcular tiempo de lectura
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
                totalWords += child.text.split(/\s+/).filter(Boolean).length;
              }
            });
          }
        });
      }
    });
  } catch (error) {
      console.error("Error calculando el tiempo de lectura", error);
      return "5 min";
  }
  
  const readingTimeMinutes = Math.ceil(totalWords / 200);
  return `${readingTimeMinutes} min`;
}
