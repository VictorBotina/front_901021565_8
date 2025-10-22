"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Contrast, ZoomIn, ZoomOut, Settings, Palette, TextCursorInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const FONT_SIZES = [90, 100, 110, 120];
const DEFAULT_FONT_SIZE = 100;

export function AccessibilityMenu() {
  const { theme, setTheme } = useTheme();
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(DEFAULT_FONT_SIZE);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const storedContrast = localStorage.getItem("high-contrast") === "true";
    setIsHighContrast(storedContrast);
    document.documentElement.dataset.contrast = storedContrast ? "high" : "default";

    const storedFontSize = parseInt(localStorage.getItem("font-size") || "100", 10);
    setFontSize(storedFontSize);
    document.documentElement.style.fontSize = `${storedFontSize}%`;
  }, []);

  const toggleContrast = () => {
    const newContrastState = !isHighContrast;
    setIsHighContrast(newContrastState);
    localStorage.setItem("high-contrast", String(newContrastState));
    document.documentElement.dataset.contrast = newContrastState ? "high" : "default";
  };
  
  const changeFontSize = (direction: "increase" | "decrease") => {
    const currentIndex = FONT_SIZES.indexOf(fontSize);
    let newIndex = currentIndex;
    if (direction === "increase" && currentIndex < FONT_SIZES.length - 1) {
        newIndex++;
    } else if (direction === "decrease" && currentIndex > 0) {
        newIndex--;
    }
    const newSize = FONT_SIZES[newIndex];
    setFontSize(newSize);
    localStorage.setItem("font-size", String(newSize));
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Abrir menú de accesibilidad</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Accesibilidad</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Accesibilidad</h4>
            <p className="text-sm text-muted-foreground">
              Personaliza la apariencia del sitio.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Modo Oscuro</span>
              </Label>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Cambiar tema"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span>Alto Contraste</span>
              </Label>
              <Switch
                id="high-contrast"
                checked={isHighContrast}
                onCheckedChange={toggleContrast}
                aria-label="Activar modo de alto contraste"
              />
            </div>
            <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                    <TextCursorInput className="h-4 w-4" />
                    <span>Tamaño de Fuente</span>
                </Label>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => changeFontSize('decrease')} disabled={fontSize === FONT_SIZES[0]}>
                    <ZoomOut className="h-5 w-5"/>
                    <span className="sr-only">Disminuir tamaño de fuente</span>
                </Button>
                <span className="w-8 text-center text-sm">{fontSize}%</span>
                <Button variant="ghost" size="icon" onClick={() => changeFontSize('increase')} disabled={fontSize === FONT_SIZES[FONT_SIZES.length - 1]}>
                    <ZoomIn className="h-5 w-5"/>
                    <span className="sr-only">Aumentar tamaño de fuente</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
