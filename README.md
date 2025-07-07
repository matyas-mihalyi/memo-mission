## Header
## Logo
## Stats
## Timer
- 
## Matches
derived state from board state
## Mistakes
derived state from board state
## Options

## Reset
- set all card's state to face down
- shuffle board
- reset timer

## Settings
- change card number

## Board
- store all cards in state
- react to board state:
    - if two cards are flipped and not matched yet
        - if they match
            -> mark them matched
            -> derived store for match counter updates number of matches in stats
        - if they don't
            -> flip back after 2s ?
            -> derived store for match counter updates number of mistakes in stats

    - if third card is flipped and previous two not matched
        -> flip back previous 2
        -> derived store for match counter updates number of mistakes in stats

    - if all cards are matched
        -> stop timer

## Card
- onClick
    - change card state to flipped
    - start timer if not started yet
