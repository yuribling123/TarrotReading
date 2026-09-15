import { HomeLunarPath } from "./home-lunar-path";

const moonDust = [
  { left: "28%", delay: "0s", duration: "5s", size: "3px", color: "#7f5b1f", type: "star" },
  { left: "32%", delay: "-2s", duration: "5s", size: "1px", color: "#c997d8", type: "star" },
  { left: "36%", delay: "-1s", duration: "6s", size: "6px", color: "#c997d8", type: "star" },
  { left: "42%", delay: "-4s", duration: "6s", size: "6px", color: "#7f5b1f", type: "star" },
  { left: "52%", delay: "-1s", duration: "7s", size: "4px", color: "#c997d8", type: "dot" },
   { left: "57%", delay: "-1s", duration: "7s", size: "3px", color: "#7f5b1f", type: "dot" },
  { left: "60%", delay: "-2s", duration: "5s", size: "3px", color: "#7f5b1f", type: "dot" },
  { left: "65%", delay: "-4s", duration: "5s", size: "2px", color: "#c997d8", type: "dot" },
];
export function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] overflow-hidden"
    >


      {/* 月尘 */}
      {moonDust.map((dust, index) => (
        <span
          key={index}
          className="home-moon-dust absolute bottom-[0%]"
          style={{
            left: dust.left,
            animationDelay: dust.delay,
            animationDuration: dust.duration,
            color: dust.color,
          }}
        >
          {dust.type === "star" ? (
            <span
              className="home-moon-dust-star block text-[12px] drop-shadow-[0_0_7px_currentColor]"
            >
              ✦
            </span>
          ) : (
            <span
              className="block rounded-full shadow-[0_0_8px_currentColor]"
              style={{
                width: dust.size,
                height: dust.size,
                backgroundColor: dust.color,
              }}
            />
          )}
        </span>
      ))}


      {/* <HomeLunarPath className="absolute bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] left-1/2 -translate-x-1/2 md:bottom-6" /> */}
    </div>
  );
}