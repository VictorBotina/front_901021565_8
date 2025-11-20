// src/app/test/page.tsx
import { ArticleSection } from "@/components/articles/ArticleSection";

export default async function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Componente de Artículos de Prueba</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estos artículos se cargan desde un archivo JSON ubicado en /public.
        </p>
      </header>
      <ArticleSection title="Artículos de Prueba" />
    </div>
  );
}
