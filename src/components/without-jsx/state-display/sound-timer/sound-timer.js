import React from 'react';
import PropTypes from 'prop-types';

const SoundTimer = ({ value }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, `Sound timer:`),
    React.createElement('span', null, String(value)),
  )
);

SoundTimer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SoundTimer;
