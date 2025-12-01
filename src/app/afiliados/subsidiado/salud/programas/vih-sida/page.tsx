// src/app/afiliados/subsidiado/salud/programas/vih-sida/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa VIH/SIDA | Atención y Acompañamiento',
    description: 'Apoyo integral, tratamiento y acompañamiento para personas viviendo con VIH/SIDA.',
    keywords: ['VIH', 'SIDA', 'programa de salud', 'tratamiento', 'acompañamiento', 'Emssanar EPS'],
};

export default function VihSidaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Programa de Atención Integral para VIH/SIDA</h1>
      <p className="text-lg">
        Ofrecemos un acompañamiento confidencial y completo para pacientes con VIH/SIDA.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
