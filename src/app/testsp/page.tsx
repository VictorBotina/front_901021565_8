'use client';

import * as React from 'react';
import Image from 'next/image';
import { Hero, type HeroProps } from "@/app/(home)/(sections)/Hero";
import { fetchFromStrapi } from "@/lib/api";
import { InfoCards } from "@/app/(home)/(sections)/InfoCards";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CardData = {
  id: number;
  title: string;
  description: { type: string, children: { text: string }[] }[];
  buttonText: string;
  buttonLink: string;
  icon: string;
};

type HomeData = {
  banner: {
    id: number;
    title: string;
    description: {
      type: string;
      children: { text: string; type: string }[];
    }[];
    button_primary_text: string;
    button_primary_url: string;
    button_secondary_text: string;
    button_secondary_url: string;
    image?: string; 
  };
  cards?: CardData[];
};

export default function TestSpPage() {
  const [homeData, setHomeData] = React.useState<HomeData | null>(null);
  const [strapiEndpoint, setStrapiEndpoint] = React.useState<string>('home?populate[banner][populate]=*&populate[cards]=*');
  const [apiResponse, setApiResponse] = React.useState<any>(null);

  React.useEffect(() => {
    async function loadHomeData() {
      const data: HomeData | null = await fetchFromStrapi('home', {
        populate: {
          banner: {
            populate: '*',
          },
          cards: {
            populate: '*',
          }
        },
      });
      setHomeData(data);
    }
    loadHomeData();
  }, []);

  const handleFetch = async () => {
    if (!strapiEndpoint) {
      setApiResponse({ error: "Please enter a Strapi endpoint." });
      return;
    }
    try {
      const data = await fetchFromStrapi(strapiEndpoint);
      setApiResponse(data);
      // If the fetched data is for the home page, update the homeData state
      if (strapiEndpoint.startsWith('home')) {
        setHomeData(data as HomeData);
      }
    } catch (error) {
      console.error("Error fetching from Strapi:", error);
      if (error instanceof Error) {
        setApiResponse({ error: "Failed to fetch from Strapi API.", message: error.message });
      } else {
        setApiResponse({ error: "An unknown error occurred." });
      }
    }
  };

  const heroProps: HeroProps | null = homeData ? {
    title: homeData.banner.title,
    description: homeData.banner.description.map(d => d.children.map(c => c.text).join(' ')).join('\n'),
    image: homeData.banner.image ? {
      url: homeData.banner.image,
      alt: homeData.banner.title,
    } : undefined,
    primaryButton: {
      text: homeData.banner.button_primary_text,
      url: homeData.banner.button_primary_url,
    },
    secondaryButton: {
      text: homeData.banner.button_secondary_text,
      url: homeData.banner.button_secondary_url,
    },
  } : null;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Strapi API</CardTitle>
            <CardDescription>Enter a Strapi endpoint path to fetch and display the data.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="e.g., home?populate[banner][populate]=*"
                value={strapiEndpoint}
                onChange={(e) => setStrapiEndpoint(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleFetch}>Consultar</Button>
            </div>
            {apiResponse && (
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>API Response:</AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <pre className="text-sm overflow-auto max-h-96">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Visualización de SVG</CardTitle>
            <CardDescription>Esta sección muestra la imagen SVG de forma aislada.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center p-4 border rounded-lg">
                <Image
                    src="/images/img-sub/ico_subsidiado.svg"
                    alt="Icono Régimen Subsidiado"
                    width={100}
                    height={100}
                    className="h-[100px] w-[100px]"
                />
            </div>
          </CardContent>
        </Card>
      </div>

      <Hero {...heroProps} />
      <InfoCards cards={homeData?.cards} />
    </>
  );
}
