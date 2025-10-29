import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Building, Smile, Baby, User, PersonStanding } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Oficinas de Atención: Encuentre la Información y Ubicación para el Régimen Subsidiado',
  description: 'Encuentra oficinas del Régimen Subsidiado: atención cercana, rápida y preferencial para todos los afiliados.',
  keywords: 'Oficinas de atención, Régimen Subsidiado, EPS, Emssanar, Emssanar EPS, SIAU, atención al usuario, afiliados EPS, salud en Colombia, puntos de atención, oficinas municipales, atención preferencial, portabilidad, movilidad entre regímenes, trámites EPS, afiliación, novedades, cobertura en salud, atención presencial, oficinas regionales, Cali, Pasto, servicios de salud, información EPS.',
};


export default function OficinasAtencionPage() {
  
  const preferentialGroups = [
    { name: "Niños y niñas", icon: Baby },
    { name: "Mujeres embarazadas", icon: PersonStanding },
    { name: "Adultos mayores", icon: User },
    { name: "Personas en situación de discapacidad", icon: PersonStanding },
  ];
  
  const departments = ["Nariño", "Putumayo", "Valle del Cauca", "Cauca"];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Oficinas de Atención: Régimen Subsidiado
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Estamos comprometidos con la comodidad y la cercanía para nuestros afiliados. Nuestro Servicio de Información y Atención al Usuario (SIAU) es su punto de apoyo esencial.
        </p>
      </header>

      <section className="mb-16 max-w-4xl mx-auto">
        <Card className="bg-accent/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Smile className="h-6 w-6 text-primary" />
              <span>Servicio de Información y Atención al Usuario (SIAU)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p>
              El SIAU ha sido creado para facilitarle la atención, orientándole sobre los procesos a seguir dentro y fuera de la institución para acceder a sus servicios de salud. Como afiliado al Régimen Subsidiado, usted puede acudir a nuestras oficinas para radicar cualquier tipo de solicitud (informativa o para gestión), incluyendo trámites relacionados con afiliación, novedades, portabilidad y movilidad entre regímenes.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <div className="aspect-video w-full max-w-6xl mx-auto">
            <iframe
                src="https://oficinas-emssanar.vercel.app"
                className="w-full h-full border-0 rounded-lg shadow-lg"
                title="Directorio de Oficinas de Emssanar EPS"
                allow="geolocation"
            ></iframe>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Atención Presencial y Preferencial</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-primary" />
                        <span>Atención Preferencial</span>
                    </CardTitle>
                    <CardDescription>
                        Garantizamos la atención prioritaria a la población que requiere mayor apoyo para agilizar sus gestiones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">En nuestras oficinas municipales encontrará módulos, espacios de espera y personal capacitado para la atención preferente de:</p>
                    <ul className="space-y-3">
                        {preferentialGroups.map(group => (
                            <li key={group.name} className="flex items-center gap-3">
                                <group.icon className="h-5 w-5 text-primary" />
                                <span>{group.name}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Building className="h-6 w-6 text-primary" />
                        <span>Nuestra Red de Oficinas</span>
                    </CardTitle>
                    <CardDescription>
                       Contamos con oficinas de atención al usuario en cada municipio donde tenemos cobertura.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Además de las oficinas municipales, disponemos de oficinas zonales en las principales ciudades y oficinas regionales en Cali y Pasto para una gestión más cercana y eficiente.</p>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
