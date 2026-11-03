import { useCallback, useRef, useState } from "react";
import { useReveal, useCountUp } from "@/lib/smoothScroll";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/components/Intro";
import { Timeline } from "@/sections/Timeline";
import { MuseumOfFailures } from "@/sections/MuseumOfFailures";
import { Skills, Achievements, Contact } from "@/sections/Closing";

const skipIntro = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const ref = useRef(null);
  const [ready, setReady] = useState(skipIntro);
  const onIntroDone = useCallback(() => setReady(true), []);
  useReveal(ref);
  useCountUp(ref);
  return (
    <main ref={ref} data-testid="home-page">
      {!ready && <Intro onDone={onIntroDone} />}
      <Hero ready={ready} />
      <Timeline />
      <MuseumOfFailures />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  );
}
