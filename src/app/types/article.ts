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
  };
}

// Representa la categoría de un artículo
export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

// Representa el contenido dinámico del artículo
export type DynamicZoneContent = 
  | { __component: 'shared.rich-text'; id: number; body: string; }
  | { __component: 'shared.media'; id: number; file: ArticleImage; }
  | { __component: 'shared.quote'; id: number; quote: string; author: string; }
  | { __component: 'shared.slider'; id: number; files: ArticleImage[]; };

// Estructura completa de un artículo desde la API
export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string; // Mantener como string, se formatea en el frontend
  image?: ArticleImage;
  category?: ArticleCategory;
  author?: ArticleAuthor;
  content?: DynamicZoneContent[];
}
