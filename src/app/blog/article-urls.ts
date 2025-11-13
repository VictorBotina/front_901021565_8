// src/app/blog/article-urls.ts

// Este mapa asocia el título de un artículo con su URL estática en el sitio.
// Esto desacopla la generación de URLs de la API de Strapi y asegura que los
// enlaces siempre apunten a la ruta de archivo correcta.

const articleUrlMap: { [key: string]: string } = {
    "Hábitos y estilos de vida saludables: La Clave para un bienestar integral": "/blog/subsidiado/articulo-1",
    "Artículo de Prueba para Régimen Contributivo": "/blog/contributivo/articulo-1",
    "Artículo de Prueba para Prestadores": "/blog/prestadores/articulo-1",
    "Comunicado de Prensa de Prueba": "/blog/comunicados-de-prensa/articulo-1",
    // Agrega aquí más artículos a medida que los crees
};

/**
 * Obtiene la URL de un artículo basada en su título.
 * @param title El título del artículo.
 * @param fallback La URL de respaldo si no se encuentra el artículo.
 * @returns La URL del artículo o la URL de respaldo.
 */
export const getArticleUrlByTitle = (title: string, fallback: string = "/blog"): string => {
    return articleUrlMap[title] || fallback;
};
