import React from 'react';
import PropTypes from 'prop-types';

import './assembly.css';

const Assambly = ({ assemblyLines }) => {
  const lines = assemblyLines.map(({ address, opcode, assembly}) => (
    React.createElement(React.Fragment, { key: address },
      React.createElement(
        'span',
        null,
        `${address}: `
      ),
      React.createElement(
        'span',
        null,
        `${opcode} - `
      ),
      React.createElement(
        'span',
        null,
        assembly
      ),
    )
  ));

  return React.createElement(
    'div',
    { className: 'assembly' },
    lines
  );
};

Assambly.propTypes = {
  assemblyLines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Assambly;
