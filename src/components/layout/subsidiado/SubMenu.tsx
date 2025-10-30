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
    <div className="border-b">
      <nav className="-mb-px flex gap-6 px-6" aria-label="Tabs">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700"
              )}
            >
              {item.text}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
