import { Apple, BrainCircuit, HeartPulse } from "lucide-react";

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

// src/app/afiliados/subsidiado/cuidado-de-la-salud/page.tsx
export type Sublink = {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
