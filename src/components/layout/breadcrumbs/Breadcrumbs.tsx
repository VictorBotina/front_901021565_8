'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Head from 'next/head';

/**
 * ## Cómo personalizar los nombres de las migas de pan
 *
 * Para cambiar el texto que se muestra para un segmento de ruta específico,
 * simplemente agrega una entrada al objeto `pathNameMapping`.
 *
 * @example
 * // Para cambiar 'afiliados' a 'Portal de Afiliados'
 * const pathNameMapping: { [key: string]: string } = {
 *   'afiliados': 'Portal de Afiliados',
 *   'informacion-general': 'Información General',
 *   // Agrega más mapeos aquí
 * };
 */
const pathNameMapping: { [key: string]: string } = {
  afiliados: 'Afiliados',
  subsidiado: 'Régimen Subsidiado',
  contributivo: 'Régimen Contributivo',
  prestadores: 'Prestadores',
  blog: 'Blog y Noticias',
  nosotros: 'Nosotros',
  colaboradores: 'Colaboradores',
  normatividad: 'Normatividad',
  'tramites-en-linea': 'Trámites en Línea',
  canales: 'Canales de Atención',
  'informacion-general': 'Información General',
  programas: 'Programas Especiales',
  tramites: 'Trámites',
  test: 'Test de Animaciones',
};

// Función para capitalizar la primera letra de un string
const capitalize = (s: string) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Función para transformar un segmento de URL en un nombre legible
const formatCrumb = (crumb: string) => {
  if (pathNameMapping[crumb]) {
    return pathNameMapping[crumb];
  }
  return capitalize(crumb.replace(/-/g, ' '));
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Array<{ href: string; label: string }>>([]);

  React.useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/').filter(segment => segment);
      const generatedBreadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return {
          href,
          label: formatCrumb(segment),
        };
      });
      setBreadcrumbs([{ href: '/', label: 'Inicio' }, ...generatedBreadcrumbs]);
    }
  }, [pathname]);

  // No renderizar si no estamos en una página anidada
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  // Generar el JSON-LD para datos estructurados
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://your-website.com${crumb.href}`, // Reemplaza con tu dominio
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <nav aria-label="breadcrumb" className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={crumb.href}>
                <li>
                  {isLast ? (
                    <span className="font-medium text-foreground" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-primary hover:underline">
                      {crumb.label}
                    </Link>
                  )}
                </li>
                {!isLast && (
                  <li>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
