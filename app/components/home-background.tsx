import { HomeLunarPath } from "./home-lunar-path";

export function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] overflow-hidden"
    >
      <HomeLunarPath className="absolute bottom-[calc(env(safe-area-inset-bottom)+2.25rem)] left-1/2 -translate-x-1/2 md:bottom-6" />
    </div>
  );
}
