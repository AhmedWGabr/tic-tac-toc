const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'x';
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  board[clickedCellIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer);
  clickedCell.textContent = currentPlayer.toUpperCase();
  clickedCell.style.pointerEvents = 'none';
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  message.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      highlightWinningCells(winCondition);
      break;
    }
  }

  if (roundWon) {
    message.textContent = `Player ${currentPlayer.toUpperCase()} wins!`;
    isGameActive = false;
    disableAllCells();
    return;
  }

  if (!board.includes('')) {
    message.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  handlePlayerChange();
}

function highlightWinningCells(winCondition) {
  winCondition.forEach(index => {
    cells[index].classList.add('winning');
  });
}

function disableAllCells() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none';
  });
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (board[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'x';
  message.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winning');
    cell.style.pointerEvents = 'auto';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

message.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
