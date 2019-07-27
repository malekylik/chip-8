import React from 'react';

import Canvas from '../canvas/canvas';

import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from '../../../chip-8/display/const/index';
import { createChip8, executeNextCycly, getDisplay } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';
import { getPixel } from '../../../chip-8/display/display';

function putPixel(buffer, x, y, value) {
  const color = value * 255;

  let offset = 4 * x + buffer.width * 4 * y;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = 255;
}

const scale = 5;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 320,
      height: 160,
    };

    this.chip8 = createChip8(MOCK_GAME);
    this.imageData = new ImageData(this.state.width, this.state.height);

    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);
    executeNextCycly(this.chip8);

    const display = getDisplay(this.chip8);

    for (let i = 0; i < DISPLAY_HEIGHT * scale; i++) {
      for (let j = 0; j < DISPLAY_WIDTH * scale; j++) {
        putPixel(this.imageData, j, i, getPixel(display, (j / scale) | 0, (i / scale) | 0));
      }
    }
  }

  render() {
    return (
      React.createElement(Canvas, { imageData: this.imageData }, null)
    );
  }
}
