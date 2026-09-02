type ReadingZodiacProps = {
  zodiac: string;
};

export function ReadingZodiac({
  zodiac,
}: ReadingZodiacProps) {
  return (
    <section
      className="
        relative
        mx-6
        max-w-[720px]
        overflow-hidden
        rounded-[22px]
        border
        border-[#7f5b1f]/30
        px-6
        py-5
       
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
          bg-[#d6ad58]/10
          blur-3xl
        "
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center text-[13px] tracking-[0.05em]">
            <span className="mr-1.5 inline-block animate-[twinkle_2.8s_ease-in-out_infinite] text-[14px] text-[#d3be57]">
              ˖
            </span>

            <span className="font-medium text-[#3c2b0d]/90">
              星辰来信
            </span>
          </p>

          <span
            className="
              rounded-full
              border
              border-[#3c2b0d]/20
              bg-[#d6ad58]/5
              px-2.5
              py-1
              text-[9px]
              font-medium
              tracking-[0.08em]
              text-[#3c2b0d]/40
            "
          >
            已解锁
          </span>
        </div>

        {/* 极淡分隔线 */}
        <div
          className="
            mb-3
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#b89552]/14
            to-transparent
          "
        />

        {/* 星座解读 */}
        <p className="text-[0.89rem] leading-7 text-[#342d3d]">
          {zodiac}
        </p>
      </div>
    </section>
  );
}