import React from 'react';
import PropTypes from 'prop-types';

const RegisterI = ({ value }) => React.createElement('p', null, `I: ${value}`);

RegisterI.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RegisterI;
