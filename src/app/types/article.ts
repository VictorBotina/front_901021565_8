// src/app/types/article.ts

// Formatos de imagen, como thumbnail, small, etc.
export interface ArticleImageFormat {
  url: string;
  width: number;
  height: number;
}

// Representa la imagen principal de un artículo con sus diferentes formatos
export interface ArticleImage {
  id: number;
  url: string;
  formats?: {
    thumbnail?: ArticleImageFormat;
    small?: ArticleImageFormat;
    medium?: ArticleImageFormat;
    large?: ArticleImageFormat;
  };
}

// Representa al autor de un artículo
export interface ArticleAuthor {
  id: number;
  name: string;
  avatar?: {
    url: string;
  } | null;
}

// Representa la categoría de un artículo
export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

// Representa un bloque de texto enriquecido del contenido
export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list';
  children: {
    text: string;
    type: 'text';
    bold?: boolean;
    italic?: boolean;
  }[];
}

// Representa el contenido dinámico del artículo (mapeado desde la nueva API)
export interface ArticleContentSection {
  id: number;
  title_seccion?: string | null;
  text: RichTextBlock[];
  media_url?: string | null;
}


// Estructura completa de un artículo desde la API
export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string; // Mantener como string, se formatea en el frontend
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stade?: string;
  image?: ArticleImage;
  category?: ArticleCategory;
  author?: ArticleAuthor;
  content?: ArticleContentSection[];
}
