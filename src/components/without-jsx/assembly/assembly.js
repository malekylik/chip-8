import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';

import { selectSubAssemblyLines, selectCurrentAddress } from '../../../redux/assembly/assembly.selectors';

import './assembly.less';

const Assembly = ({ currentAddress, assemblyLines }) => {
  const lines = assemblyLines.map(({ address, opcode, assembly}) => (
    React.createElement(
      'div',
      { key: address, className: classNames({ 'assembly__line--current': currentAddress === address }) },
      React.createElement(
        'span',
        null,
        address
      ),
      React.createElement(
        'span',
        { className: 'assembly__opcode' } ,
        `: ${opcode} - `
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
  currentAddress: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assemblyLines: selectSubAssemblyLines(state),
  currentAddress: selectCurrentAddress(state),
});

export default connect(mapStateToProps)(Assembly);
