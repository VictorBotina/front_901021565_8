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
  navigationMenuTriggerStyle,
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
                   <Link href={link.href} passHref>
                    <NavigationMenuLink asChild>
                      <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                        {link.text}
                      </NavigationMenuTrigger>
                    </NavigationMenuLink>
                  </Link>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <ListItem
                          key={index}
                          href={link.href}
                          title={`${link.text} ${index + 1}`}
                        >
                           <div className="relative aspect-square w-full overflow-hidden rounded-md">
                            <Image
                              src="/images/sign/main-menu/hola.png"
                              alt={`Imagen para ${link.text} ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </ListItem>
                      ))}
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
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
