const playerElements = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];

const scoreElements = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];

const currentElements = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

const diceElement = document.querySelector(".dice");

const newGameButton = document.querySelector(".btn--new");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close-modal");
const openModalButtons = document.querySelector(".show-modal");

let scores, currentScore, activePlayer, playing;

const initializeGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreElements[0].textContent = 0;
  scoreElements[1].textContent = 0;
  currentElements[0].textContent = 0;
  currentElements[1].textContent = 0;

  diceElement.classList.add("hidden");
  playerElements[0].classList.remove("player--winner");
  playerElements[1].classList.remove("player--winner");
  playerElements[0].classList.add("player--active");
  playerElements[1].classList.remove("player--active");
};

initializeGame();

const switchPlayer = function () {
  currentElements[activePlayer].textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Switches active player: if 0, switch to 1; else switch to 0
  currentScore = 0; // Resets the current score to 0 for the new active player
  playerElements[0].classList.toggle("player--active");
  playerElements[1].classList.toggle("player--active");
};

rollButton.addEventListener("click", () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove("hidden");
    diceElement.src = `public/imgs/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      currentElements[activePlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener("click", () => {
  if (playing) {
    const currentPlayerScore = (scores[activePlayer] += currentScore);

    scoreElements[activePlayer].textContent = currentPlayerScore;

    if (currentPlayerScore >= 100) {
      playing = false;

      diceElement.classList.add("hidden");

      playerElements[activePlayer].classList.add("player--winner");
      playerElements[activePlayer].classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener("click", initializeGame);

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", function () {
  let currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = "© " + currentYear;
});

openModalButtons.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
