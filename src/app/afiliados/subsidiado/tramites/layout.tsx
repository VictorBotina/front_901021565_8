// src/app/afiliados/subsidiado/tramites/layout.tsx
import { SubMenu } from "@/components/layout/subsidiado/SubMenu";

const menuItems = [
  { text: "Guía de Trámites", href: "/afiliados/subsidiado/tramites" },
  { text: "Afiliación", href: "/afiliados/subsidiado/tramites/afiliacion" },
  { text: "Certificados", href: "/afiliados/subsidiado/tramites/certificados" },
  { text: "Movilidad", href: "/afiliados/subsidiado/tramites/movilidad" },
];

export default function TramitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 px-6">Trámites</h3>
      <SubMenu items={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
