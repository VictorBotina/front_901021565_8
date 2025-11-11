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

export type Article = {
    title: string;
    description: string;
    href: string;
    author: string;
    date: Date;
    category: BlogCategory;
    imageUrl: string;
};

    