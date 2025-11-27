// src/lib/navigation-data.ts
export type NavLink = {
  text: string;
  href: string;
  id?: string;
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
    columns: [
        {
            groups: [
                {
                    title: 'Información y Servicios',
                    links: [
                        { id: 'cont-beneficios', text: 'Beneficios del Régimen', href: '#' },
                        { id: 'cont-afil-benef', text: 'Afiliación de Beneficiarios', href: '#' },
                        { id: 'cont-red-urg', text: 'Red de Urgencias', href: '#' },
                        { id: 'cont-copagos', text: 'Copagos y Cuotas Moderadoras', href: '#' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Aportes y Pagos',
                    links: [
                        { id: 'cont-pila', text: 'Portal de Pagos en Línea (PILA)', href: '#' },
                        { id: 'cont-cert-aportes', text: 'Certificado de Aportes', href: '#' },
                        { id: 'cont-incapacidades', text: 'Incapacidades y Licencias', href: '#' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Servicios en Línea',
                    links: [
                        { id: 'cont-citas', text: 'Agendamiento de Citas', href: '#' },
                        { id: 'cont-autorizaciones', text: 'Autorizaciones Médicas', href: '#' },
                        { id: 'cont-lab-results', text: 'Resultados de Laboratorio', href: '#' },
                        { id: 'cont-update-data', text: 'Actualización de Datos', href: '#' },
                    ]
                }
            ]
        }
    ],
    cta: {
        title: 'Portal para Empleadores',
        href: '#',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&q=80',
    }
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
        imageUrl: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=400&h=300&fit=crop&q=80'
    }
  },
];
