import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 5; // per second


const snakeBody = [
  { x:10, y:11 } // head
];

let newSegments = 0;

export function update() {
  addSegments();
  
  // for(let i = snakeBody.length - 2; i>=0; i--) {
  //   snakeBody[i+1] = { ...snakeBody[i] };
  // }

  // const inputDirection = getInputDirection();
  // snakeBody[0].x += inputDirection.x;
  // snakeBody[0].y += inputDirection.y;

  const inputDirection = getInputDirection();
  if (inputDirection.x !== 0 || inputDirection.y !== 0) {
    snakeBody.unshift({
      x: snakeBody[0].x + inputDirection.x,
      y: snakeBody[0].y + inputDirection.y
    });
    snakeBody.pop();
  }

}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.classList.add('snake');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  })
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}


function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}