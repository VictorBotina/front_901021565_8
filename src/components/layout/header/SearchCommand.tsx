"use client"

import * as React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function SearchCommand() {
  return (
    <Command>
      <CommandInput placeholder="Escribe un comando o busca..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading="Sugerencias">
          <CommandItem>Afiliados</CommandItem>
          <CommandItem>Prestadores</CommandItem>
          <CommandItem>Transparencia</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Servicios">
          <CommandItem>Régimen Subsidiado</CommandItem>
          <CommandItem>Régimen Contributivo</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
