'use strict';

// selecting dom elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// starting condition
let finalScores, currentScore, playing, activePlayer;

const init = function () {
  finalScores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

// switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionalities
rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice number between 1-6
    const randomDice = Math.floor(Math.random() * 6) + 1;

    // 2. display random dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${randomDice}.png`;

    // 3. check rolled is 1 : if yes switch new player
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// hold score functionalities
holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. display current score to final score
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    // 2. check if the final score is >=100

    if (finalScores[activePlayer] >= 20) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    // 3. switch the player
    switchPlayer();
  }
});

// reseting the game all functionality

newBtn.addEventListener('click', init);
