import React from 'react';
import PropTypes from 'prop-types';

import Display from '../display/display';
import StateDisplay from '../state-display/state-display';

import { executeNextCycly, getDisplay, getProcessor } from '../../../chip-8/chip-8';
import { getRegisters } from '../../../chip-8/processor/methods';

import './chip-8.css';

export default class Chip8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registers: getRegisters(getProcessor(props.chip8)),
    }

    this.displayRef = React.createRef();
  }

  executeNextCycly() {
    executeNextCycly(this.props.chip8);

    this.updateDisplay();
    this.updateRegisters();
  }

  updateDisplay() {
    this.displayRef.current.updateDisplayData(getDisplay(this.props.chip8));
  }

  updateRegisters() {
    this.setState({
      registers: getRegisters(getProcessor(this.props.chip8)),
    });
  }

  render () {
    const { chip8, scale } = this.props;
    const { registers } = this.state;

    return (
      React.createElement('div', { className: 'chip-8' },
        React.createElement(Display, {
          ref: this.displayRef,
          display: getDisplay(chip8),
          scale,
        }),
        React.createElement(
          StateDisplay, { registers }
        ),
      )
    );
  }
}

Chip8.propTypes = {
  chip8: PropTypes.object.isRequired,
  scale: PropTypes.number,
};
