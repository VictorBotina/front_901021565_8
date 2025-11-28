// src/components/ui/popup.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePopup, type PopupData } from '@/hooks/use-popup';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';


type InfoPopupProps = {
  popupId: string;
  variant?: 'modal' | 'slide' | 'corner';
  slidePosition?: 'left' | 'right';
  persist?: boolean;
} & Partial<PopupData>;


const renderModal = (popupData: PopupData, handleTriggerClose: () => void) => (
  <AlertDialog open onOpenChange={(open) => !open && handleTriggerClose()}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{popupData.title}</AlertDialogTitle>
        <AlertDialogDescription asChild>
           <div className="flex flex-col gap-4 pt-2">
            {popupData.imageUrl && (
              <div className="relative w-full aspect-video rounded-md overflow-hidden my-2">
                <Image src={popupData.imageUrl} alt={popupData.title} fill className="object-cover" />
              </div>
            )}
            <div>{popupData.description}</div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleTriggerClose}>Cerrar</AlertDialogCancel>
        {popupData.buttonText && popupData.buttonUrl && (
          <AlertDialogAction asChild>
            <Link href={popupData.buttonUrl}>{popupData.buttonText}</Link>
          </AlertDialogAction>
        )}
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const renderSlide = (popupData: PopupData, handleTriggerClose: () => void, slidePosition: 'left' | 'right') => (
  <Sheet open onOpenChange={(open) => !open && handleTriggerClose()}>
    <SheetContent side={slidePosition} className="w-full max-w-md p-0 flex flex-col">
      <SheetHeader className="p-6 pb-2">
        <SheetTitle>{popupData.title}</SheetTitle>
      </SheetHeader>
      <div className="flex-grow overflow-y-auto px-6 space-y-4">
        {popupData.imageUrl && (
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image src={popupData.imageUrl} alt={popupData.title} fill className="object-cover" />
          </div>
        )}
        <p className="text-sm text-muted-foreground">{popupData.description}</p>
      </div>
      <SheetFooter className="p-6 bg-background border-t gap-2">
        {popupData.buttonText && popupData.buttonUrl && (
            <Button asChild className="w-full">
                <Link href={popupData.buttonUrl}>{popupData.buttonText}</Link>
            </Button>
        )}
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full" onClick={handleTriggerClose}>
            Cerrar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

const renderCorner = (popupData: PopupData, handleTriggerClose: () => void, position: 'left' | 'right') => (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -100 : 100, y: 100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "fixed bottom-4 z-50 w-full max-w-sm",
        position === 'left' ? 'left-4' : 'right-4'
      )}
    >
      <Card className="shadow-2xl">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-base">{popupData.title}</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleTriggerClose}>
                  <X className="h-4 w-4"/>
                  <span className="sr-only">Cerrar</span>
              </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3 text-sm">
          {popupData.imageUrl && (
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <Image src={popupData.imageUrl} alt={popupData.title} fill className="object-cover" />
              </div>
          )}
          <p className="text-muted-foreground">{popupData.description}</p>
          {popupData.buttonText && popupData.buttonUrl && (
                <Button asChild className="w-full" size="sm">
                  <Link href={popupData.buttonUrl}>{popupData.buttonText}</Link>
              </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
);

export function InfoPopup({
  popupId,
  variant = 'modal',
  slidePosition = 'right',
  persist = true,
  ...overrides
}: InfoPopupProps) {
  const { isOpen, isLoading, popupData: initialPopupData, handleClose } = usePopup({ popupId, persist });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(() => {
      handleClose();
      setIsExiting(false); // Reset for next time
    }, 300); // Match animation duration

    return () => clearTimeout(timer);
  }, [isExiting, handleClose]);

  const popupData = { ...initialPopupData, ...overrides } as PopupData | null;
  
  if (isLoading || !popupData) {
    return null;
  }
  
  const handleTriggerClose = () => {
      if (!isExiting) {
          setIsExiting(true);
      }
  };

  return (
    <AnimatePresence>
      {isOpen && !isExiting && (
         (() => {
            switch(variant) {
              case 'slide':
                return renderSlide(popupData, handleTriggerClose, slidePosition);
              case 'corner':
                return renderCorner(popupData, handleTriggerClose, slidePosition);
              case 'modal':
              default:
                return renderModal(popupData, handleTriggerClose);
            }
          })()
      )}
    </AnimatePresence>
  );
}
