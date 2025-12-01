// src/app/afiliados/subsidiado/salud/page.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Star, FileText, Scale, Stethoscope, Brain, Apple, HeartPulse, ArrowRight } from "lucide-react";
import { ArticleSection } from "@/components/articles/ArticleSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const cursosDeVida = [
  {
    title: "Gestación (mujer gestante)",
    concepto: "Etapa orientada a garantizar controles prenatales, detección temprana de riesgos y acompañamiento integral para un embarazo seguro.",
    normatividad: "RIAS para la mujer gestante; lineamientos del MSPS sobre control prenatal."
  },
  {
    title: "Recién nacido",
    concepto: "Incluye atención inmediata al nacer, tamizajes obligatorios, vacunación inicial y vigilancia de riesgos neonatales.",
    normatividad: "RIAS del recién nacido; Resoluciones sobre tamizaje neonatal."
  },
  {
    title: "Primera infancia (0 a 5 años)",
    concepto: "Promoción del desarrollo integral, vacunación, control del crecimiento y neurodesarrollo, prevención de enfermedades prevenibles.",
    normatividad: "RIAS para primera infancia; lineamientos de crecimiento y desarrollo."
  },
  {
    title: "Infancia (6 a 11 años)",
    concepto: "Énfasis en salud escolar, nutrición, actividad física y detección temprana de problemas de aprendizaje y salud mental.",
    normatividad: "PAIS y RIAS de infancia; programas de salud en entornos educativos."
  },
  {
    title: "Adolescencia (12 a 17 años)",
    concepto: "Promoción de la salud sexual y reproductiva, prevención de consumo de sustancias, salud mental y acompañamiento en riesgos psicosociales.",
    normatividad: "RIAS adolescencia; políticas de salud mental y SSR."
  },
  {
    title: "Juventud (18 a 28 años)",
    concepto: "Transición hacia la autonomía: prevención de ITS, planificación familiar, salud mental, estilo de vida saludable y detección temprana de riesgos crónicos.",
    normatividad: "PAIS; lineamientos de SSR y prevención de enfermedades crónicas."
  },
  {
    title: "Adultez (29 a 59 años)",
    concepto: "Seguimiento de enfermedades crónicas no transmisibles (hipertensión, diabetes), salud laboral, salud sexual y detección temprana de cáncer.",
    normatividad: "RIAS de enfermedades crónicas; guías de práctica clínica de cáncer y ECNT."
  },
  {
    title: "Vejez (60 años o más)",
    concepto: "Atención integral al adulto mayor, prevención de dependencia, control de enfermedades crónicas, rehabilitación y cuidado paliativo cuando aplique.",
    normatividad: "RIAS de vejez; política de envejecimiento y vejez; atención paliativa."
  }
];

export default function CuidadoSaludLandingPage() {
  return (
    <>
      <div className="p-6">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Cuidado de la Salud y Bienestar</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentra aquí los programas y la atención que necesitas en cada momento de tu vida. Nuestro modelo está centrado en ti.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Columna Cursos de Vida */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Cursos de Vida</h2>
            <Accordion type="single" collapsible className="w-full">
              {cursosDeVida.map((curso, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-xl font-semibold">
                    <h3 className="flex items-center gap-3 text-left">
                      <span>{curso.title}</span>
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pt-4 space-y-4">
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Concepto
                      </h4>
                      <p className="text-muted-foreground pl-7">{curso.concepto}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Scale className="h-5 w-5 text-primary" />
                        Normatividad Base
                      </h4>
                      <p className="text-muted-foreground pl-7">{curso.normatividad}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             <Card className="mt-8 bg-accent/50 border-primary/20">
              <CardHeader>
                <CardTitle as="h3" className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-primary" />
                  <span>Resumen General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                  <p>Los cursos de vida en Colombia buscan que la atención en salud sea continua, integral, diferenciada y pertinente, siguiendo los lineamientos del PAIS, la Política de Atención Primaria en Salud (APS) y las RIAS.</p>
                  <p>Cada etapa tiene riesgos específicos y obligaciones normativas que garantizan la protección del derecho fundamental a la salud.</p>
              </CardContent>
            </Card>
          </section>

          {/* Columna Programas de Salud */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Programas Cuidado de la Salud</h2>
             <Card>
                <CardHeader>
                    <CardTitle as="h3">Nuestros Programas</CardTitle>
                    <CardDescription>Descubre cómo te acompañamos con programas de promoción, prevención y bienestar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Link href="/afiliados/subsidiado/salud/programas-pyp" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                            <Stethoscope className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Programas PyP</h4>
                            <p className="text-sm text-muted-foreground">Rutas de promoción y mantenimiento de la salud y prevención de enfermedades.</p>
                        </div>
                    </Link>
                    <Link href="/afiliados/subsidiado/salud/salud-mental" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                            <Brain className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Salud Mental</h4>
                            <p className="text-sm text-muted-foreground">Recursos y apoyo para tu bienestar emocional.</p>
                        </div>
                    </Link>
                    <Link href="/afiliados/subsidiado/salud/nutricion" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                            <Apple className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Nutrición y Vida Activa</h4>
                            <p className="text-sm text-muted-foreground">Guías para una alimentación balanceada y un estilo de vida saludable.</p>
                        </div>
                    </Link>
                     <Link href="/afiliados/subsidiado/salud/programas" className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                           <HeartPulse className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Otros Programas de Salud</h4>
                            <p className="text-sm text-muted-foreground">Explora todos nuestros programas de gestión del riesgo en salud.</p>
                        </div>
                    </Link>
                </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <ArticleSection title="Noticias sobre Salud y Bienestar" />
    </>
  );
}
