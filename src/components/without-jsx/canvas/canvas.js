import React from 'react';
import PropTypes from 'prop-types';

export default class Canvas extends React.Component {
  render() {
    const { width, height } = this.props;

    return (
      React.createElement('canvas', { width, height }, null)
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Canvas.defaultProps = {
  width: 300,
  height: 150,
}
