type PostcardDialogProps = {
  content: string;
  dateKey: string;
  displayDate: string;
  isFlipped: boolean;
  onClose: () => void;
  onFlip: () => void;
};

export function PostcardDialog({ content, dateKey, displayDate, isFlipped, onClose, onFlip }: PostcardDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#302638]/20 px-5 backdrop-blur-[3px] animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="来自月之彼岸的明信片"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[420px] [perspective:1200px]">
        <button
          type="button"
          onClick={onFlip}
          className="relative block aspect-[1.45/1] w-full bg-transparent text-left [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(.22,.75,.25,1)]"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          aria-label={isFlipped ? "查看明信片正面" : "翻开明信片"}
        >
          <span className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#95829e]/25 bg-[#fbfaf7] p-7 text-[#67566f] shadow-[0_24px_70px_rgba(54,39,63,0.24)] [backface-visibility:hidden] sm:p-9">
            <span className="flex items-start justify-between">
              <span className="text-[11px] tracking-[0.24em]">月之彼岸</span>
              <span className="grid size-12 place-items-center rounded-sm border border-[#8d7898]/35 text-[9px] tracking-wider">
                ◐<br />{dateKey.slice(5).replace("-", "·")}
              </span>
            </span>
            <span className="absolute inset-x-0 top-[43%] block text-center">
              <span className="mx-auto mb-5 block h-px w-20 bg-gradient-to-r from-transparent via-[#917d9b]/45 to-transparent" />
              <span className="block text-sm tracking-[0.18em]">寄往：此刻的你</span>
              <span className="mt-4 block text-[10px] tracking-[0.12em] text-[#a092a7]">轻触翻开</span>
            </span>
          </span>

          <span className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#95829e]/25 bg-[#fbfaf7] p-7 text-[#55495b] shadow-[0_24px_70px_rgba(54,39,63,0.24)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9">
            <span className="block text-[10px] tracking-[0.22em] text-[#907c99]">来自彼岸的你 · {displayDate}</span>
            <span className="my-5 block h-px w-full bg-gradient-to-r from-[#a491ad]/10 via-[#a491ad]/35 to-[#a491ad]/10" />
            <span className="block text-[14px] leading-8 tracking-[0.06em] sm:text-[15px]">{content}</span>
            <span className="absolute inset-x-7 bottom-7 block text-right text-[10px] tracking-[0.12em] text-[#a092a7] sm:inset-x-9 sm:bottom-9">月光短暂交汇，我们明日再见。</span>
          </span>
        </button>
      </div>
    </div>
  );
}
