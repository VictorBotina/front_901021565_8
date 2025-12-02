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
  title:string;
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
                        { id: 'sub-info-general', text: 'Información General', href: '/afiliados/subsidiado/informacion' },
                        { id: 'sub-info-oficinas', text: 'Oficinas de atención', href: '/afiliados/subsidiado/informacion/oficinas' },
                        { id: 'sub-info-ips', text: 'Consulta de IPS', href: '/afiliados/subsidiado/informacion/consulta-ips' },
                        { id: 'sub-info-plan', text: 'Plan de beneficios', href: '/afiliados/subsidiado/informacion/plan-de-beneficios' },
                        { id: 'sub-info-derechos', text: 'Derechos y deberes', href: '/afiliados/subsidiado/informacion/derechos-y-deberes' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Trámites',
                    links: [
                        { id: 'sub-tramites-guia', text: 'Guía de Trámites', href: '/afiliados/subsidiado/tramites' },
                        { id: 'sub-tramites-afiliacion', text: 'Afiliación', href: '/afiliados/subsidiado/tramites/afiliacion' },
                        { id: 'sub-tramites-certificados', text: 'Certificados', href: '/afiliados/subsidiado/tramites/certificado-afiliacion' },
                        { id: 'sub-tramites-movilidad', text: 'Movilidad', href: '/afiliados/subsidiado/tramites/movilidad' },
                    ]
                }
            ]
        },
        {
            groups: [
                {
                    title: 'Cuidado de la salud',
                    links: [
                        { id: 'sub-salud-programas', text: 'Programas de Salud', href: '/afiliados/subsidiado/salud/programas' },
                        { id: 'sub-salud-nutricion', text: 'Nutrición y Vida Activa', href: '/afiliados/subsidiado/salud/programas/nutricion' },
                        { id: 'sub-salud-mental', text: 'Salud Mental', href: '/afiliados/subsidiado/salud/programas/salud-mental' },
                        { id: 'sub-salud-pyp', text: 'Cursos de vida', href: '/afiliados/subsidiado/salud' },
                    ]
                }
            ]
        }
    ],
    cta: {
        title: 'Noticias y novedades del Régimen Subsidiado',
        href: '/blog/subsidiado',
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
        title: 'Noticias y novedades Régimen contributivo',
        href: '/blog/contributivo',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop&q=80',
    }
  },
  {
    id: 'prestadores',
    title: 'Prestadores',
    href: '/prestadores',
    columns: [
      {
        groups: [
          {
            title: 'Información y Contratación',
            links: [
              { id: 'prest-manuales', text: 'Manuales y Guías', href: '#' },
              { id: 'prest-contratacion', text: 'Proceso de Contratación', href: '#' },
              { id: 'prest-politicas', text: 'Políticas de Calidad', href: '#' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Portales y Servicios',
            links: [
              { id: 'prest-portal', text: 'Portal de Autorizaciones', href: '#' },
              { id: 'prest-facturacion', text: 'Radicación de Facturas', href: '#' },
              { id: 'prest-pagos', text: 'Consulta de Pagos', href: '#' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Recursos',
            links: [
              { id: 'prest-directorio', text: 'Directorio Médico', href: '#' },
              { id: 'prest-capacitacion', text: 'Capacitaciones', href: '#' },
              { id: 'prest-normativa', text: 'Normativa Aplicable', href: '#' },
            ],
          },
        ],
      },
    ],
    cta: {
      title: 'Noticias y Novedades para Prestadores',
      href: '/blog/prestadores',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&q=80',
    },
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
              { id: 'blog-sub-1', text: 'Hábitos y estilos de vida saludables', href: '/blog/subsidiado/habitos-y-estilos-de-vida-saludables' },
              { id: 'blog-sub-2', text: 'Ver todas las noticias', href: '/blog/subsidiado' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Régimen Contributivo',
            links: [
              { id: 'blog-cont-1', text: 'Ver noticias', href: '/blog/contributivo' },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: 'Prestadores',
            links: [
              { id: 'blog-prest-1', text: 'Ver noticias', href: '/blog/prestadores' },
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
