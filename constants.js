//------------
// Aliases
//------------
const Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

//------------
// System Vars
//------------
let DOLLAR = 2;
let TIME_RISING_INTERVAL = 2000;
const ELECTION_MONTH_INTERVAL = 24;
const RTE_SCALE = 3 / 5;
const GAME_OVER_SCORE = 1;
let DOLLAR_RISING_VALUE = 0.03;
let SPEED = 12;
let ELECTION_COUNT = 0;
let SCORE = 1;
let MONTH = 1;

//------------
// Initialize
//------------
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: false,
  resolution: 1,
});
const container = new Container();
