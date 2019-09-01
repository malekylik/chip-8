import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { selectSubAssemblyLines } from '../../../redux/assembly/assembly.selectors';

import './assembly.css';

const Assembly = ({ assemblyLines }) => {
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

Assembly.propTypes = {
  assemblyLines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  assemblyLines: selectSubAssemblyLines(state),
});

export default connect(mapStateToProps)(Assembly);