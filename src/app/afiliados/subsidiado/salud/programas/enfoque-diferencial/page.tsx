// src/app/afiliados/subsidiado/salud/programas/enfoque-diferencial/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Enfoque Diferencial | Salud Inclusiva',
    description: 'Atención en salud con enfoque diferencial para comunidades étnicas, víctimas y personas con discapacidad.',
    keywords: ['enfoque diferencial', 'salud inclusiva', 'comunidades étnicas', 'víctimas', 'discapacidad', 'Emssanar EPS'],
};

export default function EnfoqueDiferencialPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Enfoque Diferencial</h1>
      <p className="text-lg">
        Garantizamos una atención en salud pertinente y respetuosa con la diversidad de nuestra población.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
