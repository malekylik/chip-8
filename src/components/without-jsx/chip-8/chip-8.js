import React from 'react';
import PropTypes from 'prop-types';

import Display from '../display/display';
import StateDisplay from '../state-display/state-display';

import {
  executeNextCycly,
  getDisplay,
  getProgramCounter,
  getRegisters,
  getIRegister,
  getDelayTimerValue,
  getSoundTimerValue,
  getStackPointer,
  getStackValues,
} from '../../../chip-8/chip-8';

import './chip-8.css';

export default class Chip8 extends React.Component {
  constructor(props) {
    super(props);

    const { chip8 } = props;

    this.state = {
      registers: getRegisters(chip8),
      registerI: getIRegister(chip8),
      delayTimer: getDelayTimerValue(chip8),
      soundTimer: getSoundTimerValue(chip8),
      programCounter: getProgramCounter(chip8),
      stackPointer: getStackPointer(chip8),
      stackValues: getStackValues(chip8),
    }

    this.displayRef = React.createRef();
  }

  executeNextCycly() {
    executeNextCycly(this.props.chip8);

    this.updateDisplay();
    this.updateState();
  }

  updateDisplay() {
    this.displayRef.current.updateDisplayData(getDisplay(this.props.chip8));
  }

  updateState() {
    const { chip8 } = this.props;

    this.setState({
      registers: getRegisters(chip8),
      registerI: getIRegister(chip8),
      delayTimer: getDelayTimerValue(chip8),
      soundTimer: getSoundTimerValue(chip8),
      programCounter: getProgramCounter(chip8),
      stackPointer: getStackPointer(chip8),
      stackValues: getStackValues(chip8),
    });
  }

  render () {
    const { chip8, scale } = this.props;
    const { registers, registerI, delayTimer, soundTimer, programCounter, stackPointer, stackValues } = this.state;

    return (
      React.createElement('div', { className: 'chip-8' },
        React.createElement(Display, {
          ref: this.displayRef,
          display: getDisplay(chip8),
          scale,
        }),
        React.createElement(
          StateDisplay, { registers, registerI, delayTimer, soundTimer, programCounter, stackPointer, stackValues }
        ),
      )
    );
  }
}

Chip8.propTypes = {
  chip8: PropTypes.object.isRequired,
  scale: PropTypes.number,
};
