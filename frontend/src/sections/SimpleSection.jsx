import { Placeholder } from "@/components/Placeholder";
import { Eyebrow } from "@/components/Soft";

export const SimpleSection = ({ id, title }) => (
  <section id={id} data-testid={`${id}-section`} className="section">
    <div><Eyebrow testId={`${id}-eyebrow`} /></div>
    <h2 data-reveal className="section-title mt-6">{title}</h2>
    <div data-reveal className="mt-12 text-measure">
      <Placeholder testId={`${id}-placeholder`}>{title.toLowerCase()} content</Placeholder>
    </div>
  </section>
);
