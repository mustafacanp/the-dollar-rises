//------------
// Initialize Functions
//------------
const setupRte = (app, rte) => {
  rte.x = (app.screen.width - rte.width)/2;
  rte.y = (app.screen.height - rte.height)/2;
  rte.vx = 0;
  rte.vy = 0;
  rte.scale.set(RTE_SCALE, RTE_SCALE);
}
const setupMoney = (money) => {
  money.x = Math.random() * (window.innerWidth - money.width);
  money.y = Math.random() * (window.innerHeight - money.height);
}
const setupElectionText = (electionText) => {
  electionText.x = (window.innerWidth - electionText.width)/2;
  electionText.y = (window.innerHeight - electionText.height)/2;
  electionText.alpha = .7;
}
const controlElectionText = (electionText, rte) => {
  if((MONTH+3) % ELECTION_MONTH_INTERVAL === 0) {
    electionText.text = '3 MONTH LEFT TO ELECTION!';
  } else if((MONTH+2) % ELECTION_MONTH_INTERVAL === 0) {
    electionText.text = '2 MONTH LEFT TO ELECTION!';
  } else if((MONTH+1) % ELECTION_MONTH_INTERVAL === 0) {
    electionText.text = '1 MONTH LEFT TO ELECTION!';
  } else if(MONTH % ELECTION_MONTH_INTERVAL === 0) {
    electionText.text = 'ELECTION TIME!';
    ELECTION_COUNT++;
  } else if((MONTH-1) % ELECTION_MONTH_INTERVAL === 0) {
    electionText.text = 'ELECTION TIME!';
  } else if(((MONTH-2) % ELECTION_MONTH_INTERVAL === 0 || (MONTH-3) % ELECTION_MONTH_INTERVAL === 0) && ELECTION_COUNT !== 0) {
    if(ELECTION_COUNT < 6) {
      SPEED += 5;
      rte.scale.set(RTE_SCALE+(ELECTION_COUNT*2/5), RTE_SCALE+(ELECTION_COUNT*2/5));
    }
    electionText.text = 'OF COURSE YOU WIN!\nYOU ARE BIGGER AND FASTER NOW.';
  } else {
    electionText.text = '';
  }
  setupElectionText(electionText);
}


// Create Texts
const createCountingText = () => {
  return new PIXI.Text(`1$ = ${(DOLLAR).toFixed(3)}TL`, {
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Arvo',
    fill: '#3e1707',
    align: 'center',
    stroke: '#a4410e',
    strokeThickness: 7
  });
}
const createMonthText = () => {
  return new PIXI.Text(`${SCORE} MONTH`, {
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Arvo',
    fill: '#3e1707',
    align: 'center',
    stroke: '#a4410e',
    strokeThickness: 7,
  });
}
const electionIsComing = () => {
  return new PIXI.Text('', {
    fontWeight: 'bold',
    fontSize: 45,
    fontFamily: 'Arvo',
    fill: '#3e1707',
    align: 'center',
    stroke: '#a4410e',
    strokeThickness: 7,
  });
}

