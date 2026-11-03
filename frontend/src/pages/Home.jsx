import { useRef } from "react";
import { useReveal } from "@/lib/smoothScroll";
import { Hero } from "@/sections/Hero";
import { Timeline } from "@/sections/Timeline";
import { MuseumOfFailures } from "@/sections/MuseumOfFailures";
import { SimpleSection } from "@/sections/SimpleSection";

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <main ref={ref} data-testid="home-page">
      <Hero />
      <Timeline />
      <MuseumOfFailures />
      <SimpleSection id="skills" title="Skills" />
      <SimpleSection id="achievements" title="Achievements" />
      <SimpleSection id="contact" title="Contact" />
    </main>
  );
}
