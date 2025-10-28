'use client';

import * as React from 'react';
import { Hero, type HeroProps } from "@/app/(home)/(sections)/Hero";
import { fetchFromStrapi } from "@/lib/api";
import { InfoCards } from "@/app/(home)/(sections)/InfoCards";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

export default function TestSpPage() {
  const [homeData, setHomeData] = React.useState<HomeData | null>(null);
  const [strapiEndpoint, setStrapiEndpoint] = React.useState<string>('home?populate[banner][populate]=*');
  const [apiResponse, setApiResponse] = React.useState<any>(null);

  React.useEffect(() => {
    async function loadHomeData() {
      const data: HomeData | null = await fetchFromStrapi('home', {
        populate: {
          banner: {
            populate: '*',
          },
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
              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <h3 className="text-lg font-semibold mb-2">API Response:</h3>
                <pre className="text-sm overflow-auto max-h-96">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Hero {...heroProps} />
      <InfoCards />
    </>
  );
}
