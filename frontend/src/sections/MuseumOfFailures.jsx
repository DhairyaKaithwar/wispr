import { Bezel, Eyebrow, PillButton } from "@/components/Soft";
import { exhibits } from "@/content";

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const fields = ["Problem", "Decision", "Outcome", "Lesson"];

export const MuseumOfFailures = () => (
  <div id="museum" data-testid="museum-section" className="panel-green">
    <section className="section">
      <div><Eyebrow testId="museum-eyebrow" /></div>
      <h2 data-reveal className="section-title mt-6">Museum of Failures</h2>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12">
        {exhibits.map((ex, i) => (
          <Bezel key={ex.title} className={spans[i]} testId={`museum-exhibit-${i + 1}`}>
            <h3 className="text-3xl font-medium">{i + 1}. {ex.title}</h3>
            <dl className="mt-6 flex flex-col gap-4">
              {fields.map((f) => (
                <div key={f} data-testid={`museum-exhibit-${i + 1}-${f.toLowerCase()}`}>
                  <dt className="text-sm font-medium muted">{f}</dt>
                  <dd className="mt-1">{ex[f]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <PillButton href="#" label="Read the full story" testId={`museum-exhibit-${i + 1}-story-btn`} title="Placeholder: full story link" />
            </div>
          </Bezel>
        ))}
      </div>
    </section>
  </div>
);
