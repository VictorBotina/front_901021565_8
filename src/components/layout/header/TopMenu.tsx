import Link from 'next/link';

export function TopMenu() {
  return (
    <div className="hidden bg-muted/50 text-sm md:block">
      <div className="container mx-auto flex h-10 items-center justify-end px-4">
        <div className="flex items-center space-x-6 font-medium text-muted-foreground">
          <Link href="/nosotros" className="transition-colors hover:text-primary">
            Nosotros
          </Link>
          <Link href="/colaboradores" className="transition-colors hover:text-primary">
            Colaboradores
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Normatividad
          </Link>
          <Link href="#" className="transition-colors hover:text-primary">
            Transparencia y Acceso a La Información Pública
          </Link>
        </div>
      </div>
    </div>
  );
}
