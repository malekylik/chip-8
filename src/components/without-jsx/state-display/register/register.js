import React from 'react';
import PropTypes from 'prop-types';

const Register = ({ number, value }) => (
  React.createElement(React.Fragment, null,
    React.createElement('span', null, `R${number}:`),
    React.createElement('span', null, String(value)),
  )
);

Register.propTypes = {
  number: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Register;
