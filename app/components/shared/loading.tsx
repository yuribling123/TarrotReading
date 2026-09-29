export function Loading({ symbol = "☾", color = "gold" }: { symbol?: string; color?: "gold" | "moonlight" }) {
    return (
        <span className={`${color === "moonlight" ? "text-[#f6efe4]" : "text-[#b89552]"} animate-pulse bg-transparent outline-none active:bg-transparent`}>
             {symbol}
        </span>
    );
}
