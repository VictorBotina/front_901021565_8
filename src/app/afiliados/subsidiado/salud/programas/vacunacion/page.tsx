// src/app/afiliados/subsidiado/salud/programas/vacunacion/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Vacunación | Esquemas y Jornadas',
    description: 'Información sobre el Programa Ampliado de Inmunizaciones (PAI), esquemas de vacunación y jornadas especiales.',
    keywords: ['vacunación', 'PAI', 'esquema de vacunación', 'jornadas de vacunación', 'inmunización', 'Emssanar EPS'],
};

export default function VacunacionPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa Ampliado de Inmunizaciones (PAI)</h1>
      <p className="text-lg">
        Consulta los esquemas de vacunación para todas las edades y nuestras jornadas de salud.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
