import { useState } from "react";

const links = [
  { label: "My story", href: "/#timeline", id: "my-story" },
  { label: "Museum of Failures", href: "/#museum", id: "museum" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav data-testid="nav-island" className="nav-island">
        <a href="/" data-testid="nav-home-link" className="nav-name">Dhairya</a>
        <button
          data-testid="nav-menu-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={`burger ${open ? "is-open" : ""}`}
        >
          <span />
          <span />
        </button>
      </nav>
      <div data-testid="nav-overlay" className={`nav-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.id} style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}>
              <a href={l.href} data-testid={`nav-link-${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
