let start_btn = document.getElementById("start_btn");
let game_area = document.getElementById("game_area");
let timerDisplay = document.getElementById("timer");
let scoreDisplay = document.getElementById("score");
let gameOverDisplay = document.getElementById("game_over");

let gameDuration = 30000;
let score = 0;
let gameTimer;
let first_target, second_target, third_target; 

class Target {
    constructor(gameField, onClickCallback, type) {
      this.gameField = gameField;
      this.onClickCallback = onClickCallback;
      this.button = null;
      this.type = type;
      this.isActive = false;
    }

    show () {
        if (this.isActive) return;

        this.button = document.createElement("button");
        this.button.className = "target-btn";

        if (this.type === 1) {
            this.button.textContent = "1";
        }else if (this.type ===2) {
            this.button.textContent = "2";
        }else {
            this.button.textContent = "3";
        }

        this.isActive = true;

        this.gameField.appendChild(this.button);

        const buttonWidth = this.button.offsetWidth;
        const buttonHeight = this.button.offsetHeight;

        const maxWidth = this.gameField.clientWidth - buttonWidth;
        const maxHeight = this.gameField.clientHeight - buttonHeight;
        
        const randomWidth = Math.max(0, Math.floor(Math.random() * maxWidth));
        const randomHeight = Math.max(0, Math.floor(Math.random() * maxHeight));

        this.button.style.left = `${randomWidth}px`;
        this.button.style.top = `${randomHeight}px`;

        this.button.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = `Попадания: ${score}`;

            this.onClickCallback();
            this.hide();
            this.show();
        });
    }

    hide() {
        if (this.button) {
            this.button.remove();
            this.button = null;
        }
    this.isActive = false;
    }
}

function updateTimer() {
    const seconds = Math.ceil(gameDuration / 1000);
    timerDisplay.textContent = `Время: ${seconds}`
}

function endGame() {
    clearInterval(gameTimer);
    first_target.hide();
    second_target.hide();
    timerDisplay.textContent = "Время вышло";
    gameOverDisplay.style.display = "block";
    setTimeout(() => {
        alert(`КОНЕЦ. СЧЕТ: ${score}`);
    }, 500)
}

function play() {
    score = 0;
    scoreDisplay.textContent = "Попадания: 0";
    gameDuration = 30000;
    gameOverDisplay.style.display = "none";
    updateTimer();

    first_target = new Target(game_area, () => {
        console.log("мишень 1 нажата");
    }, 1);

    second_target = new Target(game_area, () => {
        console.log("мишень 2 нажата");
    }, 2);

    third_target = new Target(game_area, () => {
        console.log("мишень 3 нажата");
    }, 3);

    second_target.show();
    first_target.show();
    third_target.show();

    
    gameTimer = setInterval(() => {
        gameDuration -= 1000;
        updateTimer();

        if (gameDuration <= 0) {
            endGame();
        }
    }, 1000);
}



start_btn.addEventListener("click", function() {
    start_btn.remove();
    game_area.style.marginTop = "40px";
    game_area.style.backgroundColor = "gray";
    play();
});