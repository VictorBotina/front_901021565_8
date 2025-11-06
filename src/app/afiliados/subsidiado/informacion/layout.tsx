// src/app/afiliados/subsidiado/(informacion)/layout.tsx

export default function InformacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Información</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
