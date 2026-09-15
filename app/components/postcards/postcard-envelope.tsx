type PostcardEnvelopeProps = {
  isRead: boolean;
  isReady: boolean;
  onOpen: () => void;
};

export function PostcardEnvelope({ isRead, isReady, onOpen }: PostcardEnvelopeProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group fixed right-4 top-[96px] z-20 h-9 w-11 overflow-visible bg-transparent drop-shadow-[0_5px_9px_rgba(91,69,105,0.14)] transition duration-300 hover:-translate-x-1 sm:right-3 sm:top-[104px] ${isReady ? "opacity-100" : "pointer-events-none opacity-0"} ` }
      aria-label={isRead ? "重新查看月之彼岸的今日来信" : "打开月之彼岸的今日来信"}
    >
      <span className="relative block h-full w-full ">
        <svg viewBox="0 0 58 48" className="absolute inset-0 z-10 size-full text-[#897491]" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="7" y="9.5" width="44" height="31" rx="4.5" fill="#fbfaf8" stroke="currentColor" strokeWidth=".85" opacity=".96" />
          <path d="M7 12.5 29 29l22-16.5" stroke="currentColor" strokeWidth=".85" opacity=".52" />
          <path d="m7 40 15.7-14.3M51 40 35.3 25.7" stroke="currentColor" strokeWidth=".85" opacity=".28" />
        </svg>

        <span className={`absolute left-[14px] top-[13px] z-40 grid size-2.5 place-items-center rounded-full border transition duration-500 ${isRead ? "border-[#9a8da0]/35 bg-[#f7f4f7] opacity-60" : "border-transparent bg-[#8d7898] shadow-[0_2px_5px_rgba(76,56,86,0.25)]"}`}>
          <svg viewBox="0 0 13 13" className="size-2" fill="none">
            <path d="M7.9 2.2A4.1 4.1 0 1 0 9.8 8 3.55 3.55 0 0 1 7.9 2.2Z" fill={isRead ? "#9a8da0" : "#f5f0f5"} />
          </svg>
        </span>

        {!isRead && (
          <>
            <span className="moonlit-letter-spark pointer-events-none absolute right-[3px] top-[7px] z-30 size-1 rounded-full bg-[#c9afd2] shadow-[0_0_7px_2px_rgba(179,148,189,0.38)]" aria-hidden="true" />
            <span className="moonlit-letter-spark-secondary pointer-events-none absolute right-[9px] top-[13px] z-30 size-[3px] rounded-full bg-[#e1d0e6] shadow-[0_0_5px_1px_rgba(199,174,208,0.35)]" aria-hidden="true" />
          </>
        )}
      </span>
    </button>
  );
}
