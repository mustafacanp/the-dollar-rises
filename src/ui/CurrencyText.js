import { Text } from "pixi.js";

export default class CurrencyText extends Text {
  static INIT_DOLLAR_VALUE = 1.67;

  dollar = CurrencyText.INIT_DOLLAR_VALUE;

  constructor() {
    super("", {
      fontWeight: "bold",
      fontSize: 40,
      fontFamily: "Arial",
      fill: "#3e1707",
      align: "center",
      stroke: "#a4410e",
      strokeThickness: 5,
    });
    this.alpha = 0.8;
    this.text = this.formatText();
  }

  update() {
    this.text = this.formatText();
  }

  getDollar() {
    return this.dollar;
  }

  setDollar(dollar) {
    this.dollar = dollar;
  }

  formatText() {
    return `$1 = ${this.dollar.toFixed(3)}TL`;
  }

  setDollar(dollar) {
    this.dollar = dollar;
  }

  increaseDollar() {
    this.setDollar(this.dollar + Math.random() / 2);
  }

  // When RTE and money collide
  decreaseDollar(score) {
    // Current logic makes the late game easier
    const multipler = (score) => {
      if (score <= 25) return 3;
      else if (score > 25) return 4;
      else if (score > 50) return 5;
      else if (score > 70) return 6;
      else if (score > 100) return 7;
    };
    const decreaseValue = parseFloat((this.dollar * multipler(score)) / 100);
    this.setDollar(this.dollar - decreaseValue);
  }
}
