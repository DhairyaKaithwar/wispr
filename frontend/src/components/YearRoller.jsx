import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STRIP = "0123456789".split("");

export const YearRoller = ({ digits }) => {
  const ref = useRef(null);
  useEffect(() => {
    const strips = ref.current.querySelectorAll(".roller-strip");
    digits.split("").forEach((d, i) => {
      gsap.to(strips[i], { yPercent: -Number(d) * 10, duration: 0.9, ease: "soft", delay: i * 0.09, overwrite: true });
    });
  }, [digits]);

  return (
    <div ref={ref} className="roller" data-testid="timeline-year-roller" aria-label={digits} role="img">
      {digits.split("").map((_, i) => (
        <span key={i} className="roller-col" aria-hidden="true">
          <span className="roller-strip">
            {STRIP.map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </div>
  );
};
