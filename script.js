"use strict";

const players = document.querySelectorAll(".player");
let currentPlayer = document.querySelector(".player--active");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

let currentScore = 0;

const setGame = function setGame() {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
    players[i].querySelector(`#score--${i}`).textContent = 0;
    players[i].querySelector(`#current--${i}`).textContent = 0;
  }
  dice.classList.add("hidden");
};

const changeActivePlayer = function changeActivePlayer() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("player--active")) {
      players[i].querySelector(`#score--${i}`).textContent = currentScore;
      players[i].querySelector(`#current--${i}`).textContent = 0;
      players[i].classList.remove("player--active");
    } else {
      players[i].classList.add("player--active");
      currentPlayer = document.querySelector(".player--active");
    }
  }
};

setGame();
btnNew.addEventListener("click", setGame);

btnRoll.addEventListener("click", function () {
  let valueDice = Math.trunc(Math.random() * 6) + 1;
  dice.src = `./dice-${valueDice}.png`;
  dice.classList.remove("hidden");
  console.log(currentPlayer);

  if (valueDice > 1 && currentScore < 100) {
    currentScore += valueDice;
  } else {
    currentScore = 0;
    changeActivePlayer();
  }
  currentPlayer
    .querySelector(".current")
    .querySelector(".current-score").textContent = currentScore;
});
