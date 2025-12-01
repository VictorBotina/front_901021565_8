// src/app/afiliados/subsidiado/salud/programas/donacion-organos/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donación de Órganos | Un Acto de Vida',
    description: 'Conoce sobre la importancia de la donación de órganos y cómo puedes manifestar tu voluntad de ser donante.',
    keywords: ['donación de órganos', 'trasplantes', 'ser donante', 'acto de vida', 'Emssanar EPS'],
};

export default function DonacionOrganosPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Donación de Órganos y Tejidos</h1>
      <p className="text-lg">
        Un acto de solidaridad que salva vidas. Infórmate y decide.
      </p>
      {/* El contenido detallado se añadirá aquí */}
    </div>
  );
}
