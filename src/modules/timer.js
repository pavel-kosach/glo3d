"use strict";
const timer = (deadline) => {
  const timerDays = document.getElementById("timer-days");
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");

  const getTimeRemaining = () => {
    let dateStop = new Date(deadline).getTime();
    let dateNow = new Date().getTime();
    let timeRemaining = (dateStop - dateNow) / 1000; // Высчитываем количество секунд
    let days = Math.floor(timeRemaining / 60 / 60 / 24);
    let hours = Math.floor((timeRemaining / 60 / 60) % 24);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60); // Округляем значение до целого, узнаем остаток от деления на 60

    return { timeRemaining, days, hours, minutes, seconds };
  };

  const updateClock = () => {
    let getTime = getTimeRemaining();

    // проверяем кол-во символов в строке с числом, если 1 символ, добавляем 0 перед цифрой
    // секунды

    if (getTime.seconds.toString().length == 1) {
      timerSeconds.textContent = "0" + getTime.seconds;
    } else {
      timerSeconds.textContent = getTime.seconds;
    }
    // минуты
    if (getTime.minutes.toString().length == 1) {
      timerMinutes.textContent = "0" + getTime.minutes;
    } else {
      timerMinutes.textContent = getTime.minutes;
    }
    // часы
    if (getTime.hours.toString().length == 1) {
      timerHours.textContent = "0" + getTime.hours;
    } else {
      timerHours.textContent = getTime.hours;
    }
    // дни
    if (getTime.days.toString().length == 1) {
      timerDays.textContent = "0" + getTime.days;
    } else {
      timerDays.textContent = getTime.days;
    }
  };

  const timerStart = () => {
    let getTime = getTimeRemaining();
    if (getTime.timeRemaining > 0) {
      setInterval(updateClock, 1000); // вызываем фцнкцию каждые 1000 мс и передаем в нее значение deadline
    }
  };
  updateClock();
  timerStart();
};

export default timer;
