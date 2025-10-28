import { Hero } from "@/app/(home)/(sections)/Hero";
import { InfoCards } from "@/app/(home)/(sections)/InfoCards";
import { FeedbackSection } from "@/app/(home)/(sections)/FeedbackSection";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoCards />
      <FeedbackSection />
    </>
  );
}
