// Variáveis do Cronômetro
let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;

// Variáveis do Placar
let scoreA = 0;
let scoreB = 0;

// Lista de tempos do Interclasse
const periods = ["1º TEMPO", "2º TEMPO", "PRORROGAÇÃO", "PÊNALTIS"];
let currentPeriodIndex = 0;

// Elementos do DOM
const timerDisplay = document.getElementById('timer-display');
const periodDisplay = document.getElementById('period-display');
const scoreADisplay = document.getElementById('score-a');
const scoreBDisplay = document.getElementById('score-b');

// Função do Cronômetro
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.innerText = `${m}:${s}`;
}

// Controlar a pontuação
function changeScore(team, value) {
    if (team === 'a') {
        scoreA = Math.max(0, scoreA + value); // Impede pontos negativos
        scoreADisplay.innerText = scoreA;
    } else if (team === 'b') {
        scoreB = Math.max(0, scoreB + value);
        scoreBDisplay.innerText = scoreB;
    }
}

// Mudar o tempo do jogo
function changePeriod() {
    currentPeriodIndex = (currentPeriodIndex + 1) % periods.length;
    periodDisplay.innerText = periods[currentPeriodIndex];
    resetTimer();
}

// Atualizar cores das bordas baseadas nos países escolhidos
function updateTeamData(team) {
    const select = document.getElementById(`select-team-${team}`);
    const selectedOption = select.options[select.selectedIndex];
    const color = selectedOption.getAttribute('data-color');
    
    const card = document.querySelector(`.team-${team}`);
    card.style.borderBottomColor = color;
}

// Reiniciar toda a partida
function resetMatch() {
    if (confirm("Tem certeza que deseja zerar o placar e o cronômetro?")) {
        resetTimer();
        scoreA = 0;
        scoreB = 0;
        scoreADisplay.innerText = 0;
        scoreBDisplay.innerText = 0;
        currentPeriodIndex = 0;
        periodDisplay.innerText = periods[0];
    }
}

// Inicializa as cores no início
updateTeamData('a');
updateTeamData('b');