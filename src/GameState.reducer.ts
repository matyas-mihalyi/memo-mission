import type { GameState, CardAction } from "./interfaces";

export function cardsReducer(state: GameState, action: CardAction): GameState {
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
