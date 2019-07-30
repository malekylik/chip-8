import React from 'react';
import PropTypes from 'prop-types';

const StackState = ({ stackPointer, stackValues }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, 'Stack pointer:'),
    React.createElement('span', null, String(stackPointer)),

    ...stackValues.map((value, i) => (
      React.createElement(React.Fragment, null,
        React.createElement('span', null, String(i)),
        React.createElement('span', null, String(value)),
      )
    ))
  )
);

StackState.propTypes = {
  stackPointer: PropTypes.number.isRequired,
  stackValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default StackState;
