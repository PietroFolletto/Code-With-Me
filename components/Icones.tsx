type P = { className?: string };
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconeTrilha({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3 3 0 000-6h-4a3 3 0 010-6h5.5" />
    </svg>
  );
}
export function IconePerfil({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  );
}
export function IconeTrofeu({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M8 4h8v5a4 4 0 01-8 0V4z" />
      <path d="M8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4" />
      <path d="M12 13v4M8.5 20h7" />
    </svg>
  );
}
export function IconeSocial({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" />
      <path d="M16 4.8a3.5 3.5 0 010 6.4M18 14.3c2 .6 3.2 2.2 3.5 4.7" />
    </svg>
  );
}
export function IconeConfig({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </svg>
  );
}
