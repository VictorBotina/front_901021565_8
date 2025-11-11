
export default function ArticuloPrestadores1() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Artículo de Prueba para Prestadores</h1>
        <p className="text-muted-foreground">Publicado el {new Date().toLocaleDateString()}</p>
        <div className="mt-8">
          <p>
            Contenido de un artículo de prueba dirigido a nuestra red de prestadores 
            de servicios de salud. Este es el canal para informar sobre nuevos convenios, 
            procedimientos de facturación y actualizaciones en el portal de prestadores.
          </p>
          <p>
            Mantener una comunicación fluida y transparente con nuestra red de IPS 
            es fundamental para garantizar una atención de calidad a los afiliados.
          </p>
        </div>
      </article>
    </div>
  );
}
