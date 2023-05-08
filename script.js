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
        activePlayer = gameFlow.playerOne;
    }

    let inactivePlayer = null;
    const _setInactivePlayer = () => {
        inactivePlayer = gameFlow.playerTwo;
    }

    const getActivePlayer = () => {
        return activePlayer;
    }
    
    const getInactivePlayer = () => {
        return inactivePlayer;
    }

    const toggleActivePlayer = () => {
        if (activePlayer === gameFlow.playerOne) {
            activePlayer = gameFlow.playerTwo;
            inactivePlayer = gameFlow.playerOne
        } else {
            activePlayer = gameFlow.playerOne;
            inactivePlayer = gameFlow.playerTwo
        }
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
        _setInactivePlayer();
    }

    const getPlayers = () => {
        return [gameFlow.playerOne.getName(), gameFlow.playerTwo.getName()];
    }

    const _resetPlayers = () => {
        gameFlow.playerOne = null;
        gameFlow.playerTwo = null;
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
            displayController.clearDisplay();
            _resetPlayers();
            gameboard.resetGameboard();
        }
    }

    return {
        getPlayers,
        getActivePlayer,
        getInactivePlayer,
        toggleActivePlayer,
        setMarkers,
        getGameIsActive,
        startGame,
        resetGame
    };
})();

const gameboard = (() => {

    const gameboardRows = {
        topRow: [null, null, null],
        middleRow: [null, null, null],
        bottomRow: [null, null, null]
    }
    
    const resetGameboard = () => {
            gameboardRows.topRow = [null, null, null],
            gameboardRows.middleRow = [null, null, null],
            gameboardRows.bottomRow = [null, null, null]
    }

    const checkForGameOver = () => {
        //If one of three rows have equal values -> game over
        //If each similar index in three rows have equal values -> game over
        //If topRow[0] && middleRow[1] && bottomRow[2] are equal -> game over
        //If bottomRow[0] && middleRow[1] && topRow[2] are equal -> game over
        //If all rows have no NULL values anymore -> game over
        if (gameboardRows.bottomRow.find(
            (element) =>
            element === gameFlow.getInactivePlayer().getPlayerMark() ||
            element === null
            ) 
            === undefined) {
                // alert(`${gameFlow.getActivePlayer().getName()} wins!`)
            }
    }

    const _checkIfValidMove = function (index) {
        cellIndex = parseInt(index);

        switch (true) {
            //Subtraction in indices is to account for the arrays being split up in three separate arrays
            //while the HTML elements are indexed from 0-8
            case (cellIndex < 3):
                if (gameboardRows.bottomRow[cellIndex] === null) {
                    return true;
                } else {
                    return false;
                }
            case (cellIndex >= 3 && cellIndex < 6):
                if (gameboardRows.middleRow[cellIndex - 3] === null) {
                    return true;
                } else {
                    return false;
                }                
            case (cellIndex >= 6 && cellIndex < 9):
                if (gameboardRows.topRow[cellIndex - 6] === null) {
                    return true;
                } else {
                    return false;
                }            
        }
    }

    const updateGameboardRows = function (element) {
        const that = element;
        const cellIndex = parseInt(that.id);
        console.log(_checkIfValidMove(that.id))
 
        if (_checkIfValidMove(that.id) === true) {
            //Subtraction in indices is to account for the arrays being split up in three separate arrays
            //while the HTML elements are indexed from 0-8
            switch (true) {
                case (cellIndex < 3):
                    gameboardRows.bottomRow[cellIndex] = gameFlow.getActivePlayer().getPlayerMark()
                    break;
                case (cellIndex >= 3 && cellIndex < 6):
                    gameboardRows.middleRow[cellIndex - 3] = gameFlow.getActivePlayer().getPlayerMark()
                    break;
                case (cellIndex >= 6 && cellIndex < 9):
                    gameboardRows.topRow[cellIndex - 6] = gameFlow.getActivePlayer().getPlayerMark()
                    break;
            }
        }
    }

    const placeMarker = function () {
        const that = this

        if (gameFlow.getActivePlayer() === gameFlow.playerOne) {
            this.textContent = gameFlow.playerOne.getPlayerMark();
        } else {
            this.textContent = gameFlow.playerTwo.getPlayerMark();
        }

        gameboard.updateGameboardRows(that);
        gameFlow.toggleActivePlayer();
    }

    return {
        updateGameboardRows,
        resetGameboard,
        checkForGameOver,
        placeMarker
    }
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

    const clearDisplay = () => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');
        const playerNameFields = document.querySelectorAll('input');

        gameboardCells.forEach(gameboardCell => {
            gameboardCell.textContent = '';
        });

        playerNameFields.forEach(playerNameField => {
            playerNameField.value = '';
        });
    }

    const _createGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container');
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('div');
            gameboardCell.className = 'gameboard-cell';
            gameboardCell.id = (8 - i);
            gameboard.append(gameboardCell);
        }
    }

    toggleGameInfoDisplay();
    _createGameboard();

    return {
        toggleGameInfoDisplay,
        clearDisplay
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
            element.addEventListener('click', gameboard.placeMarker);
        });

        gameboardCells.forEach(element => {
            element.addEventListener('click', gameboard.checkForGameOver)
        });
    }  

    _addStartButtonListener();
    _addResetButtonListener();
    _addMarkerButtonListeners();
    _addGameboardListeners();
})();
