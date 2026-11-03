import { useRef } from "react";
import { Placeholder } from "@/components/Placeholder";
import { useReveal } from "@/lib/smoothScroll";

export default function Whisper() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <main ref={ref} data-testid="whisper-page" className="section min-h-[100dvh]">
      <div data-reveal>
        <Placeholder testId="whisper-placeholder">/whisper page content</Placeholder>
      </div>
    </main>
  );
}
