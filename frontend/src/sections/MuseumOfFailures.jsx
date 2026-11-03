import { Placeholder } from "@/components/Placeholder";

const cards = ["Skills", "Education", "Achievements", "Contact"];

export const MuseumOfFailures = () => (
  <section data-testid="museum-section" className="section">
    <h2 data-reveal className="section-title">Museum of Failures</h2>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <article key={c} data-reveal data-testid={`museum-card-${c.toLowerCase()}`} className="card">
          <h3 className="text-lg font-semibold">{c}</h3>
          <p className="mt-3">
            <Placeholder>{c.toLowerCase()} text</Placeholder>
          </p>
        </article>
      ))}
    </div>
  </section>
);
