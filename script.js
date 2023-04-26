const Player = (name, mark) => {
    const getName = () => name;
    const getPlayerMark = () => mark;
    let playerTurn = null;

    return {getName, getPlayerMark};
}

const gameboard = (() => {

    const gameBoardRows = {
        //Change values in array to NULL later to facilitate checking if a spot is empty or not
        topRow: [x, o, x],
        middleRow: [o, x, o],
        bottomRow: [o, o, o]
    }
})();

const displayController = (() => {
    const renderGameboard = (row1, row2, row3) => {
        //Render the current state of the gameboard
        //Take the rows from gameboard.gameboardRows and display them on a 3x3 HTML grid
    }
})();

const gameFlow = (() => {
    const placeMarker = (player) {
        //place marker of player with player.playerTurn = true on whichever gameboard grid element was clicked
    }
})();