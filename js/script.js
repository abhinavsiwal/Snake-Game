// Game Constants
let direction = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");

let speed = 2;
let lastPaintTime = 0;

let snakeArray = [{ x: 13, y: 15 }];

//Game Functions
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  console.log(currentTime);
  gameEngine();
}

const gameEngine = () => {
    let board = document.getElementById('board');
  //Part 1 : Updating the snake array

  //Part 2 : Display the snake and food
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.classList.add('food');
    board.appendChild(snakeElement);
  });
};

//Main Logic starts here
window.requestAnimationFrame(main);
