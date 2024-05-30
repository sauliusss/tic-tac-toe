const cellElements = document.querySelectorAll("[data-cell]");
const table = document.getElementById("table");
const player1 = "o";
const player2 = "x";
let circleTurn;
const winningCombo = [
  [0, 1, 2],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  // boardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? player1 : player2;
  // placemark
  placeMark(cell, currentClass);
  // swap turns
  swapTurns();
  // check win
  if (checkWin(currentClass)) {
    console.log("winner");
  }
  // boardHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

// function boardHoverClass() {
//   table.classList.remove(player1);
//   table.classList.remove(player2);
//   if (circleTurn) {
//     table.classList.add(player1);
//   } else {
//     table.classList.add(player2);
//   }
// }

function checkWin(currentClass) {
  return winningCombo.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// const cells = document.querySelectorAll(".cell");
// startGame();
// function startGame() {
//   document.querySelector(".msg").style.display = "none";
//   board = Array.from(Array(9).keys());
//   for (let i = 0; i < cells.length; i++) {
//     cells[i].innerText = "";
//     cells[i].style.removeProperty("background-color");
//     cells[i].addEventListener("click", turnClick, false);
//   }
// }

// function turnClick(square) {
//   turn(square.target.id, player1);
// }

// function turn(squareId, player) {
//   board[squareId] = player;
//   document.getElementById(squareId).innerText = player;
//   let gameWon = checkWin(board,player)
//   if(gameWon) gameOver(gameWon)
// }
