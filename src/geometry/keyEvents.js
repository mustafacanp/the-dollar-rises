import collisionDetection from "./collisionDetection";

function keyboardInput(keyCodes) {
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
const keyboardLeft = keyboardInput([37, 65]);
const keyboardUp = keyboardInput([38, 87]);
const keyboardRight = keyboardInput([39, 68]);
const keyboardDown = keyboardInput([40, 83]);

const keyboardEvents = (rte) => {
  const app = rte.getApp();
  const speed = rte.getSpeed();
  if (collisionDetection(rte, app.screen, true)) {
    rte.x += rte.vx;
    rte.y += rte.vy;
  }
  keyboardLeft.press = () => {
    controllerEnabled = false;
    rte.vx -= speed;
  };
  keyboardLeft.release = () => {
    if (!keyboardRight.isDown) {
      rte.vx = 0;
    } else {
      rte.vx += speed;
    }
  };
  keyboardUp.press = () => {
    controllerEnabled = false;
    rte.vy -= speed;
  };
  keyboardUp.release = () => {
    if (!keyboardDown.isDown) {
      rte.vy = 0;
    } else {
      rte.vy += speed;
    }
  };
  keyboardRight.press = () => {
    controllerEnabled = false;
    rte.vx += speed;
  };
  keyboardRight.release = () => {
    if (!keyboardLeft.isDown) {
      rte.vx = 0;
    } else {
      rte.vx -= speed;
    }
  };
  keyboardDown.press = () => {
    controllerEnabled = false;
    rte.vy += speed;
  };
  keyboardDown.release = () => {
    if (keyboardUp.isDown) {
      rte.vy = 0;
    } else {
      rte.vy -= speed;
    }
  };
};

let controllerEnabled = false;
let controllerIndex = null;
let gamepadLeftPressed = false;
let gamepadRightPressed = false;
let gamepadUpPressed = false;
let gamepadDownPressed = false;

const gamepadEvents = (rte) => {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];

    const buttons = gamepad.buttons;
    gamepadUpPressed = buttons[12].pressed;
    gamepadDownPressed = buttons[13].pressed;
    gamepadLeftPressed = buttons[14].pressed;
    gamepadRightPressed = buttons[15].pressed;

    const stickDeadZone = 0.4;
    const leftRightValue = gamepad.axes[0];
    const upDownValue = gamepad.axes[1];

    if (leftRightValue >= stickDeadZone) gamepadRightPressed = true;
    else if (leftRightValue <= -stickDeadZone) gamepadLeftPressed = true;

    if (upDownValue >= stickDeadZone) gamepadDownPressed = true;
    else if (upDownValue <= -stickDeadZone) gamepadUpPressed = true;

    const speed = rte.getSpeed();
    if (gamepadUpPressed) {
      rte.vy -= speed / 35;
      controllerEnabled = true;
    } else if (gamepadDownPressed) {
      rte.vy += speed / 35;
      controllerEnabled = true;
    } else if (controllerEnabled) rte.vy = 0;

    if (gamepadLeftPressed) rte.vx -= speed / 35;
    else if (gamepadRightPressed) rte.vx += speed / 35;
    else if (controllerEnabled) rte.vx = 0;
  }

  window.addEventListener("gamepadconnected", (event) => {
    controllerEnabled = true;
    controllerIndex = event.gamepad.index;
  });
  window.addEventListener("gamepaddisconnected", (event) => {
    controllerEnabled = false;
    controllerIndex = null;
  });
};

const controlEvents = (rte) => {
  gamepadEvents(rte);
  keyboardEvents(rte);
};

export default controlEvents;
