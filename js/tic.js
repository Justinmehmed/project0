// html elements 
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellsDiv = document.querySelectorAll('.cell');

// game constants
const xSymbol = '✗';
const oSymbol = '❍';

// game variables
let gameIsLive = true;
let xIsNext = true;


// functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
  gameIsLive = false;
  if (letter === 'x') {
    statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
  }
};

const checkGameStatus = () => {
    const topLeft = cellsDiv[0].classList[2];
    const topMiddle = cellsDiv[1].classList[2];
    const topRight = cellsDiv[2].classList[2];
    const middleLeft = cellsDiv[3].classList[2];
    const middleMiddle = cellsDiv[4].classList[2];
    const middleRight = cellsDiv[5].classList[2];
    const bottomLeft = cellsDiv[6].classList[2];
    const bottomMiddle = cellsDiv[7].classList[2];
    const bottomRight = cellsDiv[8].classList[2];

    
 // check winner
 if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cellsDiv[0].classList.add('won');
    cellsDiv[1].classList.add('won');
    cellsDiv[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft);
    cellsDiv[3].classList.add('won');
    cellsDiv[4].classList.add('won');
    cellsDiv[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft);
    cellsDiv[6].classList.add('won');
    cellsDiv[7].classList.add('won');
    cellsDiv[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellsDiv[0].classList.add('won');
    cellsDiv[3].classList.add('won');
    cellsDiv[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle);
    cellsDiv[1].classList.add('won');
    cellsDiv[4].classList.add('won');
    cellsDiv[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cellsDiv[2].classList.add('won');
    cellsDiv[5].classList.add('won');
    cellsDiv[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cellsDiv[0].classList.add('won');
    cellsDiv[4].classList.add('won');
    cellsDiv[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cellsDiv[2].classList.add('won');
    cellsDiv[4].classList.add('won');
    cellsDiv[6].classList.add('won');
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is tied!';
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} is next`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellsDiv) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
      cellDiv.classList.remove('won');
    }
    gameIsLive = true;
  };
  
  const handleCellClick = (e) => {
    const classList = e.target.classList;
  
    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
      return;
    }
  
    if (xIsNext) {
      classList.add('x');
      checkGameStatus();
    } else {
      classList.add('o');
      checkGameStatus();
    }
  };

//event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellsDiv) {
    cellDiv.addEventListener('click', handleCellClick)
}
