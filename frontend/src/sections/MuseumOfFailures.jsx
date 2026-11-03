import { Placeholder } from "@/components/Placeholder";
import { Bezel, Eyebrow, PillButton } from "@/components/Soft";

const exhibits = [
  { n: 1, span: "md:col-span-7" },
  { n: 2, span: "md:col-span-5" },
  { n: 3, span: "md:col-span-5" },
  { n: 4, span: "md:col-span-7" },
];
const fields = ["Problem", "Decision", "Outcome", "Lesson"];

export const MuseumOfFailures = () => (
  <div id="museum" data-testid="museum-section" className="panel-green">
    <section className="section">
      <div><Eyebrow testId="museum-eyebrow" /></div>
      <h2 data-reveal className="section-title mt-6">Museum of Failures</h2>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        {exhibits.map(({ n, span }) => (
          <Bezel key={n} className={span} testId={`museum-exhibit-${n}`}>
            <h3 className="text-3xl font-medium">
              <Placeholder>exhibit {n} title</Placeholder>
            </h3>
            <dl className="mt-6 flex flex-col gap-4">
              {fields.map((f) => (
                <div key={f} data-testid={`museum-exhibit-${n}-${f.toLowerCase()}`}>
                  <dt className="text-sm font-medium">{f}</dt>
                  <dd className="mt-1"><Placeholder>{f.toLowerCase()}</Placeholder></dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <PillButton href="#" label="Read the full story" testId={`museum-exhibit-${n}-story-btn`} title="Placeholder: full story link" />
            </div>
          </Bezel>
        ))}
      </div>
    </section>
  </div>
);
