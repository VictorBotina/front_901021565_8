// src/app/afiliados/subsidiado/salud/programas/dengue/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Prevención del Dengue | Cuidado y Alertas',
    description: 'Información sobre la prevención del dengue, síntomas de alarma y acciones comunitarias.',
    keywords: ['dengue', 'prevención', 'zancudos', 'salud pública', 'Emssanar EPS'],
};

export default function DenguePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prevención y Manejo del Dengue</h1>
      <p className="text-lg">
        Aprende a identificar los síntomas y a eliminar los criaderos del mosquito transmisor.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
