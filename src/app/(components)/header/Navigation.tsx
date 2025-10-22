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
        <Link href="/prestadores" className="hover:text-primary" onClick={onLinkClick}>
          Prestadores
        </Link>
        <Link href="/afiliados/subsidiado" className="hover:text-primary" onClick={onLinkClick}>
          Régimen Subsidiado
        </Link>
        <Link href="/afiliados/contributivo" className="hover:text-primary" onClick={onLinkClick}>
          Régimen Contributivo
        </Link>
      </nav>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/afiliados/subsidiado" passHref legacyBehavior>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link href="/afiliados/subsidiado">Régimen Subsidiado</Link>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/afiliados/contributivo" passHref legacyBehavior>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link href="/afiliados/contributivo">Régimen Contributivo</Link>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/prestadores" passHref legacyBehavior>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link href="/prestadores">Prestadores</Link>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
