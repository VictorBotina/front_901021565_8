import Link from "next/link";
import { Logo } from "@/components/logo";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { fetchFromStrapi } from "@/lib/api";
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

export async function Footer() {
  const footerContainer = await fetchFromStrapi('home', {
    populate: {
      footer: { 
        populate: {
          row1: { populate: { subdivisions: true } },
          row2: { populate: { subdivisions: true } },
          row3: { populate: { accordions: { populate: 'links' } } },
          row4: { populate: { accordions: { populate: 'links' } } }
        }
      },
    },
  });

  const data = footerContainer?.footer;

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
