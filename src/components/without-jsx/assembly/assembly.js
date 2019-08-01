import React from 'react';
import PropTypes from 'prop-types';

const Assambly = ({ assemblyLines }) => {
  console.log(assemblyLines);
  return null;
};

Assambly.propTypes = {
  assemblyLines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Assambly;
