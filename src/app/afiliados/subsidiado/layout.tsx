// src/app/afiliados/subsidiado/layout.tsx
import { MainMenu } from "@/components/layout/subsidiado/MainMenu";

const menuItems = [
  { text: "Inicio Subsidiado", href: "/afiliados/subsidiado", exact: true },
  { text: "Información", href: "/afiliados/subsidiado/informacion" },
  { text: "Trámites", href: "/afiliados/subsidiado/tramites" },
  {
    text: "Cuidado de la Salud",
    href: "/afiliados/subsidiado/cuidado-de-la-salud",
  },
  {
    text: "Canales de Atención",
    href: "/afiliados/subsidiado/canales-de-atencion",
  },
  { text: "Consulta tu IPS", href: "/afiliados/subsidiado/consulta-ips" },
];

export default function SubsidiadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Portal del Régimen Subsidiado
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tu salud y bienestar son nuestra prioridad.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 lg:col-span-2">
          <MainMenu items={menuItems} />
        </aside>
        <main className="md:col-span-9 lg:col-span-10">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
