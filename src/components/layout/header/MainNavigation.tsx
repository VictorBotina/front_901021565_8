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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNavigation() {
  const [open, setOpen] = React.useState(false);

  const navigationLinks = [
    { href: "/nosotros", text: "Nosotros" },
    { href: "/colaboradores", text: "Colaboradores" },
    { href: "/afiliados/subsidiado", text: "Régimen Subsidiado" },
    { href: "/afiliados/contributivo", text: "Régimen Contributivo" },
    { href: "/prestadores", text: "Prestadores" },
    { href: "/blog", text: "Blog" },
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
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={navigationMenuTriggerStyle()}>
                      {link.text}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1 md:flex-none">
          <Dialog>
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
              <SearchCommand />
            </DialogContent>
          </Dialog>
          
          <ThemeSwitcher />
          <ContrastSwitcher />
          <FontSizeControl />

          <Sheet open={open} onOpenChange={setOpen}>
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
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-primary">
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
