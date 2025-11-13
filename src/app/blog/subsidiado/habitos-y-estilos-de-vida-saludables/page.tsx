import { StrapiApiTester } from "@/app/(home)/(sections)/StrapiApiTester";

export default function HabitosSaludablesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Hábitos y estilos de vida saludables: La Clave para un bienestar integral</h1>
        <p className="text-muted-foreground">Publicado el {new Date().toLocaleDateString()}</p>
        <div className="mt-8">
          <p>
            Adoptar hábitos saludables es fundamental para mantener una buena calidad de vida. 
            Una alimentación balanceada, la actividad física regular y un descanso adecuado 
            son los pilares para un bienestar integral.
          </p>
          <p>
            En esta sección, encontrarás consejos prácticos y guías para incorporar 
            pequeños cambios en tu día a día que tendrán un gran impacto en tu salud 
            física y mental.
          </p>
        </div>
      </article>

      <div className="mt-16">
        <StrapiApiTester />
      </div>
    </div>
  );
}
