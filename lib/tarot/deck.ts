import {
  MAJOR_ARCANA_NAMES,
  MAJOR_IMAGE_NAMES,
  MINOR_RANKS,
  MINOR_SUITS,
  RANK_IMAGE_NUMBERS,
  SPREAD_POSITIONS,
  SUIT_IMAGE_NAMES,
} from "@/lib/tarot/constants";
import type { DrawnCard, TarotCard } from "@/lib/types";

function getRwsImageSrc(card: TarotCard): string | undefined {
  if (card.arcana === "Major") {
    const imageName = MAJOR_IMAGE_NAMES[card.name];
    return imageName ? `/images/cards/rider-waite/${imageName}.jpg` : undefined;
  }

  const [rank, , suit] = card.name.split(" ");
  const rankNumber = RANK_IMAGE_NUMBERS[rank];
  const suitName = SUIT_IMAGE_NAMES[suit as NonNullable<TarotCard["suit"]>];

  return rankNumber && suitName
    ? `/images/cards/rider-waite/${suitName}${rankNumber}.jpg`
    : undefined;
}

const majorArcana: TarotCard[] = MAJOR_ARCANA_NAMES.map((name) => ({
  name,
  arcana: "Major",
}));

const minorArcana: TarotCard[] = MINOR_SUITS.flatMap((suit) =>
  MINOR_RANKS.map((rank) => ({
    name: `${rank} of ${suit}`,
    arcana: "Minor",
    suit,
  })),
);

export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana].map((card) => ({
  ...card,
  imageSrc: getRwsImageSrc(card),
}));

export function drawCards(selectedIndexes?: number[]): DrawnCard[] {
  const selectedCards = selectedIndexes
    ?.map((index) => tarotDeck[index])
    .filter((card): card is TarotCard => Boolean(card));
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
  const cardsToDraw = selectedCards?.length === 3 ? selectedCards : shuffled.slice(0, 3);

  return SPREAD_POSITIONS.map((position, index) => {
    const card = cardsToDraw[index];
    const orientation = Math.random() > 0.28 ? "Upright" : "Reversed";

    return {
      ...card,
      id: `${card.name}-${position}`,
      position,
      orientation,
    };
  });
}
