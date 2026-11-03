const PATTERN = /(AIR 18|3,000\+|99\.8%|\b18\b)/;

export const Num = ({ text }) =>
  text.split(PATTERN).map((part, i) =>
    PATTERN.test(part) && part !== "AIR 18" ? (
      <span key={i} data-count={part} className="count">{part}</span>
    ) : (
      part
    )
  );
