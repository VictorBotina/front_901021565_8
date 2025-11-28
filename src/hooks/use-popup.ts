// src/hooks/use-popup.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PopupData {
  id: string;
  active: boolean;
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface AllPopupsData {
  popups: PopupData[];
}

interface UsePopupProps {
  popupId: string;
  persist?: boolean;
  consentHandled?: boolean; // Nuevo prop
}

export const usePopup = ({ popupId, persist = true, consentHandled = false }: UsePopupProps) => {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // No hacer nada si el consentimiento de cookies aún no ha sido manejado
    if (!consentHandled) {
      setIsLoading(false);
      return;
    }

    const fetchPopupData = async () => {
      try {
        const response = await fetch('/data/popups.json');
        if (!response.ok) {
          throw new Error('Failed to fetch popups data');
        }
        const data: AllPopupsData = await response.json();
        const foundPopup = data.popups.find(p => p.id === popupId);
        
        if (foundPopup && foundPopup.active) {
          const storageKey = `popup_seen_${popupId}`;
          const hasSeenPopup = persist ? localStorage.getItem(storageKey) === 'true' : false;

          if (!hasSeenPopup) {
            setPopupData(foundPopup);
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopupData();
  }, [popupId, persist, consentHandled]); // El efecto se re-ejecutará cuando consentHandled cambie

  const handleClose = useCallback(() => {
    if (persist && popupData) {
      localStorage.setItem(`popup_seen_${popupData.id}`, 'true');
    }
    setIsOpen(false);
  }, [persist, popupData]);

  return {
    isOpen,
    isLoading,
    popupData,
    handleClose,
    setIsOpen
  };
};
