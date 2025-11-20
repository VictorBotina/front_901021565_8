import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <Image
      src="/logo_emssanar.svg"
      alt="Logo de Emssanar EPS"
      width={140}
      height={32}
      className={cn("h-8 w-auto", className)}
      priority
    />
  );
}
