// src/app/blog/data.ts
// Se importa LucideIcon para usarlo en la interfaz
import { Shield, HandCoins, Stethoscope, Megaphone, CalendarDays, type LucideIcon } from "lucide-react";

// AJUSTE: Se define una interfaz local que describe la estructura de los datos de CATEGORIES.
// Esto soluciona el conflicto de tipos que causaba el error de build.
export interface BlogCategory {
  id: string;
  name: string;
  href: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}

// Definición de Categorías
// No se necesita la importación de tipos externa, ya que ahora usamos la interfaz local.
export const CATEGORIES: BlogCategory[] = [
  {
    id: "subsidiado",
    name: "Subsidiado",
    href: "/blog/subsidiado",
    description: "Novedades y guías para afiliados del Régimen Subsidiado.",
    icon: Shield,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    textColor: "#1d4ed8",
  },
  {
    id: "contributivo",
    name: "Contributivo",
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
    color: "#0A31A6",
    bgColor: "rgba(99, 102, 241, 0.1)",
    textColor: "#4338ca",
  },
  {
    id: "eventos",
    name: "Eventos",
    href: "/blog/eventos",
    description: "Participa en nuestras jornadas de salud, eventos y actividades.",
    icon: CalendarDays,
    color: "#25C7D9",
    bgColor: "rgba(37, 199, 217, 0.1)",
    textColor: "#0e7490",
  }
];
