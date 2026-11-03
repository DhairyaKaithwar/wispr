import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PillButton } from "@/components/Soft";
import { Halftone } from "@/components/Halftone";
import { RoleFlip } from "@/components/RoleFlip";
import { hero, links, roles } from "@/content";

const buttons = [
  { label: "Resume", id: "resume", href: links.resume, external: true },
  { label: "LinkedIn", id: "linkedin", href: links.linkedin, external: true },
  { label: "GitHub", id: "github", href: links.github, external: true },
  { label: "Email", id: "email", href: links.email },
];

export const Hero = ({ ready }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-in", { y: 24, opacity: 0, duration: 0.9, ease: "soft", stagger: 0.08, delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} data-testid="hero-section" className={`hero ${ready ? "is-ready" : ""}`}>
      <div className="hero-visual">
        <span data-hero-title data-testid="hero-title" className="hero-word" aria-hidden="true" style={{ visibility: ready ? "visible" : "hidden" }}>
          Portfolio<span className="title-dot" />
        </span>
        <Halftone play={ready} />
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-greeting hero-in" data-testid="hero-greeting">
            Hi, I'm Dhairya. I am a
            <span className="sr-only"> {roles.join(", ")}</span>
            <RoleFlip roles={roles} />
          </h1>
          <p data-testid="hero-positioning" className="hero-in hero-lead">{hero.positioning}</p>
          <p data-testid="hero-subline" className="hero-in secondary mt-4">{hero.subline}</p>
          <div className="hero-in mt-10 flex flex-wrap gap-3">
            {buttons.map((b) => (
              <PillButton key={b.id} href={b.href} label={b.label} external={b.external} testId={`hero-${b.id}-btn`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
