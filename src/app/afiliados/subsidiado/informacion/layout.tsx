// src/app/afiliados/subsidiado/(informacion)/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Información General", href: "/afiliados/subsidiado/informacion" },
  { text: "Derechos y Deberes", href: "/afiliados/subsidiado/informacion/derechos-y-deberes"},
  { text: "Plan de Beneficios", href: "/afiliados/subsidiado/informacion/plan-de-beneficios"},
  { text: "Oficinas de Atención", href: "/afiliados/subsidiado/informacion/oficinas"},
  { text: "Consulta tu IPS", href: "/afiliados/subsidiado/informacion/consulta-ips" },
];

export default function InformacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Información</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
