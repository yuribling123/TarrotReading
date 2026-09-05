const stars = [
  { className: "left-[12%] top-[18%] size-1", delay: "0s" },
  { className: "left-[24%] top-[34%] size-1.5", delay: "1.8s" },
  { className: "left-[32%] top-[12%] size-1", delay: "3.4s" },
  { className: "right-[31%] top-[20%] size-1", delay: "0.9s" },
  { className: "right-[19%] top-[39%] size-1.5", delay: "2.6s" },
  { className: "right-[10%] top-[15%] size-1", delay: "4.1s" },
] as const;

function BotanicalOrnament({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 180 520"
      className={`absolute bottom-[-4%] hidden h-[68%] w-auto text-[#9c7b45]/14 lg:block ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      }`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M30 516C36 390 68 286 132 180C154 144 164 101 158 50" strokeWidth="1.1" />
      <path d="M55 412C29 399 16 376 17 346C42 351 59 368 65 394" />
      <path d="M78 337C51 326 38 305 40 276C66 281 81 298 87 321" />
      <path d="M105 267C86 250 80 226 89 199C111 210 121 229 116 252" />
      <path d="M128 203C149 191 162 171 164 144C142 149 128 164 121 188" />
      <path d="M56 421C78 414 92 398 98 373C75 374 60 386 51 405" />
      <path d="M82 344C105 339 121 325 129 301C105 300 89 311 78 329" />
      <circle cx="159" cy="47" r="8" />
      <path d="m159 29 3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10Z" />
      <path d="M27 453a17 17 0 1 0 0-34 14 14 0 0 1 0 34Z" />
    </svg>
  );
}

export function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] isolate overflow-hidden "
    >
      <div className="absolute inset-0 " />



      <BotanicalOrnament side="left" />
      <BotanicalOrnament side="right" />



    </div>
  );
}
