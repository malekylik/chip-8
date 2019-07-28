import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/without-jsx/app/app';

import { MOCK_GAME, TEST_ROM } from './chip-8/processor/const';

import './main.css';

ReactDOM.render(React.createElement(App, null, null), document.getElementById('app'));

function main() {
  // requestAnimationFrame(main);

  const PC = executeNextCycly(chip8);

  const display = getDisplay(chip8);

  // for (let i = 0; i < DISPLAY_HEIGHT * scale; i++) {
  //   for (let j = 0; j < DISPLAY_WIDTH * scale; j++) {
  //     putPixel(canvasBuffer, j, i, getPixel(display, (j / scale) | 0, (i / scale) | 0));
  //   }
  // }

  // ctx.putImageData(canvasBuffer, 0, 0);

  console.log(`PC: ${PC}`);
}

// main();
