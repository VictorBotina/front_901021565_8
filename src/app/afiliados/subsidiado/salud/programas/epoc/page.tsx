// src/app/afiliados/subsidiado/salud/programas/epoc/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de EPOC | Salud Respiratoria',
    description: 'Manejo y cuidado integral para pacientes con Enfermedad Pulmonar Obstructiva Crónica (EPOC).',
    keywords: ['EPOC', 'salud respiratoria', 'enfermedad pulmonar', 'cuidado integral', 'Emssanar EPS'],
};

export default function EpocPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Salud Respiratoria: EPOC</h1>
      <p className="text-lg">
        Recursos y acompañamiento para mejorar la calidad de vida de pacientes con EPOC.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
