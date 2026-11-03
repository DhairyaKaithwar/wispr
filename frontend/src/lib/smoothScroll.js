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

export const useCountUp = (ref) => {
  useEffect(() => {
    if (reducedMotion() || !ref.current) return;
    const els = ref.current.querySelectorAll("[data-count]");
    const tweens = [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        io.unobserve(target);
        const final = target.dataset.count;
        const value = parseFloat(final.replace(/,/g, ""));
        const decimals = (final.split(".")[1] || "").replace(/\D/g, "").length;
        const suffix = final.replace(/[\d.,]/g, "");
        const o = { v: 0 };
        target.style.minWidth = `${target.offsetWidth}px`;
        tweens.push(gsap.to(o, {
          v: value,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            target.textContent = o.v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
          },
          onComplete: () => { target.textContent = final; },
        }));
      });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      tweens.forEach((t) => t.kill());
      els.forEach((el) => { el.textContent = el.dataset.count; });
    };
  }, [ref]);
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
