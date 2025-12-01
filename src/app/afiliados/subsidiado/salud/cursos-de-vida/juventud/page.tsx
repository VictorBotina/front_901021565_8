import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Juventud (18-28 años) | Vida Adulta Temprana',
  description: 'Programas de prevención de ITS, planificación familiar, salud mental y promoción de estilos de vida saludables para jóvenes de 18 a 28 años.',
  keywords: ['salud juvenil', 'prevención de ITS', 'planificación familiar', 'salud mental jóvenes', 'estilo de vida saludable', 'adulto joven'],
};

export default function JuventudPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salud en la Juventud (18 a 28 años)</h1>
      <p className="text-lg">
        Acompañándote en la transición a la vida adulta con programas de prevención y bienestar.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
