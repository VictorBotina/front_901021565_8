"use client"

import * as React from "react"
import { Contrast } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAccessibility } from "./AccessibilityMenu"

export function ContrastSwitcher() {
  const { isHighContrast, toggleContrast, isMounted } = useAccessibility()
  
  if (!isMounted) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleContrast}
            aria-label="Activar modo de alto contraste"
            data-active={isHighContrast}
            className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
          >
            <Contrast className="h-6 w-6" />
            <span className="sr-only">Alto Contraste</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Alto Contraste</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
