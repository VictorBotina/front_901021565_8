'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Navigation } from './Navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { SearchCommand } from './SearchCommand';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import * as React from 'react';

export function MainNavigation() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <div className="container mx-auto flex h-20 items-center px-4">
      <Link href="/" className="mr-6 flex items-center space-x-2" aria-label="Página de inicio de Entidad Digital">
        <Logo />
        <span className="hidden font-bold sm:inline-block">Entidad Digital</span>
      </Link>
      
      <div className="hidden flex-1 md:flex">
        <Navigation />
      </div>

      <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
        <SearchCommand />
        <ThemeSwitcher />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-8">
              <Navigation isMobile={true} onLinkClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
