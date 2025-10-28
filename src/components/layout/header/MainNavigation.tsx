'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import * as React from 'react';
import { TopMenu } from './TopMenu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchCommand } from './SearchCommand';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ContrastSwitcher } from './ContrastSwitcher';
import { FontSizeControl } from './FontSizeControl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);

  const navigationLinks = [
    { href: "/afiliados/subsidiado", text: "Régimen Subsidiado", description: "Accede a servicios de salud de calidad sin costo." },
    { href: "/afiliados/contributivo", text: "Régimen Contributivo", description: "Cobertura completa para ti y tus beneficiarios." },
    { href: "/prestadores", text: "Prestadores", description: "Gestiona convenios, facturación y autorizaciones." },
    { href: "/blog", text: "Blog", description: "Mantente al día con nuestras últimas noticias y artículos." },
  ];
  
  return (
    <>
      <TopMenu />
      <div className="container mx-auto flex h-20 items-center px-4">
        <Link href="/" className="flex items-center space-x-2" aria-label="Página de inicio de Entidad Digital">
          <Logo />
          <span className="hidden font-bold sm:inline-block">Entidad Digital</span>
        </Link>
        
        <div className="flex-1 justify-center hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuTrigger>{link.text}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <ListItem href={link.href} title={link.text}>
                        <div className='flex flex-col justify-center items-center space-y-2'>
                          <Image src="/images/sign/main-menu/hola.png" alt={`Imagen para ${link.text}`} width={100} height={100} />
                          <span className='text-sm text-center text-muted-foreground'>{link.description}</span>
                        </div>
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1 md:flex-none">
          <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Accesos rapidos</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Accesos Rápidos</DialogTitle>
                    <DialogDescription>
                        Navega rápidamente a la sección que necesites o utiliza el buscador.
                    </DialogDescription>
                </DialogHeader>
              <SearchCommand onSelect={() => setSearchDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <ThemeSwitcher />
          <ContrastSwitcher />
          <FontSizeControl />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                </SheetHeader>
              <div className="mt-8">
                <nav className="grid gap-4 text-lg font-medium">
                  {navigationLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
