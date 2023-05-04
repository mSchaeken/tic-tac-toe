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

    return {
        getName, 
        getPlayerMark, 
        setPlayerTurn, 
        getPlayerTurn
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

    const playerOne = null;
    const playerTwo = null;
    const setPlayers = () => {
        let playerOneForm = document.querySelector('#player-one').value;
        let playerTwoForm = document.querySelector('#player-two').value;

        if (playerOneForm === '' || playerTwoForm === '') {
            playerOneForm = 'Sherlock';
            playerTwoForm = 'Watson';
        } 

        gameFlow.playerOne = playerFactory(playerOneForm, playerOneMarker);
        gameFlow.playerTwo = playerFactory(playerTwoForm, playerTwoMarker);
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

    const startGame = () => {
        if (getGameIsActive() === false) {
            toggleGameIsActive();
            setPlayers();
        }

    }

    return {
        setPlayers, 
        getPlayers,
        setMarkers, 
        placeMarker,
        getGameIsActive,
        toggleGameIsActive,
        startGame
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

})();

const addListeners = (() => {

    const addStartButtonListener = () => {
        const button = document.querySelector('.start-button');
        button.addEventListener('click', gameFlow.startGame);
    }

    const addMarkerButtonListeners = () => {
        const buttons = document.querySelectorAll('.marker')
        buttons.forEach(button => {
            button.addEventListener('click', gameFlow.setMarkers);
        });
    }

    const addGameboardListeners = (row1, row2, row3) => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');

        gameboardCells.forEach(element => {
            element.addEventListener('click', gameFlow.placeMarker);
        });
    }  

    addStartButtonListener();
    addGameboardListeners();
    addMarkerButtonListeners();
})();
