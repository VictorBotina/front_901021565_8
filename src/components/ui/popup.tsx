'use client';

import React from 'react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { X } from 'lucide-react';

type InfoPopupProps = {
  popupId: string;
  variant?: 'modal' | 'slide';
  slidePosition?: 'left' | 'right';
  persist?: boolean;
} & Partial<PopupData>;

const PopupContent = ({ popup, ctaButton }: { popup: PopupData; ctaButton: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    {popup.imageUrl && (
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image src={popup.imageUrl} alt={popup.title} fill className="object-cover" />
      </div>
    )}
    <div className="text-sm text-muted-foreground">{popup.description}</div>
    {ctaButton}
  </div>
);

export function InfoPopup({
  popupId,
  variant = 'modal',
  slidePosition = 'right',
  persist = true,
  ...overrides
}: InfoPopupProps) {
  const { isOpen, isLoading, popupData: initialPopupData, handleClose, setIsOpen } = usePopup({ popupId, persist });

  const popupData = { ...initialPopupData, ...overrides } as PopupData | null;
  
  if (isLoading) {
    return null; // Or a placeholder skeleton if you prefer
  }

  if (!isOpen || !popupData) {
    return null;
  }

  const CtaButton = popupData.buttonText && popupData.buttonUrl ? (
    <Button asChild className="w-full">
      <Link href={popupData.buttonUrl}>{popupData.buttonText}</Link>
    </Button>
  ) : null;

  if (variant === 'slide') {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side={slidePosition} className="w-full max-w-md p-0 flex flex-col">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle>{popupData.title}</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto px-6">
            <PopupContent popup={popupData} ctaButton={CtaButton} />
          </div>
          <SheetFooter className="p-6 bg-background border-t">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full" onClick={handleClose}>
                Cerrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Modal variant
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
          <AlertDialogCancel onClick={handleClose}>Cerrar</AlertDialogCancel>
          {popupData.buttonText && popupData.buttonUrl && (
            <AlertDialogAction asChild>
                <Link href={popupData.buttonUrl}>{popupData.buttonText}</Link>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
