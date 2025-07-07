import type { CardProps } from "./interfaces";

export function Card({ id, value, flipped, matched }: CardProps) {
  return <div onClick={handleClick}>{`card ${id}`}</div>;
}
