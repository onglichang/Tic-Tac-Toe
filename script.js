//Gameboard object - module
const gameBoard = (() => {
    const board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
})();

//Players - factories 
const Player = (marker) => {
    return {marker};
}

let player1 = Player('X');
let player2 = Player('O');

//Display controller - module
const displayController = (() => {
    const setUpGame = () => {
        // Set Up Game Board
        const boardDiv = document.getElementById("board-container");
        for (let i=0; i < 3; i++) {
            let horDiv = document.createElement('div');
            horDiv.className = "hor-div";
            for (let j=0; j < 3; j++) {
                let verDiv = document.createElement('div');
                verDiv.className = "unit"
                horDiv.appendChild(verDiv);
            }
            boardDiv.appendChild(horDiv);
        }
        setTurn(player1);
    }

    let currentPlayer;

    const setTurn = (player) => {
        currentPlayer = player;
        const currentPlayerStatement = document.getElementById("current-player");
        currentPlayerStatement.innerHTML = `Player ${player.marker}'s turn`;
    }

    return {
        setUpGame,
        setTurn
    };
})();

displayController.setUpGame();


