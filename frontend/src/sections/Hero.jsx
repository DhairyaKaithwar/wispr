import { PillButton, Eyebrow } from "@/components/Soft";
import { hero } from "@/content";

const links = [
  { label: "Resume", id: "resume", note: "resume link" },
  { label: "LinkedIn", id: "linkedin", note: "LinkedIn URL" },
  { label: "GitHub", id: "github", note: "GitHub URL" },
  { label: "Email", id: "email", note: "email address" },
];

export const Hero = () => (
  <section data-testid="hero-section" className="section min-h-[100dvh] flex flex-col justify-center">
    <div><Eyebrow testId="hero-eyebrow" /></div>
    <h1 data-reveal data-testid="hero-name" className="hero-title mt-8">
      Dhairya
    </h1>
    <p data-reveal data-testid="hero-positioning" className="mt-8 text-measure text-lg md:text-2xl">
      {hero.positioning}
    </p>
    <p data-reveal data-testid="hero-subline" className="mt-4 text-measure text-base md:text-lg muted">
      {hero.subline}
    </p>
    <div data-reveal className="mt-12 flex flex-wrap gap-4">
      {links.map((l) => (
        <PillButton key={l.id} href="#" label={l.label} testId={`hero-${l.id}-btn`} title={`Placeholder: ${l.note}`} />
      ))}
    </div>
  </section>
);
