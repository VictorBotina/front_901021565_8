import type { SVGProps } from 'react';

export function AccessibilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 1 0 0-12" />
      <path d="M12 18a6 6 0 1 1 0-12" />
      <path d="M12 12h.01" />
      <path d="M12 6h.01" />
      <path d="M12 18h.01" />
      <path d="M18 12h.01" />
      <path d="M6 12h.01" />
    </svg>
  );
}
