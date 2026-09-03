type SelectedZodiacProps = {
    zodiac: string;
};

export function SelectedZodiac({
    zodiac,
}: SelectedZodiacProps) {
    return (
        <div
            className="
    relative
    mx-auto
    mb-18
    flex w-fit
    items-center justify-center
    px-5 py-2

    animate-in
    fade-in
    zoom-in-90
    duration-1000

    before:absolute
    before:inset-[-10px]
    before:-z-10
    before:rounded-full
    before:bg-[#d6ad58]/25
    before:blur-xl
  "
        >
            {/* 左上 */}
            <span
                className="
      absolute
      -left-1
      -top-1
      animate-[pulse_2s_ease-in-out_infinite]
      text-[8px]
      text-[#c49a45]
    "
            >
                ✦
            </span>

            <p className="text-[11px] font-medium tracking-[0.08em] text-[#7f5b1f]">
                今夜星象
                <span className="mx-1.5 ">·</span>
                {zodiac}
            </p>

            {/* 右下 */}
            <span
                className="
      absolute
      -bottom-1
      -right-1
      animate-[pulse_2.8s_ease-in-out_infinite]
      text-[6px]
      text-[#c49a45]
    "
            >
                ✦
            </span>
        </div>
    );
}