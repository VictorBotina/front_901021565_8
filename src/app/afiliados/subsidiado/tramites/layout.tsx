// src/app/afiliados/subsidiado/tramites/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Guía de Trámites", href: "/afiliados/subsidiado/tramites" },
  { text: "Afiliación", href: "/afiliados/subsidiado/afiliacion" },
  { text: "Certificados", href: "/afiliados/subsidiado/certificados" },
  { text: "Movilidad", href: "/afiliados/subsidiado/movilidad" },
];

export default function TramitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6 sr-only">Trámites</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
