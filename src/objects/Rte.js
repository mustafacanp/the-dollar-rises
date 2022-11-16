import { Sprite } from "pixi.js";

export default class Rte extends Sprite {
  static RTE_SCALE_RATE = 3 / 5;

  texture;
  app;
  speed = 12;

  constructor(texture, app) {
    super(texture);
    this.app = app;

    // Initialize config
    this.x = (app.screen.width - this.width) / 2;
    this.y = (app.screen.height - this.height) / 2;
    this.vx = 0;
    this.vy = 0;
    this.scale.set(Rte.RTE_SCALE_RATE, Rte.RTE_SCALE_RATE);
  }

  getApp() {
    return this.app;
  }

  setApp(app) {
    this.app = app;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  winElection(electionCount) {
    const newSpeed = this.getSpeed() + 3;
    this.setSpeed(newSpeed);
    this.scale.set(
      Rte.RTE_SCALE_RATE + electionCount / 5,
      Rte.RTE_SCALE_RATE + electionCount / 5
    );
  }
}
