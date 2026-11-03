import { useRef } from "react";
import { Placeholder } from "@/components/Placeholder";
import { useReveal } from "@/lib/smoothScroll";

const logItems = [1, 2, 3];

export default function Whisper() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <main ref={ref} data-testid="whisper-page" className="section min-h-[100dvh]">
      <div data-reveal>
        <Placeholder testId="whisper-placeholder">/whisper page content</Placeholder>
      </div>
      <div data-reveal data-testid="whisper-video" className="video-slot mt-16">
        <Placeholder>video embed</Placeholder>
      </div>
      <section data-testid="voice-build-log" className="mt-24 text-measure">
        <h2 data-reveal className="section-title">Voice Build Log</h2>
        <ul data-reveal className="mt-8 flex flex-col gap-3 list-disc pl-5">
          {logItems.map((n) => (
            <li key={n} data-testid={`voice-build-log-item-${n}`}>
              <Placeholder>build log item {n}</Placeholder>
            </li>
          ))}
        </ul>
      </section>
      <p data-reveal data-testid="whisper-setup-item" className="mt-24 text-measure">
        <Placeholder>setup item</Placeholder>
      </p>
    </main>
  );
}
