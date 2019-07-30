import React from 'react';
import PropTypes from 'prop-types';

const DelayTimer = ({ value }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, 'Delay timer:'),
    React.createElement('span', null, String(value)),
  )
);

DelayTimer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default DelayTimer;
