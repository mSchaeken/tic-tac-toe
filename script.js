const playerFactory = (name, mark, playerType) => {
    const getName = () => name;
    const getMark = () => mark;
    const getPlayerType = () => playerType;

    return {
        getName, 
        getMark,
        getPlayerType 
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

            if (gameFlow.getOpponent() === 'computer') {
                setTimeout(gameboard.placeComputerMarker(), 3000)
                toggleActivePlayer()
            }

        } else {
            activePlayer = gameFlow.playerOne;
            inactivePlayer = gameFlow.playerTwo;
        }
    }

    let playerOneMarker = 'X';
    let playerTwoMarker = 'O';

    let playerOne = null;
    let playerTwo = null;
    const _setPlayers = () => {
        if (opponent === 'player') {
            let playerOneName = document.querySelector('#player-one').value;
            let playerTwoName = document.querySelector('#player-two').value;

            if (playerOneName === '' || playerTwoName === '') {
                playerOneName = 'Sherlock';
                playerTwoName = 'Watson';
            } 
            
            gameFlow.playerOne = playerFactory(playerOneName, playerOneMarker, 'player');
            gameFlow.playerTwo = playerFactory(playerTwoName, playerTwoMarker, 'player');
        
        } else {
            let playerOneName = document.querySelector('#player-one').value;
            let playerTwoName = computerOpponentName

            if (playerOneName === '') {
                playerOneName === 'Sherlock'
            }

            gameFlow.playerOne = playerFactory(playerOneName, 'X', 'player')
            gameFlow.playerTwo = playerFactory(playerTwoName, 'O', 'computer')
        }
        

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
            displayController.displayPlayerTwoComputerOrPlayer(gameFlow.getActivePlayer().getPlayerType())
            _resetPlayers();
            gameboard.resetGameboard();
        }
    }

    //
    let opponent = 'player'
    const setOpponent = function () {
        if (this.id === 'player-versus-button') {
            opponent = 'player'
            displayController.displayPlayerTwoComputerOrPlayer('player')
        } else {
            opponent = 'computer'
            aiOpponent.setAiOpponentDifficulty()
            gameFlow.setComputerOpponentName()
            displayController.displayPlayerTwoComputerOrPlayer('computer')
        }
    }
    
    const getOpponent = function () {
        return opponent
    }

    let computerOpponentName = null
    const setComputerOpponentName = () => {
        switch (aiOpponent.getAiOpponentDifficulty()) {
            case 'easy':
                computerOpponentName = 'Fred Flintstone'
                break
            case 'medium':
                computerOpponentName = 'Dr. John Dollar'
                break
            case 'impossible':
                computerOpponentName = 'Moriarty'
                break
        }
        
        displayController.displayComputerOpponentName();
    }

    const getComputerOpponentName = () => {
        return computerOpponentName
    }


    return {
        getPlayers,
        getActivePlayer,
        getInactivePlayer,
        toggleGameIsActive,
        toggleActivePlayer,
        getGameIsActive,
        startGame,
        resetGame,
        setComputerOpponentName,
        getComputerOpponentName,
        setOpponent,
        getOpponent
    };
})();


