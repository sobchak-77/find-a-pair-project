import { getDivEl, createNumArr, shuffleArr } from './service.js';
import { ImgCard } from './img_card .js';

// -------------------------
// --- STOPWATCH SECTION ---
// -------------------------

// --- define HTML elements ---
const secondEl = document.getElementById('second');
const millisecEl = document.getElementById('millisec');

// --- special variables ---
let second = 0,
  millisec = 0,
  interval = 0;

// --- start the stopwatch ---
function startTimer() {
  millisec++;

  // --- change millisecs ---

  if (millisec < 9) {
    millisecEl.textContent = '0' + millisec;
  } else if (millisec > 9) {
    millisecEl.textContent = millisec;
  };

  if (millisec > 99) {
    second++;
    secondEl.textContent = '0' + second;
    millisec = 0;
    millisecEl.textContent = '0' + millisec;
  };

  // --- change seconds ---

  if (second < 9) {
    secondEl.textContent = '0' + second;
  } else if (second > 9) {
    secondEl.textContent = second;
  };

  // --- time is over ---

  if (second === 60) {
    clearInterval(interval);
    showLoseTxt();
  };
};

// --- reset all stopwatch values ---
function resetTimer() {
  // variable values
  second = 0;
  millisec = 0;

  // timer values
  secondEl.textContent = '00';
  millisecEl.textContent = '00';
};

// --- show the current score ---
function showScoreTxt() {
  const score = getDivEl('score');
  score.textContent = `You did it in ${second} : ${millisec}`;

  resetTimer();
  gameContainer.append(score);
};

// --------------------
// --- THE GAME END ---
// --------------------

function showLoseTxt() {
  gameContainer.innerHTML = '';

  const loseTxt = getDivEl('game__end-txt');
  loseTxt.textContent = 'Oops, game over... Try again!';

  gameContainer.append(loseTxt);
};

function showWinTxt() {
  gameContainer.innerHTML = '';
  showScoreTxt();

  const winTxt = getDivEl('game__end-txt');
  winTxt.textContent = `All pairs found. Good job. Let's try again!`;

  gameContainer.append(winTxt);
};

// -------------------------
// --- GAME DESK SECTION ---
// -------------------------

// ---define HTML elements ---
const gameContainer = document.getElementById('game');
const restartBtn = document.getElementById('re-btn');
const helloTxt = document.getElementById('hello-txt');

// --- special variables for game logic ---
let card_1 = null;
let card_2 = null;

// --- get card's face array ---
const cardFaceArr = createNumArr(8);

// --- flip the card ---
function flipCard(card) {
  // start stopwatch
  clearInterval(interval);
  interval = setInterval(startTimer, 10);

  if (card_1 === null) {
    card_1 = card;
  } else {
    card_2 = card;
  };

  // close cards if both are UNMATCHED
  if (card_1 !== null && card_2 !== null) {
    if (card_1.number !== card_2.number) {
      setTimeout(() => {
        card_1.opened = false;
        card_1 = null;
        card_2.opened = false;
        card_2 = null;
      }, 400);
    };
  };

  // two opened cards are the SAME
  if (card_1 !== null && card_2 !== null) {
    if (card_1.number === card_2.number) {
      card_1.matched = true;
      card_1 = null;
      card_2.matched = true;
      card_2 = null;
    };
  };

  // all cards OPENED and MATCHED
  let matchArr = document.querySelectorAll('.matched');
  if (cardFaceArr.length === matchArr.length) {
    // stop the stopwatch and show score
    clearInterval(interval);
    setTimeout(showWinTxt, 400);
  };
};

// --- to start the game ---
function startGame(cardFaceArr) {
  const container = getDivEl('game__desk');
  const cardArr = [];
  const mixedFaceArr = shuffleArr(cardFaceArr);

  // create cards with values
  for (const face of mixedFaceArr) {
    cardArr.push(new ImgCard(container, face, flipCard));
  };

  // reset stopwatch values
  resetTimer();

  gameContainer.append(container);
};

// --- clean desk game, stopwatch and start new game ---
restartBtn.addEventListener('click', () => {
  clearInterval(interval);
  helloTxt.classList.add('is-hidden');
  resetTimer();
  gameContainer.innerHTML = '';
  startGame(cardFaceArr);
});
