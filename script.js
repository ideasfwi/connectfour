const board = []; // 2D array to represent the game board
const rows = 6;
const cols = 7;
const player1 = "red";
const player2 = "yellow";
let currentPlayer = player1;

const boardContainer = document.querySelector(".game-board");
const player1Turn = document.querySelector(".player-1-turn");
const player2Turn = document.querySelector(".player-2-turn");
const resetButton = document.querySelector(".reset-button");

// Function to initialize the game board
function initializeBoard() {
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = null;
    }
  }
  createBoard();
}

// Function to create the HTML grid for the game board
function createBoard() {
  boardContainer.innerHTML = ""; // Clear existing board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => handleClick(r, c));
      boardContainer.appendChild(cell);
    }
  }
}

// Function to handle cell clicks
function handleClick(row, col) {
  // Find the lowest available row in the column
  let availableRow = rows - 1;
  while (availableRow >= 0 && board[availableRow][col] !== null) {
    availableRow--;
  }

  if (availableRow >= 0) {
    board[availableRow][col] = currentPlayer;
    updateBoard();
    if (checkForWin()) {
      alert(`Player ${currentPlayer === player1 ? "1" : "2"} wins! &#128557; &#128557; &#128557;`);
      return;
    }
    switchPlayer();
  }
}

// Function to update the visual representation of the board
function updateBoard() {
  const cells = boardContainer.querySelectorAll(".cell");
  let cellIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === player1) {
        cells[cellIndex].classList.add("red");
      } else if (board[r][c] === player2) {
        cells[cellIndex].classList.add("yellow");
      }
      cellIndex++;
    }
  }
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  player1Turn.classList.toggle("active");
  player2Turn.classList.toggle("active");
}

// Function to check for a winning condition
function checkForWin() {
  // Check horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (board[r][c] &&
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]) {
        return true;
      }
    }
  }

  // Check vertical
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] &&
          board[r][c] === board[r + 1][c] &&
          board[r][c] === board[r + 2][c] &&
          board[r][c] === board[r + 3][c]) {
        return true;
      }
    }
  }

  // Check diagonals (top-left to bottom-right)
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (board[r][c] &&
          board[r][c] === board[r + 1][c + 1] &&
          board[r][c] === board[r + 2][c + 2] &&
          board[r][c] === board[r + 3][c + 3]) {
        return true;
      }
    }
  }

  // Check diagonals (bottom-left to top-right)
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      if (board[r][c] &&
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]) {
        return true;
      }
    }
  }

  return false;
}

// Function to reset the game
function resetGame() {
  initializeBoard();
  currentPlayer = player1;
  player1Turn.classList.add("active");
  player2Turn.classList.remove("active");
}

// Initialize the game
initializeBoard();
resetButton.addEventListener("click", resetGame);