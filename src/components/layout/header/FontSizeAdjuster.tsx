"use client"

import * as React from "react"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAccessibility } from "./AccessibilityMenu"

export function FontSizeAdjuster() {
  const { changeFontSize, isMinFont, isMaxFont, isMounted } = useAccessibility();
  
  if (!isMounted) return null;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => changeFontSize('decrease')} disabled={isMinFont}>
                <ZoomOut className="h-6 w-6"/>
                <span className="sr-only">Disminuir tamaño de fuente</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Disminuir Fuente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => changeFontSize('increase')} disabled={isMaxFont}>
                <ZoomIn className="h-6 w-6"/>
                <span className="sr-only">Aumentar tamaño de fuente</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Aumentar Fuente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
