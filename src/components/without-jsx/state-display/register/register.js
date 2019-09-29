import React from 'react';
import PropTypes from 'prop-types';

const Register = ({ number, value }) => React.createElement('p', null, `R${number.toString(16).toUpperCase()}: ${String(value).padStart(3, '0')}`);

Register.propTypes = {
  number: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Register;
