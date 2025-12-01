import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atención a la Gestante | Cuidado Integral del Embarazo',
  description: 'Descubre los programas de atención a la gestante, garantizando controles prenatales, detección de riesgos y acompañamiento para un embarazo seguro.',
  keywords: ['atención gestante', 'control prenatal', 'embarazo seguro', 'salud materna', 'riesgos en el embarazo', 'RIAS mujer gestante'],
};

export default function GestacionPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cuidado Integral de la Gestante</h1>
      <p className="text-lg">
        Información y recursos para la etapa de gestación, enfocados en el bienestar de la madre y el bebé.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
