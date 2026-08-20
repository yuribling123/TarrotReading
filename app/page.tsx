"use client";

import { type CSSProperties, type FormEvent, useMemo, useState } from "react";
import { drawCards, type DrawnCard } from "@/lib/tarot";

type ReadingResponse = {
  intro: string;
  cards: Array<{
    position: string;
    title: string;
    message: string;
  }>;
  synthesis: string;
  disclaimer: string;
};

type Stage = "ask" | "select" | "reveal" | "reading";

const selectableCards = Array.from({ length: 9 }, (_, index) => index);

export default function Home() {
  const [stage, setStage] = useState<Stage>("ask");
  const [question, setQuestion] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState<ReadingResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canReveal = selectedIndexes.length === 3;

  const selectedCards = useMemo(
    () => selectableCards.filter((cardIndex) => selectedIndexes.includes(cardIndex)),
    [selectedIndexes],
  );

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError("Whisper a question before the deck can answer.");
      return;
    }

    setQuestion(trimmedQuestion);
    setError("");
    setStage("select");
  }

  function toggleCard(cardIndex: number) {
    setError("");
    setSelectedIndexes((current) => {
      if (current.includes(cardIndex)) {
        return current.filter((selectedIndex) => selectedIndex !== cardIndex);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, cardIndex];
    });
  }

  async function revealCards() {
    if (!canReveal) {
      setError("Choose three cards to complete the spread.");
      return;
    }

    const nextCards = drawCards();
    setCards(nextCards);
    setReading(null);
    setError("");
    setStage("reveal");

    window.setTimeout(() => {
      void requestReading(nextCards);
    }, 1300);
  }

  async function requestReading(nextCards = cards) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, cards: nextCards }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "The reading could not be completed.");
      }

      setReading(payload);
      setStage("reading");
    } catch (readingError) {
      setError(
        readingError instanceof Error
          ? readingError.message
          : "The veil flickered. Please try the reading again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetReading() {
    setStage("ask");
    setQuestion("");
    setSelectedIndexes([]);
    setCards([]);
    setReading(null);
    setError("");
    setIsLoading(false);
  }

  return (
    <main className="shell">
      <section className="hero" aria-label="Moonlit tarot reading">
        <div className="stars" />
        <div className="aurora" />
        <div className="content">
          <p className="eyebrow">Moonlit Tarot</p>
          <h1>Ask the question under the quiet sky.</h1>

          {stage === "ask" && (
            <form className="questionForm" onSubmit={submitQuestion}>
              <label htmlFor="question">Your question</label>
              <div className="inputRow">
                <input
                  id="question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="What does my next chapter ask of me?"
                  autoComplete="off"
                />
                <button type="submit">Enter</button>
              </div>
            </form>
          )}

          {stage !== "ask" && (
            <div className="questionPanel">
              <span>Your question</span>
              <p>{question}</p>
            </div>
          )}

          {stage === "select" && (
            <section className="deckArea" aria-label="Choose three tarot cards">
              <div className="deckHeader">
                <p>Choose three cards</p>
                <span>{selectedIndexes.length}/3 selected</span>
              </div>
              <div className="cardFan">
                {selectableCards.map((cardIndex) => {
                  const isSelected = selectedIndexes.includes(cardIndex);

                  return (
                    <button
                      className={`cardBack ${isSelected ? "selected" : ""}`}
                      key={cardIndex}
                      onClick={() => toggleCard(cardIndex)}
                      style={{ "--card-delay": `${cardIndex * 55}ms` } as CSSProperties}
                      type="button"
                      aria-label={`Card ${cardIndex + 1}${isSelected ? " selected" : ""}`}
                    >
                      <span className="cardMoon" />
                      <span className="cardStar">✦</span>
                    </button>
                  );
                })}
              </div>
              <button className="primaryAction" onClick={revealCards} type="button" disabled={!canReveal}>
                Reveal the spread
              </button>
            </section>
          )}

          {(stage === "reveal" || stage === "reading") && (
            <section className="spread" aria-label="Three card spread">
              {cards.map((card, index) => (
                <article
                  className={`tarotCard revealCard ${card.orientation === "Reversed" ? "reversed" : ""}`}
                  key={card.id}
                  style={{ "--reveal-delay": `${index * 260}ms` } as CSSProperties}
                >
                  <span className="position">{card.position}</span>
                  <div className="cardFace">
                    <div className="sigil">{card.symbol}</div>
                    <h2>{card.name}</h2>
                    <p>{card.orientation}</p>
                    <small>{card.meaning}</small>
                  </div>
                </article>
              ))}
            </section>
          )}

          {isLoading && (
            <section className="loadingReading" aria-label="Reading is being generated">
              <span />
              <span />
              <span />
            </section>
          )}

          {stage === "reading" && reading && (
            <section className="reading">
              <p className="intro">{reading.intro}</p>
              <div className="readingGrid">
                {reading.cards.map((card) => (
                  <article key={card.position}>
                    <span>{card.position}</span>
                    <h3>{card.title}</h3>
                    <p>{card.message}</p>
                  </article>
                ))}
              </div>
              <div className="synthesis">
                <h3>Guidance</h3>
                <p>{reading.synthesis}</p>
                <small>{reading.disclaimer}</small>
              </div>
              <button className="secondaryAction" onClick={resetReading} type="button">
                Ask another question
              </button>
            </section>
          )}

          {error && (
            <div className="error" role="alert">
              <p>{error}</p>
              {cards.length > 0 && (
                <button onClick={() => requestReading()} type="button">
                  Try again
                </button>
              )}
            </div>
          )}

          {selectedCards.length > 0 && stage === "select" && (
            <p className="selectedHint">The chosen cards are listening: {selectedCards.length} lit.</p>
          )}
        </div>
      </section>
    </main>
  );
}
