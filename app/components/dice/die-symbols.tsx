import type { ReactNode } from "react";

import type { DiceFaceId } from "@/lib/types";

// Each face has one solid silhouette; the shared fill gives them the same carved finish.
const silhouettes: Record<DiceFaceId, ReactNode> = {
  moonKingdom: null,
  fatedRomance: (
    <>
      <path d="M32 52 12 32C2 21 17 11 29 23l3 3 3-3c12-12 27-2 17 9L32 52Z" />
      <path d="m50 8 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </>
  ),
  absurdMonday: (
    <g transform="rotate(-8 32 34)">
      <path fillRule="evenodd" d="M18 17h28a6 6 0 0 1 6 6v23a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6Zm-2 11v2h32v-2H16Zm16 5 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.4-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L32 33Z" />
      <rect x="21" y="12" width="4" height="10" rx="2" />
      <rect x="39" y="12" width="4" height="10" rx="2" />
    </g>
  ),
  neonGlitch: (
    <>
      <path d="m35 7-19 28h13l-3 22 22-32H34l4-18h-3Z" />
      <rect x="49" y="10" width="5" height="5" rx="1" />
      <path d="m17 49 6-3-1 7-5-4Z" />
    </>
  ),
  everyoneHasSecrets: (
    <>
      <path fillRule="evenodd" d="M8 19c8-5 16-5 24 0v24c-7 8-17 8-24 0V19Zm6 12v3h12v-3H14Z" />
      <path fillRule="evenodd" d="M33 19c8-5 16-5 23 0v24c-7 8-16 8-23 0V19Zm6 12v3h11v-3H39Z" />
    </>
  ),
  improvisedStory: (
    <>
      <path d="m31 8 5.5 18.5L55 32l-18.5 5.5L31 56l-5.5-18.5L7 32l18.5-5.5L31 8Z" />
      <path d="m48 45 1.5 3.5L53 50l-3.5 1.5L48 55l-1.5-3.5L43 50l3.5-1.5L48 45Z" />
    </>
  ),
};

export function DieSymbol({ face, idPrefix = "die" }: { face: DiceFaceId; idPrefix?: string }) {
  const gradientId = `${idPrefix}-engraving-${face}`;
  const shadowId = `${idPrefix}-engraving-shadow-${face}`;
  const moonMaskId = `${idPrefix}-moon-crescent`;
  const silhouette = face === "moonKingdom" ? (
    <>
      <circle cx="29" cy="34" r="21" mask={`url(#${moonMaskId})`} />
      <path d="m30 25 4 4 5-8 5 8 5-4-2 14H32l-2-14Z" />
    </>
  ) : silhouettes[face];

  return (
    <svg
      viewBox="0 0 64 64"
      className="relative size-5 sm:size-6"
      aria-hidden="true"
    >
      <defs>
        {face === "moonKingdom" && (
          <mask id={moonMaskId}>
            <circle cx="29" cy="34" r="21" fill="white" />
            <circle cx="39" cy="23" r="18" fill="black" />
          </mask>
        )}
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#d9ceb9" />
          <stop offset="0.55" stopColor="#fff8e8" />
          <stop offset="1" stopColor="#eee2ce" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dy="2" result="shifted" />
          <feComposite in="SourceAlpha" in2="shifted" operator="out" result="innerEdge" />
          <feGaussianBlur in="innerEdge" stdDeviation="0.7" result="softEdge" />
          <feFlood floodColor="#3c3145" floodOpacity="0.55" result="shadowColor" />
          <feComposite in="shadowColor" in2="softEdge" operator="in" result="innerShadow" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="innerShadow" />
          </feMerge>
        </filter>
      </defs>
      <g fill="#e9dcc7" transform="translate(0 1.6)">{silhouette}</g>
      <g fill={`url(#${gradientId})`} filter={`url(#${shadowId})`}>{silhouette}</g>
    </svg>
  );
}
