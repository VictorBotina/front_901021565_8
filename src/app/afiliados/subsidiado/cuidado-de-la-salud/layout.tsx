// src/app/afiliados/subsidiado/cuidado-de-la-salud/layout.tsx

export default function CuidadoSaludLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Cuidado de la Salud</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
