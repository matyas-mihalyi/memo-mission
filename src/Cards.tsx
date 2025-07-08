import { useContext, useEffect, useRef } from "react";
import type { CardProps } from "./interfaces";
import {
  GameStateContext,
  GameStateDispatchContext,
} from "./GameState.context";

export function Cards() {
  const flipBackUnmatchedTimeoutRef = useRef<number | null>(null);
  const gameState = useContext(GameStateContext);
  const dispatch = useContext(GameStateDispatchContext);

  function handleClick(id: CardProps["id"]) {
    if (
      gameState.flippedCards.length === 2 &&
      flipBackUnmatchedTimeoutRef.current
    ) {
      clearTimeout(flipBackUnmatchedTimeoutRef.current);
      flipBackUnmatchedTimeoutRef.current = null;
      dispatch({ type: "check_match" });
    }
    dispatch({ type: "flipped", id });
  }

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      flipBackUnmatchedTimeoutRef.current = setTimeout(() => {
        dispatch({ type: "check_match" });
        flipBackUnmatchedTimeoutRef.current = null;
      }, 2000);
    }
  }, [gameState.flippedCards, dispatch]);

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
