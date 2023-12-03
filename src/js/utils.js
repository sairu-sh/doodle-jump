let movement = {
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      movement.left = true;
      break;
    case "ArrowRight":
      movement.right = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      movement.left = false;
      break;
    case "ArrowRight":
      movement.right = false;
      break;
  }
});

function generateRandomPositions(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
