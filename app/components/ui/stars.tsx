export function StarBackground() {
  const stars = [
    { top: "5%", left: "8%", symbol: "✦", size: 8, duration: 3.2, delay: 0 },
    { top: "13%", left: "73%", symbol: "·", size: 13, duration: 4.4, delay: 1.1 },
    { top: "20%", left: "91%", symbol: "⋆", size: 9, duration: 3.7, delay: 0.4 },

    { top: "29%", left: "18%", symbol: "⟡", size: 9, duration: 4.8, delay: 1.8 },
    { top: "70%", left: "58%", symbol: "✢", size: 8, duration: 6.1, delay: 2.2 },

    { top: "46%", left: "6%", symbol: "·", size: 12, duration: 4.2, delay: 2.1 },
    { top: "51%", left: "84%", symbol: "✦", size: 7, duration: 2.9, delay: 0.3 },

    { top: "61%", left: "31%", symbol: "⋆", size: 8, duration: 3.9, delay: 1.5 },
    { top: "69%", left: "70%", symbol: "⟡", size: 8, duration: 4.6, delay: 0.6 },

    { top: "80%", left: "12%", symbol: "✧", size: 8, duration: 3.3, delay: 2.2 },
    { top: "0%", left: "47%", symbol: "✦", size: 6, duration: 4.1, delay: 1 },
    { top: "0%", left: "78%", symbol: "⋆", size: 9, duration: 3.5, delay: 0.2 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute text-[#8f6f98]"
          style={{
            top: star.top,
            left: star.left,
            fontSize: `${star.size}px`,
            animation: `ritualTwinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        >
          {star.symbol}
        </span>
      ))}
    </div>
  );
}