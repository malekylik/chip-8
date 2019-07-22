import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';
import { creatProcessor, executeOpcode } from './chip-8/processor/processor';
import { getProgramCounter } from './chip-8/processor/methods';
import { MOCK_GAME, OPCODE_BYTES } from './chip-8/processor/const';
import { createOpcode } from './chip-8/processor/opcode/opcode';
import { createStack } from './chip-8/stack/stack';
import { createMemory, loadGame, readMemory, loadFonts } from './chip-8/memory/memory';
import { createDisplay, getPixel } from './chip-8/display/display';
import { FONTS, DISPLAY_WIDTH, DISPLAY_HEIGHT } from './chip-8/display/const/index';
import { creatTimer, updateTimer } from './chip-8/timer/timer';
import { createKeyboard } from './chip-8/keyboard/keyboard';

ReactDOM.render(<span className='span'>hello</span>, document.getElementById('app'));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasBuffer = ctx.getImageData(0, 0, canvas.width, canvas.height);

function putPixel(buffer, x, y, value) {
  const color = value * 255;

  let offset = 4 * x + buffer.width * 4 * y;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = 255;
}

const processor = creatProcessor();
const stack = createStack();
const memory = createMemory();
const display = createDisplay();
const delayTimer = creatTimer();
const soundTimer = creatTimer();
const keyboard = createKeyboard();

loadFonts(memory, FONTS);
loadGame(memory, MOCK_GAME);

const scale = 5;

function main() {
  requestAnimationFrame(main);

  const PC = getProgramCounter(processor);
  const opcode = createOpcode(readMemory(memory, PC, OPCODE_BYTES));

  executeOpcode(processor, opcode, stack, memory, display, delayTimer, soundTimer, keyboard);

  for (let i = 0; i < DISPLAY_HEIGHT * scale; i++) {
    for (let j = 0; j < DISPLAY_WIDTH * scale; j++) {
      putPixel(canvasBuffer, j, i, getPixel(display, (j / scale) | 0, (i / scale) | 0));
    }
  }

  updateTimer(delayTimer);
  updateTimer(soundTimer);

  ctx.putImageData(canvasBuffer, 0, 0);

  console.log(`PC: ${PC}`);
}

main();
