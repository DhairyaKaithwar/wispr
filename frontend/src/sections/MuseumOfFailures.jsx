import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillButton } from "@/components/Soft";
import { Num } from "@/components/Num";
import { exhibits } from "@/content";

gsap.registerPlugin(ScrollTrigger);

const fields = ["Problem", "Decision", "Outcome", "Lesson"];
const pad = (n) => String(n).padStart(2, "0");
const LEAD = 0.08;
const stepOf = (p) => (p < LEAD ? -1 : Math.min(exhibits.length - 1, Math.floor(((p - LEAD) / (1 - LEAD)) * exhibits.length)));

const Plaque = ({ ex, n }) => (
  <div className="plaque" data-testid={`museum-exhibit-${n}`}>
    <div className="plaque-card">
      <p className="plaque-no">Exhibit {pad(n)}</p>
      <h3 className="plaque-title">{ex.title}</h3>
      <dl className="plaque-grid">
        {fields.map((f) => (
          <div key={f} data-testid={`museum-exhibit-${n}-${f.toLowerCase()}`}>
            <dt className="plaque-label">{f}</dt>
            <dd className="mt-1"><Num text={ex[f]} /></dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <PillButton href={`/museum-of-failures/${n}`} label="Read the full story" testId={`museum-exhibit-${n}-story-btn`} />
      </div>
    </div>
  </div>
);

const Door = ({ ex, n, open, onOpen }) => (
  <div className={`doorway ${open ? "is-open" : ""}`} data-testid={`museum-door-${n}`}>
    <div className="doorway-light" aria-hidden="true" />
    <Plaque ex={ex} n={n} />
    <button
      type="button"
      className="door-leaf"
      onClick={onOpen}
      aria-label={`Open exhibit ${pad(n)}: ${ex.title}`}
      aria-expanded={open}
      tabIndex={open ? -1 : 0}
      data-testid={`museum-door-${n}-leaf`}
    >
      <span className="door-no">Exhibit {pad(n)}</span>
      <span className="door-title">{ex.title}</span>
      <span className="door-knob" aria-hidden="true" />
    </button>
  </div>
);

const usePinnedDoors = (panel, bar, trigger, setActive, setMode) => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      setMode("pinned");
      trigger.current = ScrollTrigger.create({
        trigger: panel.current,
        pin: true,
        start: "top top",
        end: () => `+=${window.innerHeight * 3.2}`,
        onUpdate: (st) => {
          gsap.set(bar.current, { scaleX: st.progress });
          setActive(stepOf(st.progress));
        },
      });
      return () => setMode("stack");
    });
    return () => mm.revert();
  }, [panel, bar, trigger, setActive, setMode]);
};

const useStackedDoors = (panel, mode, setOpened) => {
  useEffect(() => {
    if (mode !== "stack" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const doors = panel.current.querySelectorAll(".doorway");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        const i = [...doors].indexOf(target);
        setOpened((o) => o.map((v, k) => v || k === i));
        io.unobserve(target);
      });
    }, { threshold: 0.55 });
    doors.forEach((d) => io.observe(d));
    return () => io.disconnect();
  }, [panel, mode, setOpened]);
};

export const MuseumOfFailures = () => {
  const panel = useRef(null);
  const bar = useRef(null);
  const trigger = useRef(null);
  const [active, setActive] = useState(-1);
  const [mode, setMode] = useState("stack");
  const [opened, setOpened] = useState(() => exhibits.map(() => false));
  usePinnedDoors(panel, bar, trigger, setActive, setMode);
  useStackedDoors(panel, mode, setOpened);

  const open = (i) => {
    const st = trigger.current;
    if (mode === "pinned" && st) {
      const p = LEAD + ((i + 0.5) / exhibits.length) * (1 - LEAD);
      const y = st.start + p * (st.end - st.start);
      return window.__lenis ? window.__lenis.scrollTo(y) : window.scrollTo(0, y);
    }
    setOpened((o) => o.map((v, k) => v || k === i));
  };

  const count = Math.max(1, active + 1);
  return (
    <div id="museum" ref={panel} data-testid="museum-section" className={`panel-green museum-panel ${mode === "pinned" ? "is-pinned" : ""}`}>
      <section className="section museum-inner">
        <div className="flex items-end justify-between gap-8">
          <h2 data-reveal className="section-title">Museum of Failures</h2>
          <div className="museum-progress" data-testid="museum-progress" aria-hidden="true">
            <span className="museum-count" data-testid="museum-progress-count">{pad(count)} / {pad(exhibits.length)}</span>
            <span className="museum-bar"><span ref={bar} className="museum-bar-fill" /></span>
          </div>
        </div>
        <div className="doors" data-testid="museum-doors">
          {exhibits.map((ex, i) => (
            <Door key={ex.title} ex={ex} n={i + 1} open={mode === "pinned" ? i === active : opened[i]} onOpen={() => open(i)} />
          ))}
        </div>
      </section>
    </div>
  );
};
