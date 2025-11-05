// src/components/layout/subsidiado/MainMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MenuItem = {
  text: string;
  href: string;
  exact?: boolean;
};

type MainMenuProps = {
  items: MenuItem[];
};

export function MainMenu({ items }: MainMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-md px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
}
