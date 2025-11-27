'use client';

import { useEffect } from 'react';

// Este es un componente de marcador de posición para simular la carga de scripts de análisis.
// En una aplicación real, aquí se inicializaría Google Analytics, etc.
export default function Analytics() {
  useEffect(() => {
    console.log('✅ Consentimiento de análisis otorgado. Cargando scripts...');
    // Aquí iría la lógica para cargar GTM, Google Analytics, etc.
    // Por ejemplo:
    // const script = document.createElement('script');
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    // script.async = true;
    // document.head.appendChild(script);
  }, []);

  return null; // Este componente no renderiza nada en el DOM.
}
