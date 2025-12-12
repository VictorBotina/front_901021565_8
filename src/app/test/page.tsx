// src/app/test/page.tsx
import { ArticleSection } from "@/components/articles/ArticleSection";
import { InfoPopup } from "@/components/ui/popup";
import { cookies } from 'next/headers';

export default async function TestPage() {
  const cookieStore = cookies();
  const consentHandled = !!cookieStore.get('analytics_consent');

  return (
    <div className="container mx-auto px-4 py-8">
      <InfoPopup 
        popupId="popup_cita_online" 
        variant="corner" 
        slidePosition="left"
        consentHandled={consentHandled} 
      />
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Página de Pruebas</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Esta página se usa para probar componentes. Aquí se muestra un popup de esquina.
        </p>
      </header>
      <ArticleSection title="Artículos de Prueba" />
    </div>
  );
}
