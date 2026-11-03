import { Placeholder } from "@/components/Placeholder";

const cards = ["Skills", "Education", "Achievements", "Contact"];

export const MuseumOfFailures = () => (
  <div data-testid="museum-section" className="panel-green">
    <section className="section">
      <h2 data-reveal className="section-title">Museum of Failures</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <article key={c} data-reveal data-testid={`museum-card-${c.toLowerCase()}`} className="card">
            <h3 className="text-2xl font-medium">{c}</h3>
            <p className="mt-4 text-measure">
              <Placeholder>{c.toLowerCase()} text</Placeholder>
            </p>
          </article>
        ))}
      </div>
    </section>
  </div>
);
