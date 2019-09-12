import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Display2D from '../display/display-2d';
import DisplayGL from '../display/display-gl';
import StateDisplay from '../state-display/state-display';
import Asseambly from '../assembly/assembly';
import KeyboardState from '../keyboard-state/keyboard-state';

import {
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
import { selectRendererModeValue, selectShowDebbugInfo, selectIsRunning } from '../../../redux/settings/settings.selectors';
import { RENDERER_MODS } from '../../../redux/settings/const/index';

import './chip-8.css';

class Chip8 extends React.Component {
  displayRef = React.createRef();
  executeNextCycly = this.props.showDebbugInfo ? this.executeNextCyclyWithUpdateState : this.executeNextCyclyWithoutUpdateState;

  subcription = null;

  constructor(props) {
    super(props);

    this.state = {
      onStateKeyPress: this.onStateKeyPress,
      Display: this.getRendererDisplay(props.rendererMode)
    };
  }

  componentDidUpdate(prevProps) {
    const { showDebbugInfo, rendererMode } = this.props;
    const isShowDebbugInfoChanged = prevProps.showDebbugInfo !== showDebbugInfo;

    if (isShowDebbugInfoChanged) {
      this.updateState();

      this.executeNextCycly = showDebbugInfo ? this.executeNextCyclyWithUpdateState : this.executeNextCyclyWithoutUpdateState;
    }

    if (rendererMode !== prevProps.rendererMode) {
      this.setState({ Display: this.getRendererDisplay(rendererMode) });
    }
  }

  getRendererDisplay(rendererMode) {
    switch (rendererMode) {
      case RENDERER_MODS.canvas: return Display2D;
      case RENDERER_MODS.webGL: return DisplayGL;
    }

    return null;
  }

  componentWillUnmount() {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  executeNextCyclyWithUpdateState() {
    this.updateDisplay();
    this.updateState();
  }

  executeNextCyclyWithoutUpdateState() {
    this.updateDisplay();
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

  onStateKeyPress = (e) => {
    switch (e.charCode) {
      case 56: {
        const { isRunning } = this.props;

        this.subcription = this.props.switchLoopState(!isRunning).subscribe(() => this.setState({ onStateKeyPress: this.onStateKeyPress }));
        this.setState({ onStateKeyPress: undefined });
        break;
      }
      case 57: {
        const { isRunning } = this.props;

        if (!isRunning) {
          this.subcription = this.props.executeNextInstruction().subscribe(() => {
            this.setState({ onStateKeyPress: this.onStateKeyPress });
            this.executeNextCycly();
          });
          this.setState({ onStateKeyPress: undefined });
        }

        break;
      }
    }
  }

  render () {
    const { chip8, scale, showDebbugInfo } = this.props;
    const state = showDebbugInfo ?
      React.createElement('div', { tabIndex: 0, onKeyPress: this.state.onStateKeyPress },
        React.createElement(StateDisplay),
        React.createElement(Asseambly),
      ) :
      null;

    return (
      React.createElement('div', null,
        React.createElement('div', { className: 'chip-8' },
          React.createElement(this.state.Display, {
            ref: this.displayRef,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            onBlur: this.onBlur,
            display: getDisplay(chip8),
            scale,
          }),
          state,
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
  rendererMode: PropTypes.number.isRequired,
  switchLoopState: PropTypes.func.isRequired,
  executeNextInstruction: PropTypes.func.isRequired,
  showDebbugInfo: PropTypes.bool,
  scale: PropTypes.number,
};

const mapStateToProps = (state) => ({
  rendererMode: selectRendererModeValue(state),
  showDebbugInfo: selectShowDebbugInfo(state),
  isRunning: selectIsRunning(state),
});

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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Chip8);
