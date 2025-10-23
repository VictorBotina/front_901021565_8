"use client";

import * as React from "react";
import { Contrast, TextCursorInput, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AccessibilityIcon } from "@/components/icons/AccessibilityIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ContrastSwitcher } from "./ContrastSwitcher";
import { FontSizeAdjuster } from "./FontSizeAdjuster";

const FONT_SIZES = [90, 100, 110, 120];
const DEFAULT_FONT_SIZE = 100;

export function useAccessibility() {
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(DEFAULT_FONT_SIZE);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const storedContrast = localStorage.getItem("high-contrast") === "true";
    setIsHighContrast(storedContrast);
    if (document.documentElement.dataset) {
        document.documentElement.dataset.contrast = storedContrast ? "high" : "default";
    }


    const storedFontSize = parseInt(localStorage.getItem("font-size") || "100", 10);
    setFontSize(storedFontSize);
    document.documentElement.style.fontSize = `${storedFontSize}%`;
  }, []);

  const toggleContrast = () => {
    const newContrastState = !isHighContrast;
    setIsHighContrast(newContrastState);
    localStorage.setItem("high-contrast", String(newContrastState));
    if (document.documentElement.dataset) {
      document.documentElement.dataset.contrast = newContrastState ? "high" : "default";
    }
  };
  
  const changeFontSize = (direction: "increase" | "decrease") => {
    setFontSize(currentSize => {
      const currentIndex = FONT_SIZES.indexOf(currentSize);
      let newIndex = currentIndex;
      if (direction === "increase" && currentIndex < FONT_SIZES.length - 1) {
          newIndex++;
      } else if (direction === "decrease" && currentIndex > 0) {
          newIndex--;
      }
      const newSize = FONT_SIZES[newIndex];
      localStorage.setItem("font-size", String(newSize));
      document.documentElement.style.fontSize = `${newSize}%`;
      return newSize;
    });
  };

  const isMinFont = fontSize <= FONT_SIZES[0];
  const isMaxFont = fontSize >= FONT_SIZES[FONT_SIZES.length - 1];

  return { isMounted, isHighContrast, toggleContrast, fontSize, changeFontSize, isMinFont, isMaxFont };
}

export function AccessibilityMenu() {
  const { isMounted } = useAccessibility();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <ThemeSwitcher />
      <ContrastSwitcher />
      <FontSizeAdjuster />
    </div>
  );
}
