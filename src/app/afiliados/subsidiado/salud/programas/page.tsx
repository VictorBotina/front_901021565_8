// src/app/afiliados/subsidiado/salud/programas/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programas de Cuidado de la Salud | Emssanar EPS',
    description: 'Descubre nuestros programas de promoción, prevención y gestión de riesgos en salud diseñados para tu bienestar.',
    keywords: ['programas de salud', 'prevención', 'gestión de riesgo', 'promoción de la salud', 'Emssanar EPS'],
};

export default function ProgramasSaludLandingPage() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Programas de Cuidado de la Salud</h1>
        <p className="text-lg">
          Descubre cómo te acompañamos con programas de promoción, prevención y bienestar para cada necesidad.
        </p>
        {/* Aquí se listarán los diferentes programas de salud. */}
      </div>
    );
  }
  