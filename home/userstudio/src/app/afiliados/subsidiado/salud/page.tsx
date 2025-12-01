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
  Syringe,
  PlusCircle,
  Shield,
  Virus,
  LifeBuoy,
  Bone,
  Lungs,
  Users2,
  TestTube2,
  CircleHelp,
  Droplets,
  HandHeart,
  PersonStanding as PersonStandingIcon,
  Smile,
} from "lucide-react";
import { ArticleSection } from "@/components/articles/ArticleSection";
import Link from "next/link";
import React from "react";

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
  { href: "/afiliados/subsidiado/salud/programas/artritis", title: "Artritis", icon: <Bone /> },
  { href: "/afiliados/subsidiado/salud/programas/cancer", title: "Cáncer", icon: <Shield /> },
  { href: "/afiliados/subsidiado/salud/programas/epoc", title: "EPOC", icon: <Lungs /> },
  { href: "/afiliados/subsidiado/salud/programas/asma", title: "Asma", icon: <Lungs /> },
  { href: "/afiliados/subsidiado/salud/programas/eda", title: "EDA", icon: <Droplets /> },
  { href: "/afiliados/subsidiado/salud/programas/ira", title: "IRA", icon: <Lungs /> },
  { href: "/afiliados/subsidiado/salud/programas/its", title: "ITS", icon: <Users2 /> },
  { href: "/afiliados/subsidiado/salud/programas/vih-sida", title: "VIH/SIDA", icon: <LifeBuoy /> },
  { href: "/afiliados/subsidiado/salud/programas/vacunacion", title: "Vacunación", icon: <Syringe /> },
  { href: "/afiliados/subsidiado/salud/programas/maternidad", title: "Maternidad Segura", icon: <HeartPulse /> },
  { href: "/afiliados/subsidiado/salud/programas/salud-mental", title: "Salud Mental", icon: <Brain /> },
  { href: "/afiliados/subsidiado/salud/programas/enfoque-diferencial", title: "Enfoque Diferencial", icon: <Users /> },
  { href: "/afiliados/subsidiado/salud/programas/nutricion", title: "Nutrición y Vida Activa", icon: <Apple /> },
  { href: "/afiliados/subsidiado/salud/programas/dengue", title: "Dengue", icon: <Virus /> },
  { href: "/afiliados/subsidiado/salud/fiebre-amarilla", title: "Fiebre Amarilla", icon: <TestTube2 /> },
  { href: "/afiliados/subsidiado/salud/programas/donacion-organos", title: "Donación de Órganos", icon: <HandHeart /> },
  { href: "/afiliados/subsidiado/salud/programas-pyp", title: "Programas PyP", icon: <Stethoscope /> },
  { href: "/afiliados/subsidiado/salud/programas", title: "Otros Programas", icon: <PlusCircle /> },
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
              <CardContent className="space-y-2">
                {programasSalud.map((programa) => (
                  <Link
                    key={programa.href}
                    href={programa.href}
                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                      {React.cloneElement(programa.icon, {
                        className:
                          "h-6 w-6 text-primary group-hover:text-primary-foreground",
                      })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {programa.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <ArticleSection title="Noticias sobre Salud y Bienestar" />
    </>
  );
}
