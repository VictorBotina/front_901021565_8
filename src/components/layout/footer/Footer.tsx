import Link from "next/link";
import { Logo } from "@/components/logo";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { FooterRow1, type FooterRow1Data } from "./FooterRow1";
import { FooterRow2, type FooterRow2Data } from "./FooterRow2";
import { FooterRow3, type FooterRow3Data } from "./FooterRow3";
import { FooterRow4, type FooterRow4Data } from "./FooterRow4";

export type FooterProps = {
  data?: {
    row1?: FooterRow1Data;
    row2?: FooterRow2Data;
    row3?: FooterRow3Data;
    row4?: FooterRow4Data;
  }
}

export function Footer() {
  const data = {
    row1: {
      id: 1,
      title: "Líneas de atención al usuario",
      subdivisions: [
        { id: 1, title: "Régimen subsidiado", content: "Línea nacional: 018000 93 04 22\nWhatsApp y línea usuarios: +57 300 912 6625\nLínea para viruela símica y COVID: +57 300 912 6639" },
        { id: 2, title: "Régimen contributivo", content: "Línea nacional: 018000 93 04 22\nLínea de atención afiliados: +57 300 912 6625 opc. 1 - 3\nLínea de atención empleadores: +57 300 912 6625 opc. 2" },
      ],
    },
    row2: {
      id: 2,
      title: "Puntos de atención al usuario",
      subdivisions: [
        { id: 1, title: "Directorio oficinas Emssanar", description: "Nariño, Putumayo, Valle del Cauca y Cauca", button_text: "Consultar directorio", button_link: "#" },
        { id: 2, title: "Redes y prestadores de salud", description: "Microredes de salud y canales de citas red de prestadores", button_text: "Ampliar información", button_link: "#" },
        { id: 3, title: "Oficinas administrativas", description: "", button_text: "Nariño - Valle del Cauca", button_link: "#" },
      ],
    },
    row3: {
      id: 3,
      title: "Gestión administrativa",
      accordions: [
        { id: 1, title: "Acerca de", links: [{ id: 1, label: "Quiénes somos", url: "#" }, { id: 2, label: "Gobierno corporativo", url: "#" }] },
        { id: 2, title: "Contratación", links: [{ id: 1, label: "Manual de contratación", url: "#" }] },
        { id: 3, title: "Normatividad", links: [{ id: 1, label: "Ver normatividad", url: "#" }] },
        { id: 4, title: "Transparencia", links: [{ id: 1, label: "Ver sección", url: "#" }] },
        { id: 5, title: "Prensa", links: [{ id: 1, label: "Noticias", url: "#" }] },
        { id: 6, title: "Servicio al ciudadano", links: [{ id: 1, label: "Canales de atención", url: "#" }] },
      ],
    },
    row4: {
      id: 4,
      title: "Otros enlaces de interés",
      accordions: [
        { id: 1, title: "Portal de pagos", links: [{ id: 1, label: "Pagar en línea", url: "#" }] },
        { id: 2, title: "Trabaja con nosotros", links: [{ id: 1, label: "Ver ofertas", url: "#" }] },
        { id: 3, title: "Informes", links: [{ id: 1, label: "Ver informes", url: "#" }] },
        { id: 4, title: "Mapa del sitio", links: [{ id: 1, label: "Navegar mapa", url: "#" }] },
      ],
    }
  };

  if (!data) {
    return (
      <footer className="border-t bg-secondary/40">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">No se pudo cargar la información del pie de página.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t bg-secondary/40">
      <div className="container mx-auto px-4 py-8">
        
        {data.row1 && <FooterRow1 data={data.row1} />}
        {data.row2 && <FooterRow2 data={data.row2} />}
        {data.row3 && <FooterRow3 data={data.row3} />}
        {data.row4 && <FooterRow4 data={data.row4} />}

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <div className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold">Entidad Digital</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            © {new Date().getFullYear()} Entidad Digital. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
              <LinkedinIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
              <InstagramIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}