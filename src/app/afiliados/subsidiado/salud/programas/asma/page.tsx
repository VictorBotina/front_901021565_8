// src/app/afiliados/subsidiado/salud/programas/asma/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa de Asma | Control y Prevención',
    description: 'Herramientas y guías para el control efectivo del asma y la prevención de crisis.',
    keywords: ['asma', 'programa de asma', 'salud respiratoria', 'prevención', 'Emssanar EPS'],
};

export default function AsmaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Control del Asma</h1>
      <p className="text-lg">
        Aprende a manejar tu asma y a vivir una vida plena con nuestro programa de apoyo.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
