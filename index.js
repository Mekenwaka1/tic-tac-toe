const inProgress = true,
  tie = 1,
  xIsWinner = 2,
  oIsWinner = 3;

let nextMove = "X";
let movesPlayed = 0;
let gameStatus = inProgress;
let boardValues = ["", "", "", "", "", "", "", "", ""];

const combinationOfWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

document.addEventListener("DOMContentLoaded", _ => {
  document.querySelector(".game_board").addEventListener("click", e => {
    const square = e.target;
    if (!square.textContent && gameStatus) {
      square.textContent = nextMove;
      let id = parseInt(square.dataset.id);
      boardValues[id] = nextMove;
      nextMove = nextMove === "X" ? "O" : "X";
      movesPlayed++;

      gameStatus = checkStatus();
      const display = document.querySelector(".status");
      if (gameStatus === xIsWinner) {
        display.textContent = "The Winner is X";
      } else if (gameStatus === oIsWinner) {
        display.textContent = "The Winner is O";
      } else if (gameStatus === tie) {
        display.textContent = "The game ended in a tie";
      } else {
        display.textContent = "The next move will be: " + nextMove;
      }
    }
  });
});

function checkStatus() {
  for (let line of combinationOfWins) {
    if (
      boardValues[line[0]] &&
      boardValues[line[0]] === boardValues[line[1]] &&
      boardValues[line[0]] === boardValues[line[2]]
    ) {
      return boardValues[line[0]] === "X" ? xIsWinner : oIsWinner;
    }
  }

  if (movesPlayed === 9) {
    return tie;
  }

  return inProgress;
}
