class Platform {
  constructor(Px, Py, pWidth, pHeight) {
    this.Px = Px;
    this.Py = Py;
    this.pWidth = pWidth;
    this.pHeight = pHeight;
    this.image = new Image();
    this.image.src = "./src/assets/images/leaf.png";
  }

  render(ctx) {
    ctx.drawImage(this.image, this.Px, this.Py, this.pWidth, this.pHeight);
  }
}
