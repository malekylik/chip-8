import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Display2D from '../display/display-gl';
import DisplayGL from '../display/display-gl';
import StateDisplay from '../state-display/state-display';
import Asseambly from '../assembly/assembly';
import KeyboardState from '../keyboard-state/keyboard-state';

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
  isKeyExist,
  pressKey,
  releaseKey,
  getKeyboard,
} from '../../../chip-8/chip-8';
import { setAssemblyLineNumber } from '../../../redux/assembly/assembly.actions';

import './chip-8.css';

class Chip8 extends React.Component {
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
    this.prevPC = getProgramCounter(chip8);
  }

  executeNextCycly() {
    executeNextCycly(this.props.chip8);

    this.updateDisplay();
    this.updateState();

    this.prevPC = getProgramCounter(this.props.chip8);
  }

  updateDisplay() {
    this.displayRef.current.updateDisplayData(getDisplay(this.props.chip8));
  }

  updateState() {
    const { chip8 } = this.props;

    this.props.setAssemblyLineNumber(getProgramCounter(chip8));

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

  onKeyDown = (e) => {
    if (!e.repeat) {
      const key = e.key.toLowerCase();
      const { chip8 } = this.props;

      if (isKeyExist(chip8, key)) {
        pressKey(chip8, key);
      }
    }
  }

  onKeyUp = (e) => {
    const key = e.key.toLowerCase();
    const { chip8 } = this.props;

    if (isKeyExist(chip8, key)) {
      releaseKey(chip8, key);
    }

  }

  render () {
    const { chip8, scale } = this.props;
    const {
      registers,
      registerI,
      delayTimer,
      soundTimer,
      programCounter,
      stackPointer,
      stackValues,
    } = this.state;

    return (
      React.createElement('div', null,
        React.createElement('div', { className: 'chip-8' },
          React.createElement(DisplayGL, {
            ref: this.displayRef,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            display: getDisplay(chip8),
            scale,
          }),
          React.createElement(
            StateDisplay, { registers, registerI, delayTimer, soundTimer, programCounter, stackPointer, stackValues }
          ),
          React.createElement(Asseambly)
        ),
        React.createElement('div', null,
          React.createElement(KeyboardState, {
            keyboard: getKeyboard(chip8),
          })
        )
      )
    );
  }
}

Chip8.propTypes = {
  chip8: PropTypes.object.isRequired,
  scale: PropTypes.number,
};

export default connect(null, { setAssemblyLineNumber }, null, { forwardRef: true })(Chip8);
