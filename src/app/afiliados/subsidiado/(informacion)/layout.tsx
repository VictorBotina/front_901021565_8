// src/app/afiliados/subsidiado/(informacion)/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Información General", href: "/afiliados/subsidiado/informacion" },
  { text: "Derechos y Deberes", href: "/afiliados/subsidiado/derechos-y-deberes"},
  { text: "Plan de Beneficios", href: "/afiliados/subsidiado/plan-de-beneficios"},
];

export default function InformacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6">Información</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
