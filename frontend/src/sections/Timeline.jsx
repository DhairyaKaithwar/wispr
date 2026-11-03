import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Placeholder } from "@/components/Placeholder";
import { YearRoller } from "@/components/YearRoller";
import { timeline } from "@/content";
import { Num } from "@/components/Num";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");

const usePinnedYears = (section, setActive, setPinned) => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      setPinned(true);
      ScrollTrigger.create({
        trigger: section.current,
        pin: true,
        start: "top top",
        end: () => `+=${timeline.length * window.innerHeight * 0.7}`,
        onUpdate: (st) => setActive(Math.min(timeline.length - 1, Math.floor(st.progress * timeline.length))),
      });
      return () => setPinned(false);
    });
    return () => mm.revert();
  }, [section, setActive, setPinned]);
};

const Entry = ({ t, i, active }) => (
  <li data-reveal data-testid={`timeline-entry-${i + 1}`} className={`tl-entry ${active ? "is-active" : ""}`}>
    <span className="tl-dot" aria-hidden="true" />
    <p className="tl-year-mobile" data-testid={`timeline-year-${i + 1}`}>{t.year}</p>
    <p className="tl-range">{t.range}</p>
    <h3 className="tl-title">{t.entry}</h3>
    {t.meta && <p className="mt-2 secondary">{t.meta}</p>}
    {t.details.length > 0 && (
      <ul className="mt-4 flex flex-col gap-2 list-disc pl-5">
        {t.details.map((d) => <li key={d}><Num text={d} /></li>)}
      </ul>
    )}
    {t.placeholder && <p className="mt-4"><Placeholder>{t.placeholder}</Placeholder></p>}
  </li>
);

export const Timeline = () => {
  const section = useRef(null);
  const list = useRef(null);
  const glow = useRef(null);
  const anchor = useRef(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  usePinnedYears(section, setActive, setPinned);

  useEffect(() => {
    if (!pinned) {
      gsap.set(list.current, { y: 0 });
      return;
    }
    const entry = list.current.querySelectorAll(":scope > .tl-entry")[active];
    const offset = anchor.current.getBoundingClientRect().top - list.current.parentElement.getBoundingClientRect().top;
    gsap.to(list.current, { y: offset - entry.offsetTop, duration: 0.8, ease: "soft", overwrite: true });
    gsap.to(glow.current, { y: entry.offsetTop, duration: 0.8, ease: "soft", overwrite: true });
  }, [active, pinned]);

  const cur = timeline[active];
  return (
    <section id="timeline" ref={section} data-testid="timeline-section" className={`timeline ${pinned ? "is-pinned" : ""}`}>
      <div className="timeline-inner">
        <div className="timeline-left">
          <span data-reveal className="label-chip" data-testid="timeline-label">My story</span>
          <h2 data-reveal className="section-title timeline-heading mt-6">Let's go back in time</h2>
          <div className="timeline-year-box" ref={anchor}>
            <YearRoller digits={cur.digits} />
            <div className="tl-meta-row">
              <p className="tl-current-range muted" data-testid="timeline-current-range">{cur.range}</p>
              <p className="tl-counter" data-testid="timeline-counter">{pad(active + 1)} / {pad(timeline.length)}</p>
            </div>
          </div>
        </div>
        <div className="timeline-right">
          <ol ref={list} className="tl-list" data-testid="timeline-list">
            <span ref={glow} className="tl-glow" aria-hidden="true" data-testid="timeline-glow-dot" />
            {timeline.map((t, i) => <Entry key={t.entry} t={t} i={i} active={i === active} />)}
          </ol>
        </div>
      </div>
    </section>
  );
};
