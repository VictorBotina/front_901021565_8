// src/components/ui/ShareButtons.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'next-share';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

type ShareButtonsProps = {
  url?: string;
  title?: string;
  summary?: string;
  className?: string;
};

export function ShareButtons({ url, title, summary, className }: ShareButtonsProps) {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Asegurar que estamos en el cliente antes de acceder a window.location
    if (typeof window !== 'undefined') {
        if (url) {
            // Si se pasa una URL, asegurarse que sea absoluta
            try {
                setShareUrl(new URL(url, window.location.origin).href);
            } catch (e) {
                // Si la URL es inválida, usar la de la página actual
                setShareUrl(window.location.href);
            }
        } else {
            // Si no se pasa URL, usar la de la página actual
            setShareUrl(window.location.href);
        }
    }
  }, [url, pathname]);

  if (!isMounted) {
    return (
        <div className={cn("flex items-center justify-center gap-3", className)}>
            <Skeleton className="h-6 w-20" />
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    );
  }

  // Mensaje para Whatsapp y otros que lo usan. Incluye el título y un salto de línea.
  const shareMessage = title ? `${title}\n` : '';

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <h3 className="text-sm font-semibold text-muted-foreground">Compartir:</h3>
      <div className="flex items-center gap-2">
        <FacebookShareButton
          url={shareUrl}
          quote={shareMessage} // Usar 'quote' para el texto que acompaña
          hashtag={'#EmssanarEPS'}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title} // Twitter usa el 'title' para el texto del tweet
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={summary}
          source="Emssanar EPS"
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={shareMessage} // El 'title' se convierte en el cuerpo del mensaje
          separator="" // El separador ahora es innecesario
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}
