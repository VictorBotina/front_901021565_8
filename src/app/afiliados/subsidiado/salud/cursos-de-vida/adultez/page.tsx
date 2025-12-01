import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Adultez (29-59 años) | Prevención y Bienestar',
  description: 'Programas de seguimiento de enfermedades crónicas, salud laboral, salud sexual y detección temprana de cáncer para adultos de 29 a 59 años.',
  keywords: ['salud adultos', 'enfermedades crónicas', 'salud laboral', 'prevención de cáncer', 'hipertensión', 'diabetes'],
};

export default function AdultezPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salud y Bienestar en la Adultez (29 a 59 años)</h1>
      <p className="text-lg">
        Programas de prevención y cuidado para mantener tu calidad de vida en la etapa adulta.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
