import { useReducer } from "react";
import "./App.css";
import { Cards } from "./Cards";
import {
  GameStateContext,
  GameStateDispatchContext,
} from "./GameState.context";
import { gameStateReducer } from "./GameState.reducer";
import type { GameState, CardProps } from "./interfaces";

function shuffle<T>(array: Array<T>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getCardValues(count: number): Array<string> {
  const values = new Set<string>();

  for (let i = 0; i < count; i++) {
    // Emoji range: 0x1F300 to 0x1FAFF
    const randomCodePoint =
      Math.floor(Math.random() * (0x1faff - 0x1f300 + 1)) + 0x1f300;
    const emoji = String.fromCodePoint(randomCodePoint);
    if (values.has(emoji)) {
      --i;
    } else {
      values.add(emoji);
    }
  }

  return [...values.values()];
}

function initCards(numberOfPairs: number): Array<CardProps> {
  const cardValues = getCardValues(numberOfPairs);
  const cards = cardValues.reduce((acc, currentCardValue, i) => {
    const cardOne: CardProps = {
      id: `${i}-${Math.random().toString(36).slice(2, 9)}`,
      flipped: false,
      matched: false,
      value: currentCardValue,
    };
    const cardTwo = {
      ...cardOne,
      id: `${i}-${Math.random().toString(36).slice(2, 9)}`,
    };
    acc.push(...[cardOne, cardTwo]);
    return acc;
  }, [] as Array<CardProps>);

  shuffle(cards);
  return cards;
}

function App() {
  const initialGameState: GameState = {
    cards: initCards(4),
    flippedCards: [],
    matches: 0,
    mistakes: 0,
  };
  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);
  return (
    <>
      <GameStateContext.Provider value={gameState}>
        <GameStateDispatchContext.Provider value={dispatch}>
          {/* Header */}
          {/* -- Logo */}
          {/* -- Stats */}
          {/* ---- Timer */}
          {/* ---- Matches */}
          {/* ---- Mistakes */}
          {/* -- Options */}
          {/* ---- Reset */}
          {/* ---- Settings */}
          {/* Cards */}
          <Cards />
          {/* -- Card */}
          {/* */}
        </GameStateDispatchContext.Provider>
      </GameStateContext.Provider>
    </>
  );
}

export default App;
