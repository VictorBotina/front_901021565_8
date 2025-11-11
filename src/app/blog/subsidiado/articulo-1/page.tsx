
export default function ArticuloSubsidiado1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Artículo de Prueba para Régimen Subsidiado</h1>
        <p className="text-muted-foreground">Publicado el {new Date().toLocaleDateString()}</p>
        <div className="mt-8">
          <p>
            Este es el contenido de un artículo de prueba para la categoría de 
            Régimen Subsidiado. Aquí se pueden detallar noticias, actualizaciones, 
            guías y cualquier información relevante para los afiliados de este régimen.
          </p>
          <p>
            El propósito de esta estructura es organizar la información de manera 
            clara y accesible para los usuarios, permitiéndoles encontrar fácilmente 
            los temas de su interés.
          </p>
        </div>
      </article>
    </div>
  );
}
