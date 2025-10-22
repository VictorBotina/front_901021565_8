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
          <Link href="/afiliados/subsidiado" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Régimen Subsidiado
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/afiliados/contributivo" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Régimen Contributivo
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/prestadores" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Prestadores
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
