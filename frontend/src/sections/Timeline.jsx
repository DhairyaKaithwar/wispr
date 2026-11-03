import { Placeholder } from "@/components/Placeholder";
import { Eyebrow } from "@/components/Soft";

const entries = [1, 2, 3, 4];

export const Timeline = () => (
  <section id="timeline" data-testid="timeline-section" className="section">
    <div><Eyebrow testId="timeline-eyebrow" /></div>
    <h2 data-reveal className="section-title mt-6">Let's go back in time</h2>
    <ol className="mt-12 text-measure flex flex-col gap-8">
      {entries.map((n) => (
        <li key={n} data-reveal data-testid={`timeline-entry-${n}`}>
          <Placeholder>timeline entry {n} (experience or education)</Placeholder>
        </li>
      ))}
    </ol>
  </section>
);
