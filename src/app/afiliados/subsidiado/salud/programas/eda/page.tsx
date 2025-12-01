// src/app/afiliados/subsidiado/salud/programas/eda/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa EDA | Prevención de Enfermedad Diarreica Aguda',
    description: 'Medidas de prevención y manejo de la Enfermedad Diarreica Aguda (EDA), especialmente en niños.',
    keywords: ['EDA', 'enfermedad diarreica aguda', 'prevención', 'salud infantil', 'Emssanar EPS'],
};

export default function EdaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prevención de Enfermedad Diarreica Aguda (EDA)</h1>
      <p className="text-lg">
        Consejos y guías para prevenir y manejar la EDA en casa.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
