import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { PenSquare, MessageSquareWarning } from "lucide-react";
import Link from "next/link";

export function FeedbackSection() {
  return (
    <section className="py-12 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Califique nuestro servicio
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Tarjeta 1: Encuesta de satisfacción */}
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <PenSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Encuesta de satisfacción</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button asChild>
                <Link href="#">Realizar Encuesta</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Tarjeta 2: Peticiones, quejas, reclamos y denuncias */}
          <Card className="flex flex-col items-center text-center">
            <CardHeader>
               <div className="flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <MessageSquareWarning className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Peticiones, quejas, reclamos y denuncias</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Button asChild>
                <Link href="#">Radicar PQRSD</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
