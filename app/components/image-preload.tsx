"use client";

import { useEffect } from "react";

type TarotPreloaderProps = {
    deck: readonly string[];
};

export function TarotPreloader({
    deck,
}: TarotPreloaderProps) {

    useEffect(() => {
        // wait for website to load first
        const timer = setTimeout(() => {
            const background = new window.Image();
            background.src = "/images/backgrounds/moonlit-oracle.jpg";

            // background
            // card back
            const cardBack = new window.Image();
            cardBack.src = "/images/cards/card-back.webp";

            // front
            deck.forEach((cardName) => {
                const imageName = cardName.replaceAll(" ", "_");
                const img = new window.Image();

                img.src =
                    `/images/cards/rider-waite/${imageName}.webp`;
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [deck]);



    return null;
}