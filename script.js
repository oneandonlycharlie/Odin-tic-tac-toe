// Create 2 players

function createPlayer (name){
    const track = [];
    const location = {};
    const hasWon = false;
    const getLocation = () => location;
    const setLocation = () => {
        // do something to capture location
        location = { x: '' , y: ''};
        track.push(location);
    }
    return {name,track, getLocation,setLocation, hasWon}
}

//Create a game board, called immediately
const gameBoard = (function() {
    const allSpots = []
    const winner = undefined;
    //keep track of spots from player
    function trackSpot (player) {
        const spot = {
            name: player.name,
            location: player.location,
        }
        allSpots.push(spot)
    }
    return {allSpots, trackSpot, winner}
})();


// Create a gamestate to keep track of progress, always monitoring
function playGame(gameBoard, player1, player2){
    let gameOn = true;
    while (gameOn){
        let hasWinner = checkGame();
        if (hasWinner){
            gameOn = false;
            declare(gameBoard.winner)
        }

    }
}

//Check if a player has reached winning condition
function checkGame(...args) {
    for (let player of args){
        let xCount = 0, yCount = 0; inCenter = false;
        for (let i of player.locations){
            let xIndex = 0, yIndex = 0; crossIndex = 0;
            if (xIndex = i["x"]) {
                xCount++;
            }
            if (yIndex = i["y"]){
                yCount++;
            } 
            if (i["x"]== i["y"]) {
                crossIndex++;
            }
            if (i["x"]==2 && i["y"] ==2) {
                inCetner = true
            }
            xIndex = i["x"];
            yIndex = i["y"];
        }

        if (xCount >= 3 || yCount >= 3) {
            player.hasWon = true;
            gameBoard.winner = player;
            return true;
        }
        if (crossIndex >= 3 && inCenter) {
            player.hasWon = true;
            gameBoard.winner = player;
            return true;
        }
    }
}

//Do something to celebrate!


