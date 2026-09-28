import type { DiceFaceId } from "@/lib/dice/faces";

// Each face owns one simple SVG. Replace the matching case to redraw a face.
export function DieSymbol({ face }: { face: DiceFaceId }) {
  const shared = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-20 sm:size-24",
    "aria-hidden": true as const,
  };

  switch (face) {
    case "moonKingdom":
      return <svg {...shared}><path d="M47 43A20 20 0 0 1 22 17 20 20 0 1 0 47 43Z" /><path d="m29 25 5 4 5-8 5 8 5-4-2 13H31l-2-13Z" /></svg>;
    case "fatedRomance":
      return <svg {...shared}><path d="M32 50 14 32C5 22 20 12 32 25c12-13 27-3 18 7L32 50Z" /><path d="m49 9 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" /></svg>;
    case "absurdMonday":
      return <svg {...shared}><g transform="rotate(-8 32 34)"><rect x="13" y="18" width="38" height="34" rx="5" /><path d="M13 27h38M23 13v10M41 13v10" /><path d="m32 31 2.5 5 5.5.8-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-.8 2.5-5Z" /></g></svg>;
    case "neonGlitch":
      return <svg {...shared}><path d="m35 8-18 26h13l-3 21 20-29H34l4-18" /><path d="M48 11h5v5h-5z" /><path d="m18 49 4-2-1 5" /></svg>;
    case "everyoneHasSecrets":
      return <svg {...shared}><path d="M9 20c7-4 14-4 22 0v24c-8 7-16 5-22-2V20ZM33 20c7-4 14-4 22 0v22c-6 7-14 9-22 2V20Z" /><path d="M15 31h9M40 31h9" /></svg>;
    case "improvisedStory":
      return <svg {...shared}><path d="m31 11 5 16 16 5-16 5-5 16-5-16-16-5 16-5 5-16Z" /><path d="M45 48c5-1 8-4 9-9" /></svg>;
  }
}
