var timerElement = document.getElementById('timer');
var bodyElement = document.body;
var intervalId;
var totalSeconds = 5; // 7 minutos em segundos

const startBtn = document.getElementById('botao');
let isTimerRunning = false;


function startCountdown() {
    if (isTimerRunning) {
        return; // Timer is already running, do nothing
      }
      intervalId = setInterval(updateCountdown, 1000);
      isTimerRunning = true;
}

function updateCountdown() {
    if (totalSeconds < 0) {
        isTimerRunning = false;
        clearInterval(intervalId);
        bodyElement.classList.add('red-background');
        startstoptime();
    }
    else {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        timerElement.textContent = pad(minutes) + ':' + pad(seconds);
        totalSeconds--;
    }
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}



const btns = document.querySelectorAll('.btn');
let activeBtn = null;

btns.forEach(btn => {
  btn.addEventListener('click', animation);
});

function animation() {
  if (activeBtn === this) {
    return; // Clicked on the same button again, no action needed
  }

  if (activeBtn) {
    activeBtn.classList.remove('active');
    document.getElementById("botao").disabled = false;
  }

  this.classList.add('active');
  document.getElementById("botao").disabled = true;
  activeBtn = this;
}






var timerElement_stoptime = document.getElementById('stoptime');
var intervalId_stoptime;
var minutes_stoptime = 0, seconds_stoptime = 0;

function startstoptime() {
    intervalId_stoptime = setInterval(updatestoptime, 1000);
}

function updatestoptime() {
    seconds_stoptime++;
    if (seconds_stoptime >= 60) {
        seconds_stoptime = 0;
        minutes_stoptime++;
    }

    timerElement_stoptime.textContent = pad(minutes_stoptime) + ':' + pad(seconds_stoptime);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}








function stopCountdown() {
    clearInterval(intervalId);
    clearInterval(intervalId_stoptime);

}

function resetCountdown() {
    bodyElement.classList.remove('red-background');

    clearInterval(intervalId_stoptime);
    minutes_stoptime = 0;
    seconds_stoptime = 0;
    timerElement_stoptime.textContent = '00:00';

    clearInterval(intervalId);
    totalSeconds = 5;
    timerElement.textContent = '07:00';

    clearInterval(intervalId_andon);
    minutes_andon = 0;
    seconds_andon = 0;
    timerElement_andon.textContent = '00:00';
}








const btn = document.querySelector('.btn_andon');
const heading = document.querySelector('.heading');
var timerElement_andon = document.getElementById("andon");
var intervalId_andon;
const andon = document.querySelector('.box3');
var minutes_andon = 0, seconds_andon = 0;

let active = false;

const turnOn = () => {
  btn.classList.add('active');
  heading.classList.add('active');
}

const turnOff = () => {
    btn.classList.remove('active');
    heading.classList.remove('active');
}

const toggleAnimation = () => {
  btn.classList.remove('animating');
  active ? turnOn() : turnOff();
};

function updateTimer() {
    seconds_andon++;
    if (seconds_andon >= 60) {
        seconds_andon = 0;
        minutes_andon++;
    }

    timerElement_andon.textContent = pad(minutes_andon) + ':' + pad(seconds_andon);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function clickHandler() {
  if(active = !active){
    intervalId_andon = setInterval(updateTimer, 1000);
    btn.classList.add('animating');
    andon.classList.add('andonativo');
  }
  else{
    btn.classList.add('animating');
    andon.classList.remove('andonativo');
    clearInterval(intervalId_andon);
  }
  
  btn.addEventListener('animationend', toggleAnimation);
}

btn.addEventListener('click', clickHandler);