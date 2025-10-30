
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserCheck, Network, Phone, MessageSquare, Info, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: 'Consulta tu IPS Asignada y Valida tus Derechos en Emssanar EPS',
  description: 'Verifica tu Institución Prestadora de Salud (IPS) asignada, confirma tu afiliación y accede a la red integral de servicios de salud de Emssanar EPS para una atención oportuna.',
  keywords: 'Consulta IPS, Validación de Derechos, Emssanar EPS, Afiliación, Red de Prestadores, Acceso a salud, Plan de Beneficios, Cobertura Integral',
};

export default function ConsultaIpsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Consulta tu IPS Asignada y Valida tus Derechos en Emssanar EPS
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Acceso efectivo y atención integral: Confirma tu cobertura y recursos de salud disponibles.
        </p>
      </header>

      <section className="max-w-4xl mx-auto mb-12">
        <Card className="bg-accent/50 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              <span>Estimado Afiliado:</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p>
              En Emssanar EPS S.A.S. valoramos profundamente su confianza. Nuestro compromiso es ofrecer un sistema de salud integral que garantice el acceso y el disfrute efectivo de los servicios, bajo criterios de pertinencia, calidad e integralidad.
            </p>
            <p>
              La herramienta “Consulta IPS – Validación de Derechos” le permite verificar su afiliación y confirmar el ejercicio pleno de sus derechos para acceder a los servicios de salud que brinda Emssanar EPS S.A.S.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-primary" />Validación y Afiliación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Usted adquiere la calidad de afiliado una vez ha completado su proceso de inscripción. Esta condición le otorga el derecho a acceder a los servicios de salud incluidos en el Plan de Beneficios en Salud (PBS).</p>
                <p>El PBS es el conjunto de servicios, procedimientos, medicamentos y tecnologías al que tienen derecho todos los afiliados, tanto del régimen contributivo como del subsidiado.</p>
                <p className="font-semibold text-foreground">Todo afiliado tiene derecho a recibir atención en condiciones de calidad, oportunidad y eficiencia, sin restricción alguna.</p>
            </CardContent>
        </Card>
        <Alert>
          <UserCheck className="h-4 w-4" />
          <AlertTitle>Acreditación de Identidad</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>Para acceder a los servicios, el afiliado debe acreditar su identidad presentando su documento de identidad o utilizando mecanismos tecnológicos autorizados.</p>
            <p className="font-bold">No se debe exigir al afiliado el carné, certificado de afiliación, copias, fotocopias o autenticaciones de documentos para la prestación de servicios.</p>
          </AlertDescription>
        </Alert>
      </section>
      
      <section className="mb-16">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Consulta en Línea de Validación de Derechos</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">A continuación, puede realizar la validación de su afiliación en tiempo real a través del siguiente aplicativo.</p>
        </div>
        <Card className="max-w-4xl mx-auto p-2 md:p-4">
            <div className="aspect-w-16 aspect-h-12 md:aspect-h-9 w-full">
                <iframe 
                    src="https://boxalud.emssanareps.co/Publico/BoxaludPublico/Pages/ValidacionDerechosAfiliados.aspx"
                    className="w-full h-[600px] md:h-[700px] border-0 rounded-md"
                    title="Consulta de Validación de Derechos de Afiliados"
                >
                </iframe>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">Nota: Este aplicativo permite consultar su estado de afiliación directamente en la base de datos de Emssanar EPS. La información mostrada es confidencial y de uso exclusivo del titular.</p>
        </Card>
      </section>

      <section>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Nuestra Red de Atención en Salud</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">Emssanar EPS S.A.S. garantiza la prestación de servicios a través de su Red de Instituciones Prestadoras de Servicios de Salud (IPS). Esta red de clínicas y hospitales trabaja de manera articulada para ofrecer una atención integral, continua y sin barreras.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            <Card>
                <CardHeader>
                    <Network className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle>IPS Primaria Asignada</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Es la puerta de entrada al sistema. Descargue su certificado de afiliación para verificarla.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Phone className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle>Canales de Atención</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>Línea Nacional: <span className="font-semibold">018000 93 04 22</span></p>
                    <p>WhatsApp: <span className="font-semibold">300 912 6625</span></p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <MessageSquare className="h-8 w-8 mx-auto text-primary" />
                    <CardTitle>Red de Servicios</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">Consulte los prestadores por nivel de complejidad. El modelo se organiza en 15 zonas que agrupan 102 municipios.</p>
                </CardContent>
            </Card>
        </div>
      </section>

    </div>
  );
}
