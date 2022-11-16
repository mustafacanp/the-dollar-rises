import { GAME_OVER_SCORE } from "../constants";

export const checkGameOver = (currencyText, monthText) => {
  if (currencyText.getDollar() < GAME_OVER_SCORE) {
    monthText.clearMonthInterval();
    return true;
  } else {
    return false;
  }
};

export const gameOver = () => {
  // renderGameOver
  // Congrats, you became a better president than RTE in X mins and X secs
  alert("YOU WIN!");
};
