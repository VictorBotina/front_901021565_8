'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setUserAnalyticsConsent } from '@/app/actions';
import { Loader2, Cookie } from 'lucide-react';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      await setUserAnalyticsConsent(true);
      setIsVisible(false);
    });
  };

  const handleDecline = () => {
    startTransition(async () => {
      await setUserAnalyticsConsent(false);
      setIsVisible(false);
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4">
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            <span>Tu Privacidad es Importante</span>
          </CardTitle>
          <CardDescription>
            Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Al aceptar, nos permites usar cookies para fines de análisis y así mejorar nuestros servicios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleAccept} disabled={isPending} className="w-full sm:w-auto">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Aceptar Cookies
            </Button>
            <Button onClick={handleDecline} variant="outline" disabled={isPending} className="w-full sm:w-auto">
              Rechazar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
