export function getTarotCardImageSrc(cardName: string) {
  return `/images/cards/rider-waite/${cardName.replaceAll(" ", "_")}.webp`;
}
