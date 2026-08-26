"use client";
// 这个组件要在浏览器端运行。
// 因为 useState / useEffect / localStorage 都只能在客户端使用。
import { useEffect, useState } from "react";

type Props = {
    language: "zh" | "en";
};

const STORAGE_KEY = "moonlit-tarot-astrology-interest";


export function FeatureInterest({ language }: Props) {
    // React state: 修改后会自动重新渲染 UI
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);

    // 第一次加载时：加载真实 Redis 数量 + 检查用户是否点过
    useEffect(() => {
        async function loadInterest() {
            const saved = localStorage.getItem(STORAGE_KEY) === "true";
            setLiked(saved);
            const response = await fetch("/api/feature-interest");
            const data = await response.json(); // HTTP Response object -> JS object
            setCount(data.count);
            setIsHydrated(true);
        }
        loadInterest();
    }, []);
    // if (!isHydrated) {
    //     return null;
    // }
    const text =
        language === "zh"
            ? {
                eyebrow: "COMING SOON",
                title: "塔罗 × 星座",
                description: "如果星象也能加入你的塔罗解读呢？",
                want: "我想要",
                wanted: "已期待",
                people: "人期待",
            }
            : {
                eyebrow: "COMING SOON",
                title: "Tarot × Astrology",
                description:
                    "What if your astrology could become part of your tarot reading?",
                want: "I want this",
                wanted: "Added",
                people: "interested",
            };

    // 用户第一次点击时，让 Redis count +1
    async function handleClick() {
        if (liked) return;
        setLiked(true);
        const response = await fetch("/api/feature-interest", { method: "POST", });
        const data = await response.json();
        setCount(data.count);
        // 这里只记录“这个浏览器投过了”
        localStorage.setItem(STORAGE_KEY, "true");
    }
   

return (
    <section className="fixed bottom-6 right-6 mx-auto max-w-md ">
        <div className="rounded-2xl border border-[#d7b56d]/20 bg-white/45 px-4 py-4 backdrop-blur-lg transition hover:border-[#d7b56d]/35">

            <div className="mb-2 text-[10px] tracking-[0.22em] text-[#b1975e]">
                ✦ {text.eyebrow}
            </div>

            <h2 className="text-lg font-medium text-[#6e5536]/90">
                {text.title}
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-[#725b3e]/90">
                {text.description}
            </p>

            <div className="mt-4 flex  items-center justify-between">
                <button
                    disabled={liked}
                    type="button"
                    onClick={handleClick}
                    className={`
              rounded-full border px-2.5 py-2 text-sm transition
              ${
                        // 根据 liked 切换按钮样式
                        liked
                            ? "border-[#d7b56d]/50 bg-[#d7b56d]/15 text-[#e8cf98]"
                            : "border-[#a77d3f]/30 text-[#b1975e] hover:bg-[#d7b56d]/10 "
                        }
            `}
                >
                    {/* 根据 liked 切换按钮内容 */}
                    {liked ? "✓" : "♡"} {liked ? text.wanted : text.want}
                </button>

                <span className="px-8 text-xs text-[#b1975e]">
                    {count} {text.people}
                </span>
            </div>
        </div>
    </section>
);
}
