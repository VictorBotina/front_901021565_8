import { FooterAccordion } from "./FooterAccordion";

export type FooterRow4Data = {
  id: number;
  title: string;
  accordions: {
    id: number;
    title: string;
    links: {
      id: number;
      label: string;
      url: string;
    }[];
  }[];
};

type FooterRow4Props = {
  data: FooterRow4Data;
};

export function FooterRow4({ data }: FooterRow4Props) {
  if (!data) return null;

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold text-center text-title">{data.title}</h3>
      <FooterAccordion accordions={data.accordions} />
    </div>
  );
}
