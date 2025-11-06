// src/components/layout/subsidiado/SubMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MenuItem = {
  text: string;
  href: string;
};

type SubMenuProps = {
  items: MenuItem[];
};

export function SubMenu({ items }: SubMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <ul className="flex items-center -mb-px space-x-6 text-sm font-medium">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 py-3 border-b-2 transition-colors duration-200",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
