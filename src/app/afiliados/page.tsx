

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Info, Shield, BookOpen, Users, Phone, Mail, MessageSquare, Building, Heart, Leaf, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArticleSection } from "@/components/articles/ArticleSection";

export const metadata: Metadata = {
  title: 'Afiliados | Cuidamos de ti en cada paso',
  description: 'Conoce tus derechos y deberes como afiliado, acceso a servicios de salud integral y canales de atención confiables.',
  keywords: 'afiliados EPS, derechos y deberes del afiliado, plan de beneficios en salud, servicios de salud integral, atención al paciente, portabilidad EPS, atención urgente, copagos EPS, cuotas moderadoras, salud en Colombia, canales de atención EPS, Resolución 229 de 2020, Resolución 2718 de 2024, autocuidado, red de prestadores, trámites EPS',
};


export default function AfiliadosPage() {

    const staticCardData = [
    {
      title: "Régimen Subsidiado",
      description: "Accede a servicios de salud de calidad sin costo, garantizando tu bienestar y el de tu familia.",
      buttonText: "Conoce más",
      buttonLink: "/afiliados/subsidiado",
      imageUrl: "/images/img-sub/ico_subsidiado.svg",
    },
    {
      title: "Régimen Contributivo",
      description: "Cobertura completa para ti y tus beneficiarios a través de tu aporte como trabajador o independiente.",
      buttonText: "Explora beneficios",
      buttonLink: "/afiliados/contributivo",
      imageUrl: "/images/img-sub/ico_subsidiado.svg", // Assuming same icon for now
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Afiliados Emssanar EPS</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Cuidamos de ti en cada paso
        </p>
      </header>

      <main className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 md:p-8 lg:p-12">
          <section className="mb-16">
            <Card className="bg-accent/50 border-primary/20">
              <CardHeader>
                <CardTitle as="h2" className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-primary" />
                  <span>Nuestro Compromiso Contigo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                <p>
                  Nuestra misión es garantizar servicios de salud integrales para todos los afiliados, promoviendo la responsabilidad y el cuidado de tu salud en conjunto con tu familia. Estamos comprometidos a acompañarte en todo momento, asegurando el acceso y disfrute efectivo de los servicios de salud con criterios de pertinencia e integralidad.
                </p>
                <p className="text-sm text-muted-foreground">
                  El contenido de esta página web está reglamentado por el Ministerio de Salud y Protección Social, de acuerdo con la Resolución 229 de 2020 (que define los lineamientos de la Carta de Derechos y Deberes) y la Resolución 2718 de 2024 (que actualiza los servicios y tecnologías financiados con la UPC). Nuestro objetivo es informarte claramente sobre tus derechos y deberes del afiliado dentro del sistema de salud colombiano.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="py-12 lg:py-16 my-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {/* Tarjeta Régimen Subsidiado */}
                <Card className="flex flex-col text-center items-center">
                  <CardHeader className="items-center">
                    <Image
                      src={staticCardData[0].imageUrl}
                      alt="Icono Régimen Subsidiado"
                      width={100}
                      height={100}
                      className="h-[100px] w-[100px]"
                    />
                    <CardTitle as="h3" className="pt-4">{staticCardData[0].title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{staticCardData[0].description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild>
                      <Link href={staticCardData[0].buttonLink}>{staticCardData[0].buttonText}</Link>
                    </Button>
                  </div>
                </Card>

                {/* Tarjeta Régimen Contributivo */}
                <Card className="flex flex-col text-center items-center">
                  <CardHeader className="items-center">
                    <Image
                      src={staticCardData[1].imageUrl}
                      alt="Icono Régimen Contributivo"
                      width={100}
                      height={100}
                      className="h-[100px] w-[100px]"
                    />
                    <CardTitle as="h3" className="pt-4">{staticCardData[1].title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{staticCardData[1].description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild>
                      <Link href={staticCardData[1].buttonLink}>{staticCardData[1].buttonText}</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Tus Derechos y Deberes</h2>
            <Accordion type="multiple" className="w-full max-w-4xl mx-auto">
              <AccordionItem value="derechos">
                <AccordionTrigger className="text-xl font-semibold">
                  <h3 className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <span>Derechos del Afiliado y del Paciente</span>
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-4 space-y-6">
                  <p className="text-muted-foreground">Todo afiliado, sin restricciones por motivos de pertenencia étnica, sexo, identidad de género, edad, religión o condición social o económica, tiene derecho a:</p>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Acceso, Oportunidad y Calidad</h4>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                      <li><span className="font-semibold">Acceder sin Restricción:</span> Tienes derecho a acceder en condiciones de calidad, oportunidad y eficiencia a todas las actividades, procedimientos, intervenciones, insumos y medicamentos que no estén expresamente excluidos del Plan de Beneficios financiado con la UPC.</li>
                      <li><span className="font-semibold">Servicios de Urgencias sin Barreras:</span> Recibir la atención de urgencias requerida con la oportunidad que su condición amerite, sin que sea exigible documento, carné o cancelación de pago previo alguno.</li>
                      <li><span className="font-semibold">Atención Integral y Continua:</span> Acceder a los servicios y tecnologías de salud en forma continua y sin interrupción por razones administrativas o económicas.</li>
                      <li><span className="font-semibold">Trámite de Servicios Interno:</span> La EPS debe autorizar y tramitar internamente los servicios de salud ordenados por el médico tratante.</li>
                      <li><span className="font-semibold">Portabilidad:</span> Recibir atención médica integral en un municipio diferente al de su residencia si se traslada temporalmente.</li>
                      <li><span className="font-semibold">Libre Escogencia y Segunda Opinión:</span> Elegir libremente el asegurador, el médico y las instituciones, y a recibir una segunda opinión en caso de duda.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Dignidad y Autonomía</h4>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                      <li><span className="font-semibold">Trato Digno:</span> Recibir un trato digno en todas las etapas de atención, sin ser sometido a tratos crueles o inhumanos.</li>
                      <li><span className="font-semibold">Protección Especial por Alto Costo:</span> Recibir protección especial si padece enfermedades catastróficas o de alto costo.</li>
                      <li><span className="font-semibold">Consentimiento Informado:</span> Aceptar o rechazar actividades, intervenciones o tratamientos para su cuidado.</li>
                      <li><span className="font-semibold">Acceso a Información y Confidencialidad:</span> Recibir información clara y solicitar copia de la historia clínica, que debe ser tratada de manera confidencial.</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="deberes">
                <AccordionTrigger className="text-xl font-semibold">
                   <h3 className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Tus Responsabilidades en el Sistema de Salud</span>
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-2 pt-4 space-y-2">
                  <p className="mb-4 text-muted-foreground">Sé corresponsable con tu salud y la sostenibilidad del sistema. Según lo establecido en la ley, los afiliados y pacientes tienen los siguientes deberes:</p>
                  <ul className="list-decimal list-inside space-y-3 pl-4">
                    <li><span className="font-semibold">Autocuidado:</span> Propender por su autocuidado, el de su familia y el de su comunidad.</li>
                    <li><span className="font-semibold">Seguimiento Médico:</span> Atender oportunamente las recomendaciones formuladas por el personal de salud.</li>
                    <li><span className="font-semibold">Solidaridad:</span> Actuar de manera solidaria ante situaciones que pongan en peligro la vida o la salud de otros.</li>
                    <li><span className="font-semibold">Respeto:</span> Respetar al personal de salud y a otros pacientes.</li>
                    <li><span className="font-semibold">Uso Racional:</span> Usar adecuada y racionalmente las prestaciones y recursos del sistema.</li>
                    <li><span className="font-semibold">Información Veraz:</span> Suministrar información oportuna y suficiente para recibir el servicio.</li>
                    <li><span className="font-semibold">Cumplimiento Normativo:</span> Cumplir las normas del Sistema General de Seguridad Social en Salud.</li>
                    <li><span className="font-semibold">Aportes Económicos:</span> Contribuir al financiamiento de los gastos según su capacidad de pago.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Plan de Beneficios en Salud (PBS)</h2>
             <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle as="h3">Resolución 2718 de 2024</CardTitle>
                <CardDescription>
                  El Plan de Beneficios con Cargo a la UPC es un derecho fundamental para todos los usuarios, definiendo el conjunto de servicios, procedimientos y medicamentos a los que tienen derecho.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><CheckCircle className="text-primary h-5 w-5"/> Servicios de Salud Cubiertos</h4>
                  <p className="text-muted-foreground ml-7">La Resolución 2718 de 2024 garantiza promoción, prevención, recuperación, rehabilitación y atención en salud mental de manera integral.</p>
                </div>
                 <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><CheckCircle className="text-primary h-5 w-5"/> Dispositivos Médicos y Ayudas Técnicas</h4>
                  <p className="text-muted-foreground ml-7">Se garantizan dispositivos, insumos, lentes correctores, prótesis y órtesis necesarios e insustituibles.</p>
                </div>
                 <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><CheckCircle className="text-primary h-5 w-5"/> Transporte y Traslado</h4>
                  <p className="text-muted-foreground ml-7">El PBS cubre el traslado en ambulancia para urgencias y remisiones, y transporte ambulatorio en zonas especiales.</p>
                </div>
                 <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><CheckCircle className="text-primary h-5 w-5"/> Pagos Moderadores: Cuotas y Copagos</h4>
                  <p className="text-muted-foreground ml-7">Estos aportes buscan un uso racional de los servicios. Su falta de pago no puede ser una barrera para la atención, especialmente en urgencias.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Canales de Atención y Contacto</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle as="h3">Opciones de Contacto Directo</CardTitle>
                    <CardDescription>Estamos cerca de ti para brindarte una atención preferencial y efectiva.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Canal</TableHead>
                          <TableHead>Contacto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell><div className="flex items-center gap-2"><Phone className="h-4 w-4"/> Línea Nacional</div></TableCell>
                          <TableCell className="font-medium">01 8000 93 04 22</TableCell>
                        </TableRow>
                         <TableRow>
                          <TableCell><div className="flex items-center gap-2"><MessageSquare className="h-4 w-4"/> WhatsApp</div></TableCell>
                          <TableCell className="font-medium">300 912 6625</TableCell>
                        </TableRow>
                         <TableRow>
                          <TableCell><div className="flex items-center gap-2"><Mail className="h-4 w-4"/> Correo Electrónico</div></TableCell>
                          <TableCell className="font-medium">afiliate@emssanareps.co</TableCell>
                        </TableRow>
                         <TableRow>
                          <TableCell><div className="flex items-center gap-2"><Building className="h-4 w-4"/> Oficinas de Atención</div></TableCell>
                          <TableCell className="font-medium">Directorio disponible</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader>
                    <CardTitle as="h3">Peticiones, Quejas y Reclamos</CardTitle>
                    <CardDescription>Valoramos tu retroalimentación para mejorar continuamente.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p>Hemos dispuesto canales para la atención de Peticiones, Quejas, Reclamos y Denuncias (PQR) con el compromiso de gestionarlos de manera oportuna, como el Formulario PQR, Chat ClaraBot, buzones en oficinas y mecanismos de protección como el derecho de petición o la Superintendencia Nacional de Salud (SNS).</p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Recursos en Línea y Trámites</h3>
                <div className="space-y-4">
                   <Button asChild className="w-full justify-start text-left h-auto py-3" variant="outline">
                    <Link href="#">
                      <div className="flex flex-col">
                        <span className="font-semibold">Consulta tu Red de Servicios</span>
                        <span className="text-sm text-muted-foreground">Accede a la Red de Prestadores (IPS) contratada.</span>
                      </div>
                    </Link>
                  </Button>
                   <Button asChild className="w-full justify-start text-left h-auto py-3" variant="outline">
                    <Link href="#">
                       <div className="flex flex-col">
                        <span className="font-semibold">Gestiona tu Movilidad y Portabilidad</span>
                        <span className="text-sm text-muted-foreground">Realiza el trámite en línea a través del SAT.</span>
                      </div>
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start text-left h-auto py-3" variant="outline">
                    <Link href="#">
                       <div className="flex flex-col">
                        <span className="font-semibold">Visita Nuestra Página Web</span>
                        <span className="text-sm text-muted-foreground">Trámites virtuales, consulta de clínicas, y más.</span>
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ArticleSection title="Últimas noticias" />
      </main>
    </div>
  );
}
