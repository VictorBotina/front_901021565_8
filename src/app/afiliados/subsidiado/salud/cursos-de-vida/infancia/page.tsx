import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Infancia (6-11 años) | Bienestar Escolar',
  description: 'Programas de salud escolar, nutrición, actividad física y detección temprana de problemas de aprendizaje y salud mental para niños de 6 a 11 años.',
  keywords: ['salud infantil', 'bienestar escolar', 'nutrición infantil', 'actividad física niños', 'salud mental infantil', 'aprendizaje y salud'],
};

export default function InfanciaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salud en la Infancia (6 a 11 años)</h1>
      <p className="text-lg">
        Acompañamiento en la etapa escolar para un desarrollo físico y mental pleno.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
