function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

let intervalId = 0;

function colorChanger() {
  return setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStartClick() {
  toggleBtn();
  intervalId = colorChanger();
}

function onStopClick() {
  toggleBtn();
  clearInterval(intervalId);
}
function toggleBtn() {
  startBtn.disabled = !startBtn.disabled;
  stopBtn.disabled = !stopBtn.disabled;
}
