import type { Context } from "react";
import { createContext } from "react";
import type { GameState, CardAction } from "./interfaces";

export const GameStateContext: Context<GameState> = createContext({} as GameState);
export const GameStateDispatchContext: Context<any> = createContext(null);
