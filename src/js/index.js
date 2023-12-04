const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//initializer
let character;
let platforms = [];
//scores
let score = 0;
let maxScore = 0;

let gameOver = false;

/**
 * initialixe the game
 */
function init() {
  platforms = [];
  score = 0;
  maxScore = 0;

  gameOver = false;

  character = new Character(150, 480, 50, 50);
  character.vy = character.initialVelocity;

  let platform = new Platform(130, 540, 80, 20);
  platforms.push(platform);

  //generate the starting platforms
  for (let i = 0; i < 6; i++) {
    let platform = new Platform(
      generateRandomPositions(0, canvas.clientWidth - 80),
      canvas.height - 80 * i - 140,
      80,
      20
    );
    platforms.push(platform);
    platform.render(ctx);
  }
}

init();

/**
 * creates a newPlatform once an old one disappears
 */
function generateNewPlatforms() {
  let platform = new Platform(
    generateRandomPositions(0, canvas.clientWidth - 80),
    -20,
    80,
    20
  );
  platforms.push(platform);
}

function updateScore() {
  let points = Math.floor(50 * Math.random());
  if (character.vy < 0) {
    maxScore += points;
    if (score < maxScore) score = maxScore;
  } else if (character.vy >= 0) {
    maxScore -= points;
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

  character.collisionWithWalls();
  character.vy += GRAVITY;
  character.y += character.vy;

  //platforms
  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    if (character.vy < 0 && character.y < (canvas.height * 3) / 4) {
      platform.Py -= character.initialVelocity;
    }
    if (
      character.collisionWithPlatforms(character, platform) &&
      character.vy >= 0
    ) {
      character.vy = character.initialVelocity; //jump off the platform
    }
    platform.render(ctx);
  }

  //clear platforms and add new platforms
  while (platforms.length > 0 && platforms[0].Py >= canvas.height) {
    platforms.shift(); //remove the platform that has gone below the canvas
    generateNewPlatforms();
  }

  character.draw(ctx);
  if (movement.left) {
    character.x -= character.vx;
  }
  if (movement.right) {
    character.x += character.vx;
  }

  if (character.y > canvas.height) gameOver = true;

  updateScore();
  ctx.fillStyle = "#000";
  ctx.font = "16px sans-serif";
  ctx.fillText(score, 5, 20);

  if (gameOver) {
    ctx.fillText(
      `Game over: Press 'space' to start over`,
      10,
      canvas.height - 100
    );
  }
}

animate();

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === " " && gameOver) {
    console.log("hi");
    init();
  }
});
