// src/app/types/article.ts

// Formatos de imagen, como thumbnail, small, etc.
export interface ArticleImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

// Representa la imagen principal de un artículo con sus diferentes formatos
export interface ArticleImage {
  id: number;
  documentId: string; // Este campo puede no estar presente, lo hacemos opcional
  url: string;
  formats: {
    thumbnail?: ArticleImageFormat;
    small?: ArticleImageFormat;
    medium?: ArticleImageFormat;
    large?: ArticleImageFormat;
  };
}

// Representa el avatar del autor
export interface AuthorAvatar {
  id: number;
  url: string;
}

// Representa al autor de un artículo
export interface ArticleAuthor {
  id: number;
  documentId: string; // Opcional
  name: string;
  avatar: AuthorAvatar;
}

// Representa la categoría de un artículo
export interface ArticleCategory {
  id: number;
  name: string;
  slug?: string; // El slug es útil para las URLs amigables
  description?: string | null;
}

// Representa la estructura del contenido de texto enriquecido de Strapi
export interface ContentText {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

// Representa una sección de contenido dentro de un artículo
export interface ArticleContent {
  id: number;
  title_seccion: string | null;
  text: ContentText[];
  media_url: string | null;
}

// Representa la estructura completa de un artículo desde la API
export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  date: string; // Mantener como string, se formatea en el frontend
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  stade: string; // "stade" parece un typo, podría ser "state" o "status"
  description_image: string | null;
  slug: string; // Slug generado para la URL
  image: ArticleImage;
  content: ArticleContent[];
  author: ArticleAuthor;
  category: ArticleCategory;
}

// Representa la respuesta de la API para una lista de artículos
export interface ApiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Representa la respuesta de la API para un único artículo
export interface ApiSingleResponse<T> {
  data: T;
  meta: {};
}
