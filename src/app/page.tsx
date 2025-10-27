'use server';

import { Hero, type HeroProps } from "@/app/(home)/(sections)/Hero";
import { fetchFromStrapi } from "@/lib/api";

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
    background_image?: {
      url: string;
      alternativeText?: string;
    };
  };
};

export default async function Home() {
  const homeData: HomeData | null = await fetchFromStrapi('home');

  const heroProps: HeroProps | null = homeData ? {
    title: homeData.banner.title,
    description: homeData.banner.description.map(d => d.children.map(c => c.text).join(' ')).join('\n'),
    image: homeData.banner.background_image ? {
      url: homeData.banner.background_image.url,
      alt: homeData.banner.background_image.alternativeText || homeData.banner.title,
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
      <Hero {...heroProps} />
    </>
  );
}
