export const Placeholder = ({ children, testId }) => (
  <span data-testid={testId} className="placeholder">
    [PLACEHOLDER: {children}]
  </span>
);
