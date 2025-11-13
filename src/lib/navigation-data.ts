// src/lib/navigation-data.ts
export type NavLink = {
  text: string;
  href: string;
};

export type NavGroup = {
  title: string;
  icon?: string; // Añadido para el ícono
  links: NavLink[];
};

export type NavColumn = {
  groups: NavGroup[];
};

export type NavCTA = {
    title: string;
    href: string;
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
                    icon: 'Info',
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
                    icon: 'FileText',
                    links: [
                        { text: 'Guía de Trámites', href: '/afiliados/subsidiado/tramites/tramites' },
                        { text: 'Afiliación', href: '/afiliados/subsidiado/tramites/afiliacion' },
                        { text: 'Certificados', href: '/afiliados/subsidiado/tramites/certificados' },
                        { text: 'Movilidad', href: '/afiliados/subsidiado/tramites/movilidad' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Cuidado de la salud',
                    icon: 'HeartPulse',
                    links: [
                        { text: 'Programas de Salud', href: '/afiliados/subsidiado/cuidado-de-la-salud' },
                        { text: 'Nutrición y Vida Activa', href: '/afiliados/subsidiado/cuidado-de-la-salud/nutricion' },
                        { text: 'Salud Mental', href: '/afiliados/subsidiado/cuidado-de-la-salud/salud-mental' },
                        { text: 'Programas PyP', href: '#' }, // Placeholder
                    ]
                }
            ]
        }
    ],
    cta: {
        title: 'Conoce nuestros canales de atención',
        href: '/afiliados/subsidiado/informacion/canales-de-atencion',
        imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=400&h=300&fit=crop&q=80',
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
    title: 'Blog y Noticias',
    href: '/blog',
    columns: [
      {
        groups: [
          {
            title: 'Régimen Subsidiado',
            icon: 'Shield',
            links: [
              { text: 'Hábitos y estilos de vida saludables', href: '/blog/subsidiado/habitos-y-estilos-de-vida-saludables' },
              { text: 'Ver todas las noticias', href: '/blog/subsidiado' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Régimen Contributivo',
            icon: 'HandCoins',
            links: [
              { text: 'Ver noticias', href: '/blog/contributivo' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Prestadores',
            icon: 'Stethoscope',
            links: [
              { text: 'Ver noticias', href: '/blog/prestadores' },
            ],
          },
        ],
      },
    ],
    cta: {
        title: 'Comunicados de prensa',
        href: '/blog/comunicados-de-prensa',
        imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=300&fit=crop&q=80'
    }
  },
];
