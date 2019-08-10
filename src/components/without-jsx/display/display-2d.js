import React from 'react';
import PropTypes from 'prop-types';

import Canvas from '../canvas/canvas';

import { fillImageDataWithDisplay, scaleDisplay } from '../../../chip-8/display/display';

export default class Display extends React.Component {
  constructor(props) {
    super(props);

    const { width, height } = scaleDisplay(props.scale);

    this.canvasRef = React.createRef();
    this.imageData = new ImageData(width, height);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.scale === nextProps.scale) return false;

    return true;
  }

  updateDisplayData(display) {
    fillImageDataWithDisplay(this.imageData, display, this.props.scale);
    this.setImageData(this.props.display);
  }

  setImageData(display) {
    this.canvasRef.current.setImageBinaries(this.imageData);
  }

  render () {
    const { onKeyDown, onKeyUp } = this.props;
    const { width, height } = scaleDisplay(this.props.scale);

    return (
      React.createElement(Canvas, {
        ref: this.canvasRef,
        imageData: this.imageData,
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
