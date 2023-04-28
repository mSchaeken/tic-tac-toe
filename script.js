const playerFactory = (name, mark) => {
    const getName = () => name;
    const getPlayerMark = () => mark;

    let isPlayerTurn = true;
    const changePlayerTurn = () => {
        if (this.isPlayerTurn === true) {
            this.isPlayerTurn = false;
        } else {
            this.isPlayerTurn = true;
        }
        return this.isPlayerTurn;
    }

    return {getName, getPlayerMark, changePlayerTurn};
};


const gameboard = (() => {

    const gameboardRows = {
        //Change values in array to NULL later to facilitate checking if a spot is empty or not
        topRow: [null, null, null],
        middleRow: [null, null, null],
        bottomRow: [null, null, null]
    }

    const _createGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container')
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('div')
            gameboardCell.className = 'gameboard-cell'
            gameboardCell.id = i;
            gameboard.append(gameboardCell);
        }
    }
    const _updateGameboard = (row1, row2, row3) => {

    }

    const gameboardListeners = (row1, row2, row3) => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell')

        gameboardCells.forEach(element => {
            element.addEventListener('click', gameFlow.placeMarker)
        });
    }  

    _createGameboard();
})();

const displayController = (() => {
      
})();


const gameFlow = (() => {
    const playerOne = null
    const playerTwo = null
    const setPlayers = () => {
        gameFlow.playerOne = playerFactory(prompt('Player 1'), 'X')
        gameFlow.playerTwo = playerFactory(prompt('Player 2'), 'O')
    }

    const getPlayers = () => {
        return [gameFlow.playerOne.getName(), gameFlow.playerTwo.getName()]
    }

    const placeMarker = () => {
    }

    return {setPlayers, getPlayers, placeMarker}
})();