import { useReducer } from "react";
import "./App.css";
import { Cards } from "./Cards";
import {
  GameStateContext,
  GameStateDispatchContext,
} from "./GameState.context";
import { cardsReducer } from "./GameState.reducer";
import type { GameState, CardProps } from "./interfaces";

function shuffle<T>(array: Array<T>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function initCards(numberOfPairs: number): Array<CardProps> {
  const cards = [];
  for (let i = 0; i < numberOfPairs; i++) {
    const cardOne: CardProps = {
      id: i + 1,
      flipped: false,
      matched: false,
      value: String(i),
    };
    const cardTwo = {
      ...cardOne,
      id: cardOne.id + 1,
    };
    cards.push(...[cardOne, cardTwo]);
  }
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
  const [gameState, dispatch] = useReducer(cardsReducer, initialGameState);
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
