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
