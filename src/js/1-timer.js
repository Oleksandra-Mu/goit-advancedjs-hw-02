import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const targetDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startButton.disabled = true;
let userSelectedDate = '';
let timerInterval = '';

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (!userSelectedDate || userSelectedDate < currentDate) {
      iziToast.show({
        message: 'Please choose a date in the future!',
        position: 'topRight',
        color: 'red',
      });
      selectedDates[0] = new Date();
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(targetDate, options);

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    startCountdown(userSelectedDate);
    startButton.disabled = true;
  }
});

function startCountdown(userSelectedDate) {
  timerInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0, 0, 0, 0);
      iziToast.show({
        message: 'Time is up!',
        position: 'topRight',
        color: 'yellow',
      });

      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}
