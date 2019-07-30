import React from 'react';
import PropTypes from 'prop-types';

import Display from '../display/display';
import StateDisplay from '../state-display/state-display';

import { executeNextCycly, getDisplay, getProcessor, getMemory, getStack } from '../../../chip-8/chip-8';
import { getRegisters, getIRegister, getProgramCounter } from '../../../chip-8/processor/methods';
import { getDelayTimerValue, getSoundTimerValue } from '../../../chip-8/timer/timer';
import { getStackPointer, getStackValues } from '../../../chip-8/stack/stack';

import './chip-8.css';

export default class Chip8 extends React.Component {
  constructor(props) {
    super(props);

    const { chip8 } = props;

    this.state = {
      registers: getRegisters(getProcessor(chip8)),
      registerI: getIRegister(getProcessor(chip8)),
      delayTimer: getDelayTimerValue(getMemory(chip8)),
      soundTimer: getSoundTimerValue(getMemory(chip8)),
      programCounter: getProgramCounter(getProcessor(chip8)),
      stackPointer: getStackPointer(getStack(chip8)),
      stackValues: getStackValues(getStack(chip8)),
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
      registers: getRegisters(getProcessor(chip8)),
      registerI: getIRegister(getProcessor(chip8)),
      delayTimer: getDelayTimerValue(getMemory(chip8)),
      soundTimer: getSoundTimerValue(getMemory(chip8)),
      programCounter: getProgramCounter(getProcessor(chip8)),
      stackPointer: getStackPointer(getStack(chip8)),
      stackValues: getStackValues(getStack(chip8)),
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
