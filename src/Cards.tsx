import { useEffect, useReducer, useRef } from "react";
import type { CardProps, GameState } from "./interfaces";
import type { CardAction } from "./interfaces";

const mockCards: Array<CardProps> = [
  {
    id: 1,
    value: "a",
    flipped: false,
    matched: false,
  },
  {
    id: 2,
    value: "b",
    flipped: false,
    matched: false,
  },
];

function cardsReducer(
  state: GameState,
  action: CardAction,
): GameState {
  const { type } = action;
  switch (type) {
    case "flipped": {
      const { id } = action
      // if two cards are flipped already and they don't match flip them back and flip the new one
      return {
       cards: state.cards.map((card) =>
         card.id === id ? { ...card, flipped: true } : card,
        ),
        flippedCards: [...state.flippedCards, id],
        matches: state.matches,
        mistakes: state.mistakes
      }
    }
    case "match": {
      const [cardOneId, cardTwoId] = state.flippedCards
      const [cardOne, cardTwo] = state.cards.filter(c => c.id === cardOneId || c.id === cardTwoId)
      const match: boolean = cardOne.value === cardTwo.value


      // empty flipped cards
      // mark cards not flipped
      if (match) {
        // increment matches
      } else {
        // increment mistakes
      }
    }
    case "reset": {
    }
    default: {
      throw new Error("Unknown action type in cardsReducer: " + type);
    }
  }
}

function initCards() {}

export function Cards() {
  const initialGameState: GameState = {
    cards: mockCards,
    flippedCards: [],
    matches: 0,
    mistakes: 0,
  };
  const [gameState, dispatch] = useReducer(cardsReducer, initialGameState);
  const flipBackUnmatchedTimeoutRef = useRef<number|null>(null)

  function handleClick(id: CardProps["id"]) {
    if(gameState.flippedCards.length === 2 && flipBackUnmatchedTimeoutRef.current) {
      clearTimeout(flipBackUnmatchedTimeoutRef.current)
      flipBackUnmatchedTimeoutRef.current = null
      dispatch({ type: 'check_match' })
    }
    dispatch({ type: "flipped", id });
  }

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      flipBackUnmatchedTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'check_match' });
        flipBackUnmatchedTimeoutRef.current = null
      }, 2000);
    }
  }, [gameState.flippedCards]);

  return (
    <div className="board">
      {gameState.cards.map((card, i) => (
        <div
          className="card-wrapper"
          key={i}
          onClick={() => handleClick(card.id)}
        >
          <div
            className={
              card.flipped || card.matched ? "card-inner flipped" : "card-inner"
            }
          >
            <div className="card-front">{card.value}</div>
            <div className="card-back" />
          </div>
        </div>
      ))}
    </div>
  );
}
