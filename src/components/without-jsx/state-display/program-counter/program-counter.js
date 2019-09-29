import React from 'react';
import PropTypes from 'prop-types';

const ProgramCounter = ({ value }) => React.createElement('p', null, `PC: ${value}`);

ProgramCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgramCounter;
