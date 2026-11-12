export default function Logo({ comTexto = true }: { comTexto?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M12 8L4 20l8 12" stroke="#30BF62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 8l8 12-8 12" stroke="#30BF62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="12" y="15" width="11" height="9" rx="4.5" transform="rotate(-18 17.5 19.5)" stroke="#30BF62" strokeWidth="2.5" />
        <rect x="17" y="16" width="11" height="9" rx="4.5" transform="rotate(-18 22.5 20.5)" stroke="#30BF62" strokeWidth="2.5" />
      </svg>
      {comTexto && (
        <span className="font-display text-lg font-semibold tracking-tight">Code With Me</span>
      )}
    </span>
  );
}
