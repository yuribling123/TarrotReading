"use client";

import { useEffect, useState } from "react";

const songs = [
  {
    title: "疲惫的爱",
    artist: "step.jad依加",
  },
  {
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",
  },
  {
    title: "Talking to the Moon",
    artist: "Bruno Mars",
  },
  {
    title: "Moonlight",
    artist: "Kali Uchis",
  },
  {
    title: "Moonlight",
    artist: "Ariana Grande",
  },
  {
    title: "月亮代表谁的心",
    artist: "陶喆",
  },
];

export function MoonSong() {
  const [song, setSong] = useState(songs[0]);

  useEffect(() => {
    const randomSong =
      songs[Math.floor(Math.random() * songs.length)];

    setSong(randomSong);
  }, []);

  return (
<div className="mt-20 flex flex-col items-center gap-1.5 text-center">
  <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#b89552]/70">
    <span>☾</span>
    <span>MOONLIGHT RADIO · 07</span>
  </div>

  <div className="text-[12px] text-[#39353d]/60 mt-2">
    <span className="mr-2 text-[#d7b56d]/70">♪</span>
    <span className="italic">疲惫的爱</span>
    <span className="mx-1.5 text-[#d7b56d]/50">—</span>
    <span>step.jad依加</span>
  </div>

  <div className="mt-0.5 ml-5 text-[10px] tracking-[0.12em] text-[#39353d]/20">
    随机播放中 ···
  </div>
</div>
  );
}