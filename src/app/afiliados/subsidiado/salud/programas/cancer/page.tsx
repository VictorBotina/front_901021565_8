// src/app/afiliados/subsidiado/salud/programas/cancer/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Cáncer | Detección y Tratamiento',
    description: 'Acompañamiento integral en la detección temprana, diagnóstico y tratamiento del cáncer.',
    keywords: ['cáncer', 'programa oncológico', 'detección temprana', 'tratamiento', 'Emssanar EPS'],
};

export default function CancerPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Lucha contra el Cáncer</h1>
      <p className="text-lg">
        Apoyo integral para pacientes oncológicos y sus familias, desde la prevención hasta el tratamiento.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
