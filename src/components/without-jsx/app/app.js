import React from 'react';
import { connect } from 'react-redux';

import Chip8 from '../chip-8/chip-8';

import { createChip8 } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';
import { selectSubAssemblyLines } from '../../../redux/assembly/assembly.selectors';
import { disassemblyCode } from '../../../redux/assembly/assembly.actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scale: 10 };

    this.chip8Ref = React.createRef();
    this.chip8 = createChip8(MOCK_GAME);
    this.requestCallback = null;
    this.props.disassemblyCode(MOCK_GAME);
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

function mapStateToProps(state) {
  return ({
    assemblyLines: selectSubAssemblyLines(state),
  });
}

export default connect(mapStateToProps, { disassemblyCode })(App);
