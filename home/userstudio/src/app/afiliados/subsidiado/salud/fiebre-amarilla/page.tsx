// src/app/afiliados/subsidiado/salud/fiebre-amarilla/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Prevención de Fiebre Amarilla | Vacunación y Zonas de Riesgo',
    description: 'Información sobre la vacuna contra la fiebre amarilla y las zonas de riesgo en Colombia.',
    keywords: ['fiebre amarilla', 'vacunación', 'zonas de riesgo', 'prevención', 'Emssanar EPS'],
};

export default function FiebreAmarillaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prevención de la Fiebre Amarilla</h1>
      <p className="text-lg">
        Infórmate sobre la importancia de la vacunación si vives o viajas a zonas de riesgo.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
