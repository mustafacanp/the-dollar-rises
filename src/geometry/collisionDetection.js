export default function (a, b, changeWay = false) {
  // External Collision and Changing Direction
  if (changeWay) {
    if (a.x - 10 < b.x) {
      //a.vx = Math.random() * SPEED;
      a.vx = 0;
      a.x = a.x + 10;
      return "Left";
    }
    if (a.x + a.width + 10 > b.x + b.width) {
      //a.vx = -Math.random() * SPEED;
      a.vx = 0;
      a.x = a.x - 10;
      return "Right";
    }
    if (a.y - 10 < b.y) {
      //a.vy = Math.random() * SPEED;
      a.vy = 0;
      a.y = a.y + 10;
      return "Up";
    }
    if (a.y + a.height + 10 > b.y + b.height) {
      //a.vy = -Math.random() * SPEED;
      a.vy = 0;
      a.y = a.y - 10;
      return "Down";
    }
    if (
      a.x > b.x &&
      a.x + a.width < b.x + b.width &&
      a.y > b.y &&
      a.y + a.height < b.y + b.height
    ) {
      return true;
    }
  } else {
    // External Collision
    if (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.height + a.y > b.y
    ) {
      return true;
    }
  }
  return false;
}
