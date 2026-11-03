import { Placeholder } from "@/components/Placeholder";
import { Eyebrow } from "@/components/Soft";

export const Experience = () => (
  <section id="experience" data-testid="experience-section" className="section">
    <div><Eyebrow testId="experience-eyebrow" /></div>
    <h2 data-reveal className="section-title mt-6">Experience</h2>
    <div data-reveal className="mt-12 text-measure">
      <Placeholder testId="experience-placeholder">experience entries</Placeholder>
    </div>
  </section>
);
