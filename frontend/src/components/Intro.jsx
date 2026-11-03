import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

const NAME = "Dhairya";
const WORD = "Portfolio";
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BARS = [0.35, 0.7, 0.5, 1, 0.65, 0.85, 0.4];
const T = { dot: 1.25, fall: 1.85, morph: 3.55, settle: 5.05 };

gsap.registerPlugin(CustomEase);
CustomEase.create("land", "M0,0 C0.25,0 0.38,0.62 0.48,1 0.56,0.9 0.66,0.88 0.76,1 0.84,0.97 0.92,0.97 1,1");

const centerOf = (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
};

const flipTo = (row) => {
  const hero = document.querySelector("[data-hero-title]");
  const hr = hero.getBoundingClientRect();
  const wr = row.getBoundingClientRect();
  return {
    x: gsap.getProperty(row, "x") + hr.left - wr.left,
    y: gsap.getProperty(row, "y") + hr.top - wr.top,
    scale: hr.width / row.offsetWidth,
    color: getComputedStyle(hero).color,
  };
};

const buildTimeline = (el, finish) => {
  const q = gsap.utils.selector(el);
  const letters = q(".intro-letter");
  const [pill, row, dot] = [q(".intro-pill")[0], q(".intro-word")[0], q(".intro-dot")[0]];
  const recenter = (d = 0.3) => gsap.to(row, { x: -row.offsetWidth / 2, duration: d, ease: "soft", overwrite: "auto" });
  gsap.set(row, { x: -row.offsetWidth / 2, y: -row.offsetHeight / 2 });
  gsap.set(dot, { opacity: 0 });
  const t = gsap.timeline({ onComplete: finish });

  gsap.to(q(".intro-bar"), { scaleY: 0.2, duration: 0.32, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: 0.06, from: "center" } });
  t.from(pill, { scale: 0.6, opacity: 0, duration: 0.6, ease: "soft" }, 0.15);
  t.to(q(".intro-bar"), { opacity: 0, duration: 0.2 }, T.dot);
  t.to(pill, {
    width: () => centerOf(dot).w, height: () => centerOf(dot).h, padding: 0, backgroundColor: "#FFA946", borderColor: "#FFA946",
    x: () => centerOf(dot).x - centerOf(pill).x, y: () => centerOf(dot).y - centerOf(pill).y,
    duration: 0.55, ease: "soft",
  }, T.dot + 0.05);
  t.set(dot, { opacity: 1 }, T.dot + 0.6);
  t.set(pill, { opacity: 0 }, T.dot + 0.6);

  letters.slice(0, NAME.length).forEach((l, i) => {
    t.from(l, { y: -window.innerHeight * 0.7, duration: 0.85, ease: "land" }, T.fall + i * 0.17);
    t.from(l, { rotation: gsap.utils.random(-140, 140), duration: 0.85, ease: "power3.out" }, T.fall + i * 0.17);
  });

  WORD.split("").forEach((ch, i) => {
    const l = letters[i];
    const at = T.morph + i * 0.15;
    t.call(() => { l.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]; }, null, at);
    t.call(() => { l.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]; }, null, at + 0.05);
    t.call(() => { l.textContent = ch; recenter(); }, null, at + 0.1);
    t.fromTo(l, { y: -10, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "soft", immediateRender: false }, at);
  });

  t.to(q(".intro-skip")[0], { opacity: 0, duration: 0.3 }, T.settle);
  t.to(q(".intro-bg")[0], { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "soft" }, T.settle);
  t.to(row, {
    x: () => flipTo(row).x, y: () => flipTo(row).y, scale: () => flipTo(row).scale, color: () => flipTo(row).color,
    duration: 0.95, ease: "soft",
  }, T.settle);
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
        <div className="intro-word" data-testid="intro-word">
          {WORD.split("").map((_, i) => (
            <span key={i} className="intro-letter">{NAME[i] || ""}</span>
          ))}
          <span className="intro-dot title-dot" />
        </div>
        <div className="intro-pill" data-testid="intro-pill">
          {BARS.map((b, i) => <span key={i} className="intro-bar" style={{ height: `${b * 18}px` }} />)}
        </div>
      </div>
      <button type="button" onClick={skip} data-testid="intro-skip-btn" className="intro-skip">Skip</button>
    </div>
  );
};
