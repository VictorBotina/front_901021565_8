import Link from "next/link";
import { Logo } from "@/components/logo";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold">Entidad Digital</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Comprometidos con el bienestar de nuestros afiliados y la excelencia de nuestros prestadores.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Afiliados</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Prestadores</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Normatividad</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Transparencia</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Política de Cookies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">Contacto</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Dirección: Calle Falsa 123, Ciudad</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: contacto@entidaddigital.gov.co</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
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
