const Player = (name, mark) => {
    const getName = () => name;
    const getPlayerMark = () => mark;
    let playerTurn = null;

    return {getName, getPlayerMark};
}

const gameboard = (() => {

    const gameBoardRows = {
        //Change values in array to NULL later to facilitate checking if a spot is empty or not
        topRow: ['x', 'x', 'x'],
        middleRow: ['o', 'o', 'x'],
        bottomRow: ['x', 'o', 'o']
    }
})();

const displayController = (() => {

    const _createGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container')
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('div')
            gameboardCell.className = 'gameboard-cell'
            gameboardCell.id = i;
            gameboardCell.textContent = 'O'
            gameboard.append(gameboardCell);
        }
    }
    const _renderGameboard = (row1, row2, row3) => {

    }
    return _createGameboard();
})();

const gameFlow = (() => {
    const placeMarker = (player) => {
        //place marker of player with player.playerTurn = true on whichever gameboard grid element was clicked
    }
})();

const test = (() => {
    const testMessage = () => {
        console.log('test')
    }
    testMessage();
})();