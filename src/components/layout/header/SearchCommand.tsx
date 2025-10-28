"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { File, Home, Users, HeartHandshake, Book, Newspaper } from "lucide-react"

type SearchCommandProps = {
  onSelect?: () => void;
}

export function SearchCommand({ onSelect }: SearchCommandProps) {
  const router = useRouter();

  const commandGroups = [
    {
      heading: "Sugerencias",
      items: [
        { href: "/", text: "Inicio", icon: <Home className="mr-2 h-4 w-4" /> },
        { href: "/afiliados", text: "Afiliados", icon: <Users className="mr-2 h-4 w-4" /> },
        { href: "/prestadores", text: "Prestadores", icon: <HeartHandshake className="mr-2 h-4 w-4" /> },
        { href: "/nosotros", text: "Nosotros", icon: <Book className="mr-2 h-4 w-4" /> },
      ],
    },
    {
      heading: "Servicios",
      items: [
        { href: "/afiliados/subsidiado", text: "Régimen Subsidiado", icon: <File className="mr-2 h-4 w-4" /> },
        { href: "/afiliados/contributivo", text: "Régimen Contributivo", icon: <File className="mr-2 h-4 w-4" /> },
        { href: "/blog", text: "Blog", icon: <Newspaper className="mr-2 h-4 w-4" /> },
      ],
    },
    {
      heading: "Otros",
      items: [
        { href: "/normatividad", text: "Normatividad", icon: <File className="mr-2 h-4 w-4" /> },
        { href: "/colaboradores", text: "Colaboradores", icon: <Users className="mr-2 h-4 w-4" /> },
      ]
    }
  ];

  const handleSelect = (href: string) => {
    router.push(href);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <Command>
      <CommandInput placeholder="Escribe un comando o busca..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        {commandGroups.map((group) => (
          <React.Fragment key={group.heading}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => handleSelect(item.href)}
                  value={item.text}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </React.Fragment>
        ))}
      </CommandList>
    </Command>
  )
}