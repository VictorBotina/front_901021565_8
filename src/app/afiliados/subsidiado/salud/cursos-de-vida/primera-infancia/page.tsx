import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Primera Infancia (0-5 años) | Desarrollo Infantil',
  description: 'Programas de promoción del desarrollo, vacunación, control de crecimiento y neurodesarrollo para niños de 0 a 5 años.',
  keywords: ['primera infancia', 'desarrollo infantil', 'vacunación niños', 'control de crecimiento', 'salud infantil', 'neurodesarrollo'],
};

export default function PrimeraInfanciaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salud en la Primera Infancia (0 a 5 años)</h1>
      <p className="text-lg">
        Fomentando un crecimiento y desarrollo saludables en los primeros años de vida.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
