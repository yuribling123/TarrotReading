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
type Language = "en" | "zh";

const copy = {
  en: {
    brand: "Moonlit Tarot",
    heading: "Moonlight guides, cards mirror.",
    questionLabel: "Your question",
    questionPlaceholder: "What does my next chapter ask of me?",
    enter: "Enter",
    chooseThree: "Choose three cards",
    selected: "selected",
    reveal: "Reveal the spread",
    guidance: "Guidance",
    askAnother: "Ask another question",
    retry: "Try again",
    chosenHint: "The chosen cards are listening: {count} lit.",
    emptyQuestion: "Whisper a question before the deck can answer.",
    incompleteSpread: "Choose three cards to complete the spread.",
    genericError: "The veil flickered. Please try the reading again.",
    languageSwitch: "中文",
    languageLabel: "Switch to Chinese",
    positions: {
      Situation: "Situation",
      "Hidden Influence": "Hidden Influence",
      Guidance: "Guidance",
    },
  },
  zh: {
    brand: "月光塔罗",
    heading: "月光为引，牌面为镜",
    questionLabel: "你的问题",
    questionPlaceholder: "人生的下一篇章想告诉我什么？",
    enter: "开始",
    chooseThree: "选择三张牌",
    selected: "已选择",
    reveal: "揭开牌阵",
    guidance: "指引",
    askAnother: "再问一个问题",
    retry: "再试一次",
    chosenHint: "被选中的牌正在聆听：已点亮 {count} 张。",
    emptyQuestion: "请先轻声说出一个问题，让牌组回应你。",
    incompleteSpread: "请选择三张牌，完成这个牌阵。",
    genericError: "帷幕轻轻闪动了，请再试一次。",
    languageSwitch: "EN",
    languageLabel: "切换至英文",
    positions: {
      Situation: "当前状况",
      "Hidden Influence": "隐藏影响",
      Guidance: "行动指引",
    },
  },
} as const;

const selectableCards = Array.from({ length: 9 }, (_, index) => index);

export default function Home() {
  const [stage, setStage] = useState<Stage>("ask");
  const [language, setLanguage] = useState<Language>("en");
  const [question, setQuestion] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState<ReadingResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canReveal = selectedIndexes.length === 3;
  const text = copy[language];
  const formatPosition = (position: string) =>
    text.positions[position as keyof typeof text.positions] ?? position;

  const selectedCards = useMemo(
    () => selectableCards.filter((cardIndex) => selectedIndexes.includes(cardIndex)),
    [selectedIndexes],
  );

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setError(text.emptyQuestion);
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
      setError(text.incompleteSpread);
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
        body: JSON.stringify({ question, cards: nextCards, language }),
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
          : text.genericError,
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
    <main className="shell" lang={language}>
      <section className="hero" aria-label="Moonlit tarot reading">
        <div className="stars" />
        <div className="aurora" />
        <div className={`content ${stage === "ask" ? "landingContent" : ""}`}>
          <button
            className="languageToggle"
            type="button"
            onClick={() => setLanguage((current) => (current === "en" ? "zh" : "en"))}
            aria-label={text.languageLabel}
          >
            {text.languageSwitch}
          </button>
          <p className="eyebrow">{text.brand}</p>
          <h1>{text.heading}</h1>

          {stage === "ask" && (
            <form className="questionForm" onSubmit={submitQuestion}>
              <label htmlFor="question">{text.questionLabel}</label>
              <div className="inputRow">
                <input
                  id="question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder={text.questionPlaceholder}
                  autoComplete="off"
                />
                <button type="submit">{text.enter}</button>
              </div>
            </form>
          )}

          {stage !== "ask" && (
            <div className="questionPanel">
              <span>{text.questionLabel}</span>
              <p>{question}</p>
            </div>
          )}

          {stage === "select" && (
            <section className="deckArea" aria-label="Choose three tarot cards">
              <div className="deckHeader">
                <p>{text.chooseThree}</p>
                <span>{selectedIndexes.length}/3 {text.selected}</span>
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
                {text.reveal}
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
                  <span className="position">{formatPosition(card.position)}</span>
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
                    <span>{formatPosition(card.position)}</span>
                    <h3>{card.title}</h3>
                    <p>{card.message}</p>
                  </article>
                ))}
              </div>
              <div className="synthesis">
                <h3>{text.guidance}</h3>
                <p>{reading.synthesis}</p>
                <small>{reading.disclaimer}</small>
              </div>
              <button className="secondaryAction" onClick={resetReading} type="button">
                {text.askAnother}
              </button>
            </section>
          )}

          {error && (
            <div className="error" role="alert">
              <p>{error}</p>
              {cards.length > 0 && (
                <button onClick={() => requestReading()} type="button">
                  {text.retry}
                </button>
              )}
            </div>
          )}

          {selectedCards.length > 0 && stage === "select" && (
            <p className="selectedHint">
              {text.chosenHint.replace("{count}", String(selectedCards.length))}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
