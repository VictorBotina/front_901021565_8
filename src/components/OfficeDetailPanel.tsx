// src/components/OfficeDetailPanel.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { X, MapPin, Clock, Loader } from 'lucide-react';
import type { Location } from '@/lib/types';
import Image from 'next/image';

type OfficeDetailPanelProps = {
  location: Location & { details: any };
  onClose: () => void;
  isLoading: boolean;
};

const renderServicesAsList = (services: string) => {
    if (!services) return <p className="text-sm text-muted-foreground">No hay servicios especificados para este régimen.</p>;
    const serviceList = services.split(/\r\n\r\n/).map(s => s.trim()).filter(Boolean);
    return (
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 pl-4">
            {serviceList.map((service, index) => (
                <li key={index}>{service}</li>
            ))}
        </ul>
    );
};

export function OfficeDetailPanel({ location, onClose, isLoading }: OfficeDetailPanelProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute top-0 right-0 z-20 h-full w-full md:w-[400px] lg:w-[450px]"
    >
      <Card className="h-full w-full overflow-y-auto bg-background/80 backdrop-blur-sm rounded-none md:rounded-l-lg md:rounded-r-none">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4">
            <div className='flex items-center gap-4'>
                <Image src="https://emssanareps.co/images/logo_emssanareps.svg" alt="Logo Emssanar" width={40} height={40} className="h-10 w-auto" />
                <CardTitle>{location.nombre_municipio}</CardTitle>
            </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : location.details ? (
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Dirección</h4>
                        <p className="text-muted-foreground">{location.details.direccion || 'No especificada'}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold">Horario de Atención</h4>
                        <p className="text-muted-foreground">{location.details.horario_atencion || 'No especificado'}</p>
                    </div>
                </div>
                
                <div className='border-t pt-6 space-y-4'>
                    <details className="group" open>
                        <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground hover:text-accent-foreground">
                            Servicios Subsidiado
                            <div className="transition-transform duration-200 group-open:rotate-180">▼</div>
                        </summary>
                        <div className="mt-2 text-foreground/80">
                            {renderServicesAsList(location.details.servicios_sub)}
                        </div>
                    </details>
                    
                    <div className="border-t"></div>

                    <details className="group" open>
                        <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground hover:text-accent-foreground pt-4">
                            Servicios Contributivo
                            <div className="transition-transform duration-200 group-open:rotate-180">▼</div>
                        </summary>
                        <div className="mt-2 text-foreground/80">
                            {renderServicesAsList(location.details.servicios_cont)}
                        </div>
                    </details>
                </div>
            </div>
          ) : (
             <p className="text-muted-foreground text-center py-10">No hay detalles disponibles para esta oficina.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
