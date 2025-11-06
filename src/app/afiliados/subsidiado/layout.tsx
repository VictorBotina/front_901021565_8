// src/app/afiliados/subsidiado/layout.tsx

export default function SubsidiadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Régimen Subsidiado
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tu salud y bienestar son nuestra prioridad.
        </p>
      </header>
      <main>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
