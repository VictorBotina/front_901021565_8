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
import { File, Home, Users, HeartHandshake, Book, Newspaper } from "lucide-react"

type SearchCommandProps = {
  onSelect?: () => void;
}

// Función para normalizar texto (quitar acentos y a minúsculas)
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const iconMap: { [key: string]: React.ReactElement } = {
  Home: <Home className="mr-2 h-4 w-4" />,
  Users: <Users className="mr-2 h-4 w-4" />,
  HeartHandshake: <HeartHandshake className="mr-2 h-4 w-4" />,
  Book: <Book className="mr-2 h-4 w-4" />,
  Newspaper: <Newspaper className="mr-2 h-4 w-4" />,
  File: <File className="mr-2 h-4 w-4" />,
};

export function SearchCommand({ onSelect }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState<SearchablePage[]>(searchData);

  React.useEffect(() => {
    if (!query) {
      setFilteredResults(searchData);
      return;
    }

    const normalizedQuery = normalizeText(query);

    const results = searchData.filter(page => {
      const normalizedTitle = normalizeText(page.title);
      const normalizedHref = normalizeText(page.href);
      const normalizedKeywords = normalizeText(page.keywords.join(" "));

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedHref.includes(normalizedQuery) ||
        normalizedKeywords.includes(normalizedQuery)
      );
    });

    setFilteredResults(results);
  }, [query]);

  const handleSelect = (href: string) => {
    router.push(href);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <Command shouldFilter={false}>
      <CommandInput 
        placeholder="Busca una página o servicio..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {filteredResults.length === 0 ? (
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        ) : (
          <CommandGroup heading="Resultados">
            {filteredResults.map((page) => (
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
        )}
      </CommandList>
    </Command>
  )
}
