'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import * as React from 'react';
import { TopMenu } from './TopMenu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchCommand } from './SearchCommand';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ContrastSwitcher } from './ContrastSwitcher';
import { FontSizeControl } from './FontSizeControl';
import { navigationItems, type NavItem } from '@/lib/navigation-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const handleMenuClick = (itemId: string) => {
    setActiveMenu(prev => (prev === itemId ? null : itemId));
  };
  
  const activeMenuItem = navigationItems.find(item => item.id === activeMenu);

  return (
    <>
      <TopMenu />
      <div className="relative">
        <div className="container mx-auto flex h-20 items-center px-4">
          <Link href="/" className="flex items-center space-x-2" aria-label="Página de inicio de Entidad Digital" onClick={() => setActiveMenu(null)}>
            <Logo />
            <span className="hidden font-bold sm:inline-block">Entidad Digital</span>
          </Link>
          
          <div className="flex-1 justify-center hidden md:flex">
             <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button 
                  key={item.id}
                  variant={activeMenu === item.id ? "secondary" : "ghost"}
                  onClick={() => handleMenuClick(item.id)}
                  aria-expanded={activeMenu === item.id}
                  aria-controls={`megamenu-${item.id}`}
                  className="px-4 py-2 text-sm font-medium"
                >
                  {item.title}
                </Button>
              ))}
                <Link href="/nosotros" className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  Nosotros
                </Link>
             </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-1 md:flex-none">
            <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
              <DialogTrigger asChild>
                <Button className="ml-4">Accesos rapidos</Button>
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
              <SheetContent side="left" className="w-full max-w-sm">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                  </SheetHeader>
                <div className="mt-8">
                   <Accordion type="multiple" className="w-full">
                    {navigationItems.map(item => (
                      item.columns ? (
                        <AccordionItem value={item.id} key={item.id}>
                          <AccordionTrigger className="text-lg font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent>
                            <nav className="flex flex-col space-y-2 pl-4">
                              {item.columns?.map(col => col.groups.map(group => (
                                <React.Fragment key={group.title}>
                                  <h4 className="pt-2 text-base font-semibold">{group.title}</h4>
                                  {group.links.map(link => (
                                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-muted-foreground hover:text-primary">
                                      {link.text}
                                    </Link>
                                  ))}
                                </React.Fragment>
                              )))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link key={item.id} href={item.href || '#'} onClick={() => setMobileMenuOpen(false)} className="block border-b py-4 text-lg font-medium hover:text-primary">
                          {item.title}
                        </Link>
                      )
                    ))}
                     <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className="block border-b py-4 text-lg font-medium hover:text-primary">
                      Nosotros
                    </Link>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <AnimatePresence>
        {activeMenu && activeMenuItem && (
          <motion.div
            id={`megamenu-${activeMenuItem.id}`}
            className="absolute top-full left-0 w-full bg-background shadow-lg border-t"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {activeMenuItem.columns?.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col space-y-4">
                    {column.groups.map(group => (
                      <div key={group.title}>
                        <h3 className="font-bold text-lg mb-3 text-title">{group.title}</h3>
                        <nav className="flex flex-col space-y-2">
                          {group.links.map(link => (
                             <Link key={link.href} href={link.href} onClick={() => setActiveMenu(null)} className="text-muted-foreground hover:text-primary hover:underline underline-offset-4">
                               {link.text}
                             </Link>
                          ))}
                        </nav>
                      </div>
                    ))}
                  </div>
                ))}

                {activeMenuItem.cta && (
                   <div className="md:col-span-1 bg-muted/50 p-6 rounded-lg flex flex-col justify-center items-center text-center">
                    <Image src={activeMenuItem.cta.imageUrl} alt={activeMenuItem.cta.title} width={80} height={80} className="mb-4 rounded-full" />
                     <h4 className="font-bold mb-2">{activeMenuItem.cta.title}</h4>
                     <p className="text-sm text-muted-foreground mb-4">{activeMenuItem.cta.description}</p>
                     <Button asChild>
                       <Link href={activeMenuItem.cta.href} onClick={() => setActiveMenu(null)}>{activeMenuItem.cta.buttonText}</Link>
                     </Button>
                   </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center pb-4">
               <Button variant="ghost" onClick={() => setActiveMenu(null)} aria-label="Cerrar menú">
                <X className="h-5 w-5 mr-2"/>
                Cerrar
              </Button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
}
