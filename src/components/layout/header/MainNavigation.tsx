
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Info, FileText, HeartPulse, Shield, HandCoins, Stethoscope } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import * as React from 'react';
import { TopMenu } from './TopMenu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SearchCommand } from './SearchCommand';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ContrastSwitcher } from './ContrastSwitcher';
import { FontSizeControl } from './FontSizeControl';
import { navigationItems } from '@/lib/navigation-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const iconComponents: { [key: string]: React.ElementType } = {
  Info,
  FileText,
  HeartPulse,
  Shield,
  HandCoins,
  Stethoscope,
};

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
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Página de inicio de Entidad Digital" onClick={() => setActiveMenu(null)}>
              <Logo />
              <span className="hidden font-bold sm:inline-block">Entidad Digital</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 md:ml-6 md:flex">
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
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
              <DialogTrigger asChild>
                <Button>Accesos rapidos</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                  <DialogHeader>
                      <DialogTitle>Accesos Rápidos y Búsqueda</DialogTitle>
                      <DialogDescription>
                          Navega rápidamente a la sección que necesites o utiliza el buscador para encontrar cualquier página del sitio.
                      </DialogDescription>
                  </DialogHeader>
                <SearchCommand onSelect={() => setSearchDialogOpen(false)} />
              </DialogContent>
            </Dialog>
            
            <div className="hidden md:flex items-center">
              <ThemeSwitcher />
              <ContrastSwitcher />
              <FontSizeControl />
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm p-0">
                  <SheetHeader className="p-6 pb-0">
                    <SheetTitle>Menú Principal</SheetTitle>
                  </SheetHeader>
                <div className="h-full overflow-y-auto p-6">
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
                  </Accordion>
                   <div className="mt-8 border-t pt-6">
                    <h3 className="mb-4 text-lg font-medium">Accesibilidad</h3>
                     <div className="flex items-center justify-around rounded-lg border p-2">
                        <ThemeSwitcher />
                        <ContrastSwitcher />
                        <FontSizeControl />
                     </div>
                   </div>
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
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {activeMenuItem.columns?.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col space-y-4">
                    {column.groups.map(group => {
                      const Icon = group.icon ? iconComponents[group.icon] : null;
                      return (
                      <div key={group.title}>
                          <h3 className="font-bold text-lg mb-3 text-title flex items-center gap-2">
                           {Icon && <Icon className="h-5 w-5" />}
                           {group.title}
                          </h3>
                        <nav className="flex flex-col space-y-2">
                          {group.links.map(link => (
                             <Link key={link.href} href={link.href} onClick={() => setActiveMenu(null)} className="text-muted-foreground hover:text-primary hover:underline underline-offset-4">
                               {link.text}
                             </Link>
                          ))}
                        </nav>
                      </div>
                      );
                    })}
                  </div>
                ))}

                {activeMenuItem.cta && (
                  <div className="md:col-span-1">
                     <Link href={activeMenuItem.cta.href} onClick={() => setActiveMenu(null)} className="group relative block h-full w-full overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                      <Image 
                        src={activeMenuItem.cta.imageUrl} 
                        alt={activeMenuItem.cta.title} 
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h4 className="text-md font-bold text-white transition-colors group-hover:text-primary-foreground">
                          {activeMenuItem.cta.title}
                        </h4>
                      </div>
                    </Link>
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
