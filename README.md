# The Dollar Rises

A small satirical browser game built with [PixiJS](https://pixijs.com/) and [Vite](https://vitejs.dev/).

**[Play the demo →](https://tdr.mustafacanpalaz.com/)**

## How to play

**Goal: collect the dollars that appear on screen to bring the dollar down.**

- The exchange rate starts at **$1 = 1.670 TL**.
- Every 2 seconds a month passes and the dollar **rises** by a random amount.
- Each dollar you collect pushes the rate **down** by a percentage of its current value, and a new one appears somewhere else. The percentage grows as you collect more.
- An election comes around every 24 months. You always win it (of course), and each win makes you **bigger and faster**, up to 6 elections.
- **You win when the dollar drops below 1 TL.**

## Controls

| Action | Keyboard | Gamepad |
| ------ | -------- | ------- |
| Move   | Arrow keys / `W` `A` `S` `D` | D-pad / left stick |

Gamepads are picked up automatically when connected.

## Running locally

Requires [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Project structure

```
index.html            entry page
main.js               app setup, asset loading and game loop
style.css
images/               sprites (player, money)
src/
  constants.js        win threshold and asset paths
  objects/            RTE (player) and Money sprites
  ui/                 exchange rate, month counter and election texts
  geometry/           collision detection, keyboard and gamepad input
  utils/gameOver.js   win check
```
