import { Sprite } from "pixi.js";

export default class Money extends Sprite {
  texture;

  constructor(texture) {
    super(texture);

    // Initialize config
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);
  }

  updatePosition() {
    this.x = Math.random() * (window.innerWidth - this.width);
    this.y = Math.random() * (window.innerHeight - this.height);
  }
}
