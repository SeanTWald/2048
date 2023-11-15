
var board;
var lose;
var score = 0;
var rows = 4;
var columns = 4;
var winCheck = 0;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r< rows; r++){
        for( let c = 0; c<columns; c++){
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c< columns; c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile() ){
        return;
    }

    let found = false;
    while(!found) {
        let t = 2;
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let q = Math.floor(Math.random() *100);
        if (q < 5){
            t = 8;
        }
        else if (q < 20){
            t = 4;
        } else{
            t = 2;
        }

        if (board[r][c] == 0){
            board[r][c] = t;
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = t.toString();
            tile.classList.add("x"+t.toString());
            found = true;
        }
           
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num>0) {
        tile.innerText = num;
        if (num < 4096){
            tile.classList.add("x"+num.toString());
        } else{
            tile.classList.add("x4096");
        }
    }
}

document.addEventListener("keyup", (e) =>{
    if (e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    } else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    } else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    } else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    document.getElementById("score").innerText = score;
    winCheck = getCurrentState();
    /*if (winCheck == -1){
        loseMsg();
    } else if (winCheck == 1){
        winMsg();
    }*/
})

function filterZero(row){
    return row.filter(num => num !=0);
}

function slide(row){
    row = filterZero(row);
    for(let i = 0; i< row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] += row[i+1];
            row[i+1] =0;
            score += row[i];
        }
    }
    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft(){
    for (let r = 0; r< rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for (let r = 0; r< rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for (let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < columns; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for (let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse()
        row = slide(row);
        row.reverse()
        for (let r = 0; r < columns; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function getCurrentState(){
    for (let r = 0; r< rows; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 2048){
                return 1;
            }
        }
    }
    for (let r = 0; r< rows; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 0){
                return 0;
            }
        }
    }
    for (let r = 0; r< rows; r++){
        for (let c = 0; c < columns-1; c++){
            if (board[r][c] == board[r][c+1]){
                return 0;
            }
        }
    }

    for (let r = 0; r< rows -1; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == board[r+1][c]){
                return 0;
            }
        }
    }
    return -1

}


/*function loseMsg(){
    let lose = document.createElement("div")
    setGame();
}

function winMsg(){

}*/