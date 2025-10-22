"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/types"

const afiliadosItems: NavItem[] = [
  {
    title: "Régimen Subsidiado",
    href: "/afiliados/subsidiado",
    description: "Información y servicios para afiliados al régimen subsidiado.",
  },
  {
    title: "Régimen Contributivo",
    href: "/afiliados/contributivo",
    description: "Información y servicios para afiliados al régimen contributivo.",
  },
]

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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
