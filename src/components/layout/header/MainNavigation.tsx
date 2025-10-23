'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Navigation } from './Navigation';
import { SearchCommand } from './SearchCommand';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import * as React from 'react';
import { AccessibilityMenu } from './AccessibilityMenu';
import { TopMenu } from './TopMenu';

export function MainNavigation() {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
      <TopMenu />
      <div className="container mx-auto flex h-20 items-center px-4">
        <Link href="/" className="flex items-center space-x-2" aria-label="Página de inicio de Entidad Digital">
          <Logo />
          <span className="hidden font-bold sm:inline-block">Entidad Digital</span>
        </Link>
        
        <div className="flex-1 justify-center hidden md:flex">
          <Navigation />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <SearchCommand />
          <AccessibilityMenu />
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
    </>
  );
}
