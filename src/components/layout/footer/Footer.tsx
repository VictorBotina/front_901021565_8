import Link from "next/link";
import { Logo } from "@/components/logo";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import { FooterAccordion } from "./FooterAccordion";

type FooterData = {
  row1: {
    id: number;
    title: string;
    subdivisions: { id: number; title: string; content: string }[];
  };
  row2: {
    id: number;
    title: string;
    subdivisions: { id: number; title: string; description: string; button_text: string; button_link: string }[];
  };
  row3: {
    id: number;
    title: string;
    accordions: { id: number; title: string; links: { id: number; label: string; url: string }[] }[];
  };
  row4: {
    id: number;
    title: string;
    accordions: { id: number; title: string; links: { id: number; label: string; url: string }[] }[];
  };
};

export function Footer() {
  const data: FooterData = {
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

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index} className="block">{line}</span>
    ));
  };
  
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 pb-8 border-b">
          {/* Row 1 */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-title">{data.row1.title}</h3>
            <div className="grid grid-cols-1 gap-8">
              {data.row1.subdivisions.map((item) => (
                <div key={item.id} className="text-sm">
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <div className="text-muted-foreground space-y-1">
                    {renderContent(item.content)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 2 */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-title">{data.row2.title}</h3>
            <div className="grid grid-cols-1 gap-8">
              {data.row2.subdivisions.map((item) => (
                <div key={item.id} className="text-sm">
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  {item.description && <p className="text-muted-foreground mb-4">{item.description}</p>}
                  {item.button_text && item.button_link && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={item.button_link}>{item.button_text}</Link>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 3 */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-title">{data.row3.title}</h3>
            <FooterAccordion accordions={data.row3.accordions} />
          </div>

          {/* Row 4 */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-title">{data.row4.title}</h3>
            <FooterAccordion accordions={data.row4.accordions} />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
          </div>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            © {new Date().getFullYear()} Todos los derechos reservados.
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
