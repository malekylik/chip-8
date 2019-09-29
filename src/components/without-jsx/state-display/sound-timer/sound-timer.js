import React from 'react';
import PropTypes from 'prop-types';

const SoundTimer = ({ value }) => React.createElement('span', null, `ST: ${String(value)}`);

SoundTimer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SoundTimer;
