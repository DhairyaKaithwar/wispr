import { useRef } from "react";
import { useReveal } from "@/lib/smoothScroll";
import { Hero } from "@/sections/Hero";
import { Experience } from "@/sections/Experience";
import { MuseumOfFailures } from "@/sections/MuseumOfFailures";

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <main ref={ref} data-testid="home-page">
      <Hero />
      <Experience />
      <MuseumOfFailures />
    </main>
  );
}
