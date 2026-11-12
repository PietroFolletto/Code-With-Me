export default function Mascote({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 140"
      fill="none"
      stroke="#A9A6C4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="65" cy="128" rx="42" ry="7" fill="#1D1840" stroke="none" />
      <ellipse cx="65" cy="40" rx="26" ry="28" />
      <circle cx="55" cy="42" r="4" />
      <circle cx="75" cy="42" r="4" />
      <path d="M46 64C34 80 44 96 30 104" />
      <path d="M54 68C50 86 58 98 50 116" />
      <path d="M65 69C65 88 69 100 65 120" />
      <path d="M76 68C80 86 72 98 80 116" />
      <path d="M84 64C96 80 86 96 100 104" />
      <text x="6" y="86" fill="#30BF62" stroke="none" fontSize="16" fontFamily="var(--font-code)">{"{}"}</text>
      <text x="100" y="86" fill="#30BF62" stroke="none" fontSize="16" fontFamily="var(--font-code)">{"[]"}</text>
    </svg>
  );
}
