import type { GameState, CardAction } from "./interfaces";

export function gameStateReducer(
  state: GameState,
  action: CardAction,
): GameState {
  const { type } = action;
  switch (type) {
    case "flipped": {
      const { id } = action;
      // if two cards are flipped already and they don't match flip them back and flip the new one
      return {
        cards: state.cards.map((card) =>
          card.id === id ? { ...card, flipped: true } : card,
        ),
        flippedCards: [...state.flippedCards, id],
        matches: state.matches,
        mistakes: state.mistakes,
      };
    }
    case "match": {
      const [cardOneId, cardTwoId] = state.flippedCards;
      const [cardOne, cardTwo] = state.cards.filter(
        (c) => c.id === cardOneId || c.id === cardTwoId,
      );
      const match: boolean = cardOne.value === cardTwo.value;

      if (match) {
        return {
          ...state,
          cards: state.cards.map((card) => {
            if (card.id === cardOneId || card.id === cardTwoId) {
              card.flipped = false;
              card.matched = true;
            }
            return card;
          }),
          flippedCards: [],
          matches: ++state.matches,
        };
      } else {
        return {
          ...state,
          cards: state.cards.map((card) => {
            card.flipped = false;
            return card;
          }),
          flippedCards: [],
          mistakes: ++state.mistakes,
        };
      }
    }
    case "reset": {

    }
    default: {
      throw new Error("Unknown action type in cardsReducer: " + type);
    }
  }
}
