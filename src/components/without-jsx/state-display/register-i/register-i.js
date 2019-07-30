import React from 'react';
import PropTypes from 'prop-types';

const RegisterI = ({ value }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, 'I:'),
    React.createElement('span', null, String(value)),
  )
);

RegisterI.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RegisterI;
