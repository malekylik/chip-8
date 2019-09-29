import React from 'react';
import PropTypes from 'prop-types';

const StackState = ({ stackPointer, stackValues }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, 'SP:'),
    React.createElement('span', null, String(stackPointer)),

    ...stackValues.slice(0, 12).map((value, i) => (
      React.createElement('p', null, React.createElement('span', null, `${String(i)}: ${String(value)}`))
    ))
  )
);

StackState.propTypes = {
  stackPointer: PropTypes.number.isRequired,
  stackValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default StackState;
