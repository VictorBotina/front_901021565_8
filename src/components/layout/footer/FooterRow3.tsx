import { FooterAccordion } from "./FooterAccordion";

export type FooterRow3Data = {
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

type FooterRow3Props = {
  data: FooterRow3Data;
};

export function FooterRow3({ data }: FooterRow3Props) {
  if (!data) return null;

  return (
    <div className="mb-8 border-b pb-8">
      <h3 className="mb-4 text-xl font-bold text-center text-title">{data.title}</h3>
      <FooterAccordion accordions={data.accordions} />
    </div>
  );
}
