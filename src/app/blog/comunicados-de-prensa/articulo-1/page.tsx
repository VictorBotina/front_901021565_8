
export default function ArticuloComunicado1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Comunicado de Prensa de Prueba</h1>
        <p className="text-muted-foreground">Publicado el {new Date().toLocaleDateString()}</p>
        <div className="mt-8">
          <p>
            Este es un modelo para los comunicados de prensa oficiales de la entidad. 
            Aquí se publicará información corporativa, anuncios importantes y 
            posicionamientos oficiales sobre temas de interés público.
          </p>
          <p>
            La transparencia y la comunicación oportuna con los medios y la ciudadanía 
            son pilares de nuestra gestión.
          </p>
        </div>
      </article>
    </div>
  );
}
