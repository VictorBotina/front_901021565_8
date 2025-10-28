import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type AccordionData = {
  id: number;
  title: string;
  links: {
    id: number;
    label: string;
    url: string;
  }[];
}

type FooterAccordionProps = {
  accordions: AccordionData[];
};

export function FooterAccordion({ accordions }: FooterAccordionProps) {
  if (!accordions || accordions.length === 0) return null;

  return (
    <Accordion type="multiple" className="w-full">
      {accordions.map((accordion) => (
        <AccordionItem key={accordion.id} value={`item-${accordion.id}`}>
          <AccordionTrigger className="text-base font-semibold text-foreground">
            {accordion.title}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 py-2">
              {accordion.links.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
