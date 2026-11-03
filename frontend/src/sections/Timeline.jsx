import { Placeholder } from "@/components/Placeholder";
import { Eyebrow } from "@/components/Soft";
import { timeline } from "@/content";

export const Timeline = () => (
  <section id="timeline" data-testid="timeline-section" className="section">
    <div><Eyebrow testId="timeline-eyebrow" /></div>
    <h2 data-reveal className="section-title mt-6">Let's go back in time</h2>
    <ol className="mt-16 flex flex-col gap-20">
      {timeline.map((t, i) => (
        <li key={t.year + t.entry} data-reveal data-testid={`timeline-entry-${i + 1}`} className="text-measure">
          <p className="timeline-year" data-testid={`timeline-year-${i + 1}`}>{t.year}</p>
          <h3 className="mt-4 text-2xl md:text-3xl font-medium">{t.entry}</h3>
          {t.meta && <p className="mt-2 muted">{t.meta}</p>}
          {t.details.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3 list-disc pl-5">
              {t.details.map((d) => <li key={d}>{d}</li>)}
            </ul>
          )}
          {t.placeholder && <p className="mt-6"><Placeholder>{t.placeholder}</Placeholder></p>}
        </li>
      ))}
    </ol>
  </section>
);
