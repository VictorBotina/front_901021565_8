// src/app/afiliados/subsidiado/salud/programas/maternidad/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Maternidad Segura | Cuidado Gestacional',
    description: 'Acompañamiento integral durante la gestación, parto y postparto para la madre y el recién nacido.',
    keywords: ['maternidad', 'gestación', 'control prenatal', 'parto', 'postparto', 'Emssanar EPS'],
};

export default function MaternidadPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Maternidad Segura</h1>
      <p className="text-lg">
        Cuidamos de ti y de tu bebé en cada etapa de la maternidad.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
