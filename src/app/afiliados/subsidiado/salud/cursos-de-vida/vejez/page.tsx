import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salud en la Vejez (60+ años) | Cuidado Integral del Adulto Mayor',
  description: 'Atención integral al adulto mayor, prevención de dependencia, control de enfermedades crónicas, rehabilitación y cuidados paliativos.',
  keywords: ['salud adulto mayor', 'cuidado en la vejez', 'prevención de dependencia', 'enfermedades crónicas en la vejez', 'rehabilitación geriátrica', 'cuidados paliativos'],
};

export default function VejezPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cuidado Integral en la Vejez (60 años o más)</h1>
      <p className="text-lg">
        Programas y servicios para un envejecimiento activo, saludable y digno.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
