import { HomeLunarPath } from "./home-lunar-path";

const moonDust = [
  { left: "28%", delay: "0s", duration: "5s", size: "3px", color: "#c49a42 ", type: "star" },
  { left: "32%", delay: "-2s", duration: "5s", size: "1px", color: "#c997d8", type: "star" },
  { left: "36%", delay: "-1s", duration: "5s", size: "6px", color: "#c997d8", type: "star" },
  { left: "42%", delay: "-4s", duration: "5s", size: "6px", color: "#c49a42", type: "star" },
  { left: "44%", delay: "-3s", duration: "5s", size: "3px", color: "#c997d8", type: "dot" },
  { left: "52%", delay: "-2s", duration: "5s", size: "4px", color: "#c997d8", type: "dot" },
  { left: "57%", delay: "-3s", duration: "5s", size: "3px", color: "#c49a42", type: "dot" },
  { left: "60%", delay: "-1s", duration: "5s", size: "3px", color: "#c49a42", type: "dot" },
  { left: "65%", delay: "-4s", duration: "5s", size: "2px", color: "#c997d8", type: "dot" },
];
export function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] overflow-hidden"
    >




      {/* <HomeLunarPath className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-1/2 -translate-x-1/2 md:bottom-6" /> */}
    </div>
  );
}