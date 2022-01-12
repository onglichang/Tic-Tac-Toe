//Gameboard object - module
const gameBoard = (() => {
    const board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    
    let gameWon = false;

    const getGameWon = () => gameWon;

    // TODO: Need to implement reset button
    const checkBoard = (marker) => {
        const tBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
        const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
        //Check diagonal
        if (leftDiagonal.every((val) => val === leftDiagonal[0] && val != null)) {
            gameWon = true;
            return gameWon;
        } else if (rightDiagonal.every((val) => val === rightDiagonal[0] && val != null)) {
            gameWon = true;
            return gameWon;
        } else {
            for (let i = 0; i < 3; i++) {
                const row = board[i];
                const tRow = tBoard[i];
                //Check horizontal 
                if (row.every((val) => val === row[0] && val != null)) {
                    gameWon = true;
                    return gameWon;
                //Check vertical
                } else if (tRow.every((val) => val === tRow[0] && val != null)) {
                    gameWon = true;
                    return gameWon;
                } 
            }
        }
    }

    const checkTie = () => {
        if (!gameWon) {
            let counter = 0;
            for (let i=0; i < 3; i++) {
                const row = board[i];
                if (row.every((val) => val != null)) {
                    counter += 1
                }
            }
            if (counter == 3) {
                //alert("tie!");
                return true;
            }
        }
    }

    return {board, checkBoard, checkTie, getGameWon};
})();

//Players - factories 
const Player = (marker) => {
    return {marker};
}

//Display controller - module
const displayController = (() => {
    let firstPlayer = Player('X');
    let secondPlayer = Player('O');
    let currentPlayer;
    let turnCount = 0;
    let gameWon = false;
    let gameTied = false;

    const setUpGame = () => {
        // Set Up Game Board
        const boardDiv = document.getElementById("board-container");
        for (let i=0; i < 3; i++) {
            let horDiv = document.createElement('div');
            horDiv.className = "hor-div";
            for (let j=0; j < 3; j++) {
                let verDiv = document.createElement('div');
                verDiv.className = "unit";
                verDiv.setAttribute("position", `${i}${j}`);
                verDiv.addEventListener('click', addMarker);
                horDiv.appendChild(verDiv);
            }
            boardDiv.appendChild(horDiv);
        }
        setTurn(firstPlayer);
    }

    
    const setTurn = (player) => {
        currentPlayer = player;
        const currentPlayerStatement = document.getElementById("current-player");
        currentPlayerStatement.innerHTML = `Player ${player.marker}'s turn`;
    }

    const addMarker = (e) => {
        if (!gameWon && !gameTied) {
            if (!!e.target.innerHTML) {
                alert('Position already taken, please try again');
            } else {
                const position = e.target.getAttribute("position");
                const row = position.charAt(0);
                const col = position.charAt(1);
                gameBoard.board[row][col] = currentPlayer.marker;
                e.target.innerHTML = currentPlayer.marker;
                turnCount += 1;

                if (turnCount == 9) {
                    gameWon = gameBoard.checkBoard(currentPlayer.marker);
                    gameTied = gameBoard.checkTie();
                } else {
                    gameWon = gameBoard.checkBoard(currentPlayer.marker);
                }

                if (gameWon) {
                    document.getElementById("current-player").innerHTML = `Player ${currentPlayer.marker} wins!`;
                } else if (gameTied) {
                    document.getElementById("current-player").innerHTML = 'Tie Game';
                } else {
                    setTurn(secondPlayer)
                    secondPlayer = firstPlayer;
                    firstPlayer = currentPlayer;
                }
            }
        }
        
    } 

    return {
        setUpGame
    };
})();

displayController.setUpGame();