const gameboard = (() => {
    let gameboardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ]

    const getGameboardState = () => {
        return gameboard.gameboardState
    }

    function resetGameboard () {
        gameboard.gameboardState = [
            null, null, null,
            null, null, null,
            null, null, null
        ]
    }

    const _checkForGameOver = () => {
        const activeMark = gameFlow.getActivePlayer().getMark();
        const inactiveMark = gameFlow.getInactivePlayer().getMark();
        const activePlayer = gameFlow.getActivePlayer().getName();
      
        const gameOver = (player = gameFlow.getActivePlayer().getName()) => {
          displayController.toggleNewGameButton();
          displayController.displayWinner(player);
          gameFlow.toggleGameIsActive();
          return true;
        };
      
        //Horizontal states
        if (
          gameboard.getGameboardState()[0] === activeMark &&
          gameboard.getGameboardState()[1] === activeMark &&
          gameboard.getGameboardState()[2] === activeMark
        ) {
          gameOver();
        }
      
        if (
          gameboard.getGameboardState()[3] === activeMark &&
          gameboard.getGameboardState()[4] === activeMark &&
          gameboard.getGameboardState()[5] === activeMark
        ) {
          gameOver();
        }
      
        if (
          gameboard.getGameboardState()[6] === activeMark &&
          gameboard.getGameboardState()[7] === activeMark &&
          gameboard.getGameboardState()[8] === activeMark
        ) {
          gameOver();
        }
      
        //Vertical states
        if (
          gameboard.getGameboardState()[0] === activeMark &&
          gameboard.getGameboardState()[3] === activeMark &&
          gameboard.getGameboardState()[6] === activeMark
        ) {
          gameOver();
        }
      
        if (
          gameboard.getGameboardState()[1] === activeMark &&
          gameboard.getGameboardState()[4] === activeMark &&
          gameboard.getGameboardState()[7] === activeMark
        ) {
          gameOver();
        }
      
        if (
          gameboard.getGameboardState()[2] === activeMark &&
          gameboard.getGameboardState()[5] === activeMark &&
          gameboard.getGameboardState()[8] === activeMark
        ) {
          gameOver();
        }
      
        //Diagonal states
        if (
          gameboard.getGameboardState()[0] === activeMark &&
          gameboard.getGameboardState()[4] === activeMark &&
          gameboard.getGameboardState()[8] === activeMark
        ) {
          gameOver();
        }
      
        if (
          gameboard.getGameboardState()[2] === activeMark &&
          gameboard.getGameboardState()[4] === activeMark &&
          gameboard.getGameboardState()[6] === activeMark
        ) {
          gameOver();
        }
      
        let tieCounter = 0;
        gameboard.gameboardState.forEach((element) => {
          if (element !== null) {
            tieCounter++;
          }
        });
        if (tieCounter === 9) {
          gameOver(null);
        }
      };      

    const checkIfValidMove = function (index) {
        cellIndex = parseInt(index);

                if (gameboard.gameboardState[cellIndex] === null) {
                    return true;
                } else {
                    return false;
                } 
        }

    function _updateGameboardRows(element) {
        const that = element;
        const cellIndex = parseInt(that.id);

        if (checkIfValidMove(that.id) === true && gameFlow.getActivePlayer().getPlayerType() === 'player') {
                    gameboard.gameboardState[cellIndex] = gameFlow.getActivePlayer().getMark();
        }

        if (gameFlow.getActivePlayer().getPlayerType() === 'computer') {
            gameboard.gameboardState[element] = gameFlow.getActivePlayer().getMark()
        }
    }

    const placePlayerMarker = function () {
        const that = this;
        console.log(that)

        if (checkIfValidMove(that.id) === true &&
            gameFlow.getGameIsActive() === true) {

            if (gameFlow.getActivePlayer().getName() === gameFlow.playerOne.getName()) {
                this.textContent = gameFlow.getActivePlayer().getMark();
                _updateGameboardRows(that);
                _checkForGameOver();
                gameFlow.toggleActivePlayer();
            } else {
                this.textContent = gameFlow.getActivePlayer().getMark();
                _updateGameboardRows(that);
                _checkForGameOver();
                gameFlow.toggleActivePlayer();
            }
        }
    }

    const placeComputerMarker = function (indices) {
        const gameboardCells = document.querySelectorAll('.gameboard-cell')
        
        let move = aiOpponent.getRandomValidMove(aiOpponent.getRandomInt(8))
        if (move !== false &&
          gameFlow.getGameIsActive() === true
        ) {
            console.log(move)
            gameboardCells[move].textContent = gameFlow.getActivePlayer().getMark()
            _updateGameboardRows(move)
            _checkForGameOver()
        } else if (gameFlow.getGameIsActive() === true) {
            placeComputerMarker()
        }
      };

    return {
        gameboardState,
        getGameboardState,
        checkIfValidMove,
        resetGameboard,
        placePlayerMarker,
        placeComputerMarker,
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
        const computerOpponentDiv = document.querySelector('.computer-div')
        const opponentSelectionDiv = document.querySelector('.opponent-selection-div')

        if (gameFlow.getGameIsActive() === true) {
            gameActiveDiv.style.display = 'flex';
            gameInactiveDiv.style.display = 'none';
            opponentSelectionDiv.style.display = 'none'
        } else {
            gameActiveDiv.style.display = 'none';
            gameInactiveDiv.style.display = 'flex';
            opponentSelectionDiv.style.display = 'flex'
            computerOpponentDiv.style.display = 'flex';
        }

    }

    const displayPlayerMarker = (mark) => {
        const playerOneMarkerSpan = document.querySelector('#player-one-span');
        const playerTwoMarkerSpan = document.querySelector('#player-two-span');

        if (gameFlow.getGameIsActive() === true) {
            playerOneMarkerSpan.textContent = '';
            playerTwoMarkerSpan.textContent = '';
        }  else {
                playerOneMarkerSpan.textContent = 'close';
                playerTwoMarkerSpan.textContent = 'circle';
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
        markSpanOne.textContent = 'close';
        markSpanTwo.textContent = 'circle';
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

    const displayPlayerTwoComputerOrPlayer = (opponent) => {
        const playerOpponentDiv = document.querySelector('.player-two-div')
        const computerOpponentDiv = document.querySelector('.computer-div')

        if (opponent === 'player') {
            playerOpponentDiv.style.display = 'flex'
            computerOpponentDiv.style.display = 'none'
        } else {
            playerOpponentDiv.style.display = 'none'
            computerOpponentDiv.style.display = 'flex'          
        }
    }

    const displayComputerOpponentName = () => {
        const computerOpponentNameDiv = document.querySelector('.computer-opponent-name-div')
        computerOpponentNameDiv.textContent = `${gameFlow.getComputerOpponentName()}`
    }

    const _displayGameboard = () => {
        const gameboard = document.querySelector('.gameboard-container');
        
        for (i = 0;  i < 9; i++) {
            const gameboardCell = document.createElement('span');
            gameboardCell.className = 'gameboard-cell material-symbols-outlined';

            gameboardCell.id = i;
            gameboard.append(gameboardCell);
        }
    }

    displayPlayerMarker('X');
    toggleGameInfoDisplay();
    displayPlayerTwoComputerOrPlayer('player');
    _displayGameboard();

    return {
        toggleNewGameButton,
        toggleGameInfoDisplay,
        displayPlayerMarker,
        displayActiveGameInfo,
        displayPlayerTwoComputerOrPlayer,
        displayComputerOpponentName,
        clearActiveGameInfo,
        displayWinner,
        clearDisplay
    }
})();

const aiOpponent = (() => {

    let aiDifficulty = 'easy'
    const setAiOpponentDifficulty = function () {
        const aiDifficultyDropdown = document.querySelector('#computer-difficulty-dropdown')
        aiDifficulty = aiDifficultyDropdown.value
    }

    const getAiOpponentDifficulty = () => {
        return aiDifficulty
    }

    const getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    }

    const getRandomValidMove = (index) => {
        if (gameboard.getGameboardState()[index] === null) {
            const validIndices = [index]
            return validIndices;
        } else {
            return false;
        }
    }

    return {
        setAiOpponentDifficulty,
        getAiOpponentDifficulty,
        getRandomInt,
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

    const _addGameboardListeners = (row1, row2, row3) => {
        const gameboardCells = document.querySelectorAll('.gameboard-cell');
        gameboardCells.forEach(element => {
            element.addEventListener('click', gameboard.placePlayerMarker);
        });
    }

    const _opponentButtonListeners = () => {
        const buttons = document.querySelectorAll('.opponent-button')
        buttons.forEach(element => {
            element.addEventListener('click', gameFlow.setOpponent)
        })
    }

    const _difficultyDropdownListener = () => {
        const dropdown = document.querySelector('#computer-difficulty-dropdown')
        dropdown.addEventListener('change', aiOpponent.setAiOpponentDifficulty)
        dropdown.addEventListener('change', gameFlow.setComputerOpponentName)
    }

    _addStartButtonListener();
    _addResetButtonListener();
    _addGameboardListeners();
    _opponentButtonListeners();
    _difficultyDropdownListener();
})();
