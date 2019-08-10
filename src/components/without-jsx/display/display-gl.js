import React from 'react';
import PropTypes from 'prop-types';

import Canvas from '../canvas/canvas-gl';

import { scaleDisplay, getPixels } from '../../../chip-8/display/display';

export default class Display extends React.Component {
  canvasRef = React.createRef();

  shouldComponentUpdate(nextProps) {
    if (this.props.scale === nextProps.scale) return false;

    return true;
  }

  updateDisplayData(display) {
    this.setImageBinaries(getPixels(display));
  }

  setImageBinaries(binaries) {
    this.canvasRef.current.setImageBinaries(binaries);
  }

  render () {
    const { onKeyDown, onKeyUp, display } = this.props;
    const { width, height } = scaleDisplay(this.props.scale);

    return (
      React.createElement(Canvas, {
        ref: this.canvasRef,
        displayBuffer: getPixels(display),
        width,
        height,
        onKeyDown,
        onKeyUp,
      }, null)
    );
  }
}

Display.propTypes = {
  scale: PropTypes.number,
  display: PropTypes.object,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

Display.defaultProps = {
  scale: 1,
};
