import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Register from './register/register';
import RegisterI from './register-i/register-i';
import DelayTimer from './delay-timer/delay-timer';
import SoundTimer from './sound-timer/sound-timer';
import ProgramCounter from './program-counter/program-counter';
import StackState from './stack-state/stack-state';

import { selectProgramCounter } from '../../../redux/chip-8/chip-8.selectors';

import './state-display.css';

class StateDisplay extends React.Component {
  render() {
    const { registerI, delayTimer, soundTimer, programCounter, stackPointer, stackValues } = this.props;
    const registers = this.props.registers.map(
      (value, i) => React.createElement(Register, { value, number: i, key: i })
    );

    return (
      React.createElement('div', { className: 'state-display' },
        React.createElement('div', { className: 'state-display__registers', key: 'registers' },
          registers
        ),
        React.createElement('div', { className: 'state-display__chip-8-state', key: 'chip-8-state' },
          React.createElement(RegisterI, { value: registerI }),
          React.createElement(DelayTimer, { value: delayTimer }),
          React.createElement(SoundTimer, { value: soundTimer }),
          React.createElement(ProgramCounter, { value: programCounter }),
          React.createElement(StackState, { stackPointer, stackValues }),
        ),
      )
    );
  }
}

StateDisplay.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.number).isRequired,
  registerI: PropTypes.number.isRequired,
  delayTimer: PropTypes.number.isRequired,
  soundTimer: PropTypes.number.isRequired,
  programCounter: PropTypes.number.isRequired,
  stackPointer: PropTypes.number.isRequired,
  stackValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const fromStateToProps = (state) => ({
  programCounter: selectProgramCounter(state),
});

export default connect(fromStateToProps)(StateDisplay);
