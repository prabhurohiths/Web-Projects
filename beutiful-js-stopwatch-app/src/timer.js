// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs); //00

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin); //00

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec); //00

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs); //00

  let formattedHH = hh.toString().padStart(2, "0"); //00
  let formattedMM = mm.toString().padStart(2, "0"); //00
  let formattedSS = ss.toString().padStart(2, "0"); //00

  return `${formattedHH}:${formattedMM}:${formattedSS}`; //00:00:00
}

let startTime;
let elapsedTime = 0;
let timerInterval;

// display the time on the DOM
function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

// function to display buttons
function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}

function start() {
  startTime = Date.now() - elapsedTime; // so that after pause the timer starts from where it stops
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

// event listeners
let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
