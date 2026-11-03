import { useCallback, useRef, useState } from "react";
import { useReveal } from "@/lib/smoothScroll";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/components/Intro";
import { Timeline } from "@/sections/Timeline";
import { MuseumOfFailures } from "@/sections/MuseumOfFailures";
import { SimpleSection } from "@/sections/SimpleSection";
import { Placeholder } from "@/components/Placeholder";
import { skills, achievements } from "@/content";

const skipIntro = () =>
  sessionStorage.getItem("introPlayed") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const ref = useRef(null);
  const [ready, setReady] = useState(skipIntro);
  const onIntroDone = useCallback(() => setReady(true), []);
  useReveal(ref);
  return (
    <main ref={ref} data-testid="home-page">
      {!ready && <Intro onDone={onIntroDone} />}
      <Hero ready={ready} />
      <Timeline />
      <MuseumOfFailures />
      <SimpleSection id="skills" title="Skills">
        <dl className="flex flex-col gap-6">
          {skills.map((s) => (
            <div key={s.group} data-testid={`skills-${s.group.split(" ")[0].toLowerCase()}`}>
              <dt className="text-sm font-medium muted">{s.group}</dt>
              <dd className="mt-1">{s.items}</dd>
            </div>
          ))}
        </dl>
      </SimpleSection>
      <SimpleSection id="achievements" title="Achievements">
        <ul className="flex flex-col gap-3 list-disc pl-5" data-testid="achievements-list">
          {achievements.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </SimpleSection>
      <SimpleSection id="contact" title="Contact">
        <Placeholder testId="contact-placeholder">contact content</Placeholder>
      </SimpleSection>
    </main>
  );
}
