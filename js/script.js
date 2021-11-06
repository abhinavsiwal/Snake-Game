// Game Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let scoreDiv = document.getElementById("score");

let speed = 6;
let score = 0;
let lastPaintTime = 0;

let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
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

const isCollide = (snake) => {
  //If you bump into yourself
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
};

const gameEngine = () => {
  let board = document.getElementById("board");
  //Part 1 : Updating the snake array
  if (isCollide(snakeArray)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArray = [{ x: 13, y: 15 }];
    // musicSound.play();
    score = 0;
  }

  //If you have eaten the food,increment the score and regenerate the food
  if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
    foodSound.play();
    score += 1;
    scoreDiv.innerHTML = "Score : " + score;
    snakeArray.unshift({
      x: snakeArray[0].x + inputDir.x,
      y: snakeArray[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving the snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    //   const element=array[i];
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += inputDir.x;
  snakeArray[0].y += inputDir.y;

  //Part 2 : Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

//Main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow up pressed");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("Arrow down pressed");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("Arrow left pressed");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("Arrow right pressed");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
