
export default function ArticuloContributivo1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Artículo de Prueba para Régimen Contributivo</h1>
        <p className="text-muted-foreground">Publicado el {new Date().toLocaleDateString()}</p>
        <div className="mt-8">
          <p>
            Este es el contenido de un artículo de prueba para la categoría de 
            Régimen Contributivo. Este espacio es ideal para comunicar novedades 
            sobre aportes, beneficios y servicios para los trabajadores y sus familias.
          </p>
          <p>
            Se pueden incluir temas como portabilidad, gestión de beneficiarios, 
            y otros aspectos relevantes para los afiliados a este régimen.
          </p>
        </div>
      </article>
    </div>
  );
}
