// src/app/blog/data.ts
import { Shield, HandCoins, Stethoscope, Megaphone } from "lucide-react";
import type { BlogCategory, Article } from "@/lib/types";

// Definición de Categorías
export const CATEGORIES: BlogCategory[] = [
  {
    id: "subsidiado",
    name: "Régimen Subsidiado",
    href: "/blog/subsidiado",
    description: "Novedades y guías para afiliados del Régimen Subsidiado.",
    icon: Shield,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    textColor: "#1d4ed8",
  },
  {
    id: "contributivo",
    name: "Régimen Contributivo",
    href: "/blog/contributivo",
    description: "Información para trabajadores, independientes y sus familias.",
    icon: HandCoins,
    color: "#16a34a",
    bgColor: "rgba(22, 163, 74, 0.1)",
    textColor: "#14532d",
  },
  {
    id: "prestadores",
    name: "Prestadores",
    href: "/blog/prestadores",
    description: "Actualizaciones y guías para nuestra red de prestadores.",
    icon: Stethoscope,
    color: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.1)",
    textColor: "#b45309",
  },
  {
    id: "comunicados",
    name: "Comunicados de Prensa",
    href: "/blog/comunicados-de-prensa",
    description: "Anuncios oficiales y noticias corporativas de la entidad.",
    icon: Megaphone,
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
    textColor: "#4338ca",
  },
];

// Helper para encontrar categoría por ID
const getCategory = (id: string) => CATEGORIES.find(c => c.id === id)!;

// Artículos de prueba
export const allArticles: Article[] = [
  {
    title: "Artículo de Prueba para Régimen Subsidiado",
    description: "Este es un artículo de ejemplo para la categoría del régimen subsidiado. Explora los beneficios y últimas actualizaciones para nuestros afiliados.",
    href: "/blog/subsidiado/articulo-1",
    author: "Equipo Editorial",
    date: new Date("2024-07-28"),
    category: getCategory("subsidiado"),
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    title: "Novedades en Aportes para el Régimen Contributivo",
    description: "Un resumen de los cambios recientes en la normativa de aportes y cómo afectan a los trabajadores independientes.",
    href: "/blog/contributivo/articulo-1",
    author: "Finanzas Hoy",
    date: new Date("2024-07-27"),
    category: getCategory("contributivo"),
    imageUrl: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=800&q=80",
  },
  {
    title: "Nuevo Portal para Prestadores: Más Ágil y Eficiente",
    description: "Presentamos la nueva plataforma para la gestión de convenios, facturación y autorizaciones de manera digital.",
    href: "/blog/prestadores/articulo-1",
    author: "Equipo de Tecnología",
    date: new Date("2024-07-26"),
    category: getCategory("prestadores"),
    imageUrl: "https://images.unsplash.com/photo-1584515933487-759821d27167?w=800&q=80",
  },
  {
    title: "Comunicado Oficial: Ampliación de Cobertura en Nuevas Zonas",
    description: "Informamos a la opinión pública sobre la expansión de nuestros servicios a 15 nuevos municipios del país.",
    href: "/blog/comunicados-de-prensa/articulo-1",
    author: "Comunicaciones",
    date: new Date("2024-07-25"),
    category: getCategory("comunicados"),
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
];

    