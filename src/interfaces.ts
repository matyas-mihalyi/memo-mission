export type CardProps = {
  id: any;
  value: string;
  flipped: boolean;
  matched: boolean;
};

export type FlipCardAction = { type: "flipped"; id: number };
export type MatchCardAction = { type: "match" };
export type ResetCardsAction = { type: "reset" };
export type CardAction = FlipCardAction | MatchCardAction | ResetCardsAction;

export type BoardAction = {
  type: "match" | "mistake";
};

export type GameState = {
  cards: Array<CardProps>;
  flippedCards: Array<CardProps["id"]>;
  matches: number;
  mistakes: number;
};
