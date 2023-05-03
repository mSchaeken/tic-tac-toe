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

    return {
        getName, 
        getPlayerMark, 
        setPlayerTurn, 
        getPlayerTurn
    };
};

const gameFlow = (() => {

    let gameIsActive = true;
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

    let playerOneMarker = null;
    let playerTwoMarker = null;
    const setMarkers = function () {
        //Switch
        //Case player one (this.id) x gets clicked -> playerOneMarker = X && playerTwoMarker = O
        //Case player one o gets clicked -> above in reverse
        //Case player two x gets clicked -> playerOneMarker = X && playerTwoMarker = O
        //Case player two O gets clicked -> above in reverse
        switch (this.id) {
            case 'player-one-o':
                gameFlow.playerOneMarker = 'O';
                gameFlow.playerTwoMarker = 'X';
                break;
            case 'player-one-x':
                gameFlow.playerOneMarker = 'X';
                gameFlow.playerTwoMarker = 'O';
                break;
            case 'player-two-o':
                gameFlow.playerOneMarker = 'X';
                gameFlow.playerTwoMarker = 'O';
                break;
            case 'player-two-x':
                gameFlow.playerOneMarker = 'O';
                gameFlow.playerTwoMarker = 'X';
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

        gameFlow.playerOne = playerFactory(playerOneForm, 'X');
        gameFlow.playerTwo = playerFactory(playerTwoForm, 'O');
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

    return {
        setPlayers, 
        getPlayers,
        setMarkers, 
        placeMarker, 
        getGameIsActive,
        toggleGameIsActive
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

    const toggleStartResetButton = () => {
        //Toggle gamestate
        gameFlow.toggleGameIsActive();
        const buttonText = document.querySelector('#start-reset-text');
        const buttonIcon = document.querySelector('#start-reset-icon');

        if (gameFlow.getGameIsActive() === false) {
            buttonText.textContent = 'Start game';
            buttonIcon.textContent = 'start';
        }
        else {
            buttonText.textContent = 'Reset game';
            buttonIcon.textContent = 'restart_alt'
        }
    }

    toggleStartResetButton();
    return {toggleStartResetButton}
})();

const addListeners = (() => {

    const addStartResetListener = () => {
        const button = document.querySelector('button.start-reset-button');
        button.addEventListener('click', displayController.toggleStartResetButton)
    }

    const addMarkerListeners = () => {
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

    addStartResetListener();
    addGameboardListeners();
    addMarkerListeners();
})();
