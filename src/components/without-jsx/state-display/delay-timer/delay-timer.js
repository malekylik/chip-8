import React from 'react';
import PropTypes from 'prop-types';

const DelayTimer = ({ value }) => React.createElement('p', null, `DT: ${value}`);

DelayTimer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default DelayTimer;
