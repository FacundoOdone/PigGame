"use strict";

const players = document.querySelectorAll(".player");
let currentPlayer = document.querySelector(".player--active");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

let currentScore = 0;
let playersScore = [0, 0];
let winner = false;

const setGame = function setGame() {
  winner = false;
  for (let i = 0; i < players.length; i++) {
    players[i].querySelector(`#score--${i}`).textContent = 0;
    players[i].querySelector(`#current--${i}`).textContent = 0;
    players[i].classList.remove("player--winner");
  }
  dice.classList.add("hidden");
  players[0].classList.add("player--active");
  players[1].classList.remove("player--active");
  btnHold.classList.remove("disabled");
  btnRoll.classList.remove("disabled");
};

const changeActivePlayer = function changeActivePlayer(Notholded) {
  if (!winner) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].classList.contains("player--active")) {
        if (!Notholded) playersScore[i] = 0;
        else playersScore[i] += currentScore;
        players[i].querySelector(`#score--${i}`).textContent = playersScore[i];
        currentScore = 0;
        players[i].querySelector(`#current--${i}`).textContent = 0;
        players[i].classList.remove("player--active");
      } else {
        players[i].classList.add("player--active");
        currentPlayer = document.querySelector(".player--active");
      }
    }
  }
};

setGame();
btnNew.addEventListener("click", setGame);

btnRoll.addEventListener("click", function () {
  if (!winner) {
    let valueDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./dice-${valueDice}.png`;
    dice.classList.remove("hidden");

    if (currentScore + valueDice >= 100) {
      currentPlayer.classList.add("player--winner");
      winner = true;
      btnHold.classList.add("disabled");
      btnRoll.classList.add("disabled");
    } else {
      if (valueDice > 1) {
        currentScore += valueDice;
      } else {
        currentScore = 0;
        changeActivePlayer();
      }
    }
    currentPlayer
      .querySelector(".current")
      .querySelector(".current-score").textContent = currentScore;
  }
});

btnHold.addEventListener("click", changeActivePlayer);
