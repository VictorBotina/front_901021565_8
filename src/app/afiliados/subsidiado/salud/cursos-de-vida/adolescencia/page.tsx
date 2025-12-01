import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Adolescencia (12-17 años) | Cuidado Integral',
  description: 'Programas de salud sexual y reproductiva, prevención de consumo de sustancias, salud mental y acompañamiento en riesgos psicosociales para adolescentes.',
  keywords: ['salud adolescente', 'salud sexual y reproductiva', 'prevención de adicciones', 'salud mental adolescentes', 'riesgos psicosociales'],
};

export default function AdolescenciaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salud Integral en la Adolescencia (12 a 17 años)</h1>
      <p className="text-lg">
        Apoyo y recursos para una adolescencia saludable, segura y bien informada.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
