import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cuidado del Recién Nacido | Salud y Bienestar del Bebé',
  description: 'Todo sobre la atención inmediata al nacer, tamizajes obligatorios, vacunación inicial y la vigilancia de riesgos neonatales para tu bebé.',
  keywords: ['cuidado recién nacido', 'salud del bebé', 'tamizaje neonatal', 'vacunación inicial', 'riesgos neonatales', 'RIAS recién nacido'],
};

export default function RecienNacidoPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cuidado Integral del Recién Nacido</h1>
      <p className="text-lg">
        Programas y guías para asegurar la salud y el bienestar de tu bebé desde el primer día.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
