// src/app/afiliados/subsidiado/salud/programas/its/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa ITS | Prevención de Infecciones de Transmisión Sexual',
    description: 'Educación, prevención y acceso a pruebas para Infecciones de Transmisión Sexual (ITS).',
    keywords: ['ITS', 'salud sexual', 'prevención', 'pruebas de ITS', 'Emssanar EPS'],
};

export default function ItsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prevención de Infecciones de Transmisión Sexual</h1>
      <p className="text-lg">
        Información y recursos para una vida sexual saludable y responsable.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
