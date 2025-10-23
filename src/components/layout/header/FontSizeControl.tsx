"use client"

import * as React from "react"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const FONT_STEPS = [80, 90, 100, 110, 120, 130, 140, 150];
const DEFAULT_FONT_PERCENT = 100;
const LOCAL_STORAGE_KEY = "font-size-preference";

export function FontSizeControl() {
  const [fontSize, setFontSize] = React.useState(DEFAULT_FONT_PERCENT);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const storedSize = localStorage.getItem(LOCAL_STORAGE_KEY);
    const initialSize = storedSize ? parseInt(storedSize, 10) : DEFAULT_FONT_PERCENT;
    if (document.documentElement && FONT_STEPS.includes(initialSize)) {
      setFontSize(initialSize);
      document.documentElement.style.fontSize = `${initialSize}%`;
    }
  }, []);

  const adjustFont = (direction: "increase" | "decrease") => {
    setFontSize(currentSize => {
      const currentIndex = FONT_STEPS.indexOf(currentSize);
      let newIndex = currentIndex;

      if (direction === "increase" && currentIndex < FONT_STEPS.length - 1) {
        newIndex++;
      } else if (direction === "decrease" && currentIndex > 0) {
        newIndex--;
      }
      
      const newSize = FONT_STEPS[newIndex];
      localStorage.setItem(LOCAL_STORAGE_KEY, String(newSize));
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  const isMinFont = fontSize <= FONT_STEPS[0];
  const isMaxFont = fontSize >= FONT_STEPS[FONT_STEPS.length - 1];

  if (!isMounted) {
    return (
      <>
        <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
      </>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => adjustFont('decrease')} 
              disabled={isMinFont}
              aria-label="Disminuir tamaño de fuente"
              className="h-10 w-10"
            >
              <ZoomOut className="h-6 w-6" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Disminuir Fuente (A-)</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => adjustFont('increase')} 
              disabled={isMaxFont}
              aria-label="Aumentar tamaño de fuente"
              className="h-10 w-10"
            >
              <ZoomIn className="h-6 w-6" aria-hidden="true"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Aumentar Fuente (A+)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
