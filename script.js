let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let singlePlayer = false;

const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const modeButton = document.getElementById("mode");
const resultDiv = document.getElementById("result");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function showResult(message) {
  resultDiv.textContent = message;
  resultDiv.style.display = "block";
}

function checkWin() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showResult(`${currentPlayer} wins! 🎉`);
      gameActive = false;
      return true;
    }
  }

  if (!board.includes("")) {
    showResult("It's a draw! 🤝");
    gameActive = false;
    return true;
  }
  return false;
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

    if (checkWin()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (singlePlayer && currentPlayer === "O") {
      aiMove();
    }
  }
}

function aiMove() {
  const emptyIndices = board
    .map((cell, i) => (cell === "" ? i : null))
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("taken");

  if (checkWin()) return;
  currentPlayer = "X";
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });

  resultDiv.style.display = "none";
}

function switchMode() {
  singlePlayer = !singlePlayer;
  modeButton.textContent = singlePlayer
    ? "Switch to 2-Player Mode"
    : "Switch to 1-Player Mode";
  restartGame();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
modeButton.addEventListener("click", switchMode);
