// src/app/afiliados/subsidiado/canales-de-atencion/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Nuestros Canales", href: "/afiliados/subsidiado/canales-de-atencion" },
  { text: "Oficinas", href: "/afiliados/subsidiado/oficinas" },
];

export default function CanalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Canales de Atención</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
