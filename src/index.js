import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from './components/without-jsx/canvas/canvas';

import { MOCK_GAME, TEST_ROM } from './chip-8/processor/const';
import { executeNextCycly, getDisplay } from './chip-8/chip-8';
import { getPixel } from './chip-8/display/display';
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from './chip-8/display/const/index';
import { createChip8 } from './chip-8/chip-8';

import './main.css';

ReactDOM.render(React.createElement(Canvas, null, null), document.getElementById('app'));

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const canvasBuffer = ctx.getImageData(0, 0, canvas.width, canvas.height);

function putPixel(buffer, x, y, value) {
  const color = value * 255;

  let offset = 4 * x + buffer.width * 4 * y;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = 255;
}

// const chip8 = createChip8(MOCK_GAME);
const chip8 = createChip8(TEST_ROM);

const scale = 5;

function main() {
  requestAnimationFrame(main);

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

main();
