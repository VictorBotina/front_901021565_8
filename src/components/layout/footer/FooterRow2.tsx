import Link from "next/link";
import { Button } from "@/components/ui/button";

export type FooterRow2Data = {
  id: number;
  title: string;
  subdivisions: {
    id: number;
    title: string;
    description: string;
    button_text: string;
    button_link: string;
  }[];
};

type FooterRow2Props = {
  data: FooterRow2Data;
};

export function FooterRow2({ data }: FooterRow2Props) {
  if (!data) return null;

  return (
    <div className="mb-8 border-b pb-8">
      <h3 className="mb-6 text-xl font-bold text-center text-title">{data.title}</h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.subdivisions.map((item) => (
          <div key={item.id} className="text-sm">
            <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
            {item.description && <p className="text-muted-foreground mb-4">{item.description}</p>}
            {item.button_text && item.button_link && (
              <Button asChild variant="outline" size="sm">
                <Link href={item.button_link}>{item.button_text}</Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
