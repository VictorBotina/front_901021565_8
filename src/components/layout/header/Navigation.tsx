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
  const commonProps = {
    className: "hover:text-primary",
    onClick: onLinkClick,
  };

  const links = [
    { href: "/afiliados", text: "Afiliados" },
    { href: "/prestadores", text: "Prestadores" },
    { href: "/blog", text: "Blog" },
  ];

  if (isMobile) {
    return (
      <nav className="grid gap-4 text-lg font-medium">
        {links.map((link) => (
          <Link key={link.href} href={link.href} {...commonProps}>
            {link.text}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
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
  )
}
