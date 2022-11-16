import { Text } from "pixi.js";

export default class ElectionText extends Text {
  static ELECTION_MONTH_INTERVAL = 24;

  electionCount = 0;
  rte;
  currencyText;
  monthText;

  constructor(rte, currencyText, monthText) {
    super("", {
      fontWeight: "bold",
      fontSize: 30,
      fontFamily: "Arial",
      fill: "#3e1707",
      align: "center",
      stroke: "#a4410e",
      strokeThickness: 5,
    });
    this.rte = rte;
    this.currencyText = currencyText;
    this.monthText = monthText;
    this.alpha = 0.6;
  }

  update() {
    const month = this.monthText.getMonth();
    // Can't win more than 6 elections
    if (this.electionCount < 6) {
      if ((month + 3) % ElectionText.ELECTION_MONTH_INTERVAL === 0) {
        this.text = "3 MONTHS LEFT UNTIL THE ELECTION!";
      } else if ((month + 2) % ElectionText.ELECTION_MONTH_INTERVAL === 0) {
        this.text = "2 MONTHS LEFT UNTIL THE ELECTION!";
      } else if ((month + 1) % ElectionText.ELECTION_MONTH_INTERVAL === 0) {
        this.text = "1 MONTH LEFT UNTIL THE ELECTION!";
      } else if (month % ElectionText.ELECTION_MONTH_INTERVAL === 0) {
        this.text = "ELECTION TIME!";
        this.increaseElectionCount();
      } else if ((month - 1) % ElectionText.ELECTION_MONTH_INTERVAL === 0) {
        this.text = "ELECTION TIME!";
      } else if (
        ((month - 2) % ElectionText.ELECTION_MONTH_INTERVAL === 0 ||
          (month - 3) % ElectionText.ELECTION_MONTH_INTERVAL === 0) &&
        this.electionCount !== 0
      ) {
        this.rte.winElection(this.electionCount);
        this.text = "OF COURSE YOU WIN!\nYOU ARE BIGGER AND FASTER NOW.";
      } else {
        this.text = "";
      }
      this.alignText();
    } else {
      this.text = "";
    }
  }

  alignText() {
    this.x = (window.innerWidth - this.width) / 2;
    this.y = (window.innerHeight - this.height) / 2;
  }

  increaseElectionCount() {
    this.electionCount = this.electionCount + 1;
  }
}
