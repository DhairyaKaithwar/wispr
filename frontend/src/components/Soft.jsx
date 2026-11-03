import { ArrowUpRight } from "@phosphor-icons/react";

export const PillButton = ({ href, label, testId, title }) => (
  <a href={href} data-testid={testId} title={title} className="pill">
    <span>{label}</span>
    <span className="pill-icon">
      <ArrowUpRight size={16} weight="light" />
    </span>
  </a>
);

export const Bezel = ({ children, className = "", testId }) => (
  <div data-reveal data-testid={testId} className={`bezel ${className}`}>
    <div className="bezel-core">{children}</div>
  </div>
);

export const Eyebrow = ({ testId }) => (
  <span data-reveal data-testid={testId} className="eyebrow">
    [PLACEHOLDER: eyebrow label]
  </span>
);
