let result = '';
let score = JSON.parse(localStorage.getItem('score')) || {  
    wins: 0,
    losses: 0,
    ties: 0
};

const buttonElement = document.querySelector('.rock');
const buttonElement2 = document.querySelector('.paper');
const buttonElement3 = document.querySelector('.scissors');
const resetButton = document.querySelector('.js-reset-button');
const autoPlayButton = document.querySelector('.auto-play-button');
const resetConfirm = document.querySelector('.js-confirm-reset');
const yesButton = document.querySelector('.js-yes-button');
const noButton = document.querySelector('.js-no-button');


resetConfirm.style.display = 'none';

buttonElement.addEventListener('click', () => {
  playGame('rock');
});
buttonElement2.addEventListener('click', () => {
  playGame('paper');
});
buttonElement3.addEventListener('click', () => {
  playGame('scissors');
});

resetButton.addEventListener('click', () => {
  resetScore();
});

autoPlayButton.addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  };
});

yesButton.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  alert('Score has reset');
  updateScoreElement();
  resetConfirm.style.display = 'none';
});

noButton.addEventListener('click', () => {
  resetConfirm.style.display = 'none';
});


function resetScore() {
  resetConfirm.style.display = '';
};



updateScoreElement();


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      autoPlayButton.innerHTML = 'Stop Playing';
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayButton.innerHTML = 'Auto Play';
    isAutoPlaying = false;
  };
  
  
};

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'LOSE';
    } else if (computerMove === 'paper') {
      result = 'WIN';
    } else if (computerMove === 'scissors') {
      result = 'TIE';
    }
  } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
      result = 'WIN';
    } else if (computerMove === 'paper') {
      result = 'TIE';
    } else if (computerMove === 'scissors') {
      result = 'LOSE';
    };
  } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
      result = 'TIE';
    } else if (computerMove === 'paper') {
      result = 'LOSE';
    } else if (computerMove === 'scissors') {
      result = 'WIN';
    };
  }

  if (result === 'WIN') {
    score.wins += 1;
  } else if (result === 'LOSE') {
    score.losses += 1;
  } else
    score.ties += 1;

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-score-display1')  
    .innerHTML = `YOU ${result}`;

  document.querySelector('.js-score-display2')  
    .innerHTML = `You picked <img src="${playerMove}.png" class="move-icon">
    <img src="${computerMove}.png" class="move-icon"> Computer  picked.`;

  updateScoreElement();

  


}

function updateScoreElement() {
  const scoreElement = document.querySelector('.js-score-display3');

  scoreElement.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;

};

