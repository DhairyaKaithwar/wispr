import { Placeholder } from "@/components/Placeholder";

export const Experience = () => (
  <section data-testid="experience-section" className="section">
    <h2 data-reveal className="section-title">Experience</h2>
    <div data-reveal className="mt-12 text-measure">
      <Placeholder testId="experience-placeholder">experience entries</Placeholder>
    </div>
  </section>
);
