app.stage.addChild(container);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

app.renderer.backgroundColor = 0x061639;
document.body.appendChild(app.view);


function gameLoop(delta, rte, money, countingText){

  // Paraya Çarptığında
  if(collisionDetection(rte, money)){
      SCORE++;

      DOLLAR -= decreaseDollar();
      updateCountingText(countingText);
      changeMoneyPosition(money);

      if(controlGameOver()) {
        gameOver();
      }
  }
  if(!controlGameOver()) {
    arrowKeys(rte);
  }
}
