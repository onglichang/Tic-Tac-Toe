//Gameboard object - module
const gameBoard = (() => {
    const board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    return {board};
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
        if (!!e.target.innerHTML) {
            console.log('something here already');
        } else {
            const position = e.target.getAttribute("position");
            const row = position.charAt(0);
            const col = position.charAt(1);
            gameBoard.board[row][col] = currentPlayer.marker;
            e.target.innerHTML = currentPlayer.marker;
            // Test Statement
            console.log(gameBoard.board);
        }
        setTurn(secondPlayer)
        secondPlayer = firstPlayer;
        firstPlayer = currentPlayer;
    } 

    return {
        setUpGame
    };
})();

displayController.setUpGame();


