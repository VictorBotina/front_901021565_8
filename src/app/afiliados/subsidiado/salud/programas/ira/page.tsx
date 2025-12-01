// src/app/afiliados/subsidiado/salud/programas/ira/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Programa IRA | Prevención de Infección Respiratoria Aguda',
    description: 'Medidas de prevención y manejo de la Infección Respiratoria Aguda (IRA), especialmente en poblaciones vulnerables.',
    keywords: ['IRA', 'infección respiratoria aguda', 'prevención', 'salud pulmonar', 'Emssanar EPS'],
};

export default function IraPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Prevención de Infección Respiratoria Aguda (IRA)</h1>
      <p className="text-lg">
        Infórmate sobre cómo prevenir las infecciones respiratorias y cuándo buscar atención médica.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
