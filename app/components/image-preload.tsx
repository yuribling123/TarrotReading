"use client";

import { useEffect } from "react";

type TarotPreloaderProps = {
    deck: readonly string[];
};

export function TarotPreloader({
    deck,
}: TarotPreloaderProps) {

    useEffect(() => {
        // preload card back
        const cardBack = new window.Image();
        cardBack.src = "/images/cards/card-back.webp";
        deck.forEach((cardName) => {
            const imageName = cardName.replaceAll(" ", "_");
            const imageSrc =
                `/images/cards/rider-waite/${imageName}.webp`;

            const img = new window.Image();
            img.src = imageSrc;
        });
    }, [deck]);


    return null;
}