// src/app/afiliados/subsidiado/(tramites)/layout.tsx

export default function TramitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Trámites</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
