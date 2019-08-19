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
import {
  setProgramCounter,
  setRegisterI,
  setSoundTimer,
  setDelayTimer,
  setStackPointer,
  setStackValues,
  setRegisters,
  incrementKeyPressCount,
  decrementKeyPressCount,
  resetKeyPressCount,
} from '../../../redux/chip-8/chip-8.actions';

import './chip-8.css';

class Chip8 extends React.Component {
  displayRef = React.createRef();

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

    this.props.setAssemblyLineNumber(getProgramCounter(chip8));
    this.props.setProgramCounter(getProgramCounter(chip8));
    this.props.setRegisterI(getIRegister(chip8));
    this.props.setDelayTimer(getDelayTimerValue(chip8));
    this.props.setSoundTimer(getSoundTimerValue(chip8));
    this.props.setStackPointer(getStackPointer(chip8));
    this.props.setStackValues(getStackValues(chip8));
    this.props.setRegisters(getRegisters(chip8));
  }

  onKeyDown = (e) => {
    if (!e.repeat) {
      const key = e.key.toLowerCase();
      const { chip8 } = this.props;

      if (isKeyExist(chip8, key)) {
        pressKey(chip8, key);
        this.props.incrementKeyPressCount();
      }
    }
  }

  onKeyUp = (e) => {
    const key = e.key.toLowerCase();
    const { chip8 } = this.props;

    if (isKeyExist(chip8, key)) {
      releaseKey(chip8, key);
      this.props.decrementKeyPressCount();
    }
  }

  onBlur = () => {
    this.props.resetKeyPressCount();
  }

  render () {
    const { chip8, scale } = this.props;

    return (
      React.createElement('div', null,
        React.createElement('div', { className: 'chip-8' },
          React.createElement(DisplayGL, {
            ref: this.displayRef,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            onBlur: this.onBlur,
            display: getDisplay(chip8),
            scale,
          }),
          React.createElement(StateDisplay),
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

const mapDispatchToProps = {
  setAssemblyLineNumber,
  setProgramCounter,
  setRegisterI,
  setSoundTimer,
  setDelayTimer,
  setStackPointer,
  setStackValues,
  setRegisters,
  incrementKeyPressCount,
  decrementKeyPressCount,
  resetKeyPressCount,
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(Chip8);
