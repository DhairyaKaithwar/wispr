import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bezel, Eyebrow, PillButton } from "@/components/Soft";
import { exhibits } from "@/content";
import { Num } from "@/components/Num";

gsap.registerPlugin(ScrollTrigger);

const fields = ["Problem", "Decision", "Outcome", "Lesson"];

const usePinnedTrack = (panel, track, bar, setActive) => {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.current.scrollWidth - track.current.parentElement.clientWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: panel.current,
          pin: true,
          start: "top top",
          end: () => `+=${distance() * 1.5}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            gsap.set(bar.current, { scaleX: st.progress });
            setActive(Math.min(exhibits.length, Math.floor(st.progress * exhibits.length) + 1));
          },
        },
      });
    });
    return () => mm.revert();
  }, [panel, track, bar, setActive]);
};

const Exhibit = ({ ex, n }) => (
  <Bezel className="exhibit" testId={`museum-exhibit-${n}`}>
    <h3 className="text-2xl md:text-3xl font-medium">{n}. {ex.title}</h3>
    <dl className="mt-6 flex flex-col gap-4">
      {fields.map((f) => (
        <div key={f} data-testid={`museum-exhibit-${n}-${f.toLowerCase()}`}>
          <dt className="text-sm font-medium muted">{f}</dt>
          <dd className="mt-1"><Num text={ex[f]} /></dd>
        </div>
      ))}
    </dl>
    <div className="mt-8">
      <PillButton href={`/museum-of-failures/${n}`} label="Read the full story" testId={`museum-exhibit-${n}-story-btn`} />
    </div>
  </Bezel>
);

export const MuseumOfFailures = () => {
  const panel = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [active, setActive] = useState(1);
  usePinnedTrack(panel, track, bar, setActive);

  return (
    <div id="museum" ref={panel} data-testid="museum-section" className="panel-green museum-panel">
      <section className="section museum-inner">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div><Eyebrow testId="museum-eyebrow" /></div>
            <h2 data-reveal className="section-title mt-6">Museum of Failures</h2>
          </div>
          <div className="museum-progress" data-testid="museum-progress" aria-hidden="true">
            <span className="museum-count" data-testid="museum-progress-count">
              {String(active).padStart(2, "0")} / {String(exhibits.length).padStart(2, "0")}
            </span>
            <span className="museum-bar"><span ref={bar} className="museum-bar-fill" /></span>
          </div>
        </div>
        <div className="museum-viewport">
          <div ref={track} className="museum-track" data-testid="museum-track">
            {exhibits.map((ex, i) => <Exhibit key={ex.title} ex={ex} n={i + 1} />)}
          </div>
        </div>
      </section>
    </div>
  );
};
