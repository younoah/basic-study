'use strict';

const $field = document.querySelector('.game__field');
const $gameBtn = document.querySelector('.game__button');
const $gameTimer = document.querySelector('.game__timer');
const $gameScore = document.querySelector('.game__score');

const FIELD_RECT = $field.getBoundingClientRect();
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

let started = false;
// let score = 0;
// let timer = undefined;

$gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopBtn();
  showTimerAndScore();
}

function showStopBtn() {
  const icon = $gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  $gameTimer.style.visibility = 'visible';
  $gameScore.style.visibility = 'visible';
}

// function stopGame() {}

function initGame() {
  $field.innerHTML = '';
  $gameScore.innerText = CARROT_COUNT;
  addItem('carrot', 5, 'img/carrot.png');
  addItem('bug', 5, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = FIELD_RECT.width - CARROT_SIZE;
  const y2 = FIELD_RECT.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    $field.append(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

initGame();
