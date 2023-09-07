# Tic-Tac-Toe 

## **Live demo**
https://mschaeken.github.io/tic-tac-toe

## Description

A straightforward and simple game of Tic-Tac-Toe. Supports either two player gameplay or single player against an AI of varying difficulties.

Difficulties are either 'Easy', 'Medium' or 'Impossible'. The differences are as follows;

Easy: does nothing other than play a random valid move by generating a random int (0-8) and then checking whether or not that spot is filled on the board already.

Medium: 50/50 chance of either playing a random valid move or using the minimax() function to calculate the optimal move.

Impossible: fully implemented minimax algorithm which recursively goes through every possible state on the gameboard by simulating both players taking turns until a terminal state is reached. Once a terminal state is reached the algorithm assigns a value to the specific board state (AI wins -> +10, Tie  -> 0, AI loses -> -10) and picks the move that will end up with the highest value.

In practice this means playing against the impossible AI will always result in a tie or a loss as Tic-Tac-Toe when played by two 'perfect' players will always end in a tie.

## License

MIT

