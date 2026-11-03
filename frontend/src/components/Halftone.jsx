import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SRC = "/portrait.webp";
const FOCAL = { x: 0.52, y: 0.5 };
const smooth = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const layoutFor = (w, h, ih) => {
  const mobile = w < 768;
  return mobile
    ? { cell: 4, scale: (0.56 * h) / ih, sx: 0.5 * w, sy: 0.29 * h, r0: 0.18 * h, r1: 0.36 * h, cutY: 0.5 * h }
    : { cell: 7, scale: (1.02 * h) / ih, sx: 0.7 * w, sy: 0.5 * h, r0: 0.3 * h, r1: 0.62 * h, cutY: 1.2 * h };
};

const buildDots = (img, w, h, titleTop) => {
  const L = layoutFor(w, h, img.height);
  if (titleTop) L.cutY = titleTop + (w < 768 ? -0.01 : 0.05) * h;
  const cols = Math.ceil(w / L.cell);
  const rows = Math.ceil(h / L.cell);
  const left = L.sx - FOCAL.x * img.width * L.scale;
  const top = L.sy - FOCAL.y * img.height * L.scale;
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const octx = off.getContext("2d", { willReadFrequently: true });
  octx.drawImage(img, left / L.cell, top / L.cell, (img.width * L.scale) / L.cell, (img.height * L.scale) / L.cell);
  const px = octx.getImageData(0, 0, cols, rows).data;
  const dots = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4;
      if (px[k + 3] < 200) continue;
      const lum = (0.299 * px[k] + 0.587 * px[k + 1] + 0.114 * px[k + 2]) / 255;
      const x = i * L.cell + L.cell / 2;
      const y = j * L.cell + L.cell / 2;
      const dist = Math.hypot(x - L.sx, y - L.sy);
      const weight = (1 - smooth(L.r0, L.r1, dist)) * (1 - smooth(L.cutY - 0.08 * h, L.cutY, y));
      const blue = smooth(0.07, 0.13, (px[k + 2] - px[k]) / 255);
      const r = (L.cell / 2) * 1.08 * smooth(0.3, 0.92, 1 - lum) * weight * (1 - blue);
      if (r < 0.35) continue;
      dots.push({ x, y, r, d: (dist / L.r1) * 0.22 + Math.random() * 0.3, ox: Math.random() * w, oy: Math.random() * h });
    }
  }
  return dots;
};

export const Halftone = ({ play }) => {
  const ref = useRef(null);
  const s = useRef({ p: 0, dots: [], img: null, played: false, w: 0 });

  useEffect(() => {
    const st = s.current;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    st.draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      if (!st.played) return;
      ctx.fillStyle = getComputedStyle(canvas).color;
      ctx.beginPath();
      for (const dt of st.dots) {
        const t = Math.min(1, Math.max(0, (st.p - dt.d) / 0.48));
        const e = 1 - Math.pow(1 - t, 4);
        const x = dt.ox + (dt.x - dt.ox) * e;
        const y = dt.oy + (dt.y - dt.oy) * e;
        const rr = 0.55 + (dt.r - 0.55) * e;
        if (rr < 0.3) continue;
        ctx.moveTo(x + rr, y);
        ctx.arc(x, y, rr, 0, Math.PI * 2);
      }
      ctx.fill();
    };
    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      st.w = w;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const title = document.querySelector("[data-hero-title]");
      const titleTop = title && title.getBoundingClientRect().top - canvas.getBoundingClientRect().top;
      st.dots = buildDots(st.img, w, h, titleTop);
      st.draw();
    };
    const img = new Image();
    img.src = SRC;
    img.onload = () => {
      st.img = img;
      build();
      st.start?.();
    };
    const onResize = () => st.img && canvas.clientWidth !== st.w && build();
    window.addEventListener("resize", onResize);
    const onTheme = () => st.draw();
    window.addEventListener("themechange", onTheme);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  useEffect(() => {
    if (!play) return;
    const st = s.current;
    st.start = () => {
      if (st.played) return;
      st.played = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        st.p = 1;
        return st.draw();
      }
      gsap.fromTo(st, { p: 0 }, { p: 1, duration: 2.6, ease: "none", onUpdate: st.draw });
    };
    if (st.img) st.start();
  }, [play]);

  return <canvas ref={ref} data-testid="hero-halftone" aria-label="Halftone portrait of Dhairya" role="img" className="halftone" />;
};
