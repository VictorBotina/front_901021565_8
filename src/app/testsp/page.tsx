'use server';

import { fetchFromStrapi } from "@/lib/api";
import { Hero, type HeroProps } from "@/app/(home)/(sections)/Hero";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

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
};

export default async function TestSpPage() {
    const homeData: HomeData | null = await fetchFromStrapi('home', {
        populate: {
          banner: {
            populate: '*',
          },
        },
      });
    
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
    <div>
        <Hero {...heroProps} />
        <div className="mt-8 bg-gray-100 p-4 rounded">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <h2 className="text-2xl font-bold">Raw Strapi Data (Hero)</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                            <code>{JSON.stringify(homeData, null, 2)}</code>
                        </pre>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
  );
}
