
// src/app/test/page.tsx
import { ArticleCard } from "./ArticleCard";

// Definimos el tipo aquí también para que la página sepa qué esperar.
type Article = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
};

// Función para obtener los artículos del archivo JSON en /public
async function getArticles(): Promise<Article[]> {
  try {
    // Para cargar un archivo desde la carpeta `public`, necesitamos una URL absoluta.
    // En el servidor (durante el build), necesitamos construirla. En el cliente, una ruta relativa funciona.
    // Para simplificar y hacerlo robusto, construiremos la URL completa.
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
    const res = await fetch(`${baseUrl}/articles.json`);
    
    if (!res.ok) {
      throw new Error(`No se pudieron cargar los artículos: ${res.statusText}`);
    }
    const data = await res.json();
    // Suponiendo que el JSON tiene una clave "articles" que es un array
    return data.articles;
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    return []; // Devuelve un array vacío en caso de error para evitar que la página se rompa
  }
}

export default async function TestPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Componente de Artículos de Prueba</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Estos artículos se cargan desde un archivo JSON ubicado en /public.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            // Creamos un enlace de ejemplo para cada artículo
            const articleHref = `/test/articulo/${article.id}`;
            return (
              <ArticleCard key={article.id} article={article} href={articleHref} />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No hay artículos disponibles en el archivo JSON o no se pudieron cargar.</p>
        </div>
      )}
    </div>
  );
}
