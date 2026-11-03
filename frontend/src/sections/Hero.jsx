import { Placeholder } from "@/components/Placeholder";

const links = [
  { label: "Resume", id: "resume", note: "resume link" },
  { label: "LinkedIn", id: "linkedin", note: "LinkedIn URL" },
  { label: "GitHub", id: "github", note: "GitHub URL" },
  { label: "Email", id: "email", note: "email address" },
];

export const Hero = () => (
  <section data-testid="hero-section" className="section min-h-[100svh] flex flex-col justify-center">
    <h1 data-reveal data-testid="hero-name" className="text-4xl sm:text-5xl lg:text-6xl font-medium">
      Dhairya
    </h1>
    <p data-reveal data-testid="hero-positioning" className="mt-6 text-measure text-base md:text-lg muted">
      <Placeholder>one-line positioning</Placeholder>
    </p>
    <div data-reveal className="mt-12 flex flex-wrap gap-4">
      {links.map((l) => (
        <a key={l.id} href="#" data-testid={`hero-${l.id}-btn`} title={`Placeholder: ${l.note}`} className="btn">
          {l.label}
        </a>
      ))}
    </div>
  </section>
);
