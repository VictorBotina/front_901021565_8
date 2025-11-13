// src/app/blog/data.ts
import { Shield, HandCoins, Stethoscope, Megaphone } from "lucide-react";
import type { BlogCategory, Article } from "@/lib/types";

// Definición de Categorías
// Esto se puede mantener estático o también podría venir de una API si las categorías cambian.
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
