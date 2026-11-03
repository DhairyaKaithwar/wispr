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
    const lenis = new Lenis({ anchors: { offset: -24 } });
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
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 64,
          filter: "blur(12px)",
          duration: 0.9,
          ease: "soft",
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
};
