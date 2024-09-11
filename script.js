
// Create a game board, called immediately
const gameBoard = (function() {
    console.log('gameboard created');
    const allPlayers= [];
    const winner = undefined;
    const currentPlayer = undefined;
    return {allPlayers, winner,currentPlayer}
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
// resetButton.addEventListener("click", ??)
closeButton.addEventListener("click", () => {
    dialog.close();
    console.log("window closed")
})

function handleStart(e){
    console.log("clicked start")
    e.preventDefault();
    dialog.showModal();
}

function handleSubmit(e){
    e.preventDefault();
    console.log("clicked submit")
    let name1= document.getElementById("player-1");
    let name2 = document.getElementById("playe-2");
    const player1 = createPlayer(name1,"X");
    const player2 = createPlayer(name2,"O");
    console.log('players created')
    gameBoard.allPlayers.push(player1);
    gameBoard.allPlayers.push(player2);
    gameBoard.currentPlayer = player1;
    dialog.close();
    displayWindow.textContent = 'Game started!'
    checkGame();
}

function placeMark(e){
    let spot = e.target;
    index = spot.className.split(" ")
    // console.log(spot.className.split(" "));
    e.target.textContent = gameBoard.currentPlayer.mark;
    gameBoard.currentPlayer.setLocation(index);
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
    const getLocation = () => location;
    const setLocation = (input) => {
        const location = { x: input[0] , y: input[1]};
        track.push(location);
        console.log(`locaton set as ${location}, ${track.length}`)
    }
    return {name,track, getLocation,setLocation, hasWon, mark}
}


//Check if a player has reached winning condition
function checkGame() {
    let totalSpots = 0;
    for (let player of gameBoard.allPlayers){
        totalSpots += player.track.length;
        let xCount = 0, yCount = 0; crossCount = 0, inCenter = false;
        for (let i of player.track){
            let xIndex = 0, yIndex = 0; crossIndex = 0;
            if (xIndex == i["x"]) {
                xCount++;
            }
            if (yIndex == i["y"]){
                yCount++;
            } 
            if (i["x"]== i["y"]) {
                crossCount++;
            }
            if (i["x"]== 0 && i["y"] == 0) {
                inCetner = true;
            }
            xIndex = i["x"];
            yIndex = i["y"];
        }

        if (xCount >= 3 || yCount >= 3) {
            player.hasWon = true;
            gameBoard.winner = player;
            declare(gameBoard.winner);
        }
        if (crossCount >= 3 && inCenter) {
            player.hasWon = true;
            gameBoard.winner = player;
            declare(gameBoard.winner);
        }
    }
    if (totalSpots >= 9){
        displayWindow.textContent = "we have a draw, start again."
    }
}

//Do something to celebrate!
function declare(player){
    displayWindow.textContent = `${player.name} has won!`
}

