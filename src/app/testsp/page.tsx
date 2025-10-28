'use server';

import { Hero, type HeroProps } from "@/app/(home)/(sections)/Hero";
import { fetchFromStrapi } from "@/lib/api";
import { InfoCards } from "@/app/(home)/(sections)/InfoCards";
import { FeedbackSection } from "@/app/(home)/(sections)/FeedbackSection";
import { StrapiApiTester } from "@/app/(home)/(sections)/StrapiApiTester";

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
  cards: {
    id: number;
    title: string;
    description: { type: string, children: { text: string }[] }[];
    buttonText: string;
    buttonLink: string;
    icon: string;
  }[];
  feedback: {
    id: number;
    title: string;
    buttonText: string;
    buttonLink: string;
    icon: string;
  }[];
};

export default async function Home() {
  const homeData: HomeData | null = await fetchFromStrapi('home', {
    populate: {
      banner: {
        populate: '*',
      },
      cards: {
        populate: '*',
      },
      feedback: {
        populate: '*',
      }
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
    <>
      <Hero {...heroProps} />
      <InfoCards cards={homeData?.cards} />
      <FeedbackSection feedbackItems={homeData?.feedback} />
      <StrapiApiTester />
    </>
  );
}