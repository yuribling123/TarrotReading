type ReadingZodiacProps = {

  zodiac: string;
};

export function ReadingZodiac({
  zodiac
}: ReadingZodiacProps) {
  return (
    <section
      className="
        relative
        mx-auto
        my-8
        max-w-[720px]
        overflow-hidden
        rounded-[22px]
        border
        border-[#b89552]/20
        bg-[#fffdf9]/10
        px-6
        py-5
        shadow-[0_8px_28px_rgba(127,91,31,0.06)]
        backdrop-blur
      "
    >
      {/* 右上微光 */}
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#d6ad58]/8
          blur-3xl
        "
      />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold tracking-[0.08em] text-[#181817]/80">
            ✦ 星辰私语
          </p>

          <span
            className="
              rounded-full
              border border-[#b89552]/20
              bg-[#d6ad58]/6
              px-2.5
              py-0.5
              text-[9px]
              font-medium
              tracking-[0.06em]
              text-[#8b6729]/80
            "
          >
            已解锁
          </span>
        </div>

        <div
          className="
            mb-3
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#b89552]/15
            to-transparent
          "
        />

        <p className="text-[0.89rem] leading-7 text-[#342d3d]/85">
          {zodiac}
        </p>
      </div>
    </section>
  );
}