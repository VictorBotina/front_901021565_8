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
        <Link href="#" className="hover:text-primary" onClick={onLinkClick}>
          Prestadores
        </Link>
        <div className="grid gap-2">
            <p className="font-semibold">Afiliados</p>
            {afiliadosItems.map(item => (
                <Link key={item.title} href={item.href} className="pl-4 text-base text-muted-foreground hover:text-primary" onClick={onLinkClick}>
                    {item.title}
                </Link>
            ))}
        </div>
      </nav>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Afiliados</NavigationMenuTrigger>
          <NavigationMenuContent>
            <motion.ul 
              className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {afiliadosItems.map((item) => (
                <motion.li key={item.title} variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}>
                  <ListItem href={item.href} title={item.title}>
                    {item.description}
                  </ListItem>
                </motion.li>
              ))}
            </motion.ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/prestadores" passHref>
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
