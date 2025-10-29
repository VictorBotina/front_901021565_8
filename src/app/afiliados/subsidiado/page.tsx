import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Building,
  Hospital,
  HandHeart,
  Network,
  ArrowRightLeft,
  HeartPulse,
  FileText,
  ShieldCheck,
  Coins,
  Calculator,
  UserPlus,
  Phone,
  Mail,
} from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Régimen Subsidiado: Tu Derecho a la Salud Integral y Oportuna',
  description: 'Régimen Subsidiado en Colombia: acceso inmediato a salud integral para ti y tu familia, sin barreras ni carencias.',
  keywords: 'Régimen Subsidiado, EPS, salud integral, SGSSS, cobertura en salud, atención médica, Colombia, acceso a salud, Plan de Beneficios en Salud, PBSCUPC, afiliación EPS, servicios de salud, población vulnerable, atención sin carencias, subsidio estatal, promoción de la salud, prevención, diagnóstico, tratamiento, rehabilitación, paliación.',
};

export default function SubsidiadoPage() {
  const infoCards = [
    { title: "Oficinas de atención", icon: Building, link: "#" },
    { title: "Consulta de IPS", icon: Hospital, link: "#" },
    { title: "Contribución solidaria", icon: HandHeart, link: "#" },
    { title: "Redes y prestadores de salud", icon: Network, link: "#" },
    { title: "Solicite su movilidad", icon: ArrowRightLeft, link: "#" },
    { title: "Servicios de urgencias", icon: HeartPulse, link: "#" },
    { title: "Sisbén IV", icon: FileText, link: "#" },
    { title: "Derechos y deberes del afiliado", icon: ShieldCheck, link: "/afiliados" },
    { title: "Copagos y cuotas moderadoras", icon: Coins, link: "#" },
    { title: "Consulta tope copagos", icon: Calculator, link: "#" },
    { title: "Afiliación a Emssanar EPS", icon: UserPlus, link: "#" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Régimen Subsidiado: Tu Derecho a la Salud Integral y Oportuna
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          ¡Bienvenido/a! Reconocemos tu valor y el de tu familia. Como EPS, nuestra misión es garantizar que la población más vulnerable de Colombia acceda a servicios de salud de alta calidad, sin barreras.
        </p>
      </header>

      <section className="mb-16 max-w-4xl mx-auto text-center">
        <Card className="bg-accent/50 border-primary/20">
          <CardHeader>
            <CardTitle>¿Qué es el Régimen Subsidiado?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90">
            <p>
              El Régimen Subsidiado es el mecanismo del Sistema General de Seguridad Social en Salud (SGSSS) diseñado para permitir que la población pobre y vulnerable, sin capacidad de pago, acceda a los servicios de salud a través de un subsidio, total o parcial, otorgado por el Estado.
            </p>
            <p>
              Al estar afiliado a este régimen, usted y su núcleo familiar tienen garantizada la cobertura total del Plan de Beneficios en Salud con cargo a la UPC (PBSCUPC). Nuestro compromiso es brindarle una atención integral que cubra todas las fases: promoción, prevención, diagnóstico, tratamiento, rehabilitación y paliación de la enfermedad.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Acceso a Servicios y Trámites</h2>
            <p className="text-muted-foreground mt-2">Encuentra la información y gestiona tus solicitudes de forma ágil.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link href={card.link} key={card.title} className="group">
                <Card className="h-full text-center hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="items-center">
                    <div className="flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-16 max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Movilidad y Permanencia en tu EPS</CardTitle>
                <CardDescription>
                La Movilidad es un derecho crucial que le permite cambiar de régimen (del Subsidiado al Contributivo o viceversa) dentro de la misma EPS sin perder la continuidad de su afiliación.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Si usted es afiliado al Régimen Subsidiado y adquiere capacidad de pago (por ejemplo, consigue un empleo), puede permanecer con su misma EPS en el Régimen Contributivo si está focalizado en los niveles I y II del Sisbén o pertenece a poblaciones especiales. Solo deberá diligenciar el formulario de afiliación y novedades.</p>
                <p>Si termina su vínculo laboral, puede continuar inmediatamente con la EPS en el Régimen Subsidiado sin perder el acceso a los servicios de salud (Movilidad Descendente Automática).</p>
            </CardContent>
        </Card>
      </section>

      <section className="bg-primary/90 text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold">Tu Salud es Prioridad: ¡Te invitamos a ejercer tus derechos!</h2>
        <p className="mt-4 max-w-3xl mx-auto">
          Si tienes dudas sobre tu Plan de Beneficios, necesitas información sobre los servicios que cubre la UPC, o requieres gestionar una novedad (como la Movilidad o Portabilidad), utiliza nuestros canales:
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-6">
            <div className="flex items-center gap-2">
                <Phone className="h-6 w-6"/>
                <span className="font-semibold">Línea nacional gratuita: 01 8000 93 04 22</span>
            </div>
             <div className="flex items-center gap-2">
                <Mail className="h-6 w-6"/>
                <span className="font-semibold">afiliate@emssanareps.co</span>
            </div>
        </div>
        <p className="mt-4 text-sm text-primary-foreground/80">Nuestro equipo está disponible 24/7 para el Régimen Subsidiado.</p>
      </section>
    </div>
  );
}
