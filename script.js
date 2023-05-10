const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {
        getName, 
        getMark, 
    };
};

const gameFlow = (() => {
    let gameIsActive = false;
    const toggleGameIsActive = () => {
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
            inactivePlayer = gameFlow.playerOne;
        } else {
            activePlayer = gameFlow.playerOne;
            inactivePlayer = gameFlow.playerTwo;
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
        displayController.displayPlayerMarker(playerOneMarker);
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

        gameFlow.playerOne = playerFactory(playerOneForm, playerOneMarker);
        gameFlow.playerTwo = playerFactory(playerTwoForm, playerTwoMarker);

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
            toggleGameIsActive();
            displayController.toggleGameInfoDisplay();
            _setPlayers();
            displayController.displayActiveGameInfo();
            displayController.toggleNewGameButton();
        }
    }

    const resetGame = () => {
        if (getGameIsActive() === false) {
            displayController.toggleGameInfoDisplay();
            displayController.clearDisplay();
            displayController.clearActiveGameInfo();
            _resetPlayers();
            gameboard.resetGameboard();
        }
    }

    return {
        getPlayers,
        getActivePlayer,
        getInactivePlayer,
        toggleGameIsActive,
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

    const getGameboardRows = () => {
        const allRows = [
            gameboardRows.bottomRow,
            gameboardRows.middleRow,
            gameboardRows.topRow
        ];

        return allRows
    }

    const resetGameboard = () => {
            gameboardRows.topRow = [null, null, null],
            gameboardRows.middleRow = [null, null, null],
            gameboardRows.bottomRow = [null, null, null]
    }

    const _checkForGameOver = () => {
        const allRows = [
            gameboardRows.bottomRow,
            gameboardRows.middleRow,
            gameboardRows.topRow
        ];

        const activeMark = gameFlow.getActivePlayer().getMark();
        const inactiveMark = gameFlow.getInactivePlayer().getMark();
        const activePlayer = gameFlow.getActivePlayer().getName();

        const checkRow = function (row) {
            return row.find(
              (mark) => mark === inactiveMark || mark === null
            );
          };
        
        //Check for horizontal wins
        allRows.forEach(row => {
            if (checkRow(row) === undefined) {
                displayController.toggleNewGameButton();
                displayController.displayWinner(gameFlow.getActivePlayer().getName())
                gameFlow.toggleGameIsActive();
                return;
            }
        })
        
        //Check for vertical wins
        for (let i = 0; i < 3; i++) {
            let verticalRow = [];

            allRows.forEach(row => {
                verticalRow.push(row[i]);
            })

            if (checkRow(verticalRow) === undefined) {
                displayController.toggleNewGameButton();
                displayController.displayWinner(gameFlow.getActivePlayer().getName())
                gameFlow.toggleGameIsActive();
                return;
            };
        };

        //Check for diagonal wins
        let diagonalRowOne = [];
        let diagonalRowTwo = [];
        let diagonalRows = [diagonalRowOne, diagonalRowTwo];

        diagonalRowOne.push(
            allRows[0][0],
            allRows[1][1],
            allRows[2][2]
        );

        diagonalRowTwo.push(
            allRows[0][2],
            allRows[1][1],
            allRows[2][0]
        );

        diagonalRows.forEach(row => {
            if (checkRow(row) === undefined) {
                displayController.toggleNewGameButton();
                displayController.displayWinner(gameFlow.getActivePlayer().getName())
                gameFlow.toggleGameIsActive();
                return;
            }
        });

        //Check for ties
        let rowFullCounter = 0
        allRows.forEach(row => {
            if (
                row[0] !== null &
                row[1] !== null &
                row[2] !== null
                ) {
                rowFullCounter ++;
            }
        })

        if (rowFullCounter === 3) {
            displayController.toggleNewGameButton();
            displayController.displayWinner(null)
            gameFlow.toggleGameIsActive();
            return;
        }
    };

    const checkIfValidMove = function (index) {
        cellIndex = parseInt(index);

        switch (true) {
            /*
            Subtraction in indices is to account for the arrays being split up in 
            three separate arrays and the HTML elements being indexed from 0-8
            */
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

    const _updateGameboardRows = function (element) {
        const that = element;
        const cellIndex = parseInt(that.id);
 
        if (checkIfValidMove(that.id) === true) {
            /*
            Subtraction in indices is to account for the arrays being split up in 
            three separate arrays and the HTML elements being indexed from 0-8
            */
            switch (true) {
                case (cellIndex < 3):
                    gameboardRows.bottomRow[cellIndex] = gameFlow.getActivePlayer().getMark()
                    break;
                case (cellIndex >= 3 && cellIndex < 6):
                    gameboardRows.middleRow[cellIndex - 3] = gameFlow.getActivePlayer().getMark()
                    break;
                case (cellIndex >= 6 && cellIndex < 9):
                    gameboardRows.topRow[cellIndex - 6] = gameFlow.getActivePlayer().getMark()
                    break;
            }
        }
    }

    const placePlayerMarker = function () {
        const that = this;
        let playerOneMark = null;
        let playerTwoMark = null;

        if (gameFlow.playerOne.getMark() === 'X') {
            playerOneMark = 'close';
            playerTwoMark = 'circle';
        } else {
            playerOneMark = 'circle';
            playerTwoMark = 'close';
        }

        if (checkIfValidMove(that.id) === true &&
            gameFlow.getGameIsActive() === true) {

            if (gameFlow.getActivePlayer() === gameFlow.playerOne) {
                this.textContent = playerOneMark;
                _updateGameboardRows(that);
                _checkForGameOver();
                gameFlow.toggleActivePlayer();
            } else {
                this.textContent = playerTwoMark;
                _updateGameboardRows(that);
                _checkForGameOver();
                gameFlow.toggleActivePlayer();
            }
        }
    }

    const placeComputerMarker = function (indices) {
        console.log(indices)
    }

    return {
        getGameboardRows,
        checkIfValidMove,
        resetGameboard,
        placePlayerMarker,
        placeComputerMarker
    }
})();

const displayController = (() => {
    const toggleNewGameButton = () => {
        const newGameButton = document.querySelector('.reset-div');
        const versusDiv = document.querySelector('.versus-div');

        if (newGameButton.style.display === 'none' ) {
            newGameButton.style.display = 'flex';
            versusDiv.style.display = 'none';
        } else {
            newGameButton.style.display = 'none';
            versusDiv.style.display = 'flex';
        }
    }

    const toggleGameInfoDisplay = () => {
        const gameActiveDiv = document.querySelector('.game-active-div');
        const gameInactiveDiv = document.querySelector('.game-inactive-div');

        if (gameFlow.getGameIsActive() === true) {
            gameActiveDiv.style.display = 'flex';
            gameInactiveDiv.style.display = 'none';
        } else {
            gameActiveDiv.style.display = 'none';
            gameInactiveDiv.style.display = 'flex';
        }
    }

    const displayPlayerMarker = (mark) => {
        const playerOneMarkerSpan = document.querySelector('#player-one-span');
        const playerTwoMarkerSpan = document.querySelector('#player-two-span');

        if (gameFlow.getGameIsActive() === true) {
            playerOneMarkerSpan.textContent = '';
            playerTwoMarkerSpan.textContent = '';
        }  else {
            if (mark === 'X') {
                playerOneMarkerSpan.textContent = 'close';
                playerTwoMarkerSpan.textContent = 'circle';
            } else {
                playerOneMarkerSpan.textContent = 'circle';
                playerTwoMarkerSpan.textContent = 'close';
            }
        }
    }

    const clearActiveGameInfo = () => {
        const playerOneMark = document.querySelector('.player-one-mark');
        const playerTwoMark = document.querySelector('.player-two-mark');

        if (playerOneMark.firstElementChild != null) {
            playerOneMark.removeChild(playerOneMark.firstElementChild);
            playerTwoMark.removeChild(playerTwoMark.firstElementChild);
        }
    }

    const displayActiveGameInfo = () => {
        const playerOneName = document.querySelector('.player-one-name');
        const playerTwoName = document.querySelector('.player-two-name');
        const playerOneMark = document.querySelector('.player-one-mark');
        const playerTwoMark = document.querySelector('.player-two-mark');

        const markSpanOne = document.createElement('span');
        const markSpanTwo = document.createElement('span');

        markSpanOne.className = 'material-symbols-outlined';
        markSpanTwo.className = 'material-symbols-outlined';          
        playerOneName.textContent = `${gameFlow.getPlayers()[0]}`;
        playerTwoName.textContent = `${gameFlow.getPlayers()[1]}`;
        
        if (gameFlow.getActivePlayer().getMark() === 'X') {
            markSpanOne.textContent = 'close';
            markSpanTwo.textContent = 'circle';
        } else {
            markSpanOne.textContent = 'circle';
            markSpanTwo.textContent = 'close';
        }

        playerOneMark.append(markSpanOne);
        playerTwoMark.append(markSpanTwo);  
    }

    const displayWinner = (player) => {
        const playerOne = document.querySelector('.player-one-winner');
        const playerTwo = document.querySelector('.player-two-winner');

        if (player === gameFlow.getPlayers()[0]) {
            playerOne.textContent = 'Wins!';
            playerTwo.textContent = 'Loses.';
        } else if (player === gameFlow.getPlayers()[1]){
            playerOne.textContent = 'Loses.';
            playerTwo.textContent = 'Wins!';
        } else {
            playerOne.textContent = 'Tie.'
            playerTwo.textContent = 'Tie.'
        }
    }

    const clearDisplay = () => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');
        const playerNameFields = document.querySelectorAll('input');
        const resultFieldOne = document.querySelector('.player-one-winner');
        const resultFieldTwo = document.querySelector('.player-two-winner');
        const resultFields = [resultFieldOne, resultFieldTwo]

        gameboardCells.forEach(gameboardCell => {
            gameboardCell.textContent = '';
        });

        playerNameFields.forEach(playerNameField => {
            playerNameField.value = '';
        });

        resultFields.forEach(field => {
            field.textContent = '';
        })
    }

    const _displayGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container');
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('span');
            gameboardCell.className = 'gameboard-cell material-symbols-outlined';
            /*
            (8 - i) was neccesary to start the index at 0 in the bottom row on screen.
            Turned out to be a lot less practical than I thought, so might change this
            later on but requires a fair bit of refactoring.
            */
            gameboardCell.id = (8 - i);
            gameboard.append(gameboardCell);
        }
    }

    displayPlayerMarker('X');
    toggleGameInfoDisplay();
    _displayGameboard();

    return {
        toggleNewGameButton,
        toggleGameInfoDisplay,
        displayPlayerMarker,
        displayActiveGameInfo,
        clearActiveGameInfo,
        displayWinner,
        clearDisplay
    }
})();

const aiOpponent = (() => {
    const getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    }

    const getRandomValidMove = (row, rowindex) => {
        if (gameboard.getGameboardRows()[row][rowindex] === null) {
            const validIndices = [row, rowindex]
            return validIndices;
        } else {
            return false;
        }
    }

    return {
       getRandomValidMove
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
            element.addEventListener('click', gameboard.placePlayerMarker);
        });
    } 

    _addStartButtonListener();
    _addResetButtonListener();
    _addMarkerButtonListeners();
    _addGameboardListeners();
})();
