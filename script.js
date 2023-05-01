// I think my brain is having an official meltdown on the Tic-Tac-Toe project. Going from the library project to this one feels like I missed a lesson or fifty haha.

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getPlayerMark = () => mark;

    let isPlayerTurn = null;
    const setPlayerTurn = (turnTrueOrFalse) => {
        this.isPlayerTurn = turnTrueOrFalse
    }

    const getPlayerTurn = () => {
        return this.isPlayerTurn
    }

    return {getName, getPlayerMark, setPlayerTurn, getPlayerTurn};
};

const gameFlow = (() => {

    let gameIsActive = false;
    const setGameIsActive = () => {
        if (gameIsActive === false) {
            gameIsActive = true;
        }
        else {
            gameIsActive = false;
        }
    }

    const getGameIsActive = () => {
        return gameIsActive;
    }

    const playerOne = null;
    const playerTwo = null;
    const setPlayers = () => {
        gameFlow.playerOne = playerFactory(prompt('Player 1'), 'X');
        gameFlow.playerTwo = playerFactory(prompt('Player 2'), 'O');
    }

    const getPlayers = () => {
        return [gameFlow.playerOne.getName(), gameFlow.playerTwo.getName()];
    }

    const placeMarker = function () {
        if (gameFlow.playerOne.getPlayerMark() === true) {
            this.textContent = gameFlow.playerOne.getPlayerMark();
        } else {
            this.textContent = gameFlow.playerTwo.getPlayerMark();
        }
    }

    return {setPlayers, getPlayers, placeMarker, getGameIsActive}
})();

const gameboard = (() => {

    const gameboardRows = {
        //Change values in array to NULL later to facilitate checking if a spot is empty or not
        topRow: [null, null, null],
        middleRow: [null, null, null],
        bottomRow: [null, null, null]
    }

    const _createGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container');
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('div');
            gameboardCell.className = 'gameboard-cell';
            gameboardCell.id = i;
            gameboard.append(gameboardCell);
        }
    }
    const _updateGameboard = (row1, row2, row3) => {

    }

    const _gameboardListeners = (row1, row2, row3) => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');

        gameboardCells.forEach(element => {
            element.addEventListener('click', gameFlow.placeMarker)
        });
    }  

    _createGameboard();
    _gameboardListeners();
})();

const displayController = (() => {

    const startResetListener = () => {
        const button = document.querySelector('button.start-reset-button');
        button.addEventListener('click', displayController.displayStartResetButton)
    }

    const displayStartResetButton = () => {
        const buttonText = document.querySelector('#start-reset-text')
        const buttonIcon = document.querySelector('#start-reset-icon')

        if (gameFlow.getGameIsActive() === false) {
            buttonText.textContent = 'Start game';
            buttonIcon.textContent = 'start';
        }
        else {
            buttonText.textContent = 'Reset game';
            buttonIcon.textContent = 'restart_alt'
        }
    }

    displayStartResetButton();

    return {displayStartResetButton}
})();
