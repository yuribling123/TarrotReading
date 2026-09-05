export function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] overflow-hidden"
    >
      <style>{`
        @keyframes lunar-star-breathe {
          0%, 18%, 52%, 100% {
            opacity: 0.24;
            transform: scale(0.72);
          }
          30%, 40% {
            opacity: 0.92;
            transform: scale(1);
          }
        }

        @keyframes lunar-crescent-breathe {
          0%, 100% {
            opacity: 0.45;
            filter: drop-shadow(0 0 0 rgba(196, 151, 69, 0));
          }
          50% {
            opacity: 0.82;
            filter: drop-shadow(0 0 5px rgba(196, 151, 69, 0.28));
          }
        }

        .lunar-star {
          transform-box: fill-box;
          transform-origin: center;
          animation: lunar-star-breathe 8.5s ease-in-out infinite;
        }

        .lunar-crescent {
          animation: lunar-crescent-breathe 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .lunar-path-traveler,
          .lunar-star,
          .lunar-crescent {
            animation: none;
          }

          .lunar-path-traveler {
            visibility: hidden;
          }
        }
      `}</style>

      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+8.25rem)] left-1/2 w-[min(68vw,17rem)] -translate-x-1/2 md:bottom-6 ">
        <svg
          viewBox="0 0 300 112"
          className="h-auto w-full overflow-visible"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="lunar-path-line" x1="34" y1="49" x2="266" y2="49">
              <stop offset="0" stopColor="#a8813e" stopOpacity="0" />
              <stop offset="0.18" stopColor="#a8813e" stopOpacity="0.28" />
              <stop offset="0.5" stopColor="#8e744c" stopOpacity="0.2" />
              <stop offset="0.82" stopColor="#a8813e" stopOpacity="0.28" />
              <stop offset="1" stopColor="#a8813e" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="lunar-moving-light">
              <stop offset="0" stopColor="#f0cd77" stopOpacity="1" />
              <stop offset="0.35" stopColor="#ddb55b" stopOpacity="0.72" />
              <stop offset="1" stopColor="#ddb55b" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M38 49C94 92 206 92 262 49"
            stroke="url(#lunar-path-line)"
            strokeWidth="1"
          />
          <path
            d="M60 53C106 83 194 83 240 53"
            stroke="#a8813e"
            strokeOpacity="0.08"
            strokeWidth="0.7"
            strokeDasharray="1 7"
          />

          <g className="lunar-crescent">
            <circle cx="31" cy="45" r="10" fill="#d8b45f" fillOpacity="0.72" />
            <circle cx="35" cy="41" r="10" fill="#fffaf1" />
          </g>

          <g className="lunar-star" style={{ animationDelay: "0s" }}>
            <circle cx="92" cy="71" r="2.4" fill="#b68a3e" />
            <circle cx="92" cy="71" r="6" stroke="#b68a3e" strokeOpacity="0.12" />
          </g>
          <g className="lunar-star" style={{ animationDelay: "1.15s" }}>
            <path
              d="m150 79 2.4 5.6 5.6 2.4-5.6 2.4-2.4 5.6-2.4-5.6-5.6-2.4 5.6-2.4 2.4-5.6Z"
              fill="#c39a4c"
              fillOpacity="0.78"
            />
          </g>
          <g className="lunar-star" style={{ animationDelay: "2.3s" }}>
            <circle cx="208" cy="71" r="2.4" fill="#b68a3e" />
            <circle cx="208" cy="71" r="6" stroke="#b68a3e" strokeOpacity="0.12" />
          </g>

          <circle className="lunar-path-traveler" r="7" fill="url(#lunar-moving-light)">
            <animateMotion
              dur="11s"
              repeatCount="indefinite"
              path="M38 49C94 92 206 92 262 49"
              keyTimes="0;0.12;0.8;1"
              keyPoints="0;0;1;1"
              calcMode="spline"
              keySplines="0 0 1 1;0.42 0 0.58 1;0 0 1 1"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
}
