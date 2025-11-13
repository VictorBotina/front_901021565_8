// src/app/services/articleService.ts
import { Article, ArticleContentSection, RichTextBlock } from "@/app/types/article";
import { fetchFromStrapi, getStrapiURL } from "@/lib/api";

/**
 * Obtiene artículos de la API de Strapi, opcionalmente filtrados por categoría.
 * @param categoryName - El nombre de la categoría por la cual filtrar.
 */
export async function getArticles(categoryName?: string): Promise<Article[]> {
  const params: any = {
    sort: { date: 'desc' },
    fields: ["title", "description", "date", "slug"],
    populate: {
      image: { fields: ["url", "formats"] },
      author: { fields: ["name"] },
      category: { fields: ["name", "slug"] },
    },
  };

  if (categoryName) {
    params.filters = {
      category: {
        name: {
          $eq: categoryName,
        },
      },
    };
  }

  try {
    const data = await fetchFromStrapi("articles", params);
    // Asegurarnos de que el slug esté en el nivel superior del objeto
    if (Array.isArray(data)) {
        return data.map(article => ({...article, slug: article.slug || ''}));
    }
    return [];
  } catch (error) {
    console.error("📦 getArticles falló, devolviendo un array vacío para evitar que la página se rompa.");
    return [];
  }
}


/**
 * Obtiene un artículo específico por su ID de Strapi.
 */
export async function getArticleById(id: string): Promise<Article | null> {
  if (!id) return null;
  
  const params = {
    fields: ["title", "description", "date", "slug"],
    populate: {
      image: { fields: ["url"] },
      category: { fields: ["name", "slug"] },
      author: {
        fields: ["name", "bio"],
        populate: { avatar: { fields: ["url"] } },
      },
      content: {
        populate: '*',
      },
    },
  };

  try {
    const data = await fetchFromStrapi(`articles/${id}`, params);
    if (!data) {
      console.log(`No se encontró artículo con el ID: ${id}`);
      return null;
    }
    return data as Article;
  } catch (error) {
    console.error(`📦 getArticleById falló para el ID '${id}', devolviendo null.`);
    return null;
  }
}


/**
 * Obtiene un artículo específico por su slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const params = {
    filters: { slug: { $eq: slug } },
    fields: ["title", "description", "date", "slug"],
    populate: {
      image: { fields: ["url", "formats"] },
      category: { fields: ["name", "slug"] },
      author: { 
        fields: ["name", "bio"],
        populate: { avatar: { fields: ["url"] } } 
      },
      content: { 
        populate: '*'
      },
    },
  };

  try {
    const data = await fetchFromStrapi("articles", params);
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`No se encontró artículo con el slug: ${slug}`);
      return null;
    }
    const article = data[0] as Article;
    
    // Poblar manualmente el content si no viene como se espera
    if (article.id) {
        const fullArticle = await fetchFromStrapi(`articles/${article.id}`, {
            populate: {
                content: { populate: '*' }
            }
        });
        if (fullArticle && fullArticle.content) {
            article.content = fullArticle.content;
        }
    }

    return article;
  } catch (error) {
    console.error(`📦 getArticleBySlug falló para el slug '${slug}', devolviendo null.`);
    return null;
  }
}


// Función para formatear la fecha, útil para la UI
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    // Si la fecha es inválida, intenta añadir T00:00:00
    if (isNaN(date.getTime())) {
      const utcDate = new Date(dateString.split('T')[0] + 'T00:00:00');
       return utcDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: 'UTC',
      });
    }
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: 'UTC', // Asegurar consistencia
    });
  } catch (error) {
    console.error("Error al formatear la fecha:", dateString, error);
    return "Fecha inválida";
  }
}

// Función para calcular el tiempo de lectura estimado
export function calculateReadingTime(content: ArticleContentSection[] | undefined): string {
  if (!content || !Array.isArray(content)) return "5 min";

  let totalWords = 0;
  try {
    content.forEach((section) => {
       if (section.text && Array.isArray(section.text)) {
         section.text.forEach((block: RichTextBlock) => {
           if (block.type === 'paragraph' && Array.isArray(block.children)) {
             block.children.forEach((child) => {
                if (child.type === 'text' && typeof child.text === 'string') {
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
  return `${readingTimeMinutes} min de lectura`;
}

// Obtiene la URL completa del avatar del autor
export const getAuthorAvatarUrl = (avatarData: { url: string } | null | undefined): string | null => {
  if (avatarData && avatarData.url) {
    return getStrapiURL(avatarData.url);
  }
  return null;
};
