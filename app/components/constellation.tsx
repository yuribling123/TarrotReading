export function Constellation() {
  return (
    <div className="relative mt-14 h-[130px] w-full overflow-hidden">
      <svg
        viewBox="0 0 360 130"
        className="absolute left-1/2 top-2 h-[120px] w-[360px] -translate-x-[42%]"
        fill="none"
        aria-hidden="true"
      >
        {/* very subtle constellation lines */}
        <g
          stroke="#b89552"
          strokeWidth="0.7"
          opacity="0.16"
        >
          <line x1="70" y1="72" x2="118" y2="48" />
          <line x1="118" y1="48" x2="168" y2="62" />
          <line x1="168" y1="62" x2="218" y2="35" />
          <line x1="168" y1="62" x2="205" y2="92" />
          <line x1="205" y1="92" x2="138" y2="101" />
          <line x1="138" y1="101" x2="70" y2="72" />
          <line x1="218" y1="35" x2="265" y2="54" />
        </g>

        {/* constellation stars */}
        <g fill="#b89552">
          <circle cx="70" cy="72" r="1.2" opacity="0.32" />
          <circle cx="118" cy="48" r="2.1" opacity="0.62" />
          <circle cx="168" cy="62" r="1.4" opacity="0.4" />
          <circle cx="218" cy="35" r="2.6" opacity="0.72" />
          <circle cx="205" cy="92" r="1.1" opacity="0.3" />
          <circle cx="138" cy="101" r="1.5" opacity="0.38" />
          <circle cx="265" cy="54" r="1.8" opacity="0.5" />
        </g>

        {/* scattered background stars */}
        <g fill="#b89552">
          <circle cx="28" cy="42" r="0.7" opacity="0.16" />
          <circle cx="44" cy="106" r="0.9" opacity="0.12" />
          <circle cx="294" cy="28" r="0.8" opacity="0.14" />
          <circle cx="310" cy="86" r="1" opacity="0.18" />
          <circle cx="335" cy="55" r="0.6" opacity="0.12" />
          <circle cx="255" cy="112" r="0.8" opacity="0.14" />
        </g>

        {/* one slightly brighter sparkle */}
        <g
          stroke="#b89552"
          strokeWidth="0.7"
          opacity="0.42"
        >
          <line x1="302" y1="48" x2="302" y2="56" />
          <line x1="298" y1="52" x2="306" y2="52" />
        </g>
      </svg>
    </div>
  );
}