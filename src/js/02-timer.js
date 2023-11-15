import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateSelector = document.querySelector('input[id="datetime-picker"]');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let selectedDate;
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = this.selectedDates[0];

    if (selectedDate.getTime() <= currentDate.getTime()) {
      iziToast.show({
        //title: 'Error',
        message: 'Please choose a date in the future',
        close: false,
        backgroundColor: 'orange',
        messageColor: 'white',
        messageSize: 20,
        timeout: 0,
        position: 'topCenter',
      });
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr(dateSelector, options);

startButton.setAttribute('disabled', true);

dateSelector.addEventListener('change', handleErrorMessage);

function handleErrorMessage() {
  iziToast.destroy();
}

startButton.addEventListener('click', onDateChange);

function onDateChange() {
  startButton.setAttribute('disabled', true);
  dateSelector.setAttribute('disabled', true);

  let intervalId = setInterval(() => {
    let timeDifference = selectedDate.getTime() - currentDate.getTime();
    currentDate = new Date();
    daysValue.textContent = addLeadingZero(convertMs(timeDifference).days);
    hoursValue.textContent = addLeadingZero(convertMs(timeDifference).hours);
    minutesValue.textContent = addLeadingZero(
      convertMs(timeDifference).minutes
    );
    secondsValue.textContent = addLeadingZero(
      convertMs(timeDifference).seconds
    );

    if (timeDifference < 1000) {
      clearInterval(intervalId);
      dateSelector.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
