const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector(".table");
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
const winningMessageElement = document.getElementById("msg");
const winningMessageTextElement = document.querySelector("[msg-text]");
const restartBtn = document.getElementById("replay");
const audio = document.getElementById("audio");

startGame();

restartBtn.addEventListener("click", startGame);
document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    startGame();
  }
});
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(player1);
    cell.classList.remove(player2);
    cell;
    cell.addEventListener("click", handleClick, { once: true });
  });

  // boardHoverClass
  boardHoverClass();
  winningMessageElement.classList.remove("show");
}

function playAudio() {
  audio.play();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? player1 : player2;
  // placemark
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    boardHoverClass();
    swapTurns();
  }
  // swap turns
  // swapTurns();
  // check win
  if (checkWin(currentClass)) {
    endGame(false);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
    playAudio();
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "Player2" : "Player1"} LOSE!`;
    playAudio();
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(player1) || cell.classList.contains(player2);
  });
}

function boardHoverClass() {
  table.classList.remove(player1);
  table.classList.remove(player2);
  if (circleTurn) {
    table.classList.add(player2);
  } else {
    table.classList.add(player1);
  }
}

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
