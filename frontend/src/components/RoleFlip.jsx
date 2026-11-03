import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const RoleFlip = ({ roles }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const tl = gsap.timeline({ repeat: -1 });
    roles.forEach((_, k) => {
      const next = roles[(k + 1) % roles.length];
      tl.to(el, { rotateX: -90, opacity: 0.4, duration: 0.35, ease: "power2.in" }, "+=1.65")
        .call(() => { el.textContent = next; })
        .fromTo(el, { rotateX: 90, opacity: 0.4 }, { rotateX: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)", immediateRender: false });
    });
    return () => {
      tl.kill();
      el.textContent = roles[0];
    };
  }, [roles]);

  return (
    <span className="role-wrap" aria-hidden="true">
      <span ref={ref} className="role-card" data-testid="hero-role-card">{roles[0]}</span>
    </span>
  );
};
