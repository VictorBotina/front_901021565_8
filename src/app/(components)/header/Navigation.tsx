"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type NavigationProps = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export function Navigation({ isMobile = false, onLinkClick }: NavigationProps) {
  if (isMobile) {
    return (
      <nav className="grid gap-4 text-lg font-medium">
        <Link href="/afiliados/subsidiado" className="hover:text-primary" onClick={onLinkClick}>
          Régimen Subsidiado
        </Link>
        <Link href="/afiliados/contributivo" className="hover:text-primary" onClick={onLinkClick}>
          Régimen Contributivo
        </Link>
        <Link href="/prestadores" className="hover:text-primary" onClick={onLinkClick}>
          Prestadores
        </Link>
      </nav>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/afiliados/subsidiado" className={navigationMenuTriggerStyle()}>
              Régimen Subsidiado
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/afiliados/contributivo" className={navigationMenuTriggerStyle()}>
              Régimen Contributivo
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/prestadores" className={navigationMenuTriggerStyle()}>
              Prestadores
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
