const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// lets create a function to intialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui per bhi update krna hoga box ko 
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvent = "all";
        // one more thing is to intialise all css property
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active"); 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if (currentPlayer === "X"){
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    // update the ui for current player 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "" ;

    winningPosition.forEach((position) =>{
        // all 3 box should be non empty and exactly same in value
        if ( ( gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "" )
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]) ) 
        {
    
            // check if X is winner
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else 
            answer = "O";

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know that "X" or "O" is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a  winner
    if(answer !== ""){
        gameInfo.innerText = `Winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
        
    }

    // lets check whether there is tie 
    let fillCount = 0;
  
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }

        // check untill fillcount value is 9
        if (fillCount === 9){
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
    })
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko
        swapTurn();
        // check koi jeeta to nahi
        checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);