
// Create a game board, called immediately
const gameBoard = (function() {
    console.log('gameboard created');
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const allPlayers= [];
    const noOfSpots = 0;
    const winner = undefined;
    const currentPlayer = undefined;
    return {board, allPlayers, winner,currentPlayer, noOfSpots}
})();

const startButton = document.querySelector("button.start")
const container = document.querySelector(".container")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button")
const submitButton = document.querySelector("dialog form button")
const displayWindow = document.querySelector(".window")
const resetButton = document.querySelector(".reset")

startButton.addEventListener("click", handleStart)
submitButton.addEventListener("click", handleSubmit)
container.addEventListener("click", placeMark)

resetButton.addEventListener("click", ()=> {
    gameBoard.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameBoard.allPlayers = [];
    gameBoard.noOfSpots = 0;
    displayWindow.textContent = "Let's play!";
    let grids = document.querySelectorAll(".container div");
    for (let i in grids) {
        grids[i].textContent = "";
    }
})

closeButton.addEventListener("click", () => {
    dialog.close();
})

function handleStart(e){
    e.preventDefault();
    dialog.showModal();
}

function handleSubmit(e){
    e.preventDefault();
    let name1= document.getElementById("player-1").value;
    let name2= document.getElementById("player-2").value;
    const player1 = createPlayer(name1,"X");
    const player2 = createPlayer(name2,"O");
    gameBoard.allPlayers.push(player1);
    gameBoard.allPlayers.push(player2);
    gameBoard.currentPlayer = player1;
    dialog.close();
    displayWindow.textContent = 'Game started!'
}

function placeMark(e){
    let spot = e.target;
    currentSpot = spot.className.split(" ");
    let row = +currentSpot[0];
    let col = +currentSpot[1];
    e.target.textContent = gameBoard.currentPlayer.mark;
    gameBoard.board[row][col] = gameBoard.currentPlayer.mark;
    gameBoard.currentPlayer.setLocation(currentSpot);
    if (checkGame(gameBoard) == true) {
        declare(gameBoard.currentPlayer.name);
    }
    // switch players
    if (gameBoard.currentPlayer == gameBoard.allPlayers[0]){
        gameBoard.currentPlayer = gameBoard.allPlayers[1];
    } else if (gameBoard.currentPlayer == gameBoard.allPlayers[1]){
        gameBoard.currentPlayer = gameBoard.allPlayers[0];
    }
}

// Create 2 players

function createPlayer(name,mark){
    const track = [];
    const hasWon = false;
    let location = [];
    const getLocation = () => location;
    const setLocation = (input) => {
        location = input;
        track.push(location);
    }
    return {name,location, track, getLocation, setLocation, hasWon, mark}
}


// Check if a player has reached winning condition
function checkGame(gameBoard) {
    // check if there's a draw
    gameBoard.noOfSpots++;
    if (gameBoard.noOfSpots >= 9){
        displayWindow.textContent = "we have a draw, start again."
    }
    //find a way to check player's track
    for (let i = 0; i < 3; i++) {
        if (gameBoard.board[i].every(cell => cell === gameBoard.currentPlayer.mark) || 
            [gameBoard.board[0][i], gameBoard.board[1][i], gameBoard.board[2][i]].every(cell => cell === gameBoard.currentPlayer.mark)) {
            return true;
        }
    }
    return (gameBoard.board[0][0] === gameBoard.currentPlayer && gameBoard.board[1][1] === gameBoard.currentPlayer && gameBoard.board[2][2] === gameBoard.currentPlayer) ||
           (gameBoard.board[0][2] === gameBoard.currentPlayer && gameBoard.board[1][1] === gameBoard.currentPlayer && gameBoard.board[2][0] === gameBoard.currentPlayer);

}

//Do something to celebrate!
function declare(name){
    displayWindow.textContent = `${name} has won!`
}