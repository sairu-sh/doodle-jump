class Character {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.initialVelocity = -6;
    this.width = width;
    this.height = height;
    this.vx = SPEEDX;
    this.vy = SPEEDY;
    this.image = new Image();
    this.image.src = "./src/assets/images/spritesheet.svg";
  }

  draw(ctx) {
    let x = 0;
    let width = 130;
    let height = 150;
    let y;
    if (this.vy > 0) {
      y = 0;
    } else {
      y = 150;
      height = 200;
    }
    ctx.drawImage(this.image, x, y, width, height, this.x, this.y, 50, 50);
  }

  collisionWithWalls() {
    if (this.x + this.width > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width - this.width;
    } else if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      movement.isGrounded = true;
    }
  }

  collisionWithPlatforms(character, platform) {
    return (
      character.x < platform.Px + platform.pWidth && //character's top left corner doesn't reach platform's top right corner
      character.x + character.width > platform.Px && //character's top right corner passes platform's top left corner
      character.y < platform.Py + platform.pHeight && //character's top left corner doesn't reach platform's bottom left corner
      character.y + character.height > platform.Py //character's top left bottom doesn't reach platform's top left corner
    );
  }
}
