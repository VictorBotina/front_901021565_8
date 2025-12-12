import type { Metadata } from "next";
import { Inter, Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Breadcrumbs from "@/components/layout/breadcrumbs/Breadcrumbs";
import { cookies } from 'next/headers';
import { CookieConsentBanner } from '@/components/cookie/CookieConsentBanner';
import Analytics from '@/components/Analytics';
import { InfoPopup } from "@/components/ui/popup";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// Optimización de Fuentes con next/font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: {
    default: "Entidad Digital - Salud y Bienestar a tu Alcance",
    template: "%s | Entidad Digital",
  },
  description: "Sitio institucional modular, accesible y escalable, enfocado en servicios de salud para afiliados y prestadores.",
  openGraph: {
    title: "Entidad Digital - Salud y Bienestar a tu Alcance",
    description: "Servicios e información para afiliados a los regímenes subsidiado y contributivo.",
    url: siteUrl,
    siteName: "Entidad Digital",
    images: [
      {
        url: `${siteUrl}/default-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Logo de Entidad Digital",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entidad Digital - Salud y Bienestar a tu Alcance",
    description: "Sitio institucional modular, accesible y escalable, enfocado en servicios de salud.",
    images: [`${siteUrl}/default-og.jpg`],
  },
  metadataBase: new URL(siteUrl),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const consentCookie = cookieStore.get('analytics_consent');
  const hasConsent = consentCookie?.value === 'true';
  const consentHandled = !!consentCookie;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Las etiquetas <link> de fuentes han sido eliminadas y reemplazadas por next/font */}
        {hasConsent && <Analytics />}
      </head>
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable,
        lora.variable,
        sourceSans3.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <Breadcrumbs />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <InfoPopup popupId="popup_main_v1" consentHandled={consentHandled} />
          {!consentHandled && <CookieConsentBanner />}
        </ThemeProvider>
      </body>
    </html>
  );
}
