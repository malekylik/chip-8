import React from 'react';
import PropTypes from 'prop-types';

import Register from './register/register';

import './state-display.css';

export default class StateDisplay extends React.Component {
  render() {
    const registers = this.props. registers.map(
      (value, i) => React.createElement(Register, { value, number: i, key: i })
    );

    return (
      React.createElement('div', null,
        React.createElement('div', { className: 'registers' },
          registers
        )
      )
    );
  }
}

StateDisplay.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.number).isRequired,
};
