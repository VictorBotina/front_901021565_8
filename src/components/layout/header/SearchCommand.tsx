
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

type SearchCommandProps = {
  onSelect?: () => void;
}

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
  Map: <Map className="mr-2 h-4 w-4" />,
  Info: <Info className="mr-2 h-4 w-4" />,
  Building: <Building className="mr-2 h-4 w-4" />,
  Workflow: <Workflow className="mr-2 h-4 w-4" />,
  File: <File className="mr-2 h-4 w-4" />,
};

const suggestionGroups = {
  sugerencias: [ "Inicio", "Portal de Afiliados", "Prestadores"],
  servicios: ["Régimen Subsidiado - General", "Régimen Contributivo", "Blog y Noticias"],
  otros: ["Normatividad", "Colaboradores", "Información Pública"],
};


export function SearchCommand({ onSelect }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState<SearchablePage[]>([]);

  React.useEffect(() => {
    if (!query) {
      setFilteredResults([]);
      return;
    }

    const normalizedQuery = normalizeText(query);

    const results = searchData.filter(page => {
      const normalizedKeywords = normalizeText(page.keywords.join(" "));
      return normalizedKeywords.includes(normalizedQuery);
    });

    setFilteredResults(results);
  }, [query]);

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
          filteredResults.length === 0 ? (
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
          )
        ) : (
          <>
            <CommandGroup heading="Sugerencias">
                {renderGroup(suggestionGroups.sugerencias)}
            </CommandGroup>
            <CommandGroup heading="Servicios">
                {renderGroup(suggestionGroups.servicios)}
            </CommandGroup>
            <CommandGroup heading="Otros">
                {renderGroup(suggestionGroups.otros)}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  )
}
