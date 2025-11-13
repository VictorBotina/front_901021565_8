// src/components/ui/ShareButtons.tsx
'use client';

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

type ShareButtonsProps = {
  url: string;
  title?: string;
  summary?: string;
  className?: string;
};

export function ShareButtons({ url, title, summary, className }: ShareButtonsProps) {
  return (
    <div className={cn("text-center", className)}>
      <h3 className="text-md font-semibold text-muted-foreground mb-4">Compartir en redes</h3>
      <div className="flex items-center justify-center gap-3">
        <FacebookShareButton
          url={url}
          quote={title}
          hashtag={'#EmssanarEPS'}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={title}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={url}
          title={title}
          summary={summary}
          source="Emssanar EPS"
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={url}
          title={title}
          separator=":: "
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TelegramShareButton
          url={url}
          title={title}
          className="transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-lg rounded-full"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}