// loadProgressHandler
const loadProgressHandler = (loader, resource) => {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

// Increase Dollar Value
const dolarRisingRate = () => {
  return Math.random()/2;
}

const multipler = (SCORE) => {
  SCORE++;
  if(SCORE <= 5)
    return 3;
  else if(SCORE > 5)
    return 5;
  else if(SCORE > 10)
    return 9;
  else if(SCORE > 25)
    return 13;
  else if(SCORE > 50)
    return 16;
  else if(SCORE > 75)
    return 21;
};
// Decrease Dollar Value
const decreaseDollar = () => {
  // console.log('-', parseFloat(DOLLAR * multipler(SCORE*2) / 10));
  return parseFloat(DOLLAR * multipler(SCORE*2) / 100);
}


const increaseTime = (app, countingText, monthText, electionText, rte) => {
  MONTH++;
  DOLLAR_RISING_VALUE = dolarRisingRate();
  // console.log('+', DOLLAR_RISING_VALUE);
  DOLLAR += DOLLAR_RISING_VALUE;
  updateMonthText(app, monthText);
  updateCountingText(countingText);
  controlElectionText(electionText, rte);
}

let controlGameOver = () => {}

const setup = () => {
  // Create the textures
  const rteTexture = resources["images/rte.png"].texture;
  const moneyTexture = resources["images/money.png"].texture;

  // Create and setup sprites
  const rte = new Sprite(rteTexture);
  setupRte(app, rte);
  const money = new Sprite(moneyTexture);
  setupMoney(money);

  const countingText = createCountingText();
  const monthText = createMonthText();
  const electionText = electionIsComing();
  updateMonthTextX(app, monthText);

  // Add the rte to the stage
  container.addChild(rte, money, countingText, monthText, electionText);
  app.ticker.add(delta => gameLoop(delta, rte, money, countingText, monthText, electionText));

  const time = setInterval(() => {
    increaseTime(app, countingText, monthText, electionText, rte);
  }, TIME_RISING_INTERVAL);

  controlGameOver = () => {
    if(DOLLAR < GAME_OVER_SCORE) {
      clearInterval(time);
      return true;
    } else {
      return false;
    }
  }

  // Click Event
  rte.interactive = true;
  rte.on('pointerdown', (event) => {
    // alert("Can't Touch This!");
  });
}

PIXI.loader
  .add([
    "images/rte.png",
    "images/money.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);




//------------
// Functions
//------------
const updateMonthTextX = (app, monthText) => {
  monthText.x = app.screen.width - monthText.width - 10;
  monthText.y = 10;
}
const updateMonthText = (app, monthText) => {
  let month_text = (parseInt(MONTH / 12) !== 0) ? ((parseInt(MONTH / 12) > 1) ? `${parseInt(MONTH / 12)} YEARS `: `${parseInt(MONTH / 12)} YEAR `) : '';
  month_text += (MONTH % 12 > 1) ? `${MONTH % 12} MONTHS`: `${MONTH % 12} MONTH`;
  monthText.text = month_text;
  updateMonthTextX(app, monthText);
}
const updateCountingText = (countingText) => {
  countingText.text = `1$ = ${(DOLLAR).toFixed(3)}TL`;
}
const changeMoneyPosition = (money) => {
  money.x = Math.random() * (window.innerWidth - money.width);
  money.y = Math.random() * (window.innerHeight - money.height);
}



//------------
// Collision Detection
//------------
const collisionDetection = (a, b, changeWay) => {
  // İçten Çarpışma ve Yön Değiştirme
  if(changeWay){
    if(a.x - 10 < b.x){
      //a.vx = Math.random() * SPEED;
      a.vx = 0;
      a.x = a.x + 10;
      return "Left";
    }
    if(a.x + a.width + 10 > b.x + b.width){
      //a.vx = -Math.random() * SPEED;
      a.vx = 0;
      a.x = a.x - 10;
      return "Right";
    }
    if(a.y - 10 < b.y){
      //a.vy = Math.random() * SPEED;
      a.vy = 0;
      a.y = a.y + 10;
      return "Up";
    }
    if(a.y + a.height + 10 > b.y + b.height){
      //a.vy = -Math.random() * SPEED;
      a.vy = 0;
      a.y = a.y - 10;
      return "Down";
    }
    if(a.x > b.x && a.x + a.width < b.x + b.width && a.y > b.y && a.y + a.height < b.y + b.height){
      return true;
    }
  } else {
    // Dıştan Çarpışma
    if(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y){
      return true;
    }
  }
}

const arrowKeys = (rte) => {
  // Kenarlara Çarptığında
  if(collisionDetection(rte, app.screen, true)){
    rte.x += rte.vx;
    rte.y += rte.vy;
  }
  goLeft.press =  () => {rte.vx -= SPEED}; goLeft.release =  () => { if(!goRight.isDown) {rte.vx = 0;} else {rte.vx += SPEED;} };
  goUp.press =  () => {rte.vy -= SPEED}; goUp.release =  () => { if(!goDown.isDown)    {rte.vy = 0;} else {rte.vy += SPEED;} };
  goRight.press = () => {rte.vx += SPEED}; goRight.release = () => { if(!goLeft.isDown)  {rte.vx = 0;} else {rte.vx -= SPEED;} };
  goDown.press =    () => {rte.vy += SPEED}; goDown.release =    () => { if(!goUp.isDown)  {rte.vy = 0;} else {rte.vy -= SPEED;} };
}



//------------
// Keyboard Events
//------------
function keyboard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
const goLeft = keyboard(37);
const goUp = keyboard(38);
const goRight = keyboard(39);
const goDown = keyboard(40);

const gameOver = () => {
  alert('YOU WIN!');
}
