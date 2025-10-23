import Link from 'next/link';

export function TopMenu() {
  return (
    <div className="hidden bg-title text-sm md:block">
      <div className="container mx-auto flex h-10 items-center justify-end px-4">
        <div className="flex items-center space-x-6 font-medium text-primary-foreground/90">
          <Link href="/nosotros" className="transition-colors hover:text-primary-foreground">
            Nosotros
          </Link>
          <Link href="/colaboradores" className="transition-colors hover:text-primary-foreground">
            Colaboradores
          </Link>
          <Link href="/normatividad" className="transition-colors hover:text-primary-foreground">
            Normatividad
          </Link>
          <Link href="#" className="transition-colors hover:text-primary-foreground">
            Transparencia y Acceso a La Información Pública
          </Link>
        </div>
      </div>
    </div>
  );
}
