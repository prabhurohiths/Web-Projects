const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winningMessageTextElement =
document.getElementsByClassName("winning-text");
const winningMessageElement =
document.getElementsByClassName("winning-message");
const restartBtn = document.getElementById("restartButton");

const xClass = "x";
const circleClass = "circle";
let circleTurn 

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


restartBtn.addEventListener("click", startGame);
startGame();
function startGame(){
  circleTurn = false
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleCLick);
    cell.addEventListener("click", handleCLick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement[0].classList.remove("show");

}




function handleCLick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;
  //placeMark
  placeMark(cell, currentClass);
  //check for winner
  if (checkWin(currentClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    //swap turn
    circleTurn = !circleTurn;
    //hover
    setBoardHoverClass();
  }
}
function endgame(draw) {
  if (draw) {
    winningMessageTextElement[0].innerText = "Draw! 😐";
  } else {
    winningMessageTextElement[0].innerText = `${circleTurn ? "O" : "X"} Wins! 🎉`;
  }
  winningMessageElement[0].classList.add("show");
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
