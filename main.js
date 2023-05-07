import * as PIXI from "pixi.js";
import { RESOURCES } from "./src/constants";
import Rte from "./src/objects/Rte";
import Money from "./src/objects/Money";
import controlEvents from "./src/geometry/keyEvents";
import collisionDetection from "./src/geometry/collisionDetection";
import { checkGameOver, gameOver } from "./src/utils/gameOver";
import CurrencyText from "./src/ui/CurrencyText";
import MonthText from "./src/ui/MonthText";
import ElectionText from "./src/ui/ElectionText";

import "./style.css";

const Application = PIXI.Application,
  Container = PIXI.Container,
  Resources = PIXI.loader.resources;

let score = 0;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: false,
  resolution: 1,
});
const container = new Container();

const setup = () => {
  // Create the textures
  const rteTexture = Resources[RESOURCES.RTE].texture;
  const moneyTexture = Resources[RESOURCES.MONEY].texture;

  // Create and setup sprites
  const rte = new Rte(rteTexture, app);
  const money = new Money(moneyTexture);

  const currencyText = new CurrencyText();
  const monthText = new MonthText(app.screen.width);
  const electionText = new ElectionText(rte, currencyText, monthText);

  // Add the RTE to the stage
  container.addChild(rte, money, currencyText, monthText, electionText);
  app.ticker.add((delta) => {
    function gameLoop(delta, rte, money, currencyText) {
      // Collision with money
      if (collisionDetection(rte, money)) {
        score++;
        currencyText.decreaseDollar(score);
        currencyText.update();
        money.updatePosition();

        if (checkGameOver(currencyText, monthText)) {
          gameOver();
        }
      }
      if (!checkGameOver(currencyText, monthText)) {
        controlEvents(rte);
      }
    }
    gameLoop(delta, rte, money, currencyText, monthText, electionText);
  });

  monthText.startMonthInterval(currencyText, electionText);
};

const loadProgressHandler = (loader, resource) => {
  // A fancy RTE animation will come here
  // console.log("loading: " + resource.url);
  // console.log("progress: " + loader.progress + "%");
};

PIXI.loader
  .add([RESOURCES.RTE, RESOURCES.MONEY])
  .on("progress", loadProgressHandler)
  .load(setup);

app.stage.addChild(container);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

app.renderer.backgroundColor = 0x061639;
document.body.appendChild(app.view);
