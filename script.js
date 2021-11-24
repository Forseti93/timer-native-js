document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  //Set deadline, timer end date in format YYYY-MM-DD
  const timerUntil = "2021-11-28";
  //array of timer's HTML elements
  const timerComponents = [
    document.querySelector(".timer>p>.days"),
    document.querySelector(".timer>p>.hours"),
    document.querySelector(".timer>p>.minutes"),
    document.querySelector(".timer>p>.seconds"),
  ];
  //Calculates remaining time in milliseconds and returns object
  //deadline - end of countdown
  function remainingTime(deadline) {
    const dateNow = Date.parse(Date());
    const remainingTimeMS = Date.parse(deadline) - dateNow;
    const days = Math.floor(remainingTimeMS / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTimeMS / (1000 * 60 * 60 * 24)) % 24);
    const minutes = Math.floor((remainingTimeMS / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTimeMS / 1000) % 60);
    return {
      remainingTime: remainingTimeMS,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  //function assigns innerText to timer
  //arguments of function are: (HTML elements of timer) and (object from function remainingTime)
  function loopAndReplace(timerUnits, timerValues) {
    const objValuesArray = Object.values(timerValues);
    for (let i = 1; i < objValuesArray.length; i++) {
      if (objValuesArray[i] / 10 < 1) {
        timerUnits[i - 1].innerText = `0${objValuesArray[i]}`;
      } else {
        timerUnits[i - 1].innerText = objValuesArray[i];
      }
    }
  }
  //to show countdown after page loaded
  loopAndReplace(timerComponents, remainingTime(timerUntil));
  //interval that starts functions evey second
  const second = setInterval(function () {
    loopAndReplace(timerComponents, remainingTime(timerUntil));
  }, 1000);
  //clear interval second when coundown is <= 0
  if (remainingTime(timerUntil).remainingTime <= 0) {
    clearInterval(second);
  }
});
