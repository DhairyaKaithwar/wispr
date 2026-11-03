import { Placeholder } from "@/components/Placeholder";

const links = [
  { label: "Resume", id: "resume", note: "resume link" },
  { label: "LinkedIn", id: "linkedin", note: "LinkedIn URL" },
  { label: "GitHub", id: "github", note: "GitHub URL" },
  { label: "Email", id: "email", note: "email address" },
];

export const Hero = () => (
  <section data-testid="hero-section" className="section min-h-[100svh] flex flex-col justify-center">
    <h1 data-reveal data-testid="hero-name" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
      Dhairya
    </h1>
    <p data-reveal data-testid="hero-positioning" className="mt-4 text-base md:text-lg">
      <Placeholder>one-line positioning</Placeholder>
    </p>
    <div data-reveal className="mt-8 flex flex-wrap gap-3">
      {links.map((l) => (
        <a key={l.id} href="#" data-testid={`hero-${l.id}-btn`} title={`Placeholder: ${l.note}`} className="btn">
          {l.label}
        </a>
      ))}
    </div>
  </section>
);
