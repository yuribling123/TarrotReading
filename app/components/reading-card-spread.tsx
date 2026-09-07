import { Card } from "@/app/components/card";
import type { TarotCard } from "@/lib/types";
import { cn } from "@/lib/utils";

type ReadingCardSpreadProps = {
  cards: TarotCard[];
  className?: string;
};

export function ReadingCardSpread({
  cards,
  className,
}: ReadingCardSpreadProps) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full items-center justify-center gap-2.5 px-2",
        "sm:gap-7 sm:px-0",
        "lg:gap-20",
        className,
      )}
      aria-label="Three card spread"
    >
      {cards.map((card) => (
        <Card
          key={card.name}
          card={card}
          isSelected
          variant="spread"
          onSelect={() => {}}
        />
      ))}
    </section>
  );
}
