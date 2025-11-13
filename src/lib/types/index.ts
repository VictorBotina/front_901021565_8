import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type Location = {
  id_dane: string;
  nombre_municipio: string;
  latitud: number;
  longitud: number;
  nombre: string;
  departamento?: string;
};

export type Sublink = {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Types for Blog
export type BlogCategory = {
    id: string;
    name: string;
    href: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    textColor: string;
};

// Este tipo combina la información que necesitamos en el frontend.
// Puede ser un subconjunto del tipo 'Article' más complejo de la API.
export type ArticleSummary = {
    id: number;
    title: string;
    description: string;
    slug: string;
    date: string;
    imageUrl: string;
    category: {
      name: string;
      slug: string;
    };
    author: {
      name: string;
    };
};
