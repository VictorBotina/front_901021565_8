// src/app/afiliados/subsidiado/salud/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Stethoscope,
  Brain,
  Apple,
  HeartPulse,
  Baby,
  Cake,
  PersonStanding,
  User,
  School,
  GraduationCap,
  Briefcase,
  Heart,
} from "lucide-react";
import { ArticleSection } from "@/components/articles/ArticleSection";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const cursosDeVida = [
  {
    title: "Gestación",
    icon: <HeartPulse />,
    description: "Controles prenatales y acompañamiento para un embarazo seguro.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/gestacion",
  },
  {
    title: "Recién nacido",
    icon: <Baby />,
    description: "Atención al nacer, tamizajes y vacunación inicial.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/recien-nacido",
  },
  {
    title: "Primera infancia (0-5 años)",
    icon: <Cake />,
    description: "Desarrollo integral, vacunación y control de crecimiento.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/primera-infancia",
  },
  {
    title: "Infancia (6-11 años)",
    icon: <School />,
    description: "Salud escolar, nutrición y actividad física.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/infancia",
  },
  {
    title: "Adolescencia (12-17 años)",
    icon: <PersonStanding />,
    description: "Salud sexual, reproductiva y prevención de riesgos.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/adolescencia",
  },
  {
    title: "Juventud (18-28 años)",
    icon: <GraduationCap />,
    description: "Prevención de ITS, planificación y estilo de vida saludable.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/juventud",
  },
  {
    title: "Adultez (29-59 años)",
    icon: <Briefcase />,
    description: "Seguimiento de enfermedades crónicas y salud laboral.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/adultez",
  },
  {
    title: "Vejez (60+ años)",
    icon: <Heart />,
    description: "Atención integral, prevención y rehabilitación.",
    href: "/afiliados/subsidiado/salud/cursos-de-vida/vejez",
  },
];

const programasSalud = [
    {
      title: "Salud Mental",
      icon: <Brain />,
      description: "Recursos y apoyo para tu bienestar emocional.",
      href: "/afiliados/subsidiado/salud/programas/salud-mental",
    },
    {
      title: "Nutrición y Vida Activa",
      icon: <Apple />,
      description:
        "Guías para una alimentación balanceada y un estilo de vida saludable.",
      href: "/afiliados/subsidiado/salud/programas/nutricion",
    },
     {
      title: "Artritis",
      icon: <Stethoscope />,
      description: "Programa de acompañamiento para pacientes con artritis.",
      href: "/afiliados/subsidiado/salud/programas/artritis",
    },
    {
      title: "Cáncer",
      icon: <Stethoscope />,
      description: "Detección y tratamiento del cáncer.",
      href: "/afiliados/subsidiado/salud/programas/cancer",
    },
    {
      title: "EPOC",
      icon: <Stethoscope />,
      description: "Salud respiratoria para pacientes con EPOC.",
      href: "/afiliados/subsidiado/salud/programas/epoc",
    },
    {
      title: "Asma",
      icon: <Stethoscope />,
      description: "Control y prevención del asma.",
      href: "/afiliados/subsidiado/salud/programas/asma",
    },
    {
      title: "EDA",
      icon: <Stethoscope />,
      description: "Prevención de Enfermedad Diarreica Aguda.",
      href: "/afiliados/subsidiado/salud/programas/eda",
    },
    {
      title: "IRA",
      icon: <Stethoscope />,
      description: "Prevención de Infección Respiratoria Aguda.",
      href: "/afiliados/subsidiado/salud/programas/ira",
    },
    {
      title: "ITS",
      icon: <Stethoscope />,
      description: "Prevención de Infecciones de Transmisión Sexual.",
      href: "/afiliados/subsidiado/salud/programas/its",
    },
    {
      title: "VIH/SIDA",
      icon: <Stethoscope />,
      description: "Atención y acompañamiento para VIH/SIDA.",
      href: "/afiliados/subsidiado/salud/programas/vih-sida",
    },
    {
      title: "Vacunación",
      icon: <Stethoscope />,
      description: "Esquemas y jornadas de vacunación.",
      href: "/afiliados/subsidiado/salud/programas/vacunacion",
    },
    {
      title: "Maternidad",
      icon: <Stethoscope />,
      description: "Cuidado gestacional y maternidad segura.",
      href: "/afiliados/subsidiado/salud/programas/maternidad",
    },
    {
      title: "Enfoque Diferencial",
      icon: <Stethoscope />,
      description: "Salud inclusiva para todos.",
      href: "/afiliados/subsidiado/salud/programas/enfoque-diferencial",
    },
    {
      title: "Dengue",
      icon: <Stethoscope />,
      description: "Prevención y cuidado del dengue.",
      href: "/afiliados/subsidiado/salud/programas/dengue",
    },
    {
      title: "Fiebre Amarilla",
      icon: <Stethoscope />,
      description: "Prevención y vacunación contra la fiebre amarilla.",
      href: "/afiliados/subsidiado/salud/fiebre-amarilla",
    },
    {
      title: "Donación de Órganos",
      icon: <Stethoscope />,
      description: "Conviértete en un héroe, dona órganos.",
      href: "/afiliados/subsidiado/salud/programas/donacion-organos",
    },
];

export default function CuidadoSaludLandingPage() {
  return (
    <>
      <div className="p-6">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Cuidado de la Salud y Bienestar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Encuentra aquí los programas y la atención que necesitas en cada
            momento de tu vida. Nuestro modelo está centrado en ti.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Columna Cursos de Vida */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              Cursos de Vida: Etapas y Cuidados
            </h2>
            <Card>
              <CardHeader>
                <CardTitle as="h3">Atención para cada Etapa</CardTitle>
                <CardDescription>
                  Un modelo de salud continuo, integral y pertinente para cada
                  momento de tu vida.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {cursosDeVida.map((curso) => (
                  <Link
                    key={curso.title}
                    href={curso.href}
                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                      {React.cloneElement(curso.icon, {
                        className:
                          "h-6 w-6 text-primary group-hover:text-primary-foreground",
                      })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {curso.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {curso.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Columna Programas de Salud */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              Programas Cuidado de la Salud
            </h2>
            <Card>
              <CardHeader>
                <CardTitle as="h3">Nuestros Programas</CardTitle>
                <CardDescription>
                  Descubre cómo te acompañamos con programas de promoción,
                  prevención y bienestar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-center">
                    <Button asChild>
                        <Link href="/afiliados/subsidiado/salud/programas">Ampliar información</Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <ArticleSection title="Noticias sobre Salud y Bienestar" />
    </>
  );
}