import { Placeholder } from "@/components/Placeholder";
import { Bezel, Eyebrow } from "@/components/Soft";

const cards = [
  { title: "Skills", span: "md:col-span-7 md:row-span-2" },
  { title: "Education", span: "md:col-span-5" },
  { title: "Achievements", span: "md:col-span-5" },
  { title: "Contact", span: "md:col-span-12" },
];

export const MuseumOfFailures = () => (
  <div id="museum" data-testid="museum-section" className="panel-green">
    <section className="section">
      <div><Eyebrow testId="museum-eyebrow" /></div>
      <h2 data-reveal className="section-title mt-6">Museum of Failures</h2>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        {cards.map((c) => (
          <Bezel key={c.title} className={c.span} testId={`museum-card-${c.title.toLowerCase()}`}>
            <h3 className="text-3xl font-medium">{c.title}</h3>
            <p className="mt-4 text-measure">
              <Placeholder>{c.title.toLowerCase()} text</Placeholder>
            </p>
          </Bezel>
        ))}
      </div>
    </section>
  </div>
);
