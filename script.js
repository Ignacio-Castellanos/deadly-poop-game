const cat = document.getElementById('cat');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let gameInterval;
let cucumberInterval;
let moveSpeed = 10;
let score = 0;
let gameOver = false;

document.addEventListener('keydown', function(event) {
    if (!gameOver) {
        moveCat(event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0);
    }
});

leftBtn.addEventListener('click', function() {
    if (!gameOver) {
        moveCat(-1);
    }
});

rightBtn.addEventListener('click', function() {
    if (!gameOver) {
        moveCat(1);
    }
});

function moveCat(direction) {
    const left = parseInt(window.getComputedStyle(cat).getPropertyValue('left'));
    
    if (direction === -1 && left > 0) {
        cat.style.left = left - moveSpeed + 'px';
    }
    if (direction === 1 && left < (gameContainer.clientWidth - cat.clientWidth)) {
        cat.style.left = left + moveSpeed + 'px';
    }
}

function createCucumber() {
    const cucumber = document.createElement('div');
    cucumber.classList.add('cucumber');
    cucumber.style.left = Math.floor(Math.random() * (gameContainer.clientWidth - cucumber.clientWidth)) + 'px';
    
    gameContainer.appendChild(cucumber);

    cucumber.style.animationDuration = (Math.random() * 2 + 2) + 's';

    cucumberInterval = setInterval(function() {
        const cucumberTop = parseInt(window.getComputedStyle(cucumber).getPropertyValue('top'));
        const catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue('left'));
        const catTop = parseInt(window.getComputedStyle(cat).getPropertyValue('top'));
        const cucumberLeft = parseInt(window.getComputedStyle(cucumber).getPropertyValue('left'));
        
        // Verifica si el pepino ha alcanzado al gato
        if (cucumberTop > catTop - cucumber.clientHeight && cucumberTop < catTop + cat.clientHeight && cucumberLeft >= catLeft && cucumberLeft <= catLeft + cat.clientWidth) {
            alert('¡Game Over! Your final score: ' + score);
            clearInterval(cucumberInterval);
            clearInterval(gameInterval);
            gameOver = true;
        }
        
        // Verifica si el pepino ha salido de la pantalla
        if (cucumberTop > gameContainer.clientHeight) {
            clearInterval(cucumberInterval);
            cucumber.remove();
            // Incrementa el puntaje
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    }, 20);
}

function startGame() {
    score = 0; // Resetea el puntaje al comenzar un nuevo juego
    scoreDisplay.textContent = 'Score: ' + score;
    gameOver = false;
    gameInterval = setInterval(createCucumber, 2000);
}

function resetGame() {
    gameContainer.innerHTML = '<div id="cat"></div>';
    startGame();
}

startGame();
