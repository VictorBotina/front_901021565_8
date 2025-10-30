import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta de Afiliación y Red de Prestadores (IPS)',
  description: 'Valida tu estado de afiliación a Emssanar EPS y consulta nuestra red de prestadores de servicios de salud (IPS) para el Régimen Subsidiado.',
  keywords: 'consulta IPS, validación de derechos, estado de afiliación, red de prestadores, directorio IPS, Emssanar EPS, Régimen Subsidiado, buscar IPS, servicios de salud',
};

export default function ConsultaIpsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Consulta de Afiliación y Red de Prestadores (IPS)
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Verifica fácilmente tu estado de afiliación en el Régimen Subsidiado y encuentra los prestadores de servicios de salud (IPS) disponibles para ti.
        </p>
      </header>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Validación de Derechos</CardTitle>
            <CardDescription>
              Ingresa tu número de documento para confirmar que tu afiliación está activa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="document-number">Número de Documento de Identidad</Label>
                <Input
                  id="document-number"
                  placeholder="Escribe tu número de documento"
                  type="text"
                />
              </div>
              <Button type="submit" className="w-full">
                Consultar Estado de Afiliación
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

       <section className="mt-16 text-center">
         <h2 className="text-3xl font-bold mb-4">Encuentra tu IPS más cercana</h2>
         <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Una vez confirmada tu afiliación, puedes buscar en nuestro directorio la Institución Prestadora de Servicios de Salud (IPS) que te corresponde o la más cercana a tu ubicación.
         </p>
         <Button variant="secondary">
            Buscar en el Directorio de IPS
         </Button>
       </section>
    </div>
  );
}
