import { Text } from "pixi.js";

export default class MonthText extends Text {
  static INCREASE_MONTH_MILLIS = 2000;

  month = 1;
  appWidth;
  monthInterval;

  constructor(appWidth) {
    super("1 MONTH", {
      fontWeight: "bold",
      fontSize: 30,
      fontFamily: "Arial",
      fill: "#3e1707",
      align: "center",
      stroke: "#a4410e",
      strokeThickness: 5,
    });
    this.appWidth = appWidth;
    this.alpha = 0.8;
    this.alignText();
  }

  update() {
    const yearCount = parseInt(this.month / 12);
    let text = "";
    if (yearCount === 1) {
      text = `${yearCount} YEAR `;
    } else if (yearCount > 1) {
      text = `${yearCount} YEARS `;
    }
    text += `${this.month % 12} MONTH${this.month % 12 > 1 ? "S" : ""}`;
    this.text = text;
    this.alignText();
  }

  alignText() {
    this.x = this.appWidth - this.width - 10;
    this.y = 10;
  }

  startMonthInterval(currencyText, electionText) {
    this.monthInterval = setInterval(() => {
      this.increaseMonth();
      currencyText.increaseDollar();
      currencyText.update();
      this.update();
      electionText.update();
    }, MonthText.INCREASE_MONTH_MILLIS);
  }

  getMonth() {
    return this.month;
  }

  increaseMonth() {
    this.month = this.month + 1;
  }

  getMonthInterval() {
    return this.monthInterval;
  }

  clearMonthInterval() {
    clearInterval(this.monthInterval);
  }
}
