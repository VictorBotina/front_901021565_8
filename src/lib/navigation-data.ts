// src/lib/navigation-data.ts
import { PlaceHolderImages } from "./placeholder-images";

export type NavLink = {
  text: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavColumn = {
  groups: NavGroup[];
};

export type NavCTA = {
    title: string;
    description: string;
    href: string;
    buttonText: string;
    imageUrl: string;
}

export type NavItem = {
  id: string;
  title: string;
  href?: string;
  columns?: NavColumn[];
  cta?: NavCTA;
};

export const navigationItems: NavItem[] = [
  {
    id: 'subsidiado',
    title: 'Régimen Subsidiado',
    href: '/afiliados/subsidiado',
    columns: [
        {
            groups: [
                {
                    title: 'Información',
                    links: [
                        { text: 'Información General', href: '/afiliados/subsidiado/informacion' },
                        { text: 'Oficinas de atención', href: '/afiliados/subsidiado/informacion/oficinas' },
                        { text: 'Consulta de IPS', href: '/afiliados/subsidiado/informacion/consulta-ips' },
                        { text: 'Plan de beneficios', href: '/afiliados/subsidiado/informacion/plan-de-beneficios' },
                        { text: 'Derechos y deberes', href: '/afiliados/subsidiado/informacion/derechos-y-deberes' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Trámites',
                    links: [
                        { text: 'Guía de Trámites', href: '/afiliados/subsidiado/tramites' },
                        { text: 'Afiliación', href: '/afiliados/subsidiado/afiliacion' },
                        { text: 'Certificados', href: '/afiliados/subsidiado/certificados' },
                        { text: 'Movilidad', href: '/afiliados/subsidiado/movilidad' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Cuidado de la salud',
                    links: [
                        { text: 'Programas de Salud', href: '/afiliados/subsidiado/cuidado-de-la-salud' },
                        { text: 'Nutrición y Vida Activa', href: '/afiliados/subsidiado/nutricion' },
                        { text: 'Salud Mental', href: '/afiliados/subsidiado/salud-mental' },
                        { text: 'Programas PyP', href: '#' }, // Placeholder
                    ]
                }
            ]
        }
    ],
    cta: {
        title: 'Canales de Atención',
        description: 'Encuentra la oficina, línea telefónica o chat que necesitas para resolver tus inquietudes.',
        href: '/afiliados/subsidiado/informacion/canales-de-atencion',
        buttonText: 'Ir a Canales de Atención',
        imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=100&h=100&fit=crop&q=80',
    }
  },
  {
    id: 'contributivo',
    title: 'Régimen Contributivo',
    href: '/afiliados/contributivo',
    // Aquí podrías agregar la estructura de columnas para este menú si la tuviera
  },
  {
    id: 'prestadores',
    title: 'Prestadores',
    href: '/prestadores',
  },
  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
  },
];
