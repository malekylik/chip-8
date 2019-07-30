import React from 'react';
import PropTypes from 'prop-types';

const ProgramCounter = ({ value }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, 'Program counter:'),
    React.createElement('span', null, String(value)),
  )
);

ProgramCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgramCounter;
