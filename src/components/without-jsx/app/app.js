import React from 'react';

import Display from '../display/display';

import { createChip8, executeNextCycly, getDisplay } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 320,
      height: 160,
    };

    this.imageData = new ImageData(this.state.width, this.state.height);
    this.displayRef = React.createRef();
    this.chip8 = createChip8(MOCK_GAME);
    this.requestCallback = null;
  }

  componentDidMount() {
    this.mainLoop();
  }

  mainLoop = () => {
    this.requestCallback = requestAnimationFrame(this.mainLoop);

    executeNextCycly(this.chip8);

    this.updateDisplay();
  }

  updateDisplay() {
    this.displayRef.current.updateDisplayData(getDisplay(this.chip8));
  }

  render() {
    const { width, height } = this.state;

    return (
      React.createElement(Display, {
        ref: this.displayRef,
        display: getDisplay(this.chip8),
        width,
        height,
      }, null)
    );
  }
}
