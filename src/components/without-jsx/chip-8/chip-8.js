import React from 'react';
import PropTypes from 'prop-types';

import Display from '../display/display';
import StateDisplay from '../state-display/state-display';
import Assambly from '../assembly/assembly';

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
} from '../../../chip-8/chip-8';
import { getAssemblerForOpcode } from '../../../chip-8/debugger/debugger';
import { getNextInstructionAddress } from '../../../chip-8/processor/methods';
import { createOpcode, getOpcodeValue } from '../../../chip-8/processor/opcode/opcode';

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
      assemblyLines: this.getAssemblyLines(getProgramCounter(chip8)),
    });
  }

  getAssemblyLines(pc) {
    const { chip8 } = this.props;
    const startMemoryAddress = pc - (ASSEMBLY_LINES_COUNT - 1);
    const lines = new Array(ASSEMBLY_LINES_COUNT);

    for (let i = 0, address = startMemoryAddress; i < ASSEMBLY_LINES_COUNT; i++, address = getNextInstructionAddress(address)) {
      const opcode = createOpcode(readOpcode(chip8, address));

      lines[i] = {
        opcode: getOpcodeValue(opcode),
        address: address,
        assembly: getAssemblerForOpcode(opcode),
      };
    }

    return lines;
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
    } = this.state;

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
        React.createElement(
          Assambly, { assemblyLines }
        )
      )
    );
  }
}

Chip8.propTypes = {
  chip8: PropTypes.object.isRequired,
  scale: PropTypes.number,
};
