// src/app/afiliados/subsidiado/cuidado-de-la-salud/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Programas de Salud", href: "/afiliados/subsidiado/cuidado-de-la-salud" },
  { text: "Nutrición y Vida Activa", href: "/afiliados/subsidiado/nutricion" },
  { text: "Salud Mental", href: "/afiliados/subsidiado/salud-mental" },
];

export default function CuidadoSaludLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Cuidado de la Salud</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
