// src/app/afiliados/subsidiado/salud/programas/artritis/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Artritis | Cuidado y Acompañamiento',
    description: 'Información y recursos de nuestro programa de acompañamiento para pacientes con artritis.',
    keywords: ['artritis', 'programa de salud', 'cuidado integral', 'Emssanar EPS'],
};

export default function ArtritisPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Cuidado para la Artritis</h1>
      <p className="text-lg">
        Encuentra aquí información, recursos y apoyo para el manejo de la artritis.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
