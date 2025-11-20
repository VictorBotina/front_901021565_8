
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
} from "@/components/ui/command"
import { searchData, type SearchablePage } from "@/lib/search-data"
import { File, Home, Users, HeartHandshake, Book, Newspaper, Map, Info, Building, Workflow } from "lucide-react"
import Fuse from "fuse.js"

type SearchCommandProps = {
  onSelect?: () => void;
}

const iconMap: { [key: string]: React.ReactElement } = {
  Home: <Home className="mr-2 h-4 w-4" />,
  Users: <Users className="mr-2 h-4 w-4" />,
  HeartHandshake: <HeartHandshake className="mr-2 h-4 w-4" />,
  Book: <Book className="mr-2 h-4 w-4" />,
  Newspaper: <Newspaper className="mr-2 h-4 w-4" />,
  Map: <Map className="mr-2 h-4 w-4" />,
  Info: <Info className="mr-2 h-4 w-4" />,
  Building: <Building className="mr-2 h-4 w-4" />,
  Workflow: <Workflow className="mr-2 h-4 w-4" />,
  File: <File className="mr-2 h-4 w-4" />,
};

const suggestionGroups: Record<string, string[]> = {
  Sugerencias: [ "Inicio", "Afiliados", "Prestadores", "Nosotros"],
  Servicios: ["Régimen Subsidiado", "Régimen Contributivo", "Blog y Noticias"],
  Otros: ["Normatividad", "Colaboradores", "Información Pública"],
};

const fuseOptions = {
  includeScore: true,
  keys: ["title", "keywords"],
  threshold: 0.3,
};

export function SearchCommand({ onSelect }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const fuse = new Fuse(searchData, fuseOptions);

  const results = query ? fuse.search(query).map(result => result.item) : [];

  const handleSelect = (href: string) => {
    router.push(href);
    if (onSelect) {
      onSelect();
    }
  };
  
  const renderGroup = (titles: string[]) => {
    return titles
      .map(title => searchData.find(page => page.title === title))
      .filter((page): page is SearchablePage => !!page)
      .map(page => (
        <CommandItem
          key={page.href}
          onSelect={() => handleSelect(page.href)}
          value={page.title}
        >
          {iconMap[page.icon] || <File className="mr-2 h-4 w-4" />}
          <span>{page.title}</span>
        </CommandItem>
      ));
  };


  return (
    <Command shouldFilter={false}>
      <CommandInput 
        placeholder="Busca una página o servicio..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {query ? (
          results.length === 0 ? (
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          ) : (
            <CommandGroup heading="Resultados">
              {results.map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => handleSelect(page.href)}
                  value={page.title}
                >
                  {iconMap[page.icon] || <File className="mr-2 h-4 w-4" />}
                  <span>{page.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )
        ) : (
          <>
            {Object.entries(suggestionGroups).map(([groupName, groupItems]) => (
               <CommandGroup key={groupName} heading={groupName}>
                {renderGroup(groupItems)}
              </CommandGroup>
            ))}
          </>
        )}
      </CommandList>
    </Command>
  )
}
