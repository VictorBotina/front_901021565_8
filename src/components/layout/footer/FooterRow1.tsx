
export type FooterRow1Data = {
  id: number;
  title: string;
  subdivisions: {
    id: number;
    title: string;
    content: string;
  }[];
};

type FooterRow1Props = {
  data: FooterRow1Data;
};

export function FooterRow1({ data }: FooterRow1Props) {
  if (!data) return null;

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index} className="block">{line}</span>
    ));
  };

  return (
    <div className="mb-8 border-b pb-8">
      <h3 className="mb-6 text-xl font-bold text-center text-title">{data.title}</h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.subdivisions.map((item) => (
          <div key={item.id} className="text-sm">
            <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
            <div className="text-muted-foreground space-y-1">
              {renderContent(item.content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
