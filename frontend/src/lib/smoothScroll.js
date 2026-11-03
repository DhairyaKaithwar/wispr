import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("soft", "0.32,0.72,0,1");

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useSmoothScroll = () => {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -24 } });
    window.__lenis = lenis;
    if (document.documentElement.style.overflow === "hidden") lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
};

export const useReveal = (ref) => {
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]");
      gsap.set(items, { opacity: 0, y: 16 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", stagger: 0.06 }),
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
};
