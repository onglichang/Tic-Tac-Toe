//Set up gameboard
function setUpBase() {
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
}

setUpBase();

//Gameboard object - module
const gameBoard = (() => {
    const board = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
})();

//Display controller - module
const displayController = (() => {

})();

//Players - factories 
const Player = (marker) => {
    return {marker};
}

