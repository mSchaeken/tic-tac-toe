const playerFactory = (name, mark, isTurnTrueOrFalse) => {
    const getName = () => name;
    const getPlayerMark = () => mark;

    let isPlayerTurn = isTurnTrueOrFalse;
    const setPlayerTurn = () => {
        if (isPlayerTurn === true) {
            isPlayerTurn = false;
        } else {
            isPlayerTurn = true;
        }
    }

    const getPlayerTurn = function () {
        return isPlayerTurn
    }

    return {
        getName, 
        getPlayerMark, 
        setPlayerTurn, 
        getPlayerTurn
    };
};

const gameFlow = (() => {

    let gameIsActive = false;
    const _toggleGameIsActive = () => {
        if (gameIsActive === false) {
            gameIsActive = true;
        } else {
            gameIsActive = false;
        }
    }

    const getGameIsActive = () => {
        return gameIsActive;
    }

    let activePlayer = null;
    const _setActivePlayer = () => {
        activePlayer = gameFlow.playerOne.getName();
    }

    const _toggleActivePlayer = () => {
        if (activePlayer === gameFlow.playerOne.getName()) {
            activePlayer = gameFlow.playerTwo.getName();
        } else {
            activePlayer = gameFlow.playerOne.getName();
        }
    }

    const getActivePlayer = () => {
        return activePlayer;
    }

    let playerOneMarker = 'X';
    let playerTwoMarker = 'O';
    const setMarkers = function () {
        switch (this.id) {
            case 'player-one-o':
                playerOneMarker = 'O';
                playerTwoMarker = 'X';
                break;
            case 'player-one-x':
                playerOneMarker = 'X';
                playerTwoMarker = 'O';
                break;
            case 'player-two-o':
                playerOneMarker = 'X';
                playerTwoMarker = 'O';
                break;
            case 'player-two-x':
                playerOneMarker = 'O';
                playerTwoMarker = 'X';
                break;
        }
       
    }

    let playerOne = null;
    let playerTwo = null;
    const _setPlayers = () => {
        let playerOneForm = document.querySelector('#player-one').value;
        let playerTwoForm = document.querySelector('#player-two').value;

        if (playerOneForm === '' || playerTwoForm === '') {
            playerOneForm = 'Sherlock';
            playerTwoForm = 'Watson';
        } 

        gameFlow.playerOne = playerFactory(playerOneForm, playerOneMarker, true);
        gameFlow.playerTwo = playerFactory(playerTwoForm, playerTwoMarker, false);

        _setActivePlayer();
    }

    const getPlayers = () => {
        return [gameFlow.playerOne.getName(), gameFlow.playerTwo.getName()];
    }

    const _resetPlayers = () => {
        gameFlow.playerOne = null;
        gameFlow.playerTwo = null;
    }

    const placeMarker = function () {
        if (gameFlow.getActivePlayer() === gameFlow.playerOne.getName()) {
            this.textContent = gameFlow.playerOne.getPlayerMark();
        } else {
            this.textContent = gameFlow.playerTwo.getPlayerMark();
        }

        _toggleActivePlayer();
    }

    const startGame = () => {
        if (getGameIsActive() === false) {
            _toggleGameIsActive();
            displayController.toggleGameInfoDisplay();
            _setPlayers();
        }
    }

    const resetGame = () => {
        if (getGameIsActive() === true) {
            _toggleGameIsActive();
            displayController.toggleGameInfoDisplay();
            displayController.clearGameboardDisplay();
            _resetPlayers();
        }
    }

    return {
        getPlayers,
        getActivePlayer,
        setMarkers,
        placeMarker,
        getGameIsActive,
        startGame,
        resetGame
    };
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

    _createGameboard();
})();

const displayController = (() => {

    const toggleGameInfoDisplay = () => {
        const gameActiveDiv = document.querySelector('.game-active-div');
        const gameInactiveDiv = document.querySelector('.game-inactive-div');

        if (gameFlow.getGameIsActive() === true) {
            gameActiveDiv.style.display = 'block';
            gameInactiveDiv.style.display = 'none';
        } else {
            gameActiveDiv.style.display = 'none';
            gameInactiveDiv.style.display = 'block';
        }
    }

    const clearGameboardDisplay = () => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');
        gameboardCells.forEach(gameboardCell => {
            gameboardCell.textContent = '';
        });
    }

    toggleGameInfoDisplay();

    return {
        toggleGameInfoDisplay,
        clearGameboardDisplay
    }
})();

const addListeners = (() => {

    const _addStartButtonListener = () => {
        const button = document.querySelector('.start-button');
        button.addEventListener('click', gameFlow.startGame);
    }

    const _addResetButtonListener = () => {
        const button = document.querySelector('.reset-button')
        button.addEventListener('click', gameFlow.resetGame)
    }

    const _addMarkerButtonListeners = () => {
        const buttons = document.querySelectorAll('.marker')
        buttons.forEach(button => {
            button.addEventListener('click', gameFlow.setMarkers);
        });
    }

    const _addGameboardListeners = (row1, row2, row3) => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');

        gameboardCells.forEach(element => {
            element.addEventListener('click', gameFlow.placeMarker);
        });
    }  

    _addStartButtonListener();
    _addResetButtonListener();
    _addMarkerButtonListeners();
    _addGameboardListeners();
})();
