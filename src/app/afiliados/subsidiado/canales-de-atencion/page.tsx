// src/app/afiliados/subsidiado/canales-de-atencion/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Building, Mail } from "lucide-react";
import React from 'react';

export default function CanalesAtencionPage() {
  const channels = [
    { icon: <Phone/>, title: "Línea Telefónica", description: "Línea nacional gratuita 01 8000 93 04 22 para atender todas tus inquietudes." },
    { icon: <MessageCircle/>, title: "WhatsApp", description: "Escríbenos a nuestra línea de WhatsApp 300 912 6625 para una atención rápida." },
    { icon: <Building/>, title: "Oficinas Físicas", description: "Visita nuestras oficinas en tu municipio. Contamos con atención preferencial." },
    { icon: <Mail/>, title: "Correo Electrónico", description: "Envíanos tus solicitudes y PQRSD a nuestro correo oficial de atención." },
  ];

  return (
    <div className="p-6">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Nuestros Canales de Atención</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
          Estamos aquí para ayudarte. Elige el canal que prefieras para comunicarte con nosotros y resolver tus inquietudes.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((channel, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {React.cloneElement(channel.icon, { className: "h-6 w-6 text-primary" })}
              </div>
              <CardTitle>{channel.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{channel.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
