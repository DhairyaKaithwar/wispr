import { PillButton } from "@/components/Soft";
import { skills, achievementTiles, links, contact } from "@/content";

export const Skills = () => (
  <section id="skills" data-testid="skills-section" className="section">
    <h2 data-reveal className="section-title">Skills</h2>
    <div className="mt-16 flex flex-col gap-12">
      {skills.map((s) => (
        <div key={s.group} data-reveal className="skill-group" data-testid={`skills-${s.group.split(" ")[0].toLowerCase()}`}>
          <p className="skill-label">{s.group}</p>
          <ul className="skill-chips">
            {s.items.split(", ").map((item) => <li key={item} className="chip">{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export const Achievements = () => (
  <section id="achievements" data-testid="achievements-section" className="section">
    <h2 data-reveal className="section-title">Achievements</h2>
    <div className="stat-grid" data-testid="achievements-list">
      {achievementTiles.map((t, i) => (
        <div key={t.caption} data-reveal className="stat-tile" data-testid={`achievement-tile-${i + 1}`}>
          <p className="stat-figure">
            {t.lead && <span className="stat-small">{t.lead}</span>}
            {t.count ? <span data-count={t.figure} className="count">{t.figure}</span> : <span>{t.figure}</span>}
            {t.rest && <span className="stat-rest">{t.rest.trim()}</span>}
          </p>
          <p className="stat-caption secondary">{t.caption}</p>
        </div>
      ))}
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" data-testid="contact-section" className="section contact">
    <span data-reveal className="label-chip">Contact</span>
    <h2 data-reveal className="contact-statement" data-testid="contact-statement">{contact.statement}</h2>
    <div data-reveal className="mt-12 flex flex-wrap gap-3">
      <PillButton href={links.email} label="Email" testId="contact-email-btn" />
      <PillButton href={links.linkedin} label="LinkedIn" external testId="contact-linkedin-btn" />
    </div>
  </section>
);
