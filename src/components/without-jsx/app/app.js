import React from 'react';

import Chip8 from '../chip-8/chip-8';

import { createChip8 } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scale: 10 };

    this.chip8Ref = React.createRef();
    this.chip8 = createChip8(MOCK_GAME);
    this.requestCallback = null;
  }

  componentDidMount() {
    this.mainLoop();
  }

  mainLoop = () => {
    this.requestCallback = requestAnimationFrame(this.mainLoop);

    this.nextStep();
  }

  nextStep() {
    this.chip8Ref.current.executeNextCycly();
  }

  render() {
    const { scale } = this.state;

    return (
      React.createElement(Chip8, {
        ref: this.chip8Ref,
        chip8: this.chip8,
        scale,
      }, null)
    );
  }
}
