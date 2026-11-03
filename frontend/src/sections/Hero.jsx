import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PillButton } from "@/components/Soft";
import { Halftone } from "@/components/Halftone";
import { hero } from "@/content";

const links = [
  { label: "Resume", id: "resume", note: "resume link" },
  { label: "LinkedIn", id: "linkedin", note: "LinkedIn URL" },
  { label: "GitHub", id: "github", note: "GitHub URL" },
  { label: "Email", id: "email", note: "email address" },
];

export const Hero = ({ ready }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-in", { y: 24, opacity: 0, filter: "blur(8px)", duration: 0.9, ease: "soft", stagger: 0.08, delay: 0.2, clearProps: "filter" });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={ref} data-testid="hero-section" className={`hero ${ready ? "is-ready" : ""}`}>
      <Halftone play={ready} />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-in" data-testid="hero-eyebrow">[PLACEHOLDER: eyebrow label]</span>
          <p data-testid="hero-positioning" className="hero-in mt-8 text-lg md:text-2xl leading-snug">
            {hero.positioning}
          </p>
          <p data-testid="hero-subline" className="hero-in mt-4 text-base md:text-lg muted">
            {hero.subline}
          </p>
          <div className="hero-in mt-10 flex flex-wrap gap-3">
            {links.map((l) => (
              <PillButton key={l.id} href="#" label={l.label} testId={`hero-${l.id}-btn`} title={`Placeholder: ${l.note}`} />
            ))}
          </div>
        </div>
        <h1 data-hero-title data-testid="hero-title" className="hero-title" style={{ visibility: ready ? "visible" : "hidden" }}>
          Portfolio
        </h1>
      </div>
    </section>
  );
};
