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

export function ShareButtons({ url, title = '', summary, className }: ShareButtonsProps) {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        const urlToUse = url ? new URL(url, window.location.origin).href : window.location.href;
        setShareUrl(urlToUse);
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

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <h3 className="text-sm font-semibold text-muted-foreground">Compartir:</h3>
      <div className="flex items-center gap-2">
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          hashtag={'#EmssanarEPS'}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
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
          title={title}
          separator=" " // Usa un espacio simple como separador. La librería lo unirá.
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
