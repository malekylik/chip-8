import React from 'react';
import PropTypes from 'prop-types';

import Display from '../display/display';
import StateDisplay from '../state-display/state-display';
import Assambly from '../assembly/assembly';
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
  readOpcode,
  isKeyExist,
  pressKey,
  releaseKey,
  getKeyboard,
} from '../../../chip-8/chip-8';
import { getAssemblerForOpcode } from '../../../chip-8/debugger/debugger';
import { getNextInstructionAddress } from '../../../chip-8/processor/methods';
import { createOpcode, getOpcodeValue } from '../../../chip-8/processor/opcode/opcode';
import { OPCODE_BYTES } from '../../../chip-8/processor/const/index';

import './chip-8.css';

const ASSEMBLY_LINES_COUNT = 13;

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
      assemblyLines: this.getAssemblyLines(getProgramCounter(chip8)),
      isKeyboardNeedToRerender: false,
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

    this.setState({
      registers: getRegisters(chip8),
      registerI: getIRegister(chip8),
      delayTimer: getDelayTimerValue(chip8),
      soundTimer: getSoundTimerValue(chip8),
      programCounter: getProgramCounter(chip8),
      stackPointer: getStackPointer(chip8),
      stackValues: getStackValues(chip8),
      assemblyLines: this.getAssemblyLines(getProgramCounter(chip8)),
      isKeyboardNeedToRerender: !this.state.isKeyboardNeedToRerender,
    });
  }

  getAssemblyLines(pc) {
    const lines = new Array(ASSEMBLY_LINES_COUNT);

    if (this.prevPC < pc && pc - this.prevPC < ASSEMBLY_LINES_COUNT) {
      const diffCount = (pc - this.prevPC) / OPCODE_BYTES;
      const startMemoryAddress = pc + ASSEMBLY_LINES_COUNT + 1 - (diffCount * OPCODE_BYTES);

      this.copyAssembyLines(lines, diffCount, ASSEMBLY_LINES_COUNT, 0);

      return this.fillAssemblyLines(lines, ASSEMBLY_LINES_COUNT - diffCount, ASSEMBLY_LINES_COUNT, startMemoryAddress);
    } else if (pc < this.prevPC && this.prevPC - pc < ASSEMBLY_LINES_COUNT) {
      const diffCount = (this.prevPC - pc) / OPCODE_BYTES;
      const startMemoryAddress = pc - (ASSEMBLY_LINES_COUNT - 1);

      this.copyAssembyLines(lines, 0, ASSEMBLY_LINES_COUNT - diffCount, diffCount);

      return this.fillAssemblyLines(lines, 0, diffCount, startMemoryAddress);
    }

    const startMemoryAddress = pc - (ASSEMBLY_LINES_COUNT - 1);

    return this.fillAssemblyLines(lines, 0, ASSEMBLY_LINES_COUNT, startMemoryAddress);
  }

  copyAssembyLines(lines, start, end, startTo) {
    const { assemblyLines } = this.state;

    for (let i = start, j = startTo; i < end; i++, j++) {
      lines[j] = assemblyLines[i] 
    }
  }

  fillAssemblyLines(lines, start, end, startMemoryAddress) {
    const { chip8 } = this.props;

    for (let i = start, address = startMemoryAddress; i < end; i++, address = getNextInstructionAddress(address)) {
      const opcode = createOpcode(readOpcode(chip8, address));

      lines[i] = {
        opcode: getOpcodeValue(opcode),
        address: address,
        assembly: getAssemblerForOpcode(opcode),
      };
    }

    return lines;
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
      assemblyLines,
      isKeyboardNeedToRerender,
    } = this.state;

    return (
      React.createElement('div', null,
        React.createElement('div', { className: 'chip-8' },
          React.createElement(Display, {
            ref: this.displayRef,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            display: getDisplay(chip8),
            scale,
          }),
          React.createElement(
            StateDisplay, { registers, registerI, delayTimer, soundTimer, programCounter, stackPointer, stackValues }
          ),
          React.createElement(
            Assambly, { assemblyLines }
          )
        ),
        React.createElement('div', null,
          React.createElement(KeyboardState, {
            keyboard: getKeyboard(chip8),
            isKeyboardNeedToRerender: isKeyboardNeedToRerender,
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
