# Tic-Tac-Toe 

## Description

A straightforward and simple game of Tic-Tac-Toe. Supports either two player gameplay or single player against an AI of varying difficulties.

Difficulties are either 'Easy', 'Medium' or 'Impossible'. The differences are as follows;

Easy: does nothing other than play a random valid move by generating a random int (0-8) and then checking whether or not that spot is filled on the board already.

Medium: 50/50 chance of either playing a random valid move or using the minimax() function to calculate the optimal move.

Impossible: fully implemented minimax algorithm which recursively goes through every possible state on the gameboard by simulating both players taking turns until a terminal state is reached. Once a terminal state is reached the algorithm assigns a value to the specific board state (AI wins -> +10, Tie  -> 0, AI loses -> -10) and picks the move that will end up with the highest value.

In practice this means playing against the impossible AI will always result in a tie or a loss as Tic-Tac-Toe when played by two 'perfect' players will always end in a tie.

## Project goals

I created this project in order to practice javascript OOP principles and learning how to code something without using the global namespace by making use of IIFE's and modules. One of the biggest hurdles was managing the constantly changing context of the `this` keyword. Another challenge was building my modules in a way that makes sensible use of private and public functions. Meaning you don't end up returning every single function as a public function in the end. I'm still not satisfied with the result, but seeing how time is limited and there's still a lot more to learn, it's time to move on to a new project instead of endlessly refactoring this specific project.

Another goal was transforming theory and pseudocode of the minimax algorithm into a fully functional implementation of the algorithm specifically for Tic-Tac-Toe. At first I fully implemented the two player version of the game first which ended up being a mistake as my code then needed a fair bit of refactoring in order to make everything suitable for the minimax algorithm. 

Creating a design for the app itself took a bit of time, but wasn't the main focus of the project. Hence the rather minimal approach.

## License

MIT

