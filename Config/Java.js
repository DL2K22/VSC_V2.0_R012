
// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE START GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

// ! ||--------------------------------------------------------------------------------||
// ! ||                        TELA VERMELHA QUANDO ZERAR O TAKT                       ||
// ! ||--------------------------------------------------------------------------------||

var timerElement = document.getElementById('timer');
var bodyElement = document.body;
var intervalId_takt;
var totalSeconds = 30; // 7 minutos em segundos

const startBtn = document.getElementById('botao');
let isTimerRunning = false;


function startCountdown() {
    if (isTimerRunning) {
        return; // Timer is already running, do nothing
      }
      intervalId_takt = setInterval(updateCountdown, 1000);
      isTimerRunning = true;
}

function updateCountdown() {
  const intervalIds = [];
  const isRunning = intervalIds.some(id => id !== null);
    if (totalSeconds <= 0 && isRunning) {
        isTimerRunning = false;
        clearInterval(intervalId_takt);
        startstoptime();
        bodyElement.classList.add('red-background');
    }
    else {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        timerElement.textContent = pad(minutes) + ':' + pad(seconds);
        totalSeconds--;
    }
}



// ! ||--------------------------------------------------------------------------------||
// ! ||                          FUNÇÃO DE START DO STOP TIME                          ||
// ! ||--------------------------------------------------------------------------------||

var timerElement_stoptime = document.getElementById('stoptime');
var intervalId_stoptime;
var minutes_stoptime = 0, seconds_stoptime = 0;
let isStopTimeRunning = false;

function startstoptime() {
    if (isStopTimeRunning) {
      return; // Timer is already running, do nothing
    }
    isStopTimeRunning = true;
    intervalId_stoptime = setInterval(updatestoptime, 1000);
}

function updatestoptime() {
    seconds_stoptime++;
    if (seconds_stoptime >= 60) {
        seconds_stoptime = 0;
        minutes_stoptime++;
    }

    timerElement_stoptime.textContent = pad(minutes_stoptime) + ':' + pad(seconds_stoptime);
};


// ! ||--------------------------------------------------------------------------------||
// ! ||                           ANIMAÇÃO DOS BOTÕES DO MENU                          ||
// ! ||--------------------------------------------------------------------------------||

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
};


// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE RESET GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

function resetCountdown(){
  const buttons = [];
  const intervalIds = [];

  
  for (let i = 1; i <= 8; i++) {
    if (intervalIds[i - 1] !== null) {
      pararCronometro(intervalIds[i - 1], i);
      intervalIds[i - 1] = null;
      const cronometro = document.getElementById(`andon${i}`);
      const cronometro_tabs = document.getElementById(`andontab${i}`);
      cronometro.textContent = '00:00';
      cronometro_tabs.textContent = '00:00';
    }
  }
  
  for (let i = 1; i <= 8; i++) {
    const botao = document.querySelector(`.btn_andon${i}`);
    let intervalId;

    buttons.push(botao);
    intervalIds.push(intervalId);
  };

  isTimerRunning = false;
  isStopTimeRunning = false;
  bodyElement.classList.remove('red-background');

  clearInterval(intervalId_takt);  
  clearInterval(intervalId_stoptime);

  minutes_stoptime = 0;
  seconds_stoptime = 0;
  timerElement_stoptime.textContent = '00:00';

  totalSeconds = 30; 
  timerElement.textContent = '07:00';
}
    





// ! ||--------------------------------------------------------------------------------||
// ! ||                              BOTÃO DE PAUSE GERAL                              ||
// ! ||--------------------------------------------------------------------------------||

function stopCountdown() {
  isTimerRunning = false;
  isStopTimeRunning = false;
  clearInterval(intervalId_stoptime);
  clearInterval(intervalId_takt);

  console.log("PAUSADO");

  for (let i = 1; i <= 8; i++) {
    const botao = document.querySelector(`.btn_andon${i}`);
    let intervalId;

    const turnOn = () => {
      botao.classList.add('active');
    }
    
    const turnOff = () => {
      botao.classList.remove('active');
    }
    
    const toggleAnimation = () => {
      botao.classList.remove('animating');
      intervalId ? turnOn() : turnOff();
    };

    if (!intervalId) {
      clearInterval(i);
      intervalId = null;
      CorTelaNormal(i);
    } else {
      console.log("INICIAR ANDON PRIMEIRO");
    }
    
    botao.classList.add('animating');
    botao.addEventListener('animationend', toggleAnimation);
  }
};




// ! ||--------------------------------------------------------------------------------||
// ! ||                                   FUNÇÃO PAD                                   ||
// ! ||--------------------------------------------------------------------------------||

function pad(value) {
  return value < 10 ? '0' + value : value;
}




// ! ||--------------------------------------------------------------------------------||
// ! ||                             BOTÕES DE INICIO ANDON                             ||
// ! ||--------------------------------------------------------------------------------||

function iniciarCronometro(id) {
  const cronometro = document.getElementById(`andon${id}`);
  const cronometro_tabs = document.getElementById(`andontab${id}`);
  const boxtab = document.getElementById(`boxtab-ativo${id}`);
  const boxandon = document.getElementById(`boxandon-ativo${id}`);
  let segundos = 0;
  let minutos = 0;
  const atualizarCronometro = () => {
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
    cronometro.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    cronometro_tabs.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };
  boxtab.classList.add('boxtab-ativo');
  boxandon.classList.add('boxandon-ativo');
  const intervalId = setInterval(atualizarCronometro, 1000);
  return intervalId;
}

function pararCronometro(intervalId) {
  clearInterval(intervalId);

}

function CorTelaNormal (id){
  const boxtab = document.getElementById(`boxtab-ativo${id}`);
  const boxandon = document.getElementById(`boxandon-ativo${id}`);

  boxtab.classList.remove('boxtab-ativo');
  boxandon.classList.remove('boxandon-ativo');
}


for (let i = 1; i <= 8; i++) {
  const botao = document.querySelector(`.btn_andon${i}`);
  let intervalId;

  const turnOn = () => {
    botao.classList.add('active');
  }
    
  const turnOff = () => {
    botao.classList.remove('active');
  }
    
  const toggleAnimation = () => {
    botao.classList.remove('animating');
    intervalId ? turnOn() : turnOff();
  };


  botao.addEventListener('click', () => {
    if (intervalId) {
      pararCronometro(intervalId, i);
      CorTelaNormal();
      intervalId = null;
        
    } else {

      intervalId = iniciarCronometro(i);
    }
    botao.classList.add('animating');
    botao.addEventListener('animationend', toggleAnimation);
  });
}
