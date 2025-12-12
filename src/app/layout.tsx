import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const consentCookie = cookieStore.get('analytics_consent');
  const hasConsent = consentCookie?.value === 'true';
  const consentHandled = !!consentCookie;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Pre-conexión a los dominios de Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Carga de fuentes */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lora:wght@400;700&family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
        {hasConsent && <Analytics />}
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable)}>
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
