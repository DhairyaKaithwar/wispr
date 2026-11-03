import { ArrowUpRight } from "@phosphor-icons/react";

export const PillButton = ({ href, label, testId, title, external }) => {
  const missing = !href;
  return (
    <a
      href={missing ? "#" : href}
      data-testid={testId}
      title={missing ? `Placeholder: ${label} link missing` : title}
      className="pill"
      {...(external && !missing ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={missing ? (e) => e.preventDefault() : undefined}
    >
      <span>{label}</span>
      <span className="pill-icon">
        <ArrowUpRight size={16} weight="light" />
      </span>
    </a>
  );
};
