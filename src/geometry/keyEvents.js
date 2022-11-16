import collisionDetection from "./collisionDetection";

function keyboard(keyCodes) {
  const key = {};
  key.codes = keyCodes;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = (event) => {
    if (key.codes.includes(event.keyCode)) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  key.upHandler = (event) => {
    if (key.codes.includes(event.keyCode)) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}

// ↑, ←, ↓, →, W, A, S, D
const goLeft = keyboard([37, 65]);
const goUp = keyboard([38, 87]);
const goRight = keyboard([39, 68]);
const goDown = keyboard([40, 83]);

const keyEvents = (rte) => {
  const app = rte.getApp();
  const speed = rte.getSpeed();
  if (collisionDetection(rte, app.screen, true)) {
    rte.x += rte.vx;
    rte.y += rte.vy;
  }
  goLeft.press = () => {
    rte.vx -= speed;
  };
  goLeft.release = () => {
    if (!goRight.isDown) {
      rte.vx = 0;
    } else {
      rte.vx += speed;
    }
  };
  goUp.press = () => {
    rte.vy -= speed;
  };
  goUp.release = () => {
    if (!goDown.isDown) {
      rte.vy = 0;
    } else {
      rte.vy += speed;
    }
  };
  goRight.press = () => {
    rte.vx += speed;
  };
  goRight.release = () => {
    if (!goLeft.isDown) {
      rte.vx = 0;
    } else {
      rte.vx -= speed;
    }
  };
  goDown.press = () => {
    rte.vy += speed;
  };
  goDown.release = () => {
    if (!goUp.isDown) {
      rte.vy = 0;
    } else {
      rte.vy -= speed;
    }
  };
};

export default keyEvents;
