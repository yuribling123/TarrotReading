import Image from "next/image";

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
      className={`group fixed right-4 top-[96px] z-20 h-9 w-11 overflow-visible bg-transparent drop-shadow-[0_5px_9px_rgba(91,69,105,0.14)] transition duration-300 hover:-translate-x-1 sm:right-3 sm:top-[104px] md:h-18 md:w-22 ${isReady ? "opacity-100" : "pointer-events-none opacity-0"} ${isReady && !isRead ? "animate-bounce repeat-10" : ""}` }
      aria-label={isRead ? "重新查看月之彼岸的今日来信" : "打开月之彼岸的今日来信"}
    >
      <span className="relative block size-full">
        <Image
          src={isRead
            ? "/images/postcards/moonlit-postcard-envelope-read.png"
            : "/images/postcards/moonlit-postcard-envelope.png"}
          alt=""
          width={44}
          height={36}
          className={`size-full object-contain transition duration-500 ${isRead ? "opacity-50 md:scale-[0.6]" :"scale-[1.2] opacity-100 md:scale-100" }`}
        />
      </span>
    </button>
  );
}
