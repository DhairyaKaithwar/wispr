import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const KEY = "theme";
const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const applyTheme = (dark) => {
  const swap = () => {
    document.documentElement.classList.toggle("dark", dark);
    window.dispatchEvent(new Event("themechange"));
  };
  if (document.startViewTransition && !reduced()) return document.startViewTransition(swap);
  const root = document.documentElement;
  root.classList.add("theme-fade");
  swap();
  setTimeout(() => root.classList.remove("theme-fade"), 450);
};

const useTheme = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (localStorage.getItem(KEY)) return;
      setDark(mq.matches);
      applyTheme(mq.matches);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    localStorage.setItem(KEY, next ? "dark" : "light");
    setDark(next);
    applyTheme(next);
  };
  return [dark, toggle];
};

export const ThemeCord = () => {
  const [dark, toggle] = useTheme();
  const cord = useRef(null);
  const drag = useRef(null);

  const spring = (from = 28) => {
    if (reduced()) return;
    gsap.fromTo(cord.current, { y: from }, { y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)", overwrite: true });
  };

  const onPointerDown = (e) => {
    drag.current = { y0: e.clientY, dy: 0, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dy = Math.max(0, Math.min(72, e.clientY - drag.current.y0));
    drag.current.dy = dy;
    if (dy > 4) drag.current.moved = true;
    gsap.set(cord.current, { y: dy });
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    if (d.dy > 28) toggle();
    spring(d.dy);
  };
  const onClick = (e) => {
    if (e.currentTarget.dataset.dragged === "1") {
      e.currentTarget.dataset.dragged = "0";
      return;
    }
    toggle();
    spring();
  };

  return (
    <button
      type="button"
      className="cord"
      data-testid="theme-cord-toggle"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => {
        e.currentTarget.dataset.dragged = drag.current?.moved ? "1" : "0";
        onPointerUp();
      }}
      onClick={onClick}
    >
      <span ref={cord} className="cord-inner" aria-hidden="true">
        <span className="cord-line" />
        <span className="cord-knob" />
      </span>
    </button>
  );
};
