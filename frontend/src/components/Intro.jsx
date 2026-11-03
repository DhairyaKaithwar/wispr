import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAME = "Dhairya";
const WORD = "Portfolio";
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BARS = [0.35, 0.7, 0.5, 1, 0.65, 0.85, 0.4];

const flipTo = (word) => {
  const hero = document.querySelector("[data-hero-title]");
  const hr = hero.getBoundingClientRect();
  const wr = word.getBoundingClientRect();
  const scale = parseFloat(getComputedStyle(hero).fontSize) / parseFloat(getComputedStyle(word).fontSize);
  return { x: hr.left - wr.left, y: hr.top - wr.top, scale, color: getComputedStyle(hero).color };
};

const buildTimeline = (el, finish) => {
  const q = gsap.utils.selector(el);
  const letters = q(".intro-letter");
  const pill = q(".intro-pill")[0];
  const word = q(".intro-word")[0];
  const pr = pill.getBoundingClientRect();
  const t = gsap.timeline({ onComplete: finish });

  gsap.to(q(".intro-bar"), { scaleY: 0.2, duration: 0.32, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: 0.06, from: "center" } });
  t.from(pill, { scale: 0.8, opacity: 0, duration: 0.5, ease: "soft" });
  t.to(pill, { scale: 1.06, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.3);
  letters.slice(0, NAME.length).forEach((l, i) => {
    const r = l.getBoundingClientRect();
    t.from(l, {
      x: pr.left + pr.width / 2 - (r.left + r.width / 2),
      y: pr.top + pr.height / 2 - (r.top + r.height / 2),
      rotate: gsap.utils.random(-25, 25),
      scale: 0.15,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, 0.6 + i * 0.08);
  });
  t.to(pill, { y: -12, scale: 0.7, opacity: 0, duration: 0.4, ease: "soft" }, 1.4);
  WORD.split("").forEach((ch, i) => {
    const l = letters[i];
    const o = { v: 0 };
    t.to(o, {
      v: 1,
      duration: 0.26,
      ease: "none",
      onStart: () => gsap.set(l, { opacity: 1 }),
      onUpdate: () => { l.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]; },
      onComplete: () => { l.textContent = ch; },
    }, 1.7 + i * 0.08);
  });
  t.to(q(".intro-skip")[0], { opacity: 0, duration: 0.3 }, 2.65);
  t.to(q(".intro-bg")[0], { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "soft" }, 2.65);
  t.to(word, {
    x: () => flipTo(word).x,
    y: () => flipTo(word).y,
    scale: () => flipTo(word).scale,
    color: () => flipTo(word).color,
    duration: 0.85,
    ease: "soft",
  }, 2.65);
  return t;
};

export const Intro = ({ onDone }) => {
  const root = useRef(null);
  const tl = useRef(null);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    window.__lenis?.start();
    document.documentElement.style.overflow = "";
    sessionStorage.setItem("introPlayed", "1");
    onDone();
  };

  useEffect(() => {
    let cancelled = false;
    let ctx;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => window.__lenis?.stop());
    const fonts = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
    fonts.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => { tl.current = buildTimeline(root.current, finish); }, root);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => (tl.current ? tl.current.progress(1) : finish());

  return (
    <div ref={root} data-testid="intro-overlay" className="intro">
      <div className="intro-bg" aria-hidden="true" />
      <div className="intro-stage" aria-hidden="true">
        <div className="intro-pill" data-testid="intro-pill">
          {BARS.map((b, i) => <span key={i} className="intro-bar" style={{ height: `${b * 18}px` }} />)}
        </div>
        <div className="intro-word" data-testid="intro-word">
          {WORD.split("").map((_, i) => (
            <span key={i} className="intro-letter" style={i >= NAME.length ? { opacity: 0 } : undefined}>
              {NAME[i] || ""}
            </span>
          ))}
        </div>
      </div>
      <button type="button" onClick={skip} data-testid="intro-skip-btn" className="intro-skip">Skip</button>
    </div>
  );
};
