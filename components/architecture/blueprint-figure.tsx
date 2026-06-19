/** Small stylized blueprint diagrams — three deterministic variants for variety. */
export function BlueprintFigure({ variant = 0 }: { variant?: number }) {
  const v = variant % 3;
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`bf1-${v}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c46e6" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id={`bf2-${v}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b6fff" />
        </linearGradient>
      </defs>

      {v === 0 && (
        <>
          <g fill="none" stroke={`url(#bf1-${v})`} strokeWidth="1.4" className="bp-line" style={{ color: "#2c46e6" }}>
            <path d="M55 60 H110 M150 35 V85 M150 35 H110 M150 85 H110 M150 60 H245" />
          </g>
          <g className="bp-node" stroke={`url(#bf2-${v})`}>
            <rect x="20" y="46" width="56" height="28" rx="6" />
            <rect x="150" y="20" width="60" height="28" rx="6" />
            <rect x="150" y="72" width="60" height="28" rx="6" />
            <rect x="244" y="46" width="50" height="28" rx="6" />
          </g>
        </>
      )}
      {v === 1 && (
        <>
          <g fill="none" stroke={`url(#bf2-${v})`} strokeWidth="1.4" className="bp-line" style={{ color: "#22d3ee" }}>
            <path d="M150 22 V52 M90 92 H210 M150 52 V92" />
          </g>
          <g className="bp-node" stroke={`url(#bf1-${v})`}>
            <rect x="120" y="8" width="60" height="28" rx="6" />
            <rect x="60" y="78" width="60" height="28" rx="6" />
            <rect x="180" y="78" width="60" height="28" rx="6" />
          </g>
        </>
      )}
      {v === 2 && (
        <>
          <g fill="none" stroke={`url(#bf1-${v})`} strokeWidth="1.4" className="bp-line" style={{ color: "#a855f7" }}>
            <path d="M40 60 H100 M100 32 V88 M100 32 H180 M100 88 H180 M180 60 H260" />
          </g>
          <g className="bp-node" stroke={`url(#bf2-${v})`}>
            <rect x="14" y="46" width="50" height="28" rx="6" />
            <rect x="150" y="18" width="56" height="28" rx="6" />
            <rect x="150" y="74" width="56" height="28" rx="6" />
            <rect x="248" y="46" width="46" height="28" rx="6" />
          </g>
        </>
      )}
    </svg>
  );
}
